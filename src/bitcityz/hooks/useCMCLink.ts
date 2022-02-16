import { useState, useEffect } from 'react'

// endpoint to check asset exists and get url to CMC page
// returns 400 status code if token is not on CMC
const CMC_ENDPOINT = 'http://159.223.72.119:5001/cmc-call?uri=cryptocurrency/info?address='

/**
 * Check if asset exists on CMC, if exists
 * return  url, if not return undefined
 * @param address token address (all lowercase, checksummed are not supported by CMC)
 */
const useCMCLink = (address: string): string | undefined => {
  const [cmcPageUrl, setCMCPageUrl] = useState<string | undefined>(undefined)

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const result = await fetch(`${CMC_ENDPOINT}${address}`, {
          method: 'GET',
          headers: { 'X-CMC_PRO_API_KEY': 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c' },
        })
        // if link exists, format the url
        if (result.status === 200) {
          result.json().then(({ data }) => {
            setCMCPageUrl(data.url)
          })
        }
      } catch (e) {
        setCMCPageUrl(e)
      }
    }
    if (address) {
      fetchLink()
    }
  }, [address])

  return cmcPageUrl
}

export default useCMCLink
