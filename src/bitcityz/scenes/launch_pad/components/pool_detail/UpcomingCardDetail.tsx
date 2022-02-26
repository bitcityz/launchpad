import React from 'react'
import '../../../../assets/index.css'

import Social from '../Social'

function UpcomingCardDetail({ idoPool }) {
  return (
    <div className="flex-1">
      <div className="flex items-start gap-x-3">
        <img src={idoPool.baseInfo.logo.small} alt="" />
        <div className="flex-1">
          <p className="text-[#F5F5F5] leading-6 text-xl font-bold flex justify-between items-center">
            {idoPool.baseInfo.name}{' '}
            <span className="text-[#F5F5F5] leading-5 font-semibold text-xs md:text-base md:hidden">
              ({idoPool.baseInfo.symbol}/{idoPool.baseInfo.currencyPair})
            </span>
          </p>
          <p className="text-[#F5F5F5] text-sm font-medium leading-5 mt-1">Token name: {idoPool.baseInfo.symbol}</p>
          <p className="text-sm text-[#BFBFBF] hidden md:block">{idoPool.baseInfo.shortDescription}</p>
        </div>
      </div>
      <div className="flex flex-col gap-y-5 md:gap-y-0 items-center md:flex-row md:flex-wrap md:justify-between mt-4">
        <Social idoInfo={idoPool.baseInfo} />
        <div className="w-full md:w-auto order-3 md:-order-none">
          <p className="text-shadow font-semibold text-skyblue mt-auto">Upcoming project</p>
        </div>
      </div>
    </div>
  )
}

export default UpcomingCardDetail
