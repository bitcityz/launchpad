import React, { useState } from 'react'

import '../../../assets/index.css'
import { isAfter } from 'date-fns'

import InprogressCard from './InprogressCard'

function InProgress({ idos, pools, account, setIsLoading }) {
  return (
    <div className="mt-14 flex flex-col gap-y-8">
      {idos.map((ido) => {
        return (
          !isAfter(ido.startTime * 1000, new Date()) &&
          isAfter(ido.endTime * 1000, new Date()) && (
            <InprogressCard key={ido} ido={ido} pools={pools} account={account} setIsLoading={setIsLoading} />
          )
        )
      })}
    </div>
  )
}

export default InProgress
