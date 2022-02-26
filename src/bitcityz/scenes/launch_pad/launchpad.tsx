import React, { useEffect, useMemo, useState } from 'react'
import '../../assets/index.css'

import { getIdoAddress, getTicketAddress } from 'utils/addressHelpers'
import { useWeb3React } from '@web3-react/core'
import { multicallv2 } from 'utils/multicall'
import launchPoolTicketABI from 'config/abi/launchPoolTicket.json'
import bitcityIdoABI from 'config/abi/bitcityIdo.json'
import useGetPools from '../../hooks/useGetPools'

import UpcomingPool from './components/UpcomingPool'
import RegisterWhitelist from './components/RegisterWhitelist'
import InProgress from './components/InProgress'
import Completed from './components/Completed'
// import { Spinner } from '../../components'

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
  const { account } = useWeb3React()
  const [tabIndex, setTabIndex] = useState(1)
  const [pools, setPools] = useState([])
  const { listPool, isLoading: isLoadingPool } = useGetPools()
  const _handleChangeTab = (index) => {
    setTabIndex(index)
  }

  const ticketAddress = getTicketAddress()
  const idoAddress = getIdoAddress()
  const [isLoading, setIsLoading] = useState(true)
  const [upcoming, setUpcoming] = useState([])
  const [registerWhitlis, setRegisterWhitelist] = useState([])
  const [inprogress, setInprogress] = useState([])
  const [completed, setCompleted] = useState([])

  const ticketCalls = useMemo(
    () =>
      POOLS.map((id) => {
        return { address: ticketAddress, name: 'types', params: [id] }
      }),
    [ticketAddress],
  )

  useEffect(() => {
    let isMounted = true
    const initialData = async () => {
      const poolLst = await multicallv2(launchPoolTicketABI, ticketCalls)
      const visiblePools = listPool.filter((p) => {
        return p.delFlg === false
      })
      const calls = visiblePools.map((data) => {
        return { address: idoAddress, name: 'poolInfo', params: [data.id] }
      })

      const idoInfos = await multicallv2(bitcityIdoABI, calls)
      setPools(poolLst)

      const upcomingPr = []
      const whitelistPr = []
      const inprogressPr = []
      const completedPr = []
      idoInfos.forEach((ido) => {
        const baseInfo = []
        visiblePools.forEach((el) => {
          baseInfo.push(el[ido.idoToken])
        })

        if (Number(ido.status._hex) === 0 && baseInfo[0]) {
          upcomingPr.push({ id: baseInfo[0].id, ...ido, baseInfo: baseInfo[0] })
        } else if (Number(ido.status._hex) === 1 && baseInfo[0]) {
          whitelistPr.push({ id: baseInfo[0].id, ...ido, baseInfo: baseInfo[0] })
        } else if (Number(ido.status._hex) === 2 && baseInfo[0]) {
          inprogressPr.push({ id: baseInfo[0].id, ...ido, baseInfo: baseInfo[0] })
        } else if (Number(ido.status._hex) === 3 && baseInfo[0]) {
          completedPr.push({ id: baseInfo[0].id, ...ido, baseInfo: baseInfo[0] })
        }
      })
      if (isMounted) {
        setUpcoming(upcomingPr)
        setRegisterWhitelist(whitelistPr)
        setInprogress(inprogressPr)
        setCompleted(completedPr)
        setIsLoading(false)
        if (whitelistPr.length > 0) {
          setTabIndex(2)
        }
        if (whitelistPr.length === 0 && inprogressPr.length > 0) {
          setTabIndex(3)
        }
      }
    }
    if (!isLoadingPool) {
      initialData()
    }
    return () => {
      isMounted = false
    }
  }, [ticketCalls, idoAddress, listPool, isLoadingPool])

  return (
    <div className="pt-[110px] pb-[240px]">
      {/* {isLoading && <Spinner />} */}
      <div className="layout-container">
        <div className="text-center">
          <img src={textSvg} className="mx-auto" alt="" />
          <h2 className="text-center text-skyblue text-shadow font-bold text-[32px]">Launchpad</h2>
          <p className="text-[#F5F5F5] text-center leading-5 max-w-[547px] mx-auto mt-6">
            In just a few simple steps, you can own your hidden gems by participating in IDO and IGO of high-quality
            projects.
          </p>
        </div>
        <div className="text-center">
          <img src={line1} className="mt-14 w-full h-auto" alt="" />
          <div className="grid mobile-tab md:grid-cols-4 gap-x-8 relative">
            <button
              type="button"
              className={` tab ${tabIndex === 1 ? 'tab-active' : ''} ${isLoading ? 'pointer-events-none' : ''}`}
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
              className={` tab ${tabIndex === 2 ? 'tab-active' : ''}  ${isLoading ? 'pointer-events-none' : ''}`}
              onClick={() => _handleChangeTab(2)}
            >
              {tabIndex === 2 ? (
                <img src={editActiveSvg} className="ml-1" alt="" />
              ) : (
                <img src={editSvg} className="ml-1" alt="" />
              )}
              Register whitelist
            </button>
            <button
              type="button"
              className={` tab ${tabIndex === 3 ? 'tab-active' : ''}  ${isLoading ? 'pointer-events-none' : ''}`}
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
              className={` tab ${tabIndex === 4 ? 'tab-active' : ''}  ${isLoading ? 'pointer-events-none' : ''}`}
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
        {tabIndex === 1 && <UpcomingPool idos={upcoming} pools={pools} isLoading={isLoading} />}
        {tabIndex === 2 && (
          <RegisterWhitelist idos={registerWhitlis} pools={pools} account={account} isLoading={isLoading} />
        )}
        {tabIndex === 3 && <InProgress idos={inprogress} pools={pools} account={account} />}
        {tabIndex === 4 && <Completed idos={completed} pools={pools} account={account} />}
      </div>
    </div>
  )
}

export default LaunchPad
