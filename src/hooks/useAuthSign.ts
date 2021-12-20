import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { simpleRpcProvider } from 'utils/providers'
import { signMessage } from 'utils/web3React'
import { post } from 'utils/http'

const checkExistedAccount = async (account) => {
  const res = await fetch(`https://testnet-auth-api.metafight.io/user-nonce?address=${account}`)
  if (res.ok) {
    const data = await res.json()
    return data.nonce
  }
  return undefined
}

const loginAccount = async (userNonce, { account, library }) => {
  const msg = `mefi- ${userNonce}`
  const signature = await signMessage(library, account, msg)
  const res = await fetch(`https://testnet-auth-api.metafight.io/user/authenticate`, {
    body: JSON.stringify({
      signature,
      address: account,
    }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (res.ok) {
    const data = await res.json()
    localStorage.setItem('token', data.token)
    return data.token
  }

  return undefined
}

const registerAccount = async ({ account, library }) => {
  const transactionCount = await simpleRpcProvider.getTransactionCount(account)
  const msg = `mefi- ${transactionCount}`
  const signature = await signMessage(library, account, msg)
  const res = await post({
    url: `https://testnet-auth-api.metafight.io/user`,
    body: {
      signature,
      address: account,
      nonce: transactionCount.toString(),
    },
  })
  localStorage.setItem('token', res.token)
  return res.token
}

const useAuth = () => {
  const { account, library } = useWeb3React()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (account && !token) {
      checkExistedAccount(account)
        .then((nonce) => {
          if (nonce) {
            loginAccount(nonce, { account, library })
          } else {
            registerAccount({ account, library })
          }
        })
        .catch(() => registerAccount({ account, library }))
    }
  }, [account, token, library])
}

export const withAuth = (callback, { account, library }) => {
  if (account && callback && library) {
    checkExistedAccount(account)
      .then((nonce) => {
        if (nonce) {
          loginAccount(nonce, { account, library }).then(callback)
        } else {
          registerAccount({ account, library }).then(callback)
        }
      })
      .catch(() => registerAccount({ account, library }).then(callback))
  }
}

export default useAuth
