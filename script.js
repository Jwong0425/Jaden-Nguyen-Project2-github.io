let moveCount = 0;
let timer = 0;
let timerInterval = null;

function startTimer() {
    if (timerInterval === null) {
        timerInterval = setInterval(() => {
            timer++;
            document.getElement("timer").innerText = timer;
        }, 1000);
    }
}

function resetGame() {
    moveCount = 0;
    timer = 0;
    clearInterval(timerInterval);
    timerInterval = null;
    document.getElement("move-count").innerText = moveCount;
    document.getElement("timer").innerText = timer;
}

function swapTiles(cell1, cell2) {
    let temp = document.getElement(cell1).className;
    document.getElement(cell1).className = document.getElement(cell2).className;
    document.getElement(cell2).className = temp;
    
    moveCount++;
    document.getElement("move-count").innerText = moveCount;

    checkWin();
}

function shuffle() {
    resetGame();
    startTimer();
    for (let row = 1; row <= 4; row++) {
        for (let column = 1; column <= 4; column++) {
            let row2 = Math.floor(Math.random() * 4 + 1);
            let column2 = Math.floor(Math.random() * 4 + 1);
            
            let temp = document.getElement("cell" + row + column).className;
            document.getElement("cell" + row + column).className = document.getElement("cell" + row2 + column2).className;
            document.getElement("cell" + row2 + column2).className = temp;
        }
    }
}

function clickTile(row, column) {
    startTimer();
    let cell = document.getElement("cell" + row + column);
    let tile = cell.className;

    if (tile != "tile16") {
        if (column < 4 && document.getElement("cell" + row + (column + 1)).className == "tile16") {
            swapTiles("cell" + row + column, "cell" + row + (column + 1));
            return;
        }
        if (column > 1 && document.getElement("cell" + row + (column - 1)).className == "tile16") {
            swapTiles("cell" + row + column, "cell" + row + (column - 1));
            return;
        }
        if (row > 1 && document.getElement("cell" + (row - 1) + column).className == "tile16") {
            swapTiles("cell" + row + column, "cell" + (row - 1) + column);
            return;
        }
        if (row < 4 && document.getElement("cell" + (row + 1) + column).className == "tile16") {
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
            currentTiles.push(document.getElement("cell" + row + column).className);
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
    shuffle();
    swapTiles("cell44", "cell43");
}
