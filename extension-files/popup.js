// popup.js
// Purpose: Simple UI for toggling the Keep Alive behavior on/off

const toggle = document.getElementById("toggle");

// Load stored state when popup opens
chrome.storage.sync.get("keepAlive", (data) => {
  toggle.checked = data.keepAlive ?? true; // default = true
});

// Update background.js whenever the checkbox is clicked
toggle.addEventListener("change", () => {
  chrome.runtime.sendMessage({
    action: "setKeepAlive",
    value: toggle.checked
  });
});
