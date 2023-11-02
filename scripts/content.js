const blockingAds = () => {
  const ad = document.querySelector('.ad-showing')
  const video = document.querySelector('video')

  if (ad && video) {
    video.currentTime = Number.MAX_VALUE

    setTimeout(() => {
      const skipButton = document.querySelector('.ytp-ad-skip-button')
      if (skipButton) skipButton.click()
    }, 250)
  }
}

let interval = null
const startBlocking = () => {
  interval = setInterval(blockingAds, 250)
}

const stopBlocking = () => {
  clearInterval(interval)
}

const initializeBlocking = async () => {
  try {
    const { isActive } = await chrome.storage.local.get('isActive')

    if (isActive) {
      startBlocking()
      console.log('Blocking from start')
    } else {
      stopBlocking()
      console.log('Not blocking from start')
    }
  } catch (error) {
    console.error('Error initializing blocking:', error)
  }
}
initializeBlocking()

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received in content script:', request)

  if (request.isActive === true) {
    startBlocking()
  }

  if (request.isActive === false) {
    stopBlocking()
  }
})
