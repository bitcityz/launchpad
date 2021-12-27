import React from 'react'
import styled from 'styled-components'
import { useProfileForAddress } from 'state/profile/hooks'
import { Box } from '@mexi/uikit'
import Page from 'components/Layout/Page'
import { Route, useParams } from 'react-router'
import { nftsBaseUrl } from 'views/Nft/market/constants'
import MarketPageHeader from '../components/MarketPageHeader'
import ProfileHeader from './components/ProfileHeader'
import TabMenu from './components/TabMenu'
import ActivityHistory from './components/ActivityHistory'
import SubMenu from './components/SubMenu'
import useNftsForAddress from './hooks/useNftsForAddress'
import UnconnectedProfileNfts from './components/UnconnectedProfileNfts'

const TabMenuWrapper = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0%);

  ${({ theme }) => theme.mediaQueries.sm} {
    left: auto;
    transform: none;
  }
`

const UnconnectedProfile = () => {
  const { accountAddress } = useParams<{ accountAddress: string }>()
  const { profile: profileHookState, isFetching: isProfileFetching } = useProfileForAddress(accountAddress)
  const { profile } = profileHookState || {}
  const { nfts, isLoading: isNftLoading } = useNftsForAddress(accountAddress, profile, isProfileFetching)

  return (
    <>
      <MarketPageHeader position="relative">
        <ProfileHeader
          accountPath={accountAddress}
          profile={profile}
          nftCollected={nfts.length}
          isProfileLoading={isProfileFetching}
          isNftLoading={isNftLoading}
        />
        <TabMenuWrapper>
          <TabMenu />
        </TabMenuWrapper>
      </MarketPageHeader>
      <Page style={{ minHeight: 'auto' }}>
        <Route path={`${nftsBaseUrl}/profile/:accountAddress/activity`}>
          <SubMenu />
          <ActivityHistory />
        </Route>
        <Route exact path={`${nftsBaseUrl}/profile/:accountAddress`}>
          <UnconnectedProfileNfts nfts={nfts} isLoading={isNftLoading} />
        </Route>
      </Page>
    </>
  )
}

export default UnconnectedProfile
