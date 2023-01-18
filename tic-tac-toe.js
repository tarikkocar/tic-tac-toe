let gameboard = [
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
const playground = document.querySelector(".playground");
const cells = document.querySelectorAll(".cell");

function renderGameboard(gameboard) {
  for (let i = 0; i < gameboard.length; i++) {
    if (gameboard[i] !== undefined && cells[i].innerHTML === "") {
      let mark = document.createTextNode(`${gameboard[i]}`);
      cells[i].appendChild(mark);
    }
  }
}

renderGameboard(gameboard);

function markX(e) {
  gameboard[Array.from(cells).indexOf(e.target)] = "X";
  renderGameboard(gameboard);
  turn = "O";
}

function markO(e) {
  gameboard[Array.from(cells).indexOf(e.target)] = "O";
  renderGameboard(gameboard);
  turn = "X";
}
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", function (e) {
    if (turn === "X") {
      markX(e);
    } else {
      markO(e);
    }
  });
}
