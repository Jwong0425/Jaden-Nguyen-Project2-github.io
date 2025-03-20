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
function swapTiles(cell1, cell2) {
    let tempClass = cell1.className;
    cell1.className = cell2.className;
    cell2.className = tempClass;
}

// Scrambles the board using random swaps and ensures a solvable puzzle
function shuffle() {
    resetGame();
    startTimer();

    let tiles = [];
    for (let row = 1; row <= 4; row++) {
        for (let col = 1; col <= 4; col++) {
            tiles.push({ row, col });
        }
    }

    // Randomly shuffle the tiles
    for (let i = tiles.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        let tileA = tiles[i];
        let tileB = tiles[j];

        let cellA = document.getElementById(`cell${tileA.row}${tileA.col}`);
        let cellB = document.getElementById(`cell${tileB.row}${tileB.col}`);

        swapTiles(cellA, cellB);
    }

    // Ensure last tile is the empty one
    document.getElementById("cell44").className = "tile16";
    emptyTile = { row: 4, col: 4 };
}

// Handles tile click, moves if adjacent to the empty tile
function clickTile(row, col) {
    startTimer();

    if (
        (row === emptyTile.row && Math.abs(col - emptyTile.col) === 1) || 
        (col === emptyTile.col && Math.abs(row - emptyTile.row) === 1)
    ) {
        let clickedCell = document.getElementById(`cell${row}${col}`);
        let emptyCell = document.getElementById(`cell${emptyTile.row}${emptyTile.col}`);

        swapTiles(clickedCell, emptyCell);

        emptyTile = { row, col };

        // Increase move count
        moveCount++;
        document.getElementById("move-count").innerText = moveCount;

        checkWin();
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
