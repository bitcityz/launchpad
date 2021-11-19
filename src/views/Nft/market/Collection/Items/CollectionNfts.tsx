import React, { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import uniqBy from 'lodash/uniqBy'
import { AutoRenewIcon, Button, Flex, Grid, Text } from '@metaxiz/uikit'
import { useAppDispatch } from 'state'
import {
  useGetNftFilterLoadingState,
  useGetNftOrdering,
  useGetNftShowOnlyOnSale,
  useNftsFromCollection,
} from 'state/nftMarket/hooks'
import COLLECTIONS from 'config/constants/collections'
import { Collection, NftFilterLoadingState, NftToken, TokenMarketData } from 'state/nftMarket/types'
import { fetchNftsFromCollections } from 'state/nftMarket/reducer'
// import { getNftApi, getNftsMarketData } from 'state/nftMarket/helpers'
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
  const collectionNfts = useNftsFromCollection(collectionAddress)
  const nftFilterLoadingState = useGetNftFilterLoadingState(collectionAddress)
  const dispatch = useAppDispatch()

  const showOnlyNftsOnSale = useGetNftShowOnlyOnSale(collectionAddress)
  const { field: orderField, direction: orderDirection } = useGetNftOrdering(collectionAddress)
  const isFetching =
    orderField === 'tokenId' ? nftFilterLoadingState === NftFilterLoadingState.LOADING : isFetchingFilteredNfts

  const handleLoadMore = () => {
    // if (orderField === 'tokenId') {
    //   setPage((prevPage) => prevPage + 1)
    // }
    setPage((prevPage) => prevPage + REQUEST_SIZE)
    setSkip(skip + REQUEST_SIZE)
  }

  useEffect(() => {
    if (orderField === 'tokenId') {
      setPage(1)
    }
  }, [orderField])

  useEffect(() => {
    setNfts([])
    // setSkip(0)
  }, [orderField, orderDirection])

  useEffect(() => {
    const fetchMarket = async () => {
      const { tokenIds, askInfo } = await nftMarketContract.viewAsksByCollection(collectionAddress, page, skip)
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
        const nftMap = {}

        combinedNfts.forEach(nft => {
          if (nftMap[nft.hash]) {
            nftMap[nft.hash].count ++
            return
          }
          nftMap[nft.hash] = nft
        })
        return Object.values(nftMap)
      })
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

  useEffect(() => {
    if (orderField === 'tokenId') {
      dispatch(
        fetchNftsFromCollections({
          collectionAddress,
          page,
          size: REQUEST_SIZE,
        }),
      )
    }
  }, [page, collectionAddress, dispatch, orderField])

  const nftsToShow =
    orderField === 'tokenId'
      ? collectionNfts?.filter((nft) => {
          if (showOnlyNftsOnSale) {
            return nft.marketData?.isTradable
          }
          return true
        })
      : nfts

  if (!nftsToShow || nftsToShow?.length === 0) {
    return <GridPlaceholder />
  }

  const isNotLastPage =
    showOnlyNftsOnSale || orderField !== 'tokenId'
      ? nftsToShow?.length < Number(numberTokensListed)
      : nftsToShow?.length < Number(totalSupply)

  const resultsAmount = showOnlyNftsOnSale || orderField !== 'tokenId' ? numberTokensListed : totalSupply

  return (
    <>
      <Flex p="16px">
        <Text bold>
          {resultsAmount} {t('Results')}
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
