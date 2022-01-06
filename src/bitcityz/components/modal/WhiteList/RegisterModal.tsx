import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import useStakePool from '../../../scenes/launch_pool/hooks/useStakePool'
import useRegisterWhitelist from '../../../scenes/launch_pad/hooks/useRegisterWhitelist'
import { Spinner } from '../../spinner'
import '../../../assets/index.css'
import bgStaking from '../../../assets/images/bg-staking.png'

function RegisterModal({ onClose, idoName, ticket, ticketId, ido }) {
  const { t } = useTranslation()

  const { onRegister } = useRegisterWhitelist()

  const { toastSuccess, toastError } = useToast()

  const ticketQty = 1
  const [pendingTx, setPendingTx] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleConfirmClick = async () => {
    setPendingTx(true)
    try {
      // register whitelist
      console.log(ido)
      await onRegister(ido.id, ticketId)
      toastSuccess(`${t('Registed')}!`, t('You have successfully registered for the whitelist'))

      setPendingTx(false)
      onClose()
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
      {pendingTx && <Spinner />}
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
          <button
            type="button"
            className={` rounded-[20px] border-none  text-sm font-semibold h-[44px] px-5 min-w-[140px] md:px-10  md:min-w-[200px] ${
              ticket > 0 ? 'bg-skyblue shadow-blue text-black' : 'pointer-events-none text-[#F5F5F5] bg-disabled '
            }`}
            onClick={handleConfirmClick}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default RegisterModal
