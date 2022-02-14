import React, { useState, useEffect } from 'react'

import '../../../assets/index.css'
import { Lottie } from '@crello/react-lottie'
import UpcomingPool from './UpcomingPool'

import upcomingPool from '../../../assets/images/upcomingpool.svg'
import line1 from '../../../assets/images/line1.svg'
import line2 from '../../../assets/images/line2.svg'
import oceanProtocolActive from '../../../assets/images/ocean-protocol-active.png'
import oceanProtocol from '../../../assets/images/ocean-protocol.png'
import animationConfettiData from '../../../assets/images/confetti-outline.json'

function UpcomingPoolTab({ pools, projects, listPool }) {
  const [tab, setTab] = useState(0)
  const [upcomingPr, setUpcomingPr] = useState([])
  const [poolName, setPoolName] = useState('Mayor')

  const handleChangeTab = (selectedTab) => {
    if (selectedTab !== tab) {
      setUpcomingPr([])
      setTab(selectedTab)
      setPoolName(pools[selectedTab].name)
    }
  }

  useEffect(() => {
    const initData = async () => {
      const upcoming = []
      projects.forEach((ido, index) => {
        if (Number(ido.status._hex) === 0) {
          upcoming.push({ id: index, ...ido, baseInfo: listPool[index][ido.idoToken] })
        }
      })

      const result = upcoming.filter((r) => {
        return r.keyType === pools[tab].ticketHash
      })
      setUpcomingPr(result)
    }
    if (pools.length > 0) {
      initData()
    }
  }, [tab, projects, listPool, pools])
  return (
    <div>
      <div className="text-center pt-[150px] relative">
        <img src={upcomingPool} className="mx-auto" alt="" />
        <div className="text-center w-[120px] h-[120px] absolute left-1/2 -translate-x-1/2 top-16">
          <Lottie config={{ animationData: animationConfettiData, loop: true }} />
        </div>
        <h2 className="text-center text-skyblue font-bold text-[28px] md:text-[32px] text-shadow mt-1">
          Upcoming pool
        </h2>
        <img src={line1} className="mt-4 w-full h-auto" alt="" />
        <div className="grid mobile-tab md:grid-cols-3 gap-x-8 relative">
          <button
            type="button"
            className={` h-[62px] rounded-xl w-full border-[1px] border-solid border-[#2CE7FF] text-sm text-shadow font-semibold flex items-center justify-center transition-all ${
              tab === 0 ? 'text-[#2CE7FF] bg-[rgba(44,231,255,0.3)]' : 'text-[rgba(158,158,158,0.5)]'
            }`}
            onClick={() => handleChangeTab(0)}
          >
            Mayor pool
            {tab === 0 ? (
              <img src={oceanProtocolActive} className="ml-1" alt="" />
            ) : (
              <img src={oceanProtocol} className="ml-1" alt="" />
            )}
          </button>
          <button
            type="button"
            className={` h-[62px] rounded-xl w-full border-[1px] border-solid border-[#2CE7FF] text-sm text-shadow font-semibold flex items-center justify-center transition-all ${
              tab === 1 ? 'text-[#2CE7FF] bg-[rgba(44,231,255,0.3)]' : 'text-[rgba(158,158,158,0.5)]'
            }`}
            onClick={() => handleChangeTab(1)}
          >
            Elite pool
            {tab === 1 ? (
              <img src={oceanProtocolActive} className="ml-1" alt="" />
            ) : (
              <img src={oceanProtocol} className="ml-1" alt="" />
            )}
          </button>
          <button
            type="button"
            className={` h-[62px] rounded-xl w-full border-[1px] border-solid border-[#2CE7FF] text-sm text-shadow font-semibold flex items-center justify-center transition-all ${
              tab === 2 ? 'text-[#2CE7FF] bg-[rgba(44,231,255,0.3)]' : 'text-[rgba(158,158,158,0.5)]'
            }`}
            onClick={() => handleChangeTab(2)}
          >
            Citizen pool
            {tab === 2 ? (
              <img src={oceanProtocolActive} className="ml-1" alt="" />
            ) : (
              <img src={oceanProtocol} className="ml-1" alt="" />
            )}
          </button>
        </div>
        <img src={line2} className="w-full h-auto" alt="" />
      </div>
      <UpcomingPool upcomingPr={upcomingPr} poolName={poolName} />
      {upcomingPr.length > 3 && (
        <div className="text-center">
          <button
            type="button"
            className="bg-skyblue mt-8 rounded-[20px] border-none text-black font-semibold h-[44px] px-[50px] shadow-blue"
          >
            See more
          </button>
        </div>
      )}
    </div>
  )
}

export default UpcomingPoolTab
