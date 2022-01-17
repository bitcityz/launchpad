import { useEffect, useState } from 'react'
import { useTokenContract } from 'hooks/useContract'

const useTokenSymbol = (tokenAddress) => {
  const erc20Contract = useTokenContract(tokenAddress)
  const [symbol, setSymbol] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    if (tokenAddress) {
      erc20Contract.symbol().then((res) => {
        setSymbol(res)
        setIsLoading(false)
      })
    }
  }, [erc20Contract, tokenAddress])
  return { symbol, isLoading }
}

export default useTokenSymbol
