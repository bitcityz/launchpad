import React from 'react'
import { Box, Flex, Text } from '@mexi/uikit'
import { useTranslation } from 'contexts/Localization'
import { useBNBVsBusdPrice } from 'hooks/useBUSDPrice'
import CollectionLabel from '../CollectionLabel'
import PreviewImage from './PreviewImage'
import { CostLabel, MetaRow } from './styles'
import LocationTag from './LocationTag'
import { CollectibleCardProps } from './types'

const CollectibleCardBody: React.FC<CollectibleCardProps> = ({ nft, nftLocation, currentAskPrice, isUserNft }) => {
  const { t } = useTranslation()
  const { name, image, backgroundColor } = nft
  const bnbBusdPrice = useBNBVsBusdPrice()

  return (
    <Flex flexDirection="column" p="8px">
      <Flex style={{ position: 'relative' }} p="16px" pb="0px">
        <PreviewImage src={image.thumbnail} height={320} width={320} mb="8px" />
        <div
          style={{
            zIndex: -1,
            position: 'absolute',
            top: 0,
            left: 0,
            width: 120,
            height: 120,
            borderRadius: 21,
            background: backgroundColor,
          }}
        />
      </Flex>
      <Flex
        flexDirection="column"
        style={{
          overflow: 'hidden',
          border: '1px solid #C3BED9',
          borderRadius: 12,
          boxShadow: '0px 2px rgb(14 14 44 / 40%)',
        }}
      >
        <Flex flexDirection="column" p="8px 8px">
          {nft.collectionName && <CollectionLabel rarity={nft.rarity} label={nft.collectionName} />}
          {nftLocation && <LocationTag nftLocation={nftLocation} />}
          <Text fontSize="16px" fontWeight="600">
            {name}
          </Text>
        </Flex>
        <Box background="#F4F3FF" p="8px 8px">
          {currentAskPrice && (
            <MetaRow title={isUserNft ? t('Your price') : t('Asking price')}>
              <CostLabel cost={currentAskPrice} bnbBusdPrice={bnbBusdPrice} />
            </MetaRow>
          )}
        </Box>
      </Flex>
    </Flex>
  )
}

export default CollectibleCardBody
