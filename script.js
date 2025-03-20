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

    // Swap class names
    let tempClass = cell1.className;
    cell1.className = cell2.className;
    cell2.className = tempClass;

    // Update empty tile position
    emptyTile.row = row1;
    emptyTile.col = col1;

    // Increase move count
    moveCount++;
    document.getElementById("move-count").innerText = moveCount;

    checkWin();
}

// Scrambles the board using random swaps
function shuffle() {
    resetGame();
    startTimer();

    let tiles = [];
    for (let row = 1; row <= 4; row++) {
        for (let col = 1; col <= 4; col++) {
            tiles.push({ row, col });
        }
    }

    for (let i = tiles.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        let tileA = tiles[i];
        let tileB = tiles[j];

        swapTiles(tileA.row, tileA.col, tileB.row, tileB.col);
    }

    emptyTile = { row: 4, col: 4 }; // Reset empty tile position
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
            if (confirm(`Congratulations! You won in ${moveCount} moves and ${timer} seconds.\nDo you want to play again?`)) {
                shuffle();
            }
        }, 500);
    }
}

// Sets up a nearly solved board with only one move required
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

    // Swap last two tiles to make the puzzle solvable in one move
    let lastTile = document.getElementById("cell43").className;
    document.getElementById("cell43").className = "tile16"; // Make last tile empty
    document.getElementById("cell44").className = lastTile;

    // Update empty tile position
    emptyTile = { row: 4, col: 3 };

    // Ensure move count stays at 0
    document.getElementById("move-count").innerText = moveCount;
}
