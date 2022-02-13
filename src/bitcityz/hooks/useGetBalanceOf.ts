import { useEffect, useState } from 'react'
import { useTokenContract } from 'hooks/useContract'
import { getBCTZAddress } from 'utils/addressHelpers'
import { BIG_ZERO } from 'utils/bigNumber'

const useGetBalanceOf = (address) => {
  const bctzAddress = getBCTZAddress()
  const erc20Contract = useTokenContract(bctzAddress)
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
