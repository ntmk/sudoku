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
    // console.log(x, y)
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
  if (checkRegion(number, x, y) || checkRow(number, y) || checkCol(number, x)) {
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
removeValues(insane);
console.log(grid)
// displayGrid(grid);