import React, { useState, useEffect } from 'react';
import { useResults } from "../../../context/DataContext";
import { Trophy, Medal, ChevronRight, Award, Star, TrendingUp } from "lucide-react";
import TeamAchievements from '../TeamAchievements/TeamAchievements';
import { motion } from 'framer-motion';

const ScoreBoard = () => {
  const { results, uniquePrograms, groupPrograms, singlePrograms } = useResults();
  const teamNames = ["ALEXANDRIA", "SHATIBIYA", "MADIYA", "SHAMIYA", "IJAZIYYA", "KAZIMIYYA"];
  const [activeTeam, setActiveTeam] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [expandedProgram, setExpandedProgram] = useState(null);
  const [localResults, setLocalResults] = useState([]);
  const [localPrograms, setLocalPrograms] = useState({
    unique: [],
    group: [],
    single: []
  });

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedResults = localStorage.getItem('scoreboardResults');
      const savedPrograms = localStorage.getItem('scoreboardPrograms');

      if (savedResults) {
        setLocalResults(JSON.parse(savedResults));
      }
      if (savedPrograms) {
        setLocalPrograms(JSON.parse(savedPrograms));
      }
    } catch (error) {
      console.error('Error loading local data:', error);
    }
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    if (results?.length > 0) {
      try {
        localStorage.setItem('scoreboardResults', JSON.stringify(results));
        localStorage.setItem('scoreboardPrograms', JSON.stringify({
          unique: uniquePrograms,
          group: groupPrograms,
          single: singlePrograms
        }));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  }, [results, uniquePrograms, groupPrograms, singlePrograms]);

  // Use local data if online data is not available
  const effectiveResults = results?.length > 0 ? results : localResults;
  const effectivePrograms = {
    unique: uniquePrograms?.length > 0 ? uniquePrograms : localPrograms.unique,
    group: groupPrograms?.length > 0 ? groupPrograms : localPrograms.group,
    single: singlePrograms?.length > 0 ? singlePrograms : localPrograms.single
  };

  const getTotalPointsForTeam = (team) => {
    const teamResults = effectiveResults.filter(
      (result) => result.teamName.toUpperCase() === team
    );
    return teamResults.reduce((total, curr) => total + curr.points, 0);
  };

  const getMedalCount = (team) => {
    const teamResults = effectiveResults.filter(
      (result) => result.teamName.toUpperCase() === team
    );
    return {
      gold: teamResults.filter(r => r.prize?.toLowerCase() === "first").length,
      silver: teamResults.filter(r => r.prize?.toLowerCase() === "second").length,
      bronze: teamResults.filter(r => r.prize?.toLowerCase() === "third").length,
      total: teamResults.length
    };
  };

  const TeamCard = ({ team }) => {
    const medals = getMedalCount(team);
    const totalPoints = getTotalPointsForTeam(team);
    const isActive = activeTeam === team;

    return (
      <div
        onClick={() => { setActiveTeam(isActive ? null : team); setSelectedTeam(team); }}
        className={`${isActive ? 'ring-0' : ''
          } bg-white dark:bg-[#2D2D2D] rounded-xl shadow-lg p-4 hover:shadow-xl cursor-pointer`}
      >
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">
              {team}
            </h3>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-green-500">{totalPoints}</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              {medals.gold > 0 && (
                <div className="flex items-center" title="Gold Medals">
                  <span className="text-xl">🥇</span>
                  <span className="text-xs font-bold ml-1">{medals.gold}</span>
                </div>
              )}
              {medals.silver > 0 && (
                <div className="flex items-center" title="Silver Medals">
                  <span className="text-xl">🥈</span>
                  <span className="text-xs font-bold ml-1">{medals.silver}</span>
                </div>
              )}
              {medals.bronze > 0 && (
                <div className="flex items-center" title="Bronze Medals">
                  <span className="text-xl">🥉</span>
                  <span className="text-xs font-bold ml-1">{medals.bronze}</span>
                </div>
              )}
            </div>
            <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'rotate-90' : ''}`} />
          </div>
        </div>
      </div>
    );
  };

  const MobileScoreCard = ({ program, teamResults }) => {
    const isExpanded = expandedProgram === program;

    return (
      <motion.div
        initial={false}
        animate={{ backgroundColor: isExpanded ? 'rgba(255, 255, 255, 0.05)' : 'transparent' }}
        className="bg-white dark:bg-[#2D2D2D] rounded-lg shadow-md mb-4 overflow-hidden"
      >
        <div
          className={`flex justify-between items-center p-4 cursor-pointer ${isExpanded ? 'bg-gradient-to-r from-secondery/10 to-red-800/10' :
              'hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          onClick={() => setExpandedProgram(isExpanded ? null : program)}
        >
          <div className="flex items-center space-x-3">
            <Trophy className={`w-5 h-5 transition-colors duration-300 ${isExpanded ? 'text-secondery' : 'text-gray-400'
              }`} />
            <div className="flex flex-col">
              <span className={`font-semibold transition-colors duration-300 ${isExpanded ? 'text-secondery' : ''
                }`}>
                {program}
              </span>
            </div>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden bg-gray-50 dark:bg-[#2D2D2D]"
        >
          {teamNames.map((team, index) => {
            const teamResults = effectiveResults.filter(r =>
              r.teamName.toUpperCase() === team &&
              r.programName.toUpperCase() === program.toUpperCase()
            );

            if (teamResults.length === 0) return null;

            return (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                key={team}
                className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 
                flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{team}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col items-end gap-1">
                    {teamResults.map((result, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                          {result.points}
                        </span>
                        {result.prize && (
                          <span className="text-lg transform hover:scale-110 transition-transform">
                            {result.prize.toLowerCase() === 'first' && '🥇'}
                            {result.prize.toLowerCase() === 'second' && '🥈'}
                            {result.prize.toLowerCase() === 'third' && '🥉'}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    );
  };

  const renderMobileView = () => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-6"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: {
            opacity: 1,
            y: 0,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.2,
            },
          },
        }}
        className="grid grid-cols-2 gap-4"
      >
        {teamNames.map((team) => (
          <motion.div
            key={team}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <TeamCard team={team} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="space-y-4"
      >
        {[
          { title: 'Single Programs', programs: effectivePrograms.single },
          { title: 'General Programs', programs: effectivePrograms.unique },
          { title: 'Unique Programs', programs: effectivePrograms.group },
        ].map(({ title, programs }) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <motion.button
              onClick={() => setExpandedSection(expandedSection === title ? null : title)}
              className="w-full flex justify-between items-center p-4 bg-gradient-to-r from-secondery to-red-800 rounded-lg text-white font-semibold"
              whileHover={{ scale: 1.02 }}
            >
              <span>{title}</span>
              <ChevronRight
                className={`w-5 h-5 transition-transform duration-300 ${expandedSection === title ? 'rotate-90' : ''
                  }`}
              />
            </motion.button>

            <motion.div
              initial={false}
              animate={{
                height: expandedSection === title ? "auto" : 0,
                opacity: expandedSection === title ? 1 : 0,
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {programs.map((program) => {
                const programResults = effectiveResults.filter(
                  (result) => result.programName.toUpperCase() === program.toUpperCase()
                );
                return (
                  <MobileScoreCard
                    key={program}
                    program={program}
                    teamResults={programResults}
                  />
                );
              })}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );

  const renderDesktopView = () => (
    <div className="overflow-x-auto rounded-lg bg-white dark:bg-transparent border border-white dark:border-[#2D2D2D] shadow-lg">
      <table className="table-auto w-full border-collapse text-sm sm:text-base">
        <thead>
          <tr className="bg-gradient-to-r from-secondery to-red-800 text-white">
            <th className="px-4 py-4 text-left">PROGRAM NAME</th>
            {teamNames.map((team) => (
              <th key={team} className="px-4 py-4 text-center">{team}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {[...effectivePrograms.single, ...effectivePrograms.unique, ...effectivePrograms.group].map(program => (
            <tr key={program} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
              <td className="px-4 py-3 font-semibold text-blue-600 dark:text-blue-300">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4" />
                  <span>{program.toUpperCase()}</span>
                </div>
              </td>
              {teamNames.map(team => {
                const teamResults = effectiveResults.filter(
                  r => r.programName.toUpperCase() === program.toUpperCase() &&
                    r.teamName.toUpperCase() === team
                );

                return (
                  <td key={team} className="px-4 py-3 text-center">
                    {teamResults.length > 0 ? (
                      <div className="flex flex-col items-center gap-1">
                        {teamResults.map((result, idx) => (
                          <div key={idx} className="flex items-center justify-center space-x-2">
                            <span className="font-medium">{result.points}</span>
                            {result.prize && (
                              <span className="text-lg transform hover:scale-110 transition-transform">
                                {result.prize.toLowerCase() === 'first' && '🥇'}
                                {result.prize.toLowerCase() === 'second' && '🥈'}
                                {result.prize.toLowerCase() === 'third' && '🥉'}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
          <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 font-bold">
            <td className="px-4 py-4">TOTAL</td>
            {teamNames.map(team => (
              <td key={team} className="px-4 py-4 text-center text-lg text-blue-600 dark:text-blue-300">
                {getTotalPointsForTeam(team)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );

  const NoDataMessage = () => (
    <div className="text-center py-8">
      <div className="flex flex-col items-center space-y-4">
        <Trophy className="w-12 h-12 text-gray-400" />
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          No Data Available
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          You are currently offline and no cached data was found.
        </p>
      </div>
    </div>
  );

  // Check if we have any data to display
  const hasData = effectiveResults.length > 0;

  return (
    <div className="container mx-auto px-4 py-12 md:px-12">
      {selectedTeam ? (
        <TeamAchievements
          teamName={selectedTeam}
          onBack={() => setSelectedTeam(null)}
          results={effectiveResults}  // Pass the effective results to TeamAchievements
        />
      ) : (
        <>
          <div className="flex flex-col items-center mb-8 space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 text-center">
              <span className="flex items-center justify-center space-x-3">
                <Medal className="w-8 h-8 text-secondery" />
                <span>SCOREBOARD</span>
                <Medal className="w-8 h-8 text-secondery" />
              </span>
            </h1>
          </div>

          {!hasData ? (
            <NoDataMessage />
          ) : (
            <>
              {/* Mobile view */}
              <div className="md:hidden h-auto">
                {renderMobileView()}
              </div>

              {/* Desktop view */}
              <div className="hidden md:block">
                {renderDesktopView()}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ScoreBoard;