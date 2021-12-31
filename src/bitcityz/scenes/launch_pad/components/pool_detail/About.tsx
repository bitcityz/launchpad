import React, { useState } from 'react'
import '../../../../assets/index.css'
import oceanProtocolActive1 from '../../../../assets/images/ocean-protocol-active1.svg'
import swapLogo from '../../../../assets/images/logo-swap.png'
import sLogo from '../../../../assets/images/logo-s.png'
import gfxLogo from '../../../../assets/images/logo-gfx.png'
import gLogo from '../../../../assets/images/logo-g.png'
import kalaoLogo from '../../../../assets/images/logo-kalao.png'
import kLogo from '../../../../assets/images/logo-k.png'
import ieBlack from '../../../../assets/images/ie-black.svg'
import twitterBlack from '../../../../assets/images/twitter-black.svg'
import mediumBlack from '../../../../assets/images/medium-black.svg'
import telegramBlack from '../../../../assets/images/telegram-black.svg'

function About() {
  return (
    <div className="pt-5 relative">
      <h6 className="text-[#F5F5F5]">Introduction</h6>
      <p className="text-[#9E9E9E] mt-5 leading-5">
        The Sin City native game is a 3D action thriller game, which albeit fictional, is set and modelled after some of
        the most controversial crime cities across the world. The play-to-earn game will be laced with violence and gore
        bidding to become the ultimate Kingpin whilst building your empire. This will be built with realistic imagery
        along with voice & text chat features with intent to pull players into an augmented reality space. Ultimate aim
        of gamers will be to conquer & control Sin City and be designated as the ultimate Kingpin, until the next
        conquerors emerge.
      </p>
      <h6 className="text-[#F5F5F5] mt-5">Play to Earn Model</h6>
      <p className="text-[#9E9E9E] mt-5 leading-5">
        The play-to-earn model is very much instigated as head-to-head contests. Where users will gang battle to win SIN
        tokens. The play-to-earn model is fully recyclable where commissions on NFT sales go back into a rewards pool,
        for users to earn whilst they play.
      </p>

      <h6 className="text-[#F5F5F5] mt-5">Highlight Features</h6>
      <h6 className="text-[#F5F5F5] mt-1">Faction, team driven.</h6>
      <h6 className="text-[#F5F5F5] mt-1">Play to Earn</h6>
      <h6 className="text-[#F5F5F5] mt-1">Earn NFTs to improve your in-game character</h6>
      <h6 className="text-[#F5F5F5] mt-1">Open World, revenue generating assets from empire building</h6>
      <h6 className="text-[#F5F5F5] mt-1">System Requirements</h6>
      <h6 className="text-[#F5F5F5] mt-5">Token infomation</h6>
        <p className="grid gap-x-8 mt-3" style={{gridTemplateColumns: "150px auto"}}>
            <span className="text-[#9E9E9E]">Name</span>
            <span className="font-semibold text-[#F5F5F5]">GFX</span>
        </p>
        <p className="grid gap-x-8 mt-3" style={{gridTemplateColumns: "150px auto"}}>
            <span className="text-[#9E9E9E]">Contract address </span>
            <span className="font-semibold text-[#F5F5F5]">TBA</span>
        </p>
        <p className="grid gap-x-8 mt-3" style={{gridTemplateColumns: "150px auto"}}>
            <span className="text-[#9E9E9E]">Total supply</span>
            <span className="font-semibold text-[#F5F5F5]">76,500,000</span>
        </p>
        <p className="grid gap-x-8 mt-3" style={{gridTemplateColumns: "150px auto"}}>
            <span className="text-[#9E9E9E]">Decimals</span>
            <span className="font-semibold text-[#F5F5F5]">18</span>
        </p>
        <p className="grid gap-x-8 mt-3" style={{gridTemplateColumns: "150px auto"}}>
            <span className="text-[#9E9E9E]">Symbol</span>
            <span className="font-semibold text-[#F5F5F5]">GFX</span>
        </p>
    </div>
  )
}

export default About
