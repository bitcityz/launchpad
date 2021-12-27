import React from 'react'
import styled, { keyframes } from 'styled-components'
import PanIcon from './mexi.png'
// import PancakeIcon from "./PancakeIcon";
import { SpinnerProps } from './types'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const float = keyframes`
	0% {
		transform: translatey(0px);
	}
	50% {
		transform: translatey(10px);
	}
	100% {
		transform: translatey(0px);
	}
`

const Container = styled.div`
  position: relative;
`

// const RotatingPancakeIcon = styled(PancakeIcon)`
//   position: absolute;
//   top: 0;
//   left: 0;
//   animation: ${rotate} 2s linear infinite;
//   transform: translate3d(0, 0, 0);
// `;

const FloatingPanIcon = styled.img`
  -webkit-animation: spin 4s linear infinite;
  -moz-animation: spin 4s linear infinite;
  animation: spin 4s linear infinite;
`

const Spinner: React.FC<SpinnerProps> = ({ size = 128 }) => {
  return (
    <Container>
      {/* <RotatingPancakeIcon width={`${size * 0.5}px`} /> */}
      <FloatingPanIcon src={PanIcon} width={`${size}px`} />
    </Container>
  )
}

export default Spinner
