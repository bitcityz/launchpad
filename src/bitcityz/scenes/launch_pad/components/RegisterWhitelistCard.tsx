import React, { useEffect, useState, useRef } from 'react'
import { isAfter, differenceInSeconds } from 'date-fns'
import { formatEther } from 'ethers/lib/utils'
import BigNumber from 'bignumber.js'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import getTimePeriods from 'utils/getTimePeriods'
import '../../../assets/index.css'
import { NavLink } from 'react-router-dom'
import { useWalletModal } from '@mexi/uikit'

import RegisterModal from 'bitcityz/components/modal/WhiteList/RegisterModal'
import { useTicketContract, useIdoContract } from 'hooks/useContract'
import Social from './Social'

import checkedPng from '../../../assets/images/checked.png'
import icCitizen from '../../../assets/images/ic-citizen.png'
import icElite from '../../../assets/images/ic-elite.png'
import icMayor from '../../../assets/images/ic-mayor.png'

function RegisterWhitelistCard({ ido, pools, account }) {
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [idoName, setIdoName] = useState('')
  const [isInWhitelist, setIsInWhitelist] = useState(false)
  const [updateWhitelist, setUpdateWhitelist] = useState(false)
  const { login, logout } = useAuth()
  const { t } = useTranslation()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)
  const [ticket, setTicket] = useState(0)
  const [ticketId, setTicketId] = useState(0)
  const ticketContract = useTicketContract()
  const idoContract = useIdoContract()
  const [pendingTx, setPendingTx] = useState(true)
  const [secondsRemaining, setSecondsRemaining] = useState(0)
  const timer = useRef(null)

  const _handleCloseConfirm = () => {
    setShowRegisterModal(false)
  }
  const _handleShowRegisterModal = () => {
    setShowRegisterModal(true)
  }

  useEffect(() => {
    const pool = pools.filter((r) => {
      return r.hash === ido.keyType
    })
    setIdoName(pool[0].name)

    if (account) {
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
  }, [pools, ido, account, ticketContract])

  useEffect(() => {
    let isMounted = true
    const checkAccountInWhiteList = async () => {
      const response = await idoContract.isWhitelist(account, ido.id)
      if (isMounted) {
        setPendingTx(false)
        setIsInWhitelist(response)
        setUpdateWhitelist(false)
      }
    }
    if (account) {
      checkAccountInWhiteList()
    } else {
      setPendingTx(false)
    }
    return () => {
      isMounted = false
    }
  }, [account, ido, idoContract, updateWhitelist])

  useEffect(() => {
    countdown()
    timer.current = setInterval(() => {
      countdown()
    }, 1000)
    return () => clearInterval(timer.current)
  })

  const countdown = () => {
    const temp = isAfter(ido.endTimeWL * 1000, new Date()) ? differenceInSeconds(ido.endTimeWL * 1000, new Date()) : 0
    setSecondsRemaining(temp)
    if (temp === 0) {
      clearInterval(timer.current)
    }
  }

  const { days, hours, minutes, seconds } = getTimePeriods(secondsRemaining)

  return (
    <>
      <div
        className={`relative px-6 py-5 pool-card ${
          idoName === 'Mayor'
            ? 'sm-mayor-card md:mayor-card'
            : idoName === 'Elite'
            ? 'sm-elite-card md:elite-card'
            : 'sm-citizen-card md:citizen-card'
        }`}
        // style={{
        //   backgroundImage: `url(${
        //     idoName === 'Mayor' ? bgMayorCard : idoName === 'Elite' ? bgEliteCard : bgCitizenCard
        //   })`,
        // }}
      >
        {/* <div className="absolute card rounded-2xl top-0 left-0 w-full h-full" /> */}
        <div className="relative z-10">
          <h6 className="text-xl text-shadow font-bold text-[#2CE7FF] flex items-center">
            <img
              src={idoName === 'Mayor' ? icMayor : idoName === 'Elite' ? icElite : icCitizen}
              className="mr-2"
              alt=""
            />{' '}
            {idoName} Pool
          </h6>
          <div className="mt-5 flex flex-col gap-y-5 md:gap-y-0 md:flex-row md:gap-x-[30px]">
            <div>
              <img src={ido.baseInfo.logo.large} className="w-full md:w-auto" alt="" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-start gap-x-3">
                <img src={ido.baseInfo.logo.small} alt="" />
                <div className="flex-1">
                  <p className="text-[#F5F5F5] font-bold text-xl leading-6 flex justify-between items-center">
                    {ido.baseInfo.name}{' '}
                    <span className="text-[#F5F5F5] leading-5 text-xs md:text-sm">
                      ({ido.baseInfo.symbol}/{ido.baseInfo.currencyPair})
                    </span>
                  </p>

                  <p className="text-[#F5F5F5] text-xl font-bold leading-6 mt-1 flex flex-col items-start gap-y-3 md:gap-y-0 md:flex-row md:justify-between md:items-center">
                    <span className="text-sm font-medium">Token&apos;s Name: {ido.baseInfo.symbol}</span>
                    <span className="text-shadow font-semibold md:font-bold leading-5 text-skyblue text-2xl -translate-x-[60px] md:-translate-x-0">
                      {ido.baseInfo.symbol} = {ido.baseInfo.price} {ido.baseInfo.currencyPair}
                    </span>
                  </p>
                </div>
              </div>
              <Social idoInfo={ido.baseInfo} />
              <div className="mt-5 md:mt-3 flex flex-col md:flex-row md:gap-x-8">
                <div className="flex-1 text-left">
                  <p className="flex flex-row gap-x-4">
                    <span className="text-[#BFBFBF]">Total Capital Raised</span>
                    <span className="text-[#F5F5F5] font-semibold">
                      {(
                        Number(formatEther(ido.totalAmount)) * Number(formatEther(ido.tokenBuy2IDOtoken))
                      ).toLocaleString('en', {
                        maximumFractionDigits: 0,
                      })}{' '}
                      {ido.baseInfo.currencyPair}
                    </span>
                  </p>
                  <p className="flex flex-row gap-x-4 mt-3">
                    <span className="text-[#BFBFBF]">Register Whitelist</span>
                    <span className="text-[#F5F5F5] font-semibold">
                      {days}d : {hours}h : {minutes}m : {seconds}s
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-y-4 mt-5 md:flex-row md:gap-y-0 md:gap-x-4">
                {!account && (
                  <button
                    type="button"
                    className="bg-skyblue mt-5 md:mt-auto rounded-[20px] border-none text-[#212121] font-semibold h-[44px] px-8 shadow-blue"
                    onClick={onPresentConnectModal}
                  >
                    Connect Wallet
                  </button>
                )}
                {account &&
                  !isInWhitelist &&
                  !pendingTx &&
                  (days !== 0 || hours !== 0 || minutes !== 0 || seconds !== 0) && (
                    <button
                      type="button"
                      className="bg-skyblue mt-5 md:mt-auto rounded-[20px] border-none text-[#212121] font-semibold h-[44px] px-8 shadow-blue"
                      onClick={_handleShowRegisterModal}
                    >
                      Register Whitelist
                    </button>
                  )}
                {account && isInWhitelist && !pendingTx && (
                  <span className="mt-5 md:mt-auto rounded-[20px] border-[1px] border-solid border-skyblue text-skyblue font-semibold h-[44px] px-12 flex gap-x-3 items-center justify-center">
                    <img src={checkedPng} alt="" />
                    Registered
                  </span>
                )}
                {((account && !isInWhitelist) || !account) &&
                  days === 0 &&
                  hours === 0 &&
                  minutes === 0 &&
                  seconds === 0 &&
                  !pendingTx && (
                    <p className="text-[#FF4D4F] font-semibold border-[1px] border-solid border-[#FF4D4F] rounded-[20px] flex items-center justify-center h-[44px] px-4">
                      Registration timeout
                    </p>
                  )}
                <NavLink
                  to={`/launchpad/${window.btoa(ido.id)}`}
                  className="text-skyblue border-skyblue border-[1px] border-solid rounded-[20px] h-[44px] flex items-center px-12 font-semibold justify-center"
                >
                  Project Details
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showRegisterModal && (
        <RegisterModal
          onClose={_handleCloseConfirm}
          ido={ido}
          idoName={idoName}
          ticket={ticket}
          ticketId={ticketId}
          setUpdateWhitelist={setUpdateWhitelist}
          projectName={ido.baseInfo.name}
        />
      )}
    </>
  )
}

export default RegisterWhitelistCard
