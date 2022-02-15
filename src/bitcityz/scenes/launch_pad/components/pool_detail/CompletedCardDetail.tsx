import React, { useState } from 'react'
import '../../../../assets/index.css'

import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import useRefund from '../../hooks/useRefund'

import Social from '../Social'

function CompletedCardDetail({ idoPool, account, claimPercent, isBuyer, setIsBuyer }) {
  const { t } = useTranslation()
  const { toastSuccess, toastError } = useToast()

  const [pendingTx, setPendingTx] = useState(false)
  const { onRefund } = useRefund(idoPool.id)

  const handleRefundClick = async () => {
    setPendingTx(true)
    try {
      // refund
      await onRefund()
      setIsBuyer(false)
      toastSuccess(`${t('Refund')}!`, t('You are refund successful!'))
      setPendingTx(false)
    } catch (e) {
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setPendingTx(false)
    }
  }

  return (
    <div className="flex-1 grid md:gap-x-4 md:whitelist-card-grid">
      <div>
        <div className="flex items-start gap-x-3">
          <img src={idoPool.baseInfo.logo.small} alt="" />
          <div className="flex-1">
            <p className="text-[#F5F5F5] leading-5 flex justify-between items-center">
              {idoPool.baseInfo.name}{' '}
              <span className="text-[#F5F5F5] leading-5 font-semibold text-xs md:text-base md:hidden">
                ({idoPool.baseInfo.symbol}/{idoPool.baseInfo.currencyPair})
              </span>
            </p>
            <p className="text-[#F5F5F5] text-xl font-bold leading-6 mt-1">{idoPool.baseInfo.symbol}</p>
            <p className="text-sm text-[#BFBFBF] hidden md:block">{idoPool.baseInfo.shortDescription}</p>
          </div>
        </div>
        <Social idoInfo={idoPool.baseInfo} />
      </div>
      <div className="">
        <p className="text-[#F5F5F5] hidden text-right leading-5 font-semibold text-xs md:text-base md:block">
          ({idoPool.baseInfo.symbol}/{idoPool.baseInfo.currencyPair})
        </p>
        <div className="w-full md:mt-16 md:w-auto order-3 md:-order-none">
          {account && isBuyer && claimPercent === 0 && !pendingTx && (
            <button
              type="button"
              className="bg-skyblue mt-auto rounded-[20px] border-none text-black font-semibold h-[44px] w-full md:px-14 shadow-blue"
              onClick={handleRefundClick}
            >
              Refund
            </button>
          )}
          {account && isBuyer && claimPercent === 0 && pendingTx && (
            <button
              type="button"
              className="flex items-center justify-center w-full h-[44px] font-semibold rounded-[20px] text-black pointer-events-none bg-[#9E9E9E] transition ease-in-out duration-150 cursor-not-allowed"
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
          {account && !isBuyer && (
            <p className="text-[#FF4D4F] font-semibold border-[1px] border-solid border-[#FF4D4F] rounded-[20px] flex items-center justify-center h-[44px] px-4">
              You did not join the pool
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default CompletedCardDetail
