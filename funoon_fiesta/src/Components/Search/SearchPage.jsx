import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useResults } from "../../../context/DataContext";
import { motion, AnimatePresence } from "framer-motion";

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
                    <h1 className="font-bold text-center text-4xl mb-10 text-secondery">
                        Explore Programs Results
                    </h1>

                    <div className="mb-8">
                        <input
                            type="text"
                            placeholder="Search Programs..."
                            className="w-full text-black border-2 max-w-xl mx-auto block h-12 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 transition duration-300 ease-in-out"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <AnimatePresence>
                            {filteredResults.length > 0 &&
                                filteredResults.map((result) => (
                                    <motion.div
                                        key={result._id}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.3 }}
                                        className="border border-gray-200 dark:border-gray-600 rounded-full p-4 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
                                        onClick={() => navigate(`/poster/${result.programName}`)}
                                    >
                                        <h3 className="text-lg font-semibold text-center text-gray-800 dark:text-gray-200 truncate">
                                            {result.programName}
                                        </h3>
                                    </motion.div>
                                ))}
                        </AnimatePresence>
                    </div>

                    {filteredResults.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="text-center text-rose-500 font-semibold mt-10"
                        >
                            No programs match your search
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
