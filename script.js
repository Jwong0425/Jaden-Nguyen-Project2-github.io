let moveCount = 0;
let timer = 0;
let timerInterval = null;
let emptyTile = { row: 4, col: 4 }; // Empty tile starts at the bottom-right

// Starts the timer when the game begins
function startTimer() {
    if (timerInterval === null) {
        timerInterval = setInterval(() => {
            timer++;
            document.getElementById("timer").innerText = timer;
        }, 1000);
    }
}

// Resets move count, timer, and stops interval
function resetGame() {
    moveCount = 0;
    timer = 0;
    clearInterval(timerInterval);
    timerInterval = null;
    document.getElementById("move-count").innerText = moveCount;
    document.getElementById("timer").innerText = timer;
}

// Swaps two tiles visually and updates their class names
function swapTiles(row1, col1, row2, col2) {
    let cell1 = document.getElementById(`cell${row1}${col1}`);
    let cell2 = document.getElementById(`cell${row2}${col2}`);

    // Swap inner text (or numbers)
    let tempText = cell1.innerText;
    cell1.innerText = cell2.innerText;
    cell2.innerText = tempText;

    // Update empty tile position
    emptyTile.row = row1;
    emptyTile.col = col1;

    // Increase move count
    moveCount++;
    document.getElementById("move-count").innerText = moveCount;

    checkWin();
}

// Scrambles the board using valid random moves
function shuffle() {
    resetGame();
    startTimer();

    let moves = 100;
    let directions = [
        { row: -1, col: 0 }, // Up
        { row: 1, col: 0 },  // Down
        { row: 0, col: -1 }, // Left
        { row: 0, col: 1 }   // Right
    ];

    for (let i = 0; i < moves; i++) {
        let validMoves = directions.filter(dir => {
            let newRow = emptyTile.row + dir.row;
            let newCol = emptyTile.col + dir.col;
            return newRow >= 1 && newRow <= 4 && newCol >= 1 && newCol <= 4;
        });

        let move = validMoves[Math.floor(Math.random() * validMoves.length)];
        swapTiles(emptyTile.row + move.row, emptyTile.col + move.col, emptyTile.row, emptyTile.col);
    }

    emptyTile = { row: 4, col: 4 };
}

// Handles tile click, moves if adjacent to the empty tile
function clickTile(row, col) {
    startTimer();

    if (
        (row === emptyTile.row && Math.abs(col - emptyTile.col) === 1) || 
        (col === emptyTile.col && Math.abs(row - emptyTile.row) === 1)
    ) {
        swapTiles(row, col, emptyTile.row, emptyTile.col);
    }
}

// Checks if the board is in winning order
function checkWin() {
    let count = 1;
    for (let row = 1; row <= 4; row++) {
        for (let col = 1; col <= 4; col++) {
            let cell = document.getElementById(`cell${row}${col}`);
            if (cell.innerText != count && count != 16) {
                return;
            }
            count++;
        }
    }

    clearInterval(timerInterval);
    setTimeout(() => {
        if (confirm(`Congratulations! You won in ${moveCount} moves and ${timer} seconds.\nDo you want to play again?`)) {
            shuffle();
        }
    }, 500);
}

// Sets up a nearly solved board with only one move required
function simpleGame() {
    resetGame();

    let count = 1;
    for (let row = 1; row <= 4; row++) {
        for (let col = 1; col <= 4; col++) {
            let cell = document.getElementById(`cell${row}${col}`);
            cell.innerText = count === 16 ? "" : count;
            count++;
        }
    }

    // Swap last two tiles to make the puzzle solvable in one move
    let lastTile = document.getElementById("cell43").innerText;
    document.getElementById("cell43").innerText = "";
    document.getElementById("cell44").innerText = lastTile;

    emptyTile = { row: 4, col: 3 };
}
