import React, { useState, useEffect, useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import { Text, Grid, CardBody, BackgroundImage, Card, Skeleton, BinanceIcon, Heading, Flex } from '@metaxiz/uikit'
import Page from 'components/Layout/Page'
import PageHeader from 'components/PageHeader'
import { useBoxSaleContract } from 'hooks/useContract'
import { TicketPurchaseCard } from 'views/Lottery/svgs'

// IMAGES
import CommonBoxSrc from './images/common-box.svg'
import EpicBoxSrc from './images/epic-box.svg'
import LegendaryBoxSrc from './images/legendary-box.svg'
import MotherBoxSrc from './images/mother-box.svg'
import MotherBgSrc from './images/mother-bg.svg'
import BackgroundSrc from './images/bg.svg'
import HeaderBg from './images/header-bg.svg'

import CommonSrc from './images/common.svg'
import EpicSrc from './images/epic.svg'
import LegendarySrc from './images/legendary.svg'

const CardStyled = styled(Card)`
  background: url(${MotherBgSrc});
  >div {
    background: transparent
  }
`

const PageStyled = styled.div`
  background: url(${BackgroundSrc});
  background-size: cover;
  .box {
    position: absolute;
  }
  a {
    &:hover .box {
      animation: grkjUd 3s ease-in-out infinite;
    }
  }
`

const mainTicketAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(6deg);
  }
  to {
    transform: rotate(0deg);
  }  
`

const TicketContainer = styled(Flex)`
  animation: ${mainTicketAnimation} 3s ease-in-out infinite;
`

const TicketSvgWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: rotate(-4deg);
`

const ButtonWrapper = styled.div`
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 60%;
  transform: translate(-50%, -50%) rotate(-4deg);
`

const BOXES = [0, 1, 2, 3]

const formatNumber = numberAsString => Number(numberAsString).toLocaleString(undefined, {maximumFractionDigits:0})

