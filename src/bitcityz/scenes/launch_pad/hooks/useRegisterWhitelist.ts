import { useCallback } from 'react'
import { useIdoContract } from 'hooks/useContract'

const whiteListRegister = async (idoContract, pId, tokenId) => {
  const tx = await idoContract.whitelist(pId, tokenId)
  const resp = await tx.wait()
  return resp
}

const useRegisterWhitelist = () => {
  const idoContract = useIdoContract()

  const handleRegister = useCallback(
    async (pid: number, tokenId: number) => {
      await whiteListRegister(idoContract, pid, tokenId)
    },
    [idoContract],
  )

  return { onRegister: handleRegister }
}

export default useRegisterWhitelist
