import React, { useState, useEffect } from 'react'
import '../../../assets/index.css'

function StakingButton() {
    const [amount, setAmount] = useState('0');
  return (
    <>
        {/* { !isLoading ? ( */}
            <button
                type="button"
                className={` rounded-[20px] border-none  text-sm font-semibold h-[42px] px-5 min-w-[140px] md:px-10 md:min-w-[186px] ${
                    amount === '0' ? 'bg-skyblue shadow-blue text-black' : 'pointer-events-none text-[#F5F5F5] bg-disabled '
                }`}
                // onClick={() => _handleShowStakingModal()}
                >
                Stake BCTZ
            </button>
        {/* ) : (
            <button
                type="button"
                className="flex items-center justify-center text-sm h-[42px] px-5 min-w-[140px] md:px-10 md:min-w-[186px] font-semibold rounded-[20px] text-[#F5F5F5] pointer-events-none bg-disabled transition ease-in-out duration-150 cursor-not-allowed"
                disabled
            >
                <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#F5F5F5]"
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
        )} */}
    </>
  )
}

export default StakingButton