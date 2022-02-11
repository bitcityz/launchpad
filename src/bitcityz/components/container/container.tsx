import React from 'react'

import '../../assets/index.css'
import bg from '../../assets/images/background.png'

export const Container = ({ children }) => {
  return (
    <div className="bg-cover bg-no-repeat bg-fixed relative bg-[#050e21]" style={{ backgroundImage: `url(${bg})` }}>
      {children}
    </div>
  )
}
