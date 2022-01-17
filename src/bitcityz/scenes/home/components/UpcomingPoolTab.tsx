import React, { useState, useEffect } from 'react'

import '../../../assets/index.css'

import UpcomingPool from './UpcomingPool'

import upcomingPool from '../../../assets/images/upcomingpool.svg'
import line1 from '../../../assets/images/line1.svg'
import line2 from '../../../assets/images/line2.svg'
import oceanProtocolActive from '../../../assets/images/ocean-protocol-active.svg'

function UpcomingPoolTab({ pools, projects }) {
  const [tab, setTab] = useState('')
  const [upcomingPr, setUpcomingPr] = useState([])
  const [poolName, setPoolName] = useState('')

  const handleChangeTab = (selectedTab, selectedPoolName) => {
    if (selectedTab !== tab) {
      setUpcomingPr([])
      setTab(selectedTab)
      setPoolName(selectedPoolName)
    }
  }

  useEffect(() => {
    const updateTab = () => {
      if (pools.length > 0) {
        setTab(pools[0].ticketHash)
        setPoolName(pools[0].name)
      }
    }
    updateTab()
  }, [pools])

  useEffect(() => {
    const initData = async () => {
      const upcoming = []
      projects.forEach((ido, index) => {
        if (Number(ido.status._hex) === 0) {
          upcoming.push({ id: index, ...ido })
        }
      })

      const result = upcoming.filter((r) => {
        return r.keyType === tab
      })
      setUpcomingPr(result)
    }

    initData()
  }, [tab, projects])
  return (
    <div>
      <div className="text-center pt-[110px]">
        <img src={upcomingPool} className="mx-auto" alt="" />
        <h2 className="text-center text-[#F5F5F5] font-bold text-[28px] md:text-[32px] text-shadow">Upcoming pool</h2>
        <img src={line1} className="mt-14 w-full h-auto" alt="" />
        <div className="grid mobile-tab md:grid-cols-3 gap-x-8 relative">
          {pools.length > 0 &&
            pools.map((pool) => {
              return (
                <button
                  key={pool.id}
                  type="button"
                  className={` h-[62px] rounded-xl w-full border-[1px] border-solid border-[#2CE7FF] text-sm text-shadow font-semibold flex items-center justify-center transition-all ${
                    tab === pool.ticketHash ? 'text-[#2CE7FF] bg-[rgba(44,231,255,0.3)]' : 'text-[#F5F5F5]'
                  }`}
                  onClick={() => handleChangeTab(pool.ticketHash, pool.name)}
                >
                  {pool.name} pool
                  <img src={oceanProtocolActive} className="ml-1" alt="" />
                </button>
              )
            })}
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
