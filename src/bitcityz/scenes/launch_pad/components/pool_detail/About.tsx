import React from 'react'
import '../../../../assets/index.css'

function About({ idoPool }) {
  return (
    <div className="pt-5 relative">
      <h6 className="text-[#F5F5F5]">Introduction</h6>
      <p className="text-[#9E9E9E] mt-5 leading-5">{idoPool.baseInfo.description}</p>
      <h6 className="text-[#F5F5F5] mt-5">Play to Earn Model</h6>
      <p className="text-[#9E9E9E] mt-5 leading-5">{idoPool.baseInfo.model}</p>

      <h6 className="text-[#F5F5F5] mt-5">Highlight Features</h6>
      <h6 className="text-[#F5F5F5] mt-1">Faction, team driven.</h6>
      <h6 className="text-[#F5F5F5] mt-1">Play to Earn</h6>
      <h6 className="text-[#F5F5F5] mt-1">Earn NFTs to improve your in-game character</h6>
      <h6 className="text-[#F5F5F5] mt-1">Open World, revenue generating assets from empire building</h6>
      <h6 className="text-[#F5F5F5] mt-1">System Requirements</h6>
      <h6 className="text-[#F5F5F5] mt-5">Token infomation</h6>
      <p className="grid gap-x-3 mt-3 grid-cols-[110px,auto] md:grid-cols-[150px,auto] md:gap-x-8">
        <span className="text-[#9E9E9E]">Name</span>
        <span className="font-semibold text-[#F5F5F5]">{idoPool.baseInfo.name}</span>
      </p>
      <p className="grid gap-x-3 mt-3 grid-cols-[110px,auto] md:grid-cols-[150px,auto] md:gap-x-8">
        <span className="text-[#9E9E9E]">Contract address </span>
        <span className="font-semibold text-[#F5F5F5] break-words max-w-[calc(100vw-200px)] md:max-w-full">
          {idoPool.idoToken}
        </span>
      </p>
      <p className="grid gap-x-3 mt-3 grid-cols-[110px,auto] md:grid-cols-[150px,auto] md:gap-x-8">
        <span className="text-[#9E9E9E]">Total supply</span>
        <span className="font-semibold text-[#F5F5F5]">
          {Number(idoPool.baseInfo.totalSupply).toLocaleString('en', {
            maximumFractionDigits: 4,
          })}{' '}
        </span>
      </p>
      <p className="grid gap-x-3 mt-3 grid-cols-[110px,auto] md:grid-cols-[150px,auto] md:gap-x-8">
        <span className="text-[#9E9E9E]">Decimals</span>
        <span className="font-semibold text-[#F5F5F5]">{idoPool.baseInfo.decimals}</span>
      </p>
      <p className="grid gap-x-3 mt-3 grid-cols-[110px,auto] md:grid-cols-[150px,auto] md:gap-x-8">
        <span className="text-[#9E9E9E]">Symbol</span>
        <span className="font-semibold text-[#F5F5F5]">{idoPool.baseInfo.symbol}</span>
      </p>
    </div>
  )
}

export default About
