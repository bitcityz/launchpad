import React, { useEffect } from 'react'
import useAuth from 'hooks/useAuth'
import { useWeb3React } from '@web3-react/core'

import '../../../assets/index.css'
import closeCirlce from '../../../assets/images/close-circle.svg'
import copySvg from '../../../assets/images/copy.svg'
import linkSqare from '../../../assets/images/link-square.svg'
import logoutSvg from '../../../assets/images/logout.svg'
import whiteWalletSvg from '../../../assets/images/white-wallet.svg'

function WalletModal(props) {
  const { account } = useWeb3React()
  const { logout } = useAuth()
  const { onClose } = props

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div
      className="modal-backdrop fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-[9999]"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.98)' }}
    >
      <div
        className="modal bg-[#212121] rounded-2xl flex flex-col px-3"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          className="modal-header relative px-4 py-6 border-b-[1px] border-[#C4C4C4] border-solid"
          id="modalTitle"
          v-if="header != 'null'"
        >
          <div className="flex items-center">
            <img src={whiteWalletSvg} className="mr-1" alt="" />
            <p className="font-bold text-[#F5F5F5] text-xl">Your Wallet</p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="btn-close absolute right-3 top-1/2 -translate-y-1/2"
            aria-label="Close modal"
          >
            <img src={closeCirlce} alt="" />
          </button>
        </header>

        <section className="modal-body px-4 py-6" id="modalDescription">
          <div className=" md:w-[486px] flex flex-col gap-y-5">
            <div className="py-2 text-center cursor-pointer">
              <span className="flex items-center">
                <input
                  type="text"
                  readOnly
                  className="border-none bg-transparent font-semibold text-[17px] text-[#F5F5F5] w-full"
                  value={account}
                />
                <img src={copySvg} alt="" className="ml-3" />
              </span>
            </div>
            <div className="flex items-center justify-between">
              <a
                href={`https://testnet.bscscan.com/address/${account}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center text-[#2CE7FF] text-sm text-shadow"
              >
                View Smart contract <img src={linkSqare} className="ml-[6px]" alt="" />
              </a>
              <a
                href={`https://testnet.bscscan.com/address/${account}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center text-[#2CE7FF] text-sm text-shadow"
              >
                View Smart contract <img src={linkSqare} className="ml-[6px]" alt="" />
              </a>
            </div>
            <div className="text-center">
              <button
                onClick={() => {
                  logout()
                  onClose()
                }}
                type="button"
                className="bg-transparent border-[#7BF5FB] border-solid border-[1px] flex items-center mx-auto text-sm rounded-2xl text-[#7BF5FB] font-semibold py-[4px] px-4"
              >
                <img src={logoutSvg} className="mr-2" alt="" />
                Log out
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default WalletModal
