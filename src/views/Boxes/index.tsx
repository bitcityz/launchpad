import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom"
import { Text, Flex } from '@metaxiz/uikit'
import { useWeb3React } from '@web3-react/core'
import Static from './components/Static'
import HorizontalCard from './components/HorizontalCard'
import VerticalCard from './components/VerticalCard'
import backgroundUrl from './images/background_01.png'
import mefiBoxUrl from './images/mefi_box.png'
import metaxizBg from './images/metaxiz-box-bg.png'
import metaxizBox from './images/metaxiz-box.png'

import commonBox from './images/common-box.png'
import commonBoxBg from './images/common-box-bg.png'

import epicBox from './images/epic-box.png'
import epicBoxBg from './images/epic-box-bg.png'

import legendaryBox from './images/legendary-box.png'
import legendaryBoxBg from './images/legendary-box-bg.png'

const BoxesStyed = styled.div`
  background-image: url(${backgroundUrl});
  background-size: cover;
  .mefi-box {
    margin-top: 32px
  }
`
const Boxes: React.FC = () => {
  const { account } = useWeb3React()

  return (
    <BoxesStyed>
      <Flex flexDirection="column" alignItems="center" >
        <img className="mefi-box" src={mefiBoxUrl} alt="mefi box" />
        <Text mt="32px" color="white">Mefibox contains various heroes with certain drop rates</Text>
        <Text mb="32px" color="white">The higher quality of the Mefi box is, the higher drop rate for the high quality Heroes is</Text>
        <Static />
        <Flex mt="32px">
          <Link to="/boxes/mother">
            <HorizontalCard bnbValue="500 BNB" mexiValue="1000 MEXI" backgroundImage={metaxizBg} itemImage={metaxizBox} title="METAXIZ BOX" remaining="Remaining boxes: 4000"/>
          </Link>
        </Flex>
        <Flex mt="32px">
          <Link to="/boxes/common">
            <VerticalCard bnbValue="500 BNB" mexiValue="1000 MEXI" backgroundImage={commonBoxBg} itemImage={commonBox} title="COMMON BOX" remaining="Remaining boxes: 4000"/>
          </Link>
          <Link to="/boxes/epic">
            <VerticalCard bnbValue="500 BNB" mexiValue="1000 MEXI" backgroundImage={epicBoxBg} itemImage={epicBox} title="EPIC BOX" remaining="Remaining boxes: 4000"/>
          </Link>
          <Link to="/boxes/legendary">
            <VerticalCard bnbValue="500 BNB" mexiValue="1000 MEXI" backgroundImage={legendaryBoxBg} itemImage={legendaryBox} title="LEGENDARY BOX" remaining="Remaining boxes: 4000"/>
          </Link>
        </Flex>
      </Flex>
    </BoxesStyed>
  )
}

export default Boxes
