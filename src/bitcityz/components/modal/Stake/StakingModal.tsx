import React, { useCallback, useEffect, useState } from 'react'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import BigNumber from 'bignumber.js'
import NumberFormat from 'react-number-format'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import useGetBalanceOf from '../../../hooks/useGetBalanceOf'
import useStakePool from '../../../scenes/launch_pool/hooks/useStakePool'
import useGetSign from '../../../hooks/useGetSign'
import '../../../assets/index.css'
import bgStaking from '../../../assets/images/bg-staking.png'

function StakingModal({ onClose, pool, setUpdatePool, account }) {
  const { id, minLockingAmount, name } = pool
  const { onStake } = useStakePool(id)
  const { t } = useTranslation()
  const tokenName = 'BCTZ'
  const { balance } = useGetBalanceOf(account)
  const { onSign } = useGetSign()

  const { toastSuccess, toastError } = useToast()

  const [stakeAmount, setStakeAmount] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const [showMsg, setShowMsg] = useState(false)
  const thousandSeparator = true

  const handleSelectMax = useCallback(() => {
    setStakeAmount(balance)
    if (Number(balance) >= Number(new BigNumber(minLockingAmount).dividedBy(DEFAULT_TOKEN_DECIMAL))) {
      setShowMsg(false)
    }
  }, [balance, setStakeAmount, minLockingAmount])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setStakeAmount(e.currentTarget.value)
        if (
          Number(e.currentTarget.value.replace(/,/g, '')) >=
          Number(new BigNumber(minLockingAmount).dividedBy(DEFAULT_TOKEN_DECIMAL))
        ) {
          setShowMsg(false)
        } else {
          setShowMsg(true)
        }
      }
    },
    [setStakeAmount, minLockingAmount],
  )

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleConfirmClick = async () => {
    try {
      // staking
      if (
        Number(stakeAmount.replace(/,/g, '')) < Number(new BigNumber(minLockingAmount).dividedBy(DEFAULT_TOKEN_DECIMAL))
      ) {
        setShowMsg(true)
      } else {
        setPendingTx(true)
        const signData = await onSign(account, id)

        if (signData) {
          await onStake(stakeAmount.replace(/,/g, ''), 18, signData)
          toastSuccess(
            `${t('Staked')}!`,
            t('Your %symbol% funds have been staked in the pool!', {
              symbol: tokenName,
            }),
          )

          setPendingTx(false)
          setUpdatePool(true)
          onClose()
        }
      }
    } catch (e) {
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setPendingTx(false)
    }
  }

  return (
    <div
      className="modal-backdrop fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-[9999]"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.98)' }}
    >
      <div
        className="modal px-8 md:px-14 py-14 bg-no-repeat bg-center"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
        style={{ backgroundImage: `url(${bgStaking})`, backgroundSize: '100% 100%' }}
      >
        <h6 className="text-[#F5F5F5] text-xl md:text-[28px] font-bold text-center">Stake in {name} Pool</h6>
        <p className="text-[#F5F5F5] text-center mt-3">
          Required:{' '}
          <span className="text-skyblue text-shadow font-semibold">
            Min.{' '}
            {Number(new BigNumber(minLockingAmount).dividedBy(DEFAULT_TOKEN_DECIMAL)).toLocaleString('en', {
              maximumFractionDigits: 0,
            })}{' '}
            BCTZ
          </span>
        </p>
        {/* <p className="text-[#F5F5F5] text-center mt-1">
          Lock-up Time:{' '}
          <span className="text-skyblue text-shadow font-semibold">{(lockingTime / 3600).toFixed(2)} days</span>
        </p> */}
        <div className="mt-7 max-w-[300px] md:max-w-[430px] mx-auto flex items-center gap-x-2">
          <div className="bg-white text-right px-4 py-3 rounded-[20px] flex items-center gap-x-2 flex-1">
            {/* <input
              type="text"
              value={stakeAmount}
              pattern="^[0-9]*[.,]?[0-9]{0,18}$"
              onChange={handleChange}
              className="bg-transparent border-none text-[#9E9E9E] font-semibold flex-1 text-right pt-[1px] max-w-[145px] md:max-w-max"
              placeholder="0.00"
            /> */}
            <NumberFormat
              className="bg-transparent border-none text-[#9E9E9E] font-semibold flex-1 max-w-[145px] text-right pt-[1px] md:max-w-full"
              value={stakeAmount}
              onChange={handleChange}
              placeholder="0.00"
              thousandSeparator={thousandSeparator}
            />
            <span className="text-[#212121] font-semibold">BCTZ</span>
          </div>
          <button
            type="button"
            className="bg-skyblue rounded-[20px] border-none text-[#212121] text-sm font-semibold h-[44px] px-5 md:px-10 shadow-blue"
            onClick={handleSelectMax}
          >
            Max
          </button>
        </div>
        {showMsg && (
          <p className="text-[#FF4D4F] text-xs font-semibold mt-1">
            You have to stake minimum{' '}
            {Number(new BigNumber(minLockingAmount).dividedBy(DEFAULT_TOKEN_DECIMAL)).toLocaleString('en', {
              maximumFractionDigits: 0,
            })}{' '}
            BCTZ to enter in this pool !
          </p>
        )}
        <p className="text-[#F5F5F5] text-center mt-4">
          Available tokens:{' '}
          <span className="text-skyblue text-shadow font-semibold">
            {Number(balance).toLocaleString('en', {
              maximumFractionDigits: 0,
            })}{' '}
            BCTZ
          </span>
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
              className="bg-skyblue rounded-[20px] border-none text-[#212121] text-sm font-semibold h-[44px] px-5 min-w-[140px] md:px-10 shadow-blue md:min-w-[200px]"
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

export default StakingModal
