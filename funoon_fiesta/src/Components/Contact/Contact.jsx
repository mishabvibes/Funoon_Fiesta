import React, { useState } from 'react';
import Email from '../../assets/img/contact/mail-01.png';
import User from '../../assets/img/contact/user.png';
import Smartphone from '../../assets/img/contact/smartphone.png';

// motion
import { motion } from 'framer-motion'
// variants
import { fadeIn } from '../FrameMotion/variants'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Basic form validation
        if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
            alert('Please fill in all fields');
            return;
        }

        // Placeholder for form submission logic
        console.log('Form submitted:', formData);
    };

    return (
        <section 
            className="mx-auto py-4 md:py-8 px-4 md:px-20 
                       min-h-screen md:h-screen 
                       flex justify-center items-center" 
            id='contact'
        >
            <div className="w-full flex justify-center">
                <div className="flex flex-col md:flex-row w-full md:w-3/4 lg:px-10">
                    <div className="w-full rounded-3xl bg-[#EEEBEB] dark:bg-[#2D2D2D] 
                                    flex flex-col md:flex-row 
                                    justify-center items-center 
                                    p-4 py-6 md:py-12 
                                    space-y-4 md:space-y-0">
                        <motion.div 
                        variants={fadeIn("up", 0.3)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: false, amount: 0.7 }}
                        className="w-full md:w-1/2 p-2 md:p-10 flex justify-center items-center">
                            <img 
                                src={Email} 
                                alt="Contact" 
                                className="w-full max-w-xs h-auto object-contain" 
                            />
                        </motion.div>
                        <motion.div 
                        variants={fadeIn("down", 0.3)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: false, amount: 0.7 }}
                        className="w-full md:w-1/2 p-2 md:p-8">
                            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 md:gap-5">
                                <div className="flex items-center bg-gray-300 rounded-2xl h-10 md:h-12 pl-4 overflow-hidden">
                                    <div className="flex items-center justify-center w-10">
                                        <img src={User} alt="User icon" className="h-5 w-5 md:h-6 md:w-6" />
                                    </div>
                                    <input 
                                        type="text" 
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-transparent px-2 text-gray-700 outline-none focus:outline-none focus:ring-0 border-none" 
                                        placeholder="Your Name" 
                                    />
                                </div>

                                <div className="flex items-center bg-gray-300 rounded-2xl h-10 md:h-12 pl-4 overflow-hidden">
                                    <div className="flex items-center justify-center w-10">
                                        <img src={Smartphone} alt="Smartphone icon" className="h-5 w-5 md:h-6 md:w-6" />
                                    </div>
                                    <input 
                                        type="tel" 
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full bg-transparent px-2 text-gray-700 focus:outline-none focus:ring-0 border-none" 
                                        placeholder="Your Phone" 
                                    />
                                </div>

                                <div className="bg-gray-300 rounded-2xl h-24 md:h-32 pl-4 overflow-hidden">
                                    <textarea 
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full bg-transparent px-2 py-2 text-gray-700 focus:outline-none h-full resize-none border-none focus:ring-0" 
                                        placeholder="Your Message"
                                    ></textarea>
                                </div>

                                <button 
                                    type="submit" 
                                    className="mt-2 md:mt-4 bg-secondery text-white rounded-3xl h-10 md:h-12 w-full font-semibold hover:bg-blue-600 transition-colors duration-300"
                                >
                                    Send Message
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;