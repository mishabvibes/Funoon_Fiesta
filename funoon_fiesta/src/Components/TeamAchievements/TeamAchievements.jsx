import React from 'react';
import { useResults } from "../../../context/DataContext";
import { Trophy, Medal, ArrowLeft, Award, Star } from "lucide-react";

const TeamAchievements = ({ teamName, onBack }) => {
  const { results } = useResults();
  
  const teamResults = results.filter(
    (result) => result.teamName.toUpperCase() === teamName.toUpperCase()
  );

  const achievements = {
    first: teamResults.filter(r => r.prize?.toLowerCase() === "first"),
    second: teamResults.filter(r => r.prize?.toLowerCase() === "second"),
    third: teamResults.filter(r => r.prize?.toLowerCase() === "third")
  };

  const totalPoints = teamResults.reduce((total, curr) => total + curr.points, 0);

  return (
    <div className="animate-in fade-in slide-in-from-right duration-500">
      <div className="flex items-center space-x-4 mb-6">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 dark:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Scoreboard</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* Main Achievement Card */}
        <div className="bg-white dark:bg-[#2D2D2D] rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-secondery to-red-800 px-6 py-4">
            <div className="text-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Trophy className="w-6 h-6" />
                <span className="text-xl font-bold">{teamName} Achievements</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5" />
                <span>{totalPoints} Points</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Gold Medals */}
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl">🥇</span>
                  <h3 className="text-lg font-bold text-yellow-700 dark:text-yellow-400">
                    First Place ({achievements.first.length})
                  </h3>
                </div>
                <ul className="space-y-2">
                  {achievements.first.map((result, idx) => (
                    <li key={idx} className="flex justify-between items-center">
                      <span>{result.programName}</span>
                      <span className="font-semibold">{result.points} pts</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Silver Medals */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/20 dark:to-gray-700/20 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl">🥈</span>
                  <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">
                    Second Place ({achievements.second.length})
                  </h3>
                </div>
                <ul className="space-y-2">
                  {achievements.second.map((result, idx) => (
                    <li key={idx} className="flex justify-between items-center">
                      <span>{result.programName}</span>
                      <span className="font-semibold">{result.points} pts</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bronze Medals */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl">🥉</span>
                  <h3 className="text-lg font-bold text-orange-700 dark:text-orange-400">
                    Third Place ({achievements.third.length})
                  </h3>
                </div>
                <ul className="space-y-2">
                  {achievements.third.map((result, idx) => (
                    <li key={idx} className="flex justify-between items-center">
                      <span>{result.programName}</span>
                      <span className="font-semibold">{result.points} pts</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* All Participations Card */}
        <div className="bg-white dark:bg-[#2D2D2D] rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5" />
              <h2 className="text-xl font-bold">All Participations</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3">Program</th>
                    <th className="text-center py-3">Position</th>
                    <th className="text-right py-3">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {teamResults.map((result, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="py-3">{result.programName}</td>
                      <td className="text-center py-3">
                        {result.prize ? (
                          <span className="text-lg">
                            {result.prize.toLowerCase() === 'first' && '🥇'}
                            {result.prize.toLowerCase() === 'second' && '🥈'}
                            {result.prize.toLowerCase() === 'third' && '🥉'}
                          </span>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="text-right py-3 font-semibold">{result.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamAchievements;