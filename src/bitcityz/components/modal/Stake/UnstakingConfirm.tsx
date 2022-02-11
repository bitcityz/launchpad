import React, { useEffect, useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import useUnstakePool from '../../../scenes/launch_pool/hooks/useUnstakePool'
import '../../../assets/index.css'
import bgStaking from '../../../assets/images/bg-staking.png'

function UnstakingConfirm({ onClose, pool, setUpdatePool }) {
  const { id, name } = pool
  const { onUnstake } = useUnstakePool(id)
  const { t } = useTranslation()
  const tokenName = 'BCTZ'

  const { toastSuccess, toastError } = useToast()

  const [pendingTx, setPendingTx] = useState(false)

  const handleConfirmClick = async () => {
    setPendingTx(true)
    try {
      // unstaking
      await onUnstake()
      toastSuccess(
        `${t('Unstaked')}!`,
        t('Your %symbol% earnings have also been harvested to your wallet!', {
          symbol: tokenName,
        }),
      )
      setPendingTx(false)
      setUpdatePool(true)
      onClose()
    } catch (e) {
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setPendingTx(false)
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div
      className="modal-backdrop fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-[9999]"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.98)' }}
    >
      <div
        className="modal p-8 md:p-14 bg-no-repeat bg-center"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
        style={{ backgroundImage: `url(${bgStaking})`, backgroundSize: '100% 100%' }}
      >
        <h6 className="text-[#F5F5F5] text-xl md:text-[28px] font-bold text-center">Unstake in {name} Pool</h6>
        <p className="text-[#F5F5F5] text-center mt-3 max-w-[300px] md:max-w-[350px] mx-auto">
          When you unstake {tokenName} tokens, the contract will harvest rewards automatically for you!
        </p>
        <div className="flex justify-center gap-x-6 items-center mt-5">
          <button
            type="button"
            className="bg-transparent border-[#7BF5FB] border-solid border-[1px] rounded-[20px] h-[44px] text-[#7BF5FB] px-5 min-w-[140px] md:px-10 font-semibold md:min-w-[200px]"
            onClick={onClose}
          >
            Cancel
          </button>
          {!pendingTx && (
            <button
              type="button"
              className="fill-btn rounded-[20px] border-none text-white text-sm font-semibold h-[44px] px-5 min-w-[140px] md:px-10 shadow-blue md:min-w-[200px]"
              onClick={handleConfirmClick}
            >
              Confirm
            </button>
          )}
          {pendingTx && (
            <button
              type="button"
              className="flex items-center justify-center h-[44px] px-5 min-w-[140px] md:px-7 md:min-w-[200px] text-sm font-semibold rounded-[20px] text-black pointer-events-none bg-[#9E9E9E] transition ease-in-out duration-150 cursor-not-allowed"
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
        </div>
      </div>
    </div>
  )
}

export default UnstakingConfirm
