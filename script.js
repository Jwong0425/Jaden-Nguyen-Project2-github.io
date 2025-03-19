let moveCount = 0;
let timer = 0;
let timerInterval = null;

function startTimer() {
    if (timerInterval === null) {
        timerInterval = setInterval(() => {
            timer++;
            document.getElementById("timer").innerText = timer;
        }, 1000);
    }
}

function resetGame() {
    moveCount = 0;
    timer = 0;
    clearInterval(timerInterval);
    timerInterval = null;
    document.getElementById("move-count").innerText = moveCount;
    document.getElementById("timer").innerText = timer;
}

function swapTiles(cell1, cell2) {
    let temp = document.getElementById(cell1).className;
    document.getElementById(cell1).className = document.getElementById(cell2).className;
    document.getElementById(cell2).className = temp;
    
    moveCount++;
    document.getElementById("move-count").innerText = moveCount;

    checkWin();
}

function shuffle() {
    resetGame();
    startTimer();
    let tiles = [];
    for (let row = 1; row <= 4; row++) {
        for (let column = 1; column <= 4; column++) {
            tiles.push("cell" + row + column);
        }
    }
    
    for (let i = tiles.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        swapTiles(tiles[i], tiles[j]);
    }
}

function clickTile(row, column) {
    startTimer();
    let cell = document.getElementById("cell" + row + column);
    let tile = cell.className;

    if (tile != "tile16") {
        if (column < 4 && document.getElementById("cell" + row + (column + 1)).className == "tile16") {
            swapTiles("cell" + row + column, "cell" + row + (column + 1));
            return;
        }
        if (column > 1 && document.getElementById("cell" + row + (column - 1)).className == "tile16") {
            swapTiles("cell" + row + column, "cell" + row + (column - 1));
            return;
        }
        if (row > 1 && document.getElementById("cell" + (row - 1) + column).className == "tile16") {
            swapTiles("cell" + row + column, "cell" + (row - 1) + column);
            return;
        }
        if (row < 4 && document.getElementById("cell" + (row + 1) + column).className == "tile16") {
            swapTiles("cell" + row + column, "cell" + (row + 1) + column);
            return;
        }
    }
}

function checkWin() {
    let winCondition = [
        "tile1", "tile2", "tile3", "tile4",
        "tile5", "tile6", "tile7", "tile8",
        "tile9", "tile10", "tile11", "tile12",
        "tile13", "tile14", "tile15", "tile16"
    ];

    let currentTiles = [];
    for (let row = 1; row <= 4; row++) {
        for (let column = 1; column <= 4; column++) {
            currentTiles.push(document.getElementById("cell" + row + column).className);
        }
    }

    if (JSON.stringify(winCondition) === JSON.stringify(currentTiles)) {
        clearInterval(timerInterval);
        setTimeout(() => {
            alert(`Congratulations! You won in ${moveCount} moves and ${timer} seconds.`);
            shuffle();
        }, 500);
    }
}

function simpleGame() {
    resetGame(); // Ensures a fresh start

    // Arrange tiles in correct order
    let count = 1;
    for (let row = 1; row <= 4; row++) {
        for (let column = 1; column <= 4; column++) {
            let cell = document.getElementById("cell" + row + column);
            cell.className = count === 16 ? "tile16" : "tile" + count; // Assigns tile classes correctly
            count++;
        }
    }

    // Swap last two tiles manually (without swapTiles to avoid move count increment)
    let tile43 = document.getElementById("cell43").className;
    let tile44 = document.getElementById("cell44").className;

    document.getElementById("cell43").className = tile44;
    document.getElementById("cell44").className = tile43;
