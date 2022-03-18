import React from 'react'

import '../../../assets/index.css'

// import { getBCTZAddress } from 'utils/addressHelpers'
// import useCMCLink from '../../../hooks/useCMCLink'

import performance from '../../../assets/images/performance.svg'
import sLogo from '../../../assets/images/bctz-icon.png'
import telegramLight from '../../../assets/images/telegram-light.svg'
import twitterLight from '../../../assets/images/twitter-light.svg'
import discordLight from '../../../assets/images/discord-light.svg'
import facebook from '../../../assets/images/facebook.svg'
import youtube from '../../../assets/images/youtube.svg'
import medium from '../../../assets/images/medium.png'
import btczIcon from '../../../assets/images/ic-bctz.png'

function Performance() {
  // const address = getBCTZAddress()
  // const cmcLink = useCMCLink(address)
  return (
    <div>
      <div className="text-center pt-[110px]">
        <img src={performance} className="mx-auto" alt="" />
        <h2 className="text-center text-skyblue font-bold text-[32px] text-shadow">Performance</h2>

        <div className="border-[1px] border-solid border-skyblue rounded-xl p-5 mt-8">
          <div className="flex flex-col gap-y-3 md:gap-y-0 md:flex-row md:justify-between md:items-center">
            <div className="flex items-center gap-x-4">
              <img src={sLogo} alt="" />
              <span className="text-[#F5F5F5] font-bold text-xl">BitCityZ</span>
            </div>
            <div className="flex items-center gap-x-5">
              <a href="https://t.me/BitCityZSocial" target="_blank" rel="noreferrer">
                <img src={telegramLight} alt="Telegram" />
              </a>
              <a href="https://twitter.com/BitCityZ_social" target="_blank" rel="noreferrer">
                <img src={twitterLight} alt="Twitter" />
              </a>
              <a href="https://medium.com/@bitcityz.social" target="_blank" rel="noreferrer">
                <img src={medium} alt="Medium" />
              </a>
              <a href="https://discord.gg/yFwuxBME" target="_blank" rel="noreferrer">
                <img src={discordLight} alt="Discord" />
              </a>
              <a href="https://www.youtube.com/channel/UCC1X5Hsg0YQYkDsp6K4SzDQ" target="_blank" rel="noreferrer">
                <img src={youtube} alt="Youtube" />
              </a>
              <a href="https://www.facebook.com/bitcityz/" target="_blank" rel="noreferrer">
                <img src={facebook} alt="Facebook" />
              </a>
            </div>
          </div>
          <div className="grid gap-y-3 md:gap-y-0 md:grid-cols-4 md:gap-x-7 mt-8">
            <div className="md:pr-7 md:border-r-[1px] md:border-solid md:border-[#C4C4C4]">
              <p className="text-[#F5F5F5] text-left">Current Price</p>
              <h6 className="flex justify-between items-center mt-4">
                <p className="text-[#F5F5F5] font-bold text-2xl">N/A</p>{' '}
                {/* <span className="text-[#00DE09] text-xs font-semibold"> N/A</span> */}
              </h6>
            </div>
            <div className="md:pr-7 md:border-r-[1px] md:border-solid md:border-[#C4C4C4]">
              <p className="text-[#F5F5F5] text-left flex justify-between">
                Market Cap: <span className="font-semibold text-sm">N/A</span>
              </p>
              <p className="text-[#F5F5F5] text-left flex justify-between mt-4">
                Vol (24h):{' '}
                <span className="font-semibold text-sm">
                  N/A
                  {/* <small className="text-[#00DE09] text-xs font-semibold">N/A</small> */}
                </span>
              </p>
            </div>
            <div className="md:pr-7 md:border-r-[1px] md:border-solid md:border-[#C4C4C4]">
              <p className="text-[#F5F5F5] text-left flex justify-between">
                Raised: <span className="font-semibold text-sm">N/A</span>
              </p>
              <p className="text-[#F5F5F5] text-left flex justify-between mt-4">
                IDO Price: <span className="font-semibold text-sm">0.15 BUSD</span>
              </p>
            </div>
            <div className="md:pr-7">
              <p className="text-[#F5F5F5] text-left flex justify-between">
                IDO ROI <span className="font-semibold text-sm">298,96x</span>
              </p>
              <p className="text-[#F5F5F5] text-left flex justify-between mt-4">
                Native Token{' '}
                <span className="font-semibold text-sm flex items-center gap-x-2">
                  <img src={btczIcon} alt="" />
                  BCTZ
                </span>
              </p>
            </div>
          </div>
        </div>
        {/* <div className="mt-8">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-xl min-w-[800px]">
              <thead className="bg-[#030303] rounded-tl-xl rounded-tr-xl">
                <tr>
                  <th className="p-6 whitespace-nowrap text-left text-sm text-[#F5F5F5] font-semibold leading-[18px]">
                    CMC Rank
                  </th>
                  <th className="p-6 whitespace-nowrap text-left text-sm text-[#F5F5F5] font-semibold leading-[18px]">
                    Name
                  </th>
                  <th className="p-6 whitespace-nowrap text-right text-sm text-[#F5F5F5] font-semibold leading-[18px]">
                    Price
                  </th>
                  <th className="p-6 whitespace-nowrap text-right text-sm text-[#F5F5F5] font-semibold leading-[18px]">
                    Change 24H
                  </th>
                  <th className="p-6 whitespace-nowrap text-right text-sm text-[#F5F5F5] font-semibold leading-[18px]">
                    Change 7D
                  </th>
                  <th className="p-6 whitespace-nowrap text-right text-sm text-[#F5F5F5] font-semibold leading-[18px]">
                    Market Cap
                  </th>
                  <th className="p-6 whitespace-nowrap text-right text-sm text-[#F5F5F5] font-semibold leading-[18px]">
                    Vol (24)
                  </th>
                  <th className="p-6 whitespace-nowrap text-right text-sm text-[#F5F5F5] font-semibold leading-[18px]">
                    IDO ROI
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  style={{ background: 'rgba(33, 33, 33, 0.3)' }}
                  className="border-t-[1px] border-solid border-[#C4C4C4]"
                >
                  <td className="p-6 text-[#F5F5F5] text-left">126</td>
                  <td className="p-6 text-[#F5F5F5] text-left">
                    <span className="flex items-baseline">
                      <img src={btczIcon} className="mr-1 w-[24px] translate-y-[5px]" alt="" /> HurricanSwap
                    </span>
                  </td>
                  <td className="p-6 text-[#F5F5F5] text-right">$289.12</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">3.148%</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">24.44%</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">$289M</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">$5,9M</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">298.96x</td>
                </tr>
                <tr
                  style={{ background: 'rgba(33, 33, 33, 0.3)' }}
                  className="border-t-[1px] border-solid border-[#C4C4C4]"
                >
                  <td className="p-6 text-[#F5F5F5] text-left">126</td>
                  <td className="p-6 text-[#F5F5F5] text-left">
                    <span className="flex items-baseline">
                      <img src={btczIcon} className="mr-1 w-[24px] translate-y-[5px]" alt="" /> HurricanSwap
                    </span>
                  </td>
                  <td className="p-6 text-[#F5F5F5] text-right">$289.12</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">3.148%</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">24.44%</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">$289M</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">$5,9M</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">298.96x</td>
                </tr>
                <tr
                  style={{ background: 'rgba(33, 33, 33, 0.3)' }}
                  className="border-t-[1px] border-solid border-[#C4C4C4]"
                >
                  <td className="p-6 text-[#F5F5F5] text-left">126</td>
                  <td className="p-6 text-[#F5F5F5] text-left">
                    <span className="flex items-baseline">
                      <img src={btczIcon} className="mr-1 w-[24px] translate-y-[5px]" alt="" /> HurricanSwap
                    </span>
                  </td>
                  <td className="p-6 text-[#F5F5F5] text-right">$289.12</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">3.148%</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">24.44%</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">$289M</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">$5,9M</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">298.96x</td>
                </tr>
                <tr
                  style={{ background: 'rgba(33, 33, 33, 0.3)' }}
                  className="border-t-[1px] border-solid border-[#C4C4C4]"
                >
                  <td className="p-6 text-[#F5F5F5] text-left">126</td>
                  <td className="p-6 text-[#F5F5F5] text-left">
                    <span className="flex items-baseline">
                      <img src={btczIcon} className="mr-1 w-[24px] translate-y-[5px]" alt="" /> HurricanSwap
                    </span>
                  </td>
                  <td className="p-6 text-[#F5F5F5] text-right">$289.12</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">3.148%</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">24.44%</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">$289M</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">$5,9M</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">298.96x</td>
                </tr>
                <tr
                  style={{ background: 'rgba(33, 33, 33, 0.3)' }}
                  className="border-t-[1px] border-solid border-[#C4C4C4]"
                >
                  <td className="p-6 text-[#F5F5F5] text-left">126</td>
                  <td className="p-6 text-[#F5F5F5] text-left">
                    <span className="flex items-baseline">
                      <img src={btczIcon} className="mr-1 w-[24px] translate-y-[5px]" alt="" /> HurricanSwap
                    </span>
                  </td>
                  <td className="p-6 text-[#F5F5F5] text-right">$289.12</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">3.148%</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">24.44%</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">$289M</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">$5,9M</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">298.96x</td>
                </tr>
                <tr
                  style={{ background: 'rgba(33, 33, 33, 0.3)' }}
                  className="border-t-[1px] border-solid border-[#C4C4C4]"
                >
                  <td className="p-6 text-[#F5F5F5] text-left">126</td>
                  <td className="p-6 text-[#F5F5F5] text-left">
                    <span className="flex items-baseline">
                      <img src={btczIcon} className="mr-1 w-[24px] translate-y-[5px]" alt="" /> HurricanSwap
                    </span>
                  </td>
                  <td className="p-6 text-[#F5F5F5] text-right">$289.12</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">3.148%</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">24.44%</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">$289M</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">$5,9M</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">298.96x</td>
                </tr>
                <tr
                  style={{ background: 'rgba(33, 33, 33, 0.3)' }}
                  className="border-t-[1px] border-solid border-[#C4C4C4]"
                >
                  <td className="p-6 text-[#F5F5F5] text-left">126</td>
                  <td className="p-6 text-[#F5F5F5] text-left">
                    <span className="flex items-baseline">
                      <img src={btczIcon} className="mr-1 w-[24px] translate-y-[5px]" alt="" /> HurricanSwap
                    </span>
                  </td>
                  <td className="p-6 text-[#F5F5F5] text-right">$289.12</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">3.148%</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">24.44%</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">$289M</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">$5,9M</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">298.96x</td>
                </tr>
                <tr
                  style={{ background: 'rgba(33, 33, 33, 0.3)' }}
                  className="border-t-[1px] border-solid border-[#C4C4C4]"
                >
                  <td className="p-6 text-[#F5F5F5] text-left">126</td>
                  <td className="p-6 text-[#F5F5F5] text-left">
                    <span className="flex items-baseline">
                      <img src={btczIcon} className="mr-1 w-[24px] translate-y-[5px]" alt="" /> HurricanSwap
                    </span>
                  </td>
                  <td className="p-6 text-[#F5F5F5] text-right">$289.12</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">3.148%</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">24.44%</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">$289M</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">$5,9M</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">298.96x</td>
                </tr>
                <tr
                  style={{ background: 'rgba(33, 33, 33, 0.3)' }}
                  className="border-t-[1px] border-solid border-[#C4C4C4]"
                >
                  <td className="p-6 text-[#F5F5F5] text-left">126</td>
                  <td className="p-6 text-[#F5F5F5] text-left">
                    <span className="flex items-baseline">
                      <img src={btczIcon} className="mr-1 w-[24px] translate-y-[5px]" alt="" /> HurricanSwap
                    </span>
                  </td>
                  <td className="p-6 text-[#F5F5F5] text-right">$289.12</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">3.148%</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">24.44%</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">$289M</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">$5,9M</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">298.96x</td>
                </tr>
                <tr
                  style={{ background: 'rgba(33, 33, 33, 0.3)' }}
                  className="border-t-[1px] border-solid border-[#C4C4C4]"
                >
                  <td className="p-6 text-[#F5F5F5] text-left">126</td>
                  <td className="p-6 text-[#F5F5F5] text-left">
                    <span className="flex items-baseline">
                      <img src={btczIcon} className="mr-1 w-[24px] translate-y-[5px]" alt="" /> HurricanSwap
                    </span>
                  </td>
                  <td className="p-6 text-[#F5F5F5] text-right">$289.12</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">3.148%</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">24.44%</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">$289M</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">$5,9M</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">298.96x</td>
                </tr>
                <tr
                  style={{ background: 'rgba(33, 33, 33, 0.3)' }}
                  className="border-t-[1px] border-solid border-[#C4C4C4]"
                >
                  <td className="p-6 text-[#F5F5F5] text-left">126</td>
                  <td className="p-6 text-[#F5F5F5] text-left">
                    <span className="flex items-baseline">
                      <img src={btczIcon} className="mr-1 w-[24px] translate-y-[5px]" alt="" /> HurricanSwap
                    </span>
                  </td>
                  <td className="p-6 text-[#F5F5F5] text-right">$289.12</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">3.148%</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">24.44%</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">$289M</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">$5,9M</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">298.96x</td>
                </tr>
                <tr
                  style={{ background: 'rgba(33, 33, 33, 0.3)' }}
                  className="border-t-[1px] border-solid border-[#C4C4C4]"
                >
                  <td className="p-6 text-[#F5F5F5] text-left">126</td>
                  <td className="p-6 text-[#F5F5F5] text-left">
                    <span className="flex items-baseline">
                      <img src={btczIcon} className="mr-1 w-[24px] translate-y-[5px]" alt="" /> HurricanSwap
                    </span>
                  </td>
                  <td className="p-6 text-[#F5F5F5] text-right">$289.12</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">3.148%</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">24.44%</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">$289M</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">$5,9M</td>
                  <td className="p-6 text-[#00DE09] text-right text-sm font-semibold">298.96x</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default Performance
