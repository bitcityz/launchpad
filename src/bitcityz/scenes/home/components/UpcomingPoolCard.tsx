import React from 'react'

import '../../../assets/index.css'
import { format } from 'date-fns'
import { formatEther } from 'ethers/lib/utils'
import { Link } from 'react-router-dom'

import Social from '../../launch_pad/components/Social'

import oceanProtocolActive1 from '../../../assets/images/ocean-protocol-active1.svg'

function UpcomingPoolCard({ project, poolName }) {
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
          {poolName} pool <img src={oceanProtocolActive1} className="ml-2" alt="" />
        </h6>
        <div className="mt-5 flex flex-col gap-y-5 md:gap-y-0 md:flex-row md:gap-x-[30px]">
          <div>
            <img src={project.baseInfo.logo.large} className="w-full md:w-auto" alt="" />
          </div>
          <div className="flex-1">
            <div className="flex items-start gap-x-3">
              <img src={project.baseInfo.logo.small} alt="" />
              <div className="flex-1">
                <p className="text-[#F5F5F5] leading-5 flex justify-between items-center">
                  {project.baseInfo.name}{' '}
                  <span className="text-[#F5F5F5] leading-5 font-semibold text-xs md:text-base">
                    ({project.baseInfo.symbol}/{project.baseInfo.currencyPair})
                  </span>
                </p>
                <p className="text-[#F5F5F5] text-xl font-bold leading-6 mt-1 flex justify-between items-center">
                  {project.baseInfo.symbol}{' '}
                  <span className="text-shadow font-semibold leading-5 text-[#2CE7FF] text-xs md:text-base">
                    {project.baseInfo.symbol} ={' '}
                    {Number(formatEther(project.tokenBuy2IDOtoken)).toLocaleString('en', {
                      maximumFractionDigits: 4,
                    })}{' '}
                    {project.baseInfo.currencyPair}
                  </span>
                </p>
              </div>
            </div>
            <Social idoInfo={project.baseInfo} />
            <div className="mt-4 flex flex-col gap-y-5 md:gap- md:flex-row md:gap-x-8">
              <div className="flex-1">
                <p className="flex flex-col gap-y-1 md:gap-y-0 md:flex-row md:justify-between items-center">
                  <span className="text-[#BFBFBF]">Total capital raise</span>
                  <span className="text-[#F5F5F5] font-semibold">
                    {(
                      Number(formatEther(project.totalAmount)) * Number(formatEther(project.tokenBuy2IDOtoken))
                    ).toLocaleString('en', {
                      maximumFractionDigits: 4,
                    })}{' '}
                    {project.baseInfo.currencyPair}
                  </span>
                </p>
                <p className="flex flex-col gap-y-1 md:gap-y-0 md:flex-row md:justify-between items-center mt-5 md:mt-2">
                  <span className="text-[#BFBFBF]">Whitelist reg starts</span>
                  <span className="text-[#F5F5F5] font-semibold">{format(project.startTimeWL * 1000, 'Pp')} (UTC)</span>
                </p>
                <p className="flex flex-col gap-y-1 md:gap-y-0 md:flex-row md:justify-between items-center mt-5 md:mt-2">
                  <span className="text-[#BFBFBF]">Whitelist reg ends</span>
                  <span className="text-[#F5F5F5] font-semibold ml-8">
                    {format(project.endTimeWL * 1000, 'Pp')} (UTC)
                  </span>
                </p>
              </div>
              <Link
                to={`/launchpad/${window.btoa(project.id)}`}
                className="bg-skyblue mt-5 md:ml-auto rounded-[20px] flex items-center justify-center border-none text-[#212121] font-semibold h-[44px] px-[50px] shadow-blue"
              >
                More Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpcomingPoolCard
