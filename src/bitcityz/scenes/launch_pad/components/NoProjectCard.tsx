import React from 'react'
import '../../../assets/index.css'

import noProjectCardBg from '../../../assets/images/noprojectcard-bg.png'
import sleepPng from '../../../assets/images/sleep.png'

function NoProjectCard() {
  return (
    <div
      className="relative px-5 py-24 flex flex-col items-center justify-center bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${noProjectCardBg})`, backgroundSize: '100% 100%' }}
    >
      <img src={sleepPng} alt="Sleep" />
      <h6 className="text-center text-[#F5F5F5] font-bold text-[32px] mt-14">Oops !</h6>
      <p className="text-white text-base mt-4">Looks like there is no project to display.</p>
    </div>
  )
}

export default NoProjectCard
