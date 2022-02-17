import React, { useEffect } from 'react'

import '../../../assets/index.css'

import { useWalletModal } from '@mexi/uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import { useWeb3React } from '@web3-react/core'

import ticketPng from '../../../assets/images/ticket.png'
import externalink from '../../../assets/images/external-link.svg'
import checkedPng from '../../../assets/images/checked.png'

function ClaimTicket() {
  const { login, logout } = useAuth()
  const { t } = useTranslation()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)
  const { account } = useWeb3React()

  useEffect(() => {
    const initData = async () => {
      //   console.log(1)
    }

    if (account) {
      initData()
    }
  })

  return (
    <div className="relative p-7 max-w-[616px] mx-auto mt-12 rounded-2xl border-[1px] border-solid border-[rgba(123,245,251,0.2)]">
      <div
        className="absolute rounded-2xl top-0 left-0 w-full h-full opacity-30"
        style={{
          background: 'linear-gradient(114.49deg, rgba(255, 255, 255, 0.33) -21.49%, rgba(255, 255, 255, 0) 111.75%)',
        }}
      />
      <div className="flex flex-col gap-x-0 gap-y-6 md:gap-y-0 md:flex-row md:gap-x-8">
        <div className="text-center mx-auto">
          <img src={ticketPng} className="-mt-[40px]" alt="" />
        </div>
        {!account && (
          <div className="z-10 text-left">
            <h6 className="text-[#F5F5F5] text-2xl font-bold leading-7">Citizen Pass-Ticket Airdrop</h6>
            <p className="text-[#F5F5F5] mt-3 leading-5">You can claim Citizen Pass-Ticket here</p>
            <button
              type="button"
              className="w-full md:w-auto bg-skyblue mt-4 rounded-[20px] border-none text-[#212121] font-semibold h-[44px] px-4 shadow-blue"
              onClick={onPresentConnectModal}
            >
              Connect wallet to claim
            </button>
          </div>
        )}
        {account && (
          <div className="z-10 text-left">
            <h6 className="text-[#F5F5F5] text-2xl font-bold leading-7">Goodluck in next time !</h6>
            <p className="text-[#F5F5F5] mt-3 leading-5">So sorry, your wallet was not in ticket distribution list.</p>
            <p className="text-[#F5F5F5] leading-5">If something’s wrong, please contact our supporters</p>
            <button
              type="button"
              className="w-full md:w-auto mt-4 rounded-[20px] text-skyblue font-semibold h-[44px] px-5 border-[1px] border-solid border-skyblue shadow-blue"
            >
              Connect support
            </button>
          </div>
        )}
        {/* {account 
                && <div className="z-10 text-left">
                    <h6 className="text-[#F5F5F5] text-2xl font-bold leading-7">Congratulation !</h6>
                    <p className="text-[#F5F5F5] mt-3 leading-5">You have reveived a pass-ticket for BCTZ IDO event.</p>
                    <div className="mt-4 flex flex-col gap-y-3 gap-x-0 md:flex-row md:gap-y-0 md:gap-x-2">
                        <button
                            type="button"
                            className="w-full md:w-auto rounded-[20px] bg-skyblue text-[#212121] font-semibold h-[44px] px-8 shadow-blue"
                        >
                            Claim ticket                                                                        
                        </button>
                        <a
                            href="https://testnet.bscscan.com/token/0xD01067B661e1d6bAa9b643458B7017c81b2BA491"
                            target="_blank"
                            rel="noreferrer"
                            className="flex bg-[#F5F5F5] h-[44px] gap-x-3 justify-center items-center font-semibold text-[#212121] rounded-[20px] px-5"
                        >
                            <span>Smart contract</span>
                            <img src={externalink} alt="" />
                        </a>
                    </div>
                </div>
            }                                                                                                    */}
        {/* {account && (
          <div className="z-10 text-left">
            <h6 className="text-[#3BAF0A] text-2xl font-bold leading-7">Claimed successfully !</h6>
            <p className="text-[#F5F5F5] mt-3 leading-5">You have claimed a pass ticket for BCTZ IDO event.</p>
            <div className="mt-4 flex flex-col gap-y-3 gap-x-0 md:flex-row md:gap-y-0 md:gap-x-2">
              <span className="mt-5 md:mt-auto rounded-[20px] border-[1px] border-solid border-skyblue text-skyblue font-semibold h-[44px] px-12 flex gap-x-3 items-center justify-center">
                <img src={checkedPng} alt="" />
                Claimed
              </span>
              <a
                href="https://testnet.bscscan.com/token/0xD01067B661e1d6bAa9b643458B7017c81b2BA491"
                target="_blank"
                rel="noreferrer"
                className="flex bg-[#F5F5F5] h-[44px] gap-x-3 justify-center items-center font-semibold text-[#212121] rounded-[20px] px-5"
              >
                <span>Smart contract</span>
                <img src={externalink} alt="" />
              </a>
            </div>
          </div>
        )} */}
      </div>
    </div>
  )
}

export default ClaimTicket
