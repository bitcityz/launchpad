import { ChainId, Currency, currencyEquals, JSBI, Price } from '@pancakeswap/sdk'
import { useMemo, useEffect, useState } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import tokens, { testnetTokens, mainnetTokens } from 'config/constants/tokens'
import { PairState, usePairs } from './usePairs'
import { wrappedCurrency } from '../utils/wrappedCurrency'

const BUSD_MAINNET = mainnetTokens.busd
const BUSD_TESTNET = testnetTokens.busd
const { wbnb: WBNB } = tokens

/**
 * Returns the price in BUSD of the input currency
 * @param currency currency to compute the BUSD price of
 */
export default function useBUSDPrice(currency?: Currency): Price | undefined {
  const { chainId } = useActiveWeb3React()
  const wrapped = wrappedCurrency(currency, chainId)
  const tokenPairs: [Currency | undefined, Currency | undefined][] = useMemo(
    () => [
      [chainId && wrapped && currencyEquals(WBNB, wrapped) ? undefined : currency, chainId ? WBNB : undefined],
      [wrapped?.equals(BUSD_MAINNET) ? undefined : wrapped, chainId === ChainId.MAINNET ? BUSD_MAINNET : BUSD_TESTNET],
      [chainId ? WBNB : undefined, chainId === ChainId.MAINNET ? BUSD_MAINNET : BUSD_TESTNET],
    ],
    [chainId, currency, wrapped],
  )
  const [[ethPairState, ethPair], [busdPairState, busdPair], [busdEthPairState, busdEthPair]] = usePairs(tokenPairs)

  return useMemo(() => {
    if (!currency || !wrapped || !chainId) {
      return undefined
    }
    // handle weth/eth
    if (wrapped.equals(WBNB)) {
      if (busdPair) {
        const price = busdPair.priceOf(WBNB)
        return new Price(currency, BUSD_MAINNET, price.denominator, price.numerator)
      }
      return undefined
    }
    // handle busd
    if (wrapped.equals(BUSD_MAINNET)) {
      return new Price(BUSD_MAINNET, BUSD_MAINNET, '1', '1')
    }

    const ethPairETHAmount = ethPair?.reserveOf(WBNB)
    const ethPairETHBUSDValue: JSBI =
      ethPairETHAmount && busdEthPair ? busdEthPair.priceOf(WBNB).quote(ethPairETHAmount).raw : JSBI.BigInt(0)

    // all other tokens
    // first try the busd pair
    if (
      busdPairState === PairState.EXISTS &&
      busdPair &&
      busdPair.reserveOf(BUSD_MAINNET).greaterThan(ethPairETHBUSDValue)
    ) {
      const price = busdPair.priceOf(wrapped)
      return new Price(currency, BUSD_MAINNET, price.denominator, price.numerator)
    }
    if (ethPairState === PairState.EXISTS && ethPair && busdEthPairState === PairState.EXISTS && busdEthPair) {
      if (busdEthPair.reserveOf(BUSD_MAINNET).greaterThan('0') && ethPair.reserveOf(WBNB).greaterThan('0')) {
        const ethBusdPrice = busdEthPair.priceOf(BUSD_MAINNET)
        const currencyEthPrice = ethPair.priceOf(WBNB)
        const busdPrice = ethBusdPrice.multiply(currencyEthPrice).invert()
        return new Price(currency, BUSD_MAINNET, busdPrice.denominator, busdPrice.numerator)
      }
    }

    return undefined
  }, [chainId, currency, ethPair, ethPairState, busdEthPair, busdEthPairState, busdPair, busdPairState, wrapped])
}

export const useCakeBusdPrice = (): Price | undefined => {
  // const cakeBusdPrice = useBUSDPrice(tokens.cake)
  return undefined
}

export const useBNBBusdPrice = (): Price | undefined => {
  const bnbBusdPrice = useBUSDPrice(tokens.wbnb)
  return bnbBusdPrice
}

export const useBNBVsBusdPrice = (): number | undefined => {
  const [bnbBusdPrice, setBnbBusdPrice] = useState()
  useEffect(() => {
    const fetchBNBBusdPrice = async () => {
      const res = await fetch('https://api.pancakeswap.info/api/v2/tokens/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c')
      if (res.ok) {
        const { data } = await res.json()
        setBnbBusdPrice(data.price)
      } else {
        setBnbBusdPrice(undefined)
      }
    }
    fetchBNBBusdPrice()
  }, [])
  return bnbBusdPrice
}
