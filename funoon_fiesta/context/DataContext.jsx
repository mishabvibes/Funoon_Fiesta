
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

    const fetchResults = async () => {
        try {
            const response = await axios.get(API);
            if (response.status !== 200) {
                throw new Error(`Unexpected status: ${response.status}`);
            }

            const data = response.data;
            if (!Array.isArray(data)) {
                throw new Error('Expected array response');
            }

            setResults(data);

            const teams = [...new Set(data.map(result => 
                result.teamName ? result.teamName.toUpperCase() : ""))];
            setUniqueTeams(teams);

            const programs = [...new Set(data.map(result => 
                result.programName ? result.programName.toUpperCase() : ""))];

            const groupProgs = programs.filter(program =>
                data.some(result =>
                    result.programName?.toUpperCase() === program &&
                    result.category?.toUpperCase() === "GROUP"
                )
            );

            const singleProgs = programs.filter(program =>
                data.filter(result => 
                    result.programName?.toUpperCase() === program).length === 1
            );

            const generalProgs = programs.filter(program => 
                !groupProgs.includes(program) && !singleProgs.includes(program)
            );

            setUniquePrograms(generalProgs);
            setGroupPrograms(groupProgs);
            setSinglePrograms(singleProgs);

            const topParticipants = data
                .filter(result => result.category?.toUpperCase() === "SINGLE")
                .sort((a, b) => b.points - a.points)
                .slice(0, 3);
            setTopSingleParticipants(topParticipants);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    useEffect(() => {
        fetchResults();
    }, []);

    const deleteResult = async (id) => {
        try {
            await axios.delete(`${API}/${id}`);
            await fetchResults();
        } catch (error) {
            console.error("Delete error:", error);
            throw error;
        }
    };

    const editResult = async (id, updatedData) => {
        try {
            await axios.put(`${API}/${id}`, updatedData);
            await fetchResults();
        } catch (error) {
            console.error("Edit error:", error);
            throw error;
        }
    };

    const addResult = async (newData) => {
        try {
            await axios.post(API, newData);
            await fetchResults();
        } catch (error) {
            console.error("Add error:", error);
            throw error;
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

export const useResults = () => useContext(ResultsContext);