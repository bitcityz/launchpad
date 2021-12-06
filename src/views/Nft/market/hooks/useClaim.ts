import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useBoxOpenContract, useERC721 } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useToast from 'hooks/useToast'
import { ToastDescriptionWithTx } from 'components/Toast'
import { useTranslation } from 'contexts/Localization'

const useClaim = (meta = {collectionAddress: null, tokenId: null}, token) => {
  const openBoxContract = useBoxOpenContract()
  const history = useHistory()
  const { account } = useWeb3React()
  const [loading, setLoading] = useState(false)
  const { toastSuccess } = useToast()
  const { t } = useTranslation()

  const { collectionAddress, tokenId } = meta
  const nftContract = useERC721(collectionAddress)
  const { callWithGasPrice } = useCallWithGasPrice()

  const { isApproving, isApproved, isConfirming, handleApprove, handleConfirm } = useApproveConfirmTransaction({
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
  })

  if (!meta) {
    return {}
  }

  const handleClaim = async () => {
    return fetch(
      `https://testnet-api.metafight.io/user/signature-open-box?tokenId=${tokenId}&contractAddress=${collectionAddress}`,
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

  return { loading, isApproving, isApproved, isConfirming, handleApprove, handleConfirm }
}

export default useClaim
