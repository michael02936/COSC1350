
const guessForm = document.getElementById("guessForm");
const guessInput = document.getElementById("guess");
const result = document.getElementById("result");
const previousGuesses = document.getElementById("previousGuesses");
const turns = document.getElementById("turns");
const restartButton = document.getElementById("restart");

let secretNumber;
let guesses;
let gameOver;

function startGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    guesses = [];
    gameOver = false;

    result.textContent = "Make your first guess!";
    previousGuesses.textContent = "Previous guesses: None";
    turns.textContent = "You have 10 guesses left.";

    guessInput.value = "";
    guessInput.disabled = false;
    guessForm.querySelector("button").disabled = false;
    restartButton.hidden = true;
}

guessForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if (gameOver) {
        return;
    }

    const guess = Number(guessInput.value);

    if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
        result.textContent = "Please enter a whole number from 1 to 100.";
        return;
    }

    guesses.push(guess);

    if (guess === secretNumber) {
        result.textContent = "You got it! Great job!";
        endGame();
    } else if (guess < secretNumber) {
        result.textContent = "Too low! Try a higher number.";
    } else {
        result.textContent = "Too high! Try a lower number.";
    }

    previousGuesses.textContent =
        "Previous guesses: " + guesses.join(", ");

    const remaining = 10 - guesses.length;
    turns.textContent = "You have " + remaining + " guesses left.";

    if (guess !== secretNumber && remaining === 0) {
        result.textContent =
            "Game over! The number was " + secretNumber + ".";
        endGame();
    }

    guessInput.value = "";

    if (!gameOver) {
        guessInput.focus();
    }
});

function endGame() {
    gameOver = true;
    guessInput.disabled = true;
    guessForm.querySelector("button").disabled = true;
    restartButton.hidden = false;
}

restartButton.addEventListener("click", startGame);

startGame();
