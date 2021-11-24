import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useAppDispatch } from 'state'
import { fetchCollection } from 'state/nftMarket/reducer'
import { useGetCollection } from 'state/nftMarket/hooks'
import COLLECTIONS from 'config/constants/collections'
import Header from '../Header'
import CollectionWrapper from './CollectionWrapper'

const Items = () => {
  const { collectionAddress } = useParams<{ collectionAddress: string }>()
  const collection = COLLECTIONS[collectionAddress]

  // useEffect(() => {
  //   if (address) {
  //     dispatch(fetchCollection(address))
  //   }
  // }, [address, dispatch])

  return (
    <>
      <Header collection={collection} />
      <CollectionWrapper collection={collection} />
    </>
  )
}

export default Items
