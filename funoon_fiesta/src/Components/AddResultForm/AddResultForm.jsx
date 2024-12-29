// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { Award, User, Trophy, Star, ListChecks, Grid, Clipboard } from 'lucide-react';

// const API_URL = 'http://localhost:3005/api/result';

// const AddResultForm = () => {
//     const { state } = useLocation();
//     const [formData, setFormData] = useState({
//         studentName: '',
//         programName: '',
//         teamName: '',
//         category: '',
//         stage: '',
//         prize: '',
//         grade: '',
//         points: '',
//     });

//     const navigate = useNavigate();

//     useEffect(() => {
//         if (state && state.result) {
//             setFormData(state.result);
//         }
//     }, [state]);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (state && state.result) {
//                 await axios.put(`${API_URL}/${state.result._id}`, formData);
//             } else {
//                 await axios.post(API_URL, formData);
//             }
//             navigate("/cart");
//         } catch (error) {
//             console.error("Error submitting form:", error.response?.data || error.message);
//         }
//     };

//     return (
//         <div className="min-h-screen   px-4 py-8 sm:px-6 md:px-12">
//             <div className="max-w-lg mx-auto bg-white dark:bg-transparent dark:text-gray-400 shadow-lg dark:shadow-none rounded-lg p-6 md:p-8">
//                 {/* Header Section */}
//                 <div className="text-center mb-6">
//                     <Award className="w-12 h-12 mx-auto text-blue-500 dark:text-blue-400" strokeWidth={1.5} />
//                     <h2 className="text-2xl font-bold text-gray-700 dark:text-white mt-2">
//                         {state && state.result ? 'Edit Result' : 'Add Result'}
//                     </h2>
//                     <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage and submit student results</p>
//                 </div>

//                 {/* Form Section */}
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     {/* Student Name */}
//                     <div className="relative">
//                         <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//                         <input
//                             type="text"
//                             name="studentName"
//                             placeholder="Student Name"
//                             value={formData.studentName}
//                             onChange={handleChange}
//                             required
//                             className="w-full pl-10 pr-4 py-3 border dark:border-gray-600 rounded-md 
//                             focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                         />
//                     </div>

//                     {/* Program Name */}
//                     <div className="relative">
//                         <Clipboard className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//                         <input
//                             type="text"
//                             name="programName"
//                             placeholder="Program Name"
//                             value={formData.programName}
//                             onChange={handleChange}
//                             required
//                             className="w-full pl-10 pr-4 py-3 border dark:border-gray-600 rounded-md 
//                             focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                         />
//                     </div>

//                     {/* Dropdowns for team, category, stage, prize, grade, and points */}
//                     {[
//                         { name: 'teamName', icon: <Grid className="w-5 h-5 text-gray-400" />, options: ['KAMAR', 'HILAL', 'HIJAS', 'LULU', 'HAIKI', 'MARAM'] },
//                         { name: 'category', icon: <ListChecks className="w-5 h-5 text-gray-400" />, options: ['SINGLE', 'GROUP'] },
//                         { name: 'stage', icon: <Star className="w-5 h-5 text-gray-400" />, options: ['STAGE', 'NON-STAGE'] },
//                         { name: 'prize', icon: <Trophy className="w-5 h-5 text-gray-400" />, options: ['FIRST', 'SECOND', 'THIRD'] },
//                         { name: 'grade', icon: <Star className="w-5 h-5 text-gray-400" />, options: ['A', 'B', 'C'] },
//                         { name: 'points', icon: <Star className="w-5 h-5 text-gray-400" />, options: ['1', '2', '4', '6', '7', '8', '9', '10', '11', '13', '15', '20', '25'] },
//                     ].map((field) => (
//                         <div key={field.name} className="relative">
//                             {field.icon && (
//                                 <div className="absolute left-3 top-3">{field.icon}</div>
//                             )}
//                             <select
//                                 name={field.name}
//                                 value={formData[field.name]}
//                                 onChange={handleChange}
//                                 required
//                                 className="w-full pl-10 pr-4 py-3 border dark:border-gray-600 rounded-md 
//                                 focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none"
//                             >
//                                 <option value="">{`Select ${field.name.charAt(0).toUpperCase() + field.name.slice(1)}`}</option>
//                                 {field.options.map(option => (
//                                     <option key={option} value={option}>{option}</option>
//                                 ))}
//                             </select>
//                         </div>
//                     ))}

//                     {/* Submit Button */}
//                     <button
//                         type="submit"
//                         className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md shadow-md 
//                         transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                     >
//                         {state && state.result ? 'Update Result' : 'Add Result'}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AddResultForm;


