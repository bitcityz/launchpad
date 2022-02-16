import React from 'react'

import '../../../assets/index.css'

import textSvg from '../../../assets/images/launchpool.svg'

function LaunchpoolHeader() {
  return (
    <div className="layout-container text-center py-[110px]">
      <img src={textSvg} className="mx-auto" alt="" />
      <h2 className="text-center text-skyblue text-shadow font-bold text-[32px]">Launchpool</h2>
      <p className="text-[#F5F5F5] text-center max-w-[547px] mx-auto mt-6">
        Stake <span className="font-semibold">3 pools</span> at the same time. Get more opportunities to own hidden gems
      </p>
    </div>
  )
}

export default LaunchpoolHeader
