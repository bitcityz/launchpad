import React from 'react'

import '../../../assets/index.css'

const BCTZ_PRICE = 1
function Summary(props) {
  const { balance, totalFundRaised, totalInvestors, totalProjects, isLoading } = props

  return (
    <div>
      <h5 className="text-[#F5F5F5] text-xl md:text-[32px] text-center">
        Buy and own potential coins in the fastest way
      </h5>
      <p className="text-center text-[#F5F5F5] mt-4">
        Staking <span className="text-white font-semibold">BCTZ</span> to get pass-ticket. Join pool to claim hidden
        gems
      </p>
      <div className="mt-14 grid gap-y-5 md:gap-y-0 md:grid-cols-4 md:gap-x-8">
        <div className="relative px-[9px] py-4 rounded-2xl border-[1px] border-solid border-[rgba(123,245,251,0.2)]">
          <div
            className="absolute opacity-30 top-0 left-0 w-full h-full rounded-2xl"
            style={{
              background:
                'linear-gradient(114.49deg, rgba(255, 255, 255, 0.33) -21.49%, rgba(255, 255, 255, 0) 111.75%)',
            }}
          />
          <p className="text-[#F5F5F5] font-semibold text-center relative">Current Funds Locked</p>
          <h6
            className={`text-[#2CE7FF] font-bold text-[32px] text-center text-shadow mt-3 ${
              isLoading ? 'skeleton-short skeleton-center' : ''
            }`}
          >
            $
            {(Number(balance) * BCTZ_PRICE).toLocaleString('en', {
              maximumFractionDigits: 0,
            })}{' '}
          </h6>
        </div>
        <div className="relative px-[9px] py-4 rounded-2xl border-[1px] border-solid border-[rgba(123,245,251,0.2)]">
          <div
            className="absolute opacity-30 top-0 left-0 w-full h-full rounded-2xl"
            style={{
              background:
                'linear-gradient(114.49deg, rgba(255, 255, 255, 0.33) -21.49%, rgba(255, 255, 255, 0) 111.75%)',
            }}
          />
          <p className="text-[#F5F5F5] font-semibold text-center relative">Total Funds Raised</p>
          <h6
            className={`text-[#2CE7FF] font-bold text-[32px] text-center text-shadow mt-3 ${
              isLoading ? 'skeleton-short skeleton-center' : ''
            }`}
          >
            $
            {totalFundRaised.toLocaleString('en', {
              maximumFractionDigits: 0,
            })}
          </h6>
        </div>
        <div className="relative px-[9px] py-4 rounded-2xl border-[1px] border-solid border-[rgba(123,245,251,0.2)]">
          <div
            className="absolute opacity-30 top-0 left-0 w-full h-full rounded-2xl"
            style={{
              background:
                'linear-gradient(114.49deg, rgba(255, 255, 255, 0.33) -21.49%, rgba(255, 255, 255, 0) 111.75%)',
            }}
          />
          <p className="text-[#F5F5F5] font-semibold text-center relative">Project Launch</p>
          <h6
            className={`text-[#2CE7FF] font-bold text-[32px] text-center text-shadow mt-3 ${
              isLoading ? 'skeleton-short skeleton-center' : ''
            }`}
          >
            {totalProjects}
          </h6>
        </div>
        <div className="relative px-[9px] py-4 rounded-2xl border-[1px] border-solid border-[rgba(123,245,251,0.2)]">
          <div
            className="absolute opacity-30 top-0 left-0 w-full h-full rounded-2xl"
            style={{
              background:
                'linear-gradient(114.49deg, rgba(255, 255, 255, 0.33) -21.49%, rgba(255, 255, 255, 0) 111.75%)',
            }}
          />
          <p className="text-[#F5F5F5] font-semibold text-center relative">Inverstors</p>
          <h6
            className={`text-[#2CE7FF] font-bold text-[32px] text-center text-shadow mt-3 ${
              isLoading ? 'skeleton-short skeleton-center' : ''
            }`}
          >
            {totalInvestors.toLocaleString('en', {
              maximumFractionDigits: 0,
            })}
          </h6>
        </div>
      </div>
    </div>
  )
}

export default Summary
