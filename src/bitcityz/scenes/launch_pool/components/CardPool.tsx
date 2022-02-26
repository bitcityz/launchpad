import React, { useEffect, useState, useCallback } from 'react'

import '../../../assets/index.css'
import { useWalletModal } from '@mexi/uikit'
import useAuth from 'hooks/useAuth'
import { useBlock } from 'state/block/hooks'
import { differenceInSeconds } from 'date-fns'
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
import linkSvg from '../../../assets/images/link.svg'
import externalink from '../../../assets/images/external-link.svg'
import infoSvg from '../../../assets/images/info.svg'
import warningInfoSvg from '../../../assets/images/warning-info.svg'

function CardPool({ pool, account, setUpdatePool, launchPoolAddress, isApproved, setIsApproved }) {
  const { id, amount, minLockingAmount, name, startTime, lockingTime, ticketHash } = pool
  const { login, logout } = useAuth()
  const { t } = useTranslation()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)

  const { currentBlock } = useBlock()

  const ticketContract = useTicketContract()

  const [ticket, setTicket] = useState(0)

  const secondsRemaining = startTime > 0 ? differenceInSeconds(new Date(), startTime * 1000) : 0
  const availableTicket = Math.floor(secondsRemaining / lockingTime)
  const { days, hours, minutes } = getTimePeriods(secondsRemaining)

  const calculateTicket = useCallback(
    (totalTicket) => {
      const promises = []
      for (let i = 0; i < totalTicket; i++) {
        promises.push(
          ticketContract.tokenOfOwnerByIndex(account, i).then((res) => {
            const tokenId = new BigNumber(res._hex).toNumber()
            return ticketContract.tokenHash(tokenId)
          }),
        )
      }
      return Promise.all(promises)
    },
    [account, ticketContract],
  )

  useEffect(() => {
    if (account) {
      setTicket(0)
      ticketContract.balanceOf(account).then((resp) => {
        const totalTicket = new BigNumber(resp._hex).toNumber()
        if (totalTicket > 0) {
          calculateTicket(totalTicket)
            .then((results) => {
              const value = results.reduce((a, v) => (v === ticketHash ? a + 1 : a), 0)
              setTicket(value)
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
    } else {
      setTicket(0)
    }
  }, [account, ticketContract, ticketHash, pool, calculateTicket])

  return (
    <div className="relative p-6">
      <div
        className="opacity-30 absolute top-0 left-0 w-full h-full rounded-2xl"
        style={{
          background: 'linear-gradient(114.49deg, rgba(255, 255, 255, 0.33) -21.49%, rgba(255, 255, 255, 0) 111.75%)',
        }}
      />
      <div className="flex flex-col gap-y-6 md:flex-row md:gap-x-6 relative">
        <h6 className="text-2xl font-bold text-[#F5F5F5] text-center leading-6 md:hidden">{name} Pass-ticket</h6>
        <div className="flex flex-col gap-y-0">
          <div className="relative">
            <img
              src={id === 0 ? bgCardPink : id === 1 ? bgCardBlue : bgCardGreen}
              className="max-w-none w-full xl:max-w-full"
              alt=""
            />
          </div>
          <button
            type="button"
            className="w-full h-[77px] bg-no-repeat bg-center bg-contain text-skyblue text-shadow font-semibold translate-y-[10px]"
            style={{ backgroundImage: `url(${bgBtn})` }}
          >
            Your {name} tickets: {ticket}
          </button>
        </div>
        <div className="flex-1 flex flex-col">
          <h6 className="text-2xl font-bold text-[#F5F5F5] leading-6 hidden md:block">{name} Pass-ticket</h6>
          <div className="mt-2">
            <a
              href={`https://testnet.bscscan.com/address/${launchPoolAddress}`}
              target="_blank"
              rel="noreferrer"
              className="mx-auto md:mx-0 flex bg-[#F5F5F5] max-w-[177px] py-1 gap-x-2 text-xs font-semibold text-black rounded-[20px] px-3 justify-around"
            >
              <img src={linkSvg} alt="" />
              <span>Smart contract</span>
              <img src={externalink} alt="" />
            </a>
          </div>
          <div className="grid pb-4 border-b-[1px] border-solid border-[#262626] md:grid-cols-2 xl:grid-cols-3 gap-y-4 mt-6">
            <div className="flex justify-between items-center md:block">
              <p className="text-[#9E9E9E] font-semibold text-sm">Required</p>
              <p className="text-[#F5F5F5] font-semibold text-shadow mt-2">
                Min.{' '}
                {Number(new BigNumber(minLockingAmount).dividedBy(DEFAULT_TOKEN_DECIMAL)).toLocaleString('en', {
                  maximumFractionDigits: 0,
                })}{' '}
                BCTZ
              </p>
            </div>
            <div className="flex justify-between items-center md:block">
              <p className="text-[#9E9E9E] font-semibold text-sm">Your staking</p>
              <p className="text-[#F5F5F5] font-semibold text-shadow mt-2">
                {Number(amount).toLocaleString('en', {
                  maximumFractionDigits: 0,
                })}{' '}
                BCTZ
              </p>
            </div>
            <div className="flex justify-between items-center md:block">
              <p className="text-[#9E9E9E] font-semibold text-sm">Your staking time</p>
              <p className="text-[#F5F5F5] font-semibold text-shadow mt-2">
                {days} days : {hours} hours : {minutes} mins
              </p>
            </div>
            {/* <div className="flex justify-between items-center md:block">
              <p className="text-[#F5F5F5]">Remaining unlock</p>
              <p className="text-skyblue font-semibold text-shadow mt-[10px] text-right md:text-left">
                {days} days : {hours} hours : {minutes} mins
              </p>
            </div> */}
          </div>
          <div className="mt-4 flex flex-col gap-y-2 md:gap-y-0 md:flex-row md:justify-between md:items-center">
            <p className="text-[#9E9E9E] font-semibold text-sm">
              Available to claim{' '}
              {account && isApproved ? (
                <span className="text-[#F5F5F5] font-semibold text-shadow">{availableTicket} tickets</span>
              ) : (
                <span className="text-[#F5F5F5] font-semibold text-shadow">N/A</span>
              )}
            </p>
            <p className="text-[#F5F5F5] font-semibold text-xs flex items-center">
              {account && isApproved ? (
                <>
                  <img src={infoSvg} alt="" className="mr-1" /> One pass-ticket will be generated in 7 days
                </>
              ) : (
                <>
                  <img src={warningInfoSvg} alt="" className="mr-1" />
                  {!account && <span className="text-[#FF4D4F]">Connect wallet to see available ticket</span>}
                  {account && !isApproved && (
                    <span className="text-[#FF4D4F]">Approval contract to see available ticket</span>
                  )}
                </>
              )}
            </p>
          </div>
          {/* {days === 0 && hours === 0 && minutes === 0 && Number(amount) > 0 && (
            <p className="text-[#F5F5F5] mt-5">You have got a {name} ticket!</p>
          )} */}
          <div className="flex justify-center mt-5 md:mt-0 md:items-end md:justify-end md:flex-1">
            {!account && (
              <button
                type="button"
                className="bg-skyblue rounded-[20px] border-none text-[#212121] text-sm font-semibold h-[42px] px-10 shadow-blue"
                onClick={onPresentConnectModal}
              >
                Connect wallet
              </button>
            )}
            {account && (
              <StakingAction
                pool={pool}
                setUpdatePool={setUpdatePool}
                isApproved={isApproved}
                setIsApproved={setIsApproved}
                account={account}
                availableTicket={availableTicket}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardPool
