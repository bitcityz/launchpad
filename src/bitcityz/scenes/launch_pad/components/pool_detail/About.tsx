import React, { useState } from 'react'
import '../../../../assets/index.css'
import { formatNumber } from 'utils/formatBalance'

function About({ idoInfo }) {
  return (
    <div className="pt-5 relative">
      <h6 className="text-[#F5F5F5]">Introduction</h6>
      <p className="text-[#9E9E9E] mt-5 leading-5">{idoInfo?.description}</p>
      <h6 className="text-[#F5F5F5] mt-5">Play to Earn Model</h6>
      <p className="text-[#9E9E9E] mt-5 leading-5">{idoInfo?.model}</p>

      <h6 className="text-[#F5F5F5] mt-5">Highlight Features</h6>
      <h6 className="text-[#F5F5F5] mt-1">Faction, team driven.</h6>
      <h6 className="text-[#F5F5F5] mt-1">Play to Earn</h6>
      <h6 className="text-[#F5F5F5] mt-1">Earn NFTs to improve your in-game character</h6>
      <h6 className="text-[#F5F5F5] mt-1">Open World, revenue generating assets from empire building</h6>
      <h6 className="text-[#F5F5F5] mt-1">System Requirements</h6>
      <h6 className="text-[#F5F5F5] mt-5">Token infomation</h6>
      <p className="grid gap-x-3 mt-3 grid-cols-[110px,auto] md:grid-cols-[150px,auto] md:gap-x-8">
        <span className="text-[#9E9E9E]">Name</span>
        <span className="font-semibold text-[#F5F5F5]">{idoInfo?.name}</span>
      </p>
      <p className="grid gap-x-3 mt-3 grid-cols-[110px,auto] md:grid-cols-[150px,auto] md:gap-x-8">
        <span className="text-[#9E9E9E]">Contract address </span>
        <span className="font-semibold text-[#F5F5F5] break-words max-w-[calc(100vw-200px)] md:max-w-full">
          {idoInfo?.address}
        </span>
      </p>
      <p className="grid gap-x-3 mt-3 grid-cols-[110px,auto] md:grid-cols-[150px,auto] md:gap-x-8">
        <span className="text-[#9E9E9E]">Total supply</span>
        <span className="font-semibold text-[#F5F5F5]">{formatNumber(Number(idoInfo?.totalSupply), 0, 0)}</span>
      </p>
      <p className="grid gap-x-3 mt-3 grid-cols-[110px,auto] md:grid-cols-[150px,auto] md:gap-x-8">
        <span className="text-[#9E9E9E]">Decimals</span>
        <span className="font-semibold text-[#F5F5F5]">{idoInfo?.decimals}</span>
      </p>
      <p className="grid gap-x-3 mt-3 grid-cols-[110px,auto] md:grid-cols-[150px,auto] md:gap-x-8">
        <span className="text-[#9E9E9E]">Symbol</span>
        <span className="font-semibold text-[#F5F5F5]">{idoInfo?.symbol}</span>
      </p>
    </div>
  )
}

export default About
