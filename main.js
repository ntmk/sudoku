// setup canvas references / add to page
let wrapper = document.getElementById('canvas-wrapper');
let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
wrapper.appendChild(canvas);

// set the canvas size based on available width 
let boardSize;
if (window.innerHeight < 450) {
  boardSize = window.innerHeight;
} else if (window.innerWidth < 450) {
  boardSize = window.innerWidth
} else {
  boardSize = 450;
}
canvas.width = canvas.height = boardSize;
let regionSize = boardSize / 3;
let cellSize = boardSize / 9;

let gameMap = {
  puzzle: []
}



// draw sqaures / cells
for (let i = 0; i < boardSize; i+=cellSize) {
  let row = [];
  for (let j = 0; j < boardSize; j+=cellSize) {
    let cell = {
      x: Math.floor(i/cellSize),
      y: Math.floor(j/cellSize),
      posX: i,
      posY: j,
      value: grid[Math.floor(i/cellSize)][Math.floor(j/cellSize)],
      isSelected: false,
    }
    row.push(cell);
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.font = 'bold 20px serif'
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (grid[Math.floor(i/cellSize)][Math.floor(j/cellSize)] !== 0) {
      ctx.fillText(cell.value, i+cellSize/2, j+cellSize/2);
    }
    ctx.strokeStyle = 'grey';
    ctx.rect(j, i, cellSize, cellSize);
    ctx.stroke();
  }
  gameMap.puzzle.push(row);
}

console.log(gameMap)
// draw border
ctx.beginPath()
ctx.lineWidth = 8;
ctx.strokeStyle = 'black';
ctx.rect(0, 0, boardSize, boardSize);
ctx.stroke();

// // draw regions
for (let i = 0; i < boardSize; i+=regionSize) {
  for (let j = 0; j < boardSize; j+=regionSize) {
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "black";
    ctx.rect(j,i, regionSize, regionSize);
    ctx.stroke();
  }
}

function showSelected(x, y) {
  let cell = gameMap.puzzle[x][y]
  
  console.log(cell)
  if (!cell.isSelected) {
    cell.isSelected = true
    ctx.beginPath();
    ctx.fillStyle = 'rgba(34,182,216, 0.3)';
    ctx.fillRect(cell.posX, cell.posY, cellSize, cellSize);
    ctx.stroke();
  } else {
    // ctx.beginPath();
    // ctx.fillStyle = 'rgba(0,0,0, 0.1)';
    // ctx.fillRect(cell.posX, cell.posY, cellSize, cellSize);
    // ctx.stroke();
  }
}

// use pointer down for mobile and mouse clicks
canvas.addEventListener('pointerdown', (e) => {
  console.log(e)
  let selectedX = Math.floor(e.layerX / cellSize)
  let selectedY = Math.floor(e.layerY / cellSize)
  showSelected(selectedX, selectedY)
  console.log(`x: ${selectedX} y: ${selectedY}`)
});

