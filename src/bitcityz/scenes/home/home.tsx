import React, { useState } from 'react'
import Summary from './components/Summary'
import UpcomingPool from './components/UpcomingPool'
import LaunchPool from './components/LaunchPool'
import Performance from './components/Performance'
import ApplyLaunch from './components/ApplyLaunch'
import '../../assets/index.css'
import bg from '../../assets/images/bg-summary.png'

function Home() {
  const [count, setCount] = useState(0)
  return (
    <div className="bg-[#050e21] bg-no-repeat bg-top" style={{ backgroundImage: `url(${bg})` }}>
      <Summary />
      <UpcomingPool />
      <LaunchPool />
      <Performance />
      <ApplyLaunch />
    </div>
  )
}

export default Home
