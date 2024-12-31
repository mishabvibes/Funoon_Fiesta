import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Award, User, Trophy, Star, ListChecks, Grid, Clipboard, AlertCircle } from 'lucide-react';
import { useResults } from '../../../context/DataContext';
import debounce from 'lodash/debounce';

const API_URL = import.meta.env.VITE_API_URL;

// Points calculation matrix remains the same
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

const calculatePoints = (category, prize, grade) => {
  if (!category || !prize || !grade) return '';
  return pointsMatrix[category]?.[prize]?.[grade] || '';
};

// Simple Error Alert Component
const ErrorAlert = ({ message, onClose }) => {
  if (!message) return null;
  
  return (
    <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4 rounded">
      <div className="flex items-center">
        <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
        <p className="text-red-700">{message}</p>
        <button onClick={onClose} className="ml-auto text-red-400 hover:text-red-500">
          ×
        </button>
      </div>
    </div>
  );
};

const AddResultForm = () => {
  const { addResult, results } = useResults();
  const { state } = useLocation();
  const navigate = useNavigate();
  
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
  
  const [error, setError] = useState('');
  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with existing data if editing
  useEffect(() => {
    if (state?.result) {
      setFormData(state.result);
    }
  }, [state]);

  // Memoize form fields configuration
  const formFields = useMemo(() => [
    { name: 'teamName', icon: <Grid className="w-5 h-5 text-gray-400" />, options: ['ALEXANDRIA', 'SHATIBIYA', 'MADIYA', 'SHAMIYA', 'IJAZIYYA', 'KAZIMIYYA'] },
    { name: 'category', icon: <ListChecks className="w-5 h-5 text-gray-400" />, options: ['SINGLE', 'GROUP', 'GENERAL'] },
    { name: 'stage', icon: <Star className="w-5 h-5 text-gray-400" />, options: ['STAGE', 'NON-STAGE'] },
    { name: 'prize', icon: <Trophy className="w-5 h-5 text-gray-400" />, options: ['FIRST', 'SECOND', 'THIRD'] },
    { name: 'grade', icon: <Star className="w-5 h-5 text-gray-400" />, options: ['A', 'B', 'C'] }
  ], []);

  // Auto-calculate points when relevant fields change
  useEffect(() => {
    const points = calculatePoints(
      formData.category,
      formData.prize,
      formData.grade
    ).toString();
    
    if (points !== formData.points) {
      setFormData(prev => ({ ...prev, points }));
    }
  }, [formData.category, formData.prize, formData.grade]);

  // Load recent submissions for auto-complete
  useEffect(() => {
    const recent = results
      ?.slice(-5)
      .map(({ studentName, programName, teamName }) => ({
        studentName,
        programName,
        teamName,
      }));
    setRecentSubmissions(recent || []);
  }, [results]);

  // Check for duplicates
  const checkDuplicate = useCallback((data) => {
    return results?.some(result => 
      result.studentName === data.studentName &&
      result.programName === data.programName &&
      result.prize === data.prize &&
      result._id !== state?.result?._id
    );
  }, [results, state?.result?._id]);

  // Debounced form change handler
  const handleChange = useCallback(
    debounce((name, value) => {
      setFormData(prev => {
        const newData = { ...prev, [name]: value };
        
        // Auto-fill based on recent submissions if student name matches
        if (name === 'studentName') {
          const recentSubmission = recentSubmissions.find(
            sub => sub.studentName === value
          );
          if (recentSubmission) {
            return {
              ...newData,
              teamName: recentSubmission.teamName,
              programName: recentSubmission.programName,
            };
          }
        }
        
        return newData;
      });
    }, 300),
    [recentSubmissions]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError('');

    try {
      // Check for duplicate entries
      if (checkDuplicate(formData)) {
        setError('A result with these details already exists');
        setIsSubmitting(false);
        return;
      }

      if (state?.result) {
        await addResult({ ...formData, _id: state.result._id }, true);
      } else {
        await addResult(formData);
      }
      
      navigate("/cart");
    } catch (error) {
      setError(error.response?.data?.message || 'Error submitting form');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 md:px-12">
      <div className="max-w-lg mx-auto bg-white/40 dark:bg-transparent dark:text-gray-400 shadow-lg dark:shadow-none rounded-lg p-6 md:p-8">
        {/* Header Section */}
        <div className="text-center mb-6">
          <Award className="w-12 h-12 mx-auto text-blue-500 dark:text-blue-400" strokeWidth={1.5} />
          <h2 className="text-2xl font-bold text-gray-700 dark:text-white mt-2">
            {state?.result ? 'Edit Result' : 'Add Result'}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage and submit student results
          </p>
        </div>

        {/* Error Alert */}
        <ErrorAlert 
          message={error} 
          onClose={() => setError('')} 
        />

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Student Name with Autocomplete */}
          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="studentName"
              list="recentStudents"
              placeholder="Student Name"
              value={formData.studentName}
              onChange={(e) => handleChange('studentName', e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 border dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <datalist id="recentStudents">
              {recentSubmissions.map((sub, idx) => (
                <option key={idx} value={sub.studentName} />
              ))}
            </datalist>
          </div>

          {/* Program Name */}
          <div className="relative">
            <Clipboard className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="programName"
              placeholder="Program Name"
              value={formData.programName}
              onChange={(e) => handleChange('programName', e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 border dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Dropdowns */}
          {formFields.map((field) => (
            <div key={field.name} className="relative">
              <div className="absolute left-3 top-3">
                {field.icon}
              </div>
              <select
                name={field.name}
                value={formData[field.name]}
                onChange={(e) => handleChange(field.name, e.target.value)}
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
            disabled={isSubmitting}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting 
              ? 'Submitting...' 
              : state?.result 
                ? 'Update Result' 
                : 'Add Result'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddResultForm;