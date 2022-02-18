import React, { useEffect, useState } from 'react'
import '../../../../assets/index.css'
import { formatEther } from 'ethers/lib/utils'
import { useTooltip } from '@mexi/uikit'
import { useIdoContract } from 'hooks/useContract'
import UpcomingCardDetail from './UpcomingCardDetail'
import RegisterWhitelistCardDetail from './RegisterWhitelistCardDetail'
import InprogressCardDetail from './InprogressCardDetail'
import CompletedCardDetail from './CompletedCardDetail'

import oceanProtocolActive1 from '../../../../assets/images/ocean-protocol-active1.svg'
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
}) {
  const [idoName, setIdoName] = useState('')
  const [percent, setPercent] = useState(0)
  const idoContract = useIdoContract()
  const [isBuyer, setIsBuyer] = useState(false)
  const { targetRef, tooltip } = useTooltip('Copied', { placement: 'top' })
  const [isCopied, setIsCopied] = useState(false)

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
  }, [idoPool])

  useEffect(() => {
    if (account) {
      const checkAccountJoined = async () => {
        const response = await idoContract.isBuyer(account, idoPool.id)
        setIsBuyer(response)
      }
      checkAccountJoined()
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
      <h6 className="text-xl text-shadow font-bold text-[#2CE7FF] flex items-center">
        {idoName} pool <img src={oceanProtocolActive1} className="ml-2" alt="" />
      </h6>
      <div className="mt-5 flex flex-col gap-y-5 md:gap-y-0 md:flex-row md:gap-x-[30px]">
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
        {/* <div className="flex-1">
          <div className="flex items-start gap-x-3">
            <img src={idoPool.baseInfo.logo.small} alt="" />
            <div className="flex-1">
              <p className="text-[#F5F5F5] leading-5 flex justify-between items-center">
                {idoPool.baseInfo.name}{' '}
                <span className="text-[#F5F5F5] leading-5 font-semibold text-xs md:text-base">
                  ({idoPool.baseInfo.symbol}/{idoPool.baseInfo.currencyPair})
                </span>
              </p>
              <p className="text-[#F5F5F5] text-xl font-bold leading-6 mt-1">{idoPool.baseInfo.symbol}</p>
              <p className="text-sm text-[#BFBFBF]">{idoPool.baseInfo.shortDescription}</p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5 md:gap-y-0 items-center md:flex-row md:flex-wrap md:justify-between mt-4">
            <Social idoInfo={idoPool.baseInfo} />
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
              {account && isBuyer && claimPercent === 0 && Number(idoPool.status._hex) === 3 && !pendingTx && (
                <button
                  type="button"
                  className="bg-skyblue mt-auto rounded-[20px] border-none text-black font-semibold h-[44px] w-full md:px-14 shadow-blue"
                  onClick={handleRefundClick}
                >
                  Refund
                </button>
              )}
              {account && isBuyer && claimPercent === 0 && Number(idoPool.status._hex) === 3 && pendingTx && (
                <button
                  type="button"
                  className="flex items-center justify-center w-full h-[44px] md:w-[167px] font-semibold rounded-[20px] text-black pointer-events-none bg-[#9E9E9E] transition ease-in-out duration-150 cursor-not-allowed"
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
              {account && !isInWhitelist && Number(idoPool.status._hex) === 2 && (
                <p className="text-skyblue text-shadow font-semibold text-center md:text-right md:mt-auto">
                  You aren’t in whitelist
                </p>
              )}
              {Number(idoPool.status._hex) === 3 && account && !isBuyer && (
                <p className="text-skyblue text-shadow font-semibold text-center md:text-right md:mt-4">
                  You did not join the pool
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
        </div> */}
      </div>
      {Number(idoPool.status._hex) === 2 && (
        <div className="flex w-full pt-5 md:border-t-[1px] md:border-solid md:border-[#434343] flex-col gap-y-1 items-start md:items-start md:mt-6">
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
      {Number(idoPool.status._hex) === 3 && account && isBuyer && (
        <div className="flex w-full pt-5 md:border-t-[1px] md:border-solid md:border-[#434343] flex-col gap-y-1 items-start md:items-start md:mt-6">
          <span className="text-[#BFBFBF]">Claim process</span>
          <div className="flex w-full items-center justify-end gap-x-2">
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
          <div className="flex mt-4 gap-x-3">
            <span className="text-[#F5F5F5]">Contract address</span>
            <span className="text-skyblue font-semibold flex gap-x-3">
              {idoPool.idoToken}
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
        </div>
      )}
    </div>
  )
}

export default PoolCardDetail
