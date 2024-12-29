

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
      posterClone.style.width = '400px';
      posterClone.style.height = '400px';
      // posterClone.style.position = 'absolute';
      posterClone.style.left = '-9999px';
      document.body.appendChild(posterClone);

      const canvas = await html2canvas(posterClone, {
        width: 400,
        height: 400,
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
        className="relative w-full aspect-square overflow-hidden shadow-2xl"
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
        <div className="relative z-10 w-full h-full p-4 sm:p-6 md:p-8 flex flex-col">
          {/* Header */}
          <div className="text-center ">
            <h1 className="text-lg sm:text-xl font-bold text-white mb-2">
              {programName}
            </h1>
            <div className="flex items-center justify-center gap-2">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
              <h2 className="text-xs sm:text-sm text-yellow-400 font-medium">
                {programCategory}
              </h2>
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
            </div>
          </div>

          {/* Winners List */}
          <div className="flex-grow flex flex-col justify-center space-y-2 sm:space-y-3">
            {Object.entries(groupRecordsByPlace(records)).map(([place, placeRecords]) => (
              placeRecords.map((record, index) => (
                <div
                  key={`${place}-${index}`}
                  className="flex items-center gap-2 sm:gap-3 lg:gap-4"
                >
                  <div className="p-1.5 sm:p-2 rounded-md sm:rounded-xl bg-white/20">
                    <Medal 
                      className="w-3 h-3 sm:w-6 sm:h-6"
                      style={{ color: medalColors[parseInt(place)] }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs sm:text-sm lg:text-base font-bold text-white truncate">
                      {record.fields.Name}
                    </h3>
                    <p className="text-xs text-yellow-400 truncate">
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
            <p className="text-xs text-white/60">
              Funoon Fiesta • 2024 - 2025
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