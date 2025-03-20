let moveCount = 0;
let timer = 0;
let timerInterval = null;
let emptyTile = { row: 4, col: 4 }; // Empty tile starts at the bottom-right

// Start the game timer
function startTimer() {
    if (timerInterval === null) {
        timerInterval = setInterval(() => {
            timer++;
            document.getElementById("timer").innerText = timer;
        }, 1000);
    }
}

// Reset game stats
function resetGame() {
    moveCount = 0;
    timer = 0;
    clearInterval(timerInterval);
    timerInterval = null;
    document.getElementById("move-count").innerText = moveCount;
    document.getElementById("timer").innerText = timer;
}

// Move a tile into the empty space
function moveTile(row, col) {
    // Only allow moves if the tile is adjacent to the empty space
    if (
        (row === emptyTile.row && Math.abs(col - emptyTile.col) === 1) || 
        (col === emptyTile.col && Math.abs(row - emptyTile.row) === 1)
    ) {
        let clickedCell = document.getElementById(`cell${row}${col}`);
        let emptyCell = document.getElementById(`cell${emptyTile.row}${emptyTile.col}`);

        // Move the clicked tile into the empty space
        emptyCell.innerText = clickedCell.innerText;
        emptyCell.className = clickedCell.className;

        // Clear the clicked tile (now empty)
        clickedCell.innerText = "";
        clickedCell.className = "tile16";

        // Update empty tile position
        emptyTile = { row, col };

        // Increase move count
        moveCount++;
        document.getElementById("move-count").innerText = moveCount;

        // Check if the game is won
        checkWin();
    }
}

// Shuffle the board while ensuring it's solvable
function shuffle() {
    resetGame();
    startTimer();

    let numbers = [...Array(15).keys()].map(x => x + 1); // Generate numbers 1-15
    numbers = numbers.sort(() => Math.random() - 0.5); // Randomize the numbers

    let count = 0;
    for (let row = 1; row <= 4; row++) {
        for (let col = 1; col <= 4; col++) {
            let cell = document.getElementById(`cell${row}${col}`);
            if (count < 15) {
                cell.innerText = numbers[count];
                cell.className = `tile${numbers[count]}`;
                count++;
            } else {
                cell.innerText = "";
                cell.className = "tile16"; // Empty tile
                emptyTile = { row, col };
            }
        }
    }
}

// Set up a nearly solved puzzle for one-move win
function simpleGame() {
    resetGame();

    let count = 1;
    for (let row = 1; row <= 4; row++) {
        for (let col = 1; col <= 4; col++) {
            let cell = document.getElementById(`cell${row}${col}`);
            if (count < 16) {
                cell.innerText = count;
                cell.className = `tile${count}`;
                count++;
            } else {
                cell.innerText = "";
                cell.className = "tile16";
            }
        }
    }

    // Swap last two tiles to create a one-move win condition
    let lastTile = document.getElementById("cell43").innerText;
    document.getElementById("cell43").innerText = "";
    document.getElementById("cell43").className = "tile16";
    document.getElementById("cell44").innerText = lastTile;
    document.getElementById("cell44").className = `tile${lastTile}`;

    // Update empty tile position
    emptyTile = { row: 4, col: 3 };
}

// Check if the board is in order (Win Condition)
function checkWin() {
    let correct = 1;
    for (let row = 1; row <= 4; row++) {
        for (let col = 1; col <= 4; col++) {
            let cell = document.getElementById(`cell${row}${col}`);
            if (row === 4 && col === 4) {
                if (cell.innerText !== "") return false;
            } else {
                if (cell.innerText != correct) return false;
                correct++;
            }
        }
    }

    clearInterval(timerInterval);
    setTimeout(() => {
        if (confirm(`🎉 You won in ${moveCount} moves and ${timer} seconds! Play again?`)) {
            shuffle();
        }
    }, 500);
}

// Event listeners for tiles
document.addEventListener("DOMContentLoaded", () => {
    for (let row = 1; row <= 4; row++) {
        for (let col = 1; col <= 4; col++) {
            document.getElementById(`cell${row}${col}`).addEventListener("click", () => moveTile(row, col));
        }
    }
    shuffle();
});
