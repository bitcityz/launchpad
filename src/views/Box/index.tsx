import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import useToast from 'hooks/useToast'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import { useParams, Link } from 'react-router-dom'
import { useBoxSaleContract } from 'hooks/useContract'
import { useBNBVsBusdPrice } from 'hooks/useBUSDPrice'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useWeb3React } from '@web3-react/core'
import ReactPlayer from 'react-player'
import { useGetBnbBalance } from 'hooks/useTokenBalance'
import {
  Text,
  Flex,
  BinanceIcon,
  Skeleton,
  Image,
  Box as BoxComponent,
  Button,
  Toggle,
  SearchIcon,
  NftIcon,
  Grid,
  Card,
  CardBody,
} from '@metaxiz/uikit'
import Page from 'components/Layout/Page'
import { ethers } from 'ethers'
import { parseUnits } from 'ethers/lib/utils'
import useOpenBox from 'views/Nft/market/hooks/useOpenBox'
import useClaim from 'views/Nft/market/hooks/useClaim'
import CommonBox from 'components/CommonBox'
import LegendaryBox from 'components/LegendaryBox'
import EpicBox from 'components/EpicBox'
import MotherBox from 'components/MotherBox'

// COMPONENTS
import ExpandableCard from './components/ExpandableCard'

// IMAGES
import MetaxizTokenSrc from './images/metaxiz-token.svg'

const getValueAsEthersBn = (value: string) => {
  const valueAsFloat = parseFloat(value)
  return Number.isNaN(valueAsFloat) ? ethers.BigNumber.from(0) : parseUnits(value)
}

const StyledPage = styled(Page)`
  video {
    border-radius: 12px;
  }
`

const BOXES = [0, 1, 2, 3]

