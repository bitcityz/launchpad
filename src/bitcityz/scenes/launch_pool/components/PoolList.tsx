import React from 'react'
import '../../../assets/index.css'
import CardPool from './CardPool'
import SkeletonCardPool from './SkeletonCardPool'

function PoolList(props) {
  const { pools, account, isLoading, setUpdatePool, launchPoolAddress, isApproved, setIsApproved, addressInfo } = props
  return (
    <div className="flex flex-col gap-y-8">
      {isLoading ? (
        <>
          <SkeletonCardPool />
          <SkeletonCardPool />
          <SkeletonCardPool />
        </>
      ) : (
        <>
          {pools.length > 0 &&
            pools.map((pool) => {
              return (
                <CardPool
                  key={pool.id}
                  pool={pool}
                  account={account}
                  setUpdatePool={setUpdatePool}
                  launchPoolAddress={launchPoolAddress}
                  isApproved={isApproved}
                  setIsApproved={setIsApproved}
                  addressInfo={addressInfo}
                />
              )
            })}
        </>
      )}
    </div>
  )
}

export default PoolList
