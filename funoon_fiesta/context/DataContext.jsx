// // DataContext.js
// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";

// const ResultsContext = createContext();
// const API = "http://localhost:3005/api/result";

// export const ResultsProvider = ({ children }) => {
//     const [results, setResults] = useState([]);
//     const [uniqueTeams, setUniqueTeams] = useState([]);
//     const [uniquePrograms, setUniquePrograms] = useState([]);
//     const [groupPrograms, setGroupPrograms] = useState([]);
//     const [singlePrograms, setSinglePrograms] = useState([]);
//     const [topSingleParticipants, setTopSingleParticipants] = useState([]);

//     const fetchResults = async () => {
//         try {
//             const response = await axios.get(API);
//             const data = response.data;

//             setResults(data);

//             const teams = [...new Set(data.map((result) => result.teamName.toUpperCase()))];
//             setUniqueTeams(teams);

//             const programs = [...new Set(data.map((result) => result.programName.toUpperCase()))];
//             const groupPrograms = programs.filter((program) =>
//                 data.some(
//                     (result) =>
//                         result.programName.toUpperCase() === program &&
//                         result.category.toUpperCase() === "GROUP"
//                 )
//             );
//             const singlePrograms = programs.filter(
//                 (program) =>
//                     data.filter((result) => result.programName.toUpperCase() === program).length === 1
//             );
//             const generalPrograms = programs.filter(
//                 (program) => !groupPrograms.includes(program) && !singlePrograms.includes(program)
//             );

//             setUniquePrograms(generalPrograms);
//             setGroupPrograms(groupPrograms);
//             setSinglePrograms(singlePrograms);

//             const singleParticipants = data
//                 .filter((result) => result.category.toUpperCase() === "SINGLE")
//                 .sort((a, b) => b.points - a.points)
//                 .slice(0, 3);
//             setTopSingleParticipants(singleParticipants);
//         } catch (error) {
//             console.error("Error fetching results:", error);
//         }
//     };

//     useEffect(() => {
//         fetchResults();
//     }, []);

//     const deleteResult = async (id) => {
//         try {
//             await axios.delete(`${API}/${id}`);
//             await fetchResults(); // Refresh data after deletion
//         } catch (error) {
//             console.error("Error deleting result:", error);
//         }
//     };

//     const editResult = async (id, updatedData) => {
//         try {
//             await axios.put(`${API}/${id}`, updatedData);
//             await fetchResults(); // Refresh data after edit
//         } catch (error) {
//             console.error("Error editing result:", error);
//         }
//     };

//     const addResult = async (newData) => {
//         try {
//             await axios.post(API, newData);
//             await fetchResults(); // Refresh data after adding
//         } catch (error) {
//             console.error("Error adding result:", error);
//             throw error; // Re-throw to handle in component
//         }
//     };

//     return (
//         <ResultsContext.Provider
//             value={{
//                 API,
//                 results,
//                 uniqueTeams,
//                 uniquePrograms,
//                 groupPrograms,
//                 singlePrograms,
//                 topSingleParticipants,
//                 deleteResult,
//                 editResult,
//                 addResult,
//                 refreshResults: fetchResults,
//             }}
//         >
//             {children}
//         </ResultsContext.Provider>
//     );
// };

// export const useResults = () => useContext(ResultsContext);








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
            const data = response.data;

            setResults(data);

            const teams = [...new Set(data.map((result) => result.teamName.toUpperCase()))];
            setUniqueTeams(teams);

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

            const singleParticipants = data
                .filter((result) => result.category.toUpperCase() === "SINGLE")
                .sort((a, b) => b.points - a.points)
                .slice(0, 3);
            setTopSingleParticipants(singleParticipants);
        } catch (error) {
            console.error("Error fetching results:", error);
        }
    };

    useEffect(() => {
        fetchResults();
    }, []);

    const deleteResult = async (id) => {
        try {
            await axios.delete(`${API}/${id}`);
            await fetchResults(); // Refresh data after deletion
        } catch (error) {
            console.error("Error deleting result:", error);
        }
    };

    const editResult = async (id, updatedData) => {
        try {
            await axios.put(`${API}/${id}`, updatedData);
            await fetchResults(); // Refresh data after edit
        } catch (error) {
            console.error("Error editing result:", error);
        }
    };

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

export const useResults = () => useContext(ResultsContext);