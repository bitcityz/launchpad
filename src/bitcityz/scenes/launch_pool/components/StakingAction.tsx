import React, { useState, useEffect } from 'react'
import { Skeleton } from '@mexi/uikit'
import '../../../assets/index.css'
import StakingModal from 'bitcityz/components/modal/Stake/StakingModal'
import UnstakingConfirm from 'bitcityz/components/modal/Stake/UnstakingConfirm'
import { useERC20 } from 'hooks/useContract'
import { useApprovePool } from '../hooks/useApprove'

function StakingAction({ pool, setUpdatePool, setIsApproved }) {
  const [showStakingModal, setShowStakingModal] = useState(false)
  const [showUnstakingConfirm, setShowUnstakingConfirm] = useState(false)
  const { amount, lockingToken, isApproved } = pool
  const stakingTokenContract = useERC20(lockingToken || '')
  const { handleApprove, requestedApproval, requestStatus } = useApprovePool(stakingTokenContract)

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
          <button
            type="button"
            className={` rounded-[20px] border-none  text-sm font-semibold h-[42px] px-5 min-w-[140px] md:px-10 md:min-w-[186px] ${
              amount !== '0'
                ? 'bg-skyblue shadow-blue text-[#212121]'
                : 'pointer-events-none text-[#F5F5F5] bg-disabled '
            }`}
            onClick={() => _handleShowUnstakeConfirm()}
          >
            Unstake
          </button>
          <button
            type="button"
            className={` rounded-[20px] border-none  text-sm font-semibold h-[42px] px-5 min-w-[140px] md:px-10 md:min-w-[186px] ${
              amount === '0'
                ? 'bg-skyblue shadow-blue text-[#212121]'
                : 'pointer-events-none text-[#F5F5F5] bg-disabled '
            }`}
            onClick={() => _handleShowStakingModal()}
          >
            Stake BCTZ
          </button>
          {showStakingModal && <StakingModal pool={pool} onClose={_handleCloseModal} setUpdatePool={setUpdatePool} />}
          {showUnstakingConfirm && (
            <UnstakingConfirm pool={pool} onClose={_handleCloseConfirm} setUpdatePool={setUpdatePool} />
          )}
        </div>
      )}
    </>
  )
}

export default StakingAction
