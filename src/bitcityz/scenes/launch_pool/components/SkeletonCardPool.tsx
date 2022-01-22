import React from 'react'
import '../../../assets/index.css'
import { Skeleton } from '@mexi/uikit'

function SkeletonCardPool() {
  return (
    <div className="relative p-6">
      <div
        className="opacity-30 absolute top-0 left-0 w-full h-full rounded-2xl"
        style={{
          background: 'linear-gradient(114.49deg, rgba(255, 255, 255, 0.33) -21.49%, rgba(255, 255, 255, 0) 111.75%)',
        }}
      />
      <div className="flex flex-col gap-y-6 md:flex-row md:gap-x-6 relative">
        <div className="flex flex-col gap-y-5">
          <div className="md:hidden">
            <Skeleton height="24px" />
          </div>
          <div className="relative">
            <Skeleton height="173px" width="244px" />
          </div>
          <Skeleton height="57px" width="239px" />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="md:block">
            <Skeleton height="24px" />
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-4 md:mt-6">
            <div className="flex justify-between items-center md:block">
              <Skeleton height="40px" />
            </div>
            <div className="flex justify-between items-center md:block">
              <Skeleton height="40px" />
            </div>
            <div className="flex justify-between items-center md:block">
              <Skeleton height="40px" />
            </div>
            <div className="flex justify-between items-center md:block">
              <Skeleton height="40px" />
            </div>
            <div className="flex justify-center items-end md:justify-start">
              <Skeleton height="40px" width="100%" />
            </div>
          </div>
          <div className="flex justify-center mt-5 md:mt-0 md:items-end md:justify-end md:flex-1">
            <Skeleton height="42px" width="100%" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonCardPool
