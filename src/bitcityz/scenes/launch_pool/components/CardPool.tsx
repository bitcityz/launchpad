import React, { useEffect, useState } from 'react'

import '../../../assets/index.css'
import { useWalletModal, Skeleton } from '@mexi/uikit'
import useAuth from 'hooks/useAuth'
import { isAfter, differenceInSeconds } from 'date-fns'
import { useTranslation } from 'contexts/Localization'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import getTimePeriods from 'utils/getTimePeriods'
import BigNumber from 'bignumber.js'
import { useTicketContract } from 'hooks/useContract'
import StakingAction from './StakingAction'

import bgCardPink from '../../../assets/images/bg-lauchpool-card-pink.png'
import bgCardBlue from '../../../assets/images/bg-lauchpool-card-blue.png'
import bgCardGreen from '../../../assets/images/bg-lauchpool-card-green.png'
import bgBtn from '../../../assets/images/bg-launch-pool-btn.png'
import linkSqare from '../../../assets/images/link-square.svg'

function CardPool({ pool, account, isLoading, setUpdatePool, launchPoolAddress, setIsApproved }) {
  const { id, amount, minLockingAmount, name, startTime, lockingTime, ticketHash } = pool
  const { login, logout } = useAuth()
  const { t } = useTranslation()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)
  const unlockTime = +lockingTime + +startTime
  const secondsRemaining = isAfter(unlockTime * 1000, new Date())
    ? differenceInSeconds(unlockTime * 1000, new Date())
    : 0
  const { days, hours, minutes } = getTimePeriods(secondsRemaining)

  const ticketContract = useTicketContract()

  const [ticket, setTicket] = useState(0)

  useEffect(() => {
    if (account) {
      setTicket(0)
      ticketContract.balanceOf(account).then((resp) => {
        const totalTicket = new BigNumber(resp._hex).toNumber()
        if (totalTicket > 0) {
          for (let i = 0; i < totalTicket; i++) {
            ticketContract.tokenOfOwnerByIndex(account, i).then((res) => {
              const tokenId = new BigNumber(res._hex).toNumber()
              ticketContract.tokenHash(tokenId).then((r) => {
                if (r === ticketHash) {
                  setTicket((val) => val + 1)
                }
              })
            })
          }
        }
      })
    } else {
      setTicket(0)
    }
  }, [account, ticketContract, ticketHash, amount])

  return (
    <div className="relative p-6">
      <div
        className="opacity-30 absolute top-0 left-0 w-full h-full rounded-2xl"
        style={{
          background: 'linear-gradient(114.49deg, rgba(255, 255, 255, 0.33) -21.49%, rgba(255, 255, 255, 0) 111.75%)',
        }}
      />
      <div className="flex flex-col gap-y-6 md:flex-row md:gap-x-6 relative">
        <h6 className="text-xl font-bold text-[#F5F5F5] text-center leading-6 md:hidden">{name} Pass-ticket</h6>
        <div className="flex flex-col gap-y-5">
          <div className="relative">
            <img
              src={id === 0 ? bgCardPink : id === 1 ? bgCardBlue : bgCardGreen}
              className="max-w-none w-full xl:max-w-full"
              alt=""
            />
            {/* <p className="flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="font-bold text-2xl text-skyblue text-shadow">{name}</span>
              <span className="font-bold text-xs text-skyblue text-shadow">PASS TICKET</span>
            </p> */}
          </div>
          <button
            type="button"
            className="w-full h-[77px] bg-no-repeat bg-center bg-contain text-skyblue text-shadow font-semibold translate-y-[10px]"
            style={{ backgroundImage: `url(${bgBtn})` }}
          >
            {name} tickets: {ticket}
          </button>
        </div>
        <div className="flex-1 flex flex-col">
          <h6 className="text-xl font-bold text-[#F5F5F5] leading-6 hidden md:block">{name} Pass-ticket</h6>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-4 md:mt-6">
            <div className="flex justify-between items-center md:block">
              <p className="text-[#F5F5F5]">Required: </p>
              <p className="text-skyblue font-semibold text-shadow mt-[10px]">
                &gt;={' '}
                {Number(new BigNumber(minLockingAmount).dividedBy(DEFAULT_TOKEN_DECIMAL)).toLocaleString('en', {
                  maximumFractionDigits: 0,
                })}{' '}
                BCTZ
              </p>
            </div>
            <div className="flex justify-between items-center md:block">
              <p className="text-[#F5F5F5]">Staking: </p>
              <p className="text-skyblue font-semibold text-shadow mt-[10px]">
                {Number(amount).toLocaleString('en', {
                  maximumFractionDigits: 0,
                })}{' '}
                BCTZ
              </p>
            </div>
            <div className="flex justify-between items-center md:block">
              <p className="text-[#F5F5F5]">Lock-up Time:</p>
              <p className="text-skyblue font-semibold text-shadow mt-[10px]">{(lockingTime / 3600).toFixed(2)} days</p>
            </div>
            <div className="flex justify-between items-center md:block">
              <p className="text-[#F5F5F5]">Remaining unlock</p>
              <p className="text-skyblue font-semibold text-shadow mt-[10px] text-right md:text-left">
                {days} days : {hours} hours : {minutes} mins
              </p>
            </div>
            <div className="flex justify-center items-end md:justify-start">
              <a
                href={`https://testnet.bscscan.com/address/${launchPoolAddress}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center underline text-[#2CE7FF] text-sm text-shadow"
              >
                View Smart contract <img src={linkSqare} className="ml-[6px]" alt="" />
              </a>
            </div>
          </div>
          {days === 0 && hours === 0 && minutes === 0 && Number(amount) > 0 && (
            <p className="text-[#F5F5F5] mt-5">You have got a Mayor ticket!</p>
          )}
          <div className="flex justify-center mt-5 md:mt-0 md:items-end md:justify-end md:flex-1">
            {isLoading && <Skeleton width="100%" height="42px" />}
            {!account && !isLoading && (
              <button
                type="button"
                className="fill-btn rounded-[20px] border-none text-white text-sm font-semibold h-[42px] px-10 shadow-blue"
                onClick={onPresentConnectModal}
              >
                Connect wallet
              </button>
            )}
            {account && !isLoading && (
              <StakingAction
                pool={pool}
                setUpdatePool={setUpdatePool}
                isLoading={isLoading}
                setIsApproved={setIsApproved}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardPool
