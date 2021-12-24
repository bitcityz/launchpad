import React from 'react'

import '../../../assets/index.css'
import launchPool from '../../../assets/images/launchpool.svg'
import bgCardPink from '../../../assets/images/bg-lauchpool-card-pink.png'
import bgCardBlue from '../../../assets/images/bg-lauchpool-card-blue.png'
import bgCardGreen from '../../../assets/images/bg-lauchpool-card-green.png'
import bgBtn from '../../../assets/images/bg-launch-pool-btn.png'

function LaunchPool(props) {
  return (
    <div className="layout-container">
      <div className="text-center pt-[170px]">
        <img src={launchPool} className="mx-auto" alt="" />
        <h2 className="text-center text-[#F5F5F5] font-bold text-[32px] leading-9 text-shadow">Launchpool</h2>
        <p className="text-center text-[#F5F5F5] mt-5 leading-5">
          Stake <span className="text-white font-semibold">3 pools</span> at the same time. Get more opportunities to
          own hidden gems
        </p>
      </div>
      <div className="grid grid-cols-3 gap-x-8 mt-[52px]">
        <div className="flex flex-col gap-y-5">
          <div className="px-6 py-[23px] rounded-2xl relative">
            <div
              className="absolute top-0 left-0 w-full h-full opacity-30 rounded-2xl"
              style={{
                background:
                  'linear-gradient(114.49deg, rgba(255, 255, 255, 0.33) -21.49%, rgba(255, 255, 255, 0) 111.75%)',
              }}
            />
            <div className="relative">
              <img src={bgCardPink} alt="" />
              <p className="flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="font-bold text-2xl text-skyblue text-shadow">MAYOR</span>
                <span className="font-bold text-xs text-skyblue text-shadow">PASS TICKET</span>
              </p>
            </div>
            <p className="text-skyblue text-shadow mt-4 text-center">Pool Details</p>
            <p className="flex justify-between items-center text-sm text-[#F5F5F5] mt-4">
              <span>Required:</span>
              <span> &gt;= 100,000 BCTZ</span>
            </p>
            <p className="flex justify-between items-center text-sm text-[#F5F5F5] mt-2">
              <span>Required Lock Time::</span>
              <span> 7 days</span>
            </p>
          </div>
          <button
            type="button"
            className="w-full h-[77px] bg-no-repeat bg-center bg-cover text-skyblue text-shadow font-semibold"
            style={{ backgroundImage: `url(${bgBtn})` }}
          >
            Mayor tickets: 0
          </button>
        </div>
        <div className="flex flex-col gap-y-5">
          <div className="px-6 py-[23px] rounded-2xl relative">
            <div
              className="absolute top-0 left-0 w-full h-full opacity-30 rounded-2xl"
              style={{
                background:
                  'linear-gradient(114.49deg, rgba(255, 255, 255, 0.33) -21.49%, rgba(255, 255, 255, 0) 111.75%)',
              }}
            />
            <div className="relative">
              <img src={bgCardBlue} alt="" />
              <p className="flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="font-bold text-2xl text-skyblue text-shadow">ELITE</span>
                <span className="font-bold text-xs text-skyblue text-shadow">PASS TICKET</span>
              </p>
            </div>
            <p className="text-skyblue text-shadow mt-4 text-center">Pool Details</p>
            <p className="flex justify-between items-center text-sm text-[#F5F5F5] mt-4">
              <span>Required:</span>
              <span> 50,000 - 99,999 BCTZ</span>
            </p>
            <p className="flex justify-between items-center text-sm text-[#F5F5F5] mt-2">
              <span>Required Lock Time::</span>
              <span> 7 days</span>
            </p>
          </div>
          <button
            type="button"
            className="w-full h-[77px] bg-no-repeat bg-center bg-cover text-skyblue text-shadow font-semibold"
            style={{ backgroundImage: `url(${bgBtn})` }}
          >
            Elite tickets: 0
          </button>
        </div>
        <div className="flex flex-col gap-y-5">
          <div className="px-6 py-[23px] rounded-2xl relative">
            <div
              className="absolute top-0 left-0 w-full h-full opacity-30 rounded-2xl"
              style={{
                background:
                  'linear-gradient(114.49deg, rgba(255, 255, 255, 0.33) -21.49%, rgba(255, 255, 255, 0) 111.75%)',
              }}
            />
            <div className="relative">
              <img src={bgCardGreen} alt="" />
              <p className="flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="font-bold text-2xl text-skyblue text-shadow">CITYZEN</span>
                <span className="font-bold text-xs text-skyblue text-shadow">PASS TICKET</span>
              </p>
            </div>
            <p className="text-skyblue text-shadow mt-4 text-center">Pool Details</p>
            <p className="flex justify-between items-center text-sm text-[#F5F5F5] mt-4">
              <span>Required:</span>
              <span> 10,000 - 49,999 BCTZ</span>
            </p>
            <p className="flex justify-between items-center text-sm text-[#F5F5F5] mt-2">
              <span>Required Lock Time::</span>
              <span> 7 days</span>
            </p>
          </div>
          <button
            type="button"
            className="w-full h-[77px] bg-no-repeat bg-center bg-cover text-skyblue text-shadow font-semibold"
            style={{ backgroundImage: `url(${bgBtn})` }}
          >
            Cityzen tickets: 0
          </button>
        </div>
      </div>
      <div className="text-center">
        <button
          type="button"
          className="bg-skyblue mt-8 rounded-[20px] border-none text-black font-semibold h-[44px] px-[50px] shadow-blue"
        >
          Stake now
        </button>
      </div>
    </div>
  )
}

export default LaunchPool
