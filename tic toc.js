const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart");
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// Function to handle cell clicks
function handleCellClick(cell, cellIndex) {
  if (gameBoard[cellIndex] === "" && gameActive) {
    gameBoard[cellIndex] = currentPlayer;
    cell.innerText = currentPlayer;
    cell.classList.add(currentPlayer);
    if (checkWin()) {
      endGame(false);
    } else if (isBoardFull()) {
      endGame(true);
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      message.innerText = `Player ${currentPlayer}'s turn`;
    }
  }
}

// Function to check if the game is over
function checkWin() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      gameBoard[a] === currentPlayer &&
      gameBoard[b] === currentPlayer &&
      gameBoard[c] === currentPlayer
    ) {
      return true;
    }
  }
  return false;
}

// Function to check if the board is full
function isBoardFull() {
  return !gameBoard.includes("");
}

// Function to end the game
function endGame(draw) {
  if (draw) {
    message.innerText = "It's a draw!";
  } else {
    message.innerText = `Player ${currentPlayer} wins!`;
  }
  gameActive = false;
  restartButton.style.display = "block";
}

// Function to restart the game
function restartGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  message.innerText = "Player X's turn";
  gameActive = true;
  cells.forEach((cell) => {
    cell.innerText = "";
    cell.classList.remove("X", "O");
  });
  restartButton.style.display = "none";
}

// Event listeners
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handleCellClick(cell, index));
});

restartButton.addEventListener("click", restartGame);

// Initial setup
restartGame();
