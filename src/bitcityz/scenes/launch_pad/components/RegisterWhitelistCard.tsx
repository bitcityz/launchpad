import React, { useEffect, useState } from 'react'
import { isAfter, differenceInSeconds } from 'date-fns'
import BigNumber from 'bignumber.js'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import getTimePeriods from 'utils/getTimePeriods'
import { formatEther } from 'ethers/lib/utils'
import '../../../assets/index.css'
import { NavLink } from 'react-router-dom'
import { useWalletModal, Skeleton } from '@mexi/uikit'

import RegisterModal from 'bitcityz/components/modal/WhiteList/RegisterModal'
import { useTicketContract, useIdoContract } from 'hooks/useContract'
import useTokenSymbol from '../hooks/useTokenSymbol'
import idoCollection from '../../../config/constants/idoList'
import Social from './Social'

import oceanProtocolActive1 from '../../../assets/images/ocean-protocol-active1.svg'

function RegisterWhitelistCard({ ido, pools, account }) {
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [idoName, setIdoName] = useState('')
  const [isInWhitelist, setIsInWhitelist] = useState(false)
  const [idoInfo, setIdoInfo] = useState(null)
  const [updateWhitelist, setUpdateWhitelist] = useState(false)
  const { login, logout } = useAuth()
  const { t } = useTranslation()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)
  const [ticket, setTicket] = useState(0)
  const [ticketId, setTicketId] = useState(0)
  const ticketContract = useTicketContract()
  const idoContract = useIdoContract()
  const { symbol: idoTokenBuySymbol, isLoading: idoTokenBuyLoading } = useTokenSymbol(ido.idoToken2Buy)
  const { symbol: idoTokenSymbol, isLoading: idoTokenLoading } = useTokenSymbol(ido.idoToken)

  const secondsRemaining = isAfter(ido.endTimeWL * 1000, new Date())
    ? differenceInSeconds(ido.endTimeWL * 1000, new Date())
    : 0

  const { days, hours, minutes, seconds } = getTimePeriods(secondsRemaining)

  const _handleCloseConfirm = () => {
    setShowRegisterModal(false)
  }
  const _handleShowRegisterModal = () => {
    setShowRegisterModal(true)
  }

  useEffect(() => {
    setIdoInfo(idoCollection[ido.idoToken])
  }, [ido])

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
    if (account) {
      const checkAccountInWhiteList = async () => {
        const response = await idoContract.isWhitelist(account, ido.id)
        setIsInWhitelist(response)
        setUpdateWhitelist(false)
      }
      checkAccountInWhiteList()
    }
  }, [account, ido, idoContract, updateWhitelist])

  return (
    <>
      <div className="relative px-6 py-5">
        <div
          className="absolute opacity-50 rounded-2xl top-0 left-0 w-full h-full"
          style={{
            background:
              'linear-gradient(114.49deg, rgba(255, 255, 255, 0.165) -21.49%, rgba(255, 255, 255, 0) 111.75%)',
            backdropFilter: 'blur(140px)',
          }}
        />
        <div className="relative z-10">
          <h6 className="flex items-center justify-between">
            <span className="text-xl text-shadow font-bold text-[#2CE7FF] flex items-center">
              {idoName} pool <img src={oceanProtocolActive1} className="ml-2" alt="" />
            </span>
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
                  <p className="flex flex-col gap-y-1 md:gap-y-0 md:flex-row justify-between items-center">
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
                  </p>
                  <p className="flex flex-col gap-y-1 md:gap-y-0 md:flex-row justify-between items-center mt-5 md:mt-2">
                    <span className="text-[#BFBFBF]">Register Whitelist</span>
                    <span className="text-[#F5F5F5] font-semibold">
                      {days}d : {hours}h : {minutes}m : {seconds}s
                    </span>
                  </p>
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
                {account && !isInWhitelist && (
                  <button
                    type="button"
                    className="bg-skyblue mt-5 md:mt-auto rounded-[20px] border-none text-black font-semibold h-[44px] px-8 shadow-blue"
                    onClick={_handleShowRegisterModal}
                  >
                    Register Whitelist
                  </button>
                )}
                {account && isInWhitelist && (
                  <button
                    type="button"
                    className="bg-[#9E9E9E] mt-5 md:mt-auto rounded-[20px] border-none text-black font-semibold h-[44px] px-8 pointer-events-none"
                  >
                    Registed
                  </button>
                )}
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
        />
      )}
    </>
  )
}

export default RegisterWhitelistCard
