import React, { useEffect, useState } from 'react'
import '../../../../assets/index.css'
import { formatEther } from 'ethers/lib/utils'
import { useTooltip } from '@mexi/uikit'
import { useIdoContract } from 'hooks/useContract'
import truncateHash from 'utils/truncateHash'
import UpcomingCardDetail from './UpcomingCardDetail'
import RegisterWhitelistCardDetail from './RegisterWhitelistCardDetail'
import InprogressCardDetail from './InprogressCardDetail'
import CompletedCardDetail from './CompletedCardDetail'

import icCitizen from '../../../../assets/images/ic-citizen.png'
import icElite from '../../../../assets/images/ic-elite.png'
import icMayor from '../../../../assets/images/ic-mayor.png'
import copyPng from '../../../../assets/images/copy.png'

function PoolCardDetail({
  idoPool,
  pools,
  setIsLoading,
  account,
  claimPercent,
  setIsRefresh,
  setUpdateWhitelist,
  updateWhitelist,
  isRefresh,
  setIsBuyer,
  isBuyer,
}) {
  const [idoName, setIdoName] = useState('')
  const [percent, setPercent] = useState(0)
  const idoContract = useIdoContract()
  const { targetRef, tooltip } = useTooltip('Copied', { placement: 'top' })
  const [isCopied, setIsCopied] = useState(false)
  const [isInWhitelist, setIsInWhitelist] = useState(false)
  const totalToken = Number(formatEther(idoPool.amount)) * Number(formatEther(idoPool.token2IDOtoken))

  useEffect(() => {
    const pool = pools.filter((r) => {
      return r.hash === idoPool.keyType
    })
    setIdoName(pool[0].name)
  }, [pools, idoPool])

  useEffect(() => {
    const totalAmount = Number(formatEther(idoPool.totalAmount))
    const remainAmount = Number(formatEther(idoPool.remainAmount))
    const result = ((totalAmount - remainAmount) * 100) / totalAmount
    setPercent(result)
  }, [idoPool, isRefresh])

  useEffect(() => {
    if (account) {
      const checkAccountInWhiteList = async () => {
        const response = await idoContract.isWhitelist(account, idoPool.id)
        setIsInWhitelist(response)
      }
      checkAccountInWhiteList()
    }
  }, [account, idoPool, idoContract])

  // This is the function we wrote earlier
  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      const resp = await navigator.clipboard.writeText(text)
      return resp
    }
    return document.execCommand('copy', true, text)
  }

  const handleCopyClick = (copyText) => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true)
        setTimeout(() => {
          setIsCopied(false)
        }, 1500)
      })
      .catch(() => {
        setIsCopied(false)
      })
  }

  return (
    <div className="relative">
      <h6 className="text-xl font-bold text-[#2CE7FF] flex items-center">
        <img src={idoName === 'Mayor' ? icMayor : idoName === 'Elite' ? icElite : icCitizen} className="mr-2" alt="" />{' '}
        {idoName} pool
      </h6>
      <div
        className={`mt-5 flex flex-col gap-y-5 md:gap-y-0 md:flex-row md:gap-x-[30px] ${
          Number(idoPool.status._hex) === 2 || (Number(idoPool.status._hex) === 3 && account)
            ? 'md:pb-5 md:border-b-[1px] md:border-solid md:border-[#434343]'
            : ''
        }`}
      >
        <img src={idoPool.baseInfo.logo.large} alt="" />
        {Number(idoPool.status._hex) === 0 && <UpcomingCardDetail idoPool={idoPool} />}
        {Number(idoPool.status._hex) === 1 && (
          <RegisterWhitelistCardDetail
            idoPool={idoPool}
            account={account}
            updateWhitelist={updateWhitelist}
            setUpdateWhitelist={setUpdateWhitelist}
            pools={pools}
            idoName={idoName}
          />
        )}
        {Number(idoPool.status._hex) === 2 && (
          <InprogressCardDetail
            idoPool={idoPool}
            account={account}
            setIsLoading={setIsLoading}
            setIsRefresh={setIsRefresh}
          />
        )}
        {Number(idoPool.status._hex) === 3 && (
          <CompletedCardDetail
            idoPool={idoPool}
            account={account}
            claimPercent={claimPercent}
            isBuyer={isBuyer}
            setIsBuyer={setIsBuyer}
          />
        )}
      </div>
      {account && isInWhitelist && Number(idoPool.status._hex) === 2 && (
        <div className="flex gap-x-3 justify-start items-center mt-3">
          <span className="text-[#BFBFBF] w-[120px] text-left">Available to buy</span>
          <span className="text-[#F5F5F5] font-semibold">
            {Number(formatEther(idoPool.amount)).toLocaleString('en', {
              maximumFractionDigits: 4,
            })}{' '}
            {idoPool.baseInfo.symbol} <small className="text-[#BFBFBF] font-normal">cost</small>{' '}
            {totalToken.toLocaleString('en', {
              maximumFractionDigits: 4,
            })}{' '}
            {idoPool.baseInfo.currencyPair}
          </span>
        </div>
      )}
      {Number(idoPool.status._hex) === 2 && (
        <div className="flex w-full flex-col gap-y-1 items-start md:items-start md:mt-3">
          <span className="text-[#BFBFBF]">Swap process</span>
          <div className="flex w-full items-center justify-end gap-x-2">
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
      )}

      <div className="flex w-full pt-5 flex-col gap-y-1 items-start md:items-start">
        {Number(idoPool.status._hex) === 3 && account && isBuyer && (
          <div className="w-full">
            <span className="text-[#BFBFBF]">Claim process</span>
            <div className="flex w-full items-center justify-end gap-x-2 mt-3">
              <div className="flex-1 w-full bg-[#F5F5F5] h-2 rounded-[100px]">
                <div className="bg-[#1890FF] h-2 rounded-[100px]" style={{ width: `${claimPercent}%` }} />
              </div>
              <span className="text-white font-semibold">
                {claimPercent.toLocaleString('en', {
                  maximumFractionDigits: 4,
                })}{' '}
                %
              </span>
            </div>
          </div>
        )}
        {Number(idoPool.status._hex) === 3 && (
          <div className={`flex flex-col gap-y-1 md:gap-y-0 md:flex-row ${isBuyer ? 'mt-4' : ''} md:gap-x-3`}>
            <span className="text-[#F5F5F5]">Contract address</span>
            <span className="text-skyblue font-semibold flex gap-x-3">
              <span className="md:hidden">{truncateHash(idoPool.idoToken, 13, 13)}</span>
              <span className="hidden md:inline-block">{idoPool.idoToken}</span>
              <button
                className="border-none bg-transparent"
                type="button"
                onClick={() => handleCopyClick(idoPool.idoToken)}
                ref={targetRef}
              >
                <img src={copyPng} className="cursor-pointer" alt="" />
              </button>
              {isCopied && tooltip}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default PoolCardDetail
