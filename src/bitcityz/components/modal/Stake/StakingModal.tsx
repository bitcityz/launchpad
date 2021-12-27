import React, { useCallback, useMemo, useState } from 'react'
import { getFullDisplayBalance, formatNumber } from 'utils/formatBalance'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import useStakePool from '../../../scenes/launch_pool/hooks/useStakePool'
import '../../../assets/index.css'
import bgStaking from '../../../assets/images/bg-staking.png'

function StakingModal({ onClose, pool }) {
  const { id, amount, lockingToken, minLockingAmount, name, startTime, lockingTime, isApproved, balance } = pool
  const { onStake } = useStakePool(id)
  const { t } = useTranslation()
  const tokenName = 'BCTZ'
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(balance._hex)
  }, [balance])

  const { toastSuccess, toastError } = useToast()

  const [stakeAmount, setStakeAmount] = useState('')
  const [pendingTx, setPendingTx] = useState(false)

  const handleSelectMax = useCallback(() => {
    setStakeAmount(fullBalance)
  }, [fullBalance, setStakeAmount])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setStakeAmount(e.currentTarget.value.replace(/,/g, '.'))
      }
    },
    [setStakeAmount],
  )

  const handleConfirmClick = async () => {
    setPendingTx(true)
    try {
      // if (isRemovingStake) {
      //   // unstaking
      //   await onUnstake(stakeAmount, stakingToken.decimals)
      //   toastSuccess(
      //     `${t('Unstaked')}!`,
      //     t('Your %symbol% earnings have also been harvested to your wallet!', {
      //       symbol: earningToken.symbol,
      //     }),
      //   )
      // } else {
      // staking
      await onStake(stakeAmount, 18)
      toastSuccess(
        `${t('Staked')}!`,
        t('Your %symbol% funds have been staked in the pool!', {
          symbol: tokenName,
        }),
      )
      // }
      setPendingTx(false)
      onClose()
    } catch (e) {
      console.log(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setPendingTx(false)
    }
  }

  return (
    <div
      className="modal-backdrop fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-50"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
    >
      <div
        className="modal p-14 bg-no-repeat bg-center bg-contain min-w-[744px] min-h-[354px]"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
        style={{ backgroundImage: `url(${bgStaking})` }}
      >
        <h6 className="text-[#F5F5F5] text-[28px] font-bold text-center">Stake in {name} Pool</h6>
        <p className="text-[#F5F5F5] text-center mt-3">
          Required:{' '}
          <span className="text-skyblue text-shadow font-semibold">
            {Number(new BigNumber(minLockingAmount).dividedBy(DEFAULT_TOKEN_DECIMAL)).toLocaleString('en', {
              maximumFractionDigits: 0,
            })}{' '}
            BCTZ
          </span>
        </p>
        <p className="text-[#F5F5F5] text-center mt-1">
          Lock-up Time: <span className="text-skyblue text-shadow font-semibold">7 days</span>
        </p>
        <div className="mt-7 max-w-[430px] mx-auto flex items-center gap-x-2">
          <div className="bg-white text-right px-4 py-3 rounded-[20px] flex items-center gap-x-2 flex-1">
            <input
              type="text"
              value={stakeAmount}
              pattern="^[0-9]*[.,]?[0-9]{0,18}$"
              onChange={handleChange}
              className="bg-transparent border-none text-[#9E9E9E] font-semibold flex-1 text-right pt-[1px]"
              placeholder="0.00"
            />
            <span className="text-[#212121] font-semibold">BCTZ</span>
          </div>
          <button
            type="button"
            className="bg-skyblue rounded-[20px] border-none text-black text-sm font-semibold h-[44px] px-10 shadow-blue"
            onClick={handleSelectMax}
          >
            Max
          </button>
        </div>
        <p className="text-[#F5F5F5] text-center mt-4">
          Available tokens:{' '}
          <span className="text-skyblue text-shadow font-semibold">
            {Number(fullBalance).toLocaleString('en', {
              maximumFractionDigits: 0,
            })}{' '}
            BCTZ
          </span>
        </p>
        <div className="flex justify-center gap-x-6 items-center mt-5">
          <button
            type="button"
            className="bg-transparent border-[#7BF5FB] border-solid border-[1px] rounded-[20px] h-[44px] text-[#7BF5FB] px-10 font-semibold min-w-[200px]"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-skyblue rounded-[20px] border-none text-black text-sm font-semibold h-[44px] px-10 shadow-blue min-w-[200px]"
            onClick={handleConfirmClick}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default StakingModal
