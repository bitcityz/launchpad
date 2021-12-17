import { Card, CardBody, Flex, Heading, Image, ProfileAvatar } from '@metaxiz/uikit'
import React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

interface HotCollectionCardProps {
  bgSrc: string
  avatarSrc?: string
  collectionName: string
  url?: string
  disabled?: boolean
}

export const CollectionAvatar = styled(ProfileAvatar)`
  left: 0;
  position: absolute;
  top: -32px;
`

const StyledHotCollectionCard = styled(Card)<{ disabled?: boolean }>`
  border-radius: 8px;
  transition: opacity 200ms;

  & > div {
    border-radius: 8px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    ${({ disabled }) =>
      disabled
        ? ''
        : css`
            &:hover {
              cursor: pointer;
              opacity: 0.6;
            }
          `}
  }
`

const StyledImage = styled(Image)`
  img {
    border-radius: 4px;
  }
`

const HotCollectionCard: React.FC<HotCollectionCardProps> = ({
  bgSrc,
  avatarSrc,
  collectionName,
  url,
  disabled,
  children,
}) => {
  const renderBody = () => (
    <CardBody p="0px">
      <CardBody p="8px" pb="0px">
        <StyledImage src={bgSrc} height={125} width={375} />
        <Flex
          position="relative"
          justifyContent="center"
          alignItems="flex-end"
          py="8px"
          flexDirection="column"
        >
          <CollectionAvatar src={avatarSrc} width={96} height={96} />
          <Heading color={disabled ? 'textDisabled' : '#8550FF'} as="h3">
            {collectionName}
          </Heading>
        </Flex>
      </CardBody>
      <Flex height="40px" pr="8px" justifyContent="flex-end" background="#F4F3FF">
        {children}
      </Flex>
    </CardBody>
  )

  return (
    <StyledHotCollectionCard disabled={disabled}>
      {url ? <Link to={url}>{renderBody()}</Link> : <div style={{ cursor: 'default' }}>{renderBody()}</div>}
    </StyledHotCollectionCard>
  )
}

export default HotCollectionCard
