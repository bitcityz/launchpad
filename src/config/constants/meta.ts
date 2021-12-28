import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'BitcityZ',
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
        title: `${t('Home')} | ${t('BitcityZ')}`,
      }
    case '/launchpool':
      return {
        title: `${t('Launchpool')} | ${t('BitcityZ')}`,
      }
    case '/add':
      return {
        title: `${t('Add Liquidity')} | ${t('BitcityZ')}`,
      }
    case '/remove':
      return {
        title: `${t('Remove Liquidity')} | ${t('BitcityZ')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} | ${t('BitcityZ')}`,
      }
    case '/find':
      return {
        title: `${t('Import Pool')} | ${t('BitcityZ')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('BitcityZ')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('BitcityZ')}`,
      }
    case '/prediction/leaderboard':
      return {
        title: `${t('Leaderboard')} | ${t('BitcityZ')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('BitcityZ')}`,
      }
    case '/farms/auction':
      return {
        title: `${t('Farm Auctions')} | ${t('BitcityZ')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('BitcityZ')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('BitcityZ')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('BitcityZ')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('BitcityZ')}`,
      }
    case '/voting':
      return {
        title: `${t('Voting')} | ${t('BitcityZ')}`,
      }
    case '/voting/proposal':
      return {
        title: `${t('Proposals')} | ${t('BitcityZ')}`,
      }
    case '/voting/proposal/create':
      return {
        title: `${t('Make a Proposal')} | ${t('BitcityZ')}`,
      }
    case '/info':
      return {
        title: `${t('Overview')} | ${t('BitcityZ Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/info/pools':
      return {
        title: `${t('Pools')} | ${t('BitcityZ Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/info/tokens':
      return {
        title: `${t('Tokens')} | ${t('BitcityZ Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/nfts':
      return {
        title: `${t('Overview')} | ${t('BitcityZ')}`,
      }
    case '/nfts/collections':
      return {
        title: `${t('Collections')} | ${t('BitcityZ')}`,
      }
    case '/nfts/profile':
      return {
        title: `${t('Your Profile')} | ${t('BitcityZ')}`,
      }
    case '/pancake-squad':
      return {
        title: `${t('Pancake Squad')} | ${t('BitcityZ')}`,
      }
    default:
      return null
  }
}
