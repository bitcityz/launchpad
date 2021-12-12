import { useState } from 'react'
import { useERC721 } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'
import { getBoxesAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'
import useToast from 'hooks/useToast'
import { withAuth } from 'hooks/useAuthSign'

let RETRY = 0
const MAX_RETRY = 2
const useOpenBox = () => {
  const { account, library } = useWeb3React()
  const token = localStorage.getItem("token")
  const [newNfts, setNfts] = useState([])
  const nftContract = useERC721(getBoxesAddress())
  const [isOpeningBox, setIsLoading] = useState(false)
  const { toastError } = useToast()

  const openBox = async (authorization = token) => {
    const balance = await nftContract.balanceOf(account)
    const newestTokenId = await nftContract.tokenOfOwnerByIndex(account, new BigNumber(balance._hex).toNumber() - 1)
    setIsLoading(true)
    fetch(`https://testnet-api.metafight.io/user/open-box`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization,
      },
      body: JSON.stringify({
        tokenId: new BigNumber(newestTokenId._hex).toString(),
        contractAddress: getBoxesAddress(),
      }),
    }).then(async (res) => {
      if (res.status === 401 || res.status === 400) {
        RETRY ++
        if (RETRY < MAX_RETRY) {
          withAuth(openBox, { account, library })
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

  const handleOpenBox = async () => {
    if (token) {
      openBox()
    }
  }

  return { isOpeningBox, handleOpenBox, newNfts, token }
}

export default useOpenBox
