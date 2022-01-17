import { useEffect, useState } from 'react'
import { useIdoUnlockContract } from 'hooks/useContract'
import { getIdoUnlockAddress } from 'utils/addressHelpers'
import { multicallv2 } from 'utils/multicall'
import idoUnlockABI from 'config/abi/idoUnlock.json'

const useAccountClaimPercent = (account) => {
  const idoUnlockContract = useIdoUnlockContract()
  const [claimPercent, setClaimPercent] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const idoUnlockAddress = getIdoUnlockAddress()
  useEffect(() => {
    setIsLoading(true)
    const initData = async () => {
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
          return { address: idoUnlockAddress, name: 'periodPercent', params: [claimIndex] }
        })

        const listClaimPercents = await multicallv2(idoUnlockABI, calls)
        listClaimPercents.forEach((value) => {
          setClaimPercent((val) => Number(val) + Number(value[0]._hex))
        })
        setIsLoading(false)
      }
    }

    if (account) {
      initData()
    }
  }, [idoUnlockContract, account, idoUnlockAddress, isUpdate])
  return { claimPercent, isLoading, setIsUpdate }
}
export default useAccountClaimPercent
