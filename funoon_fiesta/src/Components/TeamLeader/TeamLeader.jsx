import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import Testimonial from '../Testimonial/Testimonial';
import img1 from "../../assets/img/11.png";
import img2 from "../../assets/img/21.png";
import img3 from "../../assets/img/31.png";
import img4 from "../../assets/img/21.png";
import img5 from "../../assets/img/11.png";
import { motion } from 'framer-motion';
import { fadeIn } from '../FrameMotion/variants';

const TeamLeader = () => {
  const teamLeaders = [
    { 
      id: 1, 
      name: "Michael Chen", 
      role: "CEO",
      image: img1,
    },
    { 
      id: 2, 
      name: "Elena Rodriguez", 
      role: "CIO",
      image: img2,
    },
    { 
      id: 3, 
      name: "Alexander Kim", 
      role: "CTO",
      image: img3,
    },
    { 
      id: 4, 
      name: "Sophia Martinez", 
      role: "CSO",
      image: img4,
    },
    { 
      id: 5, 
      name: "David Thompson", 
      role: "CFO",
      image: img5,
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-8 sm:py-12 md:py-16 min-h-screen flex flex-col justify-center items-center">
      <motion.div 
        variants={fadeIn("up", 0.3)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.7 }}
        className="container mx-auto px-4 max-w-6xl"
      >
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
          }}
          breakpoints={{
            480: { 
              slidesPerView: 1,
              spaceBetween: 20 
            },
            640: { 
              slidesPerView: 2,
              spaceBetween: 30 
            },
            1024: { 
              slidesPerView: 3,
              spaceBetween: 40 
            },
          }}
          className="w-full"
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
        >
          {teamLeaders.map((leader, index) => (
            <SwiperSlide key={leader.id} className="flex justify-center items-center py-4">
              <div
                className={`group pb-4 relative w-full rounded-2xl overflow-hidden transform transition-all duration-300 ${
                  index === activeIndex ? "scale-105" : "scale-100"
                }`}
              >
                <div className="relative z-10 pt-6 sm:pt-8 pb-3 sm:pb-4 flex justify-center">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full border-6 border-white shadow-lg overflow-hidden transform transition-transform duration-300 group-hover:scale-110">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="relative z-10 px-4 sm:px-6 pb-4 sm:pb-6 text-center">
                  <h3 className="text-xl sm:text-2xl font-bold mb-1 tracking-tight">
                    {leader.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4 uppercase tracking-widest">
                    {leader.role}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
      <Testimonial />
    </section>
  );
};

export default TeamLeader;