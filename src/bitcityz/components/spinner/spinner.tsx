import React, { useState } from 'react'

import '../../assets/index.css'

function Spinner() {
  return (
    <div className="loading-container" v-if="isVisible">
      <div className="flex flex-col items-center">
        <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
          <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30" />
        </svg>
      </div>
    </div>
  )
}

export default Spinner
