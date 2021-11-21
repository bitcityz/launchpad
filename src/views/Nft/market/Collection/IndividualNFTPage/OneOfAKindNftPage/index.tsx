import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import { Flex } from '@metaxiz/uikit'
// import sum from 'lodash/sum'
import BigNumber from 'bignumber.js'
import Page from 'components/Layout/Page'
import { getNftApi } from 'state/nftMarket/helpers'
import { NftLocation, NftToken, UserNftInitializationState } from 'state/nftMarket/types'
import PageLoader from 'components/Loader/PageLoader'
import { useUserNfts } from 'state/nftMarket/hooks'
import { useERC721, useNftMarketContract } from 'hooks/useContract'
import MainNFTCard from './MainNFTCard'
import ManageNFTsCard from './ManageNFTsCard'
import useFetchUserNfts from '../../../Profile/hooks/useFetchUserNfts'
import { TwoColumnsContainer } from '../shared/styles'
import DetailsCard from '../shared/DetailsCard'
import PropertiesCard from '../shared/PropertiesCard'
import OwnerCard from './OwnerCard'
import MoreFromThisCollection from '../shared/MoreFromThisCollection'

interface IndividualNFTPageProps {
  collectionAddress: string
  tokenId: string
}

const IndividualNFTPage: React.FC<IndividualNFTPageProps> = ({ collectionAddress, tokenId }) => {
  const [nft, setNft] = useState<NftToken>(null)
  const [isOwnNft, setIsOwnNft] = useState(false)
  const nftMarketContract = useNftMarketContract()
  const nftContract = useERC721(collectionAddress)
  const [baseURI, setBaseURI] = useState('')

  // const { data: distributionData, isFetching: isFetchingDistribution } = useGetCollectionDistribution(collectionAddress)

  const { account } = useWeb3React()
  
  const { userNftsInitializationState, nfts: userNfts } = useUserNfts()
  useFetchUserNfts()
  useEffect(() => {
    nftContract.baseURI().then(setBaseURI)
  }, [nftContract])
  useEffect(() => {
    const fetchNftData = async () => {
      const { tokenIds, askInfo } = await nftMarketContract.viewAsksByCollection(collectionAddress, 0, 20)
      const foundIndex = tokenIds.findIndex(item => item.toString() === tokenId)
      const foundMarketData = askInfo[foundIndex]

      const metadata = await getNftApi(collectionAddress, tokenId)
      // const [marketData] = await getNftsMarketData({ collection: collectionAddress.toLowerCase(), tokenId }, 1)
      setNft({
        tokenId,
        collectionAddress,
        collectionName: metadata.collection.name,
        name: metadata.name,
        description: metadata.description,
        image: metadata.image,
        attributes: metadata.attributes,
        hash: metadata.hash,
        marketData: {
          currentAskPrice: new BigNumber(foundMarketData.price._hex).div(DEFAULT_TOKEN_DECIMAL).toString(),
          tokenId,
          currentSeller: foundMarketData.seller,
          latestTradedPriceInBNB: '0',
          tradeVolumeBNB: '0',
          metadataUrl: '',
          totalTrades: '0',
          isTradable: true,
          otherId: '56'
        },
      })
    }
    if (userNftsInitializationState === UserNftInitializationState.INITIALIZED) {
      const nftOwnedByConnectedUser = userNfts.find(
        (userNft) =>
          userNft.collectionAddress.toLowerCase() === collectionAddress.toLowerCase() && userNft.tokenId === tokenId,
      )
      if (nftOwnedByConnectedUser) {
        // If user is the owner we already have all needed data available
        setNft(nftOwnedByConnectedUser)
        setIsOwnNft(true)
      } else {
        // reset to defaults
        setIsOwnNft(false)
        // Get metadata and market data separately if connected user is not the owner
        fetchNftData()
      }
    }
    if (!account) {
      fetchNftData()
    }
  }, [userNfts, collectionAddress, tokenId, userNftsInitializationState, account, nftMarketContract])

  if (!nft) {
    // TODO redirect to nft market page if collection or bunny id does not exist (came here from some bad url)
    // That would require tracking loading states and stuff...

    // For now this if is used to show loading spinner while we're getting the data
    return <PageLoader />
  }

  const properties = nft.attributes?.metafight

  const userProfilePicture = userNfts.find((userNft) => userNft.location === NftLocation.PROFILE)
  const nftIsProfilePic = userProfilePicture
    ? nft.tokenId === userProfilePicture.tokenId && nft.collectionAddress === userProfilePicture.collectionAddress
    : false

  // const getAttributesRarity = () => {
  //   if (distributionData && !isFetchingDistribution) {
  //     return Object.keys(distributionData).reduce((rarityMap, traitType) => {
  //       const total = sum(Object.values(distributionData[traitType]))
  //       const nftAttributeValue = nft.attributes.find((attribute) => attribute.traitType === traitType)?.value
  //       const count = distributionData[traitType][nftAttributeValue]
  //       const rarity = (count / total) * 100
  //       return {
  //         ...rarityMap,
  //         [traitType]: rarity,
  //       }
  //     }, {})
  //   }
  //   return {}
  // }

  return (
    <Page>
      <MainNFTCard nft={nft} isOwnNft={isOwnNft} nftIsProfilePic={nftIsProfilePic} />
      <TwoColumnsContainer flexDirection={['column', 'column', 'row']}>
        <Flex flexDirection="column" width="100%">
          <ManageNFTsCard
            nft={nft}
            isOwnNft={isOwnNft}
            isLoading={userNftsInitializationState !== UserNftInitializationState.INITIALIZED}
          />
          {properties ? <PropertiesCard properties={properties} /> : null}
          <DetailsCard contractAddress={collectionAddress} ipfsLink={baseURI + nft.hash} />
        </Flex>
        <OwnerCard nft={nft} isOwnNft={isOwnNft} nftIsProfilePic={nftIsProfilePic} />
      </TwoColumnsContainer>
      <MoreFromThisCollection collectionAddress={collectionAddress} currentTokenName={nft.name} />
    </Page>
  )
}

export default IndividualNFTPage
