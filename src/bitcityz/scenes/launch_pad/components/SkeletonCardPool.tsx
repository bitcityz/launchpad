import React from 'react'
import '../../../assets/index.css'
import { Skeleton } from '@mexi/uikit'

function SkeletonCardPool() {
  return (
    <div className="relative px-6 py-5">
      <div
        className="absolute opacity-50 rounded-2xl top-0 left-0 w-full h-full"
        style={{
          background: 'linear-gradient(114.49deg, rgba(255, 255, 255, 0.165) -21.49%, rgba(255, 255, 255, 0) 111.75%)',
          backdropFilter: 'blur(140px)',
        }}
      />
      <div className="relative z-10">
        <Skeleton height="28px" width="120px" />
        <div className="mt-5 flex flex-col gap-y-5 md:gap-y-0 md:flex-row md:gap-x-[30px]">
          <Skeleton height="178px" width="192px" />
          <div className="flex-1">
            <div className="flex items-start gap-x-3">
              <Skeleton height="48px" width="48px" />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <Skeleton height="24px" width="150px" />
                  <div>
                    <Skeleton height="24px" width="150px" />
                  </div>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <Skeleton height="24px" width="100px" />
                  <div>
                    <Skeleton height="24px" width="150px" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <Skeleton height="24px" width="300px" />
            </div>
            <div className="mt-2 flex flex-col gap-y-5 md:gap- md:flex-row md:gap-x-8">
              <div className="flex-1">
                <div className="flex flex-col gap-y-1 md:gap-y-0 md:flex-row md:justify-between items-center">
                  <Skeleton height="24px" width="100%" />
                </div>
                <div className="flex flex-col gap-y-1 md:gap-y-0 md:flex-row md:justify-between items-center mt- md:mt-2">
                  <Skeleton height="24px" width="100%" />
                </div>
                <div className="flex flex-col gap-y-1 md:gap-y-0 md:flex-row md:justify-between items-center mt-5 md:mt-2">
                  <Skeleton height="24px" width="100%" />
                </div>
              </div>
              <div className="flex items-end">
                <Skeleton height="42px" width="150px" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonCardPool
