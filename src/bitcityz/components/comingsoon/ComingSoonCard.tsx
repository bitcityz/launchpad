import React from 'react'
import '../../assets/index.css'

import comingSoon from '../../assets/images/comingsoon.png'
import noProjectCardBg from '../../assets/images/noprojectcard-bg.png'

function ComingSoonCard() {
  return (
    <div
      className="relative px-5 py-24 flex flex-col items-center justify-center bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${noProjectCardBg})`, backgroundSize: '100% 100%' }}
    >
      <img src={comingSoon} alt="Sleep" />
      <h6 className="text-center text-[#F5F5F5] font-bold text-[32px] mt-14">Coming soon !</h6>
      {/* <p className="text-white text-base mt-4">The upcoming project will comming soon.</p> */}
    </div>
  )
}

export default ComingSoonCard
