import React from 'react'

import '../../assets/index.css'
import bg from '../../assets/images/bg-header.png'

export const Container = ({ children }) => {
  return (
    <div className="bg-cover bg-center bg-no-repeat relative bg-[#050e21]" style={{ backgroundImage: `url(${bg})` }}>
      {children}
    </div>
  )
}
