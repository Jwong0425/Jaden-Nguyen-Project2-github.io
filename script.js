let moveCount = 0; // Number of moves
let startTime = 0; // Start time for the game
let timerInterval; // Timer interval

// Initialize the game
function startGame() {
    moveCount = 0;
    document.getElementById("move-count").textContent = moveCount;
    document.getElementById("timer").textContent = "0";
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
    shuffle();
}

// Update the timer every second
function updateTimer() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById("timer").textContent = elapsedTime;
}

// Shuffle the tiles to start a new game
function shuffle() {
    const tiles = [];
    for (let i = 1; i <= 15; i++) {
        tiles.push(i);
    }
    tiles.push(null); // Empty space

    // Shuffle the tiles randomly
    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }

    // Apply the shuffled tiles to the DOM
    for (let i = 1; i <= 4; i++) {
        for (let j = 1; j <= 4; j++) {
            const tileIndex = (i - 1) * 4 + j - 1;
            const tile = tiles[tileIndex];
            const cell = document.getElementById(`cell${i}${j}`);
            if (tile === null) {
                cell.className = "tile16"; // Empty tile
            } else {
                cell.className = `tile${tile}`;
            }
        }
    }
}

// Click a tile to move it
function clickTile(row, col) {
    const cell = document.getElementById(`cell${row}${col}`);
    const tile = cell.className;

    if (tile !== "tile16") { // Don't move if it's the empty space
        // Check adjacent tiles to swap with the empty space
        if (row < 4 && document.getElementById(`cell${row + 1}${col}`).className === "tile16") {
            swapTiles(`cell${row}${col}`, `cell${row + 1}${col}`);
            incrementMoveCount();
            setTimeout(() => { checkWin(); }, 1000);
            return;
        }
        if (row > 1 && document.getElementById(`cell${row - 1}${col}`).className === "tile16") {
            swapTiles(`cell${row}${col}`, `cell${row - 1}${col}`);
            incrementMoveCount();
            setTimeout(() => { checkWin(); }, 1000);
            return;
        }
        if (col < 4 && document.getElementById(`cell${row}${col + 1}`).className === "tile16") {
            swapTiles(`cell${row}${col}`, `cell${row}${col + 1}`);
            incrementMoveCount();
            setTimeout(() => { checkWin(); }, 1000);
            return;
        }
        if (col > 1 && document.getElementById(`cell${row}${col - 1}`).className === "tile16") {
            swapTiles(`cell${row}${col}`, `cell${row}${col - 1}`);
            incrementMoveCount();
            setTimeout(() => { checkWin(); }, 1000);
            return;
        }
    }
}

// Swap tiles in the DOM
function swapTiles(cell1Id, cell2Id) {
    const cell1 = document.getElementById(cell1Id);
    const cell2 = document.getElementById(cell2Id);
    const tempClass = cell1.className;
    cell1.className = cell2.className;
    cell2.className = tempClass;
}

// Increment the move count
function incrementMoveCount() {
    moveCount++;
    document.getElementById("move-count").textContent = moveCount;
}

// Check if the user has won the game
function checkWin() {
    let won = true;
    for (let i = 1; i <= 4; i++) {
        for (let j = 1; j <= 4; j++) {
            const tileNumber = (i - 1) * 4 + j;
            const cell = document.getElementById(`cell${i}${j}`);
            if (tileNumber !== 16 && cell.className !== `tile${tileNumber}`) {
                won = false;
                break;
            }
        }
    }

    if (won) {
        setTimeout(() => {
            alert(`Congratulations!!\nTime: ${document.getElementById("timer").textContent} seconds\nMoves: ${moveCount}\nWould you like to play again?`);
            if (confirm("Do you want to play again?")) {
                startGame();
            }
        }, 1000); // Delay the win message
    }
}

// Start a simple game with only one tile out of position
function simpleGame() {
    // Simple game: Only one tile out of place
    const simpleTiles = [
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, 15, null
    ];

    // Apply the simple game setup
    for (let i = 1; i <= 4; i++) {
        for (let j = 1; j <= 4; j++) {
            const tileIndex = (i - 1) * 4 + j - 1;
            const tile = simpleTiles[tileIndex];
            const cell = document.getElementById(`cell${i}${j}`);
            if (tile === null) {
                cell.className = "tile16";
            } else {
                cell.className = `tile${tile}`;
            }
        }
    }
    startGame();
}

// Initialize buttons and events
document.getElementById("new-game").addEventListener("click", startGame);
document.getElementById("simple-game").addEventListener("click", simpleGame);

// Add click event listeners to each tile
for (let i = 1; i <= 4; i++) {
    for (let j = 1; j <= 4; j++) {
        document.getElementById(`cell${i}${j}`).addEventListener("click", () => clickTile(i, j));
}

// Start the game on page load
window.onload = startGame;
