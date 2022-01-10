import React, { useEffect, useState } from 'react'

import '../../../assets/index.css'
import { NavLink } from 'react-router-dom'
import { formatEther } from 'ethers/lib/utils'
import { format } from 'date-fns'
import { useIdoContract } from 'hooks/useContract'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import { useWalletModal } from '@mexi/uikit'
import useToast from 'hooks/useToast'
import useStakePool from '../hooks/useJoinpool'

import idoCollection from '../../../config/constants/idoList'
import Social from './Social'

import oceanProtocolActive1 from '../../../assets/images/ocean-protocol-active1.svg'

function InprogressCard({ ido, pools, account, setIsLoading }) {
  const [idoInfo, setIdoInfo] = useState(null)
  const [isBuyer, setIsBuyer] = useState(false)
  const [isInWhitelist, setIsInWhitelist] = useState(false)
  const { onJoinPool } = useStakePool()
  const { toastSuccess, toastError } = useToast()

  const { login, logout } = useAuth()
  const { t } = useTranslation()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)

  const [percent, setPercent] = useState(0)
  const idoContract = useIdoContract()

  const handleJoinPoolClick = async () => {
    setIsLoading(true)
    try {
      // join pool
      await onJoinPool(ido.id)
      toastSuccess(`${t('Joined')}!`, t('Join pool successful!'))

      setIsLoading(false)
    } catch (e) {
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setIsLoading(false)
    }
  }

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
          Mayor pool <img src={oceanProtocolActive1} className="ml-2" alt="" />
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
                  <span className="text-[#F5F5F5] leading-5 font-semibold text-xs md:text-base">
                    ({idoInfo?.symbol}/{idoInfo?.currencyPair})
                  </span>
                </p>
                <p className="text-[#F5F5F5] text-xl font-bold leading-6 mt-1 flex justify-between items-center">
                  {idoInfo?.symbol}{' '}
                  <span className="text-shadow font-semibold leading-5 text-[#2CE7FF] text-xs md:text-base">
                    {idoInfo?.symbol} = {idoInfo?.price} {idoInfo?.currencyPair}
                  </span>
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
                  <span className="text-[#F5F5F5] font-semibold">
                    {(Number(formatEther(ido.totalAmount)) * idoInfo?.price).toLocaleString('en', {
                      maximumFractionDigits: 0,
                    })}{' '}
                    {idoInfo?.currencyPair}
                  </span>
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
              {account && !isBuyer && isInWhitelist && (
                <button
                  type="button"
                  className="bg-skyblue mt-5 md:mt-auto rounded-[20px] border-none text-black font-semibold h-[44px] px-10 shadow-blue"
                  onClick={handleJoinPoolClick}
                >
                  Join pool
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
