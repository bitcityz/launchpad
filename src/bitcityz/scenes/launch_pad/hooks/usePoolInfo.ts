import { useIdoContract } from 'hooks/useContract'
import { useMemo } from 'react'
import { useSingleCallResult } from 'state/multicall/hooks'

function usePoolInfo(id) {
  const contract = useIdoContract()
  const inputs = useMemo(() => [id], [id])
  const data = useSingleCallResult(contract, 'poolInfo', inputs)?.result
  return data
}

export default usePoolInfo
