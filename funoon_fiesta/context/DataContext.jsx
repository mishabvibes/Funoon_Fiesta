import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ResultsContext = createContext();
const API = "http://localhost:3005/api/result";

// eslint-disable-next-line react/prop-types
export const ResultsProvider = ({ children }) => {
    const [results, setResults] = useState([]); // Stores all results
    const [uniqueTeams, setUniqueTeams] = useState([]); // Unique team names
    const [uniquePrograms, setUniquePrograms] = useState([]); // Unique general programs
    const [groupPrograms, setGroupPrograms] = useState([]); // Group category programs
    const [singlePrograms, setSinglePrograms] = useState([]); // Single category programs
    const [topSingleParticipants, setTopSingleParticipants] = useState([]); // Top 3 single participants

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get(API);
                const data = response.data;

                setResults(data); // Update results state

                // Extract unique team names
                const teams = [...new Set(data.map((result) => result.teamName.toUpperCase()))];
                setUniqueTeams(teams);

                // Extract unique programs and categorize them
                const programs = [...new Set(data.map((result) => result.programName.toUpperCase()))];
                const groupPrograms = programs.filter((program) =>
                    data.some(
                        (result) =>
                            result.programName.toUpperCase() === program &&
                            result.category.toUpperCase() === "GROUP"
                    )
                );
                const singlePrograms = programs.filter(
                    (program) =>
                        data.filter((result) => result.programName.toUpperCase() === program).length === 1
                );
                const generalPrograms = programs.filter(
                    (program) => !groupPrograms.includes(program) && !singlePrograms.includes(program)
                );

                setUniquePrograms(generalPrograms);
                setGroupPrograms(groupPrograms);
                setSinglePrograms(singlePrograms);

                // Extract top 3 single program participants
                const singleParticipants = data
                    .filter((result) => result.category.toUpperCase() === "SINGLE")
                    .sort((a, b) => b.points - a.points) // Sort by points in descending order
                    .slice(0, 3); // Take top 3
                setTopSingleParticipants(singleParticipants);
            } catch (error) {
                console.error("Error fetching results:", error);
            }
        };

        fetchResults();
    }, []);

    const deleteResult = async (id) => {
        try {
            await axios.delete(`${API}/${id}`);
            setResults((prevResults) => prevResults.filter((result) => result._id !== id));
        } catch (error) {
            console.error("Error deleting result:", error);
        }
    };

    const editResult = async (id, updatedData) => {
        try {
            const response = await axios.put(`${API}/${id}`, updatedData);
            setResults((prevResults) =>
                prevResults.map((result) => (result._id === id ? response.data : result))
            );
        } catch (error) {
            console.error("Error editing result:", error);
        }
    };

    return (
        <ResultsContext.Provider
            value={{
                results,
                uniqueTeams,
                uniquePrograms,
                groupPrograms,
                singlePrograms,
                topSingleParticipants,
                deleteResult,
                editResult,
            }}
        >
            {children}
        </ResultsContext.Provider>
    );
};

export const useResults = () => useContext(ResultsContext);
