import React from 'react'
import '../../../assets/index.css'
import CardPool from './CardPool'

function PoolList(props) {
  const { pools, account, isLoading, setUpdatePool } = props
  return (
    <div className="flex flex-col gap-y-8">
      {pools.length > 0 && pools.map((pool) => {
        return (
          <CardPool key={pool.id} pool={pool} account={account} isLoading={isLoading} setUpdatePool={setUpdatePool} />
        )
      })}
    </div>
  )
}

export default PoolList
