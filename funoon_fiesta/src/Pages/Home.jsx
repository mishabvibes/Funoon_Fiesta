import React from 'react'
import FirstPage from '../Components/FirstPage/FirstPage'
import About from '../Components/About/About'
import TeamOverview from '../Components/TeamOverview/TeamOverview'
import TeamLeader from '../Components/TeamLeader/TeamLeader'
import Contact from '../Components/Contact/Contact'


const Home = () => {
  return (
    <section>
        <FirstPage />
        <About/>
        <TeamOverview />
        <TeamLeader />
        <Contact />
    </section>
  )
}

export default Home
