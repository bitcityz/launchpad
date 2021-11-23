import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import BigNumber from 'bignumber.js'
import { Text } from '@metaxiz/uikit'
import { Collection } from 'state/nftMarket/types'
import { formatNumber } from 'utils/formatBalance'
import { useTranslation } from 'contexts/Localization'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import { useERC721, useNftMarketContract } from 'hooks/useContract'
import MarketPageHeader from '../components/MarketPageHeader'
import MarketPageTitle from '../components/MarketPageTitle'
import StatBox, { StatBoxItem } from '../components/StatBox'
import BannerHeader from '../components/BannerHeader'
import AvatarImage from '../components/BannerHeader/AvatarImage'
import TopBar from './TopBar'
import LowestPriceStatBoxItem from './LowestPriceStatBoxItem'

interface HeaderProps {
  collection: Collection
}

const Header: React.FC<HeaderProps> = ({ collection }) => {
  const { collectionAddress } = useParams<{ collectionAddress: string }>()
  const { banner, avatar } = collection
  const nftMarketContract = useNftMarketContract()
  const nftContract = useERC721(collectionAddress)
  const { t } = useTranslation()

  const [totalVolumeBNB, setTotalVolumeBNB] = useState('0')
  const [totalVolumeCollectionBNB, setTotalVolumeCollectionBNB] = useState('0')
  const [totalSupply, setTotalSupply] = useState(0)
  const [numberTokensListed, setNumberTokensListed] = useState(0)
  
  useEffect(() => {
    nftContract.totalSupply().then(setTotalSupply)
    nftMarketContract.totalOrderCollection(collectionAddress).then(setNumberTokensListed)
    nftMarketContract.volume().then(val => setTotalVolumeBNB(new BigNumber(val._hex).div(DEFAULT_TOKEN_DECIMAL).toString()))
    nftMarketContract.volumeCollection(collectionAddress).then(val => setTotalVolumeCollectionBNB(new BigNumber(val._hex).div(DEFAULT_TOKEN_DECIMAL).toString()))
  }, [nftContract, nftMarketContract, collectionAddress])

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
            <StatBoxItem title={t('Vol. (%symbol%)', { symbol: 'BNB' })} stat={totalVolumeCollectionBNB} />
            <StatBoxItem title={t('All Vol. (%symbol%)', { symbol: 'BNB' })} stat={totalVolumeBNB} />
          </StatBox>
        </MarketPageTitle>
      </MarketPageHeader>
    </>
  )
}

export default Header
