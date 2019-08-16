

let selected;

function highlightCell(x, y) {
  let cell = gameMap.puzzle[x][y];
  if (!cell.isSelected) {
    cell.isSelected = true;
    ctx.beginPath();
    ctx.fillStyle = 'rgba(34,182,216, 0.1)';
    ctx.fillRect(cell.posX, cell.posY, gameMap.cellSize, gameMap.cellSize);
    ctx.stroke();
  }
}

function resetCell(x, y) {
  let cell = gameMap.puzzle[x][y];
  cell.isSelected = false;
}



function highlightRow(y) {
  for (let i = 0; i < 9; i++) {
    let cell = gameMap.puzzle[i][y];
    if (cell.isSelected) {
      continue;
    }
    cell.isSelected = true;
    ctx.beginPath();
    ctx.fillStyle = 'rgba(34,182,216, 0.3)';
    ctx.fillRect(cell.posX, cell.posY, gameMap.cellSize, gameMap.cellSize);
    ctx.stroke();
  }
}

function resetRow(y) {
  for (let i = 0; i < 9; i++) {
    let cell = gameMap.puzzle[i][y];
    cell.isSelected = false;
  }
}

function highlightCol(x) {
  for (let i = 0; i < 9; i++) {
    let cell = gameMap.puzzle[x][i];
    if (cell.isSelected) {
      continue;
    }
    cell.isSelected = true;
    ctx.beginPath();
    ctx.fillStyle = 'rgba(34,182,216, 0.3)';
    ctx.fillRect(cell.posX, cell.posY, gameMap.cellSize, gameMap.cellSize);
    ctx.stroke();
  }
}

function resetCol(x) {
  for (let i = 0; i < 9; i++) {
    let cell = gameMap.puzzle[x][i];
    cell.isSelected = false;
  }
}

function highlightRegion(x, y) {
  let xReg = Math.floor(x / 3) * 3;
  let yReg = Math.floor(y / 3) * 3;
  for (let y = yReg; y < yReg + 3; y++) {
    for (let x = xReg; x < xReg + 3; x++) {
      let cell = gameMap.puzzle[x][y]
      if (cell.isSelected) {
        continue;
      }
      cell.isSelected = true;
      ctx.beginPath();
      ctx.fillStyle = 'rgba(34,182,216, 0.3)';
      ctx.fillRect(cell.posX, cell.posY, gameMap.cellSize, gameMap.cellSize);
      ctx.stroke();
    }
  }
}

function resetRegion(x, y) {
  let xReg = Math.floor(x / 3) * 3;
  let yReg = Math.floor(y / 3) * 3;
  for (let y = yReg; y < yReg + 3; y++) {
    for (let x = xReg; x < xReg + 3; x++) {
      let cell = gameMap.puzzle[x][y];
      cell.isSelected = false;
    }
  }
}

function fillInValue(selected, number) {
  selected.value = number
  if (!checkConflict(number, selected.x, selected.y)) {
    ctx.clearRect(selected.posX, selected.posY, gameMap.cellSize, gameMap.cellSize);
    drawBoard();
    highlightCell(selected.x, selected.y);
  } else {
    ctx.clearRect(selected.posX, selected.posY, gameMap.cellSize, gameMap.cellSize);
    drawBoard()
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,0,0, 0.2)';
    ctx.fillRect(selected.posX, selected.posY, gameMap.cellSize, gameMap.cellSize);
    ctx.stroke();
  }
}

let clicked = {
  previous: null,
  current: null
}

document.querySelectorAll('button').forEach(button => {
  button.addEventListener('pointerdown', (e) => {
    if (selected) {
      fillInValue(selected, e.target.value)
    }
  });
});

// FIXME: not working if cells clicked in same region
// use pointer down for mobile and mouse clicks
canvas.addEventListener('pointerdown', (e) => {
  let selectedX = Math.floor(e.layerX / gameMap.cellSize)
  let selectedY = Math.floor(e.layerY / gameMap.cellSize)
  selected = gameMap.puzzle[selectedX][selectedY];
  if (clicked.current === null || selected.x != clicked.current.x && selected.y != clicked.current.y) {
    clicked.previous = clicked.current;
    if (clicked.previous != null) {
      drawBoard()
      resetCell(clicked.previous.x, clicked.previous.y);
      resetRegion(clicked.previous.x, clicked.previous.y)
      resetRow(clicked.previous.y);
      resetCol(clicked.previous.x);
    }
  }
  clicked.current = selected;
  console.log(clicked)
  if (selected.value === 0) {
    ctx.clearRect(0, 0, gameMap.boardSize, gameMap.boardSize);
    drawBoard()
    highlightCell(selectedX, selectedY);
    highlightRegion(selectedX, selectedY)
    highlightRow(selectedY);
    highlightCol(selectedX);
  }
});