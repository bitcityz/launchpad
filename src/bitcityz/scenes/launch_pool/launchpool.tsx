import React, { useEffect, useMemo, useState } from 'react'
import '../../assets/index.css'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import BigNumber from 'bignumber.js'
import { multicallv2 } from 'utils/multicall'
import { useWeb3React } from '@web3-react/core'
import { useTokenContract } from 'hooks/useContract'
import { getLaunchPoolAddress } from 'utils/addressHelpers'
import launchPoolABI from 'config/abi/launchPool.json'
import PoolList from './components/PoolList'

const bctz = '0xE90CABC44faE173881879BFD87A736BA0bE31305'
const POOLS = [0, 1, 2]
function LaunchPool() {
  const erc20Contract = useTokenContract(bctz)

  const { account } = useWeb3React()
  const launchPoolAddress = getLaunchPoolAddress()

  const [pools, setPools] = useState([])
  const [isApproved, setIsApproved] = useState(false)
  const [balance, setBalance] = useState(new BigNumber(0))

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

  useEffect(() => {
    if (account) {
      erc20Contract.allowance(account, launchPoolAddress).then((res) => {
        setIsApproved(res && new BigNumber(res._hex).isGreaterThan(0))
      })
      erc20Contract.balanceOf(account).then((res) => {
        setBalance(res)
      })
    }
  }, [erc20Contract, account, launchPoolAddress])

  useEffect(() => {
    const initialData = async () => {
      let userInfos
      if (account) {
        userInfos = await multicallv2(launchPoolABI, userCalls)
      }
      const poolInfos = await multicallv2(launchPoolABI, poolCalls)
      console.log(poolInfos)
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
        }
      })
      setPools(data)
    }
    initialData()
  }, [account, userCalls, poolCalls, isApproved, balance])

  return (
    <div className="bg-[#050e21] bg-no-repeat bg-top">
      <div className="layout-container">
        <PoolList pools={pools} account={account} />
      </div>
    </div>
  )
}

export default LaunchPool
