// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import html2canvas from "html2canvas";
// import { useParams } from "react-router-dom";
// import { Download } from "lucide-react";
// import { useResults } from "../../../context/DataContext";
// import onStage from "../../assets/img/poster.jpeg";
// import posterBg from "../../assets/img/poster.jpeg";
// import first from '../../assets/img/medals/medal1.png';
// import second from '../../assets/img/medals/medal2.png';
// import third from '../../assets/img/medals/medal3.png';

// const Poster = () => {
//   const { programName } = useParams();
//   const { results } = useResults();
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkIsMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkIsMobile();
//     window.addEventListener('resize', checkIsMobile);
//     return () => {
//       window.removeEventListener('resize', checkIsMobile);
//     };
//   }, []);

//   const programResults = results
//     .filter(result => result.programName === programName)
//     .sort((a, b) => b.points - a.points)
//     .slice(0, 3);

//   const getProgramCategory = () => {
//     const program = results.find(result => result.programName === programName);
//     return program ? program.category : "";
//   };

//   const getMedalInfo = (index) => {
//     const medals = [
//       { image: first, color: 'bg-orange-500' },
//       { image: second, color: 'bg-gray-500' },
//       { image: third, color: 'bg-yellow-600' }
//     ];
//     return medals[index];
//   };

//   const getMedalColor = (index) => {
//     const colors = ['bg-yellow-400', 'bg-gray-300', 'bg-orange-400'];
//     return colors[index];
//   };

//   const downloadPoster = async (index) => {
//     const posterElement = document.getElementById(`poster-${index}`);
//     if (posterElement) {
//       try {
//         const canvas = await html2canvas(posterElement);
//         const link = document.createElement("a");
//         link.download = `${programName}-results-${index + 1}.png`;
//         link.href = canvas.toDataURL("image/png");
//         link.click();
//       } catch (error) {
//         console.error("Error generating poster:", error);
//       }
//     }
//   };

//   if (!programResults.length) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p className="text-xl text-gray-600">No results found for this program</p>
//       </div>
//     );
//   }

//   const PosterContent = ({ index }) => (
//     <motion.div
//       id={`poster-${index}`}
//       className="relative text-white p-12 shadow-lg w-96 h-96"
//       style={{
//         backgroundImage: `url(${posterBg})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 1 }}
//     >
//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold mb-2 leading-tight">
//           {programName}
//         </h1>
//         <p className="text-lg uppercase tracking-widest text-gray-300">
//           {getProgramCategory()}
//         </p>
//       </div>

//       <div className="space-y-6">
//         {programResults.map((result, idx) => (
//           <div key={idx} className="flex items-center space-x-4">
//             <div className="relative">
//               <img 
//                 src={getMedalInfo(idx).image} 
//                 alt={`${idx + 1} place medal`}
//                 className="w-12 h-12 object-contain"
//               />
//             </div>
//             <div className="flex-1">
//               <p className="text-lg font-semibold">{result.studentName}</p>
//               <p className="text-sm text-gray-200">{result.teamName}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="absolute top-6 right-6">
//         <img src={onStage} alt="Decoration" className="w-12 opacity-80" />
//       </div>
//     </motion.div>
//   );

//   return (
//     <div className="min-h-screen  text-white">
//       <div className="container mx-auto px-4 py-8 flex justify-center flex-col items-center">
//         {/* Header */}
//         <div className="bg-gray-800/50 rounded-xl p-6 mb-8 ">
//           <h1 className="text-2xl font-bold text-center mb-8">{programName}</h1>
          
//           {/* Winners List */}
//           <div className="space-y-4">
//             {programResults.map((result, index) => (
//               <div key={index} className="flex items-center gap-4 p-4">
//                 <div className={`w-10 h-10 rounded-full ${getMedalColor(index)} flex items-center justify-center`}>
//                   <span className="font-bold">{index + 1}</span>
//                 </div>
//                 <div>
//                   <h3 className="font-semibold">{result.studentName}</h3>
//                   <p className="text-sm text-gray-400">{result.teamName}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Posters Grid */}
//         <div className="flex">
//           {[0, 1, 2].map((index) => (
//             <div key={index} className=" rounded-lg p-4">
//               <PosterContent index={index} />
//             </div>
//           ))}
//         </div>

//         {/* Download Button */}
//         <div className="flex justify-center mt-8">
//           <button
//             onClick={() => downloadPoster(0)}
//             className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-colors"
//           >
//             <span>DOWNLOAD</span>
//             <Download size={20} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Poster;



import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

const Poster = ({ programCategory, programName, stage, records, backgroundImage }) => {
  const [downloading, setDownloading] = useState(false);

  const groupRecordsByPlace = (records) => {
    const groupedRecords = {};
    records.forEach((record) => {
      const place = record.fields.Place;
      if (!groupedRecords[place]) {
        groupedRecords[place] = [];
      }
      groupedRecords[place].push(record);
    });
    return groupedRecords;
  };

  const downloadPoster = async () => {
    if (downloading) return;
    
    try {
      setDownloading(true);
      const poster = document.getElementById('poster');
      const { default: html2canvas } = await import('html2canvas');
      
      const canvas = await html2canvas(poster, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: true,
        onclone: (clonedDoc) => {
          const element = clonedDoc.getElementById('poster');
          if (element) {
            element.style.transform = 'none';
          }
        }
      });

      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `${programName.toLowerCase().replace(/\s+/g, '-')}-winners.png`;
      link.href = image;
      link.click();
    } catch (error) {
      console.error('Error generating poster:', error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-4"
    >
      <div 
        className="max-w-[450px] rounded-lg overflow-hidden mx-auto shadow-xl relative"
        id="poster"
        style={{ aspectRatio: '3/4' }}
      >
        {/* Background Image Container */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col px-8 py-12">
          {/* Program Name and Category */}
          <div className="text-center mb-8">
            <h1 className={`text-xl font-bold uppercase mb-1 ${
              stage === 'OFF STAGE' ? 'text-purple-800' : 'text-amber-900'
            }`}>
              {programName}
            </h1>
            <p className={`text-sm ${
              stage === 'OFF STAGE' ? 'text-purple-800' : 'text-amber-900'
            }`}>
              {programCategory}
            </p>
          </div>

          {/* Winners List */}
          <div className="flex-grow">
            {Object.entries(groupRecordsByPlace(records)).map(([place, placeRecords]) => (
              <div key={place} className="mb-6">
                {placeRecords.map((record, index) => (
                  <div
                    key={index}
                    className={`text-center mb-2 ${
                      stage === 'OFF STAGE' ? 'text-purple-800' : 'text-amber-900'
                    }`}
                  >
                    <h3 className="font-semibold text-base">
                      {record.fields.Name}
                    </h3>
                    <p className="text-sm">
                      {record.fields.Team}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={downloadPoster}
        disabled={downloading}
        className="w-full bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl py-3 px-6 flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Download className="w-5 h-5" />
        {downloading ? 'Generating...' : 'Download Poster'}
      </button>
    </motion.div>
  );
};

export default Poster;