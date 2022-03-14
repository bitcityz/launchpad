import React, { useState, useEffect } from 'react'
import '../../../assets/index.css'
import StakingModal from 'bitcityz/components/modal/Stake/StakingModal'
import UnstakingConfirm from 'bitcityz/components/modal/Stake/UnstakingConfirm'
import { useERC20, useLaunchPoolContract } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import { useTranslation } from 'contexts/Localization'
import { useApprovePool } from '../hooks/useApprove'
import useGetSign from '../../../hooks/useGetSign'

function StakingAction({
  pool,
  setUpdatePool,
  isApproved,
  setIsApproved,
  account,
  availableTicket,
  setAvailableTicket,
  addressInfo,
}) {
  const [showStakingModal, setShowStakingModal] = useState(false)
  const [showUnstakingConfirm, setShowUnstakingConfirm] = useState(false)
  const { amount, lockingToken, id } = pool
  const stakingTokenContract = useERC20(lockingToken || '')
  const { handleApprove, requestedApproval, requestStatus } = useApprovePool(stakingTokenContract)

  const [pendingTx, setPendingTx] = useState(false)
  const poolContract = useLaunchPoolContract()
  const { toastSuccess, toastError } = useToast()
  const { t } = useTranslation()
  const { onSign } = useGetSign()

  const _handleShowStakingModal = () => {
    setShowStakingModal(true)
  }

  useEffect(() => {
    if (requestStatus) {
      setIsApproved(true)
    }
  }, [requestStatus, setIsApproved])

  const _handleShowUnstakeConfirm = () => {
    setShowUnstakingConfirm(true)
  }

  const _handleCloseConfirm = () => {
    setShowUnstakingConfirm(false)
  }

  const _handleCloseModal = () => {
    setShowStakingModal(false)
  }

  const _handleClaimTicket = async () => {
    try {
      setPendingTx(true)
      const signData = await onSign(account, id)
      if (signData) {
        const transaction = await poolContract.claimKey(
          id,
          signData.sigature.feeTokenAmount,
          signData.sigature.signID,
          signData.sigature.v,
          signData.sigature.r,
          signData.sigature.s,
        )
        await transaction.wait()
        setPendingTx(false)
        setUpdatePool(true)
        setAvailableTicket(0)
        toastSuccess(`${t('Claimed')}!`, t('You claimed ticket successful!'))
      }
    } catch (err) {
      setPendingTx(false)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
    }
  }

  return (
    <>
      {!isApproved && !requestedApproval && (
        <button
          type="button"
          className="bg-skyblue rounded-[20px] border-none text-[#212121] text-sm font-semibold h-[42px] px-10 shadow-blue min-w-[186px]"
          onClick={handleApprove}
        >
          Approve contract
        </button>
      )}

      {!isApproved && requestedApproval && (
        <button
          type="button"
          className="flex items-center justify-center text-sm h-[42px] px-7 min-w-[186px] font-semibold rounded-[20px] text-black pointer-events-none bg-[#9E9E9E] transition ease-in-out duration-150 cursor-not-allowed"
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

      {isApproved && (
        <div className="flex justify-center md:justify-end items-center w-full gap-x-5">
          {amount !== '0' && (
            <>
              <button
                type="button"
                className="rounded-[20px] text-sm font-semibold h-[42px] px-5 min-w-[140px] md:px-10 md:min-w-[186px]
              bg-transparent border-[1px] border-solid border-skyblue text-skyblue"
                onClick={() => _handleShowUnstakeConfirm()}
              >
                Unstake
              </button>
              {!pendingTx && (
                <button
                  type="button"
                  className={`rounded-[20px] border-none  text-sm font-semibold h-[42px] text-[#212121] px-5 min-w-[140px] md:px-10 md:min-w-[186px] ${
                    availableTicket === 0 ? 'bg-disabled pointer-events-none' : 'bg-skyblue shadow-blue'
                  }`}
                  onClick={() => _handleClaimTicket()}
                >
                  Claim tickets
                </button>
              )}
              {pendingTx && (
                <button
                  type="button"
                  className="flex items-center justify-center text-sm h-[42px] px-7 min-w-[186px] font-semibold rounded-[20px] text-black pointer-events-none bg-[#9E9E9E] transition ease-in-out duration-150 cursor-not-allowed"
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
            </>
          )}
          {amount === '0' && (
            <button
              type="button"
              className="rounded-[20px] border-none  text-sm font-semibold h-[42px] px-5 min-w-[140px] md:px-10 md:min-w-[186px] bg-skyblue shadow-blue text-[#212121]"
              onClick={() => _handleShowStakingModal()}
            >
              Stake BCTZ
            </button>
          )}
          {showStakingModal && (
            <StakingModal
              pool={pool}
              onClose={_handleCloseModal}
              setUpdatePool={setUpdatePool}
              account={account}
              addressInfo={addressInfo}
            />
          )}
          {showUnstakingConfirm && (
            <UnstakingConfirm
              pool={pool}
              onClose={_handleCloseConfirm}
              setUpdatePool={setUpdatePool}
              availableTicket={availableTicket}
              setAvailableTicket={setAvailableTicket}
              account={account}
            />
          )}
        </div>
      )}
    </>
  )
}

export default StakingAction
