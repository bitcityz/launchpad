import React, { useState, useEffect } from 'react'
import '../../../../assets/index.css'
import { useIdoContract } from 'hooks/useContract'
import truncateHash from 'utils/truncateHash'

import Pagination from '../../../../components/pagination/Pagination'

import IcSearchSvg from '../../../../assets/images/ic-search.svg'

const PAGE_SIZE = 10
function WhiteList({ idoPool, setIsLoading }) {
  const [whitelist, setWhitelist] = useState([])
  const [allWhitelist, setAllWhitelist] = useState([])
  const [searchVal, setSearchVal] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const idoContract = useIdoContract()

  useEffect(() => {
    setIsLoading(true)
    const getListWhitelist = async () => {
      const resp = await idoContract.getWhitelist(idoPool.id)
      setAllWhitelist(resp)
      setIsLoading(false)
    }
    getListWhitelist()
  }, [idoContract, idoPool, setIsLoading])

  useEffect(() => {
    const generateDataByPage = (pageIndex) => {
      const from = pageIndex === 1 ? 0 : (pageIndex - 1) * PAGE_SIZE
      const to = pageIndex * PAGE_SIZE
      const result = allWhitelist.slice(from, to)
      setWhitelist(result)
    }
    generateDataByPage(currentPage)
  }, [currentPage, allWhitelist])

  const handleSearchAddress = () => {
    setIsLoading(true)
    if (searchVal !== '') {
      const result = whitelist.filter((r) => {
        return r === searchVal
      })
      setWhitelist(result)
    } else {
      setWhitelist(allWhitelist)
    }
    setIsLoading(false)
  }

  return (
    <div className="mt-5 relative z-10">
      <div className="mt-5 p-6 border-[1px] border-solid border-skyblue rounded-2xl relative">
        <div
          className="p-4 flex items-center gap-x-2 rounded-xl md:gap-x-8"
          style={{ background: 'rgba(245, 245, 245, 0.1)' }}
        >
          <input
            type="search"
            className="bg-transparent text-[#9E9E9E] font-semibold flex-1"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Search your wallet address"
          />
          <button type="button" className="border-none bg-transparent" onClick={handleSearchAddress}>
            <img src={IcSearchSvg} alt="" />
          </button>
        </div>
        <div className="mt-8">
          <div
            className="rounded-xl px-4 py-[18px] grid gap-x-2 grid-cols-[50px,auto] md:grid-cols-[100px,auto] md:gap-x-5"
            style={{ background: 'rgba(245, 245, 245, 0.1)' }}
          >
            <span className="text-[#F5F5F5] font-semibold">No</span>
            <span className="text-[#F5F5F5] font-semibold">Wallet Address</span>
          </div>
          {whitelist.length > 0 &&
            whitelist.map((address, index) => {
              return (
                <div
                  key={address}
                  className="rounded-xl px-4 py-[18px] grid gap-x-2 grid-cols-[50px,auto] md:grid-cols-[100px,auto] md:gap-x-5"
                  style={{
                    background: index % 2 === 1 ? 'rgba(245, 245, 245, 0.1)' : 'transparent',
                  }}
                >
                  <span className="text-[#F5F5F5] font-semibold">{index + 1}</span>
                  <span className="text-[#F5F5F5] font-semibold">{truncateHash(address, 8, 8)}</span>
                </div>
              )
            })}
        </div>
      </div>
      <div className="mt-5">
        <Pagination
          currentPage={currentPage}
          totalCount={allWhitelist.length}
          pageSize={PAGE_SIZE}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  )
}

export default WhiteList
