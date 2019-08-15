// set the canvas size based on available width 
function getBoardSize() {
  if (window.innerHeight < 450) {
    return window.innerHeight;
  } else if (window.innerWidth < 450) {
    return window.innerWidth
  } else {
    return 450;
  }
}

const boardSize = getBoardSize();

let gameMap = {
  boardSize: boardSize,
  regionSize: boardSize / 3,
  cellSize: boardSize / 9,
  puzzle: []
}

for (let i = 0; i < gameMap.boardSize; i+=gameMap.cellSize) {
  let row = [];
  for (let j = 0; j < gameMap.boardSize; j+=gameMap.cellSize) {
    let cell = {
      x: Math.floor(i/gameMap.cellSize),
      y: Math.floor(j/gameMap.cellSize),
      posX: i,
      posY: j,
      value: grid[Math.floor(i/gameMap.cellSize)][Math.floor(j/gameMap.cellSize)],
      isSelected: false,
    }
    row.push(cell);
  }
  gameMap.puzzle.push(row);
}
