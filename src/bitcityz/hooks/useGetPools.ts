import { useEffect, useState } from 'react'

const POOL_API = 'https://raw.githubusercontent.com/bitcityz/utils/main/pools/listPool.json'
const useGetPools = () => {
  const [listPool, setListPool] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    const fetchPools = async () => {
      const res = await fetch(`${POOL_API}?_=${Date.now()}`)
      const data = await res.json()
      console.log(data)
      setListPool(data.pools)
    }

    fetchPools()
  }, [])
  return { listPool, isLoading }
}
export default useGetPools
