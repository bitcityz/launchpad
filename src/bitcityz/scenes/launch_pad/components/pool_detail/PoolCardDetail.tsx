import React, { useState } from 'react'
import '../../../../assets/index.css'
import oceanProtocolActive1 from '../../../../assets/images/ocean-protocol-active1.svg'
import swapLogo from '../../../../assets/images/logo-swap.png'
import sLogo from '../../../../assets/images/logo-s.png'
import gfxLogo from '../../../../assets/images/logo-gfx.png'
import gLogo from '../../../../assets/images/logo-g.png'
import kalaoLogo from '../../../../assets/images/logo-kalao.png'
import kLogo from '../../../../assets/images/logo-k.png'
import ieBlack from '../../../../assets/images/ie-black.svg'
import twitterBlack from '../../../../assets/images/twitter-black.svg'
import mediumBlack from '../../../../assets/images/medium-black.svg'
import telegramBlack from '../../../../assets/images/telegram-black.svg'

function PoolCardDetail() {

  return (
    <div className="relative">
    <h6 className="text-xl text-shadow font-bold text-[#2CE7FF] flex items-center">
      Mayor pool <img src={oceanProtocolActive1} className="ml-2" alt="" />
    </h6>
    <div className="mt-5 flex gap-x-[30px]">
      <img src={kalaoLogo} alt="" />
      <div>
        <div className="flex items-start gap-x-3">
          <img src={kLogo} alt="" />
          <div>
            <p className="text-[#F5F5F5] leading-5">Kalao</p>
            <p className="text-[#F5F5F5] text-xl font-bold leading-6 mt-1">KLO</p>
            <p className="text-sm text-[#BFBFBF]">The 1st cross-chain liquidity DEX on Avalanche</p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-x-6">
          <img src={ieBlack} alt="" />
          <img src={twitterBlack} alt="" />
          <img src={mediumBlack} alt="" />
          <img src={telegramBlack} alt="" />
        </div>
      </div>
      <div className="ml-auto flex flex-col items-end">
        <p className="text-[#F5F5F5] leading-5 font-semibold">(KLO/BUSD)</p>
        <p className="text-shadow font-semibold text-skyblue mt-auto">Upcoming project</p>
      </div>
    </div>
  </div>
  )
}

export default PoolCardDetail
