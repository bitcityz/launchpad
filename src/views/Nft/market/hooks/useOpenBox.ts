import { useEffect, useState, useCallback } from 'react'
import { useBoxSaleContract, useERC721 } from 'hooks/useContract'
import { signMessage } from 'utils/web3React'
import { useWeb3React } from '@web3-react/core'
import { getBoxesAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'
import { simpleRpcProvider } from 'utils/providers'


const useOpenBox = () => {
  const { account, library } = useWeb3React()
  const [userNonce, setUserNonce] = useState(undefined)
  const [token, setToken] = useState(undefined)
  const boxSaleContract = useBoxSaleContract()
  const [isAccountExisted, setIsAccountExisted] = useState(false)
  const [newNfts, setNfts] = useState([])
  const nftContract = useERC721(getBoxesAddress())

  const checkExistedAccount = useCallback(() => {
    fetch(`https://testnet-auth-api.metafight.io/user-nonce?address=${account}`)
      .then(async(res) => {
        if (res.ok) {
          const data = await res.json()
          const { nonce } = data
          setIsAccountExisted(true)
          setUserNonce(nonce)
        }
      })
      .catch(() => setIsAccountExisted(false))
  }, [account])

  useEffect(() => {
    if (account){
      checkExistedAccount()
    }
  }, [checkExistedAccount, account])

  const loginAccount = async() => {
    if(token) {
      return openBox(token)
    }
    const msg = `mefi- ${userNonce}`;
    const signature = await signMessage(library, account, msg)
    return fetch(`https://testnet-auth-api.metafight.io/user/authenticate`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        signature,
        address: account,
      })
    }).then(async(res) => {
      if (res.ok) {
        const data = await res.json()
        setToken(data.token)
        openBox(data.token)
      }
    })
  }

  const registerAccount = async() => {
    const transactionCount = await simpleRpcProvider.getTransactionCount(account)
    const msg = `mefi- ${transactionCount}`;
    const signature = await signMessage(library, account, msg)
    fetch(`https://testnet-auth-api.metafight.io/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        signature,
        address: account,
        nonce: transactionCount.toString()
      })
    }).then(async(res) => {
      if (res.ok) {
        const data = await res.json()
        setToken(data.token)
        openBox(data.token)
      }
    })
  }

  const openBox = async(authorization) => {
    const balance = await nftContract.balanceOf(account)
    const newestTokenId = await nftContract.tokenByIndex(new BigNumber(balance._hex).toNumber() - 1)
    fetch(`https://testnet-api.metafight.io/user/open-box`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': authorization
      },
      body: JSON.stringify({
        tokenId: new BigNumber(newestTokenId._hex).toString(),
        contractAddress: getBoxesAddress()
      })
    }).then(async(res) => {
      if (res.ok) {
        const data = await res.json()
        console.log({
          data
        })
        const tasks = []
        data.forEach(({ info: { hash }, tokenId, contract }) => {
          tasks.push(fetch(`https://ipfsgw.metaxiz.com/ipfs/${hash}`).then(async resHash => {
            const metadata = await resHash.json()
            return {
              hash,
              tokenId,
              collectionAddress: contract,
              ...metadata
            }
          })
        )
        })
        const nfts = await Promise.all(tasks)
        setNfts(nfts)
      }
    })
  }

  const handleOpenBox = async() => {
    if (isAccountExisted) {
      await loginAccount()
    } else {
      await registerAccount()
    }
  }

  return { handleOpenBox, newNfts, token }
}

export default useOpenBox