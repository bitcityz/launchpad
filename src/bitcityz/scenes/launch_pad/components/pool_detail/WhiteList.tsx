import React from 'react'
import '../../../../assets/index.css'

import IcSearchSvg from '../../../../assets/images/ic-search.svg'

function WhiteList() {
  return (
    <div className="mt-5">
      <div className="mt-5 p-6 border-[1px] border-solid border-skyblue rounded-2xl relative">
        <div className="p-4 flex items-center gap-x-8 rounded-xl" style={{ background: 'rgba(245, 245, 245, 0.1)' }}>
          <input
            type="text"
            className="bg-transparent text-[#9E9E9E] font-semibold flex-1"
            placeholder="Search your wallet address"
          />
          <button type="button" className="border-none bg-transparent">
            <img src={IcSearchSvg} alt="" />
          </button>
        </div>
        <div className="mt-8">
          <div
            className="rounded-xl px-4 py-[18px] grid gap-x-5"
            style={{ background: 'rgba(245, 245, 245, 0.1)', gridTemplateColumns: '100px auto' }}
          >
            <span className="text-[#F5F5F5] font-semibold">No</span>
            <span className="text-[#F5F5F5] font-semibold">Wallet Address</span>
          </div>
          <div className="rounded-xl px-4 py-[18px] grid gap-x-5" style={{ gridTemplateColumns: '100px auto' }}>
            <span className="text-[#F5F5F5] font-semibold">1</span>
            <span className="text-[#F5F5F5] font-semibold">0x004Ee57902*******************B25iDdoaisu4123DAS</span>
          </div>
          <div
            className="rounded-xl px-4 py-[18px] grid gap-x-5"
            style={{ background: 'rgba(245, 245, 245, 0.1)', gridTemplateColumns: '100px auto' }}
          >
            <span className="text-[#F5F5F5] font-semibold">2</span>
            <span className="text-[#F5F5F5] font-semibold">0x004Ee57902*******************B25iDdoaisu4123DAS</span>
          </div>
          <div className="rounded-xl px-4 py-[18px] grid gap-x-5" style={{ gridTemplateColumns: '100px auto' }}>
            <span className="text-[#F5F5F5] font-semibold">3</span>
            <span className="text-[#F5F5F5] font-semibold">0x004Ee57902*******************B25iDdoaisu4123DAS</span>
          </div>
          <div
            className="rounded-xl px-4 py-[18px] grid gap-x-5"
            style={{ background: 'rgba(245, 245, 245, 0.1)', gridTemplateColumns: '100px auto' }}
          >
            <span className="text-[#F5F5F5] font-semibold">4</span>
            <span className="text-[#F5F5F5] font-semibold">0x004Ee57902*******************B25iDdoaisu4123DAS</span>
          </div>
          <div className="rounded-xl px-4 py-[18px] grid gap-x-5" style={{ gridTemplateColumns: '100px auto' }}>
            <span className="text-[#F5F5F5] font-semibold">5</span>
            <span className="text-[#F5F5F5] font-semibold">0x004Ee57902*******************B25iDdoaisu4123DAS</span>
          </div>
          <div
            className="rounded-xl px-4 py-[18px] grid gap-x-5"
            style={{ background: 'rgba(245, 245, 245, 0.1)', gridTemplateColumns: '100px auto' }}
          >
            <span className="text-[#F5F5F5] font-semibold">6</span>
            <span className="text-[#F5F5F5] font-semibold">0x004Ee57902*******************B25iDdoaisu4123DAS</span>
          </div>
          <div className="rounded-xl px-4 py-[18px] grid gap-x-5" style={{ gridTemplateColumns: '100px auto' }}>
            <span className="text-[#F5F5F5] font-semibold">7</span>
            <span className="text-[#F5F5F5] font-semibold">0x004Ee57902*******************B25iDdoaisu4123DAS</span>
          </div>
          <div
            className="rounded-xl px-4 py-[18px] grid gap-x-5"
            style={{ background: 'rgba(245, 245, 245, 0.1)', gridTemplateColumns: '100px auto' }}
          >
            <span className="text-[#F5F5F5] font-semibold">8</span>
            <span className="text-[#F5F5F5] font-semibold">0x004Ee57902*******************B25iDdoaisu4123DAS</span>
          </div>
          <div className="rounded-xl px-4 py-[18px] grid gap-x-5" style={{ gridTemplateColumns: '100px auto' }}>
            <span className="text-[#F5F5F5] font-semibold">9</span>
            <span className="text-[#F5F5F5] font-semibold">0x004Ee57902*******************B25iDdoaisu4123DAS</span>
          </div>
          <div
            className="rounded-xl px-4 py-[18px] grid gap-x-5"
            style={{ background: 'rgba(245, 245, 245, 0.1)', gridTemplateColumns: '100px auto' }}
          >
            <span className="text-[#F5F5F5] font-semibold">10</span>
            <span className="text-[#F5F5F5] font-semibold">0x004Ee57902*******************B25iDdoaisu4123DAS</span>
          </div>
        </div>
      </div>
      <div className="mt-5" />
    </div>
  )
}

export default WhiteList
