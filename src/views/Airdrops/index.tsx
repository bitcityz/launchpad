import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Flex, Button, Text, MetamaskIcon } from '@mexi/uikit'
import { useWeb3React } from '@web3-react/core'
import Page from 'components/Layout/Page'
import tokens from 'config/constants/tokens'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { BASE_API_URL, DEFAULT_TOKEN_DECIMAL } from 'config'
import { useAirDropContract } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import { registerToken } from 'utils/wallet'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import backgroundUrl from './images/background-airdrop.png'

// IMAGES
import BannerSrc from './images/banner.svg'
import LogoSrc from './images/mexi.svg'

const StyledPage = styled(Page)`
  .banner {
    border-radius: 12px;
    display: none;
  }
  .contents {
    bottom: 0;
    width: 100%;
    height: 80vh;
    background: #1d15369e;
    padding: 16px;
    display: flex;
    border-radius: 12px 12px;
    align-items: center;
    flex-direction: column;
    justify-content: space-evenly;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    .contents {
      height: auto;
      border-radius: 0 0 12px 12px;
      position: absolute;
      flex-direction: row;
      justify-content: space-between;
    }
    .banner {
      display: block;
    }
    img {
      display: block;
    }
  }
`

const AirdropWrapper = styled.div`
  background-image: url(${backgroundUrl});
  background-size: cover;
  background-repeat: no-repeat;
  margin-top: -49px;
  background-position: bottom center;
`

const Boxes: React.FC = () => {
  const { account } = useWeb3React()
  const { toastError } = useToast()
  const airDropContract = useAirDropContract()
  const oldAirDropContract = useAirDropContract('0xcDF58F490f79AF8D0eee87cC19C703a903EB4ff9')
  const { callWithGasPrice } = useCallWithGasPrice()
  const [isClaimed, setIsClaimed] = useState()
  const [isOldClaimed, setIsOldClaimed] = useState()
  const [claimAbleAmount, setClaimAbleAmount] = useState(new BigNumber(0))
  const [isLoading, setIsLoading] = useState(false)

  const authorization = localStorage.getItem('token')

  useEffect(() => {
    if (account) {
      airDropContract.isClaimed(account).then(setIsClaimed)
      oldAirDropContract.isClaimed(account).then(setIsOldClaimed)
      airDropContract
        .claimAmount()
        .then((res) => setClaimAbleAmount(new BigNumber(res._hex).div(DEFAULT_TOKEN_DECIMAL)))
    }
  }, [airDropContract, account, oldAirDropContract])

  const handleClaim = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await fetch(`${BASE_API_URL}/user/signature-claim-airdrop`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization,
        },
      })
      const data = await res.json()
      if (res.ok) {
        const tx = await callWithGasPrice(airDropContract, 'claim', [
          data.id,
          account,
          data.sign.v,
          data.sign.r,
          data.sign.s,
        ]).catch((err) => {
          throw err.data
        })
        await tx.wait()

        setIsLoading(false)
      } else {
        toastError('Error', data.message)
        setIsLoading(false)
      }
    } catch (error: any) {
      toastError('Error', error.message)
    }
  }, [toastError, account, airDropContract, callWithGasPrice, authorization])

  const isMetaMaskInScope = !!window.ethereum?.isMetaMask
  const disabled = isOldClaimed || isClaimed || isLoading || !authorization
  return (
    <AirdropWrapper>
      <StyledPage>
        <Flex flexDirection="column" alignItems="center" style={{ position: 'relative' }}>
          <img className="banner" src={BannerSrc} alt="banner" />
          <Flex className="contents">
            <Flex>
              <img className="logo" src={LogoSrc} alt="logo" />
              <Flex flexDirection="column" ml="32px">
                <Text fontWeight="bold" fontSize="22px" color="white">
                  Metaxiz Airdrop
                </Text>
                <Text color="white">Amount: {claimAbleAmount.toNumber().toLocaleString()}</Text>
              </Flex>
            </Flex>
            <Flex flexDirection="column">
              {account && isMetaMaskInScope && (
                <Button
                  mb="16px"
                  variant="text"
                  p="0"
                  height="auto"
                  onClick={() => registerToken(tokens.mexi.address, 'MEXI', 18)}
                >
                  <Text color="white">Add to Metamask</Text>
                  <MetamaskIcon ml="4px" />
                </Button>
              )}

              {account ? (
                <Button
                  style={{ background: disabled ? '#E9EAEB' : 'linear-gradient(#9A38FF,#696FFF)' }}
                  onClick={handleClaim}
                  disabled={disabled}
                >
                  {isLoading ? 'Claiming...' : 'Claim Airdrop'}
                </Button>
              ) : (
                <ConnectWalletButton />
              )}
            </Flex>
          </Flex>
        </Flex>
      </StyledPage>
    </AirdropWrapper>
  )
}

export default Boxes
