//Board
let blocksize = 25;
let rows = 20;
let cols = 20;
let board;
let context;

//SNake Head
let snakeX = blocksize * 5;
let snakeY = blocksize * 5;

let velocityX = 0;
let velocityY = 0;

//SNake Body
let snakeBody = [];

//Food
let foodX;
let foodY;

//Status
let gameOver = false;

window.onload = function () {
  board = document.getElementById('SnakeGameBoard');
  board.height = rows * blocksize;
  board.width = cols * blocksize;
  context = board.getContext('2d'); //To draw on board
  placeFood();
  document.addEventListener('keyup', changeDirection);
  setInterval(update, 1000 / 10);
};

function update() {
  if (gameOver) {
    return;
  }
  context.fillStyle = 'black';
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = 'red';
  context.fillRect(foodX, foodY, blocksize, blocksize);

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    console.log(snakeBody);
    placeFood();
  }

  for (let index = snakeBody.length - 1; index > 0; index--) {
    snakeBody[index] = snakeBody[index - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  context.fillStyle = 'lime';
  snakeX += velocityX * blocksize;
  snakeY += velocityY * blocksize;
  context.fillRect(snakeX, snakeY, blocksize, blocksize);
  for (let index = 0; index < snakeBody.length; index++) {
    context.fillRect(
      snakeBody[index][0],
      snakeBody[index][1],
      blocksize,
      blocksize,
    );
  }

  //GameOver conditions
  if (
    snakeX < 0 ||
    snakeX > cols * blocksize - blocksize ||
    snakeY < 0 ||
    snakeY > rows * blocksize - blocksize
  ) {
    gameOver = true;
    alert('Game Over');
  }
  for (let index = 0; index < snakeBody.length; index++) {
    if (snakeX == snakeBody[index][0] && snakeY == snakeBody[index][1]) {
      gameOver = true;
      alert('Game Over');
    }
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blocksize;
  foodY = Math.floor(Math.random() * rows) * blocksize;
}

function changeDirection(e) {
  if (e.code == 'ArrowUp' && velocityY !== 1) {
    velocityY = -1;
    velocityX = 0;
  }
  if (e.code == 'ArrowDown' && velocityY !== -1) {
    velocityY = 1;
    velocityX = 0;
  }
  if (e.code == 'ArrowRight' && velocityX !== -1) {
    velocityY = 0;
    velocityX = 1;
  }
  if (e.code == 'ArrowLeft' && velocityX !== 1) {
    velocityY = 0;
    velocityX = -1;
  }
}
