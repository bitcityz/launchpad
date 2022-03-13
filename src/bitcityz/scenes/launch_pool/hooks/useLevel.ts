import { useEffect, useState } from 'react'
import { BASE_API_LAUNCHPAD_URL } from 'config'
import md5 from 'crypto-js/md5'

const hashString = 'Up4ElMIDR1X08XRAFOYLfDJm4yAnhrmn8QUS1J6mZKinBHG6ia'
const useLevel = (address) => {
  const [addressInfo, setAddressInfo] = useState(null)
  useEffect(() => {
    const getAddressLevel = async () => {
      const res = await fetch(`${BASE_API_LAUNCHPAD_URL}/sign-user`, {
        body: JSON.stringify({ wallet_address: address, pid: 1 }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Key-API': md5(`${hashString + address}1`),
        },
      })
      if (res.ok) {
        const data = await res.json()
        setAddressInfo(data)
      }

      setAddressInfo(null)
    }
    if (address) {
      getAddressLevel()
    }
  }, [address])
  return { addressInfo }
}
export default useLevel
