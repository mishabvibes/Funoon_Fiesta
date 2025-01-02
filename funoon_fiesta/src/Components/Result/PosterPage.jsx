import React, { useEffect, useState } from 'react';
import { Trophy } from 'lucide-react';
import { useParams } from 'react-router-dom';
import EnhancedPoster from './WinnerPoster';
import { useResults } from '../../../context/DataContext';
import { motion } from 'framer-motion';
import onStage from '../../assets/img/poster.jpeg';
import offStage from '../../assets/img/poster.jpeg';
import img from '../../assets/img/poster.jpeg';
import img1 from '../../assets/img/poster1.jpg';
import img2 from '../../assets/img/poster2.jpg';

const STORAGE_KEY = 'programWinners';
const PROGRAM_DATA_KEY = 'programData';

const PosterPage = () => {
  const { programName } = useParams();
  const { results } = useResults();
  const [programWinners, setProgramWinners] = useState([]);
  const [programData, setProgramData] = useState({
    category: "",
    stage: "ON STAGE"
  });

  const posterBackgrounds = [img, img1, img2];

  const getMedalEmoji = (index) => {
    switch (index) {
      case 0: return "🥇";
      case 1: return "🥈";
      case 2: return "🥉";
      default: return "🏅";
    }
  };

  // Animation variants
  const fadeInUp = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        duration: 0.5,
        bounce: 0.3
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Load cached data on component mount
  useEffect(() => {
    const loadCachedData = () => {
      try {
        const cachedWinners = localStorage.getItem(`${STORAGE_KEY}_${programName}`);
        const cachedProgramData = localStorage.getItem(`${PROGRAM_DATA_KEY}_${programName}`);
        
        if (cachedWinners) {
          setProgramWinners(JSON.parse(cachedWinners));
        }
        
        if (cachedProgramData) {
          setProgramData(JSON.parse(cachedProgramData));
        }
      } catch (error) {
        console.error('Error loading cached data:', error);
      }
    };

    loadCachedData();
  }, [programName]);

  // Update data when results change and cache it
  useEffect(() => {
    if (results.length > 0 && programName) {
      const programInfo = results.find(
        result => result.programName.toUpperCase() === programName.toUpperCase()
      );

      const formattedResults = results
        .filter(result => result.programName.toUpperCase() === programName.toUpperCase())
        .sort((a, b) => b.points - a.points)
        .slice(0, 3)
        .map((winner, index) => ({
          fields: {
            Place: (index + 1).toString(),
            Name: winner.studentName || "---",
            Team: winner.teamName || "Individual"
          }
        }));

      while (formattedResults.length < 3) {
        formattedResults.push({
          fields: {
            Place: (formattedResults.length + 1).toString(),
            Name: "---",
            Team: "---"
          }
        });
      }

      const newProgramData = {
        category: programInfo?.category || "",
        stage: programInfo?.stage || "ON STAGE"
      };

      // Update state
      setProgramWinners(formattedResults);
      setProgramData(newProgramData);

      // Cache data
      try {
        localStorage.setItem(`${STORAGE_KEY}_${programName}`, JSON.stringify(formattedResults));
        localStorage.setItem(`${PROGRAM_DATA_KEY}_${programName}`, JSON.stringify(newProgramData));
      } catch (error) {
        console.error('Error caching data:', error);
      }
    }
  }, [results, programName]);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="text-center mb-12"
        >
          <motion.div 
            variants={fadeInUp}
            className="inline-flex items-center justify-center gap-2 mb-4"
          >
            <Trophy className="w-8 h-8 text-yellow-500" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {programName} Winners
            </h1>
            <Trophy className="w-8 h-8 text-yellow-500" />
          </motion.div>
          <motion.p 
            variants={fadeInUp}
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Celebrating excellence and outstanding achievements in {programName}
          </motion.p>
        </motion.div>

        {/* Winners Overview */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="w-full max-w-5xl mx-auto mb-16"
        >
          <div className="bg-gradient-to-r from-yellow-400/20 via-amber-500/20 to-yellow-400/20 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {programWinners.map((winner, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 300, damping: 15 }
                  }}
                  className="flex items-center gap-4 bg-white/40 dark:bg-white/10 backdrop-blur-sm rounded-xl p-4 w-full md:w-auto"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    index === 0 ? 'shadow-lg' : 
                    index === 1 ? 'shadow-lg' : 
                    'shadow-lg'}`}
                  >
                    <span className="text-4xl">{getMedalEmoji(index)}</span>
                  </div>
                  <div>
                    <h2 className="text-gray-900 dark:text-white font-bold text-lg">
                      {winner.fields.Name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {winner.fields.Team}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Posters Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 w-full"
        >
          {posterBackgrounds.map((bg, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ 
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 15 }
              }}
              className="flex justify-center"
            >
              <EnhancedPoster
                programName={programName}
                programCategory={programData.category}
                stage={programData.stage}
                records={programWinners}
                defaultBackground={programData.stage === "OFF STAGE" ? offStage : onStage}
                backgroundImage={bg}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PosterPage;