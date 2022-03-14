import React, { useEffect, useState } from 'react'

import '../../../assets/index.css'
import { Link } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import LaunchPoolCard from './LaunchPoolCard'
import useLevel from '../../launch_pool/hooks/useLevel'
import launchPool from '../../../assets/images/launchpool.svg'

function LaunchPool({ pools }) {
  const [addressInfo, setAddressInfo] = useState(null)
  const { account } = useWeb3React()
  const { getUserLevel } = useLevel()

  useEffect(() => {
    let isMounted = true
    const getAccountInfo = async () => {
      const resp = await getUserLevel(account)
      if (isMounted) {
        setAddressInfo(resp.result)
      }
    }
    if (account) {
      getAccountInfo()
    }
    return () => {
      isMounted = false
    }
  }, [account, getUserLevel])
  return (
    <div>
      <div className="text-center pt-[170px]">
        <img src={launchPool} className="mx-auto" alt="" />
        <h2 className="text-center text-skyblue font-bold text-[28px] md:text-[32px] leading-9 text-shadow">
          Launchpool
        </h2>
        <p className="text-center text-[#F5F5F5] mt-5 leading-5">
          Stake <span className="text-white font-semibold">3 pools</span> at the same time. Get more opportunities to
          own hidden gems
        </p>
      </div>
      <div className="grid gap-y-8 md:gap-y-0 md:grid-cols-3 md:gap-x-8 mt-8">
        {pools.length > 0 &&
          pools.map((pool) => {
            return <LaunchPoolCard key={pool.id} pool={pool} account={account} addressInfo={addressInfo} />
          })}
      </div>
      <div className="text-center">
        <Link
          to="/launchpool"
          className="bg-skyblue mt-8 rounded-[20px] border-none flex items-center justify-center text-[#212121] font-semibold h-[44px] w-[180px] mx-auto shadow-blue"
        >
          Stake now
        </Link>
      </div>
    </div>
  )
}

export default LaunchPool