const Box: React.FC = () => {
  const { toastError } = useToast()
  const { box }: { box: string } = useParams()

  const [isBNBUsed, setIsBNBUsed] = useState(true)

  const [heroMap, setHeroMap] = useState({
    common: { percent: null },
    rare: { percent: null },
    legendary: { percent: null },
    epic: { percent: null },
  })
  const [isHeroesLoading, setIsHeroesLoading] = useState(false)

  const boxSaleContract = useBoxSaleContract()
  const [remaning, setRemaining] = useState('0')
  const [path, setPath] = useState<string[]>([])
  const [priceVsBNB, setPriceVsBNB] = useState<string | undefined>()
  const [priceInMexi, setPriceInMexi] = useState<string | undefined>()
  const [isBought, setIsBought] = useState(false)

  const [boxes, setBoxes] = useState<any[] | undefined>()
  const { account } = useWeb3React()

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

  const bnbBusdPrice = useBNBVsBusdPrice()

  const [isBuying, setIsBuying] = useState(false)
  const { callWithGasPrice } = useCallWithGasPrice()

  const priceInUsd = useMemo(() => bnbBusdPrice * parseFloat(priceVsBNB), [bnbBusdPrice, priceVsBNB])

  const { handleOpenBox, newNfts, token, isOpeningBox } = useOpenBox()
  const { isApproving, isApproved, handleApprove } = useClaim(newNfts, token, () => setIsBought(false))

  useEffect(() => {
    const getPriceInMexi = async () => {
      const mexiAddress = await boxSaleContract.MEXI()
      const wbnbAddress = await boxSaleContract.WBNB()
      const mexiPath = [mexiAddress, wbnbAddress]
      setPath(mexiPath)
      const res = await boxSaleContract.getAmountsMEXIIn(getValueAsEthersBn(priceVsBNB).toString(), mexiPath)
      const result = new BigNumber(res[1]._hex).div(DEFAULT_TOKEN_DECIMAL).toString()
      setPriceInMexi(result)
    }
    if (priceVsBNB) getPriceInMexi()
  }, [priceVsBNB, boxSaleContract])

  useEffect(() => {
    setIsHeroesLoading(true)
    const fetchStatic = async () => {
      const res = await fetch(`https://testnet-api.metafight.io/boxs?name=${box.toUpperCase()}`)

      if (res.ok) {
        const [data] = await res.json()
        setHeroMap(data['1stRound'].options[0])
        setIsHeroesLoading(false)
      }
    }
    fetchStatic()
  }, [box])

  useEffect(() => {
    boxSaleContract.boxs(BOXMAP[box].id).then((item) => {
      setRemaining(new BigNumber(item.remain._hex).toString())
      setPriceVsBNB(new BigNumber(item.price._hex).div(DEFAULT_TOKEN_DECIMAL).toString())
    })
  }, [boxSaleContract, box])

  const checkout = async () => {
    setIsBuying(true)
    const promiseCall = isBNBUsed
      ? callWithGasPrice(boxSaleContract, 'buy', [BOXMAP[box].id], {
          value: getValueAsEthersBn(priceVsBNB).toString(),
        })
      : callWithGasPrice(boxSaleContract, 'buyByMEXI', [BOXMAP[box].id, path])

    const tx = await promiseCall.catch((err) => {
      toastError('Error', err.data ? err?.data.message : err.message)
      return err
    })
    if (tx.wait) {
      await tx.wait()
      setIsBought(true)
    }
    setIsBuying(false)
  }

  return (
    <StyledPage>
      <Card mb="40px">
        <CardBody>
          <Flex flexDirection={['column-reverse', null, 'row']}>
            <Flex flex="2" pr="16px">
              <BoxComponent>
                <Text color="#0088FF">METAFIGHT BOXES</Text>
                <Text fontSize="40px" bold mt="12px">
                  {BOXMAP[box].name.toUpperCase()}
                </Text>
                <Text mt={['16px', '16px', '48px']}>{BOXMAP[box].desc}</Text>
                <Flex mt="16px" mb="32px" justifyContent="space-between" alignItems="flex-end">
                  <Text color="textSubtle" mt={['16px', '16px', '48px']}>
                    Price
                  </Text>
                  <ToggleWrapper>
                    <Text mr="8px">Use BNB</Text>
                    <Toggle checked={isBNBUsed} onChange={() => setIsBNBUsed(!isBNBUsed)} scale="md" />
                  </ToggleWrapper>
                </Flex>
                {isBNBUsed ? (
                  priceVsBNB ? (
                    <Flex alignItems="center" mt="8px">
                      <BinanceIcon width={18} height={18} mr="4px" />
                      <Text fontSize="24px" bold mr="4px">
                        {priceVsBNB}
                      </Text>
                      {bnbBusdPrice ? (
                        <Text color="textSubtle">{`(~${priceInUsd.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })} USD)`}</Text>
                      ) : (
                        <Skeleton width="64px" />
                      )}
                    </Flex>
                  ) : (
                    <Skeleton width="64px" />
                  )
                ) : (
                  <Flex alignItems="center" mt="8px">
                    <img src={MetaxizTokenSrc} alt="token" width="auto" height="24px" />
                    <Text fontSize="24px" bold mr="4px">
                      {priceInMexi}
                    </Text>
                  </Flex>
                )}
                {isBought ? (
                  !isApproved ? (
                    <Button
                      minWidth="168px"
                      mr="16px"
                      disabled={isApproving}
                      width={['100%', null, 'max-content']}
                      mt="24px"
                      onClick={handleApprove}
                    >
                      {isApproving ? 'Loading' : 'Approve to open'}
                    </Button>
                  ) : (
                    <Button
                      disabled={isOpeningBox}
                      minWidth="168px"
                      mr="16px"
                      width={['100%', null, 'max-content']}
                      mt="24px"
                      onClick={() => handleOpenBox()}
                    >
                      {isOpeningBox ? 'Opening' : 'Open Box'}
                      <NftIcon color="white" width="24px" ml="4px" />
                    </Button>
                  )
                ) : (
                  <Button
                    minWidth="168px"
                    disabled={isBuying}
                    mr="16px"
                    width={['100%', null, 'max-content']}
                    mt="24px"
                    onClick={checkout}
                  >
                    {isBuying ? 'Loading...' : 'Purchase'}
                  </Button>
                )}
              </BoxComponent>
            </Flex>
            <Flex flex="1">
              <ReactPlayer width="100%" playing muted loop url={BOXMAP[box].box} />
              {/* {BOXMAP[box].box} */}
            </Flex>

            {/* <Flex style={{ position: 'relative'}} flex="2" justifyContent={['center', null, 'flex-end']} alignItems="center">
              <RoundedImage src={BOXMAP[box].background} width={440} height={440} />
              <img style={{ position: 'absolute', width: '80%' }} src={BOXMAP[box].src} alt="box" />
            </Flex> */}
          </Flex>
        </CardBody>
      </Card>
      <TwoColumnsContainer flexDirection={['column', 'column', 'row']}>
        <ExpandableCard
          title="Details"
          icon={<SearchIcon width="24px" height="24px" />}
          content={
            <BoxComponent p="24px">
              <Flex justifyContent="space-between" alignItems="center" mb="16px">
                <Text fontSize="12px" color="textSubtle" bold textTransform="uppercase">
                  Common Hero
                </Text>
                {isHeroesLoading ? (
                  <Skeleton />
                ) : (
                  <Text fontSize="12px" color="textSubtle" bold textTransform="uppercase">
                    {heroMap?.common.percent} %
                  </Text>
                )}
              </Flex>
              <Flex justifyContent="space-between" alignItems="center" mb="16px">
                <Text fontSize="12px" color="textSubtle" bold textTransform="uppercase">
                  Rare Hero
                </Text>
                {isHeroesLoading ? (
                  <Skeleton />
                ) : (
                  <Text fontSize="12px" color="textSubtle" bold textTransform="uppercase">
                    {heroMap?.rare.percent} %
                  </Text>
                )}
              </Flex>
              <Flex justifyContent="space-between" alignItems="center" mb="16px">
                <Text fontSize="12px" color="textSubtle" bold textTransform="uppercase">
                  Epic Hero
                </Text>
                {isHeroesLoading ? (
                  <Skeleton />
                ) : (
                  <Text fontSize="12px" color="textSubtle" bold textTransform="uppercase">
                    {heroMap?.epic?.percent} %
                  </Text>
                )}
              </Flex>
              <Flex justifyContent="space-between" alignItems="center" mb="16px">
                <Text fontSize="12px" color="textSubtle" bold textTransform="uppercase">
                  Legendary Hero
                </Text>
                {isHeroesLoading ? (
                  <Skeleton />
                ) : (
                  <Text fontSize="12px" color="textSubtle" bold textTransform="uppercase">
                    {heroMap?.legendary?.percent} %
                  </Text>
                )}
              </Flex>
            </BoxComponent>
          }
        />
      </TwoColumnsContainer>
      <BoxComponent pt="56px" mb="52px">
        <Text mb="8px">More boxes</Text>
        <Grid
          gridGap="16px"
          gridTemplateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)', null, 'repeat(4, 1fr)']}
          alignItems="start"
        >
          <Link to="/boxes/common">
            <Flex flexDirection="column">
              <CommonBox />
              <Card mt="8px" p="0px">
                <CardBody p="0px">
                  <Flex p="16px" flexDirection="column">
                    <Text color="#905EFF">Metafight boxes</Text>
                    <Text color="#3A3855" fontSize="20px">
                      Common box
                    </Text>
                  </Flex>
                  <Flex p="16px" background="#F4F3FF" alignItems="center" justifyContent="space-between">
                    <Text>Price</Text>
                    <Text color="#3A3855" fontWeight="bold" fontSize="18px" mt="4px">
                      <BinanceIcon />
                      {boxes ? ` ${boxes[3].price} BNB` : <Skeleton />}
                    </Text>
                  </Flex>
                </CardBody>
              </Card>
            </Flex>
          </Link>
          <Link to="/boxes/legendary">
            <Flex flexDirection="column">
              <LegendaryBox />
              <Card mt="8px" p="0px">
                <CardBody p="0px">
                  <Flex p="16px" flexDirection="column">
                    <Text color="#905EFF">Metafight boxes</Text>
                    <Text color="#3A3855" fontSize="20px">
                      Legendary box
                    </Text>
                  </Flex>
                  <Flex p="16px" background="#F4F3FF" alignItems="center" justifyContent="space-between">
                    <Text>Price</Text>
                    <Text color="#3A3855" fontWeight="bold" fontSize="18px" mt="4px">
                      <BinanceIcon />
                      {boxes ? ` ${boxes[1].price} BNB` : <Skeleton />}
                    </Text>
                  </Flex>
                </CardBody>
              </Card>
            </Flex>
          </Link>
          <Link to="/boxes/epic">
            <Flex flexDirection="column">
              <EpicBox />
              <Card mt="8px" p="0px">
                <CardBody p="0px">
                  <Flex p="16px" flexDirection="column">
                    <Text color="#905EFF">Metafight boxes</Text>
                    <Text color="#3A3855" fontSize="20px">
                      Epic box
                    </Text>
                  </Flex>
                  <Flex p="16px" background="#F4F3FF" alignItems="center" justifyContent="space-between">
                    <Text>Price</Text>
                    <Text color="#3A3855" fontWeight="bold" fontSize="18px" mt="4px">
                      <BinanceIcon />
                      {boxes ? ` ${boxes[2].price} BNB` : <Skeleton />}
                    </Text>
                  </Flex>
                </CardBody>
              </Card>
            </Flex>
          </Link>
          <Link to="/boxes/mother">
            <Flex flexDirection="column">
              <MotherBox />
              <Card mt="8px" p="0px">
                <CardBody p="0px">
                  <Flex p="16px" flexDirection="column">
                    <Text color="#905EFF">Metafight boxes</Text>
                    <Text color="#3A3855" fontSize="20px">
                      Mother box
                    </Text>
                  </Flex>
                  <Flex p="16px" background="#F4F3FF" alignItems="center" justifyContent="space-between">
                    <Text>Price</Text>
                    <Text color="#3A3855" fontWeight="bold" fontSize="18px" mt="4px">
                      <BinanceIcon />
                      {boxes ? ` ${boxes[0].price} BNB` : <Skeleton />}
                    </Text>
                  </Flex>
                </CardBody>
              </Card>
            </Flex>
          </Link>
        </Grid>
      </BoxComponent>
    </StyledPage>
  )
}

