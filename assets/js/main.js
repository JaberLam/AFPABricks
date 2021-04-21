/* Let's Go */
var canvas = document.getElementById('myGame');
var ctx = canvas.getContext('2d');
var pauseGame = false;
var rightPressed = false;
var leftPressed = false;
var score = 0;
var destroyed = 0;
var playerWidth = 100;
var playerHeight = 20;
var xPlayer = canvas.width/2 - (playerWidth / 2);
var yPlayer = canvas.height - playerHeight;
var ballRadius = 10;
var xMovement = -3;
var yMovement = 3;
x = 500;
y = 380;
var randomColor = getRandomColor();
var randomBackground = getRandomColor();


var bricks = [];
var bricksRows = 3;
var bricksColumns = 11;
var bricksWidth = 50;
var bricksHeight = 18;
var bricksPadding = 12;
var bricksTop = 120;
var bricksLeft = 20;
for(var row = 0;row<bricksRows; row++){
  bricks[row] = []; 
  for(var column = 0; column < bricksColumns; column++){
    bricks[row][column] = { 'x': 0, 'y': 0, 'active': 1 };
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function playGame(){
  clearDrawing();
  drawbackground();      
  drawPlayer();
  drawBricks();                           
  drawBall(x, y, ballRadius);
  hitABrick(bricks); 
 
  if(x + xMovement > canvas.width-ballRadius || x + xMovement < ballRadius){
    xMovement = -xMovement;
    randomColor = getRandomColor();
    randomBackground = getRandomColor();
  }
  if(y + yMovement < ballRadius){
    yMovement = -yMovement;
  }
  else if(y + yMovement > canvas.height - ballRadius){
    if( x > xPlayer && x <= xPlayer + playerWidth     ){
      if( y = y - playerHeight )
      yMovement = -yMovement;
      score += 10;
    }else{
      endGame();
    }
    randomColor = getRandomColor();
  } 


  if (pauseGame !== true ){
    if( rightPressed ){
      if(xPlayer + playerWidth >= canvas.width ){
        xPlayer = canvas.width - playerWidth;
      }else{
        xPlayer = xPlayer + 5;
      }
    }
    if( leftPressed ){
      if(xPlayer <= 0 ){
        xPlayer = 0;
      }else{
        xPlayer = xPlayer - 5;
      }
    }
    x += xMovement;
    y += yMovement;
  }
}
function startGame(){
  setInterval(playGame, 20);
  setInterval(updateScore, 1000);
}
function endGame(){
  alert('End Game!');
  bricks = 0;
  window.location.reload();
}