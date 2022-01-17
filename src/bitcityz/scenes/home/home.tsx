import React, { useState, useMemo, useEffect, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import { getLaunchPoolAddress, getTicketAddress, getIdoAddress } from 'utils/addressHelpers'
import launchPoolABI from 'config/abi/launchPool.json'
import launchPoolTicketABI from 'config/abi/launchPoolTicket.json'
import bitcityIdoABI from 'config/abi/bitcityIdo.json'
import { multicallv2 } from 'utils/multicall'
import useGetBalanceOf from '../../hooks/useGetBalanceOf'

import Summary from './components/Summary'
import UpcomingPoolTab from './components/UpcomingPoolTab'
import LaunchPool from './components/LaunchPool'
import Performance from './components/Performance'
import { Spinner } from '../../components'
import ApplyLaunch from './components/ApplyLaunch'
import HomeHeader from './components/HomeHeader'
import '../../assets/index.css'
import bg from '../../assets/images/bg-summary.png'

const POOLS = [0, 1, 2]
const PRICE_USDT = 1
function Home() {
  const [pools, setPools] = useState([])
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const launchPoolAddress = getLaunchPoolAddress()

  const ticketAddress = getTicketAddress()

  const idoAddress = getIdoAddress()

  const { balance } = useGetBalanceOf(launchPoolAddress)
  const [totalFundRaised, setTotalFundRaised] = useState(0)
  const [totalProjects, setTotalProjects] = useState(0)
  const [totalInvestors, setTotalInvestors] = useState(0)

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

  const idoCalls = useMemo(() => {
    return [{ address: idoAddress, name: 'poolLength' }]
  }, [idoAddress])

  const fetchIDOData = useCallback(async () => {
    const idoDataCalls = ['investorsLength', 'projectsLength'].map((method) => ({
      address: idoAddress,
      name: method,
    }))

    const [investorsLength, projectsLength] = await multicallv2(bitcityIdoABI, idoDataCalls)
    setTotalProjects(Number(projectsLength))
    setTotalInvestors(Number(investorsLength))
  }, [idoAddress])

  useEffect(() => {
    fetchIDOData()
  }, [fetchIDOData])

  useEffect(() => {
    setIsLoading(true)
    const getTotalFundRaised = async () => {
      const poolLength = await multicallv2(bitcityIdoABI, idoCalls)
      const totalPool = Number(poolLength[0][0]._hex)
      const idoList = []
      for (let i = 0; i < totalPool; i++) {
        idoList.push(i)
      }
      const calls = idoList.map((data, index) => {
        return { address: idoAddress, name: 'poolInfo', params: [index] }
      })

      const idoInfos = await multicallv2(bitcityIdoABI, calls)
      setProjects(idoInfos)
      const getFundRaisedCalls = idoInfos.map((ido) => {
        return { address: idoAddress, name: 'totalFundRaised', params: [ido.idoToken2Buy] }
      })
      const fundRaised = await multicallv2(bitcityIdoABI, getFundRaisedCalls)
      setTotalFundRaised(0)
      fundRaised.forEach((value) => {
        setTotalFundRaised((val) => val + Number(new BigNumber(value).dividedBy(DEFAULT_TOKEN_DECIMAL)) * PRICE_USDT)
      })
      setIsLoading(false)
    }
    getTotalFundRaised()
  }, [idoAddress, idoCalls])

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
      {isLoading && <Spinner />}
      <div className="layout-container">
        <HomeHeader />
        <Summary
          balance={balance}
          totalFundRaised={totalFundRaised}
          totalProjects={totalProjects}
          totalInvestors={totalInvestors}
        />
        <UpcomingPoolTab pools={pools} projects={projects} />
        <LaunchPool pools={pools} />
        {/* <Performance /> */}
        <ApplyLaunch />
      </div>
    </div>
  )
}

export default Home
