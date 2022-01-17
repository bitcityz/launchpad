import React, { useEffect, useState } from 'react'

import '../../../assets/index.css'
import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import { getIdoAddress } from 'utils/addressHelpers'
import { NavLink } from 'react-router-dom'
import { formatEther } from 'ethers/lib/utils'
import { format } from 'date-fns'
import { useIdoContract, useTokenContract } from 'hooks/useContract'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import { useWalletModal, Skeleton } from '@mexi/uikit'
import useToast from 'hooks/useToast'
import useApprove from '../hooks/useApprove'
import useTokenSymbol from '../hooks/useTokenSymbol'

import idoCollection from '../../../config/constants/idoList'
import Social from './Social'

import oceanProtocolActive1 from '../../../assets/images/ocean-protocol-active1.svg'

function InprogressCard({ ido, pools, account, setIsLoading }) {
  const [idoInfo, setIdoInfo] = useState(null)
  const [isBuyer, setIsBuyer] = useState(false)
  const [isInWhitelist, setIsInWhitelist] = useState(false)
  const [idoName, setIdoName] = useState('')
  const { toastSuccess } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const erc20Contract = useTokenContract(ido.idoToken2Buy)
  const { symbol: idoTokenBuySymbol, isLoading: idoTokenBuyLoading } = useTokenSymbol(ido.idoToken2Buy)
  const { symbol: idoTokenSymbol, isLoading: idoTokenLoading } = useTokenSymbol(ido.idoToken)

  const { login, logout } = useAuth()
  const { t } = useTranslation()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)

  const [percent, setPercent] = useState(0)
  const idoContract = useIdoContract()
  const idoAddress = getIdoAddress()

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
      return callWithGasPrice(erc20Contract, 'approve', [idoAddress, ethers.constants.MaxUint256])
    },
    onApproveSuccess: async () => {
      setIsLoading(false)
      toastSuccess(t('Contract approved - you can now join pool!'))
    },
    onConfirm: () => {
      setIsLoading(true)
      return callWithGasPrice(idoContract, 'buy', [ido.id])
    },
    onSuccess: async () => {
      setIsLoading(false)
      setIsBuyer(true)
      toastSuccess(`${t('Registed')}!`, t('You have successfully join pool'))
    },
    onError: async () => {
      setIsLoading(false)
    },
  })

  useEffect(() => {
    const pool = pools.filter((r) => {
      return r.hash === ido.keyType
    })
    setIdoName(pool[0].name)
  }, [pools, ido])

  useEffect(() => {
    setIdoInfo(idoCollection[ido.idoToken])
    const totalAmount = Number(formatEther(ido.totalAmount))
    const remainAmount = Number(formatEther(ido.remainAmount))
    const result = ((totalAmount - remainAmount) * 100) / totalAmount
    setPercent(result)
  }, [ido])

  useEffect(() => {
    if (account) {
      const checkAccountInWhiteList = async () => {
        const response = await idoContract.isWhitelist(account, ido.id)
        setIsInWhitelist(response)
      }
      checkAccountInWhiteList()
      const checkAccountJoined = async () => {
        const response = await idoContract.isBuyer(account, ido.id)
        setIsBuyer(response)
      }
      checkAccountJoined()
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
            <img src={idoInfo?.logo.large} className="w-full md:w-auto" alt="" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-start gap-x-3">
              <img src={idoInfo?.logo.small} alt="" />
              <div className="flex-1">
                <p className="text-[#F5F5F5] leading-5 flex justify-between items-center">
                  {idoInfo?.name}{' '}
                  {idoTokenBuyLoading ? (
                    <Skeleton width="150px" height="16px" />
                  ) : (
                    <span className="text-[#F5F5F5] leading-5 font-semibold text-xs md:text-base">
                      ({idoTokenSymbol}/{idoTokenBuySymbol})
                    </span>
                  )}
                </p>
                <p className="text-[#F5F5F5] text-xl font-bold leading-6 mt-1 flex justify-between items-center">
                  {idoTokenLoading ? <Skeleton width="50px" height="16px" /> : <span>{idoTokenSymbol}</span>}
                  {idoTokenBuyLoading ? (
                    <Skeleton width="150px" height="16px" />
                  ) : (
                    <span className="text-shadow font-semibold leading-5 text-[#2CE7FF] text-xs md:text-base">
                      {idoTokenSymbol} ={' '}
                      {Number(formatEther(ido.tokenBuy2IDOtoken)).toLocaleString('en', {
                        maximumFractionDigits: 4,
                      })}{' '}
                      {idoTokenBuySymbol}
                    </span>
                  )}
                </p>
              </div>
            </div>
            <Social idoInfo={idoInfo} />
            <NavLink
              to={`/launchpad/${ido.id}`}
              className="text-skyblue underline text-sm font-medium mt-4 inline-block"
            >
              More detail
            </NavLink>
            <div className="mt-4 flex flex-col md:flex-row md:gap-x-8">
              <div className="flex-1">
                <div className="flex flex-col gap-y-1 md:gap-y-0 md:flex-row justify-between items-center">
                  <span className="text-[#BFBFBF]">Total capital raise</span>
                  {idoTokenBuyLoading ? (
                    <Skeleton width="200px" height="16px" />
                  ) : (
                    <span className="text-[#F5F5F5] font-semibold">
                      {(
                        Number(formatEther(ido.totalAmount)) * Number(formatEther(ido.tokenBuy2IDOtoken))
                      ).toLocaleString('en', {
                        maximumFractionDigits: 0,
                      })}{' '}
                      {idoTokenBuySymbol}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-y-1 md:gap-y-0 md:flex-row justify-between items-center mt-5 md:mt-2">
                  <span className="text-[#BFBFBF]">Swap process</span>
                  <div className="flex flex-1 w-full items-center justify-end gap-x-2">
                    <div className="flex-1 md:max-w-[142px] bg-[#F5F5F5] h-2 rounded-[100px]">
                      <div className="bg-[#1890FF] h-2 rounded-[100px]" style={{ width: `${percent}%` }} />
                    </div>
                    <span className="text-white font-semibold">{percent}%</span>
                  </div>
                </div>
                <div className="flex flex-col gap-y-1 md:gap-y-0 md:flex-row justify-between items-center mt-5 md:mt-2">
                  <span className="text-[#BFBFBF]">Pool closes</span>
                  <span className="text-[#F5F5F5] font-semibold ml-8">{format(ido.endTime * 1000, 'Pp')} (UTC)</span>
                </div>
              </div>

              {!account && (
                <button
                  type="button"
                  className="bg-skyblue mt-5 md:mt-auto rounded-[20px] border-none text-black font-semibold h-[44px] px-8 shadow-blue"
                  onClick={onPresentConnectModal}
                >
                  Connect wallet
                </button>
              )}
              {account && isApproved && !isBuyer && isInWhitelist && (
                <button
                  type="button"
                  className="bg-skyblue mt-5 md:mt-auto rounded-[20px] border-none text-black font-semibold h-[44px] px-10 shadow-blue"
                  onClick={handleConfirm}
                >
                  Join pool
                </button>
              )}

              {account && !isApproved && !isBuyer && isInWhitelist && (
                <button
                  type="button"
                  className="bg-skyblue mt-5 md:mt-auto rounded-[20px] border-none text-black font-semibold h-[44px] px-10 shadow-blue"
                  onClick={handleApprove}
                >
                  Approve
                </button>
              )}

              {account && isBuyer && isInWhitelist && (
                <button
                  type="button"
                  className="bg-[#9E9E9E] mt-5 md:mt-auto rounded-[20px] border-none text-black font-semibold h-[44px] px-[50px]"
                >
                  Joined
                </button>
              )}
              {account && !isInWhitelist && (
                <p className="text-skyblue text-shadow font-semibold mt-5 md:mt-auto">You aren’t in whitelist</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InprogressCard
