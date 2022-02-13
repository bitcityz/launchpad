import React, { useState } from 'react'

import '../../../assets/index.css'
import UpcomingPoolCard from './UpcomingPoolCard'

import comingSoonSvg from '../../../assets/images/comingsoon.svg'
import spaceShipSvg from '../../../assets/images/spaceship.svg'

function UpcomingPool({ upcomingPr, poolName }) {
  return (
    <div className="flex flex-col gap-y-8">
      {upcomingPr.length > 0 &&
        upcomingPr.map((project) => {
          return <UpcomingPoolCard key={project.id} project={project} poolName={poolName} />
        })}

      {upcomingPr.length === 0 && (
        <div className="relative px-6 py-5">
          <div
            className="absolute opacity-50 rounded-2xl top-0 left-0 w-full h-full"
            style={{
              background:
                'linear-gradient(114.49deg, rgba(255, 255, 255, 0.165) -21.49%, rgba(255, 255, 255, 0) 111.75%)',
              backdropFilter: 'blur(140px)',
            }}
          />
          <div className="relative z-10">
            <img src={comingSoonSvg} alt="" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-x-3 w-full">
              <span className="font-bold text-2xl md:text-[32px] text-[#F5F5F5] uppercase">Coming Soon</span>
              <img src={spaceShipSvg} alt="" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpcomingPool
