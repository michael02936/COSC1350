
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

// Get score and reset button.
const scoreDisplay = document.getElementById("score");
const resetButton = document.getElementById("resetButton");

// Ball information.
const ballRadius = 15;
let balls = [];

// Paddle information.
const paddleWidth = 100;
const paddleHeight = 15;
let xPaddle;
const yPaddle = canvas.height - 30;
const paddleSpeed = 8;

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

// Create a new ball.
function createBall(x, y, isMain) {
    return {
        x: x,
        y: y,
        dx: isMain ? 3 : (Math.random() < 0.5 ? -3 : 3),
        dy: 3,
        color: isMain ? "#ffffff" : "#00aaff",
        isMain: isMain
    };
}

// Reset the ball and paddle.
function resetPositions() {
    balls = [createBall(canvas.width / 2, canvas.height / 2, true)];
    xPaddle = (canvas.width - paddleWidth) / 2;
}

// Draw all the balls.
function ballRender() {
    for (let ball of balls) {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.closePath();
    }
}

// Draw the paddle.
function paddleRender() {
    ctx.fillStyle = "#5d0f70";
    ctx.fillRect(xPaddle, yPaddle, paddleWidth, paddleHeight);
}

// Draw the bricks.
function brickRender() {
    for (let brick of bricks) {
        if (!brick.hit) {
            ctx.fillStyle = "#9b59b6";
            ctx.fillRect(
                brick.x,
                brick.y,
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

// Give a brick a 25% chance to spawn a blue ball.
function spawnExtraBall(x, y) {
    if (Math.random() < 0.25) {
        balls.push(createBall(x, y, false));
    }
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

    // Move the paddle.
    if (moveLeft) {
        xPaddle -= paddleSpeed;
    }

    if (moveRight) {
        xPaddle += paddleSpeed;
    }

    // Keep the paddle inside the canvas.
    if (xPaddle < 0) {
        xPaddle = 0;
    }

    if (xPaddle > canvas.width - paddleWidth) {
        xPaddle = canvas.width - paddleWidth;
    }

    // Move and check every ball.
    for (let i = balls.length - 1; i >= 0; i--) {
        let ball = balls[i];

        ball.x += ball.dx;
        ball.y += ball.dy;

        // Bounce off the left and right walls.
        if (ball.x + ballRadius >= canvas.width ||
            ball.x - ballRadius <= 0) {
            ball.dx = -ball.dx;
        }

        // Bounce off the top wall.
        if (ball.y - ballRadius <= 0) {
            ball.dy = Math.abs(ball.dy);
        }

        // Check for collisions with bricks.
        for (let brick of bricks) {
            if (!brick.hit &&
                ball.x + ballRadius >= brick.x &&
                ball.x - ballRadius <= brick.x + brickWidth &&
                ball.y + ballRadius >= brick.y &&
                ball.y - ballRadius <= brick.y + brickHeight) {

                brick.hit = true;
                ball.dy = -ball.dy;

                // Add points for breaking a brick.
                updateScore();

                // Chance to spawn another blue ball.
                spawnExtraBall(ball.x, ball.y);

                break;
            }
        }

        // Bounce off the paddle.
        if (
            ball.y + ballRadius >= yPaddle &&
            ball.y - ballRadius <= yPaddle + paddleHeight &&
            ball.x >= xPaddle &&
            ball.x <= xPaddle + paddleWidth &&
            ball.dy > 0
        ) {
            ball.dy = -Math.abs(ball.dy);
        }

        // Check if a ball falls off the bottom.
        if (ball.y - ballRadius > canvas.height) {

            // The original white ball ends the game.
            if (ball.isMain) {
                endGame("Game Over! Your score was " + score);
                return;
            }

            // Blue balls simply disappear.
            balls.splice(i, 1);
        }
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

// Start the game.
startGame();
