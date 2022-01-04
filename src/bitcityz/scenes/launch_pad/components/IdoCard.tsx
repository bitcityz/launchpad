import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { formatEther } from 'ethers/lib/utils'
import '../../../assets/index.css'
import { Link } from 'react-router-dom'

import oceanProtocolActive1 from '../../../assets/images/ocean-protocol-active1.svg'
import swapLogo from '../../../assets/images/logo-swap.png'
import sLogo from '../../../assets/images/logo-s.png'
import gfxLogo from '../../../assets/images/logo-gfx.png'
import gLogo from '../../../assets/images/logo-g.png'
import kalaoLogo from '../../../assets/images/logo-kalao.png'
import kLogo from '../../../assets/images/logo-k.png'
import ieBlack from '../../../assets/images/ie-black.svg'
import twitterBlack from '../../../assets/images/twitter-black.svg'
import mediumBlack from '../../../assets/images/medium-black.svg'
import telegramBlack from '../../../assets/images/telegram-black.svg'

function IdoCard({ ido, pools }) {
    const [idoName, setIdoName] = useState([])

    useEffect(() => {
        const pool = pools.filter(r => {
            return r.hash === ido.keyType
        })
        setIdoName(pool[0].name)
    }, [pools, ido])
  return (
    <div className="relative px-6 py-5">
      <div
        className="absolute opacity-50 rounded-2xl top-0 left-0 w-full h-full"
        style={{
          background: 'linear-gradient(114.49deg, rgba(255, 255, 255, 0.165) -21.49%, rgba(255, 255, 255, 0) 111.75%)',
          backdropFilter: 'blur(140px)',
        }}
      />
      <div className="relative z-10">
        <h6 className="text-xl text-shadow font-bold text-[#2CE7FF] flex items-center">
          {idoName} pool <img src={oceanProtocolActive1} className="ml-2" alt="" />
        </h6>
        <div className="mt-5 flex gap-x-[30px]">
          <img src={gfxLogo} alt="" />
          <div>
            <div className="flex items-start gap-x-3">
              <img src={gLogo} alt="" />
              <div>
                <p className="text-[#F5F5F5] leading-5">Goose FX Finance</p>
                <p className="text-[#F5F5F5] text-xl font-bold leading-6 mt-1">GFX</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-x-6">
              <img src={ieBlack} alt="" />
              <img src={twitterBlack} alt="" />
              <img src={mediumBlack} alt="" />
              <img src={telegramBlack} alt="" />
            </div>
            <div className="mt-4">
              <p className="flex justify-between items-center">
                <span className="text-[#BFBFBF]">Total capital raise</span>
                <span className="text-[#F5F5F5] font-semibold">{Number(formatEther(ido.totalAmount)).toLocaleString('en', {
                  maximumFractionDigits: 0,
                })} BUSD</span>
              </p>
              <p className="flex justify-between items-center mt-2">
                <span className="text-[#BFBFBF]">Whitelist registration starts</span>
                <span className="text-[#F5F5F5] font-semibold">{format(ido.startTime*1000, 'Pp')} (UTC)</span>
              </p>
              <p className="flex justify-between items-center mt-2">
                <span className="text-[#BFBFBF]">Whitelist registration starts</span>
                <span className="text-[#F5F5F5] font-semibold ml-8">{format(ido.endTime*1000, 'Pp')} (UTC)</span>
              </p>
            </div>
          </div>
          <div className="ml-auto flex flex-col items-end">
            <p className="text-[#F5F5F5] leading-5 font-semibold">(GFX/BUSD)</p>
            <p className="text-shadow font-semibold leading-5 mt-2 text-[#2CE7FF]">GFX = 0.05 BUSD</p>
            <Link to="/launchpad/1" className="bg-skyblue mt-auto rounded-[20px] flex items-center border-none text-black font-semibold h-[44px] px-[50px] shadow-blue">
            More Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IdoCard
