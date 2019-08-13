// use pointer down for mobile and mouse clicks
canvas.addEventListener('pointerdown', (e) => {
  console.log(e)
  let selectedX = Math.floor(e.layerX / gameMap.cellSize)
  let selectedY = Math.floor(e.layerY / gameMap.cellSize)
  selected = gameMap.puzzle[selectedX][selectedY];
  highlightCell(selectedX, selectedY);
  highlightRow(selectedY);
  // highlightCol(selectedX);
  // highlightRegion(selectedX, selectedY)
  console.log(`x: ${selectedX} y: ${selectedY}`)
});

let selected;

function highlightCell(x, y) {
  let cell = gameMap.puzzle[x][y];
  ctx.beginPath();
  ctx.fillStyle = 'rgba(34,182,216, 0.1)';
  ctx.fillRect(cell.posX, cell.posY, gameMap.cellSize, gameMap.cellSize);
  ctx.stroke();
}

function highlightRow(y) {
  for (let i = 0; i < 9; i++) {
    
    let cell = gameMap.puzzle[i][y];
   
    ctx.beginPath();
    ctx.fillStyle = 'rgba(34,182,216, 0.3)';
    ctx.fillRect(cell.posX, cell.posY, gameMap.cellSize, gameMap.cellSize);
    ctx.stroke();
  }
}

function highlightCol(x) {
  for (let i = 0; i < 9; i++) {
    let cell = gameMap.puzzle[x][i];
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
    console.log(e.target.value);
    number = e.target.value
    if (selected) {
      fillInValue(selected, number)
    }
  });
});

function fillInValue(selected, number) {
  selected.value = number
  draw()
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