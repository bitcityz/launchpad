import React from 'react'
import { useWeb3React } from '@web3-react/core'

import '../../../assets/index.css'

import bgCardPink from '../../../assets/images/bg-lauchpool-card-pink.png'
import bgCardBlue from '../../../assets/images/bg-lauchpool-card-blue.png'
import bgCardGreen from '../../../assets/images/bg-lauchpool-card-green.png'
import bgBtn from '../../../assets/images/bg-launch-pool-btn.png'
import linkSqare from '../../../assets/images/link-square.svg'

function CardPool(props) {
  const { account } = useWeb3React()
  return (
    <div className="relative p-6">
      <div
        className="opacity-30 absolute top-0 left-0 w-full h-full rounded-2xl"
        style={{
          background: 'linear-gradient(114.49deg, rgba(255, 255, 255, 0.33) -21.49%, rgba(255, 255, 255, 0) 111.75%)',
        }}
      />
      <div className="flex gap-x-6 z-10 relative">
        <div className="flex flex-col gap-y-5">
          <div className="relative">
            <img src={bgCardPink} alt="" />
            <p className="flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="font-bold text-2xl text-skyblue text-shadow">MAYOR</span>
              <span className="font-bold text-xs text-skyblue text-shadow">PASS TICKET</span>
            </p>
          </div>
          <button
            type="button"
            className="w-full h-[77px] bg-no-repeat bg-center bg-contain text-skyblue text-shadow font-semibold"
            style={{ backgroundImage: `url(${bgBtn})` }}
          >
            Mayor tickets: 0
          </button>
        </div>
        <div className="flex-1 flex flex-col">
          <h6 className="text-xl font-bold text-[#F5F5F5] leading-6">Mayor Pass-ticket</h6>
          <div className="grid grid-cols-3 gap-x-5 gap-y-4 mt-6">
            <div>
              <p className="text-[#F5F5F5]">Required: </p>
              <p className="text-skyblue font-semibold text-shadow mt-[10px]">&gt;= 100,000 BCTZ</p>
            </div>
            <div>
              <p className="text-[#F5F5F5]">Staking: </p>
              <p className="text-skyblue font-semibold text-shadow mt-[10px]">0 BCTZ</p>
            </div>
            <div>
              <p className="text-[#F5F5F5]">Lock-up Time:</p>
              <p className="text-skyblue font-semibold text-shadow mt-[10px]">7 days</p>
            </div>
            <div>
              <p className="text-[#F5F5F5]">Remaining unlock</p>
              <p className="text-skyblue font-semibold text-shadow mt-[10px]">7 days : 00 hours : 00 mins</p>
            </div>
            <div className="flex items-end">
              <a href="/" className="flex items-center underline text-[#2CE7FF] text-sm text-shadow">
                View Smart contract <img src={linkSqare} className="ml-[6px]" alt="" />
              </a>
            </div>
          </div>
          <div className="flex items-end justify-end flex-1">
            {!account ? (
              <button
                type="button"
                className="bg-skyblue rounded-[20px] border-none text-black text-sm font-semibold h-[42px] px-10 shadow-blue"
              >
                Connect wallet
              </button>
            ) : (
              <button
                type="button"
                className="bg-skyblue rounded-[20px] border-none text-black text-sm font-semibold h-[42px] px-10 shadow-blue"
              >
                Approve contract
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardPool
