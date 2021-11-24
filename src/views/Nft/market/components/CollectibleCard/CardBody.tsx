import React from 'react'
import { Box, CardBody, Flex, Text } from '@metaxiz/uikit'
import { useTranslation } from 'contexts/Localization'
import { useBNBVsBusdPrice } from 'hooks/useBUSDPrice'
import PreviewImage from './PreviewImage'
import { CostLabel, MetaRow } from './styles'
import LocationTag from './LocationTag'
import { CollectibleCardProps } from './types'

const CollectibleCardBody: React.FC<CollectibleCardProps> = ({ nft, nftLocation, currentAskPrice, isUserNft }) => {
  const { t } = useTranslation()
  const { name, image } = nft
  const bnbBusdPrice = useBNBVsBusdPrice()

  return (
    <CardBody p="8px">
      <PreviewImage src={image.thumbnail} height={320} width={320} mb="8px" />
      <Flex alignItems="center" justifyContent="space-between">
        {nft.collectionName && (
          <Text fontSize="12px" color="textSubtle" mb="8px">
            {nft.collectionName}
          </Text>
        )}
        {nftLocation && <LocationTag nftLocation={nftLocation} />}
      </Flex>
      <Text as="h4" fontWeight="600" mb="8px">
        {name}
      </Text>
      <Box borderTop="1px solid" borderTopColor="cardBorder" pt="8px">
        {currentAskPrice && (
          <MetaRow title={isUserNft ? t('Your price') : t('Asking price')}>
            <CostLabel cost={currentAskPrice} bnbBusdPrice={bnbBusdPrice} />
          </MetaRow>
        )}
      </Box>
    </CardBody>
  )
}

export default CollectibleCardBody
