import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import { Text, Flex, Box, Modal, useModal, InjectedModalProps, Button } from '@mexi/uikit'
import { useBoxSaleContract } from 'hooks/useContract'
import { useBNBVsBusdPrice } from 'hooks/useBUSDPrice'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useGetBnbBalance } from 'hooks/useTokenBalance'
import { AutoColumn } from 'components/Layout/Column'
import { ethers } from 'ethers'
import { parseUnits } from 'ethers/lib/utils'
import { useParams } from 'react-router-dom'
import PageSection from 'components/PageSection'
import backgroundUrl from './images/background.png'
import modalUrl from './images/modal.png'
import epicShapeUrl from './images/shape-epic.png'
import commonShapeUrl from './images/shape-common.png'
import legendaryShapeUrl from './images/shape-legendary.png'
import rareShapeUrl from './images/shape-rare.png'
import popupBgUrl from './images/popup-bg.png'

import commonBox from '../images/common-box.png'
import epicBox from '../images/epic-box.png'
import legendaryBox from '../images/legendary-box.png'
import metaxizBox from '../images/metaxiz-box.png'

interface Props extends InjectedModalProps {
  boxId: string
  price: string
  box: string
}

const BOXMAP = {
  common: {
    id: 3,
    name: 'common box',
    boxImage: commonBox,
  },
  legendary: {
    id: 1,
    name: 'legendary box',
    boxImage: legendaryBox,
  },
  epic: {
    id: 2,
    name: 'epic box',
    boxImage: epicBox,
  },
  mother: {
    id: 0,
    name: 'mother box',
    boxImage: metaxizBox,
  },
}

const PageStyed = styled.div`
  background-image: url(${backgroundUrl});
  background-size: cover;
  .mefi-box {
    margin-top: 32px;
  }
`

const BoxStyed = styled(Box)`
  height: 80vh;
  background-image: url(${modalUrl});
  background-size: contain;
  background-repeat: no-repeat;
`

const PolygonStyled = styled(Flex)`
  background: #3e316b;
  clip-path: polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%);
  background-size: contain;
  background-repeat: no-repeat;
`

const ButtonStyled = styled.button`
  background: #ffad1d;
  transform: skew(-20deg);
  border: 0;
  outline: 0;
  cursor: pointer;
  padding: 4px 16px;
  &:hover {
    background: #fab820;
  }
  span {
    display: inline-block;
    transform: skew(20deg);
  }
`
const PurchaseButtonStyled = styled.button`
  background: #5bfe33;
  font-size: 20px;
  color: #208f04;
  transform: skew(-20deg);
  border: 0;
  outline: 0;
  cursor: pointer;
  padding: 8px 16px;
  &:hover {
    background: #45d521;
  }
  span {
    display: inline-block;
    transform: skew(20deg);
  }
`

const CheckoutButtonStyled = styled.button`
  background: #251345;
  font-size: 16px;
  color: white;
  transform: skew(-20deg);
  border: 0;
  outline: 0;
  cursor: pointer;
  padding: 8px;
  &:hover {
    background: #2a1949;
  }
  span {
    display: inline-block;
    transform: skew(20deg);
  }
`

const HeaderStyled = styled.div`
  width: 100%;
  text-transform: uppercase;
`

const ShapeStyled = styled.div`
  margin-top: 24px;
  position: relative;
  .shape {
    position: absolute;
    z-index: 1;
    .title {
      position: absolute;
      width: 100%;
      top: 10px;
      text-align: center;
      text-transform: uppercase;
    }
  }
  &:first-child {
    margin-top: 0;
  }
`

const ShapeTextStyled = styled(Text)`
  width: 80%;
  float: right;
  padding-right: 16px;
  height: 35px;
  line-height: 35px;
  background: #3d345f;
  font-weight: bold;
  clip-path: polygon(0% 0%, 100% 0%, 97% 100%, 0% 100%);
`

const ModalStyle = styled(Modal)`
  clip-path: polygon(7% 0, 100% 0, 100% 93%, 93% 100%, 0 100%, 0 100%, 0 7%);
  background: #412672;
  padding: 16px;
  border-radius: 0;
  border: none;
  > div {
    border-bottom: none;
  }
  h2 {
    color: white;
  }
`

