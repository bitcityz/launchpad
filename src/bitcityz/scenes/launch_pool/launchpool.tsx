import React from 'react'
import '../../assets/index.css'
import PoolList from './components/PoolList'

function LaunchPool() {
  const bctz = '0xE90CABC44faE173881879BFD87A736BA0bE31305'

  const POOLS = [0, 1, 2]
  return (
    <div className="bg-[#050e21] bg-no-repeat bg-top">
      <div className="layout-container">
        <PoolList />
      </div>
    </div>
  )
}

export default LaunchPool
