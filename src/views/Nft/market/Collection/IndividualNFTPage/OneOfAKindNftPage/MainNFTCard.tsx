import React from 'react'
import { Flex, Box, Card, CardBody, Text, Button, BinanceIcon, Skeleton, useModal } from '@mexi/uikit'
import { useTranslation } from 'contexts/Localization'
import { useHistory } from 'react-router-dom'
import { NftToken } from 'state/nftMarket/types'
import { useBNBVsBusdPrice } from 'hooks/useBUSDPrice'
import { getBoxesAddress } from 'utils/addressHelpers'
import useOpenBox from '../../../hooks/useOpenBox'
import useClaim from '../../../hooks/useClaim'
import BuyModal from '../../../components/BuySellModals/BuyModal'
import SellModal from '../../../components/BuySellModals/SellModal'
import { nftsBaseUrl } from '../../../constants'
import { RoundedImage, Container, CollectionLink } from '../shared/styles'

interface MainNFTCardProps {
  nft: NftToken
  isOwnNft: boolean
  nftIsProfilePic: boolean
}

const MainNFTCard: React.FC<MainNFTCardProps> = ({ nft, isOwnNft, nftIsProfilePic }) => {
  const { t } = useTranslation()
  const history = useHistory()
  const bnbBusdPrice = useBNBVsBusdPrice()

  const isBox = nft.collectionAddress === getBoxesAddress()
  const currentAskPriceAsNumber = nft.marketData?.currentAskPrice ? parseFloat(nft.marketData.currentAskPrice) : 0
  const priceInUsd = bnbBusdPrice * currentAskPriceAsNumber
  const [onPresentBuyModal] = useModal(<BuyModal nftToBuy={nft} />)
  const [onPresentSellModal] = useModal(
    <SellModal variant={nft.marketData?.isTradable ? 'edit' : 'sell'} nftToSell={nft} />,
  )
  const { handleOpenBox, newNfts, token, isOpeningBox } = useOpenBox()
  const { isApproving, isApproved, handleApprove } = useClaim(newNfts, token, () => history.push('/profile'))

  const ownerButtons = (
    <Flex flexDirection={['column', 'column', 'row']}>
      <Button
        disabled={nftIsProfilePic}
        minWidth="168px"
        mr="16px"
        width={['100%', null, 'max-content']}
        mt="24px"
        onClick={onPresentSellModal}
      >
        {nft.marketData?.isTradable ? t('Adjust price') : t('List for sale')}
      </Button>
      {isBox ? (
        !isApproved ? (
          <Button
            minWidth="168px"
            mr="16px"
            disabled={isApproving}
            width={['100%', null, 'max-content']}
            mt="24px"
            onClick={handleApprove}
          >
            {isApproving ? 'Loading' : 'Approve'}
          </Button>
        ) : (
          <Button
            disabled={isOpeningBox}
            minWidth="168px"
            mr="16px"
            width={['100%', null, 'max-content']}
            mt="24px"
            onClick={() => handleOpenBox(nft.tokenId)}
          >
            {isOpeningBox ? 'Opening' : 'Open Box'}
          </Button>
        )
      ) : null}
    </Flex>
  )

  return (
    <Card mb="40px">
      <CardBody>
        <Container flexDirection={['column-reverse', null, 'row']}>
          <Flex flex="2">
            <Box>
              <CollectionLink to={`${nftsBaseUrl}/collections/${nft.collectionAddress}`}>
                {nft.collectionName}
              </CollectionLink>
              <Text fontSize="40px" bold mt="12px">
                {nft.name}
              </Text>
              {nft.description && <Text mt={['16px', '16px', '48px']}>{t(nft.description)}</Text>}
              <Text color="textSubtle" mt={['16px', '16px', '48px']}>
                {t('Price')}
              </Text>
              {currentAskPriceAsNumber > 0 ? (
                <Flex alignItems="center" mt="8px">
                  <BinanceIcon width={18} height={18} mr="4px" />
                  <Text fontSize="24px" bold mr="4px">
                    {nft.marketData.currentAskPrice}
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
                <Text>{t('Not for sale')}</Text>
              )}
              {isOwnNft && ownerButtons}
              {!isOwnNft && (
                <Button
                  minWidth="168px"
                  disabled={!nft.marketData?.isTradable}
                  mr="16px"
                  width={['100%', null, 'max-content']}
                  mt="24px"
                  onClick={onPresentBuyModal}
                >
                  {t('Buy')}
                </Button>
              )}
            </Box>
          </Flex>
          <Flex flex="2" justifyContent={['center', null, 'flex-end']} alignItems="center">
            <RoundedImage src={nft.image.thumbnail} width={440} height={440} />
          </Flex>
        </Container>
      </CardBody>
    </Card>
  )
}

export default MainNFTCard
