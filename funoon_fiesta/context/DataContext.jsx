import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ResultsContext = createContext();
const API = import.meta.env.VITE_API_URL;

export const ResultsProvider = ({ children }) => {
    const [results, setResults] = useState([]);
    const [uniqueTeams, setUniqueTeams] = useState([]);
    const [uniquePrograms, setUniquePrograms] = useState([]);
    const [groupPrograms, setGroupPrograms] = useState([]);
    const [singlePrograms, setSinglePrograms] = useState([]);
    const [topSingleParticipants, setTopSingleParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchResults = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API);
            if (response.status !== 200) {
                throw new Error(`Unexpected status: ${response.status}`);
            }

            const data = response.data;
            if (!Array.isArray(data)) {
                throw new Error('Expected array response');
            }

            setResults(data);

            // Process unique teams
            const teams = [...new Set(data.map(result => 
                result.teamName ? result.teamName.toUpperCase() : ""))].filter(Boolean);
            setUniqueTeams(teams);

            // Get all unique program names
            const allPrograms = [...new Set(data.map(result => 
                result.programName ? result.programName.toUpperCase() : ""))].filter(Boolean);

            // Process programs by category
            const groupProgs = allPrograms.filter(program =>
                data.some(result =>
                    result.programName?.toUpperCase() === program &&
                    result.category === "GROUP"
                )
            );

            const singleProgs = allPrograms.filter(program =>
                data.some(result =>
                    result.programName?.toUpperCase() === program &&
                    result.category === "SINGLE"
                )
            );

            const generalProgs = allPrograms.filter(program =>
                data.some(result =>
                    result.programName?.toUpperCase() === program &&
                    result.category === "GENERAL"
                )
            );

            setGroupPrograms(groupProgs);
            setSinglePrograms(singleProgs);
            setUniquePrograms(generalProgs);

            // Process top single participants
            const topParticipants = data
                .filter(result => result.category === "SINGLE")
                .sort((a, b) => Number(b.points) - Number(a.points))
                .slice(0, 3);
            setTopSingleParticipants(topParticipants);

            setError(null);
        } catch (error) {
            console.error("Fetch error:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResults();
    }, []);

    const deleteResult = async (id) => {
        try {
            setLoading(true);
            await axios.delete(`${API}/${id}`);
            await fetchResults();
        } catch (error) {
            console.error("Delete error:", error);
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const editResult = async (id, updatedData) => {
        try {
            setLoading(true);
            await axios.put(`${API}/${id}`, updatedData);
            await fetchResults();
        } catch (error) {
            console.error("Edit error:", error);
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const addResult = async (newData) => {
        try {
            setLoading(true);
            await axios.post(API, newData);
            await fetchResults();
        } catch (error) {
            console.error("Add error:", error);
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
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
                loading,
                error,
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

export const useResults = () => {
    const context = useContext(ResultsContext);
    if (!context) {
        throw new Error('useResults must be used within a ResultsProvider');
    }
    return context;
};