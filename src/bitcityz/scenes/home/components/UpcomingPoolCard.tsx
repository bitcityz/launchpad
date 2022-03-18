import React from 'react'

import '../../../assets/index.css'
import { format } from 'date-fns'
import { formatEther } from 'ethers/lib/utils'
import { Link } from 'react-router-dom'

import Social from '../../launch_pad/components/Social'

import icCitizen from '../../../assets/images/ic-citizen.png'
import icElite from '../../../assets/images/ic-elite.png'
import icMayor from '../../../assets/images/ic-mayor.png'

function UpcomingPoolCard({ project, poolName }) {
  return (
    <div
      className={`relative px-6 py-5 pool-card ${
        poolName === 'Mayor'
          ? 'sm-mayor-card md:mayor-card'
          : poolName === 'Elite'
          ? 'sm-elite-card md:elite-card'
          : 'sm-citizen-card md:citizen-card'
      }`}
    >
      <div className="relative z-10">
        <h6 className="text-xl text-shadow font-bold text-[#2CE7FF] flex items-center">
          <img
            src={poolName === 'Mayor' ? icMayor : poolName === 'Elite' ? icElite : icCitizen}
            className="mr-2"
            alt=""
          />{' '}
          {poolName} Pool
        </h6>
        <div className="mt-5 flex flex-col gap-y-5 md:gap-y-0 md:flex-row md:gap-x-[30px]">
          <div>
            <img src={project.baseInfo.logo.large} className="w-full md:w-auto" alt="" />
          </div>
          <div className="flex-1">
            <div className="flex items-start gap-x-3">
              <img src={project.baseInfo.logo.small} alt="" />
              <div className="flex-1">
                <p className="text-[#F5F5F5] font-bold text-xl leading-6 flex justify-between items-center">
                  {project.baseInfo.name}{' '}
                  <span className="text-[#F5F5F5] leading-5 text-xs md:text-sm">
                    ({project.baseInfo.symbol}/{project.baseInfo.currencyPair})
                  </span>
                </p>

                <p className="text-[#F5F5F5] text-xl font-bold leading-6 mt-1 flex flex-col items-start gap-y-3 md:gap-y-0 md:flex-row md:justify-between md:items-center">
                  <span className="text-sm font-medium">Token&apos;s name: {project.baseInfo.symbol}</span>
                  <span className="text-shadow font-semibold md:font-bold leading-5 text-skyblue text-2xl -translate-x-[60px] md:-translate-x-0">
                    {project.baseInfo.symbol} = {project.baseInfo.price} {project.baseInfo.currencyPair}
                  </span>
                </p>
              </div>
            </div>
            <Social idoInfo={project.baseInfo} />
            <div className="md:mt-4 flex flex-col gap-y-5 md:gap- md:flex-row md:gap-x-8">
              <div className="flex-1">
                <p className="flex flex-col gap-y-1 md:gap-y-0 md:flex-row md:gap-x-9 items-start md:items-center mt-5 md:mt-2">
                  <span className="text-[#BFBFBF] w-[180px]">Total Capital Raise</span>
                  <span className="text-[#F5F5F5] font-semibold">
                    {(
                      Number(formatEther(project.totalAmount)) * Number(formatEther(project.tokenBuy2IDOtoken))
                    ).toLocaleString('en', {
                      maximumFractionDigits: 4,
                    })}{' '}
                    {project.baseInfo.currencyPair}
                  </span>
                </p>
                <p className="flex flex-col gap-y-1 md:gap-y-0 md:flex-row md:gap-x-9 items-start md:items-center mt-5 md:mt-2">
                  <span className="text-[#BFBFBF] w-[180px]">Whitelist Reg Starts</span>
                  <span className="text-[#F5F5F5] font-semibold">{format(project.startTimeWL * 1000, 'Pp')} (UTC)</span>
                </p>
                <p className="flex flex-col gap-y-1 md:gap-y-0 md:flex-row md:gap-x-9 items-start md:items-center mt-5 md:mt-2">
                  <span className="text-[#BFBFBF] w-[180px]">Whitelist Reg Ends</span>
                  <span className="text-[#F5F5F5] font-semibold">{format(project.endTimeWL * 1000, 'Pp')} (UTC)</span>
                </p>
              </div>
            </div>
            <div className="md:inline-block mt-5">
              <Link
                to={`/launchpad/${window.btoa(project.id)}`}
                className="bg-transparent rounded-[20px] flex items-center justify-center border-[1px] border-solid border-skyblue text-skyblue font-semibold h-[44px] px-[50px]"
              >
                Project Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpcomingPoolCard
