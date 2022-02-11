import React, { useState } from 'react'
import { useWalletModal } from '@mexi/uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import { useWeb3React } from '@web3-react/core'
import { Link, NavLink } from 'react-router-dom'
import truncateHash from 'utils/truncateHash'
import WalletModal from '../modal/WalletModal/WalletModal'

import '../../assets/index.css'
import logo from '../../assets/images/logo.svg'
import walletSvg from '../../assets/images/wallet.svg'
import icMenu from '../../assets/images/ic-menu.svg'

function Header() {
  const [showWalletModal, setShowWalletModal] = useState(false)

  const { login, logout } = useAuth()
  const { t } = useTranslation()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)
  const { account } = useWeb3React()
  const [showMenu, setShowMenu] = useState(false)

  const _handleShowWalletModal = () => {
    setShowWalletModal(true)
  }

  const _handleCloseModal = () => {
    setShowWalletModal(false)
  }

  const _handleShowMenu = () => {
    setShowMenu((isShow) => !isShow)
  }

  const _handleCloseMenu = () => {
    setShowMenu(false)
  }

  return (
    <>
      {showWalletModal && <WalletModal onClose={_handleCloseModal} />}
      <header className="relative">
        <nav className={`layout-container mobile-menu xl:desktop-menu ${showMenu ? 'h-screen' : 'h-[55px]'}`}>
          <div className="flex items-center justify-between">
            <Link to="/" onClick={_handleCloseMenu}>
              <img src={logo} className="mr-8" alt="" />
            </Link>

            <button type="button" className="bg-transparent border-none ml-auto xl:hidden" onClick={_handleShowMenu}>
              <img src={icMenu} alt="" />
            </button>
          </div>
          <ul
            className={`xl:flex xl:flex-row xl:mt-0 flex flex-col gap-y-4 mt-8 justify-center items-center gap-x-4 list-none ${
              showMenu ? '' : 'hidden'
            }`}
          >
            <li>
              <NavLink
                to="/launchpad"
                activeClassName="!text-skyblue text-shadow"
                className="text-sm text-[#F5F5F5] font-semibold"
                onClick={_handleCloseMenu}
              >
                Launchpad
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/launchpool"
                activeClassName="!text-skyblue text-shadow"
                className="text-sm text-[#F5F5F5] font-semibold"
                onClick={_handleCloseMenu}
              >
                Launchpool
              </NavLink>
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
              className={`xl:ml-auto xl:mx-0 xl:mt-0 max-w-[205px] mx-auto text-white mt-4 text-sm font-semibold flex items-center fill-btn border-none rounded-2xl py-[7px] px-4 ${
                showMenu ? '' : 'hidden xl:flex'
              }`}
            >
              <img src={walletSvg} className="mr-3" alt="" />
              <span>Connect wallet</span>
            </button>
          ) : (
            <button
              onClick={() => _handleShowWalletModal()}
              type="button"
              className={`xl:ml-auto xl:mx-0 xl:mt-0 max-w-[205px] mx-auto text-white mt-4 text-sm font-semibold flex items-center fill-btn border-none rounded-2xl py-[7px] px-4 ${
                showMenu ? '' : 'hidden xl:flex'
              }`}
            >
              <img src={walletSvg} className="mr-3" alt="" />
              <span>{truncateHash(account, 4, 5)}</span>
            </button>
          )}
        </nav>
      </header>
    </>
  )
}

export default Header
