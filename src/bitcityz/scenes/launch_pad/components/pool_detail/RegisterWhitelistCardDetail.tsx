import React, { useEffect, useState } from 'react'
import '../../../../assets/index.css'
import BigNumber from 'bignumber.js'
import { isAfter, differenceInSeconds } from 'date-fns'
import getTimePeriods from 'utils/getTimePeriods'

import { useWalletModal } from '@mexi/uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import { useTicketContract, useIdoContract } from 'hooks/useContract'
import RegisterModal from 'bitcityz/components/modal/WhiteList/RegisterModal'

import Social from '../Social'

import checkedPng from '../../../../assets/images/checked.png'

function RegisterWhitelistCardDetail({ idoPool, account, updateWhitelist, setUpdateWhitelist, pools, idoName }) {
  const idoContract = useIdoContract()
  const [isInWhitelist, setIsInWhitelist] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)
  const [secondsRemaining, setSecondsRemaining] = useState(0)

  const [ticket, setTicket] = useState(0)
  const [ticketId, setTicketId] = useState(0)
  const ticketContract = useTicketContract()

  const _handleShowRegisterModal = () => {
    setShowRegisterModal(true)
  }

  const _handleCloseConfirm = () => {
    setShowRegisterModal(false)
  }

  useEffect(() => {
    const pool = pools.filter((r) => {
      return r.hash === idoPool.keyType
    })

    if (account) {
      setTicket(0)
      ticketContract.balanceOf(account).then((resp) => {
        const totalTicket = new BigNumber(resp._hex).toNumber()
        if (totalTicket > 0) {
          for (let i = 0; i < totalTicket; i++) {
            ticketContract.tokenOfOwnerByIndex(account, i).then((res) => {
              const tokenId = new BigNumber(res._hex).toNumber()
              ticketContract.tokenHash(tokenId).then((r) => {
                if (r === pool[0].hash) {
                  setTicket((val) => val + 1)
                  setTicketId(tokenId)
                }
              })
            })
          }
        }
      })
    }
  }, [pools, idoPool, account, ticketContract])

  useEffect(() => {
    if (account) {
      const checkAccountInWhiteList = async () => {
        const response = await idoContract.isWhitelist(account, idoPool.id)
        setIsInWhitelist(response)
        setUpdateWhitelist(false)
      }
      checkAccountInWhiteList()
    }
  }, [account, idoPool, idoContract, updateWhitelist, setUpdateWhitelist])

  useEffect(() => {
    setInterval(() => {
      const temp = isAfter(idoPool.endTime * 1000, new Date())
        ? differenceInSeconds(idoPool.endTime * 1000, new Date())
        : 0
      setSecondsRemaining(temp)
    }, 1000)
  }, [idoPool])

  const { days, hours, minutes, seconds } = getTimePeriods(secondsRemaining)

  return (
    <div className="flex-1 grid md:gap-x-4 md:whitelist-card-grid">
      <div>
        <div className="flex items-start gap-x-3">
          <img src={idoPool.baseInfo.logo.small} alt="" />
          <div className="flex-1">
            <p className="text-[#F5F5F5] leading-5 flex justify-between items-center">
              {idoPool.baseInfo.name}{' '}
              <span className="text-[#F5F5F5] leading-5 font-semibold text-xs md:text-base md:hidden">
                ({idoPool.baseInfo.symbol}/{idoPool.baseInfo.currencyPair})
              </span>
            </p>
            <p className="text-[#F5F5F5] text-xl font-bold leading-6 mt-1">{idoPool.baseInfo.symbol}</p>
            <p className="text-sm text-[#BFBFBF] hidden md:block">{idoPool.baseInfo.shortDescription}</p>
          </div>
        </div>
        <Social idoInfo={idoPool.baseInfo} />
      </div>
      <div className="">
        <p className="text-[#F5F5F5] hidden text-right leading-5 font-semibold text-xs md:text-base md:block">
          ({idoPool.baseInfo.symbol}/{idoPool.baseInfo.currencyPair})
        </p>
        <p className="flex flex-row mt-8 gap-x-4 md:gap-x-0 md:flex-col gap-y-1 md:items-end md:mt-1">
          <span className="text-[#F5F5F5] leading-5">Register whitelist</span>
          <span
            className={`leading-5 font-semibold ${
              days !== 0 || hours !== 0 || minutes !== 0 || seconds !== 0 ? 'text-[#F5F5F5]' : 'text-[#FF4D4F]'
            }`}
          >
            {days}d : {hours}h : {minutes}m : {seconds}s
          </span>
        </p>
        <div className="w-full md:w-auto order-3 md:-order-none mt-4">
          {!account && (
            <button
              type="button"
              className="bg-skyblue mt-auto rounded-[20px] border-none text-black font-semibold h-[44px] w-full md:px-8 shadow-blue"
              onClick={onPresentConnectModal}
            >
              Connect wallet
            </button>
          )}
          {account && isInWhitelist && (
            <span className="mt-5 md:mt-auto rounded-[20px] border-[1px] border-solid border-skyblue text-skyblue font-semibold h-[44px] px-8 flex gap-x-3 items-center justify-center">
              <img src={checkedPng} alt="" />
              Registered
            </span>
          )}
          {account && !isInWhitelist && (days !== 0 || hours !== 0 || minutes !== 0 || seconds !== 0) && (
            <button
              type="button"
              className="bg-skyblue mt-auto rounded-[20px] border-none text-black font-semibold h-[44px] w-full md:px-8 shadow-blue"
              onClick={_handleShowRegisterModal}
            >
              Register Whitelist
            </button>
          )}
          {days === 0 && hours === 0 && minutes === 0 && seconds === 0 && !isInWhitelist && (
            <p className="text-[#FF4D4F] font-semibold border-[1px] border-solid border-[#FF4D4F] rounded-[20px] flex items-center justify-center h-[44px] px-4">
              Registration timeout
            </p>
          )}
        </div>
      </div>
      {showRegisterModal && (
        <RegisterModal
          onClose={_handleCloseConfirm}
          ido={idoPool}
          idoName={idoName}
          ticket={ticket}
          ticketId={ticketId}
          setUpdateWhitelist={setUpdateWhitelist}
        />
      )}
    </div>
  )
}

export default RegisterWhitelistCardDetail
