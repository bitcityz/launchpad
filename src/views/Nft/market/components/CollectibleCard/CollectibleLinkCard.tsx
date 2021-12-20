import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import CardBody from './CardBody'
import { CollectibleCardProps } from './types'
import { nftsBaseUrl } from '../../constants'

const ThumbWrapperOverflow = styled.div`
  overflow: hidden;
  position: relative;
  max-width: 320px;
  transition: opacity 200ms ease 0s;
`

const CardWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: inherit;
`

const CollectibleLinkCard: React.FC<CollectibleCardProps> = ({ nft, nftLocation, currentAskPrice, ...props }) => {

  return (
    <ThumbWrapperOverflow>
      <CardWrapper>
        <Link to={`${nftsBaseUrl}/collections/${nft.collectionAddress}/${nft.tokenId}`}>
          <CardBody nft={nft} nftLocation={nftLocation} currentAskPrice={currentAskPrice} />
        </Link>
      </CardWrapper>
    </ThumbWrapperOverflow>
  )
}

export default CollectibleLinkCard
