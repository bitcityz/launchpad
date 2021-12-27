import React from 'react'

import '../../../assets/index.css'
import CardPool from './CardPool'

function PoolList(props) {
  const { pools, account } = props
  return (
    <div className="flex flex-col gap-y-8">
      {pools.map((pool) => {
        return <CardPool key={pool.id} pool={pool} account={account} />
      })}
    </div>
  )
}

export default PoolList
