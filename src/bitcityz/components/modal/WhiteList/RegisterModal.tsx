import React, { useEffect, useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import { getIdoAddress } from 'utils/addressHelpers'
import useToast from 'hooks/useToast'
import { useTicketContract, useIdoContract } from 'hooks/useContract'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useApprove from '../../../scenes/launch_pad/hooks/useApprove'
import '../../../assets/index.css'
import bgStaking from '../../../assets/images/bg-staking.png'

const NOT_ON_IDO = '0x0000000000000000000000000000000000000000'
function RegisterModal({ onClose, idoName, ticket, ticketId, ido, setUpdateWhitelist }) {
  const { t } = useTranslation()

  const ticketContract = useTicketContract()
  const idoContract = useIdoContract()
  const idoAddress = getIdoAddress()

  const { toastSuccess } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()

  const ticketQty = 1
  const [pendingTx, setPendingTx] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const { isApproved, handleApprove, handleConfirm } = useApprove({
    onRequiresApproval: async () => {
      try {
        const response = await ticketContract.getApproved(ticketId)
        return NOT_ON_IDO !== response
      } catch (error) {
        return false
      }
    },
    onApprove: () => {
      setPendingTx(true)
      return callWithGasPrice(ticketContract, 'approve', [idoAddress, ticketId])
    },
    onApproveSuccess: async () => {
      setPendingTx(false)
      toastSuccess(t('Contract approved - you can now register whitelist!'))
    },
    onConfirm: () => {
      setPendingTx(true)
      return callWithGasPrice(idoContract, 'whitelist', [ido.id, ticketId])
    },
    onSuccess: async () => {
      setPendingTx(false)
      setUpdateWhitelist(true)
      onClose()
      toastSuccess(`${t('Registed')}!`, t('You have successfully registered for the whitelist'))
    },
    onError: async () => {
      setPendingTx(false)
    },
  })

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
        <h6 className="text-[#F5F5F5] text-xl md:text-[28px] font-bold text-center">
          Register <span className="text-skyblue text-shadow">{idoName} round</span> whitelist
        </h6>
        <p className="text-[#F5F5F5] text-center mt-3">
          Project: <span className="text-skyblue text-shadow font-semibold"> Goose FX Finance</span>
        </p>
        <div className="mt-7">
          <div className="bg-white text-right px-4 py-3 max-w-[150px] rounded-[20px] flex items-center gap-x-2 mx-auto">
            <input
              type="text"
              value={ticketQty}
              pattern="^[0-9]*[.,]?[0-9]{0,18}$"
              readOnly
              className="bg-transparent border-none max-w-[50px] text-[#9E9E9E] font-semibold flex-1 text-right pt-[1px]"
              placeholder="0.00"
            />
            <span className="text-[#212121] font-semibold">Tickets</span>
          </div>
          {/* <button
            type="button"
            className="bg-skyblue rounded-[20px] border-none text-black text-sm font-semibold h-[44px] px-5 md:px-10 shadow-blue"
            onClick={handleSelectMax}
          >
            Max
          </button> */}
        </div>
        <p className="text-[#F5F5F5] text-center mt-4">
          Available tickets:
          <span className="text-skyblue text-shadow font-semibold"> {ticket} Tickets</span>
        </p>
        <div className="flex justify-center gap-x-6 items-center mt-5">
          <button
            type="button"
            className="bg-transparent border-[#7BF5FB] border-solid border-[1px] rounded-[20px] h-[44px] text-[#7BF5FB] px-5 min-w-[140px] md:px-10 font-semibold md:min-w-[200px]"
            onClick={onClose}
          >
            Cancel
          </button>
          {isApproved && !pendingTx && (
            <button
              type="button"
              className={` rounded-[20px] border-none  text-sm font-semibold h-[44px] px-5 min-w-[140px] md:px-10  md:min-w-[200px] ${
                ticket > 0 ? 'bg-skyblue shadow-blue text-black' : 'pointer-events-none text-[#F5F5F5] bg-disabled '
              }`}
              onClick={handleConfirm}
            >
              Confirm
            </button>
          )}

          {!isApproved && !pendingTx && (
            <button
              type="button"
              className={` rounded-[20px] border-none  text-sm font-semibold h-[44px] px-5 min-w-[140px] md:px-10  md:min-w-[200px] ${
                ticket > 0 ? 'bg-skyblue shadow-blue text-black' : 'pointer-events-none text-[#F5F5F5] bg-disabled '
              }`}
              onClick={handleApprove}
            >
              Approve
            </button>
          )}
          {pendingTx && (
            <button
              type="button"
              className="flex items-center justify-center text-sm h-[44px] px-5 min-w-[140px] md:px-10  md:min-w-[200p font-semibold rounded-[20px] text-black pointer-events-none bg-[#9E9E9E] transition ease-in-out duration-150 cursor-not-allowed"
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

export default RegisterModal
