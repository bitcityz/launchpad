import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import { Text, Flex, Box, Modal, useModal, InjectedModalProps, Button } from '@metaxiz/uikit'
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
}

const BOXMAP = {
  common: {
    id: 3,
    name: 'common box',
    boxImage: commonBox
  },
  legendary: {
    id: 1,
    name: 'legendary box',
    boxImage: legendaryBox
  },
  epic: {
    id: 2,
    name: 'epic box',
    boxImage: epicBox
  },
  mother: {
    id: 0,
    name: 'mother box',
    boxImage: metaxizBox
  }
}

const PageStyed = styled.div`
  background-image: url(${backgroundUrl});
  background-size: cover;
  .mefi-box {
    margin-top: 32px
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
  clip-path: polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%);
  background-size: contain;
  background-repeat: no-repeat;
`

const ButtonStyled = styled.button`
  background: #FFAD1D;
  transform: skew(-20deg);
  border: 0;
  outline: 0;
  cursor: pointer;
  padding: 4px 16px;
  &:hover { background: #fab820; }
  span {
    display: inline-block; 
    transform: skew(20deg);
  }
`
const PurchaseButtonStyled = styled.button`
  background: #5BFE33;
  transform: skew(-20deg);
  border: 0;
  outline: 0;
  cursor: pointer;
  padding: 8px 16px;
  &:hover { background: #45D521; }
  span {
    display: inline-block; 
    transform: skew(20deg);
  }
`
const HeaderStyled = styled.div`
  background: #3D345F;
  width: 100%
`

const ShapeStyled = styled.div`
  margin-top: 16px;
  position: relative;
  .shape {
    position: absolute;
    .title {
      position: absolute;
      width: 100%;
      top: 10px;
      text-align: center;
      text-transform: uppercase;
    }
  }
`

const ShapeTextStyled = styled(Text)`
  background: #59608C;
  width: 80%;
  float: right;
  padding-right: 16px;
  height: 40px;
  line-height: 40px;
  font-weight: bold
`

const ModalStyle = styled(Modal)`
  background-image: url(${popupBgUrl});
  background-size: contain;
  background-repeat: no-repeat;
`

const getValueAsEthersBn = (value: string) => {
  const valueAsFloat = parseFloat(value)
  return Number.isNaN(valueAsFloat) ? ethers.BigNumber.from(0) : parseUnits(value)
}

const CheckoutModal: React.FC<Props> = ({ boxId, onDismiss, price }) => {
  const data = useGetBnbBalance()
  const [isTxPending, setIsTxPending] = useState(false)
  const boxSaleContract = useBoxSaleContract()
  const { callWithGasPrice } = useCallWithGasPrice()
  const checkout = async() => {
    const tx = await callWithGasPrice(boxSaleContract, 'buy', [boxId], { value: getValueAsEthersBn(price).toString() })
    setIsTxPending(true)
    const receipt = await tx.wait()
    setIsTxPending(false)
  }
  return (
    <Modal title="Checkout" maxWidth="420px" onDismiss={onDismiss}>
      <AutoColumn gap="lg">
        You are about to purchase Mefi box1
        <AutoColumn gap="lg">
          <Flex justifyContent="space-between">
            <Text>Price:</Text>
            <Text bold>{price} BNB</Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text>Your balance:</Text>
            <Text bold>{ new BigNumber(data.balance._hex).div(DEFAULT_TOKEN_DECIMAL).toFixed(5)} BNB</Text>
          </Flex>
          <Button isLoading={isTxPending} onClick={checkout}>Checkout</Button>
        </AutoColumn>
      </AutoColumn>
    </Modal>
  )
}

const BoxNft: React.FC = () => {
  const { box }: { box: string } = useParams()
  const boxSaleContract = useBoxSaleContract()
  const [remaning, setRemaining] = useState('0')
  const [price, setPrice] = useState('0')
  const bnbBusdPrice = useBNBVsBusdPrice()

  const priceInUsd = bnbBusdPrice *  parseFloat(price)

  useEffect(() => {
    boxSaleContract.boxs(BOXMAP[box].id).then((item) => {
      setRemaining(new BigNumber(item.remain._hex).toString())
      setPrice(new BigNumber(item.price._hex).div(DEFAULT_TOKEN_DECIMAL).toString())
    })
  }, [boxSaleContract, box])

  const [onPresentModal] = useModal(<CheckoutModal boxId={BOXMAP[box].id} price={price} />)
  return (
    <PageStyed>
      <PageSection
        innerProps={{ style: { margin: '0', width: '100%' } }}
        index={1}
        background="none"
      >
        <BoxStyed>
          <Flex flexDirection="row" alignItems="center" justifyContent="space-around" >
            <Flex width="40%" padding="50px" flexDirection="column">
              <PolygonStyled mb="32px" justifyContent="center">
                <Text textAlign="center" color="white" textTransform="uppercase" fontSize="20px">{BOXMAP[box].name}</Text>
              </PolygonStyled>
              <img alt='metaxiz box' src={BOXMAP[box].boxImage} />
              <PolygonStyled mt="32px" justifyContent="center">
                <Text display="inline" textAlign="center" color="#FAB820" textTransform="uppercase" fontSize="20px">{price} BNB</Text>
                <Text display="inline" color="#30DAFF">~{priceInUsd} USD</Text>
              </PolygonStyled>
              <Flex mt="16px" mb="32px" justifyContent="space-between">
                <Text color="white">Remaining boxes: {remaning}</Text>
                <ButtonStyled><span>BNB</span></ButtonStyled>
              </Flex>
              <PurchaseButtonStyled onClick={onPresentModal}><span>Purchase</span></PurchaseButtonStyled>
            </Flex>
            <Flex width="40%">
              <Flex width="100%" flexDirection="column">
                <HeaderStyled>
                  <Text textAlign="center" color="white">Drop Detail</Text>
                </HeaderStyled>
                <ShapeStyled>
                  <div className="shape">
                    <img src={commonShapeUrl} alt="epic" />
                    <Text color="white" className="title">Common Hero</Text>
                  </div>
                  <ShapeTextStyled textAlign="right" color="white">95.492742551 %</ShapeTextStyled>
                </ShapeStyled>
                <ShapeStyled>
                  <div className="shape">
                    <img src={rareShapeUrl} alt="epic" />
                    <Text color="white" className="title">Rare Hero</Text>
                  </div>
                  <ShapeTextStyled textAlign="right" color="#26ABFF">95.492742551 %</ShapeTextStyled>
                </ShapeStyled>
                <ShapeStyled>
                  <div className="shape">
                    <img src={epicShapeUrl} alt="epic" />
                    <Text color="white" className="title">Epic Hero</Text>
                  </div>
                  <ShapeTextStyled textAlign="right" color="#EA29F2">95.492742551 %</ShapeTextStyled>
                </ShapeStyled>
                <ShapeStyled>
                  <div className="shape">
                    <img src={legendaryShapeUrl} alt="epic" />
                    <Text color="white" className="title">Legendary Hero</Text>
                  </div>
                  <ShapeTextStyled textAlign="right" color="#F67C2A">95.492742551 %</ShapeTextStyled>
                </ShapeStyled>
              </Flex>
            </Flex>
          </Flex>
        </BoxStyed>
      </PageSection>
    </PageStyed>
  )
}

export default BoxNft
