import React, { useEffect } from 'react';
import first from '../../assets/img/medals/medal1.png';
import third from '../../assets/img/medals/medal2.png';
import second from '../../assets/img/medals/medal3.png';
import HomePattern from '../../assets/img/pattern-01.png';
import { motion } from 'framer-motion';
import { fadeIn } from '../FrameMotion/variants';
import { useResults } from '../../../context/DataContext';
import { useNavigate } from 'react-router-dom';

const TeamOverview = () => {
  const { results } = useResults();
  const navigate = useNavigate();

  // Save results to localStorage whenever they change
  useEffect(() => {
    if (results && results.length > 0) {
      localStorage.setItem('teamResults', JSON.stringify(results));
    }
  }, [results]);

  // Calculate total points for each team using either context or localStorage
  const calculateTeamPoints = () => {
    // Try to get data from context first
    let currentResults = results;

    // If no results in context, try localStorage
    if (!currentResults || currentResults.length === 0) {
      const storedResults = localStorage.getItem('teamResults');
      currentResults = storedResults ? JSON.parse(storedResults) : [];
    }

    const teamPoints = {};

    currentResults.forEach((result) => {
      const teamName = result.teamName.toUpperCase();
      if (!teamPoints[teamName]) {
        teamPoints[teamName] = 0;
      }
      teamPoints[teamName] += result.points;
    });

    return Object.entries(teamPoints)
      .map(([teamName, totalPoints]) => ({
        teamName,
        totalPoints,
      }))
      .sort((a, b) => b.totalPoints - a.totalPoints);
  };

  const teams = calculateTeamPoints();

  const getMedalIcon = (index) => {
    switch (index) {
      case 0:
        return first;
      case 1:
        return second;
      case 2:
        return third;
      default:
        return null;
    }
  };

  const handleResultRedirect = () => {
    navigate('/scoretable');
  };

  return (
    <section className="h-screen w-full flex justify-center flex-col">
      <div className="flex justify-center items-center h-full w-full py-8 sm:py-10 md:py-12 flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-4 sm:px-8 md:px-12 md:w-3/4">
          {teams.map((team, index) => (
            <motion.div
              variants={fadeIn("right", 0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.7 }}
              key={index}
              className="h-11 md:h-14 w-full flex bg-[#D9D9D9] dark:bg-[#FFFFFF] rounded-r-lg md:rounded-r-xl"
            >
              <div className='w-24 bg-[#B7B7B7] dark:bg-[#E7E7E7] flex justify-center'>
                <h1 className="p-2 text-2xl md:text-4xl font-extralight text-black">{index + 1}</h1>
              </div>
              <div className="w-full bg-secondary h-full flex p-5 rounded-r-xl py-2 justify-between items-center">
                <h1 className="text-md md:text-xl lg:text-3xl font-light text-black">
                  {team.teamName} <span>({team.totalPoints})</span>
                </h1>
                {getMedalIcon(index) && (
                  <img
                    src={getMedalIcon(index)}
                    alt="Medal"
                    className="h-full w-auto object-contain"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          variants={fadeIn("left", 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.7 }}
          className='flex justify-center items-center mt-10'
        >
          <button onClick={handleResultRedirect} className='bg-secondery py-3 px-8 md:px-16 rounded-full text-lg md:text-3xl text-white'>
            More Results
          </button>
        </motion.div>
      </div>
      <motion.div
        variants={fadeIn("down", 0.3)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.7 }}
        className="w-full h-36 bg-repeat"
        style={{
          backgroundImage: `url(${HomePattern})`,
          backgroundSize: '140px',
        }}
      />
    </section>
  );
};

export default TeamOverview;