const gameBoard = (() => {
  const cells = document.querySelectorAll(".cell");
  let squares = ["", "", "", "", "", "", "", "", ""];

  function mark(index, symbol) {
    squares[index] = symbol;
  }

  // function renderBoard() {
  //   for (let i = 0; i < squares.length; i++) {
  //     if (squares[i] !== "" && cells[i].innerHTML === "") {
  //       let marked = document.createTextNode(`${squares[i]}`);
  //       cells[i].appendChild(marked);
  //     }
  //   }
  // }

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
    // column check
    for (let i = 0; i < 3; i++) {
      if (
        squares[i] !== "" &&
        squares[i] === squares[i + 3] &&
        squares[i] === squares[i + 6]
      ) {
        return true;
      }
    }
    // row check
    for (let i = 0; i < 7; i += 3) {
      if (
        squares[i] !== "" &&
        squares[i] === squares[i + 1] &&
        squares[i] === squares[i + 2]
      ) {
        return true;
      }
    }
    // diagonal checks
    if (
      squares[0] !== "" &&
      squares[0] === squares[4] &&
      squares[0] === squares[8]
    ) {
      return true;
    }
    if (
      squares[2] !== "" &&
      squares[2] === squares[4] &&
      squares[2] === squares[6]
    ) {
      return true;
    }
    return false;
  }

  function resetBoard() {
    for (let i = 0; i < squares.length; i++) {
      squares[i] = "";
    }
    renderBoard();
  }

  return { cells, mark, renderBoard, checkWinner, resetBoard };
})();

const gamePlay = ((gameBoard) => {
  let turn = "X";

  function gameFlow(e) {
    if (turn === "X") {
      gameBoard.mark(Array.from(gameBoard.cells).indexOf(e.target), "X");
      gameBoard.renderBoard();
      if (gameBoard.checkWinner()) {
        for (let i = 0; i < gameBoard.cells.length; i++) {
          gameBoard.cells[i].removeEventListener("click", gameFlow);
        }
      } else {
        turn = "O";
        e.target.removeEventListener("click", gameFlow);
      }
    } else {
      gameBoard.mark(Array.from(gameBoard.cells).indexOf(e.target), "O");
      gameBoard.renderBoard();
      if (gameBoard.checkWinner()) {
        for (let i = 0; i < gameBoard.cells.length; i++) {
          gameBoard.cells[i].removeEventListener("click", gameFlow);
        }
      } else {
        turn = "X";
        e.target.removeEventListener("click", gameFlow);
      }
    }
  }

  function addEventsToCells() {
    for (let i = 0; i < gameBoard.cells.length; i++) {
      gameBoard.cells[i].addEventListener("click", gameFlow);
    }
  }

  addEventsToCells();

  document.querySelector(".reset").addEventListener("click", () => {
    gameBoard.resetBoard(), addEventsToCells();
  });
})(gameBoard);