export const RoundedImage = styled(Image)`
  height: max-content;
  border-radius: ${({ theme }) => theme.radii.default};
  overflow: hidden;
  & > img {
    object-fit: contain;
  }
`

const BOXMAP = {
  common: {
    id: 3,
    name: 'common box',
    desc: '10,000 unique, randomly-generated PancakeSwap NFTs from the mind of Chef Cecy Meade. Join the squad.',
    box: '/videos/common.mp4',
  },
  legendary: {
    id: 1,
    name: 'legendary box',
    desc: '10,000 unique, randomly-generated PancakeSwap NFTs from the mind of Chef Cecy Meade. Join the squad.',
    box: '/videos/common.mp4',
  },
  epic: {
    id: 2,
    name: 'epic box',
    desc: '10,000 unique, randomly-generated PancakeSwap NFTs from the mind of Chef Cecy Meade. Join the squad.',
    box: '/videos/common.mp4',
  },
  mother: {
    id: 0,
    name: 'mother box',
    desc: '10,000 unique, randomly-generated PancakeSwap NFTs from the mind of Chef Cecy Meade. Join the squad.',
    box: '/videos/common.mp4',
  },
}

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  ${Text} {
    margin-left: 8px;
  }
`

export const TwoColumnsContainer = styled(Flex)`
  gap: 22px;
  align-items: flex-start;
  & > div:first-child {
    flex: 1;
    gap: 20px;
  }
  & > div:last-child {
    flex: 2;
  }
`

export default Box