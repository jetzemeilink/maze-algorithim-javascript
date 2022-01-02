const grid = document.querySelector('.maze');
const stack = [];
const squares = [];
let visitedCount = 0;
let currentTile = 0;
const mazeWidth = 10;
const mazeHeight = 10;

document.addEventListener('DOMContentLoaded', setupGrid);

function setupGrid() {
  stack.push(0);
  
  visitedCount = 1;

  for (let i = 0; i < mazeWidth * mazeHeight; i++) {
    const square = document.createElement('div');
    square.classList.add('tile');
    squares.push(square);
    square.id = i

    grid.appendChild(square);
  }

  squares[0].classList.add('visited');
  squares[0].classList.add('active');

  createMaze()
}

async function createMaze() {

 while (visitedCount < mazeHeight * mazeWidth) {
  let lastPos = stack.slice(-1)[0];
  const possibleMoves = [];

  await sleep(50)


  // north neighbor 
  if (lastPos - mazeHeight > 0 && !squares[lastPos - 10].classList.contains('visited')) {
      possibleMoves.push(-mazeHeight);
  }
  // south neighbor
  if (lastPos + mazeHeight < mazeWidth * mazeHeight && !squares[lastPos + 10].classList.contains('visited')) {
    possibleMoves.push(+mazeHeight);
  }
  // west neighbor
  if (!((lastPos - 1) < 0) && lastPos % mazeWidth !== 0 && !squares[lastPos - 1].classList.contains('visited')) {
    possibleMoves.push(-1);
  }
   // east neighbor
   if (!((lastPos + 1) > (mazeWidth * mazeHeight)) && (lastPos + 1) % mazeWidth !== 0 && !squares[lastPos + 1].classList.contains('visited')) {
    possibleMoves.push(+1);
  }


  if (possibleMoves.length > 0) {
    let randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    let nextMove = lastPos + randomMove


    squares[lastPos].classList.remove('active');
  
    squares[nextMove].classList.add('active');  
    squares[nextMove].classList.add('visited');
    
    stack.push(nextMove);
    visitedCount++

    switch (randomMove) {
      case -mazeHeight:
        squares[lastPos].classList.add('path-north');
        squares[nextMove].classList.add('path-south');
        break;
      case +mazeHeight:
        squares[lastPos].classList.add('path-south');
        squares[nextMove].classList.add('path-north');
        break;
      case -1:
        squares[lastPos].classList.add('path-west');
        squares[nextMove].classList.add('path-east');
        break;
      case +1:
        squares[lastPos].classList.add('path-east');
        squares[nextMove].classList.add('path-west');
        break;

    }
  } else {
    squares[lastPos].classList.remove('active');
    stack.pop();
  }
 }

 function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
  }
}


