import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router'
import { Text } from '@metaxiz/uikit'
import { Collection } from 'state/nftMarket/types'
import { formatNumber } from 'utils/formatBalance'
import { useTranslation } from 'contexts/Localization'
import { useERC721, useNftMarketContract } from 'hooks/useContract'
import MarketPageHeader from '../components/MarketPageHeader'
import MarketPageTitle from '../components/MarketPageTitle'
import StatBox, { StatBoxItem } from '../components/StatBox'
import BannerHeader from '../components/BannerHeader'
import AvatarImage from '../components/BannerHeader/AvatarImage'
import { nftsBaseUrl } from '../constants'
import TopBar from './TopBar'
import LowestPriceStatBoxItem from './LowestPriceStatBoxItem'

interface HeaderProps {
  collection: Collection
}

const Header: React.FC<HeaderProps> = ({ collection }) => {
  const { collectionAddress } = useParams<{ collectionAddress: string }>()
  const { totalVolumeBNB, banner, avatar } = collection
  const nftMarketContract = useNftMarketContract()
  const nftContract = useERC721(collectionAddress)
  const { t } = useTranslation()

  const [totalSupply, setTotalSupply] = useState(0)
  const [numberTokensListed, setNumberTokensListed] = useState(0)
  
  useEffect(() => {
    nftContract.totalSupply().then(setTotalSupply)
    nftMarketContract.totalOrderCollection(collectionAddress).then(setNumberTokensListed)
  }, [nftContract, nftMarketContract, collectionAddress])

  const volume = totalVolumeBNB
    ? parseFloat(totalVolumeBNB).toLocaleString(undefined, {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      })
    : '0'

  return (
    <>
      <MarketPageHeader>
        <TopBar />
        <BannerHeader bannerImage={banner.large} avatar={<AvatarImage src={avatar} />} />
        <MarketPageTitle
          title={collection.name}
          description={collection.description ? <Text color="textSubtle">{t(collection.description)}</Text> : null}
        >
          <StatBox>
            <StatBoxItem title={t('Items')} stat={formatNumber(Number(totalSupply), 0, 0)} />
            <StatBoxItem
              title={t('Items listed')}
              stat={numberTokensListed ? formatNumber(Number(numberTokensListed), 0, 0) : '0'}
            />
            <LowestPriceStatBoxItem collectionAddress={collection.address} />
            <StatBoxItem title={t('Vol. (%symbol%)', { symbol: 'BNB' })} stat={volume} />
          </StatBox>
        </MarketPageTitle>
      </MarketPageHeader>
      {/* <Container>
        <BaseSubMenu items={itemsConfig} activeItem={`${pathname}${hash || '#items'}`} mt="24px" mb="8px" />
      </Container> */}
    </>
  )
}

export default Header
