import React from 'react'
import { useParams } from 'react-router'
import IndividualNFTPage from './OneOfAKindNftPage'

const IndividualNFTPageRouter = () => {
  const { collectionAddress, tokenId } = useParams<{ collectionAddress: string; tokenId: string }>()

  return <IndividualNFTPage collectionAddress={collectionAddress} tokenId={tokenId} />
}

export default IndividualNFTPageRouter
