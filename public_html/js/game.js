// Game initialization
const game = {
    canvas: null,
    ctx: null,
    gridSize: 20,
    snake: [],
    food: null,
    direction: 'right',
    score: 0,
    gameLoop: null,
    speed: 100
};

// Initialize the game
function init() {
    game.canvas = document.getElementById('gameCanvas');
    game.ctx = game.canvas.getContext('2d');
    
    // Set canvas size
    game.canvas.width = 800;
    game.canvas.height = 600;
    
    // Initialize snake
    game.snake = [
        {x: 5, y: 5},
        {x: 4, y: 5},
        {x: 3, y: 5}
    ];
    
    // Generate first food
    generateFood();
    
    // Start game loop
    game.gameLoop = setInterval(update, game.speed);
    
    // Add keyboard controls
    document.addEventListener('keydown', handleKeyPress);
}

// Generate food at random position
function generateFood() {
    const maxX = Math.floor(game.canvas.width / game.gridSize);
    const maxY = Math.floor(game.canvas.height / game.gridSize);
    
    game.food = {
        x: Math.floor(Math.random() * maxX),
        y: Math.floor(Math.random() * maxY)
    };
    
    // Make sure food doesn't spawn on snake
    for (let segment of game.snake) {
        if (segment.x === game.food.x && segment.y === game.food.y) {
            generateFood();
            break;
        }
    }
}

// Update game state
function update() {
    const head = {...game.snake[0]};
    
    // Move head based on direction
    switch (game.direction) {
        case 'up': head.y--; break;
        case 'down': head.y++; break;
        case 'left': head.x--; break;
        case 'right': head.x++; break;
    }
    
    // Check for collisions
    if (checkCollision(head)) {
        gameOver();
        return;
    }
    
    // Add new head
    game.snake.unshift(head);
    
    // Check if food is eaten
    if (head.x === game.food.x && head.y === game.food.y) {
        game.score += 10;
        generateFood();
    } else {
        // Remove tail if no food eaten
        game.snake.pop();
    }
    
    // Draw everything
    draw();
}

// Draw game elements
function draw() {
    // Clear canvas
    game.ctx.fillStyle = '#1a1a1a';
    game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
    
    // Draw snake
    game.ctx.fillStyle = '#4CAF50';
    for (let segment of game.snake) {
        game.ctx.fillRect(
            segment.x * game.gridSize,
            segment.y * game.gridSize,
            game.gridSize - 2,
            game.gridSize - 2
        );
    }
    
    // Draw food
    game.ctx.fillStyle = '#FF0000';
    game.ctx.fillRect(
        game.food.x * game.gridSize,
        game.food.y * game.gridSize,
        game.gridSize - 2,
        game.gridSize - 2
    );
    
    // Draw score
    game.ctx.fillStyle = '#FFFFFF';
    game.ctx.font = '20px Arial';
    game.ctx.fillText('Score: ' + game.score, 10, 30);
}

// Check for collisions
function checkCollision(head) {
    // Wall collision
    if (head.x < 0 || head.x >= game.canvas.width / game.gridSize ||
        head.y < 0 || head.y >= game.canvas.height / game.gridSize) {
        return true;
    }
    
    // Self collision
    for (let segment of game.snake) {
        if (head.x === segment.x && head.y === segment.y) {
            return true;
        }
    }
    
    return false;
}

// Handle keyboard input
function handleKeyPress(e) {
    switch (e.key) {
        case 'ArrowUp':
            if (game.direction !== 'down') game.direction = 'up';
            break;
        case 'ArrowDown':
            if (game.direction !== 'up') game.direction = 'down';
            break;
        case 'ArrowLeft':
            if (game.direction !== 'right') game.direction = 'left';
            break;
        case 'ArrowRight':
            if (game.direction !== 'left') game.direction = 'right';
            break;
    }
}

// Game over
function gameOver() {
    clearInterval(game.gameLoop);
    game.ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
    
    game.ctx.fillStyle = '#FFFFFF';
    game.ctx.font = '48px Arial';
    game.ctx.textAlign = 'center';
    game.ctx.fillText('Game Over!', game.canvas.width / 2, game.canvas.height / 2);
    
    game.ctx.font = '24px Arial';
    game.ctx.fillText('Final Score: ' + game.score, game.canvas.width / 2, game.canvas.height / 2 + 40);
    game.ctx.fillText('Press F5 to play again', game.canvas.width / 2, game.canvas.height / 2 + 80);
}

// Start the game when the page loads
window.onload = init; 