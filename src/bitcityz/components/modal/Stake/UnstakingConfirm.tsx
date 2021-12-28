import React, { useCallback, useMemo, useState } from 'react'
import { getFullDisplayBalance, formatNumber } from 'utils/formatBalance'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import { Spinner } from '../../spinner'
import useUnstakePool from '../../../scenes/launch_pool/hooks/useUnstakePool'
import '../../../assets/index.css'
import bgStaking from '../../../assets/images/bg-staking.png'

function UnstakingConfirm({ onClose, pool }) {
  const { id, amount, lockingToken, minLockingAmount, name, startTime, lockingTime, isApproved, balance } = pool
  const { onUnstake } = useUnstakePool(id)
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
      // unstaking
      await onUnstake()
      toastSuccess(
        `${t('Unstaked')}!`,
        t('Your %symbol% earnings have also been harvested to your wallet!', {
          symbol: tokenName,
        }),
      )
      setPendingTx(false)
      onClose()
    } catch (e) {
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setPendingTx(false)
    }
  }

  return (
    <div
      className="modal-backdrop fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-50"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
    >
        {pendingTx && <Spinner />}
      <div
        className="modal p-14 bg-no-repeat bg-center"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
        style={{ backgroundImage: `url(${bgStaking})`, backgroundSize: '100% 100%' }}
      >
        <h6 className="text-[#F5F5F5] text-[28px] font-bold text-center">Unstake in {name} Pool</h6>
        <p className="text-[#F5F5F5] text-center mt-3 max-w-[350px] mx-auto">
          Every time you stake and unstake {tokenName} tokens, the contract will automagically harvest {tokenName}{' '}
          rewards for you!
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

export default UnstakingConfirm
