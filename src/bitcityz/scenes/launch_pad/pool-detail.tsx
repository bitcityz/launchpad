import React, { useState } from 'react'
import '../../assets/index.css'
import PoolCardDetail from './components/pool_detail/PoolCardDetail'
import About from './components/pool_detail/About'
import Detail from './components/pool_detail/Detail'
import WhiteList from './components/pool_detail/WhiteList'
import Allocation from './components/pool_detail/Allocation'

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

function PoolDetail() {
  const [tabIndex, setTabIndex] = useState(1)
  const _handleChangeTab = (index) => {
    setTabIndex(index)
  }
  return (
    <div className="bg-[#050e21] py-[110px] ">
      <div className="layout-container">
        <div className="relative px-6 py-7">
          <div className="bg-linear rounded-2xl absolute top-0 left-0 w-full h-full" />
          <PoolCardDetail />
        </div>
        <div className="relative px-6 pt-2 pb-6 mt-[30px]">
          <div className="rounded-2xl absolute top-0 left-0 w-full h-full bg-linear-1" />
          <img src={line1} className="w-full h-auto" alt="" />
          <div className="grid grid-cols-4 gap-x-8 relative">
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

          {tabIndex === 1 && <About />}
          {tabIndex === 2 && <Detail />}
          {tabIndex === 3 && <WhiteList />}
          {tabIndex === 4 && <Allocation />}
        </div>
      </div>
    </div>
  )
}

export default PoolDetail
