import React from 'react'

import '../../../assets/index.css'

import NoProjectCard from './NoProjectCard'
import CompletedCard from './CompletedCard'

function Completed({ idos, pools, account }) {
  return (
    <div className="flex flex-col gap-y-8">
      {idos.length === 0 ? (
        <NoProjectCard />
      ) : (
        idos.map((ido) => {
          return <CompletedCard key={ido.id} ido={ido} pools={pools} account={account} />
        })
      )}
    </div>
  )
}

export default Completed