const Boxes: React.FC = () => {
  const [boxes, setBoxes] = useState<any[] | undefined>()
  const { account } = useWeb3React()
  const boxSaleContract = useBoxSaleContract()

  useEffect(() => {
    if (account) {
      const tasks = []
      BOXES.forEach(id => {
        tasks.push(boxSaleContract.boxs(id))
      })
      Promise.all(tasks).then(res => setBoxes(res.map(item => {
        return {
          price: new BigNumber(item.price._hex).div(DEFAULT_TOKEN_DECIMAL).toString(),
          remaining: new BigNumber(item.remain._hex).toString(),
          limit: new BigNumber(item.limit._hex).toString(),
        }
      })))
    }
  }, [boxSaleContract, account])

  const totalSupply = useMemo(() => boxes ? boxes.reduce((tot, box) => Number(box.limit) + tot, 0) : 0, [boxes])
  const totalRemaining= useMemo(() => boxes ? boxes.reduce((tot, box) => Number(box.remaining) + tot, 0) : 0, [boxes])

  return (
    <PageStyled>
      <PageHeader height="377px" background={`url(${HeaderBg})`}>
        <Flex flexDirection="row">
          <Flex flexDirection="column" width="50%">
            <Flex>
              <Heading as="h1" scale="xl" color="white" mb="24px">
                MEFI BOX
              </Heading>
            </Flex>
            <Text mt="56px" color="white">
              MEFI BOX contains various heroes with certain drop rates.The higher quality of the MEFI BOX is, the higher the drop ratefor the high-quality Heroes is.
            </Text>
          </Flex>
          <Flex>
            <TicketContainer
              position="relative"
              width={['240px', '288px']}
              height={['94px', '113px']}
              alignItems="center"
              justifyContent="center"
            >
              <ButtonWrapper>
                <Text fontSize="14px">Available</Text>
                <Text color="#3A3855" fontSize="24px">{`${totalRemaining.toLocaleString(undefined, {maximumFractionDigits:0})}/${totalSupply.toLocaleString(undefined, {maximumFractionDigits:0})}`}</Text>
              </ButtonWrapper>
              <TicketSvgWrapper>
                <TicketPurchaseCard width="100%" />
              </TicketSvgWrapper>
            </TicketContainer>
          </Flex>
        </Flex>
      </PageHeader>
      <Page>
        <Grid
          gridGap="16px"
          gridTemplateColumns={['1fr', null, 'repeat(3, 1fr)', null, 'repeat(4, 1fr)']}
          alignItems="start"
        >
          <Link to="/boxes/common">
            <Card>
              <CardBody p="0px">
                <Flex p="16px">
                  <BackgroundImage
                    height={320}
                    width={320}
                    style={{ borderRadius: '8px' }}
                    src={CommonBoxSrc}
                  />
                  <img className="box" src={CommonSrc} alt="common" />
                </Flex>
                
                <Flex p="16px" flexDirection="column" background="#F4F3FF">
                  <Text fontWeight="bold" fontSize="24px" color="#3A3855" mb="8px">
                    COMMON BOX
                  </Text>
                  <Text fontSize="16px" color="textSubtle" mb="8px">
                    Remaining boxes:{boxes ? ` ${formatNumber(boxes[3].remaining)}` : <Skeleton />}
                  </Text>
                  <Text fontSize="16px" color="#7A6EAA" mt="16px">
                    Price
                  </Text>
                  <Text color="#3A3855" fontWeight="bold" fontSize="24px" mt="4px">
                    <BinanceIcon />{boxes ? ` ${boxes[3].price} BNB` : <Skeleton />}
                  </Text>
                </Flex>
              </CardBody>
            </Card>
            
          </Link>
          <Link to="/boxes/epic">
            <Card>
              <CardBody p="0px">
                <Flex p="16px">
                  <BackgroundImage
                    height={320}
                    width={320}
                    style={{ borderRadius: '8px' }}
                    src={EpicBoxSrc}
                  />
                  <img className="box" src={EpicSrc} alt="common" />
                </Flex>
                
                <Flex p="16px" flexDirection="column" background="#F4F3FF">
                  <Text fontWeight="bold" fontSize="24px" color="#3A3855" mb="8px">
                  EPIC BOX
                  </Text>
                  <Text fontSize="16px" color="textSubtle" mb="8px">
                    Remaining boxes:{boxes ? ` ${formatNumber(boxes[2].remaining)}` : <Skeleton />}
                  </Text>
                  <Text fontSize="16px" color="#7A6EAA" mt="16px">
                    Price
                  </Text>
                  <Text color="#3A3855" fontWeight="bold" fontSize="24px" mt="4px">
                    <BinanceIcon />{boxes ? ` ${boxes[2].price} BNB` : <Skeleton />}
                  </Text>
                </Flex>
              </CardBody>
            </Card>
            
          </Link>
          <Link to="/boxes/legendary">
            <Card>
              <CardBody p="0px">
                <Flex p="16px">
                  <BackgroundImage
                    height={320}
                    width={320}
                    style={{ borderRadius: '8px' }}
                    src={LegendaryBoxSrc}
                  />
                  <img style={{left: 0, top : 0}} className="box" src={LegendarySrc} alt="common" />
                </Flex>
                
                <Flex p="16px" flexDirection="column" background="#F4F3FF">
                  <Text fontWeight="bold" fontSize="24px" color="#3A3855" mb="8px">
                  LEGENDARY BOX
                  </Text>
                  <Text fontSize="16px" color="textSubtle" mb="8px">
                    Remaining boxes:{boxes ? ` ${formatNumber(boxes[1].remaining)}` : <Skeleton />}
                  </Text>
                  <Text fontSize="16px" color="#7A6EAA" mt="16px">
                    Price
                  </Text>
                  <Text color="#3A3855" fontWeight="bold" fontSize="24px" mt="4px">
                    <BinanceIcon />{boxes ? ` ${boxes[1].price} BNB` : <Skeleton />}
                  </Text>
                </Flex>
              </CardBody>
            </Card>
            
          </Link>
          <Link to="/boxes/mother">
            <CardStyled>
              <CardBody p="0px">
                <Flex height="274px">
                  <img className="box" src={MotherBoxSrc} alt="common" />
                </Flex>
                <Flex p="16px" flexDirection="column">
                  <Text fontWeight="bold" fontSize="24px" color="#3A3855" mb="8px">
                    MOTHER BOX
                  </Text>
                  <Text fontSize="16px" color="textSubtle" mb="8px">
                    Remaining boxes:{boxes ? ` ${formatNumber(boxes[0].remaining)}` : <Skeleton />}
                  </Text>
                  <Text fontSize="16px" color="#7A6EAA" mt="16px">
                    Price
                  </Text>
                  <Text color="#3A3855" fontWeight="bold" fontSize="24px" mt="4px">
                    <BinanceIcon />{boxes ? ` ${boxes[0].price} BNB` : <Skeleton />}
                  </Text>
                </Flex>
              </CardBody>
            </CardStyled>
            
          </Link>
        </Grid>
      </Page>
    </PageStyled>
  )
}

export default Boxes
