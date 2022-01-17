import React from 'react'

import '../../../assets/index.css'

import IdoCard from './IdoCard'

function UpcomingPool({ idos, pools }) {
  return (
    <div className="mt-14 flex flex-col gap-y-8">
      {idos.map((ido) => {
        return <IdoCard key={ido.id} ido={ido} pools={pools} />
      })}
    </div>
  )
}

export default UpcomingPool
