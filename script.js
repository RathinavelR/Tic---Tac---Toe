const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");
const newGameBtn = document.getElementById("newGame");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const drawScore = document.getElementById("draw");

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let board = Array(9).fill("");
let currentPlayer = "X";
let running = true;
let xScore = 0;
let oScore = 0;
let drawCount = 0;

cells.forEach(cell => {

    cell.addEventListener("click", cellClick);

    cell.addEventListener("mouseenter", () => {
        if (!cell.textContent)
            cell.style.background = "#f3f0ff";
    });

    cell.addEventListener("mouseleave", () => {
        if (!cell.textContent)
            cell.style.background = "white";
    });

});

restartBtn.addEventListener("click", restartGame);
newGameBtn.addEventListener("click", newGame);

document.addEventListener("keydown", event => {

    if (event.key === "r" || event.key === "R")
        restartGame();

});

function cellClick() {

    const index = this.dataset.index;

    if (board[index] || !running)
        return;

    board[index] = currentPlayer;

    this.textContent = currentPlayer;

    this.className = "cell " + currentPlayer.toLowerCase();

    checkWinner();

}

function checkWinner() {

    const win = winPatterns.find(pattern => {

        const [a, b, c] = pattern.map(index => board[index]);

        return a && a === b && b === c;

    });

    if (win)
        return finishGame("win", win);

    if (board.every(Boolean))
        return finishGame("draw");

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.textContent = `Player ${currentPlayer} Turn`;

}

function finishGame(type, pattern) {

    running = false;

    statusText.textContent =
        type === "draw"
            ? "Match Draw"
            : `Player ${currentPlayer} Wins!`;

    if (type === "win") {

        if (currentPlayer === "X")
            scoreX.textContent = ++xScore;
        else
            scoreO.textContent = ++oScore;

        pattern.forEach(index => {

            cells[index].style.backgroundColor = "#90EE90";
            cells[index].style.transform = "scale(1.05)";

        });

    }
    else {

        drawScore.textContent = ++drawCount;

    }

}

function resetCells() {

    cells.forEach(cell => {

        cell.textContent = "";
        cell.className = "cell";
        cell.style.backgroundColor = "white";
        cell.style.transform = "scale(1)";

    });

}

function restartGame() {

    board.fill("");

    running = true;

    currentPlayer = "X";

    statusText.textContent = "Player X Turn";

    resetCells();

}

function newGame() {

    restartGame();

    xScore = 0;
    oScore = 0;
    drawCount = 0;

    scoreX.textContent = 0;
    scoreO.textContent = 0;
    drawScore.textContent = 0;

}

console.log("Tic Tac Toe Project Loaded Successfully");