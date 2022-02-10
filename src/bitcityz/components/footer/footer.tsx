import React, { useState } from 'react'

import '../../assets/index.css'
import telegramIcon from '../../assets/images/telegram.svg'
import twitterIcon from '../../assets/images/twitter.svg'
import mediumIcon from '../../assets/images/medium.png'
import discordIcon from '../../assets/images/discord.svg'
import youtubeIcon from '../../assets/images/youtube.svg'
import facebookIcon from '../../assets/images/facebook.svg'
import bitcity from '../../assets/images/footer-bitcity.png'
import bg from '../../assets/images/bg-footer.png'

function Footer() {
  const [email, setEmail] = useState('')
  const [responseMsg, setResponseMsg] = useState('')
  const [responseStatus, setResponseStatus] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setEmail(e.currentTarget.value)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (email === '') {
      setResponseMsg('Please complete this required email.')
      setResponseStatus(500)
      return
    }
    setIsLoading(true)
    const xhr = new XMLHttpRequest()
    const url =
      'https://api.hsforms.com/submissions/v3/integration/submit/21005557/72bf5a0f-1810-4e2b-ad76-8e2ac6b26ae6'
    const data = {
      fields: [
        {
          name: 'email',
          value: email,
        },
      ],
    }

    const finalData = JSON.stringify(data)

    xhr.open('POST', url)
    // Sets the value of the 'Content-Type' HTTP request headers to 'application/json'
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        setResponseMsg('Thanks for submitting the form.')
        setResponseStatus(200)
      } else if (xhr.readyState === 4 && xhr.status === 403) {
        setResponseMsg(xhr.responseText)
        setResponseStatus(403)
      } else if (xhr.readyState === 4 && xhr.status === 404) {
        setResponseStatus(404)
        setResponseMsg(xhr.responseText)
      } else {
        setResponseStatus(400)
        setResponseMsg('Something error')
      }
      setIsLoading(false)
    }

    // Sends the request
    xhr.send(finalData)
  }
  return (
    <footer
      className="bg-cover bg-center bg-no-repeat pt-[84px] bg-[#050e21] relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute top-0 left-0 w-full h-[180px] linear-background z-0" />
      <div className="layout-container grid md:grid-cols-2 gap-7 relative z-10">
        <div>
          <h6 className="text-xl md:text-2xl text-[#2CE7FF] font-bold">
            Subscribe to our newsletter for development news!
          </h6>
          <div className="mt-4">
            {/* <HubspotForm
              portalId="21005557"
              formId="72bf5a0f-1810-4e2b-ad76-8e2ac6b26ae6"
              onSubmit={() => console.log('Submit!')}
              onReady={(form) => console.log('Form ready!')}
              loading={<div>Loading...</div>}
              css=""
              cssClass="hubspotForm"
            /> */}
            {responseStatus === 200 ? (
              <p className="text-white text-xl font-semibold">{responseMsg}</p>
            ) : (
              <div className="flex items-center">
                <input
                  type="text"
                  className="bg-white rounded-[10px] py-[7px] px-3 border-none flex-1 text-[#9E9E9E]"
                  value={email}
                  onChange={handleChange}
                  placeholder="Insert your email"
                />
                <button
                  type="button"
                  className={`shadow-blue rounded-[10px] py-[7px] px-4 md:px-9 text-[#212121] font-semibold border-none ml-[11px] ${
                    isLoading ? 'pointer-events-none bg-[#9E9E9E]' : 'bg-[#2CE7FF]'
                  }`}
                  onClick={handleSubmit}
                >
                  Subscribe
                </button>
              </div>
            )}
            {responseStatus && responseStatus !== 200 && <p className="text-sm text-[#FF0000]">{responseMsg}</p>}
          </div>
          <p className="text-white mt-4">Follow us on our channels</p>
          <div className="flex items-center mt-4">
            <a href="https://t.me/BitCityZSocial" target="_blank" rel="noreferrer">
              <img src={telegramIcon} className="mr-5" alt="Telegram" />
            </a>
            <a href="https://twitter.com/BitCityZ_social" target="_blank" rel="noreferrer">
              <img src={twitterIcon} className="mr-5" alt="Twitter" />
            </a>
            <a href="https://medium.com/@bitcityz.social" target="_blank" rel="noreferrer">
              <img src={mediumIcon} className="mr-5" alt="Medium" />
            </a>
            <a href="https://discord.gg/yFwuxBME" target="_blank" rel="noreferrer">
              <img src={discordIcon} className="mr-5" alt="Discord" />
            </a>
            <a href="https://www.youtube.com/channel/UCC1X5Hsg0YQYkDsp6K4SzDQ" target="_blank" rel="noreferrer">
              <img src={youtubeIcon} className="mr-5" alt="Youtube" />
            </a>
            <a href="https://www.facebook.com/bitcityz/" target="_blank" rel="noreferrer">
              <img src={facebookIcon} className="mr-5" alt="Facebook" />
            </a>
          </div>
          <p className="text-white mt-10">Join our Telegram Official Global Group</p>
          <div className="mt-1">
            <a href="https://t.me/BitCityZGlobalGroup" className="flex items-center" target="_blank" rel="noreferrer">
              <img src={telegramIcon} className="mr-2 w-9 h-9" alt="" />
              <span className="font-bold text-4xl text-gradient">BitCityZ Global Group</span>
            </a>
          </div>
        </div>
        <img src={bitcity} className="max-w-full" alt="" />
      </div>
    </footer>
  )
}

export default Footer
