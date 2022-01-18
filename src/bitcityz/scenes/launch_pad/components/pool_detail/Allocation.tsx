import React, { useEffect, useState } from 'react'
import '../../../../assets/index.css'
import { formatEther } from 'ethers/lib/utils'
import { Skeleton } from '@mexi/uikit'
import { useIdoUnlockContract } from 'hooks/useContract'
import useTokenSymbol from '../../hooks/useTokenSymbol'
import useAccountClaimPercent from '../../../../hooks/useAccountClaimPercent'

import AllocationCard from './AllocationCard'

function Allocation({ idoPool, account }) {
  const idoUnlockContract = useIdoUnlockContract()
  const [claimTimes, setClaimTimes] = useState([])
  const [loading, setLoading] = useState(true)
  const { symbol: idoTokenBuySymbol, isLoading: idoTokenBuyLoading } = useTokenSymbol(idoPool.idoToken2Buy)
  const { symbol: idoTokenSymbol, isLoading: idoTokenLoading } = useTokenSymbol(idoPool.idoToken)
  const totalToken = Number(formatEther(idoPool.amount)) * Number(formatEther(idoPool.token2IDOtoken))
  const [accountClaimIndex, setAccountClaimIndex] = useState(null)
  const { claimPercent, isLoading: claimPercentLoading, setIsUpdate } = useAccountClaimPercent(account)

  useEffect(() => {
    const initData = async () => {
      const val = await idoUnlockContract.currentClaimTime()
      const temp = []
      for (let i = 0; i <= Number(val._hex); i++) {
        temp.push(i)
      }
      setClaimTimes(temp)
      if (account) {
        const currentClaimIndex = await idoUnlockContract.userIndex(account)
        setAccountClaimIndex(Number(currentClaimIndex._hex))
      }
      setLoading(false)
    }
    initData()
  }, [idoUnlockContract, account])
  return (
    <div className="mt-5 relative">
      <div className="flex flex-col md:items-center md:justify-between md:flex-row">
        <p className="text-white font-semibold flex gap-x-2">
          Total bought tokens:
          {idoTokenLoading ? (
            <Skeleton width="100px" height="16px" />
          ) : (
            <span className="text-skyblue text-shadow">
              {totalToken.toLocaleString('en', {
                maximumFractionDigits: 4,
              })}{' '}
              {idoTokenSymbol}
            </span>
          )}
        </p>
        <p className="text-white font-semibold flex gap-x-2">
          Have bought:
          {idoTokenBuyLoading ? (
            <Skeleton width="100px" height="16px" />
          ) : (
            <span className="text-skyblue text-shadow">
              {Number(formatEther(idoPool.amount)).toLocaleString('en', {
                maximumFractionDigits: 4,
              })}{' '}
              {idoTokenBuySymbol}
            </span>
          )}
        </p>
        <p className="text-white font-semibold flex gap-x-2">
          Claimed:
          {!idoTokenLoading && !claimPercentLoading ? (
            <span className="text-skyblue text-shadow">
              {((claimPercent * totalToken) / 100).toLocaleString('en', {
                maximumFractionDigits: 4,
              })}
              /
              {totalToken.toLocaleString('en', {
                maximumFractionDigits: 4,
              })}{' '}
              {idoTokenSymbol}
            </span>
          ) : (
            <Skeleton width="100px" height="16px" />
          )}
        </p>
      </div>
      <div className="mt-5 px-6 py-4 rounded-2xl overflow-x-auto" style={{ background: 'rgba(44, 231, 255, 0.1)' }}>
        <div className="min-w-[650px]">
          <div className="grid grid-cols-4 gap-x-8">
            <span className="text-[#F5F5F5] font-semibold">Action</span>
            <span className="text-[#F5F5F5] font-semibold">Claimable</span>
            <span className="text-[#F5F5F5] font-semibold">Time EightDee</span>
            <span className="text-[#F5F5F5] font-semibold">Status</span>
          </div>
          {loading ? (
            <div className="flex flex-col mt-2 gap-y-2">
              <Skeleton width="100%" height="32px" />
              <Skeleton width="100%" height="32px" />
              <Skeleton width="100%" height="32px" />
            </div>
          ) : (
            claimTimes.length > 0 &&
            claimTimes.map((claim) => {
              return (
                <AllocationCard
                  key={claim}
                  claim={claim}
                  totalToken={totalToken}
                  accountClaimIndex={accountClaimIndex}
                  setIsUpdate={setIsUpdate}
                />
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default Allocation