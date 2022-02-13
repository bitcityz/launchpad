import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'BitCityZ',
  description: '',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  let basePath
  if (path.startsWith('/swap')) {
    basePath = '/swap'
  } else if (path.startsWith('/add')) {
    basePath = '/add'
  } else if (path.startsWith('/remove')) {
    basePath = '/remove'
  } else if (path.startsWith('/teams')) {
    basePath = '/teams'
  } else if (path.startsWith('/voting/proposal') && path !== '/voting/proposal/create') {
    basePath = '/voting/proposal'
  } else if (path.startsWith('/nfts/collections')) {
    basePath = '/nfts/collections'
  } else if (path.startsWith('/nfts/profile')) {
    basePath = '/nfts/profile'
  } else if (path.startsWith('/pancake-squad')) {
    basePath = '/pancake-squad'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${t('Home')} | ${t('BitCityZ')}`,
      }
    case '/launchpool':
      return {
        title: `${t('Launchpool')} | ${t('BitCityZ')}`,
      }
    case '/add':
      return {
        title: `${t('Add Liquidity')} | ${t('BitCityZ')}`,
      }
    case '/remove':
      return {
        title: `${t('Remove Liquidity')} | ${t('BitCityZ')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} | ${t('BitcityZ')}`,
      }
    case '/find':
      return {
        title: `${t('Import Pool')} | ${t('BitCityZ')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('BitcityZ')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('BitCityZ')}`,
      }
    case '/prediction/leaderboard':
      return {
        title: `${t('Leaderboard')} | ${t('BitCityZ')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('BitCityZ')}`,
      }
    case '/farms/auction':
      return {
        title: `${t('Farm Auctions')} | ${t('BitCityZ')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('BitCityZ')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('BitCityZ')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('BitCityZ')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('BitCityZ')}`,
      }
    case '/voting':
      return {
        title: `${t('Voting')} | ${t('BitCityZ')}`,
      }
    case '/voting/proposal':
      return {
        title: `${t('Proposals')} | ${t('BitCityZ')}`,
      }
    case '/voting/proposal/create':
      return {
        title: `${t('Make a Proposal')} | ${t('BitCityZ')}`,
      }
    case '/info':
      return {
        title: `${t('Overview')} | ${t('BitCityZ Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/info/pools':
      return {
        title: `${t('Pools')} | ${t('BitCityZ Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/info/tokens':
      return {
        title: `${t('Tokens')} | ${t('BitCityZ Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/nfts':
      return {
        title: `${t('Overview')} | ${t('BitCityZ')}`,
      }
    case '/nfts/collections':
      return {
        title: `${t('Collections')} | ${t('BitCityZ')}`,
      }
    case '/nfts/profile':
      return {
        title: `${t('Your Profile')} | ${t('BitCityZ')}`,
      }
    case '/pancake-squad':
      return {
        title: `${t('Pancake Squad')} | ${t('BitCityZ')}`,
      }
    default:
      return null
  }
}
