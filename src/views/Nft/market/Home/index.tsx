import React from 'react'
import styled from 'styled-components'
import { Heading, Flex } from '@mexi/uikit'
import { useTranslation } from 'contexts/Localization'
import PageHeader from 'components/PageHeader'
import PageSection from 'components/PageSection'
import { PageMeta } from 'components/Layout/Page'
import useTheme from 'hooks/useTheme'
import Collections from './Collections'

// IMAGES
import HeaderSrc from './images/header.svg'

const StyledPageHeader = styled(PageHeader)`
  margin-bottom: -40px;
  padding-bottom: 40px;
  background-image: url(${HeaderSrc});
  background-repeat: no-repeat;
  background-size: cover;
`

const StyledHeaderInner = styled(Flex)`
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  & div:nth-child(1) {
    order: 1;
  }
  & div:nth-child(2) {
    order: 0;
    margin-bottom: 32px;
    align-self: end;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    & div:nth-child(1) {
      order: 0;
    }
    & div:nth-child(2) {
      order: 1;
      margin-bottom: 0;
      align-self: auto;
    }
  }
`

const Home = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  return (
    <>
      <PageMeta />
      <StyledPageHeader>
        <StyledHeaderInner>
          <div>
            <Heading as="h1" scale="xxl" color="white" mb="8px">
              {t('NFT MARKET')}
            </Heading>
            <Heading scale="md" color="white">
              Buy and sell NFTs on Binance Smart Chain
            </Heading>
          </div>
        </StyledHeaderInner>
      </StyledPageHeader>
      <PageSection
        innerProps={{ style: { margin: '0', width: '100%', paddingTop: 0 } }}
        background="#E9F2F6"
        index={1}
        concaveDivider
      >
        <Collections />
      </PageSection>
      {/* <Collections /> */}
    </>
  )
}

export default Home
