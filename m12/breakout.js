
/* ..:: BREAKOUT GAME ::..
 *
 * breakout.js
 * Author: Michael
 * Date: 11/13/26
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

    // Bounce off the top and bottom walls.
    if (yPos > canvas.height - ballRadius) {
        yMoveDist = -yMoveDist;
    }

    if (yPos < ballRadius) {
        yMoveDist = -yMoveDist;
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

    // Draw the ball and paddle.
    ballRender();
    paddleRender();

    // Bounce the ball off the paddle.
if (
    yPos + ballRadius >= yPaddle &&
    xPos >= xPaddle &&
    xPos <= xPaddle + paddleWidth &&
    yMoveDist > 0
) {
    yMoveDist = -yMoveDist;
};

// Refresh the game every 40 milliseconds.
const refreshRate = 40;
const intervalID = setInterval(draw, refreshRate);


