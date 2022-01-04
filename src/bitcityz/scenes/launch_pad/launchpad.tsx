import React, { useEffect, useMemo, useState } from 'react'
import '../../assets/index.css'

import { getIdoAddress, getLaunchPoolAddress, getTicketAddress } from 'utils/addressHelpers'
import { multicallv2 } from 'utils/multicall'
import launchPoolTicketABI from 'config/abi/launchPoolTicket.json'
import bitcityIdoABI from 'config/abi/bitcityIdo.json'

import UpcomingPool from './components/UpcomingPool'
import RegisterWhitelist from './components/RegisterWhitelist'
import InProgress from './components/InProgress'
import Completed from './components/Completed'
import { Spinner } from '../../components'

import textSvg from '../../assets/images/launchpad.svg'
import line1 from '../../assets/images/line1.svg'
import line2 from '../../assets/images/line2.svg'
import calendarAdd from '../../assets/images/calendar-add.svg'
import activitySvg from '../../assets/images/activity.svg'
import editSvg from '../../assets/images/edit.svg'
import taskSquare from '../../assets/images/task-square.svg'
import calendarAddActive from '../../assets/images/calendar-add-active.svg'
import activityActiveSvg from '../../assets/images/activity-active.svg'
import editActiveSvg from '../../assets/images/edit-active.svg'
import taskSquareActive from '../../assets/images/task-square-active.svg'

const POOLS = [0, 1, 2]

function LaunchPad() {
  const [tabIndex, setTabIndex] = useState(1)
  const [pools, setPools] = useState([])
  const _handleChangeTab = (index) => {
    setTabIndex(index)
  }

  const ticketAddress = getTicketAddress()
  const idoAddress = getIdoAddress()
  const [idos, setIdos] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const idoCalls = useMemo(() => {
    return [{ address: idoAddress, name: 'poolLength' }]
  }, [idoAddress])

  const ticketCalls = useMemo(
    () =>
      POOLS.map((id) => {
        return { address: ticketAddress, name: 'types', params: [id] }
      }),
    [ticketAddress],
  )

  useEffect(() => {
    const initialData = async () => {
      const idoList = await multicallv2(bitcityIdoABI, idoCalls)
      const poolLst = await multicallv2(launchPoolTicketABI, ticketCalls)
      const calls = idoList.map((data, index) => {
        return { address: idoAddress, name: 'poolInfo', params: [index] }
      })

      const idoInfos = await multicallv2(bitcityIdoABI, calls)
      setPools(poolLst)
      setIdos(idoInfos)
      setIsLoading(false)
    }
    initialData()
  }, [idoCalls, ticketCalls, idoAddress])

  return (
    <div className="bg-[#050e21]  py-[110px]">
      {isLoading && <Spinner />}
      <div className="layout-container">
        <div className="text-center">
          <img src={textSvg} className="mx-auto" alt="" />
          <h2 className="text-center text-[#F5F5F5] font-bold text-[32px]">Launchpad</h2>
          <p className="text-[#F5F5F5] text-center max-w-[547px] mx-auto mt-6">
            Stake <span className="font-semibold">3 pools</span> at the same time. Get more opportunities to own hidden
            gems
          </p>
        </div>
        <div className="text-center">
          <img src={line1} className="mt-14 w-full h-auto" alt="" />
          <div className="grid grid-cols-4 gap-x-8">
            <button
              type="button"
              className={` tab ${tabIndex === 1 ? 'tab-active' : ''}`}
              onClick={() => _handleChangeTab(1)}
            >
              {tabIndex === 1 ? (
                <img src={calendarAddActive} className="ml-1" alt="" />
              ) : (
                <img src={calendarAdd} className="ml-1" alt="" />
              )}
              Upcoming
            </button>
            <button
              type="button"
              className={` tab ${tabIndex === 2 ? 'tab-active' : ''}`}
              onClick={() => _handleChangeTab(2)}
            >
              {tabIndex === 2 ? (
                <img src={editActiveSvg} className="ml-1" alt="" />
              ) : (
                <img src={editSvg} className="ml-1" alt="" />
              )}
              Register Whitelist
            </button>
            <button
              type="button"
              className={` tab ${tabIndex === 3 ? 'tab-active' : ''}`}
              onClick={() => _handleChangeTab(3)}
            >
              {tabIndex === 3 ? (
                <img src={activityActiveSvg} className="ml-1" alt="" />
              ) : (
                <img src={activitySvg} className="ml-1" alt="" />
              )}
              In progress
            </button>
            <button
              type="button"
              className={` tab ${tabIndex === 4 ? 'tab-active' : ''}`}
              onClick={() => _handleChangeTab(4)}
            >
              {tabIndex === 4 ? (
                <img src={taskSquareActive} className="ml-1" alt="" />
              ) : (
                <img src={taskSquare} className="ml-1" alt="" />
              )}
              Completed
            </button>
          </div>
          <img src={line2} className="w-full h-auto" alt="" />
        </div>
        {tabIndex === 1 && <UpcomingPool idos={idos} pools={pools} />}
        {tabIndex === 2 && <RegisterWhitelist idos={idos} />}
        {tabIndex === 3 && <InProgress />}
        {tabIndex === 4 && <Completed />}
      </div>
    </div>
  )
}

export default LaunchPad
