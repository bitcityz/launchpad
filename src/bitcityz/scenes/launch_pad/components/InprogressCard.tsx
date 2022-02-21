import React, { useEffect, useRef, useState } from 'react'

import '../../../assets/index.css'
import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import { getIdoAddress } from 'utils/addressHelpers'
import { NavLink } from 'react-router-dom'
import { formatEther } from 'ethers/lib/utils'
import { isAfter, differenceInSeconds } from 'date-fns'
import { useIdoContract, useTokenContract } from 'hooks/useContract'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import getTimePeriods from 'utils/getTimePeriods'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import { useWalletModal } from '@mexi/uikit'
import useToast from 'hooks/useToast'
import useApprove from '../hooks/useApprove'
import Social from './Social'

import oceanProtocolActive1 from '../../../assets/images/ocean-protocol-active1.svg'
import checkedPng from '../../../assets/images/checked.png'

function InprogressCard({ ido, pools, account }) {
  const [isBuyer, setIsBuyer] = useState(false)
  const [isInWhitelist, setIsInWhitelist] = useState(false)
  const [idoName, setIdoName] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [secondsRemaining, setSecondsRemaining] = useState(0)
  const { toastSuccess } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const erc20Contract = useTokenContract(ido.idoToken2Buy)

  const { login, logout } = useAuth()
  const { t } = useTranslation()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)

  const [percent, setPercent] = useState(0)
  const idoContract = useIdoContract()
  const idoAddress = getIdoAddress()
  console.log(ido)
  const totalToken = Number(formatEther(ido.amount)) * Number(formatEther(ido.tokenBuy2IDOtoken))

  const timer = useRef(null)

  useEffect(() => {
    countdown()
    timer.current = setInterval(() => {
      const temp = isAfter(ido.endTime * 1000, new Date()) ? differenceInSeconds(ido.endTime * 1000, new Date()) : 0
      setSecondsRemaining(temp)
    }, 1000)
    return () => clearInterval(timer.current)
  })

  const countdown = () => {
    const temp = isAfter(ido.endTime * 1000, new Date()) ? differenceInSeconds(ido.endTime * 1000, new Date()) : 0
    setSecondsRemaining(temp)
    if (temp === 0) {
      clearInterval(timer.current)
    }
  }

  const { days, hours, minutes, seconds } = getTimePeriods(secondsRemaining)

  const { isApproved, handleApprove, handleConfirm } = useApprove({
    onRequiresApproval: async () => {
      try {
        const response = await erc20Contract.allowance(account, idoAddress)
        return response && new BigNumber(response._hex).isGreaterThan(0)
      } catch (error) {
        return false
      }
    },
    onApprove: () => {
      setPendingTx(true)
      return callWithGasPrice(erc20Contract, 'approve', [idoAddress, ethers.constants.MaxUint256])
    },
    onApproveSuccess: async () => {
      setPendingTx(false)
      toastSuccess(t('Contract approved - you can now join pool!'))
    },
    onConfirm: () => {
      setPendingTx(true)
      return callWithGasPrice(idoContract, 'buy', [ido.id])
    },
    onSuccess: async () => {
      setPendingTx(false)
      setIsBuyer(true)
      toastSuccess(`${t('Registed')}!`, t('You have successfully join pool'))
    },
    onError: async () => {
      setPendingTx(false)
    },
  })

  useEffect(() => {
    const pool = pools.filter((r) => {
      return r.hash === ido.keyType
    })
    setIdoName(pool[0].name)
  }, [pools, ido])

  useEffect(() => {
    const totalAmount = Number(formatEther(ido.totalAmount))
    const remainAmount = Number(formatEther(ido.remainAmount))
    const result = ((totalAmount - remainAmount) * 100) / totalAmount
    setPercent(result)
  }, [ido, isBuyer])

  useEffect(() => {
    const checkAccountInWhiteList = async () => {
      const response = await idoContract.isWhitelist(account, ido.id)
      setIsInWhitelist(response)
      if (response) {
        checkAccountJoined()
      } else {
        setShowButton(true)
      }
    }
    const checkAccountJoined = async () => {
      const response = await idoContract.isBuyer(account, ido.id)
      setIsBuyer(response)
      setShowButton(true)
    }
    if (account) {
      checkAccountInWhiteList()
    } else {
      setShowButton(true)
    }
  }, [account, ido, idoContract])

  return (
    <div className="relative px-6 py-5">
      <div
        className="absolute opacity-50 rounded-2xl top-0 left-0 w-full h-full"
        style={{
          background: 'linear-gradient(114.49deg, rgba(255, 255, 255, 0.165) -21.49%, rgba(255, 255, 255, 0) 111.75%)',
          backdropFilter: 'blur(140px)',
        }}
      />
      <div className="relative z-10">
        <h6 className="text-xl text-shadow font-bold text-[#2CE7FF] flex items-center">
          {idoName} pool <img src={oceanProtocolActive1} className="ml-2" alt="" />
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
                  <span className="text-[#F5F5F5] font-normal md:text-sm">
                    ({ido.baseInfo.symbol}/{ido.baseInfo.currencyPair})
                  </span>
                </p>
                <p className="text-[#F5F5F5] text-xl font-bold leading-6 mt-1 flex flex-col items-start gap-y-3 md:gap-y-0 md:flex-row md:justify-between md:items-center">
                  <span className="text-sm font-medium">Token name: {ido.baseInfo.symbol}</span>
                  <span className="text-shadow font-semibold md:font-bold leading-5 text-skyblue text-2xl -translate-x-[60px] md:-translate-x-0">
                    {ido.baseInfo.symbol} ={' '}
                    {/* {Number(formatEther(ido.tokenBuy2IDOtoken)).toLocaleString('en', {
                        maximumFractionDigits: 4,
                      })}{' '} */}
                    {ido.baseInfo.price} {ido.baseInfo.currencyPair}
                  </span>
                </p>
              </div>
            </div>
            <Social idoInfo={ido.baseInfo} />
            <div className="mt-5 flex flex-col md:flex-row md:gap-x-8">
              <div className="flex-1">
                {/* <div className="flex flex-col gap-y-1 md:gap-y-0 md:flex-row justify-between items-center">
                  <span className="text-[#BFBFBF]">Total capital raise</span>
                  <span className="text-[#F5F5F5] font-semibold">
                    {(Number(formatEther(ido.totalAmount)) * Number(formatEther(ido.tokenBuy2IDOtoken))).toLocaleString(
                      'en',
                      {
                        maximumFractionDigits: 0,
                      },
                    )}{' '}
                    {ido.baseInfo.currencyPair}
                  </span>
                </div> */}
                <div className="flex gap-x-3 justify-start items-center">
                  <span className="text-[#BFBFBF] w-[130px] text-left">Join Pool</span>
                  <span className="text-[#F5F5F5] font-semibold">
                    {days}d : {hours}h : {minutes}m : {seconds}s
                  </span>
                </div>
                {account && isInWhitelist && (
                  <div className="flex gap-x-3 justify-start items-center mt-3">
                    <span className="text-[#BFBFBF] w-[130px] text-left">Available to buy</span>
                    <span className="text-[#F5F5F5] font-semibold">
                      {Number(formatEther(ido.amount)).toLocaleString('en', {
                        maximumFractionDigits: 4,
                      })}{' '}
                      {ido.baseInfo.symbol} <small className="text-[#BFBFBF] font-normal">cost</small>{' '}
                      {totalToken.toLocaleString('en', {
                        maximumFractionDigits: 4,
                      })}{' '}
                      {ido.baseInfo.currencyPair}
                    </span>
                  </div>
                )}
                <div className="flex flex-col gap-y-1 md:gap-y-0 md:flex-row md:gap-x-3 items-start md:items-center mt-3">
                  <span className="text-[#BFBFBF] w-[130px] text-left">Swap process</span>
                  <div className="flex flex-1 w-full md:max-w-[300px] items-center justify-end gap-x-2">
                    <div className="flex-1 w-full bg-[#F5F5F5] h-2 rounded-[100px]">
                      <div className="bg-[#1890FF] h-2 rounded-[100px]" style={{ width: `${percent}%` }} />
                    </div>
                    <span className="text-white font-semibold">
                      {percent.toLocaleString('en', {
                        maximumFractionDigits: 4,
                      })}{' '}
                      %
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-4 mt-5 md:flex-row md:gap-y-0 md:gap-x-4">
              {!account && (
                <button
                  type="button"
                  className="bg-skyblue mt-5 md:mt-auto rounded-[20px] border-none text-[#212121] font-semibold h-[44px] px-8 shadow-blue"
                  onClick={onPresentConnectModal}
                >
                  Connect wallet
                </button>
              )}
              {account && isApproved && !isBuyer && isInWhitelist && !pendingTx && showButton && (
                <button
                  type="button"
                  className="bg-skyblue mt-5 md:mt-auto rounded-[20px] border-none text-[#212121] font-semibold h-[44px] px-10 shadow-blue"
                  onClick={handleConfirm}
                >
                  Join pool
                </button>
              )}

              {account && !isApproved && !isBuyer && isInWhitelist && !pendingTx && showButton && (
                <button
                  type="button"
                  className="bg-skyblue mt-5 md:mt-auto rounded-[20px] border-none text-[#212121] font-semibold h-[44px] px-10 shadow-blue"
                  onClick={handleApprove}
                >
                  Approve
                </button>
              )}

              {pendingTx && (
                <button
                  type="button"
                  className="flex items-center justify-center mt-5 md:mt-auto h-[44px] w-[151px] font-semibold rounded-[20px] text-black pointer-events-none bg-[#9E9E9E] transition ease-in-out duration-150 cursor-not-allowed"
                  disabled
                >
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Waiting...
                </button>
              )}

              {account && isBuyer && isInWhitelist && !pendingTx && showButton && (
                <span className="mt-5 md:mt-auto rounded-[20px] border-[1px] border-solid border-skyblue text-skyblue font-semibold h-[44px] px-12 flex gap-x-3 items-center justify-center">
                  <img src={checkedPng} alt="" />
                  Joined
                </span>
              )}
              {account && !isInWhitelist && !pendingTx && showButton && (
                <p className="text-[#FF4D4F] font-semibold border-[1px] border-solid border-[#FF4D4F] rounded-[20px] flex items-center justify-center h-[44px] px-4">
                  You aren’t in whitelist
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
  )
}

export default InprogressCard
