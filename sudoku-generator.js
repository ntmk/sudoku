// Create 2d array filled with 0's
var grid = Array(9).fill(0).map(inner => Array(9).fill(0));

// Generated random array of values from 1 - 9
var available = availableNumbers();

// Difficulty values for number of cells to remove
const insane = 64 / 2;
const veryHard = 54 / 2;
const hard = 44 / 2;
const medium = 34 / 2;
const easy = 24 / 2;
const veryEasy = 14 / 2;

// Function to display 2d array in a correct / readable format
const displayGrid = (grid) => {
  for (let i = 0; i < grid[0].length; i++) {
    console.log(`+---+---+---+---+---+---+---+---+---+`);
    let row = '|';
    for ( let j = 0; j < grid.length; j++) {
      row += ` ${grid[j][i]} |`;
    }
    row + '|';
    console.log(row);
  }
  console.log(`+---+---+---+---+---+---+---+---+---+`);
};

// Generate random array of values from 1 - 9
function availableNumbers() {
  let numbers = [];
  while (numbers.length < 9) {
    let number = randomNum();
    if (numbers.includes(number)) {
      number = randomNum()
    } else {
      numbers.push(number);
    }
  }
  return numbers;
}

// Generate random number between 1 - 9
function randomNum() {
  return Math.floor(Math.random() * 9 + 1);
}

// Check each row for duplicates / valid number
function checkRow(number, y) {
  for (let x = 0; x < 9; x++) {
    if (grid[x][y] === number) {
      return true;
    }
  }
  return false;
}

// Check each column for duplicates / valid number
function checkCol(number, x) {
  for (let y = 0; y < 9; y++) {
    if ( grid[x][y] == number) {
      return true;
    }
  }
  return false;
}

// Check each 3x3 region for duplicates / valid number
function checkRegion(number, x, y) {
  let xReg = Math.floor(x / 3) * 3;
  let yReg = Math.floor(y / 3) * 3;
  for (let y = yReg; y < yReg + 3; y++) {
    for (let x = xReg; x < xReg + 3; x++) {
      if (grid[x][y] === number) {
        return true;
      }
    }
  }
  return false;
}

// Check for conflicts on the board
function checkConflict(number, x, y) {
  if (checkRow(number, y) || checkCol(number, x) || checkRegion(number, x, y)) {
    return true;
  }
  return false;
}

// Fill the initial puzzle
function fillGrid(values) {
  for (let y = 0; y < 9; y++) {
    let numbers = [...values];
    for (let x = 0; x < 9; x++) {
      let number = numbers.pop();
      if (!checkConflict(number, x, y)) {
        grid[x][y] = number;
      } else {
        numbers.unshift(number);
        x--;
      }
    }
  }
}

// Remove values based on difficulty
function removeValues(toRemove) {
  console.log(`Remaining values are ${81 - (2 * toRemove)}`)
  for (let i = 1; i <= toRemove; i++) {
    let rmx = randomNum()-1;
    let rmy = randomNum()-1;
    grid[rmx][rmy] = 0;
    grid[8-rmx][8-rmy] = 0
  }
}

fillGrid(available);
removeValues(veryHard);
// console.log(grid);
// displayGrid(grid);

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
console.log(boardSize)
let regionSize = boardSize / 3;
console.log(regionSize)
let cellSize = boardSize / 9;
console.log(cellSize)

// draw sqaures / cells
for (let i = 0; i < boardSize; i+=cellSize) {
  for (let j = 0; j < boardSize; j+=cellSize) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.font = 'bold 20px serif'
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (grid[Math.floor(i/cellSize)][Math.floor(j/cellSize)] !== 0) {
      ctx.fillText(grid[Math.floor(i/cellSize)][Math.floor(j/cellSize)], i+cellSize/2, j+cellSize/2);
    }
    ctx.strokeStyle = 'grey';
    ctx.rect(j, i, cellSize, cellSize);
    ctx.stroke();
  }
}

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

// canvas.addEventListener('pointerdown', (e) => {
//   console.log(e)
//   console.log(`x: ${Math.floor(e.layerX / 50)} y: ${Math.floor(e.layerY / 50)}`)
// })
