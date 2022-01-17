import React, { useEffect, useState } from 'react'

import '../../../assets/index.css'
import { NavLink } from 'react-router-dom'
import { formatEther } from 'ethers/lib/utils'
import { useIdoContract } from 'hooks/useContract'
import { Skeleton } from '@mexi/uikit'
import useTokenSymbol from '../hooks/useTokenSymbol'
import useAccountClaimPercent from '../../../hooks/useAccountClaimPercent'

import idoCollection from '../../../config/constants/idoList'
import Social from './Social'

import oceanProtocolActive1 from '../../../assets/images/ocean-protocol-active1.svg'

function CompletedCard({ ido, pools, account }) {
  const [idoInfo, setIdoInfo] = useState(null)
  const [isBuyer, setIsBuyer] = useState(false)
  const [idoName, setIdoName] = useState('')
  const { symbol: idoTokenBuySymbol, isLoading: idoTokenBuyLoading } = useTokenSymbol(ido.idoToken2Buy)
  const { symbol: idoTokenSymbol, isLoading: idoTokenLoading } = useTokenSymbol(ido.idoToken)
  const { claimPercent, isLoading: claimPercentLoading, setIsUpdate } = useAccountClaimPercent(account)

  const idoContract = useIdoContract()

  useEffect(() => {
    const pool = pools.filter((r) => {
      return r.hash === ido.keyType
    })
    setIdoName(pool[0].name)
  }, [pools, ido])

  useEffect(() => {
    setIdoInfo(idoCollection[ido.idoToken])
  }, [ido])

  useEffect(() => {
    if (account) {
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
          {idoName} pool <img src={oceanProtocolActive1} className="ml-2" alt="" />
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
                <div className="flex flex-col gap-y-1 md:gap-y-0 md:flex-row justify-between items-center">
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
                </div>
                <div className="flex flex-col gap-y-1 md:gap-y-0 md:flex-row justify-between items-center mt-5 md:mt-2">
                  <span className="text-[#BFBFBF]">Claim process</span>
                  <div className="flex flex-1 w-full items-center justify-end gap-x-2">
                    <div className="flex-1 md:max-w-[142px] bg-[#F5F5F5] h-2 rounded-[100px]">
                      <div className="bg-[#1890FF] h-2 rounded-[100px]" style={{ width: `${claimPercent}%` }} />
                    </div>
                    <span className="text-white font-semibold">{claimPercent}%</span>
                  </div>
                </div>
              </div>
              <div className="mt-5 md:mt-auto md:min-w-[120px]">
                {account && !isBuyer && (
                  <p className="text-skyblue text-shadow font-semibold">You did not join the pool</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompletedCard
