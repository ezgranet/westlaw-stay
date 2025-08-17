// content.js
// Purpose: Runs inside Westlaw pages. Periodically simulates small user actions
// (mousemove or scroll) to keep the session from timing out due to inactivity.

let counter = 0; // track how many times we've simulated activity

function simulateMouseMove() {
  // Create a fake mousemove event at position (0,0)
  const event = new MouseEvent("mousemove", {
    bubbles: true,
    cancelable: true,
    view: window,
    clientX: 0,
    clientY: 0
  });
  document.dispatchEvent(event);
  console.log("Westlaw keepalive: mousemove dispatched");
}

function simulateScroll() {
  // Scroll down by 1px, then immediately back up (invisible to the user)
  window.scrollBy(0, 1);
  window.scrollBy(0, -1);
  console.log("Westlaw keepalive: tiny scroll dispatched");
}

function simulateActivity() {
  counter++;

  // Every 3rd event, simulate scroll instead of mousemove
  if (counter % 3 === 0) {
    simulateScroll();
  } else {
    simulateMouseMove();
  }
}

function scheduleNext() {
  // Random delay between 4–6 minutes (in ms)
  const min = 4 * 60 * 1000;
  const max = 6 * 60 * 1000;
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;

  // Wait delay ms, then simulate activity and schedule next cycle
  setTimeout(() => {
    simulateActivity();
    scheduleNext();
  }, delay);
}

function startKeepAlive() {
  console.log("Westlaw keepalive: started");
  scheduleNext(); // begin the loop
}

// When the page loads, check if Keep Alive is enabled
chrome.storage.sync.get("keepAlive", (data) => {
  if (data.keepAlive) {
    startKeepAlive();
  } else {
    console.log("Westlaw keepalive: disabled");
  }
});

// Optional: allows manual "runOnce" trigger from popup or background (not used yet)
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "runOnce") {
    simulateActivity();
  }
});
