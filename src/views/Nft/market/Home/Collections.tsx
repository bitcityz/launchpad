import React, { useEffect, useState } from 'react'
import { Button, ChevronRightIcon, Flex, Grid, Heading, Text } from '@metaxiz/uikit'
import { Link } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import { nftsBaseUrl } from 'views/Nft/market/constants'
import { useTranslation } from 'contexts/Localization'
import COLLECTIONS from 'config/constants/collections'
import { useNftMarketContract } from 'hooks/useContract'
import { HotCollectionCard } from '../components/CollectibleCard'
import { BNBAmountLabel } from '../components/CollectibleCard/styles'

const Collections = () => {
  const { t } = useTranslation()
  const nftMarketContract = useNftMarketContract()
  const [totalVolumeBNBMap, setTotalVolumeBNBMap] = useState({})

  useEffect(() => {
    Object.keys(COLLECTIONS).forEach((address) => {
      nftMarketContract.volumeCollection(address).then((val) =>
        setTotalVolumeBNBMap((prevState) => ({
          ...prevState,
          [address]: new BigNumber(val._hex).div(DEFAULT_TOKEN_DECIMAL).toNumber(),
        })),
      )
    })
  }, [nftMarketContract])
  return (
    <>
      <Flex alignItems="center" justifyContent="space-between" mb="32px">
        <Heading as="h3" scale="lg">
          {t('Hot Collections')}
        </Heading>
      </Flex>
      <Grid gridGap="16px" gridTemplateColumns={['1fr', '1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} mb="64px">
        {Object.values(COLLECTIONS).map((collection) => {
          return (
            <HotCollectionCard
              key={collection.address}
              bgSrc={collection.banner.small}
              avatarSrc={collection.avatar}
              collectionName={collection.name}
              url={`${nftsBaseUrl}/collections/${collection.address}`}
            >
              <Flex alignItems="center">
                <Text fontSize="12px" color="textSubtle">
                  {t('Volume')}
                </Text>
                <BNBAmountLabel amount={totalVolumeBNBMap[collection.address] || 0} />
              </Flex>
            </HotCollectionCard>
          )
        })}
        <HotCollectionCard
          disabled
          bgSrc="/images/collections/no-collection-banner-sm.png"
          collectionName={t('Coming Soon')}
        >
          <Text color="textDisabled" fontSize="12px">
            {t('More Collections are on their way!')}
          </Text>
        </HotCollectionCard>
      </Grid>
    </>
  )
}

export default Collections
