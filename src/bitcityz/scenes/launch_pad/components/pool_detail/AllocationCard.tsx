import React, { useState, useEffect } from 'react'
import '../../../../assets/index.css'
import { useIdoUnlockContract } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import { useTranslation } from 'contexts/Localization'
import { Skeleton } from '@mexi/uikit'

function AllocationCard({ claim, totalToken, accountClaimIndex, setIsUpdate }) {
  const idoUnlockContract = useIdoUnlockContract()
  const [unlockPercent, setUnlockPercent] = useState(0)
  const { toastSuccess, toastError } = useToast()
  const [pendingTx, setPendingTx] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    if (accountClaimIndex > claim) {
      setIsDisabled(true)
    }
  }, [accountClaimIndex, claim])

  useEffect(() => {
    const initData = async () => {
      const resp = await idoUnlockContract.periodPercent(claim)
      setUnlockPercent(Number(resp._hex))
    }
    initData()
  }, [claim, idoUnlockContract])

  const handleClaim = async () => {
    setPendingTx(true)
    try {
      // claim
      const tx = await idoUnlockContract.claim()
      await tx.wait()
      toastSuccess(`${t('Claimed')}!`, t('You claim successful!'))
      setPendingTx(false)
      setIsDisabled(true)
      setIsUpdate(true)
    } catch (e) {
      if (e.code !== 4001) {
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      }
      setPendingTx(false)
    }
  }

  return (
    <div className="grid grid-cols-4 mt-4 items-center gap-x-8">
      {!pendingTx && (
        <button
          type="button"
          className={`rounded-[20px] text-black font-semibold w-[139px] h-[32px] flex items-center justify-center ${
            isDisabled ? 'pointer-events-none bg-[#9E9E9E]' : 'bg-skyblue shadow-blue'
          }`}
          onClick={handleClaim}
        >
          Claimed
        </button>
      )}

      {pendingTx && (
        <button
          type="button"
          className="flex items-center justify-center w-[139px] h-[32px] font-semibold rounded-[20px] text-black pointer-events-none bg-[#9E9E9E] transition ease-in-out duration-150 cursor-not-allowed"
          disabled
        >
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Waiting...
        </button>
      )}
      <span className="text-[#BFBFBF] font-semibold">
        {((unlockPercent * totalToken) / 100).toLocaleString('en', {
          maximumFractionDigits: 4,
        })}
      </span>
      <span className="text-[#BFBFBF] font-semibold">Oct 15 2021, 2:30 PM UTC</span>
      <span className="text-[#BFBFBF] font-semibold">{unlockPercent}%</span>
    </div>
  )
}

export default AllocationCard
