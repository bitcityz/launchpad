import React, { useState } from 'react'

import '../../assets/index.css'
import telegramIcon from '../../assets/images/telegram.svg'
import twitterIcon from '../../assets/images/twitter.svg'
import mediumIcon from '../../assets/images/medium.png'
import discordIcon from '../../assets/images/discord.svg'
import youtubeIcon from '../../assets/images/youtube.svg'
import facebookIcon from '../../assets/images/facebook.svg'
import bitcity from '../../assets/images/footer-bitcity.png'
import bg from '../../assets/images/bg-footer.png'

function Footer() {
  return (
    <footer
      className="bg-cover bg-center bg-no-repeat pt-[84px] bg-[#050e21]"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="layout-container grid grid-cols-2 gap-7">
        <div>
          <h6 className="text-2xl text-[#2CE7FF] font-bold">Subscribe to our newsletter for development news!</h6>
          <div className="flex items-center mt-4">
            <input
              type="text"
              className="bg-white rounded-[10px] py-[7px] px-3 border-none flex-1 text-[#9E9E9E]"
              placeholder="Insert your email"
            />
            <button
              type="button"
              className="bg-[#2CE7FF] shadow-blue rounded-[10px] py-[7px] px-9 text-[#212121] font-semibold border-none ml-[11px]"
            >
              Subscribe
            </button>
          </div>
          <p className="text-white mt-4">Follow us on our channels</p>
          <div className="flex items-center mt-4">
            <img src={telegramIcon} className="mr-5" alt="" />
            <img src={twitterIcon} className="mr-5" alt="" />
            <img src={mediumIcon} className="mr-5" alt="" />
            <img src={discordIcon} className="mr-5" alt="" />
            <img src={youtubeIcon} className="mr-5" alt="" />
            <img src={facebookIcon} alt="" />
          </div>
          <p className="text-white mt-10">Join our Telegram Official Global Group</p>
          <div className="flex items-center mt-1">
            <img src={telegramIcon} className="mr-2 w-9 h-9" alt="" />
            <span className="font-bold text-4xl text-gradient">BitCityZ Global Group</span>
          </div>
        </div>
        <img src={bitcity} className="max-w-full" alt="" />
      </div>
    </footer>
  )
}

export default Footer
