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
    for (let row = 1; row <= 4; row++) {
        for (let column = 1; column <= 4; column++) {
            let row2 = Math.floor(Math.random() * 4 + 1);
            let column2 = Math.floor(Math.random() * 4 + 1);
            
            let temp = document.getElementById("cell" + row + column).className;
            document.getElementById("cell" + row + column).className = document.getElementById("cell" + row2 + column2).className;
            document.getElementById("cell" + row2 + column2).className = temp;
        }
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
    resetGame();
    startTimer();
    
    let num = 1;
    for (let row = 1; row <= 4; row++) {
        for (let column = 1; column <= 4; column++) {
            let cell = document.getElementById("cell" + row + column);
            if (num <= 15) {
                cell.className = "tile" + num;
            } else {
                cell.className = "tile16";
            }
            num++;
        }
    }
    
    swapTiles("cell43", "cell44");
}
