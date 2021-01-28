// Game variable
let min = 1,
	max = 10,
	winningNumber = getWinningNum(min, max),
	guessesLeft = 3;

// UI elements
const game = document.getElementById("game"),
	minNum = document.querySelector("#min-num"),
	maxNum = document.querySelector("#max-num"),
	guessBtn = document.querySelector("#guess-btn"),
	guessInput = document.querySelector("#guess-input"),
	message = document.querySelector(".message");

// Assign Ui
minNum.textContent = min;
maxNum.textContent = max;

// play again
game.addEventListener("mousedown", function (e) {
	if (e.target.className === "play-again") {
		window.location.reload();
	}
});

// Add event listeners
guessBtn.addEventListener("click", function () {
	let guess = parseInt(guessInput.value); // because the value is in string format
	// but we want it in num format

	// validate
	if (isNaN(guess) || guess > max || guess < min) {
		setMessage(`Please enter a number between ${min} and ${max}`, "green");
	}

	// Check if won
	if (guess === winningNumber) {
		gameOver(true, `${winningNumber} is correct!!, You Win`);
	} else {
		// Wrong
		guessesLeft -= 1;
		if (guessesLeft === 0) {
			// game over-lost
			gameOver(
				false,
				`Game Over!! You Lost!!. The Correct Number is ${winningNumber}`
			);
		} else {
			// Game continues answer-wrong
			// changes border Color
			guessInput.style.borderColor = "red";

			// Tell user
			setMessage(`${guess} is incorrect, ${guessesLeft} left`, "red");

			// Clear Input
			guessInput.value = "";
		}
	}
});

function setMessage(msg, color) {
	message.style.color = color;
	message.textContent = msg;
}

function gameOver(won, msg) {
	let color;
	won === true ? (color = "green") : (color = "red");

	//disable input
	guessInput.disabled = true;
	// border green
	guessInput.style.borderColor = color;
	// message
	message.style.color = color;
	setMessage(msg);

	// Play Again
	guessBtn.value = "Play Again";
	guessBtn.className += "play-again";
}

function getWinningNum(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
