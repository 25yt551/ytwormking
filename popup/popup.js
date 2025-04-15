document.addEventListener('DOMContentLoaded', function() {
    // Load saved settings
    chrome.storage.local.get([
        'autoPlay',
        'speedBoost',
        'autoCollect',
        'autoEvolve',
        'showGrid',
        'zoomLevel'
    ], function(result) {
        document.getElementById('auto-play').checked = result.autoPlay || false;
        document.getElementById('speed-boost').checked = result.speedBoost || false;
        document.getElementById('auto-collect').checked = result.autoCollect || false;
        document.getElementById('auto-evolve').checked = result.autoEvolve || false;
        document.getElementById('show-grid').checked = result.showGrid || false;
        document.getElementById('current-zoom').textContent = (result.zoomLevel || 100) + '%';
    });

    // Feature toggles
    document.getElementById('auto-play').addEventListener('change', function() {
        chrome.storage.local.set({ autoPlay: this.checked });
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleAutoPlay', value: this.checked });
        }.bind(this));
    });

    document.getElementById('speed-boost').addEventListener('change', function() {
        chrome.storage.local.set({ speedBoost: this.checked });
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleSpeedBoost', value: this.checked });
        }.bind(this));
    });

    document.getElementById('auto-collect').addEventListener('change', function() {
        chrome.storage.local.set({ autoCollect: this.checked });
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleAutoCollect', value: this.checked });
        }.bind(this));
    });

    document.getElementById('auto-evolve').addEventListener('change', function() {
        chrome.storage.local.set({ autoEvolve: this.checked });
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleAutoEvolve', value: this.checked });
        }.bind(this));
    });

    document.getElementById('show-grid').addEventListener('change', function() {
        chrome.storage.local.set({ showGrid: this.checked });
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleGrid', value: this.checked });
        }.bind(this));
    });

    // Zoom controls
    document.getElementById('zoom-in').addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'zoomIn' });
        });
    });

    document.getElementById('zoom-out').addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'zoomOut' });
        });
    });

    document.getElementById('reset-zoom').addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'resetZoom' });
        });
    });

    // Listen for zoom level updates from content script
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.action === 'updateZoom') {
            document.getElementById('current-zoom').textContent = request.zoomLevel + '%';
        }
    });
}); 