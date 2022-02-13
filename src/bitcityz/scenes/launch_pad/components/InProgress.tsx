import React from 'react'

import '../../../assets/index.css'

import NoProjectCard from './NoProjectCard'
import InprogressCard from './InprogressCard'

function InProgress({ idos, pools, account }) {
  return (
    <div className="flex flex-col gap-y-8">
      {idos.length === 0 ? (
        <NoProjectCard />
      ) : (
        idos.map((ido) => {
          return <InprogressCard key={ido.id} ido={ido} pools={pools} account={account} />
        })
      )}
    </div>
  )
}

export default InProgress
