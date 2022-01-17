import { useEffect, useState } from 'react'
import { useIdoContract } from 'hooks/useContract'
import { BIG_ZERO } from 'utils/bigNumber'

const useGetTotalFundsRaised = (buyTokenAddress) => {
  const idoContract = useIdoContract()
  const [totalFundsRaised, setTotalFundsRaised] = useState(BIG_ZERO)
  useEffect(() => {
    if (buyTokenAddress) {
      idoContract.totalFundsRaised(buyTokenAddress).then((res) => {
        setTotalFundsRaised(res)
      })
    }
  }, [idoContract, buyTokenAddress])
  return { totalFundsRaised }
}
export default useGetTotalFundsRaised
