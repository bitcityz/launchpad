import React, { useEffect, useState } from 'react'

import '../../../assets/index.css'
import { useWalletModal } from '@mexi/uikit'
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

function CardPool({ pool, account, setUpdatePool }) {
  const { id, amount, lockingToken, minLockingAmount, name, startTime, lockingTime, isApproved, balance, ticketHash } =
    pool
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
    }
  }, [account, ticketContract, ticketHash])

  return (
    <div className="relative p-6">
      <div
        className="opacity-30 absolute top-0 left-0 w-full h-full rounded-2xl"
        style={{
          background: 'linear-gradient(114.49deg, rgba(255, 255, 255, 0.33) -21.49%, rgba(255, 255, 255, 0) 111.75%)',
        }}
      />
      <div className="flex gap-x-6 relative">
        <div className="flex flex-col gap-y-5">
          <div className="relative">
            <img src={id === 0 ? bgCardPink : id === 1 ? bgCardBlue : bgCardGreen} alt="" />
            <p className="flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="font-bold text-2xl text-skyblue text-shadow">{name}</span>
              <span className="font-bold text-xs text-skyblue text-shadow">PASS TICKET</span>
            </p>
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
          <h6 className="text-xl font-bold text-[#F5F5F5] leading-6">Mayor Pass-ticket</h6>
          <div className="grid grid-cols-3 gap-x-5 gap-y-4 mt-6">
            <div>
              <p className="text-[#F5F5F5]">Required: </p>
              <p className="text-skyblue font-semibold text-shadow mt-[10px]">
                &gt;={' '}
                {Number(new BigNumber(minLockingAmount).dividedBy(DEFAULT_TOKEN_DECIMAL)).toLocaleString('en', {
                  maximumFractionDigits: 0,
                })}{' '}
                BCTZ
              </p>
            </div>
            <div>
              <p className="text-[#F5F5F5]">Staking: </p>
              <p className="text-skyblue font-semibold text-shadow mt-[10px]">
                {Number(amount).toLocaleString('en', {
                  maximumFractionDigits: 0,
                })}{' '}
                BCTZ
              </p>
            </div>
            <div>
              <p className="text-[#F5F5F5]">Lock-up Time:</p>
              <p className="text-skyblue font-semibold text-shadow mt-[10px]">{(lockingTime / 3600).toFixed(2)} days</p>
            </div>
            <div>
              <p className="text-[#F5F5F5]">Remaining unlock</p>
              <p className="text-skyblue font-semibold text-shadow mt-[10px]">
                {days} days : {hours} hours : {minutes} mins
              </p>
            </div>
            <div className="flex items-end">
              <a
                href="https://testnet.bscscan.com/address/0xa8B9861222Ee5321B7052642695269E18cbD07AA"
                target="_blank"
                rel="noreferrer"
                className="flex items-center underline text-[#2CE7FF] text-sm text-shadow"
              >
                View Smart contract <img src={linkSqare} className="ml-[6px]" alt="" />
              </a>
            </div>
          </div>
          <div className="flex items-end justify-end flex-1">
            {!account ? (
              <button
                type="button"
                className="bg-skyblue rounded-[20px] border-none text-black text-sm font-semibold h-[42px] px-10 shadow-blue"
                onClick={onPresentConnectModal}
              >
                Connect wallet
              </button>
            ) : (
              <StakingAction pool={pool} setUpdatePool={setUpdatePool} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardPool
