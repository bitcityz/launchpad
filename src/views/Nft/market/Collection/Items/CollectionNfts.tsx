import React, { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import orderBy from 'lodash/orderBy'
import { AutoRenewIcon, Button, Flex, Grid, Text } from '@metaxiz/uikit'
import {
  useGetNftFilterLoadingState,
  useGetNftOrdering,
  useGetNftShowOnlyOnSale,
} from 'state/nftMarket/hooks'
import COLLECTIONS from 'config/constants/collections'
import { Collection, NftFilterLoadingState, NftToken } from 'state/nftMarket/types'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import { useERC721, useNftMarketContract } from 'hooks/useContract'
import { useTranslation } from 'contexts/Localization'
import GridPlaceholder from '../../components/GridPlaceholder'
import { CollectibleLinkCard } from '../../components/CollectibleCard'
import { REQUEST_SIZE } from '../config'

interface CollectionNftsProps {
  collection: Collection
}

const CollectionNfts: React.FC<CollectionNftsProps> = ({ collection }) => {
  const { totalSupply, numberTokensListed, address: collectionAddress } = collection
  const [page, setPage] = useState(0)
  const [skip, setSkip] = useState(REQUEST_SIZE)
  const [nfts, setNfts] = useState<NftToken[]>([])
  const [isFetchingFilteredNfts, setIsFetchingFilteredNfts] = useState(false)
  const { t } = useTranslation()
  const nftMarketContract = useNftMarketContract()
  const collectionContract = useERC721(collectionAddress)
  const nftFilterLoadingState = useGetNftFilterLoadingState(collectionAddress)
  const [isLoading, setIsLoading] = useState(false)

  const showOnlyNftsOnSale = useGetNftShowOnlyOnSale(collectionAddress)
  const { field: orderField, direction: orderDirection } = useGetNftOrdering(collectionAddress)
  const isFetching =
    orderField === 'tokenId' ? nftFilterLoadingState === NftFilterLoadingState.LOADING : isFetchingFilteredNfts

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + REQUEST_SIZE)
  }

  useEffect(() => {
    setNfts([])
    // setSkip(0)
  }, [orderField, orderDirection])

  useEffect(() => {
    const fetchMarket = async () => {
      setIsLoading(true)
      const asked = await nftMarketContract.viewAsksByCollection(collectionAddress, page, skip)
      if (!asked) {
        setIsLoading(false)
        return
      }
      const { tokenIds, askInfo } = asked
      const baseURI = await collectionContract.baseURI()
      const apiRequestPromises: Promise<NftToken>[] = tokenIds.map(async (tokenId): Promise<NftToken> => {
        const hash = await collectionContract.tokenHash(tokenId.toNumber())
        const res = await fetch(`${baseURI}${hash}`)
        if (res.ok) {
          const json = await res.json()
          return {
            ...json,
            hash
          }
        }
        return {
          tokenId: '',
          image: {
            original: '',
            thumbnail: ''
          },
          name: '',
          description: '',
          collectionName: '',
          collectionAddress: ''
        }
      })
      const nftsDetails = await Promise.all(apiRequestPromises)
      const marketData = tokenIds.map((tokenId, index) => {
        return {
          collection: {
            id: COLLECTIONS[collectionAddress].id
          },
          collectionAddress,
          tokenId: tokenId.toNumber(),
          collectionName: COLLECTIONS[collectionAddress].name,
          image: {
            thumbnail: nftsDetails[index].image
          },
          count: 1,
          hash: nftsDetails[index].hash,
          marketData: {
            collection: {
              id: collectionAddress
            },
            isTradable: true,
            tokenId: new BigNumber(tokenId._hex).toString(),
            currentAskPrice: new BigNumber(askInfo[index].price._hex).div(DEFAULT_TOKEN_DECIMAL).toString()
          }
        }
      })
      setIsFetchingFilteredNfts(false)

      setNfts((prevState) => {
        const combinedNfts = [...prevState, ...marketData]
        const key = `marketData.${orderField}`
        return orderBy(combinedNfts, key, orderDirection)
      })
      setIsLoading(false)
    }

    if (nftMarketContract) {
      fetchMarket()
    }
    // const fetchApiData = async (marketData: TokenMarketData[]) => {
    //   const apiRequestPromises = marketData.map((marketNft) => getNftApi(collectionAddress, marketNft.tokenId))
    //   const apiResponses = await Promise.all(apiRequestPromises)
    //   const responsesWithMarketData = apiResponses.map((apiNft, i) => {
    //     return {
    //       ...apiNft,
    //       collectionAddress,
    //       collectionName: apiNft.collection.name,
    //       marketData: marketData[i],
    //     }
    //   })
    //   setIsFetchingFilteredNfts(false)
    //   setNfts((prevState) => {
    //     const combinedNfts = [...prevState, ...responsesWithMarketData]
    //     return uniqBy(combinedNfts, 'tokenId')
    //   })
    // }

    // const fetchMarketData = async () => {
    //   const subgraphRes = await getNftsMarketData(
    //     { collection: collectionAddress.toLowerCase(), isTradable: true },
    //     REQUEST_SIZE,
    //     orderField,
    //     orderDirection,
    //     skip,
    //   )
    //   fetchApiData(subgraphRes)
    // }

    // if (orderField !== 'tokenId') {
    //   // Query by tokenId is handled in useEffect below since we in this case
    //   // we need to show all NFTs, even those that never been on sale (i.e. they are not in subgraph)
    //   setIsFetchingFilteredNfts(true)
    //   fetchMarketData()
    // }
  }, [orderField, orderDirection, skip, collectionAddress, nftMarketContract, collectionContract, page])

  // useEffect(() => {
  //   if (orderField === 'tokenId') {
  //     dispatch(
  //       fetchNftsFromCollections({
  //         collectionAddress,
  //         page,
  //         size: REQUEST_SIZE,
  //       }),
  //     )
  //   }
  // }, [page, collectionAddress, dispatch, orderField])

  const nftsToShow = nfts
  if (isLoading) {
    return <GridPlaceholder />
  }
  if (!nftsToShow || nftsToShow?.length === 0) {
    return <Text>No order yet!</Text>
  }

  const isNotLastPage =
    showOnlyNftsOnSale || orderField !== 'tokenId'
      ? nftsToShow?.length < Number(numberTokensListed)
      : nftsToShow?.length < Number(totalSupply)

  return (
    <>
      <Flex p="16px">
        <Text bold>
          {nftsToShow.length} {t('Results')}
        </Text>
      </Flex>
      <Grid
        gridGap="16px"
        gridTemplateColumns={['1fr', null, 'repeat(3, 1fr)', null, 'repeat(4, 1fr)']}
        alignItems="start"
      >
        {nftsToShow.map((nft) => {
          const currentAskPriceAsNumber = nft.marketData && parseFloat(nft.marketData.currentAskPrice)

          return (
            <CollectibleLinkCard
              key={nft.tokenId}
              nft={nft}
              currentAskPrice={currentAskPriceAsNumber > 0 ? currentAskPriceAsNumber : undefined}
            />
          )
        })}
      </Grid>
      <Flex mt="60px" mb="12px" justifyContent="center">
        {isNotLastPage && (
          <Button
            onClick={handleLoadMore}
            scale="sm"
            endIcon={isFetching ? <AutoRenewIcon spin color="currentColor" /> : undefined}
          >
            {isFetching ? t('Loading') : t('Load more')}
          </Button>
        )}
      </Flex>
    </>
  )
}

export default CollectionNfts
