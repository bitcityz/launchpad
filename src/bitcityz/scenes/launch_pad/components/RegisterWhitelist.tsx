import React from 'react'

import '../../../assets/index.css'

import RegisterWhitelistCard from './RegisterWhitelistCard'

function RegisterWhitelist({idos}) {
  return (
    <div className="mt-14 flex flex-col gap-y-8">
        {idos.map((ido) => {
        return (
          <RegisterWhitelistCard key={ido} ido={ido} />
        )
      })}
    </div>
  )
}

export default RegisterWhitelist
