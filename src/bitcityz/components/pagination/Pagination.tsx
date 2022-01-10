import React from 'react'

import '../../assets/index.css'

import { usePagination, DOTS } from '../../hooks/usePagination'

function Pagination(props) {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize } = props
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  if (currentPage === 0 || paginationRange.length < 1) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  const lastPage = paginationRange[paginationRange.length - 1]

  return (
    <ul className="list-none flex items-center gap-x-2">
      <li
        className={`rounded border-[1px] border-solid border-[#DFE3E8] w-8 h-8 flex items-center justify-center cursor-pointer ${
          currentPage === 1 ? 'pointer-events-none bg-[#919EAB] opacity-50' : ' '
        }`}
        onClick={onPrevious}
        role="presentation"
      >
        <div className="before:arrow before:left" />
      </li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return (
            <li
              key={pageNumber}
              className="rounded border-[1px] border-solid border-[#DFE3E8] text-[#F5F5F5] pointer-events-none w-8 h-8 flex items-center justify-center cursor-pointer"
            >
              <span className="font-bold text-sm">&#8230;</span>
            </li>
          )
        }

        return (
          <li
            key={pageNumber}
            className={` rounded border-[1px] border-solid   w-8 h-8 flex items-center justify-center cursor-pointer ${
              pageNumber === currentPage
                ? 'border-skyblue bg-skyblue text-[#212121]'
                : 'border-[#DFE3E8] text-[#F5F5F5] '
            }`}
            onClick={() => onPageChange(pageNumber)}
            role="presentation"
          >
            <span className="font-bold text-sm">{pageNumber}</span>
          </li>
        )
      })}
      <li
        className={` rounded border-[1px] border-solid border-[#DFE3E8] w-8 h-8 flex items-center justify-center cursor-pointer ${
          lastPage === currentPage ? 'pointer-events-none bg-[#919EAB] opacity-50' : ' '
        }`}
        onClick={onNext}
        role="presentation"
      >
        <div className="before:arrow before:right" />
      </li>
    </ul>
  )
}

export default Pagination
