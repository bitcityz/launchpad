import React, { lazy, useCallback, useState, useEffect } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { ResetCSS } from '@metaxiz/uikit'
import BigNumber from 'bignumber.js'
import useEagerConnect from 'hooks/useEagerConnect'
import useUserAgent from 'hooks/useUserAgent'
import useScrollOnRouteChange from 'hooks/useScrollOnRouteChange'
import { usePollBlockNumber } from 'state/block/hooks'
import { usePollCoreFarmData } from 'state/farms/hooks'
import { useFetchProfile } from 'state/profile/hooks'
import { DatePickerPortal } from 'components/DatePicker'
import { simpleRpcProvider } from 'utils/providers'
import { signMessage } from 'utils/web3React'
import useAuth from 'hooks/useAuth'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import { ToastListener } from './contexts/ToastsContext'
import PageLoader from './components/Loader/PageLoader'
import EasterEgg from './components/EasterEgg'
import GlobalCheckClaimStatus from './components/GlobalCheckClaimStatus'
import history from './routerHistory'
// Views included in the main bundle

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
const Boxes = lazy(() => import('./views/Boxes'))
const Box = lazy(() => import('./views/Boxes/Box'))
const NotFound = lazy(() => import('./views/NotFound'))
const NftMarket = lazy(() => import('./views/Nft/market'))
const Airdrops = lazy(() => import('./views/Airdrops'))
const NftHome = lazy(() => import('./views/Nft/market/Home'))

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  usePollBlockNumber()
  useEagerConnect()
  useFetchProfile()
  usePollCoreFarmData()
  useScrollOnRouteChange()
  useUserAgent()
  useAuth()

  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <GlobalCheckClaimStatus excludeLocations={[]} />
      <Menu>
        <SuspenseWithChunkError fallback={<PageLoader />}>
          <Switch>
            <Route exact path="/">
              <NftHome />
            </Route>
            {/* <Route exact path="/farms/auction">
              <FarmAuction />
            </Route>
            <Route path="/farms">
              <Farms />
            </Route>
            <Route path="/pools">
              <Pools />
            </Route>
            <Route path="/lottery">
              <Lottery />
            </Route>
            <Route path="/ifo">
              <Ifos />
            </Route>
            <Route exact path="/teams">
              <Teams />
            </Route>
            <Route path="/teams/:id">
              <Team />
            </Route>
            <Route path="/create-profile">
              <ProfileCreation />
            </Route>
            <Route path="/competition">
              <TradingCompetition />
            </Route>
            <Route exact path="/prediction">
              <Predictions />
            </Route>
            <Route path="/prediction/leaderboard">
              <PredictionsLeaderboard />
            </Route>
            <Route exact path="/voting">
              <Voting />
            </Route>
            <Route exact path="/voting/proposal/create">
              <CreateProposal />
            </Route>
            <Route path="/voting/proposal/:id">
              <Proposal />
            </Route> */}

            {/* NFT */}
            <Route path="/nfts">
              <NftMarket />
            </Route>
            <Route path="/airdrops">
              <Airdrops />
            </Route>
            <Route exact path="/boxes">
              <Boxes />
            </Route>
            <Route path="/boxes/:box">
              <Box />
            </Route>

            {/* <Route path="/pancake-squad">
              <PancakeSquad />
            </Route> */}

            {/* Info pages */}
            {/* <Route path="/info">
              <Info />
            </Route> */}

            {/* Using this format because these components use routes injected props. We need to rework them with hooks */}
            {/* <Route exact strict path="/swap" component={Swap} />
            <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
            <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
            <Route exact strict path="/find" component={PoolFinder} />
            <Route exact strict path="/liquidity" component={Liquidity} />
            <Route exact strict path="/create" component={RedirectToAddLiquidity} />
            <Route exact path="/add" component={AddLiquidity} />
            <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
            <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
            <Route exact path="/create" component={AddLiquidity} />
            <Route exact path="/create/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
            <Route exact path="/create/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
            <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
            <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} /> */}

            {/* Redirect */}
            {/* <Route path="/pool">
              <Redirect to="/liquidity" />
            </Route>
            <Route path="/staking">
              <Redirect to="/pools" />
            </Route>
            <Route path="/syrup">
              <Redirect to="/pools" />
            </Route>
            <Route path="/collectibles">
              <Redirect to="/nfts" />
            </Route>
            <Route path="/profile">
              <Redirect to={`${nftsBaseUrl}/profile/${account?.toLowerCase() || ''}`} />
            </Route> */}

            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </SuspenseWithChunkError>
      </Menu>
      <EasterEgg iterations={2} />
      <ToastListener />
      <DatePickerPortal />
    </Router>
  )
}

export default React.memo(App)
