import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useResults } from "../../../context/DataContext";

// motion
import { motion } from 'framer-motion'
// variants
import { fadeIn } from '../FrameMotion/variants'


const SearchPage = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const { results } = useResults();

    const filteredResults = useMemo(() => {
        const allPrograms = [...new Set(results.map((result) => result.programName))];

        if (!search)
            return allPrograms.map((program, index) => ({
                _id: String(index + 1),
                programName: program,
            }));

        return allPrograms
            .filter((program) =>
                program.toUpperCase().includes(search.toUpperCase())
            )
            .map((program, index) => ({
                _id: String(index + 1),
                programName: program,
            }));
    }, [search, results]);

    return (
        <div className="relative overflow-x-hidden">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <motion.h1
                        variants={fadeIn("left", 0.3)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: false, amount: 0.7 }}
                        className="font-bold text-center text-4xl mb-10 text-secondery">
                        Explore Programs Results
                    </motion.h1>

                    <motion.div
                        variants={fadeIn("down", 0.3)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: false, amount: 0.7 }}
                        className="mb-8">
                        <input
                            type="text"
                            placeholder="Search Programs..."
                            className="w-full bg-white text-black border-2 max-w-xl mx-auto block h-12 px-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition duration-300 ease-in-out"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </motion.div>

                    {filteredResults.length > 0 && (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {filteredResults.map((result, index) => (
                                <motion.div
                                    key={result._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                        ease: "easeOut"
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="cursor-pointer p-4 rounded-2xl border border-white dark:border-[#272727] shadow-md hover:shadow-lg transition-shadow"
                                    onClick={() => navigate(`/poster/${result.programName}`)}
                                >
                                    <motion.h3
                                        className="text-lg font-semibold"
                                        layoutId={`program-${result._id}`}
                                    >
                                        {result.programName}
                                    </motion.h3>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {filteredResults.length === 0 && (
                        <div className="text-center text-rose-500 font-semibold mt-10">
                            No programs match your search
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;