import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Button, Text, Modal, useModal, InjectedModalProps, Flex, ArrowForwardIcon, ArrowBackIcon } from '@metaxiz/uikit'
import { AutoColumn } from 'components/Layout/Column'
import { useHistory } from 'react-router-dom'
import { useBoxOpenContract, useERC721 } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useToast from 'hooks/useToast'
import { useTranslation } from 'contexts/Localization'
import { getBoxesAddress } from 'utils/addressHelpers'

interface Props extends InjectedModalProps {
  nfts: any[]
  onClaim: () => Promise<any>
  callback?: () => Promise<any>
}

const useClaim = (nfts, token, callback) => {
  const openBoxContract = useBoxOpenContract()
  const [isApproved, setIsApproved] = useState(false)
  const history = useHistory()
  const { account } = useWeb3React()
  const { toastSuccess } = useToast()
  const { t } = useTranslation()

  const [page, setPage] = useState(1)

  const nftContract = useERC721(getBoxesAddress())
  const { callWithGasPrice } = useCallWithGasPrice()

  const OpenedNftsModal: React.FC<Props> = ({ onClaim, onDismiss, nfts: heroes, callback: onClose }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isClaimed, setIsClaimed] = useState(false)
    const hadleOnClick = async() => {
      setIsLoading(true)
      await onClaim()
      setIsClaimed(true)
      setIsLoading(false)
    }
    const hero = heroes[page - 1]
    return (
      <Modal title="Heroes" maxWidth="420px !important" onDismiss={() => {
        onClose()
        onDismiss()
      }}>
        <AutoColumn gap="lg">
          <AutoColumn gap="lg">
            <Flex flexDirection="row">
              <Flex mr="16px" flexDirection="column">
                <img style={{ borderRadius: 8, height: "max-content", marginBottom: 16 }} width="100%" src={`https://ipfsgw.metaxiz.com/ipfs/${hero.image}`} alt="avatar" />
                <PageButtons>
                  <Arrow
                    onClick={() => {
                      setPage(page === 1 ? page : page - 1)
                    }}
                  >
                    <ArrowBackIcon color={page === 1 ? 'textDisabled' : 'primary'} />
                  </Arrow>

                  <Text>{t('Hero %page% of %maxPage%', { page, maxPage: heroes.length })}</Text>
                  <Arrow
                    onClick={() => {
                      setPage(page === heroes.length ? page : page + 1)
                    }}
                  >
                    <ArrowForwardIcon color={page === heroes.length ? 'textDisabled' : 'primary'} />
                  </Arrow>
                </PageButtons>
              </Flex>
              <Flex flexDirection="column">
                <Text fontSize="24px" color="#0088FF">{hero.name}</Text>
                <Text color="#6972A4">Belong to box Id: {hero.tokenId}</Text>
                <Text mt="32px" color="#3A3855">Description</Text>
                <Text color="#6E6C8A">{hero.description}</Text>
              </Flex>
            </Flex>
            <Button disabled={isLoading || isClaimed} onClick={hadleOnClick}>{isClaimed ? `Box id ${hero.tokenId} is being burned` : isLoading ? 'Claiming...' : 'Claim my heroes'}</Button>
          </AutoColumn>
        </AutoColumn>
      </Modal>
    )
  }

  const handleClaim = async () => {
    return fetch(
      `https://testnet-api.metafight.io/user/signature-open-box?tokenId=${nfts[0].tokenId}&contractAddress=${getBoxesAddress()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
      },
    ).then(async (res) => {
      if (res.ok) {
        const data = await res.json()
        return callWithGasPrice(openBoxContract, 'claim', [data.id, data.tokenId, data.nfts, data.hashs, data.sign.v, data.sign.r, data.sign.s])
      }
      return null
    })
  }

  const [onPresentModal] = useModal(<OpenedNftsModal onClaim={handleClaim} nfts={nfts} callback={callback} />)

  useEffect(() => {
    if (nftContract && account) {
      nftContract.isApprovedForAll(account, openBoxContract.address).then(setIsApproved)
    }
  }, [account, nftContract, openBoxContract])

  useEffect(() => {
    if(nfts && nfts.length) {
      onPresentModal()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nfts])

  const { isApproving, isConfirming, handleApprove, handleConfirm } = useApproveConfirmTransaction({
    onRequiresApproval: async () => {
      try {
        const approvedForContract = await nftContract.isApprovedForAll(account, openBoxContract.address)
        return approvedForContract
      } catch (error) {
        return false
      }
    },
    onApprove: () => {
      return callWithGasPrice(nftContract, 'setApprovalForAll', [openBoxContract.address, true])
    },
    onApproveSuccess: async ({ receipt }) => {
      setIsApproved(true)
      toastSuccess(
        t('Contract approved - you can now put your NFT for sale!')
      )
    },
    onConfirm: () => {
      return handleClaim()
    },
    onSuccess: async ({ receipt }) => {
      toastSuccess('Claim successfuly')
      history.push(`/nfts/profile/${account}`)
    },
    watched: nfts
  })

  if (!nfts) {
    return {isApproving, isApproved}
  }

  return { isApproving, isApproved, isConfirming, handleApprove, handleConfirm }
}

export const PageButtons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.2em;
  margin-bottom: 1.2em;
`

export const Arrow = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  padding: 0 20px;
  :hover {
    cursor: pointer;
  }
`

export default useClaim
