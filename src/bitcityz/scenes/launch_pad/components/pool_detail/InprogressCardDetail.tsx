import React, { useEffect, useRef, useState } from 'react'
import '../../../../assets/index.css'
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { isAfter, differenceInSeconds } from 'date-fns'
import getTimePeriods from 'utils/getTimePeriods'

import { getIdoAddress } from 'utils/addressHelpers'
import { useWalletModal } from '@mexi/uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import { useIdoContract, useTokenContract } from 'hooks/useContract'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useToast from 'hooks/useToast'
import useApprove from '../../hooks/useApprove'

import Social from '../Social'
import checkedPng from '../../../../assets/images/checked.png'

function InprogressCardDetail({ idoPool, account, setIsLoading, setIsRefresh }) {
  const { login, logout } = useAuth()
  const [isInWhitelist, setIsInWhitelist] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [isBuyer, setIsBuyer] = useState(false)
  const { t } = useTranslation()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)
  const idoContract = useIdoContract()
  const { toastSuccess } = useToast()

  const [secondsRemaining, setSecondsRemaining] = useState(0)

  const { callWithGasPrice } = useCallWithGasPrice()
  const erc20Contract = useTokenContract(idoPool.idoToken2Buy)
  const idoAddress = getIdoAddress()

  const timer = useRef(null)

  useEffect(() => {
    countdown()
    timer.current = setInterval(() => {
      countdown()
    }, 1000)
    return () => clearInterval(timer.current)
  })

  const countdown = () => {
    const temp = isAfter(idoPool.endTime * 1000, new Date())
      ? differenceInSeconds(idoPool.endTime * 1000, new Date())
      : 0
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
      setIsLoading(true)
      setPendingTx(true)
      return callWithGasPrice(erc20Contract, 'approve', [idoAddress, ethers.constants.MaxUint256])
    },
    onApproveSuccess: async () => {
      setIsLoading(false)
      setPendingTx(false)
      toastSuccess(t('Contract approved - you can now join pool!'))
    },
    onConfirm: () => {
      setIsLoading(true)
      setPendingTx(true)
      return callWithGasPrice(idoContract, 'buy', [idoPool.id])
    },
    onSuccess: async () => {
      setIsLoading(false)
      setPendingTx(false)
      setIsBuyer(true)
      setIsRefresh(true)
      toastSuccess(`${t('Registed')}!`, t('You have successfully join pool'))
    },
    onError: async () => {
      setIsLoading(false)
      setPendingTx(false)
    },
  })

  useEffect(() => {
    if (account) {
      const checkAccountInWhiteList = async () => {
        const response = await idoContract.isWhitelist(account, idoPool.id)
        setIsInWhitelist(response)
        if (response) {
          checkAccountJoined()
        } else {
          setShowButton(true)
        }
      }
      checkAccountInWhiteList()
      const checkAccountJoined = async () => {
        const response = await idoContract.isBuyer(account, idoPool.id)
        setIsBuyer(response)
        setShowButton(true)
      }
    }
  }, [account, idoPool, idoContract])

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
          {account && isApproved && isInWhitelist && !isBuyer && !pendingTx && showButton && (
            <button
              type="button"
              className="bg-skyblue mt-auto rounded-[20px] border-none text-black font-semibold h-[44px] w-full md:px-14 shadow-blue"
              onClick={handleConfirm}
            >
              Join pool
            </button>
          )}
          {account && !isApproved && isInWhitelist && !isBuyer && !pendingTx && showButton && (
            <button
              type="button"
              className="bg-skyblue mt-auto rounded-[20px] border-none text-black font-semibold h-[44px] w-full md:px-14 shadow-blue"
              onClick={handleApprove}
            >
              Approve
            </button>
          )}
          {pendingTx && (
            <button
              type="button"
              className="flex items-center justify-center mt-5 md:mt-auto h-[44px] w-full font-semibold rounded-[20px] text-black pointer-events-none bg-[#9E9E9E] transition ease-in-out duration-150 cursor-not-allowed"
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
          {account && isBuyer && isInWhitelist && showButton && (
            <span className="mt-5 md:mt-auto rounded-[20px] border-[1px] border-solid border-skyblue text-skyblue font-semibold h-[44px] px-12 flex gap-x-3 items-center justify-center">
              <img src={checkedPng} alt="" />
              Joined
            </span>
          )}

          {account && !isInWhitelist && showButton && (
            <p className="text-[#FF4D4F] font-semibold border-[1px] border-solid border-[#FF4D4F] rounded-[20px] flex items-center justify-center h-[44px] px-4">
              You aren’t in whitelist
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default InprogressCardDetail
