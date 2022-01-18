import { useEffect, useState } from 'react'
import { useIdoUnlockContract } from 'hooks/useContract'
import { multicallv2 } from 'utils/multicall'
import idoUnlockABI from 'config/abi/idoUnlock.json'

const useAccountClaimPercent = (account, address) => {
  const idoUnlockContract = useIdoUnlockContract(address)
  const [claimPercent, setClaimPercent] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    const initData = async () => {
      try {
        setIsUpdate(false)
        const userIndex = await idoUnlockContract.userIndex(account)
        if (Number(userIndex._hex) === 0) {
          setClaimPercent(0)
          setIsLoading(false)
        } else {
          const claimTimes = []
          for (let i = 0; i < Number(userIndex._hex); i++) {
            claimTimes.push(i)
          }
          const calls = claimTimes.map((claimIndex) => {
            return { address, name: 'periodPercent', params: [claimIndex] }
          })

          const listClaimPercents = await multicallv2(idoUnlockABI, calls)
          setClaimPercent(0)
          listClaimPercents.forEach((value) => {
            setClaimPercent((val) => Number(val) + Number(value[0]._hex))
          })
          setIsLoading(false)
        }
      } catch (error) {
        setClaimPercent(0)
        setIsLoading(false)
      }
    }

    if (account) {
      initData()
    }
  }, [idoUnlockContract, account, address, isUpdate])
  return { claimPercent, isLoading, setIsUpdate }
}
export default useAccountClaimPercent
