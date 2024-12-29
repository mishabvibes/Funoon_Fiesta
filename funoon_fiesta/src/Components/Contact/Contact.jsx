import React, { useState } from 'react';
import Email from '../../assets/img/contact/mail-01.png';
import User from '../../assets/img/contact/user.png';
import Smartphone from '../../assets/img/contact/smartphone.png';
import { motion } from 'framer-motion';
import { fadeIn } from '../FrameMotion/variants';

const Modal = ({ isOpen, status, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4 relative"
            >
                <div className="text-center">
                    {status === 'success' ? (
                        <>
                            <div className="w-20 h-20 mx-auto mb-4">
                                <svg className="w-full h-full text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Success!</h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                Your message has been sent successfully. We'll get back to you soon!
                            </p>
                        </>
                    ) : (
                        <>
                            <div className="w-20 h-20 mx-auto mb-4">
                                <svg className="w-full h-full text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Error!</h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                Failed to send message. Please try again later.
                            </p>
                        </>
                    )}
                    <button
                        onClick={onClose}
                        className="bg-secondery text-white rounded-full px-6 py-2 font-semibold hover:bg-red-500 transition-colors duration-300"
                    >
                        Close
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modalState, setModalState] = useState({
        isOpen: false,
        status: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const closeModal = () => {
        setModalState({ isOpen: false, status: null });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: '5e788635-8112-4f66-a557-680bf5feb996',
                    name: formData.name,
                    phone: formData.phone,
                    message: formData.message,
                    subject: 'New Contact Form Submission'
                })
            });

            const data = await response.json();
            if (data.success) {
                setModalState({ isOpen: true, status: 'success' });
                setFormData({ name: '', phone: '', message: '' });
            } else {
                setModalState({ isOpen: true, status: 'error' });
            }
        } catch (error) {
            setModalState({ isOpen: true, status: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            className="mx-auto py-4 md:py-8 px-4 md:px-20 min-h-screen md:h-screen flex justify-center items-center"
            id='contact'
        >
            <Modal 
                isOpen={modalState.isOpen}
                status={modalState.status}
                onClose={closeModal}
            />
            
            <div className="w-full flex justify-center">
                <div className="flex flex-col md:flex-row w-full md:w-3/4 lg:px-10">
                    <div className="w-full rounded-3xl bg-[#EEEBEB] dark:bg-[#2D2D2D] flex flex-col md:flex-row justify-center items-center p-4 py-6 md:py-12 space-y-4 md:space-y-0">
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
                                        required
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
                                        required
                                    />
                                </div>

                                <div className="bg-gray-300 rounded-2xl h-24 md:h-32 pl-4 overflow-hidden">
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full bg-transparent px-2 py-2 text-gray-700 focus:outline-none h-full resize-none border-none focus:ring-0"
                                        placeholder="Your Message"
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`mt-2 md:mt-4 bg-secondery text-white rounded-3xl h-10 md:h-12 w-full font-semibold transition-colors duration-300 ${
                                        isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-500'
                                    }`}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
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