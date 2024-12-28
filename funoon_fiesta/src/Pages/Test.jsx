import React, { useState, useEffect } from 'react';
import EmblaCarousel from "../Components/Result/EmblaCarousel";

const Test = () => {
    const [slides, setSlides] = useState([]);
    
    useEffect(() => {
      // Example mock data that matches the required structure
      const mockSlides = [
        {
          programCategory: "Competition",
          programName: "Dance Battle",
          stage: "ON STAGE",
          records: [
            {
              fields: {
                Name: "John Doe",
                Team: "Team Alpha",
                Place: "1st"
              }
            },
            {
              fields: {
                Name: "Jane Smith",
                Team: "Team Beta",
                Place: "2nd"
              }
            }
          ]
        }
        // Add more slides as needed
      ];
      
      setSlides(mockSlides);
    }, []);
  
    return (
      <div>
        <EmblaCarousel slides={slides} />
      </div>
    );
};

export default Test;