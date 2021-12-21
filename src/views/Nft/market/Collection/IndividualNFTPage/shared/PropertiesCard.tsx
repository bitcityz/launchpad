import React from 'react'
import { Box, Flex, Text, NftIcon } from '@mexi/uikit'
import ExpandableCard from './ExpandableCard'

interface PropertiesCardProps {
  properties: any
  title: string
  // rarity: { [key: string]: number }
}

// Map of known traits to human-readable text
const KNOWN_TRAITS_TEXT = {
  bunnyId: 'Bunny ID',
}

const SingleProperty: React.FC<{ title: string; value: string | number }> = ({
  title,
  value,
  // rarity,
}) => {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Text fontSize="12px" color="textSubtle" bold textTransform="uppercase">
        {KNOWN_TRAITS_TEXT[title] ?? title}
      </Text>
      <Flex alignItems="center">
        <Text bold textTransform="uppercase" mr="4px">
          {value}
        </Text>
        {/* {rarity && (
          <Text small color="textSubtle">
            ({rarity.toFixed(2)}%)
          </Text>
        )} */}
      </Flex>
    </Flex>
  )
}

const PropertiesCard: React.FC<PropertiesCardProps> = ({ properties, title }) => {
  const content = (
    <Box p="24px">
      {/* {properties && properties.map((property) => (
        <SingleProperty key={property.key} title={property.key} value={property.value} />
      ))} */}
    </Box>
  )
  return <ExpandableCard title={title.toUpperCase()} icon={<NftIcon width="24px" height="24px" />} content={content} />
}

export default PropertiesCard
