import React from 'react'

import '../../../assets/index.css'

import twitterBlack from '../../../assets/images/twitter-black.svg'
import telegramBlack from '../../../assets/images/telegram-black.svg'
import linkSvg from '../../../assets/images/link.svg'
import externalink from '../../../assets/images/external-link.svg'

function Social({ idoInfo }) {
  return (
    <div className="mt-3 flex items-center gap-x-2 justify-start">
      <a
        href={`https://${idoInfo?.website}`}
        target="_blank"
        rel="noreferrer"
        className="flex bg-[#F5F5F5] py-1 gap-x-2 text-black rounded-[20px] px-3 justify-around"
      >
        <img src={linkSvg} alt="" />
        <span>{idoInfo?.website}</span>
        <img src={externalink} alt="" />
      </a>
      <a href={idoInfo?.twitter} target="_blank" rel="noreferrer">
        <img src={twitterBlack} alt="" />
      </a>
      {/* <a href={idoInfo?.medium} target="_blank" rel="noreferrer">
        <img src={mediumBlack} alt="" />
      </a> */}
      <a href={idoInfo?.telegram} target="_blank" rel="noreferrer">
        <img src={telegramBlack} alt="" />
      </a>
    </div>
  )
}

export default Social
