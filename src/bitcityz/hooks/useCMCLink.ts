import { useState, useEffect } from 'react'

// endpoint to check asset exists and get url to CMC page
// returns 400 status code if token is not on CMC
const CMC_ENDPOINT = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?address='

/**
 * Check if asset exists on CMC, if exists
 * return  url, if not return undefined
 * @param address token address (all lowercase, checksummed are not supported by CMC)
 */
const useCMCLink = (address: string): string | undefined => {
  const [cmcPageUrl, setCMCPageUrl] = useState<string | undefined>(undefined)

  useEffect(() => {
    const fetchLink = async () => {
      const result = await fetch(`${CMC_ENDPOINT}${address}`, {
        method: "GET",
        headers: { 'X-CMC_PRO_API_KEY': 'ec5bda09-3076-4b23-856d-07b3584a8a9b' }
      })
      // if link exists, format the url
      if (result.status === 200) {
        result.json().then(({ data }) => {
            console.log("==========", data)
          setCMCPageUrl(data.url)
        })
      }
    }
    if (address) {
      fetchLink()
    }
  }, [address])

  return cmcPageUrl
}

export default useCMCLink
