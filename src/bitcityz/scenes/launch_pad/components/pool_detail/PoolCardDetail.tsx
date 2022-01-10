import React, { useEffect, useState } from 'react'
import '../../../../assets/index.css'
import BigNumber from 'bignumber.js'

import { useWalletModal } from '@mexi/uikit'
import { isAfter } from 'date-fns'
import { useWeb3React } from '@web3-react/core'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import { useTicketContract, useIdoContract } from 'hooks/useContract'
import RegisterModal from 'bitcityz/components/modal/WhiteList/RegisterModal'

import Social from '../Social'

import oceanProtocolActive1 from '../../../../assets/images/ocean-protocol-active1.svg'
import inWhitelistSvg from '../../../../assets/images/iswhitelist.svg'

function PoolCardDetail({ idoPool, pools, idoInfo }) {
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const [idoName, setIdoName] = useState('')
  const [updateWhitelist, setUpdateWhitelist] = useState(false)
  const [isInWhitelist, setIsInWhitelist] = useState(false)
  const { t } = useTranslation()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)
  const idoContract = useIdoContract()

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

  useEffect(() => {
    if (account) {
      const checkAccountInWhiteList = async () => {
        const response = await idoContract.isWhitelist(account, idoPool.id)
        setIsInWhitelist(response)
        setUpdateWhitelist(false)
      }
      checkAccountInWhiteList()
    }
  }, [account, idoPool, idoContract, updateWhitelist])

  return (
    <div className="relative">
      <h6 className="text-xl text-shadow font-bold text-[#2CE7FF] flex items-center">
        {idoName} pool <img src={oceanProtocolActive1} className="ml-2" alt="" />
      </h6>
      <div className="mt-5 flex flex-col gap-y-5 md:gap-y-0 md:flex-row md:gap-x-[30px]">
        <img src={idoInfo?.logo.large} alt="" />
        <div>
          <div className="flex items-start gap-x-3">
            <img src={idoInfo?.logo.small} alt="" />
            <div>
              <p className="text-[#F5F5F5] leading-5">{idoInfo?.name}</p>
              <p className="text-[#F5F5F5] text-xl font-bold leading-6 mt-1">{idoInfo?.symbol}</p>
              <p className="text-sm text-[#BFBFBF]">{idoInfo?.shortDescription}</p>
            </div>
          </div>
          <Social idoInfo={idoInfo} />
        </div>
        <div className="md:ml-auto flex flex-col items-center md:items-end">
          <p className="text-[#F5F5F5] leading-5 font-semibold">({idoInfo?.symbol}/BUSD)</p>
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
          {account && isInWhitelist && <img src={inWhitelistSvg} className="mt-auto" alt="Account in whitelist" />}
          {account &&
            !isInWhitelist &&
            !isAfter(idoPool.startTime * 1000, new Date()) &&
            isAfter(idoPool.endTime * 1000, new Date()) && (
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
          setUpdateWhitelist={setUpdateWhitelist}
        />
      )}
    </div>
  )
}

export default PoolCardDetail
