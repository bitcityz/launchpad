import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state'
import { updateUserStakedBalance, updateUserBalance, updateUserPendingReward } from 'state/actions'
import { useLaunchPoolContract } from 'hooks/useContract'

const launchPoolUnstake = async (launchPoolContract, id) => {
  const tx = await launchPoolContract.unstake(id)
  const receipt = await tx.wait()
  return receipt.status
}

const useUnstakePool = (id: number) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const launchPoolContract = useLaunchPoolContract()

  const handleUnstake = useCallback(async () => {
    await launchPoolUnstake(launchPoolContract, id)

    dispatch(updateUserStakedBalance(id, account))
    dispatch(updateUserBalance(id, account))
    dispatch(updateUserPendingReward(id, account))
  }, [account, dispatch, launchPoolContract, id])

  return { onUnstake: handleUnstake }
}

export default useUnstakePool
