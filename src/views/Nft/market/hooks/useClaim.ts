import { useState } from 'react'
import { useHistory } from "react-router-dom"
import { useBoxOpenContract } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'

const useClaim = (meta, token) => {
  const openBoxContract = useBoxOpenContract()
  const history = useHistory()
  const { account } = useWeb3React()
  const [loading, setLoading] = useState(false)
  if (!meta) {
    return {}
  }
  const { collectionAddress, tokenId } = meta

  const handleClaim = async() => {
    setLoading(true)
    fetch(`https://testnet-api.metafight.io/user/signature-open-box?tokenId=${tokenId}&contractAddress=${collectionAddress}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      }
    }).then(async(res) => {
      if (res.ok) {
        const data = await res.json()
        const tx = await openBoxContract.claim(data.id, data.nfts, data.hashs, data.sign.v, data.sign.r, data.sign.s)
        await tx.wait()
        setLoading(false)
        history.push(`/nfts/profile/${account}`)
      }
    })
  }

  return { handleClaim, loading }
}

export default useClaim