import React, { useState, useEffect, useRef } from 'react';

import About1 from '../../assets/img/about/books.png';
import About2 from '../../assets/img/about/journal.png';
import About3 from '../../assets/img/about/pen.png';

// motion
import { motion } from 'framer-motion'
// variants
import { fadeIn } from '../FrameMotion/variants'

const About = () => {
  // Duplicate images to create infinite effect
  const images = [About1, About2, About3, About1, About2, About3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentImageIndex === 3) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentImageIndex(0);
        setTimeout(() => {
          setIsTransitioning(true);
        }, 50);
      }, 500);
    }
  }, [currentImageIndex]);

  return (
    <section className="h-screen py-12 flex justify-center">
      <div className="w-full flex justify-center items-center h-full">
        <div className="flex flex-col md:flex-row w-full md:w-3/4 gap-12">
          {/* Content Section */}
          <motion.section 
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.7 }}
          className="w-full md:w-3/5 flex justify-center items-center">
            <div className="w-3/4 text-center md:text-left mt-12 md:mt-0">
              <h1 className="text-4xl lg:text-7xl font-semibold text-primary">
                Funoon Fiesta
              </h1>
              <p className="mt-4 text-base lg:text-lg leading-relaxed">
                Embark on a continuous journey of creativity, where art flows 
                endlessly and inspiration knows no bounds. Our carousel represents 
                the infinite potential of artistic expression.Embark on a continuous journey of creativity, where art flows 
                endlessly and inspiration knows no bounds. Our carousel represents 
                the infinite potential of artistic expression.
              </p>
            </div>
          </motion.section>

          {/* Carousel Section */}
          <motion.section 
          variants={fadeIn("down", 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.7 }}
          className="w-full md:w-2/5 flex justify-center items-center relative">
            <div className="w-48 lg:w-64 overflow-hidden">
              <div 
                ref={carouselRef}
                className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : 'transition-none'}`}
                style={{
                  transform: `translateX(-${currentImageIndex * 100}%)`
                }}
              >
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Slide ${(index % 3) + 1}`}
                    className="w-full h-auto flex-shrink-0 object-cover"
                  />
                ))}
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </section>
  );
};

export default About;