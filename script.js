let moveCount = 0;
let startTime = 0;
let timerInterval;

// Start game
function startGame() {
    moveCount = 0;
    document.getElementById("move-count").textContent = moveCount;
    document.getElementById("timer").textContent = "0";
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
    shuffle();

    // Add event listeners to each tile dynamically
    for (let i = 1; i <= 4; i++) {
        for (let j = 1; j <= 4; j++) {
            document.getElementById(`cell${i}${j}`).onclick = () => clickTile(i, j);
        }
    }
}

// Timer update function
function updateTimer() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById("timer").textContent = elapsedTime;
}

// Shuffle tiles
function shuffle() {
    const tiles = [];
    for (let i = 1; i <= 15; i++) {
        tiles.push(i);
    }
    tiles.push(null); // Empty space

    // Shuffle using Fisher-Yates algorithm
    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }

    // Apply shuffled tiles to the DOM
    for (let i = 1; i <= 4; i++) {
        for (let j = 1; j <= 4; j++) {
            const tileIndex = (i - 1) * 4 + j - 1;
            const tile = tiles[tileIndex];
            const cell = document.getElementById(`cell${i}${j}`);
            cell.className = tile === null ? "tile tile16" : `tile tile${tile}`;
        }
    }
}

// Tile click event
function clickTile(row, col) {
    const cell = document.getElementById(`cell${row}${col}`);
    if (cell.className.includes("tile16")) return; // Don't move the empty space

    // Find the empty tile and swap if adjacent
    const directions = [
        [row - 1, col], [row + 1, col], 
        [row, col - 1], [row, col + 1]
    ];

    for (const [r, c] of directions) {
        if (r >= 1 && r <= 4 && c >= 1 && c <= 4) {
            const adjacent = document.getElementById(`cell${r}${c}`);
            if (adjacent.className.includes("tile16")) {
                swapTiles(cell, adjacent);
                incrementMoveCount();
                setTimeout(checkWin, 1000);
                break;
            }
        }
    }
}

// Swap tiles
function swapTiles(cell1, cell2) {
    const tempClass = cell1.className;
    cell1.className = cell2.className;
    cell2.className = tempClass;
}

// Increment move count
function incrementMoveCount() {
    moveCount++;
    document.getElementById("move-count").textContent = moveCount;
}

// Check if the game is won
function checkWin() {
    let won = true;
    for (let i = 1; i <= 4; i++) {
        for (let j = 1; j <= 4; j++) {
            const tileNumber = (i - 1) * 4 + j;
            const cell = document.getElementById(`cell${i}${j}`);
            if (tileNumber !== 16 && !cell.className.includes(`tile${tileNumber}`)) {
                won = false;
                break;
            }
        }
    }

    if (won) {
        setTimeout(() => {
            alert(`Congratulations!!\nTime: ${document.getElementById("timer").textContent} sec\nMoves: ${moveCount}`);
            if (confirm("Do you want to play again?")) startGame();
        }, 1000);
    }
}

// Simple game mode
function simpleGame() {
    const simpleTiles = [
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, null, 15
    ];

    for (let i = 1; i <= 4; i++) {
        for (let j = 1; j <= 4; j++) {
            const tileIndex = (i - 1) * 4 + j - 1;
            const tile = simpleTiles[tileIndex];
            const cell = document.getElementById(`cell${i}${j}`);
            cell.className = tile === null ? "tile tile16" : `tile tile${tile}`;
        }
    }
    moveCount = 0;
    document.getElementById("move-count").textContent = moveCount;
    startTime = Date.now();
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
}

// Button event listeners
document.getElementById("new-game").addEventListener("click", startGame);
document.getElementById("simple-game").addEventListener("click", simpleGame);

// Run game when DOM is loaded
window.addEventListener("DOMContentLoaded", startGame);