const getValueAsEthersBn = (value: string) => {
  const valueAsFloat = parseFloat(value)
  return Number.isNaN(valueAsFloat) ? ethers.BigNumber.from(0) : parseUnits(value)
}

const CheckoutModal: React.FC<Props> = ({ boxId, onDismiss, price, box }) => {
  const data = useGetBnbBalance()
  const [isTxPending, setIsTxPending] = useState(false)
  const boxSaleContract = useBoxSaleContract()
  const { callWithGasPrice } = useCallWithGasPrice()
  const checkout = async () => {
    const tx = await callWithGasPrice(boxSaleContract, 'buy', [boxId], { value: getValueAsEthersBn(price).toString() })
    setIsTxPending(true)
    await tx.wait()
    setIsTxPending(false)
    onDismiss()
  }
  const isEnoughBlance = Number(price) < new BigNumber(data.balance._hex).div(DEFAULT_TOKEN_DECIMAL).toNumber()
  return (
    <ModalStyle title="Checkout" maxWidth="420px" onDismiss={onDismiss}>
      <AutoColumn gap="lg">
        <Text color="white">You are about to purchase {box.toUpperCase()} box</Text>

        <AutoColumn gap="lg">
          <Flex justifyContent="space-between">
            <Text color="white">Price:</Text>
            <Text color="white" bold>
              {price} BNB
            </Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text color="white">Your balance:</Text>
            <Text color="white" bold>
              {new BigNumber(data.balance._hex).div(DEFAULT_TOKEN_DECIMAL).toFixed(5)} BNB
            </Text>
          </Flex>
          <CheckoutButtonStyled disabled={!isEnoughBlance || isTxPending} onClick={checkout}>
            <span>{isTxPending ? 'Loading' : isEnoughBlance ? 'Check Out' : 'Insufficient balance'}</span>
          </CheckoutButtonStyled>
        </AutoColumn>
      </AutoColumn>
    </ModalStyle>
  )
}

