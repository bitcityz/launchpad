import React from 'react'
import '../../../../assets/index.css'
import { Skeleton } from '@mexi/uikit'

function PoolCardDetailSkeleton() {
  return (
    <div className="relative">
      <Skeleton height="28px" width="150px" />
      <div className="mt-5 flex flex-col gap-y-5 md:gap-y-0 md:flex-row md:gap-x-[30px]">
        <Skeleton width="192px" height="178px" />
        <div className="flex-1">
          <div className="flex items-start gap-x-3">
            <Skeleton width="48px" height="48px" />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <Skeleton width="150px" height="24px" />
                <Skeleton width="150px" height="24px" />
              </div>
              <div className="mt-1">
                <Skeleton width="100px" height="24px" />
              </div>
              <div className="mt-1">
                <Skeleton width="250px" height="20px" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-5 md:gap-y-0 items-center md:flex-row md:flex-wrap md:justify-between mt-4">
            <Skeleton width="200px" height="24px" />
            <div className="w-full md:w-auto order-3 md:-order-none">
              <Skeleton width="150px" height="24px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PoolCardDetailSkeleton
