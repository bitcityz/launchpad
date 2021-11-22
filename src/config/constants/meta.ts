import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'Metaxiz',
  description:
    'Meta Fight’s gameplay is designed to revolve around the combination between your personal skills and teawork, Challenge yourself with a wide variety of game modes: Discover & Fighting, coming with monthly updates and attractive rewards.',
  image: 'https://pancakeswap.finance/images/hero.png',
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
        title: `${t('Home')} | ${t('Metaxiz')}`,
      }
    case '/swap':
      return {
        title: `${t('Exchange')} | ${t('Metaxiz')}`,
      }
    case '/add':
      return {
        title: `${t('Add Liquidity')} | ${t('Metaxiz')}`,
      }
    case '/remove':
      return {
        title: `${t('Remove Liquidity')} | ${t('Metaxiz')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} | ${t('Metaxiz')}`,
      }
    case '/find':
      return {
        title: `${t('Import Pool')} | ${t('Metaxiz')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('Metaxiz')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('Metaxiz')}`,
      }
    case '/prediction/leaderboard':
      return {
        title: `${t('Leaderboard')} | ${t('Metaxiz')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('Metaxiz')}`,
      }
    case '/farms/auction':
      return {
        title: `${t('Farm Auctions')} | ${t('Metaxiz')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('Metaxiz')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('Metaxiz')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('Metaxiz')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('Metaxiz')}`,
      }
    case '/voting':
      return {
        title: `${t('Voting')} | ${t('Metaxiz')}`,
      }
    case '/voting/proposal':
      return {
        title: `${t('Proposals')} | ${t('Metaxiz')}`,
      }
    case '/voting/proposal/create':
      return {
        title: `${t('Make a Proposal')} | ${t('Metaxiz')}`,
      }
    case '/info':
      return {
        title: `${t('Overview')} | ${t('Metaxiz Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/info/pools':
      return {
        title: `${t('Pools')} | ${t('Metaxiz Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/info/tokens':
      return {
        title: `${t('Tokens')} | ${t('Metaxiz Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/nfts':
      return {
        title: `${t('Overview')} | ${t('Metaxiz')}`,
      }
    case '/nfts/collections':
      return {
        title: `${t('Collections')} | ${t('Metaxiz')}`,
      }
    case '/nfts/profile':
      return {
        title: `${t('Your Profile')} | ${t('Metaxiz')}`,
      }
    case '/pancake-squad':
      return {
        title: `${t('Pancake Squad')} | ${t('Metaxiz')}`,
      }
    default:
      return null
  }
}
