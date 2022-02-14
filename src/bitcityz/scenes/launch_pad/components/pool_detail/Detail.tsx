import React, { useState, useEffect, useMemo } from 'react'
import '../../../../assets/index.css'
import { format } from 'date-fns'
import { formatEther } from 'ethers/lib/utils'
import { getTicketAddress } from 'utils/addressHelpers'
import { multicallv2 } from 'utils/multicall'
import launchPoolTicketABI from 'config/abi/launchPoolTicket.json'

import bgCardPink from '../../../../assets/images/bg-lauchpool-card-pink.png'
import bgCardBlue from '../../../../assets/images/bg-lauchpool-card-blue.png'
import bgCardGreen from '../../../../assets/images/bg-lauchpool-card-green.png'

const POOLS = [0, 1, 2]
function Detail({ idoPool }) {
  const [accessType, setAccessType] = useState('')
  const ticketAddress = getTicketAddress()
  const poolCalls = useMemo(
    () =>
      POOLS.map((id) => {
        return { address: ticketAddress, name: 'types', params: [id] }
      }),
    [ticketAddress],
  )

  useEffect(() => {
    const initData = async () => {
      const pools = await multicallv2(launchPoolTicketABI, poolCalls)
      const pool = pools.filter((r) => {
        return r.hash === idoPool.keyType
      })
      setAccessType(pool[0].name)
    }
    initData()
  }, [poolCalls, idoPool])

  return (
    <div className="pt-5 relative">
      <div className="flex flex-col md:flex-row items-start md:gap-x-9">
        {idoPool.baseInfo.accessType === 'Citizen pass-ticket' && (
            <img src={bgCardGreen} alt="" />
        )}
        {idoPool.baseInfo.accessType === 'Mayor pass-ticket' && (
            <img src={bgCardPink} alt="" />
        )}
        {idoPool.baseInfo.accessType === 'Elite pass-ticket' && (
            <img src={bgCardBlue} alt="" />
        )}
        <div className="flex-1">
          <p className="grid gap-x-3 mt-3 grid-cols-[140px,auto] md:grid-cols-[150px,auto] md:gap-x-8">
            <span className="text-[#9E9E9E]">Token Distribution:</span>
            <span className="font-semibold text-[#F5F5F5]">Claim</span>
          </p>
          <p className="grid gap-x-3 mt-3 grid-cols-[140px,auto] md:grid-cols-[150px,auto] md:gap-x-8">
            <span className="text-[#9E9E9E]">Swap Amount:</span>
            <span className="font-semibold text-[#F5F5F5]">
              {(Number(formatEther(idoPool.totalAmount)) - Number(formatEther(idoPool.remainAmount))).toLocaleString(
                'en',
                {
                  maximumFractionDigits: 4,
                },
              )}{' '}
              {idoPool.baseInfo.symbol}
            </span>
          </p>
          <p className="grid gap-x-3 mt-3 grid-cols-[140px,auto] md:grid-cols-[150px,auto] md:gap-x-8">
            <span className="text-[#9E9E9E]">Access type:</span>
            <span className="font-semibold text-[#F5F5F5]">
                {idoPool.baseInfo.accessType}
            </span>
          </p>
          <p className="grid gap-x-3 mt-3 grid-cols-[140px,auto] md:grid-cols-[150px,auto] md:gap-x-8">
            <span className="text-[#9E9E9E]">Price per token:</span>
            <span className="font-semibold text-[#F5F5F5]">
            1 {idoPool.baseInfo.symbol} ={' '}
              {idoPool.baseInfo.price}{' '}
              {idoPool.baseInfo.currencyPair}
            </span>
          </p>
          <p className="grid gap-x-3 mt-3 grid-cols-[140px,auto] md:grid-cols-[150px,auto] md:gap-x-8">
            <span className="text-[#9E9E9E]">Total capital raise:</span>
            <span className="font-semibold text-[#F5F5F5]">
              {(Number(formatEther(idoPool.totalAmount)) * idoPool.baseInfo.price).toLocaleString(
                'en',
                {
                  maximumFractionDigits: 4,
                },
              )}{' '}
              {idoPool.baseInfo.currencyPair}
            </span>
          </p>
          <p className="grid gap-x-3 mt-3 grid-cols-[140px,auto] md:grid-cols-[150px,auto] md:gap-x-8">
            <span className="text-[#9E9E9E]">Claim policy:</span>
            <span className="font-semibold text-[#F5F5F5]">{idoPool.baseInfo.claimPolicy}</span>
          </p>
        </div>
      </div>
      <h6 className="text-[#F5F5F5] text-xl font-bold mt-7">Timeline</h6>
      <ul className="list-none mt-5">
        <li
          className={`relative pl-8 after:timeline-after before:mobile-timeline-before before:timeline-before md:before:pc-timeline-before ${
            Number(idoPool.status._hex) === 1 ? 'after:timeline-after-active' : ''
          }`}
        >
          {Number(idoPool.status._hex) > 1 && (
            <p className="text-[#9E9E9E] font-semibold leading-5">Register mayor pool whitelist (Close)</p>
          )}
          {Number(idoPool.status._hex) < 1 && (
            <p className="text-[#9E9E9E] font-semibold leading-5">Register mayor pool whitelist (Incoming)</p>
          )}
          {Number(idoPool.status._hex) === 1 && (
            <p className="text-skyblue font-semibold leading-5">Register mayor pool whitelist (Opening)</p>
          )}
          <p className={`leading-5 ${idoPool.status === 1 ? 'text-skyblue' : 'text-[#9E9E9E]'}`}>
            Open: {format(idoPool.startTimeWL * 1000, 'Pp')} (UTC) - Close: {format(idoPool.endTimeWL * 1000, 'Pp')} UTC
          </p>
        </li>
        <li
          className={`relative pl-8 mt-7 after:timeline-after before:mobile-timeline-before before:timeline-before md:before:pc-timeline-before ${
            Number(idoPool.status._hex) === 2 ? 'after:timeline-after-active' : ''
          }`}
        >
          {Number(idoPool.status._hex) === 2 && (
            <p className="text-skyblue font-semibold leading-5">Join mayor pool (Opening)</p>
          )}
          {Number(idoPool.status._hex) > 2 && (
            <p className="text-[#9E9E9E] font-semibold leading-5">Join mayor pool (Closed)</p>
          )}
          <p className={`leading-5 ${idoPool.status === 2 ? 'text-skyblue' : 'text-[#9E9E9E]'}`}>
            Open: {format(idoPool.endTimeWL * 1000, 'Pp')} (UTC) - Close: {format(idoPool.endTime * 1000, 'Pp')} UTC
          </p>
        </li>
        <li
          className={`relative pl-8 mt-7 after:timeline-after ${
            Number(idoPool.status._hex) === 3 ? 'after:timeline-after-active' : ''
          }`}
        >
          {Number(idoPool.status._hex) === 3 && (
            <p className=" text-skyblue font-semibold leading-5">Claim tokens (Opening)</p>
          )}
          {Number(idoPool.status._hex) !== 3 && (
            <div>
              <p className="text-[#9E9E9E] font-semibold leading-5">Claim tokens (Incoming)</p>
              <p className="text-[#9E9E9E] leading-5">30 mins after listing</p>
            </div>
          )}
        </li>
      </ul>
    </div>
  )
}

export default Detail
