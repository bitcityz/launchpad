import React, { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import orderBy from 'lodash/orderBy'
import uniqBy from 'lodash/uniqBy'
import { AutoRenewIcon, Button, Flex, Grid, Text } from '@metaxiz/uikit'
import { useGetNftFilterLoadingState, useGetNftOrdering, useGetNftShowOnlyOnSale } from 'state/nftMarket/hooks'
import COLLECTIONS from 'config/constants/collections'
import { Collection, NftFilterLoadingState, NftToken } from 'state/nftMarket/types'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import { useERC721, useNftMarketContract } from 'hooks/useContract'
import { useTranslation } from 'contexts/Localization'
import GridPlaceholder from '../../components/GridPlaceholder'
import { CollectibleLinkCard } from '../../components/CollectibleCard'
import { REQUEST_SIZE } from '../config'

const isAbsoluteUrl = (urlString) => urlString.indexOf('http://') === 0 || urlString.indexOf('https://') === 0

interface CollectionNftsProps {
  collection: Collection
}

const CollectionNfts: React.FC<CollectionNftsProps> = ({ collection }) => {
  const { totalSupply, numberTokensListed, address: collectionAddress } = collection
  const [page, setPage] = useState(0)
  const [skip] = useState(REQUEST_SIZE)
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
      const apiRequestPromises: Promise<any>[] = tokenIds.map(async (tokenId): Promise<any> => {
        const hash = await collectionContract.tokenHash(tokenId.toNumber())
        const res = await fetch(`${baseURI}${hash}`)
        if (res.ok) {
          const json = await res.json()
          return {
            ...json,
            hash,
          }
        }
        return {
          tokenId: '',
          image: {
            original: '',
            thumbnail: '',
          },
          name: '',
          description: '',
          collectionName: '',
          collectionAddress: '',
        }
      })
      const nftsDetails = await Promise.all(apiRequestPromises)

      const marketData = tokenIds.map((tokenId, index) => {
        const nftsDetail = nftsDetails[index]

        return {
          collection: {
            id: COLLECTIONS[collectionAddress].id,
          },
          name: nftsDetail.name,
          collectionAddress,
          tokenId: tokenId.toNumber(),
          collectionName: nftsDetail.collector,
          image: {
            thumbnail: isAbsoluteUrl(nftsDetail.image)
              ? nftsDetail.image
              : `https://ipfsgw.metaxiz.com/ipfs/${nftsDetail.image}`,
          },
          backgroundColor: `#${nftsDetail.bg_color}`,
          hash: nftsDetails[index].hash,
          marketData: {
            collection: {
              id: collectionAddress,
            },
            isTradable: true,
            tokenId: new BigNumber(tokenId._hex).toString(),
            currentAskPrice: new BigNumber(askInfo[index].price._hex).div(DEFAULT_TOKEN_DECIMAL).toString(),
          },
        }
      })
      setIsFetchingFilteredNfts(false)

      setNfts((prevState) => {
        const combinedNfts = [...prevState, ...marketData]
        const key = `marketData.${orderField}`
        return orderBy(uniqBy(combinedNfts, 'tokenId'), key, orderDirection)
      })
      setIsLoading(false)
    }

    if (nftMarketContract) {
      fetchMarket()
    }
  }, [orderField, orderDirection, skip, collectionAddress, nftMarketContract, collectionContract, page])

  if (isLoading) {
    return <GridPlaceholder />
  }
  if (!nfts || nfts?.length === 0) {
    return <Text>No order yet!</Text>
  }

  const isNotLastPage =
    showOnlyNftsOnSale || orderField !== 'tokenId'
      ? nfts?.length < Number(numberTokensListed)
      : nfts?.length < Number(totalSupply)

  return (
    <>
      <Flex p="16px">
        <Text bold>
          {nfts.length} {t('Results')}
        </Text>
      </Flex>
      <Grid
        gridGap="32px 16px"
        gridTemplateColumns={['1fr', null, 'repeat(3, 1fr)', null, 'repeat(4, 1fr)']}
        alignItems="start"
      >
        {nfts.map((nft) => {
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
