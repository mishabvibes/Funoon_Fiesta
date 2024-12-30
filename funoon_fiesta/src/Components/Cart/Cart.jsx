import React, { useState, useEffect } from 'react';
import { useResults } from "../../../context/DataContext";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Search, Edit2, Trash2, Filter } from 'lucide-react';

const DeleteModal = ({ isOpen, onClose, onConfirm, itemName }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
                <div className="p-6">
                    <div className="text-center">
                        <div className="w-12 h-12 mx-auto mb-4 text-red-500">
                            <AlertTriangle className="w-full h-full" />
                        </div>
                        <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">Delete {itemName}?</h2>
                        <div className="flex justify-end space-x-4 mt-4">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoRow = ({ label, value }) => (
    <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</span>
        <span className="text-sm text-gray-800 dark:text-gray-200">{value}</span>
    </div>
);

const ResultCard = ({ result, onDelete, onEdit, isDeleting }) => (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 ${isDeleting ? 'opacity-50' : ''}`}>
        <div className="p-4 bg-gray-50 dark:bg-gray-700">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
                    {result.programName}
                </h3>
                <div className="flex space-x-2">
                    <button
                        onClick={() => onEdit(result)}
                        disabled={isDeleting}
                        className="p-2 text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(result._id)}
                        disabled={isDeleting}
                        className="p-2 text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
        <div className="p-4">
            <div className="space-y-2">
                <InfoRow label="Student" value={result.studentName} />
                <InfoRow label="Prize" value={result.prize} />
                <InfoRow label="Team" value={result.teamName} />
                <InfoRow label="Category" value={result.category} />
                <InfoRow label="Stage" value={result.stage} />
                {result.grade && <InfoRow label="Grade" value={result.grade} />}
                <InfoRow label="Points" value={result.points} />
            </div>
        </div>
    </div>
);

const Cart = () => {
    const { results, deleteResult, refreshResults } = useResults();
    const [searchQuery, setSearchQuery] = useState("");
    const [modalState, setModalState] = useState({ 
        isOpen: false, 
        resultId: null, 
        programName: "" 
    });
    const [deletingIds, setDeletingIds] = useState(new Set());
    const navigate = useNavigate();

    useEffect(() => {
        refreshResults();
    }, [refreshResults]);

    const filteredResults = results.filter((result) =>
        result.programName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEdit = (result) => navigate("/addresult", { state: { result } });
    
    const handleDeleteClick = (resultId) => {
        const program = results.find(r => r._id === resultId);
        setModalState({ 
            isOpen: true, 
            resultId, 
            programName: program?.programName || 'Result'
        });
    };

    const handleDeleteConfirm = async () => {
        const { resultId } = modalState;
        setModalState({ isOpen: false, resultId: null, programName: "" });
        
        if (resultId) {
            try {
                setDeletingIds(prev => new Set([...prev, resultId]));
                await deleteResult(resultId);
            } catch (error) {
                console.error('Delete failed:', error);
            } finally {
                setDeletingIds(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(resultId);
                    return newSet;
                });
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <DeleteModal 
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, resultId: null, programName: "" })}
                onConfirm={handleDeleteConfirm}
                itemName={modalState.programName}
            />
            
            <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Results Dashboard</h1>
                    <button
                        onClick={() => navigate("/addresult")}
                        className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Add New Result
                    </button>
                </div>

                <div className="flex gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search programs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                        />
                    </div>
                    <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors inline-flex items-center">
                        <Filter className="w-4 h-4 mr-2" />
                        Filters
                    </button>
                </div>
            </div>

            {filteredResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResults.map((result) => (
                        <ResultCard
                            key={result._id}
                            result={result}
                            onDelete={handleDeleteClick}
                            onEdit={handleEdit}
                            isDeleting={deletingIds.has(result._id)}
                        />
                    ))}
                </div>
            ) : (
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <p className="text-gray-600 dark:text-gray-300 text-center">
                        No results found. Try adjusting your search criteria or add a new result.
                    </p>
                </div>
            )}
        </div>
    );
};

export default Cart;