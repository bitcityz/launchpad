import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Flex, Button, Text } from '@mexi/uikit'
import { useWeb3React } from '@web3-react/core'
import Page from 'components/Layout/Page'
import { BASE_API_URL, DEFAULT_TOKEN_DECIMAL } from 'config'
import { useAirDropContract } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import usePrevious from 'hooks/usePreviousValue'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import mefiBoxUrl from './images/airdropic1.png'

const StyedPage = styled(Page)`
  background-img: url(${mefiBoxUrl});
  background-size: cover;
  .airdrop-card {
    border-radius: 10px;
    width: 650px;
    height: 285px;
    margin: 20px 0;
    position: relative;
  }
  .mefi-box {
    margin-top: 32px;
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
  const prevAccount = usePrevious(account)
  useEffect(() => {
    if (account) {
      airDropContract.isClaimed(account).then(setIsClaimed)
      airDropContract
        .claimAmount()
        .then((res) => setClaimAbleAmount(new BigNumber(res._hex).div(DEFAULT_TOKEN_DECIMAL)))
    }
  }, [airDropContract, account])

  useEffect(() => {
    if (prevAccount && account && prevAccount !== account) {
      localStorage.removeItem('token')
    }
  }, [account, prevAccount])

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
      <Flex flexDirection="column" alignItems="center">
        <Text>Airdrop amount: {claimAbleAmount.toString()}</Text>
        <Button onClick={handleClaim} disabled={isClaimed || isLoading || !authorization}>
          {isLoading ? 'Claiming...' : 'Claim airdrop'}
        </Button>
      </Flex>
    </StyedPage>
  )
}

export default Boxes
