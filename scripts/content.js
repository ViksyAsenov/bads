const blockingAds = () => {
  const ads = document.querySelectorAll('.ad-showing')
  if (ads.length === 0) return

  const video = document.querySelector('video')
  video.currentTime = Number.MAX_VALUE

  const buttons = document.querySelectorAll('ytp-ad-skip-button ytp-button')
  for (const button of buttons) {
    if (button) button.click()
  }
}

let interval = null
const startBlocking = () => {
  interval = setInterval(blockingAds, 250)
}

const stopBlocking = () => {
  clearInterval(interval)
}

;(async function checkIsActive() {
  const { isActive } = await chrome.storage.local.get('isActive')

  if (isActive) {
    startBlocking()
    console.log('Blocking from start')
  } else {
    stopBlocking()
    console.log('Not blocking from start')
  }
})()

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received in content script:', request)

  if (request.isActive === true) {
    startBlocking()
  }

  if (request.isActive === false) {
    stopBlocking()
  }
})
