// background.js
// Purpose: Stores the current toggle state ("keepAlive") and listens for updates
// from the popup UI. This file never touches the webpage directly.

chrome.runtime.onInstalled.addListener(() => {
  // Default: keepAlive = true (enabled on first install)
  chrome.storage.sync.set({ keepAlive: true });
});

// Listen for messages sent from popup.js (user toggles Keep Alive on/off)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "setKeepAlive") {
    chrome.storage.sync.set({ keepAlive: request.value });
    sendResponse({ status: "ok" });
  }
});
