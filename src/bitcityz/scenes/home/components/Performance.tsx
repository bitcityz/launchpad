import React from 'react'

import '../../../assets/index.css'

import performance from '../../../assets/images/performance.svg'
import sLogo from '../../../assets/images/logo-s.png'
import telegramLight from '../../../assets/images/telegram-light.svg'
import twitterLight from '../../../assets/images/twitter-light.svg'
import discordLight from '../../../assets/images/discord-light.svg'
import btczIcon from '../../../assets/images/ic-btcz.svg'

function Performance(props) {
  return (
    <div>
      <div className="text-center pt-[110px]">
        <img src={performance} className="mx-auto" alt="" />
        <h2 className="text-center text-[#F5F5F5] font-bold text-[32px] text-shadow">Performance</h2>

        <div className="border-[1px] border-solid border-skyblue rounded-xl p-5 mt-12">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-4">
              <img src={sLogo} alt="" />
              <span className="text-[#F5F5F5] font-bold text-xl">BitcityZ</span>
            </div>
            <div className="flex items-center gap-x-5">
              <img src={telegramLight} alt="" />
              <img src={twitterLight} alt="" />
              <img src={discordLight} alt="" />
            </div>
          </div>
          <div className="grid gap-y-3 md:gap-y-0 md:grid-cols-4 md:gap-x-7 mt-8">
            <div className="md:pr-7 md:border-r-[1px] md:border-solid md:border-[#C4C4C4]">
              <p className="text-[#F5F5F5] text-left">Current Price</p>
              <h6 className="flex justify-between items-center mt-4">
                <p className="text-[#F5F5F5] font-bold text-2xl">$ 100.56</p>{' '}
                <span className="text-[#00DE09] text-xs font-semibold"> 3.148%</span>
              </h6>
            </div>
            <div className="md:pr-7 md:border-r-[1px] md:border-solid md:border-[#C4C4C4]">
              <p className="text-[#F5F5F5] text-left flex justify-between">
                Market Cap: <span className="font-semibold text-sm">$300,3M</span>
              </p>
              <p className="text-[#F5F5F5] text-left flex justify-between mt-4">
                Vol (24h):{' '}
                <span className="font-semibold text-sm">
                  $5.8M <small className="text-[#00DE09] text-xs font-semibold">70%</small>
                </span>
              </p>
            </div>
            <div className="md:pr-7 md:border-r-[1px] md:border-solid md:border-[#C4C4C4]">
              <p className="text-[#F5F5F5] text-left flex justify-between">
                Raised: <span className="font-semibold text-sm">$300,3M</span>
              </p>
              <p className="text-[#F5F5F5] text-left flex justify-between mt-4">
                IDO Price: <span className="font-semibold text-sm">$1</span>
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
        <div className="mt-8">
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
        </div>
      </div>
    </div>
  )
}

export default Performance
