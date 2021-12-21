import React, { useState, useEffect, useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import ReactPlayer from 'react-player'
import BigNumber from 'bignumber.js'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Text, Grid, CardBody, Card, Skeleton, BinanceIcon, Heading, Flex } from '@metaxiz/uikit'
import Page from 'components/Layout/Page'
import PageHeader from 'components/PageHeader'
import { useBoxSaleContract } from 'hooks/useContract'

// IMAGES
import ClockIcon from './images/clock.svg'
import PurchasedIcon from './images/purchased.svg'

import BackgroundSrc from './images/bg.svg'
import HeaderBg from './images/header-bg.svg'

// import CommonSrc from './images/common.svg'
// import EpicSrc from './images/epic.svg'
// import LegendarySrc from './images/legendary.svg'

const CardStyled = styled(Card)`
  > div {
    background: transparent;
  }
  max-height: 469px;
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
  video {
    border-radius: 12px;
  }
`

const StyleClockCard = styled.div`
  align-items: center;
  justify-content: center;
  background: linear-gradient(#ffb743, #fde972);
  height: fit-content;
  padding: 8px 16px;
  padding-right: 32px;
  border-radius: 12px;
  margin: 16px 8px;
  position: relative;
  .icon {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 12px;
  }
`
const StylePurchasedCard = styled.div`
  align-items: center;
  justify-content: center;
  background: linear-gradient(#3e6ff9, #2ea9ff);
  height: fit-content;
  padding: 8px 16px;
  padding-right: 32px;
  border-radius: 12px;
  margin: 16px 8px;
  position: relative;
  .icon {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 12px;
  }
`

const BOXES = [0, 1, 2, 3]

const formatNumber = (numberAsString) => Number(numberAsString).toLocaleString(undefined, { maximumFractionDigits: 0 })