import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Award, User, Trophy, Star, ListChecks, Grid, Clipboard } from 'lucide-react';
import { useResults, API } from '../../../context/DataContext';


const API_URL = API;

const calculatePoints = (category, prize, grade) => {
  if (!category || !prize || !grade) return '';
  
  const pointsMatrix = {
    'GROUP': {
      'FIRST': { 'A': 25, 'B': 23, 'C': 21 },
      'SECOND': { 'A': 22, 'B': 20, 'C': 18 },
      'THIRD': { 'A': 20, 'B': 18, 'C': 16 }
    },
    'SINGLE': {
      'FIRST': { 'A': 10, 'B': 8, 'C': 6 },
      'SECOND': { 'A': 8, 'B': 6, 'C': 4 },
      'THIRD': { 'A': 6, 'B': 4, 'C': 2 }
    },
    'GENERAL': {
      'FIRST': { 'A': 15, 'B': 13, 'C': 11 },
      'SECOND': { 'A': 13, 'B': 11, 'C': 9 },
      'THIRD': { 'A': 11, 'B': 9, 'C': 7 }
    }
  };

  return pointsMatrix[category]?.[prize]?.[grade] || '';
};

const AddResultForm = () => {
    const { addResult } = useResults();
    const { state } = useLocation();
    const [formData, setFormData] = useState({
        studentName: '',
        programName: '',
        teamName: '',
        category: '',
        stage: '',
        prize: '',
        grade: '',
        points: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (state && state.result) {
            setFormData(state.result);
        }
    }, [state]);

    useEffect(() => {
        const calculatedPoints = calculatePoints(
            formData.category,
            formData.prize,
            formData.grade
        ).toString();
        
        if (calculatedPoints !== formData.points) {
            setFormData(prev => ({
                ...prev,
                points: calculatedPoints
            }));
        }
    }, [formData.category, formData.prize, formData.grade]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (state && state.result) {
                await axios.put(`${API_URL}/${state.result._id}`, formData);
            } else {
                await addResult(formData); // Use context method instead of direct axios call
            }
            navigate("/cart");
        } catch (error) {
            console.error("Error submitting form:", error.response?.data || error.message);
        }
    };

    const formFields = [
        { name: 'teamName', icon: <Grid className="w-5 h-5 text-gray-400" />, options: ['KAMAR', 'HILAL', 'HIJAS', 'LULU', 'HAIKI', 'MARAM'] },
        { name: 'category', icon: <ListChecks className="w-5 h-5 text-gray-400" />, options: ['SINGLE', 'GROUP', 'GENERAL'] },
        { name: 'stage', icon: <Star className="w-5 h-5 text-gray-400" />, options: ['STAGE', 'NON-STAGE'] },
        { name: 'prize', icon: <Trophy className="w-5 h-5 text-gray-400" />, options: ['FIRST', 'SECOND', 'THIRD'] },
        { name: 'grade', icon: <Star className="w-5 h-5 text-gray-400" />, options: ['A', 'B', 'C'] }
    ];

    return (
        <div className="min-h-screen px-4 py-8 sm:px-6 md:px-12">
            <div className="max-w-lg mx-auto bg-white/40 dark:bg-transparent dark:text-gray-400 shadow-lg dark:shadow-none rounded-lg p-6 md:p-8">
                {/* Header Section */}
                <div className="text-center mb-6">
                    <Award className="w-12 h-12 mx-auto text-blue-500 dark:text-blue-400" strokeWidth={1.5} />
                    <h2 className="text-2xl font-bold text-gray-700 dark:text-white mt-2">
                        {state && state.result ? 'Edit Result' : 'Add Result'}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage and submit student results</p>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Student Name */}
                    <div className="relative">
                        <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            name="studentName"
                            placeholder="Student Name"
                            value={formData.studentName}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Program Name */}
                    <div className="relative">
                        <Clipboard className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            name="programName"
                            placeholder="Program Name"
                            value={formData.programName}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Dropdowns */}
                    {formFields.map((field) => (
                        <div key={field.name} className="relative">
                            {field.icon && (
                                <div className="absolute left-3 top-3">{field.icon}</div>
                            )}
                            <select
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-4 py-3 border dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none"
                            >
                                <option value="">{`Select ${field.name.charAt(0).toUpperCase() + field.name.slice(1)}`}</option>
                                {field.options.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    ))}

                    {/* Points (Read-only) */}
                    <div className="relative">
                        <Star className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            name="points"
                            placeholder="Points"
                            value={formData.points}
                            readOnly
                            className="w-full pl-10 pr-4 py-3 border dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {state && state.result ? 'Update Result' : 'Add Result'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddResultForm;