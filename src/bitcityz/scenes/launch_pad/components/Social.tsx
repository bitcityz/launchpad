import React from 'react'

import '../../../assets/index.css'

import ieBlack from '../../../assets/images/ie-black.svg'
import twitterBlack from '../../../assets/images/twitter-black.svg'
import mediumBlack from '../../../assets/images/medium-black.svg'
import telegramBlack from '../../../assets/images/telegram-black.svg'

function Social({ idoInfo }) {
  return (
    <div className="mt-4 flex items-center gap-x-6 justify-center md:justify-start">
      <a href={idoInfo?.website} target="_blank" rel="noreferrer">
        <img src={ieBlack} alt="" />
      </a>
      <a href={idoInfo?.twitter} target="_blank" rel="noreferrer">
        <img src={twitterBlack} alt="" />
      </a>
      <a href={idoInfo?.medium} target="_blank" rel="noreferrer">
        <img src={mediumBlack} alt="" />
      </a>
      <a href={idoInfo?.telegram} target="_blank" rel="noreferrer">
        <img src={telegramBlack} alt="" />
      </a>
    </div>
  )
}

export default Social
