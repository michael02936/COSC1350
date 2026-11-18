
/* ..:: BREAKOUT GAME ::..
 *
 * breakout.js
 * Author: Michael
 * Date: 11/17/26
 * Project for COSC 1350
 *
 */

// Get the canvas element from the webpage.
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Ball information.
let ballRadius = 15;
let xPos = canvas.width / 2;
let yPos = canvas.height / 2;

// Ball movement speed.
let xMoveDist = 3;
let yMoveDist = 3;

// Paddle information.
let paddleWidth = 100;
let paddleHeight = 15;
let xPaddle = (canvas.width - paddleWidth) / 2;
let yPaddle = canvas.height - 30;

// Keyboard movement.
let moveLeft = false;
let moveRight = false;

// Brick information.
let brickRows = 4;
let brickColumns = 6;
let brickWidth = 90;
let brickHeight = 25;
let brickPadding = 10;
let brickTopOffset = 40;
let brickLeftOffset = 5;

// Array to hold the bricks.
let bricks = [];

for (let r = 0; r < brickRows; r++) {
    for (let c = 0; c < brickColumns; c++) {
        bricks.push({
            x: brickLeftOffset + c * (brickWidth + brickPadding),
            y: brickTopOffset + r * (brickHeight + brickPadding),
            hit: false
        });
    }
}

// Draw the ball.
ballRender = () => {
    ctx.beginPath();
    ctx.arc(xPos, yPos, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.closePath();
};

// Draw the paddle.
paddleRender = () => {
    ctx.fillStyle = "#5d0f70";
    ctx.fillRect(xPaddle, yPaddle, paddleWidth, paddleHeight);
};

// Draw the bricks.
brickRender = () => {
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
};

// Check when a key is pressed.
keyDownHandler = (event) => {
    if (event.key === "ArrowLeft" || event.key === "a") {
        moveLeft = true;
    }

    if (event.key === "ArrowRight" || event.key === "d") {
        moveRight = true;
    }
};

// Check when a key is released.
keyUpHandler = (event) => {
    if (event.key === "ArrowLeft" || event.key === "a") {
        moveLeft = false;
    }

    if (event.key === "ArrowRight" || event.key === "d") {
        moveRight = false;
    }
};

// Listen for keyboard presses and releases.
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

// Main game function.
draw = () => {

    // Clear the canvas.
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move the ball.
    xPos += xMoveDist;
    yPos += yMoveDist;

    // Bounce off the left and right walls.
    if (xPos > canvas.width - ballRadius) {
        xMoveDist = -xMoveDist;
    }

    if (xPos < ballRadius) {
        xMoveDist = -xMoveDist;
    }

    // Bounce off the top wall.
    if (yPos < ballRadius) {
        yMoveDist = -yMoveDist;
    }

    // Check for collisions with bricks.
    for (let i = 0; i < bricks.length; i++) {
        if (!bricks[i].hit) {
            if (
                xPos > bricks[i].x &&
                xPos < bricks[i].x + brickWidth &&
                yPos > bricks[i].y &&
                yPos < bricks[i].y + brickHeight
            ) {
                yMoveDist = -yMoveDist;
                bricks[i].hit = true;
            }
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
    if (yPos > canvas.height - ballRadius) {
        clearInterval(intervalID);
        alert("Game Over!");
        return;
    }

    // Draw the bricks, ball, and paddle.
    brickRender();
    ballRender();
    paddleRender();

};

// Refresh the game every 40 milliseconds.
const refreshRate = 40;
const intervalID = setInterval(draw, refreshRate);
