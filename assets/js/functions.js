function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
    if(e.key == " " &&  pauseGame == false) {
        pauseGame = true;
        console.log('pause');
        $('body').css('background', 'pink');
    }
    else if(e.key == " " && pauseGame == true) {
        pauseGame = false;
        console.log('pause');
        $('body').css('background', 'white');
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}
  
function clearDrawing(){
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
}

function drawbackground(){
    ctx.beginPath();
    ctx.rect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = randomBackground;
    ctx.fill();
    ctx.closePath();
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2, false);
    ctx.fillStyle = randomColor;
    ctx.fill();
    ctx.closePath();
}

function drawPlayer(){
    ctx.beginPath();
    ctx.rect(xPlayer, canvas.height - 20, playerWidth, playerHeight);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

function drawBrick(x,y, bricksWidth, bricksHeight){
    ctx.beginPath();
    ctx.rect(x, y, bricksWidth, bricksHeight);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

function drawBricks(){
    for(var row = 0;row<bricksRows; row++){
        for(var column = 0; column < bricksColumns; column++){
            bricks[row][column].x = bricksLeft;
            bricks[row][column].y = bricksTop;
            if (bricks[row][column].active == 1){
                drawBrick(bricks[row][column].x, bricks[row][column].y, bricksWidth, bricksHeight);
            }
            bricksLeft = bricksLeft + bricksWidth + bricksPadding;  
        }
        bricksLeft = 20;
        bricksTop = bricksTop + bricksHeight + bricksPadding;
    } 
    bricksTop = 150; 
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function hitABrick(brick) {
    for(var row=0; row<bricksRows; row++) {
        for(var column=0; column<bricksColumns; column++) {
            var brick = bricks[row][column];
            if(brick.active == 1){
                if(x > brick.x && x < brick.x+bricksWidth && y > brick.y && y < brick.y+bricksHeight){
                    yMovement = -yMovement;
                    brick.active = 0;
                }
            }
        }
    }
}


function updateScore(){
    $('#score').html("Score : "+score);
}