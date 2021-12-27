import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { DEFAULT_TOKEN_DECIMAL, DEAD_SELLER } from 'config'
import { Flex } from '@mexi/uikit'
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
import ForSaleTableCard from './ForSaleTableCard'
import MoreFromThisCollection from '../shared/MoreFromThisCollection'

interface IndividualNFTPageProps {
  collectionAddress: string
  tokenId: string
}

const LIMIT = 10

const IndividualNFTPage: React.FC<IndividualNFTPageProps> = ({ collectionAddress, tokenId }) => {
  const [nft, setNft] = useState<NftToken>(null)
  const [page, setPage] = useState(0)
  const [totalOrder, setTotalOrders] = useState(0)
  const [nftsOnCurrentPage, setNftsOnCurrentPage] = useState<NftToken[]>([])
  const [isOwnNft, setIsOwnNft] = useState(false)
  const nftMarketContract = useNftMarketContract()
  const nftContract = useERC721(collectionAddress)
  const [baseURI, setBaseURI] = useState('')

  // const { data: distributionData, isFetching: isFetchingDistribution } = useGetCollectionDistribution(collectionAddress)

  const { account } = useWeb3React()

  const handleLoadMore = () => {
    setPage((prevState) => prevState + 1)
  }

  const { userNftsInitializationState, nfts: userNfts } = useUserNfts()
  useFetchUserNfts()
  useEffect(() => {
    nftContract.baseURI().then(setBaseURI)
  }, [nftContract])
  useEffect(() => {
    const fetchNftData = async () => {
      const owner = await nftContract.ownerOf(tokenId)
      const checkedMarket = await nftMarketContract._askDetails(collectionAddress, tokenId)

      const { price, seller } = checkedMarket
      const foundInMarket = DEAD_SELLER !== seller
      if (seller === account || owner === account) {
        setIsOwnNft(true)
      } else {
        setIsOwnNft(false)
      }
      const metadata = await getNftApi(collectionAddress, tokenId)
      nftMarketContract.totalOrderPerhash(metadata.hash).then(setTotalOrders)
      if (checkedMarket) {
        setNft({
          tokenId,
          collectionAddress,
          collectionName: metadata.collection.name,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
          attributes: metadata.attributes,
          hash: metadata.hash,
          location: foundInMarket ? NftLocation.FORSALE : NftLocation.PROFILE,
          marketData: {
            currentAskPrice: foundInMarket
              ? new BigNumber(price._hex).div(DEFAULT_TOKEN_DECIMAL).toString()
              : undefined,
            tokenId,
            currentSeller: seller,
            latestTradedPriceInBNB: '0',
            tradeVolumeBNB: '0',
            metadataUrl: '',
            totalTrades: '0',
            isTradable: foundInMarket,
            otherId: '56',
          },
        })
      }
    }

    if (account) {
      fetchNftData()
    }
  }, [userNfts, collectionAddress, tokenId, userNftsInitializationState, account, nftMarketContract, nftContract])

  useEffect(() => {
    const fetchNftData = async () => {
      const foundInMarket = await nftMarketContract.viewAsksByCollectionAndHash(
        collectionAddress,
        nft.hash,
        page * LIMIT,
        LIMIT,
      )
      const marketDataForSaleNfts = foundInMarket.askInfo.map((ask, index) => {
        return {
          tokenId: new BigNumber(foundInMarket.tokenIds[index]._hex).toString(),
          collectionAddress,
          collectionName: '',
          name: '',
          description: '',
          image: '',
          attributes: [],
          hash: nft.hash,
          location: foundInMarket ? NftLocation.FORSALE : NftLocation.PROFILE,
          marketData: {
            collection: {
              id: collectionAddress,
            },
            isTradable: true,
            tokenId: new BigNumber(foundInMarket.tokenIds[index]._hex).toString(),
            currentAskPrice: new BigNumber(ask.price._hex).div(DEFAULT_TOKEN_DECIMAL).toString(),
            currentSeller: ask.seller,
          },
        }
      })
      setNftsOnCurrentPage(marketDataForSaleNfts)
    }
    if (nft) {
      fetchNftData()
    }
  }, [nft, collectionAddress, nftMarketContract, page])

  if (!nft) {
    // TODO redirect to nft market page if collection or bunny id does not exist (came here from some bad url)
    // That would require tracking loading states and stuff...

    // For now this if is used to show loading spinner while we're getting the data
    return <PageLoader />
  }

  const properties = nft.attributes

  const userProfilePicture = userNfts.find((userNft) => userNft.location === NftLocation.PROFILE)
  const nftIsProfilePic = userProfilePicture
    ? nft.tokenId === userProfilePicture.tokenId && nft.collectionAddress === userProfilePicture.collectionAddress
    : false

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
          {properties
            ? Object.keys(properties).map((key) => {
                return <PropertiesCard key={key} title={key} properties={properties[key]} />
              })
            : null}
          <DetailsCard contractAddress={collectionAddress} ipfsLink={baseURI + nft.hash} />
        </Flex>
        <ForSaleTableCard
          isFetchingMoreNfts={false}
          loadMore={handleLoadMore}
          totalForSale={totalOrder}
          nftsForSale={nftsOnCurrentPage}
        />
        {/* <OwnerCard nft={nft} isOwnNft={isOwnNft} nftIsProfilePic={nftIsProfilePic} /> */}
      </TwoColumnsContainer>
      <MoreFromThisCollection collectionAddress={collectionAddress} currentTokenName={nft.name} />
    </Page>
  )
}

export default IndividualNFTPage
