import React from 'react'

import '../../../assets/index.css'

function ApplyLaunch() {
  return (
    <div>
      <h5 className="text-[#F5F5F5] text-[32px] text-center">
        Launch your project on <span className="text-gradient">BitcityZ</span> now!
      </h5>
      <p className="text-center text-white mt-8 leading-5">
        <span className="font-semibold text-white">BitcityZ Launchpad</span> is a platform that help and advise project
        teams on how to best issue and launch their token. We provide a full service offering starting from advisory
        services from before the token is even issued, to post-listing and marketing support. Our goal is to allow
        project teams to focus on their project development and continue building products, while we handle the
        marketing, exposure and initial user base. We look for strong teams with a unique and innovative vision in the
        crypto space. If you think you are one of these projects, apply below!
      </p>
      <div className="text-center">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSeGkn_Szv_UCAQ2xQk0PHUp9gC7QFFzH0cCcyaY1qkFOc7reg/viewform"
          target="_blank"
          rel="noreferrer"
          type="button"
          className="fill-btn mt-8 flex items-center justify-center mx-auto max-w-[202px] rounded-[20px] border-none text-white font-semibold h-[44px] shadow-blue"
        >
          Apply to launch
        </a>
      </div>
    </div>
  )
}

export default ApplyLaunch
