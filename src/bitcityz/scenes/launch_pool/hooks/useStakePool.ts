import { useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { BIG_TEN } from 'utils/bigNumber'
import { useLaunchPoolContract } from 'hooks/useContract'

const launchPoolStake = async (launchPoolContract, amount, decimals = 18, id, sign) => {
  const tx = await launchPoolContract.stake(
    id,
    new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString(),
    sign.feeTokenAmount,
    sign.signID,
    sign.v,
    sign.r,
    sign.s,
  )
  const receipt = await tx.wait()
  return receipt.status
}

const useStakePool = (id: number) => {
  const launchPoolContract = useLaunchPoolContract()

  const handleStake = useCallback(
    async (amount: string, decimals: number, sign: any) => {
      await launchPoolStake(launchPoolContract, amount, decimals, id, sign.sigature)
    },
    [launchPoolContract, id],
  )

  return { onStake: handleStake }
}

export default useStakePool
