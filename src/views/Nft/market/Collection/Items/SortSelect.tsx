import React from 'react'
import styled from 'styled-components'
import { Flex } from '@metaxiz/uikit'
import { OptionProps } from 'components/Select/Select'
import { useTranslation } from 'contexts/Localization'
import { useAppDispatch } from 'state'
import { setOrdering } from 'state/nftMarket/reducer'
import { useGetNftOrdering } from 'state/nftMarket/hooks'

interface FilterProps {
  isActive?: boolean
  onClick?: () => void
}

const StyledFilter = styled.div<FilterProps>`
  background: ${({ isActive }) => (isActive ? '#24a5af' : '#4AC7D5')};
  color: white;
  padding: 8px 12px;
  margin-left: 8px;
  white-space: nowrap;
  border-radius: 8px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
`

const SortSelect: React.FC<{ collectionAddress: string }> = ({ collectionAddress }) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const selectedOrder = useGetNftOrdering(collectionAddress)
  const handleChange = (newOption: OptionProps) => {
    const { field, direction } = newOption.value
    dispatch(setOrdering({ collection: collectionAddress, field, direction }))
  }

  const sortByItems = [
    { label: t('Recently listed'), value: { field: 'updatedAt', direction: 'desc' } },
    { label: t('Lowest price'), value: { field: 'currentAskPrice', direction: 'asc' } },
    { label: t('Highest price'), value: { field: 'currentAskPrice', direction: 'desc' } },
    { label: t('Token ID'), value: { field: 'tokenId', direction: 'asc' } },
  ]

  // const defaultOptionIndex = sortByItems.findIndex(
  //   (option) => option.value.field === selectedOrder.field && option.value.direction === selectedOrder.direction,
  // )

  // return (
  //   <Select
  //     options={sortByItems}
  //     onOptionChange={handleChange}
  //     defaultOptionIndex={defaultOptionIndex !== -1 ? defaultOptionIndex : undefined}
  //   />
  // )

  return (
    <Flex flex="wrap" justifyContent="flex-end" width="100%">
      {sortByItems.map((item) => (
        <StyledFilter
          isActive={selectedOrder.field === item.value.field && selectedOrder.direction === item.value.direction}
          onClick={() => handleChange(item)}
        >
          {item.label}
        </StyledFilter>
      ))}
    </Flex>
  )
}

export default SortSelect
