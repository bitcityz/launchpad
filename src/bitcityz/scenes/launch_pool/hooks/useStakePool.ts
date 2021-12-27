import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state'
import { updateUserStakedBalance, updateUserBalance } from 'state/actions'
import BigNumber from 'bignumber.js'
import { BIG_TEN } from 'utils/bigNumber'
import { useLaunchPoolContract } from 'hooks/useContract'

const launchPoolStake = async (launchPoolContract, amount, decimals = 18, id) => {
  const tx = await launchPoolContract.stake(id, new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString())
  const receipt = await tx.wait()
  return receipt.status
}

const useStakePool = (id: number) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const launchPoolContract = useLaunchPoolContract()

  const handleStake = useCallback(
    async (amount: string, decimals: number) => {
      await launchPoolStake(launchPoolContract, amount, decimals, id)
      dispatch(updateUserStakedBalance(id, account))
      dispatch(updateUserBalance(id, account))
    },
    [account, dispatch, launchPoolContract, id],
  )

  return { onStake: handleStake }
}

export default useStakePool
