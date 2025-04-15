// Initialize game state
let gameState = {
    autoPlay: false,
    speedBoost: false,
    autoCollect: false,
    autoEvolve: false,
    showGrid: false,
    zoomLevel: 100
};

// Load saved settings
chrome.storage.local.get([
    'autoPlay',
    'speedBoost',
    'autoCollect',
    'autoEvolve',
    'showGrid',
    'zoomLevel'
], function(result) {
    gameState = { ...gameState, ...result };
    applySettings();
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch (request.action) {
        case 'toggleAutoPlay':
            gameState.autoPlay = request.value;
            toggleAutoPlay(request.value);
            break;
        case 'toggleSpeedBoost':
            gameState.speedBoost = request.value;
            toggleSpeedBoost(request.value);
            break;
        case 'toggleAutoCollect':
            gameState.autoCollect = request.value;
            toggleAutoCollect(request.value);
            break;
        case 'toggleAutoEvolve':
            gameState.autoEvolve = request.value;
            toggleAutoEvolve(request.value);
            break;
        case 'toggleGrid':
            gameState.showGrid = request.value;
            toggleGrid(request.value);
            break;
        case 'zoomIn':
            zoomIn();
            break;
        case 'zoomOut':
            zoomOut();
            break;
        case 'resetZoom':
            resetZoom();
            break;
    }
});

// Auto Play functionality
function toggleAutoPlay(enabled) {
    if (enabled) {
        // Implement auto play logic
        const gameCanvas = document.getElementById('game-canvas');
        if (gameCanvas) {
            // Add auto play behavior
            console.log('Auto Play enabled');
        }
    } else {
        // Remove auto play behavior
        console.log('Auto Play disabled');
    }
}

// Speed Boost functionality
function toggleSpeedBoost(enabled) {
    if (enabled) {
        // Implement speed boost logic
        console.log('Speed Boost enabled');
    } else {
        // Remove speed boost
        console.log('Speed Boost disabled');
    }
}

// Auto Collect functionality
function toggleAutoCollect(enabled) {
    if (enabled) {
        // Implement auto collect logic
        console.log('Auto Collect enabled');
    } else {
        // Remove auto collect behavior
        console.log('Auto Collect disabled');
    }
}

// Auto Evolve functionality
function toggleAutoEvolve(enabled) {
    if (enabled) {
        // Implement auto evolve logic
        console.log('Auto Evolve enabled');
    } else {
        // Remove auto evolve behavior
        console.log('Auto Evolve disabled');
    }
}

// Grid display functionality
function toggleGrid(enabled) {
    if (enabled) {
        // Add grid overlay
        const gameContainer = document.getElementById('game-cont');
        if (gameContainer) {
            const gridOverlay = document.createElement('div');
            gridOverlay.id = 'grid-overlay';
            gridOverlay.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
                background-size: 20px 20px;
                pointer-events: none;
                z-index: 1000;
            `;
            gameContainer.appendChild(gridOverlay);
        }
    } else {
        // Remove grid overlay
        const gridOverlay = document.getElementById('grid-overlay');
        if (gridOverlay) {
            gridOverlay.remove();
        }
    }
}

// Zoom functionality
function zoomIn() {
    if (gameState.zoomLevel < 200) {
        gameState.zoomLevel += 10;
        applyZoom();
    }
}

function zoomOut() {
    if (gameState.zoomLevel > 50) {
        gameState.zoomLevel -= 10;
        applyZoom();
    }
}

function resetZoom() {
    gameState.zoomLevel = 100;
    applyZoom();
}

function applyZoom() {
    const gameContainer = document.getElementById('game-cont');
    if (gameContainer) {
        gameContainer.style.transform = `scale(${gameState.zoomLevel / 100})`;
        gameContainer.style.transformOrigin = 'center center';
        chrome.storage.local.set({ zoomLevel: gameState.zoomLevel });
        chrome.runtime.sendMessage({ action: 'updateZoom', zoomLevel: gameState.zoomLevel });
    }
}

// Apply all settings
function applySettings() {
    toggleAutoPlay(gameState.autoPlay);
    toggleSpeedBoost(gameState.speedBoost);
    toggleAutoCollect(gameState.autoCollect);
    toggleAutoEvolve(gameState.autoEvolve);
    toggleGrid(gameState.showGrid);
    applyZoom();
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey) {
        switch (e.key.toLowerCase()) {
            case 'a':
                gameState.autoPlay = !gameState.autoPlay;
                toggleAutoPlay(gameState.autoPlay);
                chrome.storage.local.set({ autoPlay: gameState.autoPlay });
                break;
            case 's':
                gameState.speedBoost = !gameState.speedBoost;
                toggleSpeedBoost(gameState.speedBoost);
                chrome.storage.local.set({ speedBoost: gameState.speedBoost });
                break;
            case 'c':
                gameState.autoCollect = !gameState.autoCollect;
                toggleAutoCollect(gameState.autoCollect);
                chrome.storage.local.set({ autoCollect: gameState.autoCollect });
                break;
            case 'e':
                gameState.autoEvolve = !gameState.autoEvolve;
                toggleAutoEvolve(gameState.autoEvolve);
                chrome.storage.local.set({ autoEvolve: gameState.autoEvolve });
                break;
            case 'g':
                gameState.showGrid = !gameState.showGrid;
                toggleGrid(gameState.showGrid);
                chrome.storage.local.set({ showGrid: gameState.showGrid });
                break;
        }
    }
}); 