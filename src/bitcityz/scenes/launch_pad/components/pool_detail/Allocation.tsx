import React from 'react'
import '../../../../assets/index.css'

function Allocation() {
  return (
    <div className="mt-5 relative">
        <div className="flex items-center justify-between">
            <p className="text-white font-semibold">Total bought tokens: <span className="text-skyblue text-shadow">100 GFX</span></p>
            <p className="text-white font-semibold">Have bought: <span className="text-skyblue text-shadow">100 BUSD</span></p>
            <p className="text-white font-semibold">Claimed: <span className="text-skyblue text-shadow">25/100 GFX</span></p>
        </div>
        <div className="mt-5 px-6 py-4 rounded-2xl" style={{background: 'rgba(44, 231, 255, 0.1)'}}>
            <div className="grid grid-cols-4 gap-x-8">
                <span className="text-[#F5F5F5] font-semibold">Action</span>
                <span className="text-[#F5F5F5] font-semibold">Claimable</span>
                <span className="text-[#F5F5F5] font-semibold">Time</span>
                <span className="text-[#F5F5F5] font-semibold">Status</span>
            </div>
            <div className="grid grid-cols-4 mt-4 items-center gap-x-8">
                <button type="button" className="bg-[#9E9E9E] rounded-[20px] text-black font-semibold w-[139px] h-[32px] flex items-center justify-center">Claimed</button>
                <span className="text-[#BFBFBF] font-semibold">71.94245</span>
                <span className="text-[#BFBFBF] font-semibold">Oct 15 2021, 2:30 PM UTC</span>
                <span className="text-[#BFBFBF] font-semibold">30%</span>
            </div>
            <div className="grid grid-cols-4 mt-3 items-center gap-x-8">
                <button type="button" className="bg-skyblue shadow-blue rounded-[20px] text-black font-semibold w-[139px] h-[32px] flex items-center justify-center">Claimed</button>
                <span className="text-[#BFBFBF] font-semibold">71.94245</span>
                <span className="text-[#BFBFBF] font-semibold">Oct 15 2021, 2:30 PM UTC</span>
                <span className="text-[#BFBFBF] font-semibold">30%</span>
            </div>
            <div className="grid grid-cols-4 mt-3 items-center gap-x-8">
                <button type="button" className="bg-skyblue shadow-blue rounded-[20px] text-black font-semibold w-[139px] h-[32px] flex items-center justify-center">Claimed</button>
                <span className="text-[#BFBFBF] font-semibold">71.94245</span>
                <span className="text-[#BFBFBF] font-semibold">Oct 15 2021, 2:30 PM UTC</span>
                <span className="text-[#BFBFBF] font-semibold">30%</span>
            </div>
            <div className="grid grid-cols-4 mt-4 items-center gap-x-8">
                <button type="button" className="bg-[#9E9E9E] rounded-[20px] text-black font-semibold w-[139px] h-[32px] flex items-center justify-center">Waiting</button>
                <span className="text-[#BFBFBF] font-semibold">71.94245</span>
                <span className="text-[#BFBFBF] font-semibold">Oct 15 2021, 2:30 PM UTC</span>
                <span className="text-[#BFBFBF] font-semibold">30%</span>
            </div>
        </div>
    </div>
  )
}

export default Allocation
