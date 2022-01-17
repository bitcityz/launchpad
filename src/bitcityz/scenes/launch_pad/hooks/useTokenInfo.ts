import { useEffect, useState } from 'react'
import { useTokenContract } from 'hooks/useContract'
import { getFullDisplayBalance } from 'utils/formatBalance'

const useTokenInfo = (tokenAddress) => {
  const [isLoading, setIsLoading] = useState(true)
  const erc20Contract = useTokenContract(tokenAddress)
  const [symbol, setSymbol] = useState('')
  const [name, setName] = useState('')
  const [decimals, setDecimals] = useState(18)
  const [totalSupply, setTotalSupply] = useState('')
  useEffect(() => {
    const getTokenInfo = async () => {
      const res1 = await erc20Contract.symbol()
      setSymbol(res1)
      const res2 = await erc20Contract.name()
      setName(res2)
      const res3 = await erc20Contract.totalSupply()
      setTotalSupply(getFullDisplayBalance(res3._hex))
      const res4 = await erc20Contract.decimals()
      setDecimals(res4)
      setIsLoading(false)
    }
    if (tokenAddress) {
      getTokenInfo()
    }
  }, [erc20Contract, tokenAddress])
  return { symbol, name, totalSupply, decimals, isLoading }
}

export default useTokenInfo
