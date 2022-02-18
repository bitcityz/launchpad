import React from 'react'
import '../../../../assets/index.css'

import { Skeleton } from '@mexi/uikit'

function About({ idoPool, isLoading }) {
  return (
    <div className="relative hihi">
      <h6 className="text-[#F5F5F5]">Introduction</h6>
      {isLoading ? (
        <div className="flex flex-col gap-y-1 mt-5">
          <Skeleton width="100%" height="20px" />
          <Skeleton width="100%" height="20px" />
          <Skeleton width="100%" height="20px" />
        </div>
      ) : (
        <p className="text-[#9E9E9E] mt-5 leading-5">{idoPool.baseInfo.description}</p>
      )}
      <h6 className="text-[#F5F5F5] mt-7">Token infomation</h6>
      <p className="grid gap-x-3 mt-3 grid-cols-[110px,auto] md:grid-cols-[150px,auto] md:gap-x-8">
        <span className="text-[#9E9E9E]">Name</span>
        <span className={`font-semibold text-[#F5F5F5] ${isLoading ? 'skeleton w-40' : ''}`}>
          {idoPool?.baseInfo.name}
        </span>
      </p>
      <p className="grid gap-x-3 mt-3 grid-cols-[110px,auto] md:grid-cols-[150px,auto] md:gap-x-8">
        <span className="text-[#9E9E9E]">Contract address </span>
        <span
          className={`font-semibold text-[#F5F5F5] break-words max-w-[calc(100vw-200px)] md:max-w-full ${
            isLoading ? 'skeleton w-80' : ''
          }`}
        >
          {idoPool?.baseInfo.address}
        </span>
      </p>
      <p className="grid gap-x-3 mt-3 grid-cols-[110px,auto] md:grid-cols-[150px,auto] md:gap-x-8">
        <span className="text-[#9E9E9E]">Total supply</span>
        <span className={`font-semibold text-[#F5F5F5] ${isLoading ? 'skeleton w-16' : ''}`}>
          {Number(idoPool?.baseInfo.totalSupply).toLocaleString('en', {
            maximumFractionDigits: 4,
          })}{' '}
        </span>
      </p>
      <p className="grid gap-x-3 mt-3 grid-cols-[110px,auto] md:grid-cols-[150px,auto] md:gap-x-8">
        <span className="text-[#9E9E9E]">Decimals</span>
        <span className={`font-semibold text-[#F5F5F5] ${isLoading ? 'skeleton w-10' : ''}`}>
          {idoPool?.baseInfo.decimals}
        </span>
      </p>
      <p className="grid gap-x-3 mt-3 grid-cols-[110px,auto] md:grid-cols-[150px,auto] md:gap-x-8">
        <span className="text-[#9E9E9E]">Symbol</span>
        <span className={`font-semibold text-[#F5F5F5] ${isLoading ? 'skeleton w-12' : ''}`}>
          {idoPool?.baseInfo.symbol}
        </span>
      </p>
    </div>
  )
}

export default About
