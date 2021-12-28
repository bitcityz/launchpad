import React, { useState } from 'react'
import { useWalletModal } from '@mexi/uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import { useWeb3React } from '@web3-react/core'
import { useLocation, Link } from 'react-router-dom'
import WalletModal from '../modal/WalletModal/WalletModal'

import HomeHeader from '../../scenes/home/components/HomeHeader'
import LaunchpoolHeader from '../../scenes/launch_pool/components/LaunchpoolHeader'

import '../../assets/index.css'
import bg from '../../assets/images/bg-header.png'
import logo from '../../assets/images/logo.svg'
import walletSvg from '../../assets/images/wallet.svg'

function Header() {
  const [showWalletModal, setShowWalletModal] = useState(false)
  const location = useLocation()
  const currentPath = location.pathname

  const { login, logout } = useAuth()
  const { t } = useTranslation()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)
  const { account } = useWeb3React()

  const truncateAddress = (address) => {
    if (!address || address.length < 10) return address

    const separator = '...'
    const sepLen = separator.length

    const charsToShow = address.length - sepLen
    const frontChars = Math.ceil(charsToShow / 5)
    const backChars = Math.ceil(charsToShow / 5)
    return address.substr(0, frontChars) + separator + address.substr(address.length - backChars)
  }

  const _handleShowWalletModal = () => {
    setShowWalletModal(true)
  }

  const _handleCloseModal = () => {
    setShowWalletModal(false)
  }

  return (
    <>
      {showWalletModal && <WalletModal onClose={_handleCloseModal} />}
      <header
        className="bg-cover bg-center bg-no-repeat relative bg-[#050e21]"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <nav className="layout-container h-[70px] flex items-center">
          <Link to="/">
            <img src={logo} className="mr-8" alt="" />
          </Link>
          <ul className="flex items-center gap-x-4 list-none">
            <li>
              <a href="aa" className="text-sm text-[#F5F5F5] font-semibold">
                Launchpad
              </a>
            </li>
            <li>
              <Link to="/launchpool" className="text-sm text-[#F5F5F5] font-semibold">
                Launchpool
              </Link>
            </li>
            <li>
              <a href="aa" className="text-sm text-[#F5F5F5] font-semibold">
                Github
              </a>
            </li>
            <li>
              <a href="aa" className="text-sm text-[#F5F5F5] font-semibold">
                Document
              </a>
            </li>
          </ul>
          {!account ? (
            <button
              type="button"
              onClick={onPresentConnectModal}
              className="ml-auto text-[#212121] text-sm font-semibold flex items-center bg-[#2CE7FF] shadow-blue border-none rounded-2xl py-[7px] px-4"
            >
              <img src={walletSvg} className="mr-3" alt="" />
              <span>Connect wallet</span>
            </button>
          ) : (
            <button
              onClick={() => _handleShowWalletModal()}
              type="button"
              className="ml-auto text-[#212121] text-sm font-semibold flex items-center bg-[#2CE7FF] shadow-blue border-none rounded-2xl py-[7px] px-4"
            >
              <img src={walletSvg} className="mr-3" alt="" />
              <span>{truncateAddress(account)}</span>
            </button>
          )}
        </nav>
        {currentPath === '/' && <HomeHeader />}
        {currentPath === '/launchpool' && <LaunchpoolHeader />}
      </header>
    </>
  )
}

export default Header
