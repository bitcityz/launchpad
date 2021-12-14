import { useState } from 'react'
import { useERC721 } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'
import { getBoxesAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'
import useToast from 'hooks/useToast'
import { withAuth } from 'hooks/useAuthSign'

let RETRY = 0
const MAX_RETRY = 2
const RETRY_STATUSES = [401, 400, 500]

const useOpenBox = () => {
  const { account, library } = useWeb3React()
  const token = localStorage.getItem("token")
  const [newNfts, setNfts] = useState([])
  const nftContract = useERC721(getBoxesAddress())
  const [isOpeningBox, setIsLoading] = useState(false)
  const { toastError } = useToast()

  const openBox = async (authorization = token, boxId) => {
    const balance = await nftContract.balanceOf(account)
    if ( new BigNumber(balance._hex).toNumber() < 1) {
      return toastError('Error', 'You have no NFTs')
    }
    const newestTokenId = await nftContract.tokenOfOwnerByIndex(account, new BigNumber(balance._hex).toNumber() - 1)
    setIsLoading(true)
    const boxTokenId = boxId || new BigNumber(newestTokenId._hex).toString()
    return fetch(`https://testnet-api.metafight.io/user/open-box`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization,
      },
      body: JSON.stringify({
        tokenId: boxTokenId,
        contractAddress: getBoxesAddress(),
      }),
    }).then(async (res) => {
      if (RETRY_STATUSES.includes(res.status)) {
        RETRY ++
        if (RETRY < MAX_RETRY) {
          withAuth(() => openBox(token, boxTokenId), { account, library })
        }
      }
      if (res.status === 500) {
        toastError('Error', 'Something went wrong!')
      }
      if (res.ok) {
        const data = await res.json()
        const tasks = []
        data.forEach(({ info: { hash }, tokenId, contract }) => {
          tasks.push(
            fetch(`https://ipfsgw.metaxiz.com/ipfs/${hash}`).then(async (resHash) => {
              const metadata = await resHash.json()
              return {
                hash,
                tokenId,
                collectionAddress: contract,
                ...metadata,
              }
            }),
          )
        })
        const nfts = await Promise.all(tasks)
        setIsLoading(false)
        setNfts(nfts)
      }
    })
  }

  const handleOpenBox = async (tokenId = null) => {
    if (token) {
      openBox(token, tokenId)
    }
  }

  return { isOpeningBox, handleOpenBox, newNfts, token }
}

export default useOpenBox
