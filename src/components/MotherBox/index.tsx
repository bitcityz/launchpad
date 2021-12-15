import React from 'react'
import styled from 'styled-components'
import { Image, Flex } from '@metaxiz/uikit'


// IMAGES
import BgSrc from './background.png'
import BoxSrc from './box.svg'

const CommonBox: React.FC = () => {
  return (
    <Flex style={{ position: 'relative'}} flex="2" justifyContent={['center', null, 'flex-end']} alignItems="center">
      <RoundedImage src={BgSrc} width={440} height={440} />
      <img style={{ position: 'absolute', margin: "auto", top: 0, left: 0, right: 0, bottom: 0 }} src={BoxSrc} alt="box" />
    </Flex>
  )
}

export const RoundedImage = styled(Image)`
  height: max-content;
  border-radius: ${({ theme }) => theme.radii.default};
  overflow: hidden;
  & > img {
    object-fit: contain;
  }
`

export default CommonBox
