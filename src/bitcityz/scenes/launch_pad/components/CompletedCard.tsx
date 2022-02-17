import React, { useEffect, useState } from 'react'

import '../../../assets/index.css'
import { useTooltip } from '@mexi/uikit'
import { NavLink } from 'react-router-dom'
import { useIdoContract } from 'hooks/useContract'
import truncateHash from 'utils/truncateHash'
import useAccountClaimPercent from '../../../hooks/useAccountClaimPercent'

import Social from './Social'

import oceanProtocolActive1 from '../../../assets/images/ocean-protocol-active1.svg'
import copyPng from '../../../assets/images/copy.png'

function CompletedCard({ ido, pools, account }) {
  const [isBuyer, setIsBuyer] = useState(false)
  const [idoName, setIdoName] = useState('')
  const [isCopied, setIsCopied] = useState(false)
  const { claimPercent } = useAccountClaimPercent(account, ido.idoUnlock)
  const idoContract = useIdoContract()
  const { targetRef, tooltip } = useTooltip('Copied', { placement: 'top' })

  useEffect(() => {
    const pool = pools.filter((r) => {
      return r.hash === ido.keyType
    })
    setIdoName(pool[0].name)
  }, [pools, ido])

  useEffect(() => {
    if (account) {
      const checkAccountJoined = async () => {
        const response = await idoContract.isBuyer(account, ido.id)
        setIsBuyer(response)
      }
      checkAccountJoined()
    }
  }, [account, ido, idoContract])

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
            <img src={ido.baseInfo.logo.large} className="w-full md:w-auto" alt="" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-start gap-x-3">
              <img src={ido.baseInfo.logo.small} alt="" />
              <div className="flex-1">
                <p className="text-[#F5F5F5] font-medium leading-5 flex justify-between items-center">
                  {ido.baseInfo.name}{' '}
                  <span className="text-[#F5F5F5] font-normal md:text-sm">
                    ({ido.baseInfo.symbol}/{ido.baseInfo.currencyPair})
                  </span>
                </p>
                <p className="text-[#F5F5F5] text-xl font-bold leading-6 mt-1 flex flex-col items-start gap-y-3 md:gap-y-0 md:flex-row md:justify-between md:items-center">
                  <span>{ido.baseInfo.symbol}</span>
                  <span className="text-shadow font-semibold md:font-bold leading-5 text-skyblue text-2xl -translate-x-[60px] md:-translate-x-0">
                    {ido.baseInfo.symbol} ={' '}
                    {/* {Number(formatEther(ido.tokenBuy2IDOtoken)).toLocaleString('en', {
                        maximumFractionDigits: 4,
                      })}{' '} */}
                    {ido.baseInfo.price} {ido.baseInfo.currencyPair}
                  </span>
                </p>
              </div>
            </div>
            <Social idoInfo={ido.baseInfo} />
            {/* <NavLink
              to={`/launchpad/${ido.id}`}
              className="text-skyblue underline text-sm font-medium mt-4 inline-block"
            >
              More detail
            </NavLink> */}
            <div className="mt-4 flex flex-col md:flex-row md:gap-x-8">
              <div className="flex-1">
                {account && isBuyer && (
                  <div className="flex flex-col gap-y-1 items-start md:gap-y-0 md:flex-row md:items-center">
                    <span className="text-[#BFBFBF] w-[142px] text-left">Claim process</span>
                    <div className="flex flex-1 w-full items-center justify-start gap-x-2">
                      <div className="flex-1 md:max-w-[275px] bg-[#F5F5F5] h-2 rounded-[100px]">
                        <div className="bg-[#1890FF] h-2 rounded-[100px]" style={{ width: `${claimPercent}%` }} />
                      </div>
                      <span className="text-white font-semibold">{claimPercent}%</span>
                    </div>
                  </div>
                )}
                <div className="flex flex-col mt-3 gap-y-1 items-start md:gap-y-0 md:flex-row md:items-center">
                  <span className="text-[#BFBFBF] w-[142px] text-left">Contract address </span>
                  <span className="text-skyblue font-semibold flex gap-x-3">
                    {truncateHash(ido.idoToken, 15, 12)}
                    <button
                      className="border-none bg-transparent"
                      type="button"
                      onClick={() => handleCopyClick(ido.idoToken)}
                      ref={targetRef}
                    >
                      <img src={copyPng} className="cursor-pointer" alt="" />
                    </button>
                    {isCopied && tooltip}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-4 mt-5 md:flex-row md:gap-y-0 md:gap-x-4">
              {account && !isBuyer && (
                <p className="text-[#FF4D4F] font-semibold border-[1px] border-solid border-[#FF4D4F] rounded-[20px] flex items-center justify-center h-[44px] px-4">
                  You did not join the pool
                </p>
              )}
              <NavLink
                to={`/launchpad/${window.btoa(ido.id)}`}
                className="text-skyblue border-skyblue border-[1px] border-solid rounded-[20px] h-[44px] flex items-center px-12 font-semibold justify-center"
              >
                Project Details
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompletedCard
