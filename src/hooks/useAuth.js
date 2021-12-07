import{ useCallback, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { simpleRpcProvider } from 'utils/providers'
import { signMessage } from 'utils/web3React'
import { get, post } from 'utils/http'

const useAuth = () => {
  const { account, library } = useWeb3React()
  const token = localStorage.getItem("token")

  const checkExistedAccount = useCallback(async() => {
    const { nonce } = await get({
      url: `https://testnet-auth-api.metafight.io/user-nonce?address=${account}`
    })
    return nonce
  }, [account])

  const loginAccount = useCallback(async (userNonce) => {
    const msg = `mefi- ${userNonce}`
    const signature = await signMessage(library, account, msg)
    const res = await post({
      url: `https://testnet-auth-api.metafight.io/user/authenticate`,
      body: {
        signature,
        address: account,
      }
    })
    localStorage.setItem("token", res.token)
  }, [account, library])

  const registerAccount = useCallback(async () => {
    const transactionCount = await simpleRpcProvider.getTransactionCount(account)
    const msg = `mefi- ${transactionCount}`
    const signature = await signMessage(library, account, msg)
    const res = await post({
      url: `https://testnet-auth-api.metafight.io/user`,
      body: {
        signature,
        address: account,
        nonce: transactionCount.toString(),
      }
    })
    localStorage.setItem("token", res.token)
  }, [library, account])

  useEffect(() => {
    if (account && !token) {
      checkExistedAccount()
      .then(nonce => {
        if (nonce) {
          loginAccount(nonce)
        } else {
          registerAccount()
        }
      })
    }
  }, [loginAccount, checkExistedAccount, registerAccount, account, token])
}

export default useAuth