const BoxNft: React.FC = () => {
  const { box }: { box: string } = useParams()
  const boxSaleContract = useBoxSaleContract()
  const [remaning, setRemaining] = useState('0')
  const [price, setPrice] = useState('0')
  const [heroMap, setHeroMap] = useState({
    common: {
      percent: 90,
      supply: 45000,
      remain: 45000,
    },
    epic: {
      percent: 0.1,
      supply: 488,
      remain: 488,
    },
    rare: {
      percent: 9.9,
      supply: 48312,
      remain: 48312,
    },
    legendary: {
      percent: 0,
      supply: 0,
      remain: 0,
    },
  })
  const bnbBusdPrice = useBNBVsBusdPrice()

  const priceInUsd = bnbBusdPrice * parseFloat(price)

  useEffect(() => {
    boxSaleContract.boxs(BOXMAP[box].id).then((item) => {
      setRemaining(new BigNumber(item.remain._hex).toString())
      setPrice(new BigNumber(item.price._hex).div(DEFAULT_TOKEN_DECIMAL).toString())
    })
  }, [boxSaleContract, box])

  useEffect(() => {
    const fetchStatic = async () => {
      const res = await fetch(`https://testnet-api.metafight.io/boxs?name=${box.toUpperCase()}`)

      if (res.ok) {
        const [data] = await res.json()
        console.log({
          data,
        })
        setHeroMap(data['1stRound'].options[0])
      }
    }
    fetchStatic()
  }, [box])

  const [onPresentModal] = useModal(<CheckoutModal boxId={BOXMAP[box].id} price={price} box={box} />)
  return (
    <PageStyed>
      <PageSection innerProps={{ style: { margin: '0', width: '100%' } }} index={1} background="none">
        <BoxStyed>
          <Flex flexDirection="row" alignItems="center" justifyContent="space-around">
            <Flex width="40%" padding="50px" flexDirection="column">
              <PolygonStyled mb="32px" justifyContent="center">
                <Text textAlign="center" color="white" textTransform="uppercase" fontSize="20px">
                  {BOXMAP[box].name}
                </Text>
              </PolygonStyled>
              <img alt="metaxiz box" src={BOXMAP[box].boxImage} />
              <PolygonStyled mt="32px" justifyContent="center">
                <Text display="inline" textAlign="center" color="#FAB820" textTransform="uppercase" fontSize="20px">
                  {price} BNB
                </Text>
                <Text display="inline" fontSize="13px" color="#30DAFF">
                  ~{priceInUsd} USD
                </Text>
              </PolygonStyled>
              <Flex mt="16px" mb="32px" justifyContent="space-between">
                <Text color="white">Remaining boxes: {remaning}</Text>
                <ButtonStyled>
                  <span>BNB</span>
                </ButtonStyled>
              </Flex>
              <PurchaseButtonStyled onClick={onPresentModal}>
                <span>Purchase</span>
              </PurchaseButtonStyled>
            </Flex>
            <Flex width="40%" flexDirection="column">
              <Flex width="100%" flexDirection="column">
                <HeaderStyled>
                  <Text textAlign="center" color="#9784DA">
                    Drop Detail
                  </Text>
                </HeaderStyled>
                <Flex width="100%" flexDirection="column" background="#271D4D" padding="16px 16px 24px 16px">
                  <ShapeStyled>
                    <div className="shape">
                      <img src={commonShapeUrl} alt="epic" />
                      <Text color="white" className="title">
                        Common Hero
                      </Text>
                    </div>
                    <ShapeTextStyled textAlign="right" color="white">
                      {heroMap?.common.percent} %
                    </ShapeTextStyled>
                  </ShapeStyled>
                  <ShapeStyled>
                    <div className="shape">
                      <img src={rareShapeUrl} alt="epic" />
                      <Text color="white" className="title">
                        Rare Hero
                      </Text>
                    </div>
                    <ShapeTextStyled textAlign="right" color="#26ABFF">
                      {heroMap?.rare.percent} %
                    </ShapeTextStyled>
                  </ShapeStyled>
                  <ShapeStyled>
                    <div className="shape">
                      <img src={epicShapeUrl} alt="epic" />
                      <Text color="white" className="title">
                        Epic Hero
                      </Text>
                    </div>
                    <ShapeTextStyled textAlign="right" color="#EA29F2">
                      {heroMap?.epic?.percent} %
                    </ShapeTextStyled>
                  </ShapeStyled>
                  <ShapeStyled>
                    <div className="shape">
                      <img src={legendaryShapeUrl} alt="epic" />
                      <Text color="white" className="title">
                        Legendary Hero
                      </Text>
                    </div>
                    <ShapeTextStyled textAlign="right" color="#F67C2A">
                      {heroMap?.legendary?.percent} %
                    </ShapeTextStyled>
                  </ShapeStyled>
                </Flex>
              </Flex>
              <Flex width="100%" flexDirection="column" mt="32px">
                <HeaderStyled>
                  <Text textAlign="center" color="#9784DA">
                    Available items
                  </Text>
                </HeaderStyled>
                <Flex width="100%" flexDirection="column" background="#271D4D" padding="16px 16px 24px 16px">
                  <ShapeStyled>
                    <div className="shape">
                      <img src={commonShapeUrl} alt="epic" />
                      <Text color="white" className="title">
                        Common Hero
                      </Text>
                    </div>
                    <ShapeTextStyled textAlign="right" color="white">
                      {heroMap?.common.remain}
                    </ShapeTextStyled>
                  </ShapeStyled>
                  <ShapeStyled>
                    <div className="shape">
                      <img src={rareShapeUrl} alt="epic" />
                      <Text color="white" className="title">
                        Rare Hero
                      </Text>
                    </div>
                    <ShapeTextStyled textAlign="right" color="#26ABFF">
                      {heroMap?.rare.remain}
                    </ShapeTextStyled>
                  </ShapeStyled>
                  <ShapeStyled>
                    <div className="shape">
                      <img src={epicShapeUrl} alt="epic" />
                      <Text color="white" className="title">
                        Epic Hero
                      </Text>
                    </div>
                    <ShapeTextStyled textAlign="right" color="#EA29F2">
                      {heroMap?.epic?.remain}
                    </ShapeTextStyled>
                  </ShapeStyled>
                  <ShapeStyled>
                    <div className="shape">
                      <img src={legendaryShapeUrl} alt="epic" />
                      <Text color="white" className="title">
                        Legendary Hero
                      </Text>
                    </div>
                    <ShapeTextStyled textAlign="right" color="#F67C2A">
                      {heroMap?.legendary?.remain}
                    </ShapeTextStyled>
                  </ShapeStyled>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </BoxStyed>
      </PageSection>
    </PageStyed>
  )
}

export default BoxNft
