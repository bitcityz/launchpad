import React from 'react'
import { useProfile } from 'state/profile/hooks'
import { useWeb3React } from '@web3-react/core'
import Page from 'components/Layout/Page'
import { Route } from 'react-router'
import { useUserNfts } from 'state/nftMarket/hooks'
import { nftsBaseUrl } from 'views/Nft/market/constants'
import { useFetchAchievements } from 'state/achievements/hooks'
import { UserNftInitializationState } from 'state/nftMarket/types'
import useFetchUserNfts from './hooks/useFetchUserNfts'
import MarketPageHeader from '../components/MarketPageHeader'
import ProfileHeader from './components/ProfileHeader'
import ActivityHistory from './components/ActivityHistory'
import SubMenu from './components/SubMenu'
import UserNfts from './components/UserNfts'

const ConnectedProfile = () => {
  const { profile, isLoading: isProfileLoading } = useProfile()
  const { account } = useWeb3React()
  const { userNftsInitializationState, nfts: userNfts } = useUserNfts()

  useFetchAchievements()
  useFetchUserNfts()

  return (
    <>
      <MarketPageHeader position="relative">
        <ProfileHeader
          accountPath={account}
          profile={profile}
          nftCollected={userNfts.length}
          isProfileLoading={isProfileLoading}
          isNftLoading={userNftsInitializationState !== UserNftInitializationState.INITIALIZED}
        />
      </MarketPageHeader>
      <Page style={{ minHeight: 'auto' }}>
        <Route path={`${nftsBaseUrl}/profile/:accountAddress/activity`}>
          <SubMenu />
          <ActivityHistory />
        </Route>
        <Route exact path={`${nftsBaseUrl}/profile/:accountAddress`}>
          <UserNfts />
        </Route>
      </Page>
    </>
  )
}

export default ConnectedProfile
