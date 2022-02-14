import React from 'react'

import '../../../assets/index.css'

import ComingSoonCard from 'bitcityz/components/comingsoon/ComingSoonCard'
import SkeletonCardPool from './SkeletonCardPool'

import IdoCard from './IdoCard'

function UpcomingPool({ idos, pools, isLoading }) {
  return (
    <div className="flex flex-col gap-y-8">
      {isLoading ? (
        <div className="flex flex-col gap-y-8">
          <SkeletonCardPool />
          <SkeletonCardPool />
        </div>
      ) : (
        <>
          {idos.length === 0 ? (
            <ComingSoonCard />
          ) : (
            idos.map((ido) => {
              return <IdoCard key={ido.id} ido={ido} pools={pools} />
            })
          )}
        </>
      )}
    </div>
  )
}

export default UpcomingPool
