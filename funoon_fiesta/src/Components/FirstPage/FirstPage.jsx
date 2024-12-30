import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeImg from '../../assets/img/festlogo.png';
import HomePattern from '../../assets/img/pattern-01.png';

// motion
import { motion } from 'framer-motion'
// variants
import { fadeIn } from '../FrameMotion/variants'

const FirstPage = () => {
  const navigate = useNavigate();

  const handleResultRedirect = () => {
    navigate('/result');  // Replace '/result' with your actual result route
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col">
      <div className="flex-grow flex justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between px-4">
          {/* Content section */}
          <motion.div
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.7 }}
            className="w-full md:w-3/5 text-start md:text-left mb-8 md:mb-0">
            <div className="max-w-6xl mx-auto md:mx-0">
              <h1 className="text-3xl md:text-6xl font-semibold groupnumbers mb-4 text-secondery">
                Welcome to Funoon Fiesta
              </h1>
              <p className="mb-6 text-base md:text-lg text-gray-600 dark:text-white">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta
                et ratione illo quibusdam dolorum magni quaerat velit quis
                perspiciatis molestiae neque tempore nam iste
              </p>
              <button
                type="button"
                onClick={handleResultRedirect}
                className="w-2/3 md:w-auto px-6 py-3 text-white bg-secondery rounded-md hover:bg-opacity-90 transition-colors"
              >
                Check your Results
              </button>
            </div>
          </motion.div>

          {/* Image section - hidden on mobile */}
          <motion.div
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.7 }}
            className="hidden md:flex w-2/5 justify-end items-center">
            <img
              src={HomeImg}
              alt="Funoon Fiesta Logo"
              className="max-w-[300px] w-full h-auto object-contain"
            />
          </motion.div>
        </div>
      </div>

      {/* Pattern image positioned at the bottom */}
      <motion.div
        variants={fadeIn("down", 0.3)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.7 }}
        className="w-full h-32 bg-repeat overflow-hidden"
        style={{
          backgroundImage: `url(${HomePattern})`,
          backgroundSize: '152px',
        }}
      />
    </section>
  );
};

export default FirstPage;
