import React from 'react'

import '../../../assets/index.css'
import CardPool from './CardPool'

function PoolList(props) {
  return (
    <div className="flex flex-col gap-y-8">
      <CardPool />
      <CardPool />
      <CardPool />
    </div>
  )
}

export default PoolList
