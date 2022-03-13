import { useCallback } from 'react'
import { useLaunchPoolContract } from 'hooks/useContract'

const launchPoolUnstake = async (launchPoolContract, id, sign) => {
  const tx = await launchPoolContract.unstake(id, sign.feeTokenAmount, sign.signID, sign.v, sign.r, sign.s)
  const receipt = await tx.wait()
  return receipt.status
}

const useUnstakePool = (id: number) => {
  const launchPoolContract = useLaunchPoolContract()

  const handleUnstake = useCallback(
    async (sign: any) => {
      await launchPoolUnstake(launchPoolContract, id, sign.sigature)
    },
    [launchPoolContract, id],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstakePool
