import React, { useState } from 'react'

import '../../../assets/index.css'
import StakingModal from 'bitcityz/components/modal/Stake/StakingModal'
import UnstakingConfirm from 'bitcityz/components/modal/Stake/UnstakingConfirm'
import { useERC20 } from 'hooks/useContract'
import { useApprovePool } from '../hooks/useApprove'

function StakingAction({ pool, setUpdatePool }) {
  const [showStakingModal, setShowStakingModal] = useState(false)
  const [showUnstakingConfirm, setShowUnstakingConfirm] = useState(false)
  const { id, amount, lockingToken, minLockingAmount, name, startTime, lockingTime, isApproved, balance } = pool
  const stakingTokenContract = useERC20(lockingToken || '')
  const { handleApprove, requestedApproval } = useApprovePool(stakingTokenContract)

  const _handleShowStakingModal = () => {
    setShowStakingModal(true)
  }

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
      {!isApproved ? (
        <button
          type="button"
          className="bg-skyblue rounded-[20px] border-none text-black text-sm font-semibold h-[42px] px-10 shadow-blue min-w-[186px]"
          onClick={handleApprove}
        >
          Approve contract
        </button>
      ) : (
        <div className="flex justify-end items-center w-full gap-x-5">
          {/* <button
            type="button"
            className={` rounded-[20px] border-none  text-sm font-semibold h-[42px] px-10 min-w-[186px] ${
              startTime !== '0'
                ? 'bg-skyblue shadow-blue text-black'
                : 'pointer-events-none text-[#F5F5F5] bg-disabled '
            }`}
          >
            Claim ticket
          </button> */}
          <button
            type="button"
            className={` rounded-[20px] border-none  text-sm font-semibold h-[42px] px-10 min-w-[186px] ${
              amount !== '0' ? 'bg-skyblue shadow-blue text-black' : 'pointer-events-none text-[#F5F5F5] bg-disabled '
            }`}
            onClick={() => _handleShowUnstakeConfirm()}
          >
            Unstake
          </button>
          <button
            type="button"
            className={` rounded-[20px] border-none  text-sm font-semibold h-[42px] px-10 min-w-[186px] ${
              amount === '0' ? 'bg-skyblue shadow-blue text-black' : 'pointer-events-none text-[#F5F5F5] bg-disabled '
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
