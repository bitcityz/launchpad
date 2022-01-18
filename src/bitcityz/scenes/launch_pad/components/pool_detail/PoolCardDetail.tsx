import React, { useEffect, useState } from 'react'
import '../../../../assets/index.css'
import BigNumber from 'bignumber.js'
import { formatEther } from 'ethers/lib/utils'
import { ethers } from 'ethers'

import { getIdoAddress } from 'utils/addressHelpers'
import { useWalletModal } from '@mexi/uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import { useTicketContract, useIdoContract, useTokenContract } from 'hooks/useContract'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import RegisterModal from 'bitcityz/components/modal/WhiteList/RegisterModal'
import useToast from 'hooks/useToast'
import useApprove from '../../hooks/useApprove'
import useTokenSymbol from '../../hooks/useTokenSymbol'
import useAccountClaimPercent from '../../../../hooks/useAccountClaimPercent'

import Social from '../Social'

import oceanProtocolActive1 from '../../../../assets/images/ocean-protocol-active1.svg'
import inWhitelistSvg from '../../../../assets/images/iswhitelist.svg'

function PoolCardDetail({ idoPool, pools, idoInfo, setIsLoading, account }) {
  const { login, logout } = useAuth()
  const [idoName, setIdoName] = useState('')
  const [updateWhitelist, setUpdateWhitelist] = useState(false)
  const [isInWhitelist, setIsInWhitelist] = useState(false)
  const [isBuyer, setIsBuyer] = useState(false)
  const { t } = useTranslation()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)
  const idoContract = useIdoContract()
  const { toastSuccess } = useToast()

  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [ticket, setTicket] = useState(0)
  const [ticketId, setTicketId] = useState(0)
  const [percent, setPercent] = useState(0)
  const ticketContract = useTicketContract()
  const { callWithGasPrice } = useCallWithGasPrice()
  const erc20Contract = useTokenContract(idoPool.idoToken2Buy)
  const idoAddress = getIdoAddress()

  const { symbol: idoTokenBuySymbol, isLoading: idoTokenBuyLoading } = useTokenSymbol(idoPool.idoToken2Buy)
  const { symbol: idoTokenSymbol, isLoading: idoTokenLoading } = useTokenSymbol(idoPool.idoToken)
  const { claimPercent, isLoading: claimPercentLoading, setIsUpdate } = useAccountClaimPercent(account)

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
      return callWithGasPrice(idoContract, 'buy', [idoPool.id])
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

  const _handleShowRegisterModal = () => {
    setShowRegisterModal(true)
  }

  const _handleCloseConfirm = () => {
    setShowRegisterModal(false)
  }

  useEffect(() => {
    const totalAmount = Number(formatEther(idoPool.totalAmount))
    const remainAmount = Number(formatEther(idoPool.remainAmount))
    const result = ((totalAmount - remainAmount) * 100) / totalAmount
    setPercent(result)
  }, [idoPool])

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
      const checkAccountJoined = async () => {
        const response = await idoContract.isBuyer(account, idoPool.id)
        setIsBuyer(response)
      }
      checkAccountJoined()
    }
  }, [account, idoPool, idoContract, updateWhitelist])

  return (
    <div className="relative">
      <h6 className="text-xl text-shadow font-bold text-[#2CE7FF] flex items-center">
        {idoName} pool <img src={oceanProtocolActive1} className="ml-2" alt="" />
      </h6>
      <div className="mt-5 flex flex-col gap-y-5 md:gap-y-0 md:flex-row md:gap-x-[30px]">
        <img src={idoInfo?.logo.large} alt="" />
        <div className="flex-1">
          <div className="flex items-start gap-x-3">
            <img src={idoInfo?.logo.small} alt="" />
            <div className="flex-1">
              <p className="text-[#F5F5F5] leading-5 flex justify-between items-center">
                {idoInfo?.name}{' '}
                <span className="text-[#F5F5F5] leading-5 font-semibold text-xs md:text-base">
                  ({idoTokenSymbol}/{idoTokenBuySymbol})
                </span>
              </p>
              <p className="text-[#F5F5F5] text-xl font-bold leading-6 mt-1">{idoTokenSymbol}</p>
              <p className="text-sm text-[#BFBFBF]">{idoInfo?.shortDescription}</p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5 md:gap-y-0 items-center md:flex-row md:flex-wrap md:justify-between mt-4">
            <Social idoInfo={idoInfo} />
            <div className="w-full md:w-auto order-3 md:-order-none">
              {Number(idoPool.status._hex) === 0 && (
                <p className="text-shadow font-semibold text-skyblue mt-auto">Upcoming project</p>
              )}

              {!account && Number(idoPool.status._hex) !== 0 && (
                <button
                  type="button"
                  className="bg-skyblue mt-auto rounded-[20px] border-none text-black font-semibold h-[44px] w-full md:px-8 shadow-blue"
                  onClick={onPresentConnectModal}
                >
                  Connect wallet
                </button>
              )}
              {account && isInWhitelist && Number(idoPool.status._hex) === 1 && (
                <img src={inWhitelistSvg} className="mt-auto" alt="Account in whitelist" />
              )}
              {account && !isInWhitelist && Number(idoPool.status._hex) === 1 && (
                <button
                  type="button"
                  className="bg-skyblue mt-auto rounded-[20px] border-none text-black font-semibold h-[44px] w-full md:px-8 shadow-blue"
                  onClick={_handleShowRegisterModal}
                >
                  Register Whitelist
                </button>
              )}
              {account && isApproved && isInWhitelist && !isBuyer && Number(idoPool.status._hex) === 2 && (
                <button
                  type="button"
                  className="bg-skyblue mt-auto rounded-[20px] border-none text-black font-semibold h-[44px] w-full md:px-14 shadow-blue"
                  onClick={handleConfirm}
                >
                  Join pool
                </button>
              )}
              {account && !isApproved && isInWhitelist && !isBuyer && Number(idoPool.status._hex) === 2 && (
                <button
                  type="button"
                  className="bg-skyblue mt-auto rounded-[20px] border-none text-black font-semibold h-[44px] w-full md:px-14 shadow-blue"
                  onClick={handleApprove}
                >
                  Approve
                </button>
              )}
              {account && isBuyer && isInWhitelist && Number(idoPool.status._hex) === 2 && (
                <button
                  type="button"
                  className="bg-[#9E9E9E] mt-auto rounded-[20px] border-none text-black pointer-events-none font-semibold h-[44px] w-full md:px-14"
                >
                  Joined
                </button>
              )}
              {account && !isInWhitelist && Number(idoPool.status._hex) === 2 && (
                <p className="text-skyblue text-shadow font-semibold text-center md:text-right md:mt-auto">
                  You aren’t in whitelist
                </p>
              )}
            </div>
            {Number(idoPool.status._hex) === 2 && (
              <div className="flex w-full flex-col gap-y-1 items-center md:items-start md:mt-6">
                <span className="text-[#BFBFBF]">Swap process</span>
                <div className="flex w-full items-center justify-end gap-x-2">
                  <div className="flex-1 w-full bg-[#F5F5F5] h-2 rounded-[100px]">
                    <div className="bg-[#1890FF] h-2 rounded-[100px]" style={{ width: `${percent}%` }} />
                  </div>
                  <span className="text-white font-semibold">{percent}%</span>
                </div>
              </div>
            )}
            {Number(idoPool.status._hex) === 3 && account && isBuyer && (
              <div className="flex w-full flex-col gap-y-1 items-center md:items-start md:mt-6">
                <span className="text-[#BFBFBF]">Claim process</span>
                <div className="flex w-full items-center justify-end gap-x-2">
                  <div className="flex-1 w-full bg-[#F5F5F5] h-2 rounded-[100px]">
                    <div className="bg-[#1890FF] h-2 rounded-[100px]" style={{ width: `${claimPercent}%` }} />
                  </div>
                  <span className="text-white font-semibold">{claimPercent}%</span>
                </div>
              </div>
            )}
          </div>
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