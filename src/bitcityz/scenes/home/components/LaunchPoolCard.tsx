import React, { useEffect, useState } from 'react'

import '../../../assets/index.css'
import BigNumber from 'bignumber.js'
import { useTicketContract } from 'hooks/useContract'

import bgCardPink from '../../../assets/images/bg-lauchpool-card-pink.png'
import bgCardBlue from '../../../assets/images/bg-lauchpool-card-blue.png'
import bgCardGreen from '../../../assets/images/bg-lauchpool-card-green.png'
import bgBtn from '../../../assets/images/bg-launch-pool-btn.png'

function LaunchPoolCard({ pool, account, addressInfo }) {
  const [ticket, setTicket] = useState(0)
  const ticketContract = useTicketContract()

  useEffect(() => {
    setTicket(0)
    if (account) {
      ticketContract.balanceOf(account).then((resp) => {
        const totalTicket = new BigNumber(resp._hex).toNumber()
        if (totalTicket > 0) {
          for (let i = 0; i < totalTicket; i++) {
            ticketContract.tokenOfOwnerByIndex(account, i).then((res) => {
              const tokenId = new BigNumber(res._hex).toNumber()
              ticketContract.tokenHash(tokenId).then((r) => {
                if (r === pool.ticketHash) {
                  setTicket((val) => val + 1)
                }
              })
            })
          }
        }
      })
    }
  }, [account, ticketContract, pool])
  return (
    <div className="flex flex-col gap-y-5">
      <div className="px-6 py-[23px] rounded-2xl relative">
        <div
          className="absolute top-0 left-0 w-full h-full opacity-30 rounded-2xl"
          style={{
            background: 'linear-gradient(114.49deg, rgba(255, 255, 255, 0.33) -21.49%, rgba(255, 255, 255, 0) 111.75%)',
          }}
        />
        <div className="relative">
          <img
            src={pool.id === 0 ? bgCardPink : pool.id === 1 ? bgCardBlue : bgCardGreen}
            className="w-full md:w-auto"
            alt=""
          />
          {/* <p className="flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="font-bold text-2xl text-skyblue text-shadow uppercase">{pool.name}</span>
            <span className="font-bold text-xs text-skyblue text-shadow">PASS TICKET</span>
          </p> */}
        </div>
        <p className="text-skyblue text-shadow font-semibold mt-4 text-center">Pool Details</p>
        <p className="flex justify-between items-center text-sm text-[#F5F5F5] mt-4">
          <span className="font-semibold">Required:</span>
          <span className="font-semibold">
            {account ? (
              <>
                {' '}
                Min.{' '}
                {(pool.id === 0
                  ? addressInfo
                    ? addressInfo.amount_staking_bctz_mayor_pool
                    : 0
                  : pool.id === 1
                  ? addressInfo
                    ? addressInfo?.amount_staking_bctz_elite_pool
                    : 0
                  : addressInfo
                  ? addressInfo?.amount_staking_bctz_citizen_pool
                  : 0
                ).toLocaleString('en', {
                  maximumFractionDigits: 0,
                })}{' '}
                BCTZ
              </>
            ) : (
              <>N/A</>
            )}
          </span>
        </p>
        <p className="flex justify-between items-center text-sm text-[#F5F5F5] mt-2">
          <span className="font-semibold">Required Lock Time:</span>
          <span className="font-semibold"> {(pool.lockingTime / 86400).toFixed(0)} day</span>
        </p>
      </div>
      <button
        type="button"
        className="w-full h-[77px] bg-no-repeat bg-center bg-contain text-skyblue text-shadow font-semibold"
        style={{ backgroundImage: `url(${bgBtn})` }}
      >
        {pool.name} {ticket > 1 ? 'Tickets' : 'Ticket'}: {ticket}
      </button>
    </div>
  )
}

export default LaunchPoolCard
