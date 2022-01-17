import React, { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { ethers, Contract } from 'ethers'
import { useTranslation } from 'contexts/Localization'
import { useCake, useTokenContract, useCakeVaultContract } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import { getLaunchPoolAddress } from 'utils/addressHelpers'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'

const bctz = '0xE90CABC44faE173881879BFD87A736BA0bE31305'
export const useApprovePool = (lpContract: Contract) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { t } = useTranslation()

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const tx = await callWithGasPrice(lpContract, 'approve', [getLaunchPoolAddress(), ethers.constants.MaxUint256])
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess(
          t('Contract Enabled'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}>
            {t('You can now stake in the %symbol% pool!')}
          </ToastDescriptionWithTx>,
        )
        setRequestedApproval(false)
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
    }
  }, [lpContract, t, toastError, toastSuccess, callWithGasPrice])

  return { handleApprove, requestedApproval }
}

// Approve CAKE auto pool
export const useVaultApprove = (setLastUpdated: () => void) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { t } = useTranslation()
  const { toastSuccess, toastError } = useToast()
  const cakeVaultContract = useCakeVaultContract()
  const { callWithGasPrice } = useCallWithGasPrice()
  const cakeContract = useCake()

  const handleApprove = async () => {
    const tx = await callWithGasPrice(cakeContract, 'approve', [cakeVaultContract.address, ethers.constants.MaxUint256])
    setRequestedApproval(true)
    const receipt = await tx.wait()
    if (receipt.status) {
      toastSuccess(
        t('Contract Enabled'),
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {t('You can now stake in the %symbol% vault!', { symbol: 'CAKE' })}
        </ToastDescriptionWithTx>,
      )
      setLastUpdated()
      setRequestedApproval(false)
    } else {
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setRequestedApproval(false)
    }
  }

  return { handleApprove, requestedApproval }
}

export const useCheckApprovalStatus = () => {
  const [isAllowanceApproved, setIsAllowanceApproved] = useState(false)
  const { account } = useWeb3React()
  const erc20Contract = useTokenContract(bctz)
  const launchPoolAddress = getLaunchPoolAddress()
  useEffect(() => {
    const checkApprovalStatus = async () => {
      try {
        const currentAllowance = await erc20Contract.allowance(account, launchPoolAddress)
        setIsAllowanceApproved(currentAllowance.gt(0))
      } catch (error) {
        setIsAllowanceApproved(false)
      }
    }

    checkApprovalStatus()
  }, [account, erc20Contract, launchPoolAddress])

  return { isAllowanceApproved }
}
