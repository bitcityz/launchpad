import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useTokenContract } from 'hooks/useContract'
import { getBCTZAddress } from 'utils/addressHelpers'
import { DEFAULT_TOKEN_DECIMAL } from 'config'

const useGetBalanceOf = (address) => {
  const bctzAddress = getBCTZAddress()
  const erc20Contract = useTokenContract(bctzAddress)
  const [balance, setBalance] = useState('0')
  useEffect(() => {
    const getBalance = async () => {
      const resp = await erc20Contract.balanceOf(address)
      setBalance(new BigNumber(resp._hex).div(DEFAULT_TOKEN_DECIMAL).toString())
    }
    if (address) {
      getBalance()
    }
  }, [erc20Contract, address])
  return { balance }
}
export default useGetBalanceOf
