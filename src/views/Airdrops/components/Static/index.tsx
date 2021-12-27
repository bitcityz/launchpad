import React from 'react'
import { Text, Flex } from '@mexi/uikit'
import styled from 'styled-components'
import backgroundUrl from './images/Board 1.png'
import availableUrl from './images/Icon_Avaiable 1.png'

const CardStyled = styled.div`
  position: relative;
  .top-icon {
    position: absolute;
    top: -17px;
    left: -27px;
  }
  .title {
    position: absolute;
    top: 4px;
    left: 48px;
    color: #9279e2;
    font-size: 13px;
  }
  .contents {
    position: absolute;
    bottom: 16px;
    color: #241b41;
    left: 48px;
    font-size: 20px;
    font-weight: bold;
  }
`

const Static: React.FC = () => {
  return (
    <Flex justifyContent="space-evenly" width="100%">
      <CardStyled>
        <img className="top-icon" src={availableUrl} alt="mefi box" />
        <img className="background" src={backgroundUrl} alt="mefi box" />
        <Text className="title">Available</Text>
        <Text className="contents">5M+ / 10M</Text>
      </CardStyled>
      <CardStyled>
        <img className="top-icon" src={availableUrl} alt="mefi box" />
        <img className="background" src={backgroundUrl} alt="mefi box" />
        <Text className="title">Time remaining</Text>
        <Text className="contents">23D 14H 12M</Text>
      </CardStyled>
      <CardStyled>
        <img className="top-icon" src={availableUrl} alt="mefi box" />
        <img className="background" src={backgroundUrl} alt="mefi box" />
        <Text className="title">Purchased</Text>
        <Text className="contents">370 / 1000</Text>
      </CardStyled>
    </Flex>
  )
}

export default Static
