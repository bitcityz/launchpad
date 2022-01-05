import { useTokenContract } from 'hooks/useContract'
import { useSingleCallResult } from 'state/multicall/hooks'

function useTokenSymbol(address: string): string | undefined {
  const contract = useTokenContract(address, false)
  const symbol: string = useSingleCallResult(contract, 'symbol')?.result?.[0]
  return address && symbol ? symbol : undefined
}

export default useTokenSymbol
