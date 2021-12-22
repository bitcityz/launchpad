import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { simpleRpcProvider } from 'utils/providers'
import { signMessage } from 'utils/web3React'
import { post } from 'utils/http'
import jwtDecode from "jwt-decode"
import { BASE_API_URL } from 'config'

console.log({
  BASE_API_URL
})
const checkExistedAccount = async (account) => {
  const res = await fetch(`${BASE_API_URL}/user-nonce?address=${account}`)
  if (res.ok) {
    const data = await res.json()
    return data.nonce
  }
  return undefined
}

const loginAccount = async (userNonce, { account, library }) => {
  const msg = `mefi- ${userNonce}`
  const signature = await signMessage(library, account, msg)
  const res = await fetch(`${BASE_API_URL}/user/authenticate`, {
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
    url: `${BASE_API_URL}/user`,
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

  useEffect(() => {
    const token = localStorage.getItem('token')
    const decoded: any = token ? jwtDecode(token) : undefined
    const isChangedAddress = account && decoded && decoded.user && decoded.user.address && decoded.user.address.toLowerCase() !== account.toLowerCase()

    if ((account && !token) || (isChangedAddress)) {
      checkExistedAccount(account)
        .then((nonce) => {
          if (nonce) {
            loginAccount(nonce, { account, library })
          } else {
            registerAccount({ account, library })
          }
        })
        .catch(() => registerAccount({ account, library }))
    
  }}, [account, library])
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
