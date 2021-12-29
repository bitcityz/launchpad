import React, { useState } from 'react'

import '../../../assets/index.css'

import line1 from '../../../assets/images/line1.svg'
import line2 from '../../../assets/images/line2.svg'
import calendarAdd from '../../../assets/images/calendar-add.svg'
import activitySvg from '../../../assets/images/activity.svg'
import editSvg from '../../../assets/images/edit.svg'
import taskSquare from '../../../assets/images/task-square.svg'
import calendarAddActive from '../../../assets/images/calendar-add-active.svg'
import activityActiveSvg from '../../../assets/images/activity-active.svg'
import editActiveSvg from '../../../assets/images/edit-active.svg'
import taskSquareActive from '../../../assets/images/task-square-active.svg'
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

function UpcomingPool() {
  const [tabIndex, setTabIndex] = useState(1)
  const _handleChangeTab = (index) => {
    setTabIndex(index)
  }
  return (
    <div className="layout-container">
      <div className="text-center">
        <img src={line1} className="mt-14 w-full h-auto" alt="" />
        <div className="grid grid-cols-4 gap-x-8">
          <button
            type="button"
            className={` tab ${tabIndex === 1 ? 'tab-active' : ''}`}
            onClick={() => _handleChangeTab(1)}
          >
            {tabIndex === 1 ? (
              <img src={calendarAddActive} className="ml-1" alt="" />
            ) : (
              <img src={calendarAdd} className="ml-1" alt="" />
            )}
            Upcoming
          </button>
          <button
            type="button"
            className={` tab ${tabIndex === 2 ? 'tab-active' : ''}`}
            onClick={() => _handleChangeTab(2)}
          >
            {tabIndex === 2 ? (
              <img src={editActiveSvg} className="ml-1" alt="" />
            ) : (
              <img src={editSvg} className="ml-1" alt="" />
            )}
            Register Whitelist
          </button>
          <button
            type="button"
            className={` tab ${tabIndex === 3 ? 'tab-active' : ''}`}
            onClick={() => _handleChangeTab(3)}
          >
            {tabIndex === 3 ? (
              <img src={activityActiveSvg} className="ml-1" alt="" />
            ) : (
              <img src={activitySvg} className="ml-1" alt="" />
            )}
            In progress
          </button>
          <button
            type="button"
            className={` tab ${tabIndex === 4 ? 'tab-active' : ''}`}
            onClick={() => _handleChangeTab(4)}
          >
            {tabIndex === 4 ? (
              <img src={taskSquareActive} className="ml-1" alt="" />
            ) : (
              <img src={taskSquare} className="ml-1" alt="" />
            )}
            Completed
          </button>
        </div>
        <img src={line2} className="w-full h-auto" alt="" />
      </div>
      <div className="mt-14 flex flex-col gap-y-8">
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
            <h6 className="text-xl text-shadow font-bold text-[#2CE7FF] flex items-center">
              Mayor pool <img src={oceanProtocolActive1} className="ml-2" alt="" />
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
                    <span className="text-[#F5F5F5] font-semibold">10,000 BUSD</span>
                  </p>
                  <p className="flex justify-between items-center mt-2">
                    <span className="text-[#BFBFBF]">Whitelist registration starts</span>
                    <span className="text-[#F5F5F5] font-semibold">05/11/2021 10 am (UTC)</span>
                  </p>
                  <p className="flex justify-between items-center mt-2">
                    <span className="text-[#BFBFBF]">Whitelist registration starts</span>
                    <span className="text-[#F5F5F5] font-semibold ml-8">16/11/2021 2 pm (UTC)</span>
                  </p>
                </div>
              </div>
              <div className="ml-auto flex flex-col">
                <p className="text-[#F5F5F5] leading-5 font-semibold">(GFX/BUSD)</p>
                <p className="text-shadow font-semibold leading-5 mt-2 text-[#2CE7FF]">GFX = 0.05 BUSD</p>
                <button
                  type="button"
                  className="bg-skyblue mt-auto rounded-[20px] border-none text-black font-semibold h-[44px] px-[50px] shadow-blue"
                >
                  More Details
                </button>
              </div>
            </div>
          </div>
        </div>
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
            <h6 className="text-xl text-shadow font-bold text-[#2CE7FF] flex items-center">
              Mayor pool <img src={oceanProtocolActive1} className="ml-2" alt="" />
            </h6>
            <div className="mt-5 flex gap-x-[30px]">
              <img src={swapLogo} alt="" />
              <div>
                <div className="flex items-start gap-x-3">
                  <img src={sLogo} alt="" />
                  <div>
                    <p className="text-[#F5F5F5] leading-5">HurricaneSwap</p>
                    <p className="text-[#F5F5F5] text-xl font-bold leading-6 mt-1">HCT</p>
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
                    <span className="text-[#F5F5F5] font-semibold">10,000 BUSD</span>
                  </p>
                  <p className="flex justify-between items-center mt-2">
                    <span className="text-[#BFBFBF]">Whitelist registration starts</span>
                    <span className="text-[#F5F5F5] font-semibold">05/11/2021 10 am (UTC)</span>
                  </p>
                  <p className="flex justify-between items-center mt-2">
                    <span className="text-[#BFBFBF]">Whitelist registration starts</span>
                    <span className="text-[#F5F5F5] font-semibold ml-8">16/11/2021 2 pm (UTC)</span>
                  </p>
                </div>
              </div>
              <div className="ml-auto flex flex-col">
                <p className="text-[#F5F5F5] leading-5 font-semibold">(HCT/BUSD)</p>
                <p className="text-shadow font-semibold leading-5 mt-2 text-[#2CE7FF]">HCT = 0.01 BUSD</p>
                <button
                  type="button"
                  className="bg-skyblue mt-auto rounded-[20px] border-none text-black font-semibold h-[44px] px-[50px] shadow-blue"
                >
                  More Details
                </button>
              </div>
            </div>
          </div>
        </div>
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
                    <span className="text-[#F5F5F5] font-semibold">10,000 BUSD</span>
                  </p>
                  <p className="flex justify-between items-center mt-2">
                    <span className="text-[#BFBFBF]">Whitelist registration starts</span>
                    <span className="text-[#F5F5F5] font-semibold">05/11/2021 10 am (UTC)</span>
                  </p>
                  <p className="flex justify-between items-center mt-2">
                    <span className="text-[#BFBFBF]">Whitelist registration starts</span>
                    <span className="text-[#F5F5F5] font-semibold ml-8">16/11/2021 2 pm (UTC)</span>
                  </p>
                </div>
              </div>
              <div className="ml-auto flex flex-col">
                <p className="text-[#F5F5F5] leading-5 font-semibold">(KLO/BUSD)</p>
                <p className="text-shadow font-semibold leading-5 mt-2 text-[#2CE7FF]">KLO = 0.03 BUSD</p>
                <button
                  type="button"
                  className="bg-skyblue mt-auto rounded-[20px] border-none text-black font-semibold h-[44px] px-[50px] shadow-blue"
                >
                  More Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpcomingPool
