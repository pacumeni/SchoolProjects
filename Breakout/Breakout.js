/**
 * Created by whipnwalt on 3/1/2016.
 **/

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/ 2,
    y = canvas.height-30,
    dx = 2,
    dy = -2,
    ballRadius = 5,
    paddleHeight = 7,
    paddleWidth = 75,
    paddleX = (canvas.width - paddleWidth)/ 2,
    rightArrowPressed = false,
    leftArrowPressed = false,
    /*
     bottom -> up:
     two rows of yellow, two rows of orange, two rows of blue, and two rows of green.

     Have a small space between each of the rows and bricks
     */
    brickRowCount = 8,
    brickColumnCount = 14,
    brickWidth = 30,
    brickHeight = 10,
    brickPadding = 5,
    brickOffsetTop = 30,
    brickOffsetLeft = 7,
    bricks = [];

for(var c = 0; c < brickColumnCount; c++){
    bricks[c] = [];
    for(var r = 0; r < brickRowCount; r++){
        bricks[c][r] = {x: 0, y: 0, status: 1};
    }
}



document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e){
    if(e.keyCode == 39){
        rightArrowPressed = true;
    }
    if(e.keyCode == 37){
        leftArrowPressed = true;
    }
}

function keyUpHandler(e){
    if(e.keyCode == 39){
        rightArrowPressed = false;
    }
    if(e.keyCode == 37){
        leftArrowPressed = false;
    }
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function drawBricks(){
    for(var c = 0; c < brickColumnCount; c++){
        for(var r = 0; r < brickRowCount; r++){
           if(bricks[c][r].status == 1) {
               var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
               var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
               bricks[c][r].x = brickX;
               bricks[c][r].y = brickY;
               ctx.beginPath();
               ctx.rect(brickX, brickY, brickWidth, brickHeight);
               if (r < 2) {
                   ctx.fillStyle = "green";
               } else if (r >= 2 && r < 4) {
                   ctx.fillStyle = "blue";
               } else if (r >= 4 && r < 6) {
                   ctx.fillStyle = "orange";
               } else {
                   ctx.fillStyle = "yellow";
               }
               ctx.fill();
               ctx.closePath();
           }
        }
    }
}

function collisionDetection(){
    for(c = 0; c < brickColumnCount; c++){
        for(r = 0; r < brickRowCount; r++){
            var b = bricks[c][r];
            if(b.status == 1) {
                if (x + ballRadius > b.x && x - ballRadius < b.x + brickWidth && y + ballRadius > b.y && y - ballRadius < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                }
            }
        }
    }
}

/*function gameLoop(){
    update();
    render();
    requestAnimationFrame(gameLoop);
}*/

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();

    //ball bouncing off left and right walls
    if(x + dx < ballRadius || x + dx > canvas.width - ballRadius){
        dx = -dx;
    }
    //ball bouncing off top wall, collision with paddle, else game over
    if(y + dy < ballRadius){
        dy = -dy;
    }else if (y + dy > canvas.height - ballRadius){
        if(x > paddleX && x < paddleX + paddleWidth){
            dy = -dy;
        }else{
            alert("Game Over");
            document.location.reload();
        }
    }

    if(rightArrowPressed && paddleX < canvas.width - paddleWidth){
        paddleX += 4;
    }else if(leftArrowPressed && paddleX > 0){
        paddleX -= 4;
    }

    x += dx;
    y += dy;
}

setInterval(draw, 10);