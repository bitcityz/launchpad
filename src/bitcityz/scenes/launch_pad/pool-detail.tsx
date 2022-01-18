import React, { useEffect, useMemo, useState } from 'react'
import '../../assets/index.css'
import { useParams } from 'react-router-dom'
import launchPoolTicketABI from 'config/abi/launchPoolTicket.json'
import bitcityIdoABI from 'config/abi/bitcityIdo.json'
import { getIdoAddress, getTicketAddress } from 'utils/addressHelpers'
import { multicallv2 } from 'utils/multicall'
import { useWeb3React } from '@web3-react/core'
import useGetPools from '../../hooks/useGetPools'

import PoolCardDetail from './components/pool_detail/PoolCardDetail'
import About from './components/pool_detail/About'
import Detail from './components/pool_detail/Detail'
import WhiteList from './components/pool_detail/WhiteList'
import Allocation from './components/pool_detail/Allocation'
import { Spinner } from '../../components'

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
function PoolDetail() {
  const [tabIndex, setTabIndex] = useState(1)
  const { listPool } = useGetPools()
  const { id } = useParams<{ id: string }>()
  const ticketAddress = getTicketAddress()
  const idoAddress = getIdoAddress()
  const [idoPool, setIdoPool] = useState(null)
  const [pools, setPools] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { account } = useWeb3React()

  const ticketCalls = useMemo(
    () =>
      POOLS.map((poolId) => {
        return { address: ticketAddress, name: 'types', params: [poolId] }
      }),
    [ticketAddress],
  )

  const _handleChangeTab = (index) => {
    setTabIndex(index)
  }
  useEffect(() => {
    setIsLoading(true)
    const initData = async () => {
      const poolLst = await multicallv2(launchPoolTicketABI, ticketCalls)
      setPools(poolLst)
      const calls = [{ address: idoAddress, name: 'poolInfo', params: [id] }]

      const idoPoolInfo = await multicallv2(bitcityIdoABI, calls)
      const data = idoPoolInfo.map((ido) => {
        return {
          id,
          idoToken: ido.idoToken,
          idoToken2Buy: ido.idoToken2Buy,
          token2IDOtoken: ido.tokenBuy2IDOtoken,
          amount: ido.amount,
          totalAmount: ido.totalAmount,
          remainAmount: ido.remainAmount,
          idoUnlock: ido.idoUnlock,
          keyType: ido.keyType,
          startTime: ido.startTime,
          endTime: ido.endTime,
          startTimeWL: ido.startTimeWL,
          endTimeWL: ido.endTimeWL,
          status: ido.status,
          baseInfo: listPool[id][ido.idoToken],
        }
      })
      setIdoPool(data[0])
      setIsLoading(false)
    }
    if (listPool.length > 0) {
      initData()
    }
  }, [listPool]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="bg-[#050e21] py-[110px] ">
      {isLoading && <Spinner />}
      <div className="layout-container">
        <div className="relative px-6 py-7">
          <div className="bg-linear rounded-2xl absolute top-0 left-0 w-full h-full" />
          {idoPool && <PoolCardDetail idoPool={idoPool} pools={pools} setIsLoading={setIsLoading} account={account} />}
        </div>
        <div className="relative px-6 pt-2 pb-6 mt-[30px]">
          <div className="rounded-2xl absolute top-0 left-0 w-full h-full bg-linear-1" />
          <img src={line1} className="w-full h-auto" alt="" />
          <div className="grid mobile-tab md:grid-cols-4 gap-x-8 relative">
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
              About project
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
              Pool details
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
              Whitelist
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
              Your allocation
            </button>
          </div>
          <img src={line2} className="w-full h-auto" alt="" />

          {tabIndex === 1 && idoPool && <About idoPool={idoPool} />}
          {tabIndex === 2 && <Detail idoPool={idoPool} />}
          {tabIndex === 3 && <WhiteList idoPool={idoPool} setIsLoading={setIsLoading} />}
          {tabIndex === 4 && account && <Allocation idoPool={idoPool} account={account} />}
        </div>
      </div>
    </div>
  )
}

export default PoolDetail
