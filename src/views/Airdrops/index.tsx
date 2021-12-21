import React from 'react'
import styled from 'styled-components'
import { Flex } from '@mexi/uikit'
// import { useWeb3React } from '@web3-react/core'
import mefiBoxUrl from './images/airdropic1.png'
import Rectangle41Url from './images/Rectangle41.png'
import LOGOUrl from './images/logo.png'
import Ellipse7OUrl from './images/Ellipse7.png'
import Vector3Url from './images/Vector3.png'

const BoxesStyed = styled.div`
  background: #e9f2f6;
  background-size: cover;
  .airdrop-card {
    border-radius: 10px;
    background: url(${mefiBoxUrl});
    width: 650px;
    height: 285px;
    margin: 20px 0;
    position: relative;
    .info {
      background: url(${Rectangle41Url});
      height: 80px;
      width: 100%;
      position: absolute;
      bottom: 0;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      .info-content {
        height: 100%;
        position: relative;
        .logo {
          margin-left: 10px;
          position: absolute;
          top: 20%;
          color: #fff;
          img {
            height: 45px;
            position: absolute;
            top: 15%;
          }
        }
        .content {
          margin-left: 60px;
          position: absolute;
          top: 30%;
          color: #fff;
        }
      }
    }
  }
  .mefi-box {
    margin-top: 32px;
  }
`
const ButtonStyled = styled.div`
  width: 117px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-weight: bold;
  background-image: url(${Vector3Url});
  cursor: pointer;
`
const Boxes: React.FC = () => {
  // const { account } = useWeb3React()

  return (
    <BoxesStyed>
      <Flex flexDirection="column" alignItems="center">
        <div className="airdrop-card">
          <div className="info">
            <Flex className="info-content" mb="8px">
              <div className="logo" style={{ width: 80 }}>
                <img alt="logo" src={LOGOUrl} />
              </div>
              <div style={{ position: 'relative', width: '60%' }}>
                <div className="content">
                  <h6>Metaxiz Airdrop</h6>
                  <span>$500 Worth of Mexi to 100 luky winners</span>
                </div>
              </div>
              <div style={{ position: 'relative', width: '20%' }}>
                <div style={{ position: 'absolute', top: '40%', color: '#fff' }}>
                  <img style={{ width: 6, height: 6 }} alt="logo" src={Ellipse7OUrl} />
                  <span style={{ paddingLeft: 10 }}>End in 4 days</span>
                </div>
              </div>
              <div style={{ position: 'relative', width: '20%' }}>
                <div style={{ position: 'absolute', top: '30%', color: '#fff' }}>
                  <ButtonStyled>JOIN NOW</ButtonStyled>
                </div>
              </div>
            </Flex>
          </div>
        </div>
      </Flex>
    </BoxesStyed>
  )
}

export default Boxes
