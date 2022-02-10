import React from 'react'

import '../../../assets/index.css'
import { Link } from 'react-router-dom'
import textSvg from '../../../assets/images/text.svg'

function HomeHeader() {
  return (
    <div className="text-center py-[110px]">
      <img src={textSvg} className="mx-auto" alt="" />
      <h2 className="text-center text-[#7BF5FB] font-bold text-xl md:text-[32px] text-shadow">BITCITYZ LAUNCHPAD</h2>
      <h2 className="text-center text-[#F5F5F5] font-bold text-xl md:text-[44px]">CITY OF THE HIDDEN GEMS</h2>
      <p className="text-[#F5F5F5] text-center max-w-[547px] mx-auto mt-6 leading-5">
        In just a few simple steps, you can own your hidden gems by participating in IDO and IGO of high-quality
        projects.
      </p>
      <div className="flex flex-col gap-y-5 md:gap-y-0 md:flex-row items-center justify-center mt-7 md:gap-x-10">
        <Link
          to="/launchpad"
          className="bg-[#7BF5FB] rounded-[20px] border-none text-black font-semibold py-3 px-[38px] shadow-blue"
        >
          Join Launchpad
        </Link>
        <button
          type="button"
          className="bg-transparent border-[#7BF5FB] border-solid border-[1px] rounded-[20px] text-[#7BF5FB] font-semibold py-3 px-4"
        >
          Learn about Launchpad
        </button>
      </div>
    </div>
  )
}

export default HomeHeader
