// Define game variables
let moveCount = 0;
let timer = 0;
let timerInterval = null;
let emptyTile = { row: 4, col: 4 }; // Empty tile starts at the bottom-right

// Start the timer when the game begins
function startTimer() {
    if (timerInterval === null) {
        timerInterval = setInterval(() => {
            timer++;
            document.getElementById("timer").innerText = timer;
        }, 1000);
    }
}

// Reset game state
function resetGame() {
    moveCount = 0;
    timer = 0;
    clearInterval(timerInterval);
    timerInterval = null;
    document.getElementById("move-count").innerText = moveCount;
    document.getElementById("timer").innerText = timer;
}

// Swap two tiles visually
function swapTiles(cell1, cell2) {
    let tempClass = document.getElementById(cell1).className;
    document.getElementById(cell1).className = document.getElementById(cell2).className;
    document.getElementById(cell2).className = tempClass;
}

// Shuffle the board
function shuffle() {
    resetGame();
    startTimer();
    
    for (let i = 0; i < 100; i++) { // Random swaps to shuffle
        let direction = Math.floor(Math.random() * 4);
        let newRow = emptyTile.row;
        let newCol = emptyTile.col;
        
        if (direction === 0 && newRow > 1) newRow--;
        else if (direction === 1 && newRow < 4) newRow++;
        else if (direction === 2 && newCol > 1) newCol--;
        else if (direction === 3 && newCol < 4) newCol++;
        
        swapTiles(`cell${emptyTile.row}${emptyTile.col}`, `cell${newRow}${newCol}`);
        emptyTile = { row: newRow, col: newCol };
    }
}

// Handle tile click
function clickTile(row, col) {
    if (
        (row === emptyTile.row && Math.abs(col - emptyTile.col) === 1) ||
        (col === emptyTile.col && Math.abs(row - emptyTile.row) === 1)
    ) {
        swapTiles(`cell${row}${col}`, `cell${emptyTile.row}${emptyTile.col}`);
        emptyTile = { row, col };
        moveCount++;
        document.getElementById("move-count").innerText = moveCount;
        checkWin();
        startTimer();
    }
}

// Check if the game is won
function checkWin() {
    let correctOrder = [
        "tile1", "tile2", "tile3", "tile4",
        "tile5", "tile6", "tile7", "tile8",
        "tile9", "tile10", "tile11", "tile12",
        "tile13", "tile14", "tile15", "tile16"
    ];
    let currentTiles = [];
    for (let row = 1; row <= 4; row++) {
        for (let col = 1; col <= 4; col++) {
            currentTiles.push(document.getElementById(`cell${row}${col}`).className);
        }
    }
    if (JSON.stringify(currentTiles) === JSON.stringify(correctOrder)) {
        clearInterval(timerInterval);
        setTimeout(() => {
            if (confirm(`Congratulations! You won in ${moveCount} moves and ${timer} seconds.\nPlay again?`)) {
                shuffle();
            }
        }, 500);
    }
}

// Setup simple game mode
function simpleGame() {
    resetGame();
    let count = 1;
    for (let row = 1; row <= 4; row++) {
        for (let col = 1; col <= 4; col++) {
            let cell = document.getElementById(`cell${row}${col}`);
            cell.className = count === 16 ? "tile16" : `tile${count}`;
            count++;
        }
    }
    swapTiles("cell43", "cell44");
    emptyTile = { row: 4, col: 3 };
}
