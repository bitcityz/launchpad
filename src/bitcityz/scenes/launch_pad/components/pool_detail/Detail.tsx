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
import tokenURI from '../../../../assets/images/tokenURI.png'

function Detail() {
  return (
    <div className="pt-5 relative">
      <div className="flex items-start gap-x-9">
        <img src={tokenURI} alt="" />
        <div className="flex-1">
          <p className="grid gap-x-8 mt-3" style={{ gridTemplateColumns: '150px auto' }}>
            <span className="text-[#9E9E9E]">Token Distribution:</span>
            <span className="font-semibold text-[#F5F5F5]">Claim</span>
          </p>
          <p className="grid gap-x-8 mt-3" style={{ gridTemplateColumns: '150px auto' }}>
            <span className="text-[#9E9E9E]">Swap Amount:</span>
            <span className="font-semibold text-[#F5F5F5]">2,178,058 GFX</span>
          </p>
          <p className="grid gap-x-8 mt-3" style={{ gridTemplateColumns: '150px auto' }}>
            <span className="text-[#9E9E9E]">Access type:</span>
            <span className="font-semibold text-[#F5F5F5]">Mayor pass-ticket</span>
          </p>
          <p className="grid gap-x-8 mt-3" style={{ gridTemplateColumns: '150px auto' }}>
            <span className="text-[#9E9E9E]">Price per token:</span>
            <span className="font-semibold text-[#F5F5F5]">1 GRX = 0.0278 BUSD</span>
          </p>
          <p className="grid gap-x-8 mt-3" style={{ gridTemplateColumns: '150px auto' }}>
            <span className="text-[#9E9E9E]">Total capital raise:</span>
            <span className="font-semibold text-[#F5F5F5]">10,000 BUSD</span>
          </p>
          <p className="grid gap-x-8 mt-3" style={{ gridTemplateColumns: '150px auto' }}>
            <span className="text-[#9E9E9E]">Claim policy:</span>
            <span className="font-semibold text-[#F5F5F5]">20% at TGE, 40% at month 4, 40% at month 8</span>
          </p>
        </div>
      </div>
      <h6 className="text-[#F5F5F5] text-xl font-bold mt-7">Timeline</h6>
      <ul className="list-none mt-5">
          <li className='relative pl-8 after:timeline-after before:timeline-before'>
              <p className="text-[#9E9E9E] font-semibold leading-5">Register mayor pool whitelist (Close)</p>
              <p className="text-[#9E9E9E] leading-5">Open: 01/10/2021 09:00 am UTC - Close: 06/10/2021 09:00 am UTC</p>
          </li>
          <li className='relative pl-8 mt-7 after:timeline-after before:timeline-before'>
              <p className="text-[#9E9E9E] font-semibold leading-5">Publish mayor pool whitelist (Close)</p>
              <p className="text-[#9E9E9E] leading-5">Open: 01/10/2021 09:00 am UTC - Close: 06/10/2021 09:00 am UTC</p>
          </li>
          <li className='relative pl-8 mt-7 after:timeline-after after:timeline-after-active before:timeline-before'>
              <p className="text-skyblue font-semibold leading-5">Join mayor pool (Opening)</p>
              <p className="text-skyblue leading-5">Open: 01/10/2021 09:00 am UTC - Close: 06/10/2021 09:00 am UTC</p>
          </li>
          <li className='relative pl-8 mt-7 after:timeline-after'>
              <p className="text-[#9E9E9E] font-semibold leading-5">Claim tokens (Incoming)</p>
              <p className="text-[#9E9E9E] leading-5">30 mins after listing</p>
          </li>
      </ul>
    </div>
  )
}

export default Detail
