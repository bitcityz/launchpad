import React, { useEffect, useState } from 'react'
import { isAfter, differenceInSeconds } from 'date-fns'
import BigNumber from 'bignumber.js'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import getTimePeriods from 'utils/getTimePeriods'
import { formatEther } from 'ethers/lib/utils'
import '../../../assets/index.css'
import { Link, NavLink } from 'react-router-dom'
import { useWalletModal } from '@mexi/uikit'

import RegisterModal from 'bitcityz/components/modal/WhiteList/RegisterModal'
import { useTicketContract } from 'hooks/useContract'
import useTokenSymbol from '../hooks/useTokenSymbol'

import oceanProtocolActive1 from '../../../assets/images/ocean-protocol-active1.svg'
import swapLogo from '../../../assets/images/logo-swap.png'
import sLogo from '../../../assets/images/logo-s.png'
import gfxLogo from '../../../assets/images/logo-gfx.png'
import gLogo from '../../../assets/images/logo-g.png'
import kalaoLogo from '../../../assets/images/logo-kalao.png'
import kLogo from '../../../assets/images/logo-k.png'
import ieBlack from '../../../assets/images/ie-black.svg'
import twitterBlack from '../../../assets/images/twitter-black.svg'
import mediumBlack from '../../../assets/images/medium-black.svg'
import telegramBlack from '../../../assets/images/telegram-black.svg'

function RegisterWhitelistCard({ ido, pools, account }) {
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [idoName, setIdoName] = useState('')
  const { login, logout } = useAuth()
  const { t } = useTranslation()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)
  const [ticket, setTicket] = useState(0)
  const [ticketId, setTicketId] = useState(0)
  const ticketContract = useTicketContract()
  const tokenSymbol = useTokenSymbol(ido.idoToken)

  const secondsRemaining = isAfter(ido.endTime * 1000, new Date())
    ? differenceInSeconds(ido.endTime * 1000, new Date())
    : 0

  const { days, hours, minutes, seconds } = getTimePeriods(secondsRemaining)

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
            <span className="text-skyblue text-shadow text-xl font-bold">Register whitelist</span>
          </h6>
          <div className="mt-5 flex gap-x-[30px]">
            <div>
              <img src={kalaoLogo} alt="" />
            </div>
            <div className="flex-1">
              <div className="flex items-start gap-x-3">
                <img src={kLogo} alt="" />
                <div>
                  <p className="text-[#F5F5F5] leading-5">Kalao</p>
                  <p className="text-[#F5F5F5] text-xl font-bold leading-6 mt-1">KLO</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-x-6">
                <img src={ieBlack} alt="" />
                <img src={twitterBlack} alt="" />
                <img src={mediumBlack} alt="" />
                <img src={telegramBlack} alt="" />
              </div>
              <NavLink to={`/launchpad/${ido.id}`} className="text-skyblue underline text-sm font-medium mt-4 inline-block">
                More detail
              </NavLink>
              <div className="mt-4">
                <p className="flex justify-between items-center">
                  <span className="text-[#BFBFBF]">Total capital raise</span>
                  <span className="text-[#F5F5F5] font-semibold">
                    {Number(formatEther(ido.totalAmount)).toLocaleString('en', {
                      maximumFractionDigits: 0,
                    })}{' '}
                    BUSD
                  </span>
                </p>
                <p className="flex justify-between items-center mt-2">
                  <span className="text-[#BFBFBF]">Register Whitelist</span>
                  <span className="text-[#F5F5F5] font-semibold">
                    {days}d : {hours}h : {minutes}m : {seconds}s
                  </span>
                </p>
              </div>
            </div>
            <div className="ml-auto flex flex-col items-end">
              <p className="text-[#F5F5F5] leading-5 font-semibold">({tokenSymbol}/BUSD)</p>
              <p className="text-shadow font-semibold leading-5 mt-2 text-[#2CE7FF]">{tokenSymbol} = 0.03 BUSD</p>
              {!account && (
                <button
                  type="button"
                  className="bg-skyblue mt-auto rounded-[20px] border-none text-black font-semibold h-[44px] px-8 shadow-blue"
                  onClick={onPresentConnectModal}
                >
                  Connect wallet
                </button>
              )}
              {account && (
                <button
                  type="button"
                  className="bg-skyblue mt-auto rounded-[20px] border-none text-black font-semibold h-[44px] px-8 shadow-blue"
                  onClick={_handleShowRegisterModal}
                >
                  Register Whitelist
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {showRegisterModal && <RegisterModal onClose={_handleCloseConfirm} ido={ido} idoName={idoName} ticket={ticket} ticketId={ticketId} />}
    </>
  )
}

export default RegisterWhitelistCard
