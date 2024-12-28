import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import offStage from '../../assets/poster/offStage.png'
import onStage from '../../assets/poster/onStage.png'
import './style.css'

const AUTOPLAY_DELAY = 2000;
const TWEEN_FACTOR = 0.84;

const CarouselPoster = ({ programCategory, programName, stage, records }) => {
  const groupRecordsByPlace = useCallback((records) => {
    return records.reduce((acc, record) => {
      const place = record.fields.Place;
      if (!acc[place]) acc[place] = [];
      acc[place].push(record);
      return acc;
    }, {});
  }, []);

  const isOffStage = stage === 'OFF STAGE';
  const textColorClass = isOffStage ? 'text-purple-800' : 'text-amber-900';

  return (
    <motion.div
      initial={{ opacity: 0, x: -300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      transition={{ duration: 0.2 }}
      className="max-w-[450px] rounded-lg overflow-hidden mx-auto shadow-xl relative"
    >
      <img
        src={isOffStage ? offStage : onStage}
        alt={`${stage} poster`}
        className="w-full h-auto object-cover"
      />
      
      <div className="carousal-top-programName">
        <p className={classNames('font-bold uppercase carousal-program-name', textColorClass)}>
          {programName}
        </p>
        <p className={classNames('carousal-program-category -mt-1', textColorClass)}>
          {programCategory}
        </p>
      </div>

      <div className="carousal-top-winners">
        {Object.entries(groupRecordsByPlace(records)).map(([place, placeRecords]) => (
          <div key={place} className="flex items-start">
            {placeRecords.map((record, index) => (
              <div key={index} className={classNames('flex flex-col leading-4', textColorClass)}>
                <p className="font-semibold carousal-winner-name">
                  {record.fields.Name}
                </p>
                <p className="carousal-winner-team">
                  {record.fields.Team}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

CarouselPoster.propTypes = {
  programCategory: PropTypes.string.isRequired,
  programName: PropTypes.string.isRequired,
  stage: PropTypes.oneOf(['ON STAGE', 'OFF STAGE']).isRequired,
  records: PropTypes.arrayOf(PropTypes.shape({
    fields: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Team: PropTypes.string.isRequired,
      Place: PropTypes.string.isRequired
    }).isRequired
  })).isRequired
};

const EmblaCarousel = ({ slides = [] }) => {
  // Early return if no slides are provided
  if (!slides || slides.length === 0) {
    return (
      <div className="embla mx-auto p-4 text-center text-gray-500">
        No slides available to display
      </div>
    );
  }

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    loop: true,
    containScroll: 'trimSnaps'
  }, [Autoplay({ playOnInit: true, delay: AUTOPLAY_DELAY })]);

  const [activeIndex, setActiveIndex] = useState(0);
  const tweenFactor = useRef(TWEEN_FACTOR);

  const updateScale = useCallback((emblaApi) => {
    if (!emblaApi) return;
    
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    
    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      const diffToTarget = scrollSnap - scrollProgress;
      const scale = 1 - Math.abs(diffToTarget * tweenFactor.current * 0.5);
      
      engine.slideRegistry[snapIndex].forEach((slideIndex) => {
        const node = emblaApi.slideNodes()[slideIndex];
        if (node) {
          node.style.transform = `scale(${Math.max(0, Math.min(scale, 1))})`;
          node.style.opacity = Math.max(0, Math.min(1 - Math.abs(diffToTarget * tweenFactor.current), 1));
        }
      });
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setActiveIndex(emblaApi.selectedScrollSnap());
    const onScroll = () => updateScale(emblaApi);
    const onReInit = () => {
      updateScale(emblaApi);
      onSelect();
    };

    emblaApi
      .on('select', onSelect)
      .on('scroll', onScroll)
      .on('reInit', onReInit);

    return () => {
      emblaApi
        .off('select', onSelect)
        .off('scroll', onScroll)
        .off('reInit', onReInit);
    };
  }, [emblaApi, updateScale]);

  return (
    <div className="embla mx-auto">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className="embla__slide_protect" key={index}>
              <div className="embla__slide">
                <CarouselPoster {...slide} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {slides.length > 1 && (
        <div className="embla__controls relative my-4 mt-10">
          <div className="absolute bottom-4 left-2/4 z-20 flex -translate-x-2/4 gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                className={classNames(
                  'block h-1 cursor-pointer rounded-2xl transition-all',
                  activeIndex === i ? 'w-8 bg-black' : 'w-4 bg-black/50'
                )}
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

EmblaCarousel.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.shape({
    programCategory: PropTypes.string.isRequired,
    programName: PropTypes.string.isRequired,
    stage: PropTypes.oneOf(['ON STAGE', 'OFF STAGE']).isRequired,
    records: PropTypes.array.isRequired
  }))
};

EmblaCarousel.defaultProps = {
  slides: []
};

export default EmblaCarousel;