import { useCallback } from 'react'
import { BASE_API_LAUNCHPAD_URL } from 'config'
import md5 from 'crypto-js/md5'

const hashString = 'Up4ElMIDR1X08XRAFOYLfDJm4yAnhrmn8QUS1J6mZKinBHG6ia'
const useLevel = () => {
  const getUserLevel = useCallback(async (address: string) => {
    const res = await fetch(`${BASE_API_LAUNCHPAD_URL}/user`, {
      body: JSON.stringify({ wallet_address: address }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Key-API': md5(`${hashString + address}`),
      },
    })
    if (res.ok) {
      const data = await res.json()
      return data
    }
    return null
  }, [])

  return { getUserLevel }
}

export default useLevel
