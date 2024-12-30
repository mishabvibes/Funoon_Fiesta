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
                            className="w-full bg-white/80 text-black border-2 max-w-xl mx-auto block h-12 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 transition duration-300 ease-in-out"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </motion.div>

                    <motion.div 
                    variants={fadeIn("down", 0.3)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.7 }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {filteredResults.length > 0 &&
                            filteredResults.map((result) => (
                                <div
                                    key={result._id}
                                    className="border border-gray-200 dark:border-gray-600 rounded-full p-4 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
                                    onClick={() => navigate(`/poster/${result.programName}`)}
                                >
                                    <h3 className="text-lg font-semibold text-center text-gray-800 dark:text-gray-200 truncate">
                                        {result.programName}
                                    </h3>
                                </div>
                            ))}
                    </motion.div>

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