// import React, { useState, useRef } from 'react';
// import { Medal, Download, Star } from 'lucide-react';

// const WinnerPoster = ({
//   programName = "",
//   groupName = "",
//   winners = [
//     { name: "", achievement: "" },
//     { name: "", achievement: "" },
//     { name: "", achievement: "" }
//   ],
//   backgroundImage = "/path/to/background.jpg"
// }) => {
//   const [downloading, setDownloading] = useState(false);
//   const posterRef = useRef(null);

//   const medalColors = {
//     0: "#FFD700",
//     1: "#C0C0C0",
//     2: "#CD7F32"
//   };

//   const downloadPoster = async () => {
//     if (!posterRef.current || downloading) return;

//     try {
//       setDownloading(true);
//       const { default: html2canvas } = await import('html2canvas');

//       const canvas = await html2canvas(posterRef.current, {
//         scale: 2,
//         useCORS: true,
//         backgroundColor: null,
//         onclone: (clonedDoc) => {
//           const clonedElement = clonedDoc.querySelector('#poster-content');
//           if (clonedElement) {
//             clonedElement.style.transform = 'none';
//           }
//         }
//       });

//       const image = canvas.toDataURL('image/png', 1.0);
//       const link = document.createElement('a');
//       link.download = `${programName.toLowerCase().replace(/\s+/g, '-')}-winners.png`;
//       link.href = image;
//       link.click();
//     } catch (error) {
//       console.error('Error generating poster:', error);
//     } finally {
//       setDownloading(false);
//     }
//   };
//   const style = {
//     fontFamily: 'Roboto, sans-serif'
//   };
//   return (
//     <div className="w-full max-w-md md:max-w-lg mx-auto" style={style}>
//       <div
//         id="poster-content"
//         ref={posterRef}
//         className="relative w-full aspect-square overflow-hidden bg-gray-900 shadow-2xl"
//         style={{
//           backgroundImage: `url(${backgroundImage})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       >
//         <div className="absolute inset-0 bg-black/35" />
//         <div className="absolute inset-0 bg-[linear-gradient(45deg,#2e1065,transparent)]" />

//         <div className="relative z-10 w-full h-full p-8 flex flex-col">
//           <div className="text-center mb-8">
//             <h1 className="text-2xl font-bold text-white mb-2">
//               {programName}
//             </h1>
//             <div className="flex items-center justify-center gap-2">
//               <Star className="w-4 h-4 text-yellow-400" />
//               <h2 className="text-sm text-yellow-400 font-medium">
//                 {groupName}
//               </h2>
//               <Star className="w-4 h-4 text-yellow-400" />
//             </div>
//           </div>

//           <div className="flex-grow flex flex-col justify-center space-y-4">
//             {winners.map((winner, index) => (
//               <div
//                 key={index}
//                 className="backdrop-blur-sm bg-white/10 rounded-xl p-2 flex items-center gap-4"
//               >
//                 <div className="p-2 rounded-full bg-white/20">
//                   <Medal 
//                     style={{ color: medalColors[index] }} 
//                     className="w-3 h-3" 
//                   />
//                 </div>
//                 <div className="min-w-0 flex-1">
//                   <h3 className="text-[12px] font-bold text-white">
//                     {winner.name}
//                   </h3>
//                   <p className="text-yellow-400 text-[10px]">
//                     {winner.achievement}
//                   </p>
//                 </div>
//                 <div className="text-md font-bold text-white/50">
//                   #{index + 1}
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="mt-6 text-center">
//             <p className="text-[8px] text-white/60">
//               Funoon Fiesta • 2024 - 2025
//             </p>
//           </div>
//         </div>
//       </div>

//       <button
//         onClick={downloadPoster}
//         // disabled={downloading}
//         className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl py-3 px-6 flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         <Download className="w-5 h-5" />
//         {downloading ? 'Generating...' : 'Download Poster'}
//       </button>
//     </div>
//   );
// };

// export default WinnerPoster;



// import React, { useState, useRef } from 'react';
// import { Medal, Download, Star } from 'lucide-react';
// import domtoimage from 'dom-to-image';

