const gameBoard = (() => {
  const cells = document.querySelectorAll(".cell");
  let squares = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ];
  let turn = "X";

  function mark(e) {
    if (turn === "X") {
      squares[Array.from(cells).indexOf(e.target)] = "X";
      renderGameBoard(squares);
      if (checkWinner()) {
        for (let i = 0; i < cells.length; i++) {
          cells[i].removeEventListener("click", mark);
        }
      } else {
        turn = "O";
        e.target.removeEventListener("click", mark);
      }
    } else {
      squares[Array.from(cells).indexOf(e.target)] = "O";
      renderGameBoard(squares);
      if (checkWinner()) {
        for (let i = 0; i < cells.length; i++) {
          cells[i].removeEventListener("click", mark);
        }
      } else {
        turn = "X";
        e.target.removeEventListener("click", mark);
      }
    }
  }

  function renderGameBoard(squares) {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] !== undefined && cells[i].innerHTML === "") {
        let mark = document.createTextNode(`${squares[i]}`);
        cells[i].appendChild(mark);
      }
    }
  }

  function checkWinner() {
    // column check
    for (let i = 0; i < 3; i++) {
      if (
        gameBoard.squares[i] !== undefined &&
        gameBoard.squares[i] === gameBoard.squares[i + 3] &&
        gameBoard.squares[i] === gameBoard.squares[i + 6]
      ) {
        return true;
      }
    }
    // row check
    for (let i = 0; i < 7; i += 3) {
      if (
        gameBoard.squares[i] !== undefined &&
        gameBoard.squares[i] === gameBoard.squares[i + 1] &&
        gameBoard.squares[i] === gameBoard.squares[i + 2]
      ) {
        return true;
      }
    }
    // diagonal checks
    if (
      gameBoard.squares[0] !== undefined &&
      gameBoard.squares[0] === gameBoard.squares[4] &&
      gameBoard.squares[0] === gameBoard.squares[8]
    ) {
      return true;
    }
    if (
      gameBoard.squares[2] !== undefined &&
      gameBoard.squares[2] === gameBoard.squares[4] &&
      gameBoard.squares[2] === gameBoard.squares[6]
    ) {
      return true;
    }
    return false;
  }

  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", mark);
  }

  return { squares, turn, mark };
})();

// const player = (name, marker) => {
//   return { name, marker };
// };

const gamePlay = (() => {
  // const player1 = player("Player 1", "X");
  // const player2 = player("Player 2", "O");
})();
