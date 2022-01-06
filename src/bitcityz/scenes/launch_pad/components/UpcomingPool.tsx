import React from 'react'

import '../../../assets/index.css'
import { isAfter } from 'date-fns'

import IdoCard from './IdoCard'

function UpcomingPool({ idos, pools }) {
  return (
    <div className="mt-14 flex flex-col gap-y-8">
      {idos.map((ido) => {
        return isAfter(ido.startTime * 1000, new Date()) && <IdoCard key={ido} ido={ido} pools={pools} />
      })}
    </div>
  )
}

export default UpcomingPool
