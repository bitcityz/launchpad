import React from 'react'
import '../../assets/index.css'
import UpcomingPool from './components/UpcomingPool'
import textSvg from '../../assets/images/launchpad.svg'

function LaunchPad() {
  return (
    <div className="bg-[#050e21]">
      <div className="layout-container text-center py-[110px]">
        <img src={textSvg} className="mx-auto" alt="" />
        <h2 className="text-center text-[#F5F5F5] font-bold text-[32px]">Launchpad</h2>
        <p className="text-[#F5F5F5] text-center max-w-[547px] mx-auto mt-6">
          Stake <span className="font-semibold">3 pools</span> at the same time. Get more opportunities to own hidden
          gems
        </p>
      </div>
      <UpcomingPool />
    </div>
  )
}

export default LaunchPad
