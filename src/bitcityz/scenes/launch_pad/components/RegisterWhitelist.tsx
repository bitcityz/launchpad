import React from 'react'

import '../../../assets/index.css'

import NoProjectCard from './NoProjectCard'
import RegisterWhitelistCard from './RegisterWhitelistCard'
import SkeletonCardPool from './SkeletonCardPool'

function RegisterWhitelist({ idos, pools, account, isLoading }) {
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
            <NoProjectCard />
          ) : (
            idos.map((ido) => {
              return <RegisterWhitelistCard key={ido.id} ido={ido} pools={pools} account={account} />
            })
          )}
        </>
      )}
    </div>
  )
}

export default RegisterWhitelist
