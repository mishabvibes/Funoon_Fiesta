import React from 'react'
// import WinnerPoster from '../Components/Result/WinnerPoster'
// import Poster from '../Components/Result/Poster'
import bg from '../assets/img/poster.jpeg'
import PosterPage from '../Components/Result/PosterPage'

const ScoreBoard = () => {
    // const winners = [
    //     { name: "John Doe", achievement: "Best Performance" },
    //     { name: "Jane Smith", achievement: "Outstanding Contribution" },
    //     { name: "Mike Johnson", achievement: "Excellence Award" }
    // ];
    // const customStyles = {
    //     headerStyles: {
    //       position: 'absolute',
    //       top: '20%',
    //       left: '50%',
    //       transform: 'translateX(-50%)',
    //       width: '100%',
    //     },
    //     groupStyles: {
    //       position: 'absolute',
    //       top: '28%',
    //       left: '50%',
    //       transform: 'translateX(-50%)',
    //       width: '100%',
    //     },
    //     winnersContainerStyles: {
    //       position: 'absolute',
    //       bottom: '25%',
    //       left: '55%',
    //       transform: 'translateX(-50%)',
    //       width: '80%',
    //     },
    //     winnerCardStyles: {
    //       backgroundColor: 'rgba(0, 0, 0, 0.6)',
    //     }
    //   };
    return (
        <section>
            {/* <Poster /> */}
            {/* <WinnerPoster
                programName="Funoon Fiesta 2024"
                groupName="Maalappaatt"
                winners={winners}
                backgroundImage={bg}
                {...customStyles}
            /> */}
            <PosterPage/>
        </section>
    )
}

export default ScoreBoard
