const gameBoard = (() => {
  const cells = document.querySelectorAll(".cell");
  let squares = ["", "", "", "", "", "", "", "", ""];

  function mark(index, symbol) {
    squares[index] = symbol;
  }

  function renderBoard() {
    for (let i = 0; i < cells.length; i++) {
      if (cells[i].hasChildNodes()) {
        let newMark = document.createTextNode(`${squares[i]}`);
        cells[i].replaceChild(newMark, cells[i].firstChild);
      } else {
        let marked = document.createTextNode(`${squares[i]}`);
        cells[i].appendChild(marked);
      }
    }
  }

  function checkWinner() {
    let isThereWinner = false;
    let winner = undefined;
    // column check
    for (let i = 0; i < 3; i++) {
      if (
        squares[i] !== "" &&
        squares[i] === squares[i + 3] &&
        squares[i] === squares[i + 6]
      ) {
        isThereWinner = true;
        winner = squares[i];
      }
    }
    // row check
    for (let i = 0; i < 7; i += 3) {
      if (
        squares[i] !== "" &&
        squares[i] === squares[i + 1] &&
        squares[i] === squares[i + 2]
      ) {
        isThereWinner = true;
        winner = squares[i];
      }
    }
    // diagonal checks
    if (
      squares[0] !== "" &&
      squares[0] === squares[4] &&
      squares[0] === squares[8]
    ) {
      isThereWinner = true;
      winner = squares[0];
    }
    if (
      squares[2] !== "" &&
      squares[2] === squares[4] &&
      squares[2] === squares[6]
    ) {
      isThereWinner = true;
      winner = squares[2];
    }
    return { isThereWinner, winner };
  }

  function resetBoard() {
    for (let i = 0; i < squares.length; i++) {
      squares[i] = "";
    }
    renderBoard();
  }

  function isGameOver() {
    return !squares.includes("");
  }

  return { cells, mark, renderBoard, checkWinner, resetBoard, isGameOver };
})();

const player = (mark) => {
  return { mark };
};

const gamePlay = ((gameBoard) => {
  const result = document.querySelector(".result");
  const player1 = player("X");
  const player2 = player("O");
  let currentPlayer = player1;

  function gameFlow(e) {
    gameBoard.mark(
      Array.from(gameBoard.cells).indexOf(e.target),
      currentPlayer.mark
    );
    gameBoard.renderBoard();
    if (gameBoard.isGameOver() && !gameBoard.checkWinner().isThereWinner) {
      let resultText = document.createTextNode(`It's a tie!`);
      result.appendChild(resultText);
    }
    if (gameBoard.checkWinner().isThereWinner) {
      for (let i = 0; i < gameBoard.cells.length; i++) {
        gameBoard.cells[i].removeEventListener("click", gameFlow);
      }
      let resultText = document.createTextNode(
        `Player ${gameBoard.checkWinner().winner} wins!`
      );
      result.appendChild(resultText);
    } else {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      e.target.removeEventListener("click", gameFlow);
    }
  }

  function addEventsToCells() {
    for (let i = 0; i < gameBoard.cells.length; i++) {
      gameBoard.cells[i].addEventListener("click", gameFlow);
    }
  }

  function resetGame() {
    gameBoard.resetBoard();
    currentPlayer = player1;
    addEventsToCells();
    result.removeChild(result.firstChild);
  }

  addEventsToCells();

  document.querySelector(".reset").addEventListener("click", resetGame);

  return { resetGame };
})(gameBoard);

const menuHandler = (() => {
  const menu = document.querySelector(".menu");
  const overlay = document.querySelector(".overlay");
  const humanButton = document.querySelector(".human");
  const computerButton = document.querySelector(".computer");
  const backButton = document.querySelector(".back");
  const forthcoming = document.querySelector(".forthcoming");

  humanButton.addEventListener("click", () => {
    menu.classList.add("hidden");
    overlay.classList.add("hidden");
    forthcoming.classList.add("hidden");
  });

  backButton.addEventListener("click", () => {
    menu.classList.remove("hidden");
    overlay.classList.remove("hidden");
    forthcoming.classList.add("hidden");
    gamePlay.resetGame();
  });

  computerButton.addEventListener("click", () => {
    forthcoming.classList.remove("hidden");
  });
})();
