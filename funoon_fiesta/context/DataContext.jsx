import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ResultsContext = createContext();
const API = import.meta.env.VITE_API_URL; // API URL from environment variables

export const ResultsProvider = ({ children }) => {
    const [results, setResults] = useState([]);
    const [uniqueTeams, setUniqueTeams] = useState([]);
    const [uniquePrograms, setUniquePrograms] = useState([]);
    const [groupPrograms, setGroupPrograms] = useState([]);
    const [singlePrograms, setSinglePrograms] = useState([]);
    const [topSingleParticipants, setTopSingleParticipants] = useState([]);

    // Fetch results from the API with added error handling and checks
    const fetchResults = async () => {
        try {
            console.log("API URL:", API); // Log the API URL to ensure it's correct
            const response = await axios.get(API);

            // Check if the response status is OK
            if (response.status !== 200) {
                console.error("Error: Unexpected status code", response.status);
                return;
            }

            const data = response.data;

            // Check if the data is an array
            if (!Array.isArray(data)) {
                console.error("Expected an array but got:", data);
                return;
            }

            setResults(data);

            // Get unique team names
            const teams = [...new Set(data.map((result) => result.teamName ? result.teamName.toUpperCase() : ""))];
            setUniqueTeams(teams);

            // Get unique program names
            const programs = [...new Set(data.map((result) => result.programName ? result.programName.toUpperCase() : ""))];

            // Filter programs by category
            const groupPrograms = programs.filter((program) =>
                data.some(
                    (result) =>
                        result.programName?.toUpperCase() === program &&
                        result.category?.toUpperCase() === "GROUP"
                )
            );
            const singlePrograms = programs.filter(
                (program) =>
                    data.filter((result) => result.programName?.toUpperCase() === program).length === 1
            );
            const generalPrograms = programs.filter(
                (program) => !groupPrograms.includes(program) && !singlePrograms.includes(program)
            );

            setUniquePrograms(generalPrograms);
            setGroupPrograms(groupPrograms);
            setSinglePrograms(singlePrograms);

            // Get top single participants (sort by points)
            const singleParticipants = data
                .filter((result) => result.category?.toUpperCase() === "SINGLE")
                .sort((a, b) => b.points - a.points)
                .slice(0, 3);
            setTopSingleParticipants(singleParticipants);
        } catch (error) {
            console.error("Error fetching results:", error);
        }
    };

    // Fetch results when the component mounts
    useEffect(() => {
        fetchResults();
    }, []);

    // Delete result by ID and refresh results
    const deleteResult = async (id) => {
        try {
            await axios.delete(`${API}/${id}`);
            await fetchResults(); // Refresh data after deletion
        } catch (error) {
            console.error("Error deleting result:", error);
        }
    };

    // Edit result by ID and updated data, then refresh results
    const editResult = async (id, updatedData) => {
        try {
            await axios.put(`${API}/${id}`, updatedData);
            await fetchResults(); // Refresh data after edit
        } catch (error) {
            console.error("Error editing result:", error);
        }
    };

    // Add new result and refresh results
    const addResult = async (newData) => {
        try {
            await axios.post(API, newData);
            await fetchResults(); // Refresh data after adding
        } catch (error) {
            console.error("Error adding result:", error);
            throw error; // Re-throw to handle in component
        }
    };

    return (
        <ResultsContext.Provider
            value={{
                API,
                results,
                uniqueTeams,
                uniquePrograms,
                groupPrograms,
                singlePrograms,
                topSingleParticipants,
                deleteResult,
                editResult,
                addResult,
                refreshResults: fetchResults,
            }}
        >
            {children}
        </ResultsContext.Provider>
    );
};

// Custom hook to use the ResultsContext
export const useResults = () => useContext(ResultsContext);
