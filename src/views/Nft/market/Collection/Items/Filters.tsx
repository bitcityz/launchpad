import React from 'react'
import styled from 'styled-components'
import { Box, Flex, Grid, Text } from '@mexi/uikit'
import capitalize from 'lodash/capitalize'
import isEmpty from 'lodash/isEmpty'
import { useGetNftFilters } from 'state/nftMarket/hooks'
import { Collection, NftAttribute } from 'state/nftMarket/types'
import { useTranslation } from 'contexts/Localization'
import { Item, ListFilter } from 'views/Nft/market/components/Filters'
import useGetCollectionDistribution from '../../hooks/useGetCollectionDistribution'
import ClearAllButton from './ClearAllButton'
import SortSelect from './SortSelect'

interface FiltersProps {
  collection: Collection
}

const GridContainer = styled(Grid)`
  padding: 0 16px;
  grid-gap: 8px 16px;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'filterByTitle .'
    'attributeFilters attributeFilters'
    '. sortByTitle'
    'filterByControls sortByControls';
  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      'filterByTitle . .'
      'attributeFilters attributeFilters attributeFilters'
      '. . sortByTitle'
      'filterByControls . sortByControls';
  }
  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 2fr 5fr 1fr;
    grid-template-areas:
      'filterByTitle . .'
      'filterByControls attributeFilters attributeFilters'
      '. . sortByTitle'
      '. . sortByControls';
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: 1.3fr 5fr 1fr;
    grid-template-areas:
      'filterByTitle . sortByTitle'
      'filterByControls attributeFilters sortByControls';
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    grid-template-columns: 1fr 5fr 1fr;
  }
`

const SortByTitle = styled(Text)`
  grid-area: sortByTitle;
`

const SortByControls = styled(Box)`
  grid-area: sortByControls;
`

const ScrollableFlexContainer = styled(Flex)`
  grid-area: attributeFilters;
  align-items: center;
  flex: 1;
  flex-wrap: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-wrap: wrap;
    overflow-x: revert;
  }
`

const Filters: React.FC<FiltersProps> = ({ collection }) => {
  const { address } = collection
  const { data } = useGetCollectionDistribution()
  const { t } = useTranslation()

  const nftFilters = useGetNftFilters(address)
  const attrsByType: Record<string, NftAttribute[]> = collection?.attributes?.reduce(
    (accum, attr) => ({
      ...accum,
      [attr.traitType]: accum[attr.traitType] ? [...accum[attr.traitType], attr] : [attr],
    }),
    {},
  )
  const uniqueTraitTypes = attrsByType ? Object.keys(attrsByType) : []

  return (
    <Flex mt="8px" justifyContent="flex-end">
      {/* <SortByTitle fontSize="12px" textTransform="uppercase" color="textSubtle" fontWeight={600} mb="4px">
        {t('Sort By')}
      </SortByTitle> */}
      <SortByControls>
        <SortSelect collectionAddress={address} />
      </SortByControls>
      {/* <ScrollableFlexContainer>
        {uniqueTraitTypes.map((traitType) => {
          const attrs = attrsByType[traitType]
          const items: Item[] = attrs.map((attr) => ({
            label: capitalize(attr.value as string),
            count: data && data[traitType] ? data[traitType][attr.value] : undefined,
            attr,
          }))

          return (
            <ListFilter
              key={traitType}
              title={capitalize(traitType)}
              traitType={traitType}
              items={items}
              collectionAddress={address}
            />
          )
        })}
        {!isEmpty(nftFilters) && <ClearAllButton collectionAddress={address} mb="4px" />}
      </ScrollableFlexContainer> */}
    </Flex>
  )
}

export default Filters
