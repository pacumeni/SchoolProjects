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
    upArrowPressed = false,
    downArrowPressed = false,
    escapePressed = false,
    brickRowCount = 8,
    brickColumnCount = 14,
    brickWidth = 30,
    brickHeight = 10,
    brickPadding = 5,
    brickOffsetTop = 30,
    brickOffsetLeft = 7,
    bricks = [],
    score = 0,
    lives = 3,
    statusCount = 0;

//this is just creating brick array
for(var c = 0; c < brickColumnCount; c++){
    bricks[c] = [];
    for(var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {x: 0, y: 0, status: 1, val: 0};
        if (r < 2){
            bricks[c][r].val = 5;
        } else if (r >= 2 && r < 4) {
            bricks[c][r].val = 3;
        } else if (r >= 4 && r < 6) {
            bricks[c][r].val = 2;
        } else {
            bricks[c][r].val = 1;
        }
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
    if(e.keyCode == 27){
        escapePressed = true;
    }
    if(e.keyCode == 38){
        upArrowPressed = true;
    }
    if(e.keyCode == 40){
        downArrowPressed = true;
    }
}

function keyUpHandler(e){
    if(e.keyCode == 39){
        rightArrowPressed = false;
    }
    if(e.keyCode == 37){
        leftArrowPressed = false;
    }
    if(e.keyCode == 27){
        escapePressed = false;
    }
    if(e.keyCode == 38){
        upArrowPressed = false;
    }
    if(e.keyCode == 40){
        downArrowPressed = false;
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
               //fixed scoring so that every brick now has a value. Need to fix it so that I can do values for the row.
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
                if (x > b.x && x - ballRadius < b.x + brickWidth && y + ballRadius > b.y && y - ballRadius < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    statusCount += 1;
                    //this is where I keep track of score. This needs to modified so that it does more than one per brick.
                    score += b.val;
                    //score += b.value;
                }
            }
        }
    }
}

function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

function displayLives(){
    //this needs to be changed to an image array instead.
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    displayLives();
    collisionDetection();

    //ball bouncing off left and right walls
    if(x + dx < ballRadius || x + dx > canvas.width - ballRadius){
        dx = -dx;
    }
    //ball bouncing off top wall, collision with paddle, else game over
    if(y + dy < ballRadius){
        dy = -dy;
    }else if (y + dy > canvas.height - ballRadius){ // this needs to be fixed. Does not reflect hitting top of paddle.
        if(x > paddleX - 1 && x < paddleX + paddleWidth + 1){
            dy = -dy;
        }else{
            lives--;
            if(!lives){
                // need to write in the canvas. Game Over. and allow the game to reset
                alert("Game Over");
                document.location.reload();
            }else{
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 3;
                dy = -3;
                paddleX = (canvas.width - paddleWidth)/2;
            }
            //I need to fix this so that I have lives and also so that It doesn't look so lame.

        }
    }

    if(rightArrowPressed && paddleX < canvas.width - paddleWidth){
        paddleX += 4;
    }else if(leftArrowPressed && paddleX > 0){
        paddleX -= 4;
    }

    //this statement works for now, but it should be improved. It is very clunky as is. Also, if you die, the speed
    //does not stay the same which is what the teacher wants I believe.
    if(statusCount == 4 || statusCount == 12 || statusCount == 36 || statusCount == 62) {
        dx += 1;
        dy += 1;
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

function highScores(){
    document.getElementById("highScores").style.display = "block";
    if(escapePressed){
        document.getElementById("highScores").style.display = "none";
        return
    }
    requestAnimationFrame(highScores);
}

function showCredits() {
    if (escapePressed){
        document.getElementById("Credits").style.display = "none";
        return;
    } else
        document.getElementById("Credits").style.display = "block";
    requestAnimationFrame(showCredits);
}