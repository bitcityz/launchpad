import React from 'react'

import '../../../assets/index.css'

import CompletedCard from './CompletedCard'

function Completed({ idos, pools, account }) {
  return (
    <div className="mt-14 flex flex-col gap-y-8">
      {idos.map((ido) => {
        return <CompletedCard key={ido.id} ido={ido} pools={pools} account={account} />
      })}
    </div>
  )
}

export default Completed
