import React, { useState } from 'react'
import image1 from '../../assets/img/11.png'
import image2 from '../../assets/img/21.png'
import image3 from '../../assets/img/31.png'
import image4 from '../../assets/img/11.png'
import image5 from '../../assets/img/21.png'
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

// motion
import { motion } from 'framer-motion'
// variants
import { fadeIn } from '../FrameMotion/variants'

const Testimonial = () => {
    const Testimonial_data = [
        {
            img: image1,
            content_text: "This platform has revolutionized how we manage our projects. It's fast, reliable, and easy to use.",
            testimonial_name: 'Emily Rose',
            text_block: 'Project Manager, Buildify',
        },
        {
            img: image2,
            content_text: "An exceptional tool for collaboration. We saw a 40% increase in productivity within the first month!",
            testimonial_name: 'Michael Lee',
            text_block: 'CEO, TechWave Solutions',
        },
        {
            img: image3,
            content_text: "The user interface is incredibly intuitive. Our team transitioned smoothly with minimal training.",
            testimonial_name: 'Sarah Brown',
            text_block: 'Head of Operations, SoftSys',
        },
        {
            img: image4,
            content_text: "Customer support was outstanding! Every query was addressed promptly, ensuring no downtime.",
            testimonial_name: 'David Kim',
            text_block: 'CTO, InnoVibe Labs',
        },
        {
            img: image5,
            content_text: "I highly recommend this software to any team looking to improve their workflow and collaboration.",
            testimonial_name: 'Sophia Turner',
            text_block: 'Lead Designer, Creative Hub',
        },
    ];
    
    const [current, setCurrent] = useState(0);
    const length = Testimonial_data.length;
    
    const previous = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };
    
    const next = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };
    
    return (
        <div className="px-8 md:px-16 lg:px-32">
            <section className="flex h-auto items-center justify-center pb-16 md:p-16">
                <div className="max-w-lg md:max-w-2xl lg:max-w-3xl">
                    {
                        Testimonial_data.map((item, index) => (
                            index === current && (
                                <div key={index} className="space-y-6">
                                    <motion.div 
                                    variants={fadeIn("right", 0.3)}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: false, amount: 0.7 }}
                                    className="pb-6 flex flex-col sm:flex-row items-start gap-4">
                                        <img
                                            src="https://assets.website-files.com/5fef5619b640934b33c2385e/5ff6a53da27356854576b920_Group%2058.svg"
                                            alt=""
                                            className="w-8 md:w-10"
                                        />
                                        <h2 className="text-gray-800 dark:text-white text-lg sm:text-xl md:text-2xl font-semibold">
                                            {item.content_text}
                                        </h2>
                                    </motion.div>
                                    <motion.div 
                                    variants={fadeIn("left", 0.3)}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: false, amount: 0.7 }}
                                    className="flex justify-between items-center">
                                        <div className="flex gap-4 items-center">
                                            <div>
                                                <img
                                                    src={item.img}
                                                    alt=""
                                                    className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-pink-600 rounded-full p-1"
                                                />
                                            </div>
                                            <div className="text-left">
                                                <h6 className="text-sm font-semibold">{item.testimonial_name}</h6>
                                                <span className="text-xs text-gray-500">{item.text_block}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 sm:gap-4">
                                            <div
                                                className="bg-gray-800 p-2 sm:p-4 cursor-pointer rounded"
                                                onClick={previous}
                                            >
                                                <IoIosArrowBack className="text-white" />
                                            </div>
                                            <div
                                                className="bg-gray-800 p-2 sm:p-4 cursor-pointer rounded"
                                                onClick={next}
                                            >
                                                <IoIosArrowForward className="text-white" />
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            )
                        ))
                    }
                </div>
            </section>
        </div>
    );
};

export default Testimonial;
