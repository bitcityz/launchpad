import React from 'react'

const COLOR_MAP = {
  '3': {
    background: 'linear-gradient(#FFC700, #FFF72B)',
    color: '#6A598D',
    level: 'legendary'
  },
  '2': {
    background: 'linear-gradient(#BD00FF, #FF7EF2)',
    color: 'white',
    level: 'epic'
  },
  '1': {
    background: 'linear-gradient(#5297FF, #65F6FF)',
    color: 'white',
    level: 'rare'
  },
  '0': {
    background: 'linear-gradient(#CDC5FD, #D1F1FF)',
    color: '#412860',
    level: 'common'
  }
}

const CollectionLabel = ({label, rarity}: {label: string, rarity: number}) => {
  if (!rarity) {
    console.log(label)
  }
  const selectedLabel = COLOR_MAP[(rarity || 0).toString()] || {
    background: 'linear-gradient(#FFC700, #FFF72B)',
    color: '#6A598D'
  }
  return (
    <span style={{fontWeight: 'bold', textTransform: 'uppercase', borderRadius: 4, fontSize: 10, color: selectedLabel.color, padding: '4px', width: 'fit-content', background: selectedLabel.background}}>{selectedLabel.level}</span>
  )
}

export default CollectionLabel
