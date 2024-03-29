const wrapper = document.getElementById('canvas-wrapper');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
wrapper.appendChild(canvas);

canvas.width = canvas.height = gameMap.boardSize;

function drawCells () {
  for (let i = 0; i < gameMap.boardSize; i+=gameMap.cellSize) {
    for (let j = 0; j < gameMap.boardSize; j+=gameMap.cellSize) {
      let cell = gameMap.puzzle[Math.floor(i/gameMap.cellSize)][Math.floor(j/gameMap.cellSize)]
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.font = 'bold 150% serif'
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      if (gameMap.puzzle[cell.x][cell.y].value !== 0) {
        ctx.fillStyle = 'black'
        ctx.fillText(gameMap.puzzle[cell.x][cell.y].value, i+gameMap.cellSize/2, j+gameMap.cellSize/2);
      }
      ctx.strokeStyle = 'grey';
      ctx.rect(j, i, gameMap.cellSize, gameMap.cellSize);
      ctx.stroke();
    }
  }
}

function drawRegion() {
  for (let i = 0; i < gameMap.boardSize; i+=gameMap.regionSize) {
    for (let j = 0; j < gameMap.boardSize; j+=gameMap.regionSize) {
      ctx.beginPath();
      ctx.lineWidth = 4;
      ctx.strokeStyle = "black";
      ctx.rect(j,i, gameMap.regionSize, gameMap.regionSize);
      ctx.stroke();
    }
  }
}

function drawBorder(){
  ctx.beginPath()
  ctx.lineWidth = 8;
  ctx.strokeStyle = 'black';
  ctx.rect(0, 0, gameMap.boardSize, gameMap.boardSize);
  ctx.stroke();
}

function drawBoard() {
  drawCells();
  drawRegion();
  drawBorder();
}

drawBoard();