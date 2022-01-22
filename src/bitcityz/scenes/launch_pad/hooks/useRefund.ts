import { useCallback } from 'react'
import { useIdoContract } from 'hooks/useContract'

const idoRefund = async (idoContract, id) => {
  const tx = await idoContract.refund(id)
  const receipt = await tx.wait()
  return receipt.status
}

const useRefund = (id: number) => {
  const idoContract = useIdoContract()

  const handleRefund = useCallback(async () => {
    await idoRefund(idoContract, id)
  }, [idoContract, id])

  return { onRefund: handleRefund }
}

export default useRefund
