import React, { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { Text, Flex } from '@metaxiz/uikit'
import styled from 'styled-components'
import { formatNumber } from 'utils/formatBalance'
import { useTranslation } from 'contexts/Localization'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import { useERC721, useNftMarketContract } from 'hooks/useContract'
import btnBackgroundUrl from './images/Group 5 1.png'

const CardStyled = styled.div`
  position: relative;
  .top-icon {
    position: absolute;
    top: -40px;
    right: 24px;
  }
  .contents {
    position: absolute;
    bottom: 54px;
    left: 48px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      color: white;
      font-weight: bold;
      font-size: 20px;
    }
    .remaining {
      color: white;
    }
    .btn-01 {
    }
  }
`

const ButtonStyled = styled.div`
  width: 232px;
  height: 40px;
  display: flex;
  align-items: center;
  margin-top: 16px;
  justify-content: space-around;
  font-weight: bold;
  background-image: url(${btnBackgroundUrl});
`

const horizontalCard: React.FC<{backgroundImage: string, itemImage, title: string, remaining: string, bnbValue: string, mexiValue: string}> = ({title, remaining, bnbValue, mexiValue, itemImage, backgroundImage}) => {

  return (
    <CardStyled>
      <img className='top-icon' src={itemImage} alt="mefi box" />
      <img className='background' src={backgroundImage} alt="mefi box" />
      <div className="contents">
        <Text className='title'>{title}</Text>
        <Text className='remaining'>{remaining}</Text>
        <ButtonStyled>{bnbValue}</ButtonStyled>
        <ButtonStyled>{mexiValue}</ButtonStyled>
      </div>
    </CardStyled>
  )
}

export default horizontalCard