const Boxes: React.FC = () => {
  const [boxes, setBoxes] = useState<any[] | undefined>()
  const { account } = useWeb3React()
  const boxSaleContract = useBoxSaleContract()

  useEffect(() => {
    if (account) {
      const tasks = []
      BOXES.forEach((id) => {
        tasks.push(boxSaleContract.boxs(id))
      })
      Promise.all(tasks).then((res) =>
        setBoxes(
          res.map((item) => {
            return {
              price: new BigNumber(item.price._hex).div(DEFAULT_TOKEN_DECIMAL).toString(),
              remaining: new BigNumber(item.remain._hex).toString(),
              limit: new BigNumber(item.limit._hex).toString(),
            }
          }),
        ),
      )
    }
  }, [boxSaleContract, account])

  const totalSupply = useMemo(() => (boxes ? boxes.reduce((tot, box) => Number(box.limit) + tot, 0) : 0), [boxes])
  const totalRemaining = useMemo(
    () => (boxes ? boxes.reduce((tot, box) => Number(box.remaining) + tot, 0) : 0),
    [boxes],
  )

  return (
    <PageStyled>
      <PageHeader
        style={{
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
        mt="48px"
        background={`url(${HeaderBg})`}
      >
        <Grid
          gridGap="16px"
          gridTemplateColumns={['1fr', null, 'repeat(2, 1fr)', null, 'repeat(2, 1fr)']}
          alignItems="start"
        >
          <Flex flexDirection="column">
            <Text color="white">DEC 01-02-2022</Text>
            <Heading fontSize="24px" fontWeight="bold" as="h1" scale="xl" color="white" mb="16px">
              MEFI BOX
            </Heading>
            <Text fontSize="13px" display="inline" mt="24px" color="white">
              <span style={{ color: '#FECF34' }}>MEFI BOX</span> contains various heroes with certain drop rates.The
              higher quality of the <span style={{ color: '#FECF34' }}>MEFI BOX</span> is, the higher the drop ratefor
              the high-quality Heroes is.
            </Text>
          </Flex>
          <Flex>
            <StyleClockCard>
              <img className="icon" src={ClockIcon} alt="clock" />
              <Text fontSize="14px">Time Remaining</Text>
              <Text fontWeight="bold" color="#3A3855" fontSize="16px">{`${totalRemaining.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}/${totalSupply.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}</Text>
            </StyleClockCard>
            <StylePurchasedCard>
              <img className="icon" src={PurchasedIcon} alt="clock" />
              <Text fontSize="14px">Purchased</Text>
              <Text fontWeight="bold" color="#3A3855" fontSize="16px">{`${totalRemaining.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}/${totalSupply.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}</Text>
            </StylePurchasedCard>
          </Flex>
        </Grid>
      </PageHeader>
      <Page style={{ marginTop: 0 }}>
        <Grid
          gridGap="16px"
          gridTemplateColumns={['1fr', null, 'repeat(3, 1fr)', null, 'repeat(4, 1fr)']}
          alignItems="start"
        >
          <Link to="/boxes/common">
            <Card>
              <CardBody p="0px">
                <Flex p="16px">
                  {/* <BackgroundImage
                    height={320}
                    width={320}
                    style={{ borderRadius: '8px' }}
                    src={CommonBoxSrc}
                  />
                  <img className="box" src={CommonSrc} alt="common" /> */}
                  <ReactPlayer width="100%" height="100%" playing muted loop url="/videos/common.mp4" />
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
                    <BinanceIcon />
                    {boxes ? ` ${boxes[3].price} BNB` : <Skeleton />}
                  </Text>
                </Flex>
              </CardBody>
            </Card>
          </Link>
          <Link to="/boxes/epic">
            <Card>
              <CardBody p="0px">
                <Flex p="16px">
                  {/* <BackgroundImage
                    height={320}
                    width={320}
                    style={{ borderRadius: '8px' }}
                    src={EpicBoxSrc}
                  /> */}
                  {/* <img className="box" src={EpicSrc} alt="common" /> */}
                  <ReactPlayer width="100%" height="100%" playing muted loop url="/videos/epic.mp4" />
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
                    <BinanceIcon />
                    {boxes ? ` ${boxes[2].price} BNB` : <Skeleton />}
                  </Text>
                </Flex>
              </CardBody>
            </Card>
          </Link>
          <Link to="/boxes/legendary">
            <Card>
              <CardBody p="0px">
                <Flex p="16px">
                  {/* <BackgroundImage
                    height={320}
                    width={320}
                    style={{ borderRadius: '8px' }}
                    src={LegendaryBoxSrc}
                  />
                  <img style={{left: 0, top : 0}} className="box" src={LegendarySrc} alt="common" /> */}
                  <ReactPlayer width="100%" height="100%" playing muted loop url="/videos/legendary.mp4" />
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
                    <BinanceIcon />
                    {boxes ? ` ${boxes[1].price} BNB` : <Skeleton />}
                  </Text>
                </Flex>
              </CardBody>
            </Card>
          </Link>
          <Link to="/boxes/mother">
            <CardStyled>
              <CardBody p="0px">
                {/* <Flex height="274px">
                  <ReactPlayer width="100%" height="100%" playing muted loop url='/videos/mother.mp4' />
                </Flex> */}
                <ReactPlayer width="100%" height="100%" playing muted loop url="/videos/mother.mp4" />
                <Flex
                  style={{ position: 'absolute', bottom: 0, width: '100%' }}
                  p="16px"
                  flexDirection="column"
                  background="rgba(16, 12, 69, 0.3)"
                >
                  <Text fontWeight="bold" fontSize="24px" color="#FFFF00" mb="8px">
                    MOTHER BOX
                  </Text>
                  <Text fontSize="16px" color="white" mb="8px">
                    Remaining boxes:{boxes ? ` ${formatNumber(boxes[0].remaining)}` : <Skeleton />}
                  </Text>
                  <Text fontSize="16px" color="white" mt="16px">
                    Price
                  </Text>
                  <Text color="white" fontWeight="bold" fontSize="24px" mt="4px">
                    <BinanceIcon />
                    {boxes ? ` ${boxes[0].price} BNB` : <Skeleton />}
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
