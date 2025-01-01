import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Award, User, Trophy, Star, ListChecks, Grid, Clipboard, AlertCircle } from 'lucide-react';
import { useResults } from '../../../context/DataContext';
import { Alert, AlertDescription } from '../../Components/ui/alert';
import axios from 'axios';

const DEBOUNCE_DELAY = 300;

const API_URL = import.meta.env.VITE_API_URL;

// Moved outside component to prevent recreating on each render
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

const calculatePoints = (category, prize, grade) => 
  category && prize && grade ? pointsMatrix[category]?.[prize]?.[grade] || '' : '';

const initialFormState = {
  studentName: '',
  programName: '',
  teamName: '',
  category: '',
  stage: '',
  prize: '',
  grade: '',
  points: '',
};

const AddResultForm = () => {
  const { addResult, results } = useResults();
  const { state } = useLocation();
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const navigate = useNavigate();

  // Memoized form fields configuration
  const formFields = useMemo(() => [
    { 
      name: 'teamName', 
      icon: <Grid className="w-5 h-5 text-gray-400" />, 
      options: ['ALEXANDRIA', 'SHATIBIYA', 'MADIYA', 'SHAMIYA', 'IJAZIYYA', 'KAZIMIYYA'] 
    },
    { 
      name: 'category', 
      icon: <ListChecks className="w-5 h-5 text-gray-400" />, 
      options: ['SINGLE', 'GROUP', 'GENERAL'] 
    },
    { 
      name: 'stage', 
      icon: <Star className="w-5 h-5 text-gray-400" />, 
      options: ['STAGE', 'NON-STAGE'] 
    },
    { 
      name: 'prize', 
      icon: <Trophy className="w-5 h-5 text-gray-400" />, 
      options: ['FIRST', 'SECOND', 'THIRD'] 
    },
    { 
      name: 'grade', 
      icon: <Star className="w-5 h-5 text-gray-400" />, 
      options: ['A', 'B', 'C'] 
    }
  ], []);

  // Initialize form with edit data
  useEffect(() => {
    if (state?.result) {
      setFormData(state.result);
    }
  }, [state]);

  // Points calculation effect
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

  // Duplicate check with debounce
  const checkDuplicate = useCallback(
    (data) => {
      const isDuplicateEntry = results.some(result => 
        result._id !== state?.result?._id && // Exclude current result when editing
        result.studentName.toLowerCase() === data.studentName.toLowerCase() &&
        result.programName.toLowerCase() === data.programName.toLowerCase() &&
        result.category === data.category
      );
      setIsDuplicate(isDuplicateEntry);
    },
    [results, state?.result?._id]
  );

  // Debounced form change handler
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      if (['studentName', 'programName', 'category'].includes(name)) {
        setTimeout(() => checkDuplicate(newData), DEBOUNCE_DELAY);
      }
      return newData;
    });
    setError(null);
  }, [checkDuplicate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isDuplicate) {
      setError('This result appears to be a duplicate. Please verify the details.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      if (state?.result) {
        await axios.put(`${API_URL}/${state.result._id}`, formData);
      } else {
        await addResult(formData);
      }
      navigate("/cart");
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred while submitting the form');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 md:px-12">
      <div className="max-w-lg mx-auto bg-white/40 dark:bg-transparent shadow-lg rounded-lg p-6 md:p-8">
        {/* Header Section */}
        <div className="text-center mb-6">
          <Award className="w-12 h-12 mx-auto text-blue-500" strokeWidth={1.5} />
          <h2 className="text-2xl font-bold text-gray-700 dark:text-white mt-2">
            {state?.result ? 'Edit Result' : 'Add Result'}
          </h2>
          <p className="text-sm text-gray-500 mt-1">Manage and submit student results</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isDuplicate && (
          <Alert variant="warning" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Potential duplicate entry detected. Please verify the details.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Student Name & Program Name inputs */}
          {['studentName', 'programName'].map(field => (
            <div key={field} className="relative">
              {field === 'studentName' ? 
                <User className="absolute left-3 top-3 w-5 h-5 " /> :
                <Clipboard className="absolute left-3 top-3 w-5 h-5 " />
              }
              <input
                type="text"
                name={field}
                placeholder={field === 'studentName' ? 'Student Name' : 'Program Name'}
                value={formData[field]}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          ))}

          {/* Dropdowns */}
          {formFields.map((field) => (
            <div key={field.name} className="relative">
              <div className="absolute left-3 top-3">{field.icon}</div>
              <select
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
                className={`w-full pl-10 pr-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none ${
                  formData[field.name] ? 'text-black' : 'text-gray-400 dark:text-gray-600'
                }`}
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
              className="w-full pl-10 pr-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || isDuplicate}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md shadow-md transition duration-300 ${
              isSubmitting || isDuplicate ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-1'
            }`}
          >
            {isSubmitting ? 'Submitting...' : state?.result ? 'Update Result' : 'Add Result'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddResultForm;