import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { formatNumber } from 'utils/formatBalance'
import truncateHash from 'utils/truncateHash'
import { Profile } from 'state/types'
import StatBox, { StatBoxItem } from '../../components/StatBox'
import MarketPageTitle from '../../components/MarketPageTitle'

interface HeaderProps {
  accountPath: string
  profile: Profile
  nftCollected: number
  isNftLoading: boolean
  isProfileLoading: boolean
}

// Account and profile passed down as the profile could be used to render _other_ users' profiles.
const ProfileHeader: React.FC<HeaderProps> = ({
  accountPath,
  profile,
  nftCollected,
  isNftLoading,
}) => {
  const { t } = useTranslation()

  const numNftCollected = !isNftLoading ? (nftCollected ? formatNumber(nftCollected, 0, 0) : '-') : null

  const getTitle = () => {
    if (profile?.username) {
      return `@${profile.username}`
    }

    if (accountPath) {
      return truncateHash(accountPath, 5, 3)
    }

    return null
  }

  return (
    <>
      <MarketPageTitle pb="48px" title={getTitle()} description={<></>}>
        <StatBox>
          <StatBoxItem title={t('NFT Collected')} stat={numNftCollected} />
        </StatBox>
      </MarketPageTitle>
    </>
  )
}

export default ProfileHeader
