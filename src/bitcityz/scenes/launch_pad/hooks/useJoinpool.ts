import { useCallback } from 'react'
import { useIdoContract } from 'hooks/useContract'

const joinPool = async (idoContract, pId) => {
  const tx = await idoContract.buy(pId)
  const resp = await tx.wait()
  return resp
}

const useJoinPool = () => {
  const idoContract = useIdoContract()

  const handleJoinPool = useCallback(
    async (pid: number) => {
      await joinPool(idoContract, pid)
    },
    [idoContract],
  )

  return { onJoinPool: handleJoinPool }
}

export default useJoinPool
