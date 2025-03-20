let moveCount = 0;
let timer = 0;
let timerInterval = null;
let emptyTile = { row: 4, col: 4 }; // The empty tile starts at the bottom right

// Start the game timer
function startTimer() {
    if (!timerInterval) {
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
    if (
        (row === emptyTile.row && Math.abs(col - emptyTile.col) === 1) ||
        (col === emptyTile.col && Math.abs(row - emptyTile.row) === 1)
    ) {
        let clickedCell = document.getElementById(`cell${row}${col}`);
        let emptyCell = document.getElementById(`cell${emptyTile.row}${emptyTile.col}`);

        emptyCell.innerHTML = clickedCell.innerHTML;
        emptyCell.className = clickedCell.className;

        clickedCell.innerHTML = "";
        clickedCell.className = "tile16";

        emptyTile = { row, col };

        moveCount++;
        document.getElementById("move-count").innerText = moveCount;

        checkWin();
    }
}

// Shuffle tiles without changing numbers
function shuffle() {
    resetGame();
    startTimer();

    let tiles = [];
    for (let row = 1; row <= 4; row++) {
        for (let col = 1; col <= 4; col++) {
            let cell = document.getElementById(`cell${row}${col}`);
            if (cell.className !== "tile16") {
                tiles.push(cell);
            }
        }
    }

    do {
        tiles.sort(() => Math.random() - 0.5);
    } while (!isSolvable(tiles.map(tile => parseInt(tile.innerText))));

    let index = 0;
    for (let row = 1; row <= 4; row++) {
        for (let col = 1; col <= 4; col++) {
            let cell = document.getElementById(`cell${row}${col}`);
            if (index < tiles.length) {
                cell.innerHTML = tiles[index].innerHTML;
                cell.className = tiles[index].className;
                index++;
            } else {
                cell.innerHTML = "";
                cell.className = "tile16";
                emptyTile = { row, col };
            }
        }
    }
}

function isSolvable(arr) {
    let invCount = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) invCount++;
        }
    }
    return invCount % 2 === 0;
}

function checkWin() {
    let correct = 1;
    for (let row = 1; row <= 4; row++) {
        for (let col = 1; col <= 4; col++) {
            let cell = document.getElementById(`cell${row}${col}`);
            if (row === 4 && col === 4) {
                if (cell.innerHTML !== "") return false;
            } else {
                if (parseInt(cell.innerText) !== correct) return false;
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

document.addEventListener("DOMContentLoaded", () => {
    for (let row = 1; row <= 4; row++) {
        for (let col = 1; col <= 4; col++) {
            document.getElementById(`cell${row}${col}`).addEventListener("click", () => moveTile(row, col));
        }
    }
    shuffle();
});
