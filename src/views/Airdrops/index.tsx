import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Flex, Button, Text } from '@mexi/uikit'
import { useWeb3React } from '@web3-react/core'
import Page from 'components/Layout/Page'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { BASE_API_URL, DEFAULT_TOKEN_DECIMAL } from 'config'
import { useAirDropContract } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'

// IMAGES
import BannerSrc from './images/banner.svg'
import LogoSrc from './images/mexi.svg'

const StyedPage = styled(Page)`
  .banner {
    border-radius: 12px;
  }
  .contents {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: #1d15369e;
    padding: 16px;
    display: flex;
    border-radius: 0 0 12px 12px;
    justify-content: space-between;
    align-items: center;
  }
`

const Boxes: React.FC = () => {
  const { account } = useWeb3React()
  const { toastError } = useToast()
  const airDropContract = useAirDropContract()
  const { callWithGasPrice } = useCallWithGasPrice()
  const [isClaimed, setIsClaimed] = useState()
  const [claimAbleAmount, setClaimAbleAmount] = useState(new BigNumber(0))
  const [isLoading, setIsLoading] = useState(false)

  const authorization = localStorage.getItem('token')

  useEffect(() => {
    if (account) {
      airDropContract.isClaimed(account).then(setIsClaimed)
      airDropContract
        .claimAmount()
        .then((res) => setClaimAbleAmount(new BigNumber(res._hex).div(DEFAULT_TOKEN_DECIMAL)))
    }
  }, [airDropContract, account])

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
  return (
    <StyedPage>
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

          {account ? (
            <Button onClick={handleClaim} disabled={isClaimed || isLoading || !authorization}>
              {isLoading ? 'Claiming...' : 'Claim airdrop'}
            </Button>
          ) : (
            <ConnectWalletButton />
          )}
        </Flex>
      </Flex>
    </StyedPage>
  )
}

export default Boxes
