import React, { useEffect, useState } from 'react'
import '../../../../assets/index.css'
import { formatEther } from 'ethers/lib/utils'
import { Skeleton } from '@mexi/uikit'
import { useIdoUnlockContract, useIdoContract } from 'hooks/useContract'

import AllocationCard from './AllocationCard'

function Allocation({ idoPool, account, claimPercent, claimPercentLoading, setIsUpdate }) {
  const idoUnlockContract = useIdoUnlockContract(idoPool.idoUnlock)
  const idoContract = useIdoContract()
  const [isBuyer, setIsBuyer] = useState(false)
  const [claimTimes, setClaimTimes] = useState([])
  const [loading, setLoading] = useState(true)
  const totalToken = Number(formatEther(idoPool.amount)) * Number(formatEther(idoPool.token2IDOtoken))
  const [accountClaimIndex, setAccountClaimIndex] = useState(null)

  useEffect(() => {
    if (account) {
      const checkAccountJoined = async () => {
        const response = await idoContract.isBuyer(account, idoPool.id)
        setIsBuyer(response)
      }
      checkAccountJoined()
    }
  }, [account, idoPool, idoContract])

  useEffect(() => {
    const initData = async () => {
      try {
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
      } catch (error) {
        setLoading(false)
        setClaimTimes([])
      }
    }
    initData()
  }, [idoUnlockContract, account])
  return (
    <div className="mt-5 relative">
      <div>
        <div className="flex flex-col gap-y-1 md:gap-y-0 md:items-center md:justify-between md:flex-row">
          <p className="text-white font-semibold flex gap-x-2">
            Your tokens:
            <span className="text-skyblue text-shadow">
              {Number(formatEther(idoPool.amount)).toLocaleString('en', {
                maximumFractionDigits: 4,
              })}{' '}
              {idoPool.baseInfo.symbol}
            </span>
          </p>
          <p className="text-white font-semibold flex gap-x-2">
            Funds needed:
            <span className="text-skyblue text-shadow">
              {totalToken.toLocaleString('en', {
                maximumFractionDigits: 0,
              })}{' '}
              {idoPool.baseInfo.currencyPair}
            </span>
          </p>
          <div className="text-white font-semibold flex gap-x-2">
            Claimed:
            {!claimPercentLoading ? (
              <span className="text-skyblue text-shadow">
                {((claimPercent * totalToken) / 100).toLocaleString('en', {
                  maximumFractionDigits: 4,
                })}
                /
                {Number(formatEther(idoPool.amount)).toLocaleString('en', {
                  maximumFractionDigits: 4,
                })}{' '}
                {idoPool.baseInfo.symbol}
              </span>
            ) : (
              <Skeleton width="100px" height="16px" />
            )}
          </div>
        </div>
        {isBuyer && (
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
                isBuyer &&
                claimTimes.length > 0 &&
                Number(idoPool.status._hex) === 3 &&
                claimTimes.map((claim) => {
                  return (
                    <AllocationCard
                      key={claim}
                      claim={claim}
                      totalToken={totalToken}
                      accountClaimIndex={accountClaimIndex}
                      setIsUpdate={setIsUpdate}
                      idoUnlock={idoPool.idoUnlock}
                    />
                  )
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Allocation
