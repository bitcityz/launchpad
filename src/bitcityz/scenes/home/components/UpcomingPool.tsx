import React, { useState } from 'react'

import '../../../assets/index.css'
import ComingSoonCard from 'bitcityz/components/comingsoon/ComingSoonCard'
import UpcomingPoolCard from './UpcomingPoolCard'

function UpcomingPool({ upcomingPr, poolName }) {
  return (
    <div className="flex flex-col gap-y-8">
      {upcomingPr.length > 0 &&
        upcomingPr.map((project) => {
          return <UpcomingPoolCard key={project.id} project={project} poolName={poolName} />
        })}

      {upcomingPr.length === 0 && <ComingSoonCard />}
    </div>
  )
}

export default UpcomingPool