// const WinnerPoster = ({
//   programName = "",
//   groupName = "",
//   winners = [
//     { name: "", achievement: "" },
//     { name: "", achievement: "" },
//     { name: "", achievement: "" }
//   ],
//   backgroundImage = "/path/to/background.jpg"
// }) => {
//   const [downloading, setDownloading] = useState(false);
//   const posterRef = useRef(null);

//   const medalColors = {
//     0: "#FFD700", // Gold
//     1: "#C0C0C0", // Silver
//     2: "#CD7F32"  // Bronze
//   };

//   const downloadPoster = async () => {
//     if (!posterRef.current || downloading) return;

//     try {
//       setDownloading(true);

//       // Enhanced quality settings
//       const scale = 4; // Increase scale factor for better resolution
//       const options = {
//         quality: 1.0,
//         scale: scale,
//         height: posterRef.current.offsetHeight * scale,
//         width: posterRef.current.offsetWidth * scale,
//         style: {
//           transform: 'scale(' + scale + ')',
//           transformOrigin: 'top left',
//           width: posterRef.current.offsetWidth + "px",
//           height: posterRef.current.offsetHeight + "px"
//         }
//       };

//       // First try PNG for best quality
//       try {
//         const dataUrl = await domtoimage.toPng(posterRef.current, options);
//         const link = document.createElement('a');
//         link.download = `${programName.toLowerCase().replace(/\s+/g, '-')}-winners.png`;
//         link.href = dataUrl;
//         link.click();
//       } catch (pngError) {
//         console.warn('PNG generation failed, falling back to JPEG', pngError);
        
//         // Fallback to JPEG if PNG fails
//         const jpegDataUrl = await domtoimage.toJpeg(posterRef.current, {
//           ...options,
//           quality: 0.95 // High quality JPEG
//         });
        
//         const link = document.createElement('a');
//         link.download = `${programName.toLowerCase().replace(/\s+/g, '-')}-winners.jpg`;
//         link.href = jpegDataUrl;
//         link.click();
//       }
//     } catch (error) {
//       console.error('Error generating poster:', error);
//       alert('Failed to generate poster. Please try again.');
//     } finally {
//       setDownloading(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-md md:max-w-lg mx-auto font-sans">
//       <div
//         ref={posterRef}
//         className="relative w-full aspect-square overflow-hidden bg-gray-900 shadow-2xl"
//         style={{
//           backgroundImage: `url(${backgroundImage})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       >
//         <div className="absolute inset-0 bg-black/35" />
//         <div className="absolute inset-0 bg-[linear-gradient(45deg,#2e1065,transparent)]" />

//         <div className="relative z-10 w-full h-full p-8 flex flex-col">
//           <div className="text-center mb-8">
//             <h1 className="text-2xl font-bold text-white mb-2">
//               {programName}
//             </h1>
//             <div className="flex items-center justify-center gap-2">
//               <Star className="w-4 h-4 text-yellow-400" />
//               <h2 className="text-sm text-yellow-400 font-medium">
//                 {groupName}
//               </h2>
//               <Star className="w-4 h-4 text-yellow-400" />
//             </div>
//           </div>

//           <div className="flex-grow flex flex-col justify-center space-y-4">
//             {winners.map((winner, index) => (
//               <div
//                 key={index}
//                 className="backdrop-blur-sm bg-white/10 rounded-xl p-2 flex items-center gap-4"
//               >
//                 <div className="p-2 rounded-full bg-white/20">
//                   <Medal 
//                     style={{ color: medalColors[index] }} 
//                     className="w-5 h-5" 
//                   />
//                 </div>
//                 <div className="min-w-0 flex-1">
//                   <h3 className="text-[12px] font-bold text-white">
//                     {winner.name}
//                   </h3>
//                   <p className="text-yellow-400 text-[10px]">
//                     {winner.achievement}
//                   </p>
//                 </div>
//                 <div className="text-md font-bold text-white/50">
//                   #{index + 1}
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="mt-6 text-center">
//             <p className="text-[8px] text-white/60">
//               Funoon Fiesta • 2024 - 2025
//             </p>
//           </div>
//         </div>
//       </div>

