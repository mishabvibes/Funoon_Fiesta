import { useState } from "react";
import { useResults } from "../../../context/DataContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const { results, deleteResult } = useResults();
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const filteredResults = results.filter((result) =>
        result.programName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEdit = (result) => {
        navigate("/addresult", { state: { result } });
    };

    return (
        <div className="cart-container p-6  min-h-screen">
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-200">
                Results
            </h2>

            <div className="search-bar mb-6 flex justify-center">
                <input
                    type="text"
                    placeholder="Search programs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-1/2 p-3 border border-gray-300 dark:border-gray-700 bg-white dark: text-gray-800 dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
                />
            </div>

            <div className="results-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResults.map((result) => (
                    <div
                        key={result._id}
                        className="h-80 cart-card p-6 bg-white dark:bg-transparent shadow-lg rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all"
                    >
                        <p className="text-gray-800 dark:text-gray-200">
                            <strong>Program:</strong> {result.programName}
                        </p>
                        <p className="text-gray-800 dark:text-gray-200">
                            <strong>Student:</strong> {result.studentName}
                        </p>
                        <p className="text-gray-800 dark:text-gray-200">
                            <strong>Prize:</strong> {result.prize}
                        </p>
                        <p className="text-gray-800 dark:text-gray-200">
                            <strong>Team:</strong> {result.teamName}
                        </p>
                        <p className="text-gray-800 dark:text-gray-200">
                            <strong>Category:</strong> {result.category}
                        </p>
                        <p className="text-gray-800 dark:text-gray-200">
                            <strong>Stage:</strong> {result.stage}
                        </p>
                        {result.grade && <p className="text-gray-800 dark:text-gray-200">
                            <strong>Grade:</strong> {result.grade}
                        </p>}
                        <p className="text-gray-800 dark:text-gray-200">
                            <strong>Points:</strong> {result.points}
                        </p>
                        <div className="button-group mt-4 space-x-4">
                            <button
                                onClick={() => deleteResult(result._id)}
                                className="delete-btn bg-red-500 text-white p-3 rounded-md hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none transition-colors"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => handleEdit(result)}
                                className="edit-btn bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none transition-colors"
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredResults.length === 0 && (
                <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
                    No programs found.
                </p>
            )}
        </div>
    );
};

export default Cart;
