const cells = document.querySelectorAll(".cell");

let currentplayer = "X";
let gameActive = true;

const gameStatus = document.querySelector(".game--status");

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let finalState;
let gameState = ["", "", "", "", "", "", "", "", ""];

function select() {
    this.innerText = currentplayer;
    this.removeEventListener("click", select);
    let index = parseInt(this.dataset.cellindex);
    gameState[index] = currentplayer;
    if (check()) {
        gameStatus.innerText = currentplayer + " won!";
        changeColor();
      endGame();
    }
    else {
        if(gameActive)
            changePlayer();
    }

}


let changeColor = () => {
    for (let index = 0; index < finalState.length; index++) {
        const element = finalState[index];
        cells[element].style.color="red";
    }
}

let changePlayer = () => {
    currentplayer === "X" ? currentplayer = "O" : currentplayer = "X";
    gameStatus.innerText = currentplayer + "'s turn";
}

let check = () => {
    let count = 0;
      for (let index = 0; index < winningConditions.length; index++) {
        const element = winningConditions[index];
          let a = gameState[element[0]];
          let b = gameState[element[1]];
          let c = gameState[element[2]];
          if (a === '' || b === '' || c === '') count++;
          else if (a === b && b === c) {
              finalState = element;
              return true;
          }
      }
    if (count === 0) {
        gameStatus.innerText = "Tie";
        console.log("end");
        endGame();
    }
    return false;
}

cells.forEach((cell) => {
  cell.addEventListener("click",select);
});

let restart = () => {
  document.location.reload();
};

let endGame = () => {
    gameActive = false;
     cells.forEach((cell) => {
       cell.removeEventListener("click", select);
     });
}