//       <button
//         onClick={downloadPoster}
//         disabled={downloading}
//         className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl py-3 px-6 flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         <Download className="w-5 h-5" />
//         {downloading ? 'Generating...' : 'Download Poster'}
//       </button>
//     </div>
//   );
// };

// export default WinnerPoster;












import React, { useState, useRef } from 'react';
import { Medal, Download, Star } from 'lucide-react';
import classNames from 'classnames';

const WinnerPoster = ({
  programCategory = "",
  programName = "",
  stage = "ON STAGE",
  records = [],
  defaultBackground = "",
  backgroundImage = ""
}) => {
  const [downloading, setDownloading] = useState(false);
  const posterRef = useRef(null);

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
    if (!posterRef.current || downloading) return;

    try {
      setDownloading(true);
      const { default: html2canvas } = await import('html2canvas');

      // Create a clone with fixed dimensions for download
      const posterClone = posterRef.current.cloneNode(true);
      posterClone.style.width = '800px';
      posterClone.style.height = '800px';
      posterClone.style.position = 'absolute';
      posterClone.style.left = '-9999px';
      document.body.appendChild(posterClone);

      const canvas = await html2canvas(posterClone, {
        width: 800,
        height: 800,
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });

      document.body.removeChild(posterClone);

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

  const medalColors = {
    1: "#FFD700", // Gold
    2: "#C0C0C0", // Silver
    3: "#CD7F32"  // Bronze
  };

  return (
    <div className="w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[500px] mx-auto">
      <div
        id="poster-content"
        ref={posterRef}
        className="relative w-full aspect-square overflow-hidden rounded-xl shadow-2xl"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : `url(${defaultBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay layers */}
        <div className="absolute inset-0 bg-black/35" />
        <div className={classNames(
          "absolute inset-0",
          {
            'bg-[linear-gradient(45deg,#2e1065,transparent)]': stage === 'OFF STAGE',
            'bg-[linear-gradient(45deg,#78350f,transparent)]': stage === 'ON STAGE'
          }
        )} />

        {/* Content */}
        <div className="relative z-10 w-full h-full p-4 sm:p-6 lg:p-8 flex flex-col">
          {/* Header */}
          <div className="text-center mb-4 sm:mb-6 lg:mb-8">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2">
              {programName}
            </h1>
            <div className="flex items-center justify-center gap-2">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
              <h2 className="text-xs sm:text-sm lg:text-base text-yellow-400 font-medium">
                {programCategory}
              </h2>
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
            </div>
          </div>

          {/* Winners List */}
          <div className="flex-grow flex flex-col justify-center space-y-2 sm:space-y-3 lg:space-y-4">
            {Object.entries(groupRecordsByPlace(records)).map(([place, placeRecords]) => (
              placeRecords.map((record, index) => (
                <div
                  key={`${place}-${index}`}
                  className="backdrop-blur-sm bg-white/10 rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 flex items-center gap-2 sm:gap-3 lg:gap-4"
                >
                  <div className="p-1.5 sm:p-2 rounded-full bg-white/20">
                    <Medal 
                      className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5"
                      style={{ color: medalColors[parseInt(place)] }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs sm:text-sm lg:text-base font-bold text-white truncate">
                      {record.fields.Name}
                    </h3>
                    <p className="text-xs sm:text-sm lg:text-base text-yellow-400 truncate">
                      {record.fields.Team}
                    </p>
                  </div>
                  <div className="text-sm sm:text-base lg:text-lg font-bold text-white/50">
                    #{place}
                  </div>
                </div>
              ))
            ))}
          </div>

          {/* Footer */}
          <div className="mt-4 text-center">
            <p className="text-xs sm:text-sm text-white/60">
              {stage} • 2024 - 2025
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={downloadPoster}
        disabled={downloading}
        className="mt-3 sm:mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl py-2 sm:py-3 px-4 flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Download className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base">
          {downloading ? 'Generating...' : 'Download Poster'}
        </span>
      </button>
    </div>
  );
};

export default WinnerPoster;