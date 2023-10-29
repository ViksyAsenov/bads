const blockingStatus = document.getElementById('blocking-status')
const startButton = document.getElementById('start-btn')
const stopButton = document.getElementById('stop-btn')

const setIsActive = (isActive) => {
  return { isActive }
}

const toggleTextAndButton = async () => {
  const { isActive } = await chrome.storage.local.get('isActive')
  console.log('IsActive from toggle', isActive)

  if (!isActive) {
    blockingStatus.textContent = 'Inactive'
    startButton.style.display = 'inline-block'
    stopButton.style.display = 'none'
  } else {
    blockingStatus.textContent = 'Active'
    startButton.style.display = 'none'
    stopButton.style.display = 'inline-block'
  }
}
toggleTextAndButton()

startButton.addEventListener('click', () => {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id, setIsActive(true))
    })
  })

  chrome.storage.local.set({ isActive: true })
  toggleTextAndButton()
})

stopButton.addEventListener('click', () => {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id, setIsActive(false))
    })
  })

  chrome.storage.local.set({ isActive: false })
  toggleTextAndButton()
})
