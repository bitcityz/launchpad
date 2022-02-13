import React, { useEffect, useMemo, useState } from 'react'
import '../../assets/index.css'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import BigNumber from 'bignumber.js'
import { multicallv2 } from 'utils/multicall'
import { useWeb3React } from '@web3-react/core'
import { useTokenContract } from 'hooks/useContract'
import { getLaunchPoolAddress, getTicketAddress } from 'utils/addressHelpers'
import launchPoolABI from 'config/abi/launchPool.json'
import launchPoolTicketABI from 'config/abi/launchPoolTicket.json'
import useGetBalanceOf from '../../hooks/useGetBalanceOf'
import PoolList from './components/PoolList'
import LaunchpoolHeader from './components/LaunchpoolHeader'

const bctz = '0xE90CABC44faE173881879BFD87A736BA0bE31305'
const POOLS = [0, 1, 2]
function LaunchPool() {
  const erc20Contract = useTokenContract(bctz)

  const { account } = useWeb3React()
  const launchPoolAddress = getLaunchPoolAddress()
  const ticketAddress = getTicketAddress()

  const [pools, setPools] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isApproved, setIsApproved] = useState(false)
  const [updatePool, setUpdatePool] = useState(false)

  const { balance } = useGetBalanceOf(account)

  const userCalls = useMemo(
    () =>
      POOLS.map((id) => {
        return { address: launchPoolAddress, name: 'userInfo', params: [id, account] }
      }),
    [account, launchPoolAddress],
  )

  const poolCalls = useMemo(
    () =>
      POOLS.map((id) => {
        return { address: launchPoolAddress, name: 'poolInfo', params: [id] }
      }),
    [launchPoolAddress],
  )

  const ticketCalls = useMemo(
    () =>
      POOLS.map((id) => {
        return { address: ticketAddress, name: 'types', params: [id] }
      }),
    [ticketAddress],
  )

  useEffect(() => {
    const initialData = async () => {
      let userInfos
      if (account) {
        userInfos = await multicallv2(launchPoolABI, userCalls)
        erc20Contract.allowance(account, launchPoolAddress)
        const res = await erc20Contract.allowance(account, launchPoolAddress)
        setIsApproved(res && new BigNumber(res._hex).isGreaterThan(0))
      }
      const poolInfos = await multicallv2(launchPoolABI, poolCalls)

      const ticketInfos = await multicallv2(launchPoolTicketABI, ticketCalls)

      const data = poolInfos.map((pool, index) => {
        const info = userInfos ? userInfos[index] : null
        return {
          id: index,
          amount: info ? new BigNumber(info.amount._hex).div(DEFAULT_TOKEN_DECIMAL).toString() : '0',
          startTime: info ? new BigNumber(info.startTime._hex).toString() : '0',
          name: pool.name,
          lockingToken: pool.lockingToken,
          lockingTime: new BigNumber(pool.lockingTime._hex).toString(),
          minLockingAmount: new BigNumber(pool.minLockingAmount._hex).toString(),
          isApproved,
          balance,
          ticketHash: ticketInfos[index].hash,
        }
      })
      setPools(data)
      setUpdatePool(false)
      setIsLoading(false)
    }
    initialData()
  }, [account, userCalls, poolCalls, ticketCalls, isApproved, balance, updatePool, erc20Contract, launchPoolAddress])
  return (
    <>
      <LaunchpoolHeader />
      <div className="pb-[240px]">
        <div className="layout-container">
          <PoolList
            pools={pools}
            account={account}
            isLoading={isLoading}
            setUpdatePool={setUpdatePool}
            launchPoolAddress={launchPoolAddress}
            setIsApproved={setIsApproved}
          />
        </div>
      </div>
    </>
  )
}

export default LaunchPool
