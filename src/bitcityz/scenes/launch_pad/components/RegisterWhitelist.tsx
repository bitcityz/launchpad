import React from 'react'

import '../../../assets/index.css'
import { isAfter } from 'date-fns'

import RegisterWhitelistCard from './RegisterWhitelistCard'

function RegisterWhitelist({ idos, pools, account }) {
  return (
    <div className="mt-14 flex flex-col gap-y-8">
      {idos.map((ido) => {
        return (
          !isAfter(ido.startTime * 1000, new Date()) &&
          isAfter(ido.endTime * 1000, new Date()) && (
            <RegisterWhitelistCard key={ido} ido={ido} pools={pools} account={account} />
          )
        )
      })}
    </div>
  )
}

export default RegisterWhitelist
