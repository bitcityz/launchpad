import React, { useState, useMemo, useEffect } from 'react'
import BigNumber from 'bignumber.js'
import { getLaunchPoolAddress, getTicketAddress } from 'utils/addressHelpers'
import launchPoolABI from 'config/abi/launchPool.json'
import launchPoolTicketABI from 'config/abi/launchPoolTicket.json'
import { multicallv2 } from 'utils/multicall'

import Summary from './components/Summary'
import UpcomingPoolTab from './components/UpcomingPoolTab'
import LaunchPool from './components/LaunchPool'
import Performance from './components/Performance'
import ApplyLaunch from './components/ApplyLaunch'
import HomeHeader from './components/HomeHeader'
import '../../assets/index.css'
import bg from '../../assets/images/bg-summary.png'

const POOLS = [0, 1, 2]
function Home() {
  const [pools, setPools] = useState([])

  const launchPoolAddress = getLaunchPoolAddress()

  const ticketAddress = getTicketAddress()

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
      const poolInfos = await multicallv2(launchPoolABI, poolCalls)

      const ticketInfos = await multicallv2(launchPoolTicketABI, ticketCalls)

      const data = poolInfos.map((pool, index) => {
        return {
          id: index,
          name: pool.name,
          lockingToken: pool.lockingToken,
          lockingTime: new BigNumber(pool.lockingTime._hex).toString(),
          minLockingAmount: new BigNumber(pool.minLockingAmount._hex).toString(),
          ticketHash: ticketInfos[index].hash,
        }
      })
      setPools(data)
    }
    initialData()
  }, [poolCalls, ticketCalls])

  return (
    <div className="bg-[#050e21] bg-no-repeat bg-top" style={{ backgroundImage: `url(${bg})` }}>
      <div className="layout-container">
        <HomeHeader />
        <Summary />
        <UpcomingPoolTab pools={pools} />
        <LaunchPool pools={pools} />
        <Performance />
        <ApplyLaunch />
      </div>
    </div>
  )
}

export default Home
