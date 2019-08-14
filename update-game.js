// use pointer down for mobile and mouse clicks
let curr = {};
canvas.addEventListener('pointerdown', (e) => {
  let selectedX = Math.floor(e.layerX / gameMap.cellSize)
  let selectedY = Math.floor(e.layerY / gameMap.cellSize)
  selected = gameMap.puzzle[selectedX][selectedY];
  highlightCell(selectedX, selectedY);
  highlightRegion(selectedX, selectedY)
  highlightRow(selectedY);
  highlightCol(selectedX);
});

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

let number;

document.querySelectorAll('button').forEach(button => {
  button.addEventListener('pointerdown', (e) => {
    number = e.target.value
    if (selected) {
      fillInValue(selected, number)
    }
  });
});

function fillInValue(selected, number) {
  selected.value = number
  // draw()
  if (!checkConflict(number, selected.x, selected.y)) {
    ctx.clearRect(selected.posX, selected.posY, gameMap.cellSize, gameMap.cellSize);
    draw();
    highlightCell(selected.x, selected.y);
  } else {
    ctx.clearRect(selected.posX, selected.posY, gameMap.cellSize, gameMap.cellSize);
    draw()
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,0,0, 0.2)';
    ctx.fillRect(selected.posX, selected.posY, gameMap.cellSize, gameMap.cellSize);
    ctx.stroke();
  }
}