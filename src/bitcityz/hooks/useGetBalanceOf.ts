import { useEffect, useState } from 'react'
import { useTokenContract } from 'hooks/useContract'
import { BIG_ZERO } from 'utils/bigNumber'

const bctz = '0xE90CABC44faE173881879BFD87A736BA0bE31305'
const useGetBalanceOf = (address) => {
  const erc20Contract = useTokenContract(bctz)
  const [balance, setBalance] = useState(BIG_ZERO)
  useEffect(() => {
    if (address) {
      erc20Contract.balanceOf(address).then((res) => {
        setBalance(res)
      })
    }
  }, [erc20Contract, address])
  return { balance }
}
export default useGetBalanceOf
