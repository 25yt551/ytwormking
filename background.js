// Handle keyboard commands
chrome.commands.onCommand.addListener(function(command) {
    switch (command) {
        case 'toggle-auto-play':
            chrome.storage.local.get('autoPlay', function(result) {
                const newValue = !result.autoPlay;
                chrome.storage.local.set({ autoPlay: newValue });
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleAutoPlay', value: newValue });
                });
            });
            break;
        case 'toggle-speed-boost':
            chrome.storage.local.get('speedBoost', function(result) {
                const newValue = !result.speedBoost;
                chrome.storage.local.set({ speedBoost: newValue });
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleSpeedBoost', value: newValue });
                });
            });
            break;
    }
});

// Listen for tab updates
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && tab.url.includes('wormate.io')) {
        // Inject content script if needed
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['content.js']
        });
        chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ['styles.css']
        });
    }
});

// Handle extension installation or update
chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason === 'install') {
        // Set default settings
        chrome.storage.local.set({
            autoPlay: false,
            speedBoost: false,
            autoCollect: false,
            autoEvolve: false,
            showGrid: false,
            zoomLevel: 100
        });
    }
}); 