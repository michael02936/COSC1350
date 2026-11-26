
/* ..:: BREAKOUT GAME ::..
 *
 * breakout.js
 * Author: Michael
 * Date: 11/25/26
 * Project for COSC 1350
 *
 */

// Get the canvas and drawing tools.
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Get the score and reset button from the webpage.
const scoreDisplay = document.getElementById("score");
const resetButton = document.getElementById("resetButton");

// Ball information.
const ballRadius = 15;
let xPos;
let yPos;
let xMoveDist;
let yMoveDist;

// Paddle information.
const paddleWidth = 100;
const paddleHeight = 15;
let xPaddle;
const yPaddle = canvas.height - 30;

// Keyboard movement.
let moveLeft = false;
let moveRight = false;

// Brick information.
const brickRows = 4;
const brickColumns = 6;
const brickWidth = 90;
const brickHeight = 25;
const brickPadding = 10;
const brickTopOffset = 40;
const brickLeftOffset = 5;

// Game information.
let score = 0;
let bricks = [];
let gameOver = false;
let intervalID;

// Create the bricks.
function createBricks() {
    bricks = [];

    for (let r = 0; r < brickRows; r++) {
        for (let c = 0; c < brickColumns; c++) {
            bricks.push({
                x: brickLeftOffset + c * (brickWidth + brickPadding),
                y: brickTopOffset + r * (brickHeight + brickPadding),
                hit: false
            });
        }
    }
}

// Reset the ball and paddle.
function resetPositions() {
    xPos = canvas.width / 2;
    yPos = canvas.height / 2;
    xMoveDist = 3;
    yMoveDist = 3;
    xPaddle = (canvas.width - paddleWidth) / 2;
}

// Draw the ball.
function ballRender() {
    ctx.beginPath();
    ctx.arc(xPos, yPos, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.closePath();
}

// Draw the paddle.
function paddleRender() {
    ctx.fillStyle = "#5d0f70";
    ctx.fillRect(xPaddle, yPaddle, paddleWidth, paddleHeight);
}

// Draw the bricks.
function brickRender() {
    for (let i = 0; i < bricks.length; i++) {
        if (!bricks[i].hit) {
            ctx.fillStyle = "#9b59b6";
            ctx.fillRect(
                bricks[i].x,
                bricks[i].y,
                brickWidth,
                brickHeight
            );
        }
    }
}

// Check when a key is pressed.
function keyDownHandler(event) {
    const key = event.key.toLowerCase();

    if (key === "arrowleft" || key === "a") {
        moveLeft = true;
    }

    if (key === "arrowright" || key === "d") {
        moveRight = true;
    }
}

// Check when a key is released.
function keyUpHandler(event) {
    const key = event.key.toLowerCase();

    if (key === "arrowleft" || key === "a") {
        moveLeft = false;
    }

    if (key === "arrowright" || key === "d") {
        moveRight = false;
    }
}

// Listen for keyboard presses and releases.
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

// Update the score.
function updateScore() {
    score += 10;
    scoreDisplay.textContent = score;
}

// End the game.
function endGame(message) {
    gameOver = true;
    clearInterval(intervalID);
    alert(message);
}

// Main game function.
function draw() {

    if (gameOver) {
        return;
    }

    // Clear the canvas.
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move the ball.
    xPos += xMoveDist;
    yPos += yMoveDist;

    // Bounce off the left and right walls.
    if (xPos + ballRadius >= canvas.width ||
        xPos - ballRadius <= 0) {
        xMoveDist = -xMoveDist;
    }

    // Bounce off the top wall.
    if (yPos - ballRadius <= 0) {
        yMoveDist = -yMoveDist;
    }

    // Check for collisions with bricks.
    for (let i = 0; i < bricks.length; i++) {
        if (!bricks[i].hit &&
            xPos + ballRadius >= bricks[i].x &&
            xPos - ballRadius <= bricks[i].x + brickWidth &&
            yPos + ballRadius >= bricks[i].y &&
            yPos - ballRadius <= bricks[i].y + brickHeight) {

            yMoveDist = -yMoveDist;
            bricks[i].hit = true;
            updateScore();
        }
    }

    // Move the paddle left.
    if (moveLeft) {
        xPaddle -= 5;
    }

    // Move the paddle right.
    if (moveRight) {
        xPaddle += 5;
    }

    // Keep the paddle inside the canvas.
    if (xPaddle < 0) {
        xPaddle = 0;
    }

    if (xPaddle > canvas.width - paddleWidth) {
        xPaddle = canvas.width - paddleWidth;
    }

    // Bounce the ball off the paddle.
    if (
        yPos + ballRadius >= yPaddle &&
        yPos - ballRadius <= yPaddle + paddleHeight &&
        xPos >= xPaddle &&
        xPos <= xPaddle + paddleWidth &&
        yMoveDist > 0
    ) {
        yMoveDist = -yMoveDist;
    }

    // Check if the ball misses the paddle.
    if (yPos - ballRadius > canvas.height) {
        endGame("Game Over! Your score was " + score);
        return;
    }

    // Check if all bricks have been broken.
    if (bricks.every(brick => brick.hit)) {
        endGame("You Win! Final score: " + score);
        return;
    }

    // Draw the game objects.
    brickRender();
    ballRender();
    paddleRender();
}

// Start or restart the game.
function startGame() {
    clearInterval(intervalID);

    score = 0;
    scoreDisplay.textContent = score;

    gameOver = false;
    moveLeft = false;
    moveRight = false;

    resetPositions();
    createBricks();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    brickRender();
    ballRender();
    paddleRender();

    intervalID = setInterval(draw, 40);
}

// Reset button event.
resetButton.addEventListener("click", startGame);

// Start the game when the page loads.
startGame();
