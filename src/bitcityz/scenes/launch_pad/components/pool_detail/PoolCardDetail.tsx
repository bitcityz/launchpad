import React, { useEffect, useState } from 'react'
import '../../../../assets/index.css'
import BigNumber from 'bignumber.js'

import { useWalletModal } from '@mexi/uikit'
import { isAfter } from 'date-fns'
import { useWeb3React } from '@web3-react/core'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import { useTicketContract } from 'hooks/useContract'
import RegisterModal from 'bitcityz/components/modal/WhiteList/RegisterModal'
import useTokenSymbol from '../../hooks/useTokenSymbol'

import oceanProtocolActive1 from '../../../../assets/images/ocean-protocol-active1.svg'
import swapLogo from '../../../../assets/images/logo-swap.png'
import sLogo from '../../../../assets/images/logo-s.png'
import gfxLogo from '../../../../assets/images/logo-gfx.png'
import gLogo from '../../../../assets/images/logo-g.png'
import kalaoLogo from '../../../../assets/images/logo-kalao.png'
import kLogo from '../../../../assets/images/logo-k.png'
import ieBlack from '../../../../assets/images/ie-black.svg'
import twitterBlack from '../../../../assets/images/twitter-black.svg'
import mediumBlack from '../../../../assets/images/medium-black.svg'
import telegramBlack from '../../../../assets/images/telegram-black.svg'

function PoolCardDetail({ idoPool, pools }) {
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const [idoName, setIdoName] = useState('')
  const { t } = useTranslation()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)

  const tokenSymbol = useTokenSymbol(idoPool.idoToken)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
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
    setIdoName(pool[0].name)

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

  return (
    <div className="relative">
      <h6 className="text-xl text-shadow font-bold text-[#2CE7FF] flex items-center">
        {idoName} pool <img src={oceanProtocolActive1} className="ml-2" alt="" />
      </h6>
      <div className="mt-5 flex gap-x-[30px]">
        <img src={kalaoLogo} alt="" />
        <div>
          <div className="flex items-start gap-x-3">
            <img src={kLogo} alt="" />
            <div>
              <p className="text-[#F5F5F5] leading-5">Kalao</p>
              <p className="text-[#F5F5F5] text-xl font-bold leading-6 mt-1">KLO</p>
              <p className="text-sm text-[#BFBFBF]">The 1st cross-chain liquidity DEX on Avalanche</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-x-6">
            <img src={ieBlack} alt="" />
            <img src={twitterBlack} alt="" />
            <img src={mediumBlack} alt="" />
            <img src={telegramBlack} alt="" />
          </div>
        </div>
        <div className="ml-auto flex flex-col items-end">
          <p className="text-[#F5F5F5] leading-5 font-semibold">({tokenSymbol}/BUSD)</p>
          {isAfter(idoPool.startTime * 1000, new Date()) && (
            <p className="text-shadow font-semibold text-skyblue mt-auto">Upcoming project</p>
          )}

          {!account && !isAfter(idoPool.startTime * 1000, new Date()) && isAfter(idoPool.endTime * 1000, new Date()) && (
            <button
              type="button"
              className="bg-skyblue mt-auto rounded-[20px] border-none text-black font-semibold h-[44px] px-8 shadow-blue"
              onClick={onPresentConnectModal}
            >
              Connect wallet
            </button>
          )}
          {account && !isAfter(idoPool.startTime * 1000, new Date()) && isAfter(idoPool.endTime * 1000, new Date()) && (
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
      {showRegisterModal && (
        <RegisterModal
          onClose={_handleCloseConfirm}
          ido={idoPool}
          idoName={idoName}
          ticket={ticket}
          ticketId={ticketId}
        />
      )}
    </div>
  )
}

export default PoolCardDetail
