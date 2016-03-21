/**
 * Created by whipnwalt on 3/1/2016.
 **/

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/ 2,
    y = canvas.height-30,
    dx = 4,
    dy = -4,
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
    statusCount = 0,
    lastRowHit = false,
    rowOneCleared = false,
    rowTwoCleared = false,
    rowThreeCleared = false,
    rowFourCleared = false,
    rowFiveCleared = false,
    rowSixCleared = false,
    rowSevenCleared = false,
    rowEightCleared = false;

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

/*function drawSecondBall(){
    var that = drawBall();
    that.locationStart = function() {
        paddleX - ballRadius;
    };
    return that;
}*/

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

function isLastRowHit(){
    if(lastRowHit == true){
        return;
    }
    if(bricks[c][0].status == 0){
        paddleWidth = paddleWidth / 2;
        lastRowHit = true;
    }
}

function isRowOneCleared(){
    if(rowOneCleared == true)
        return;
    if( bricks[0][7].status == 0 &&
        bricks[1][7].status == 0 &&
        bricks[2][7].status == 0 &&
        bricks[3][7].status == 0 &&
        bricks[4][7].status == 0 &&
        bricks[5][7].status == 0 &&
        bricks[6][7].status == 0 &&
        bricks[7][7].status == 0 &&
        bricks[8][7].status == 0 &&
        bricks[9][7].status == 0 &&
        bricks[10][7].status == 0 &&
        bricks[11][7].status == 0 &&
        bricks[12][7].status == 0 &&
        bricks[13][7].status == 0){
        score += 25;
        rowOneCleared = true;
    }
}

function isRowTwoCleared(){
    if(rowTwoCleared == true)
        return;
    if( bricks[0][6].status == 0 &&
        bricks[1][6].status == 0 &&
        bricks[2][6].status == 0 &&
        bricks[3][6].status == 0 &&
        bricks[4][6].status == 0 &&
        bricks[5][6].status == 0 &&
        bricks[6][6].status == 0 &&
        bricks[7][6].status == 0 &&
        bricks[8][6].status == 0 &&
        bricks[9][6].status == 0 &&
        bricks[10][6].status == 0 &&
        bricks[11][6].status == 0 &&
        bricks[12][6].status == 0 &&
        bricks[13][6].status == 0){
        score += 25;
        rowTwoCleared = true;
    }
}

function isRowThreeCleared(){
    if(rowThreeCleared == true)
        return;
    if( bricks[0][5].status == 0 &&
        bricks[1][5].status == 0 &&
        bricks[2][5].status == 0 &&
        bricks[3][5].status == 0 &&
        bricks[4][5].status == 0 &&
        bricks[5][5].status == 0 &&
        bricks[6][5].status == 0 &&
        bricks[7][5].status == 0 &&
        bricks[8][5].status == 0 &&
        bricks[9][5].status == 0 &&
        bricks[10][5].status == 0 &&
        bricks[11][5].status == 0 &&
        bricks[12][5].status == 0 &&
        bricks[13][5].status == 0){
        score += 25;
        rowThreeCleared = true;
    }
}

function isRowFourCleared(){
    if(rowFourCleared == true)
        return;
    if( bricks[0][4].status == 0 &&
        bricks[1][4].status == 0 &&
        bricks[2][4].status == 0 &&
        bricks[3][4].status == 0 &&
        bricks[4][4].status == 0 &&
        bricks[5][4].status == 0 &&
        bricks[6][4].status == 0 &&
        bricks[7][4].status == 0 &&
        bricks[8][4].status == 0 &&
        bricks[9][4].status == 0 &&
        bricks[10][4].status == 0 &&
        bricks[11][4].status == 0 &&
        bricks[12][4].status == 0 &&
        bricks[13][4].status == 0){
        score += 25;
        rowFourCleared = true;
    }
}

function isRowFiveCleared(){
    if(rowFiveCleared == true)
        return;
    if( bricks[0][3].status == 0 &&
        bricks[1][3].status == 0 &&
        bricks[2][3].status == 0 &&
        bricks[3][3].status == 0 &&
        bricks[4][3].status == 0 &&
        bricks[5][3].status == 0 &&
        bricks[6][3].status == 0 &&
        bricks[7][3].status == 0 &&
        bricks[8][3].status == 0 &&
        bricks[9][3].status == 0 &&
        bricks[10][3].status == 0 &&
        bricks[11][3].status == 0 &&
        bricks[12][3].status == 0 &&
        bricks[13][3].status == 0){
        score += 25;
        rowFiveCleared = true;
    }
}

function isRowSixCleared(){
    if(rowSixCleared == true)
        return;
    if( bricks[0][2].status == 0 &&
        bricks[1][2].status == 0 &&
        bricks[2][2].status == 0 &&
        bricks[3][2].status == 0 &&
        bricks[4][2].status == 0 &&
        bricks[5][2].status == 0 &&
        bricks[6][2].status == 0 &&
        bricks[7][2].status == 0 &&
        bricks[8][2].status == 0 &&
        bricks[9][2].status == 0 &&
        bricks[10][2].status == 0 &&
        bricks[11][2].status == 0 &&
        bricks[12][2].status == 0 &&
        bricks[13][2].status == 0){
        score += 25;
        rowSixCleared = true;
    }
}

function isRowSevenCleared(){
    if(rowSevenCleared == true)
        return;
    if( bricks[0][1].status == 0 &&
        bricks[1][1].status == 0 &&
        bricks[2][1].status == 0 &&
        bricks[3][1].status == 0 &&
        bricks[4][1].status == 0 &&
        bricks[5][1].status == 0 &&
        bricks[6][1].status == 0 &&
        bricks[7][1].status == 0 &&
        bricks[8][1].status == 0 &&
        bricks[9][1].status == 0 &&
        bricks[10][1].status == 0 &&
        bricks[11][1].status == 0 &&
        bricks[12][1].status == 0 &&
        bricks[13][1].status == 0){
        score += 25;
        rowSevenCleared = true;
    }
}

function isRowEightCleared(){
    if(rowEightCleared == true)
        return;
    if( bricks[0][0].status == 0 &&
        bricks[1][0].status == 0 &&
        bricks[2][0].status == 0 &&
        bricks[3][0].status == 0 &&
        bricks[4][0].status == 0 &&
        bricks[5][0].status == 0 &&
        bricks[6][0].status == 0 &&
        bricks[7][0].status == 0 &&
        bricks[8][0].status == 0 &&
        bricks[9][0].status == 0 &&
        bricks[10][0].status == 0 &&
        bricks[11][0].status == 0 &&
        bricks[12][0].status == 0 &&
        bricks[13][0].status == 0){
        score += 25;
        rowEightCleared = true;
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
                    //this is where I add the score.
                    score += b.val;
                    isRowOneCleared();
                    isRowTwoCleared();
                    isRowThreeCleared();
                    isRowFourCleared();
                    isRowFiveCleared();
                    isRowSixCleared();
                    isRowSevenCleared();
                    isRowEightCleared();
                    //this statement is to reduce the size of the paddle if you break through the last green row.
                    isLastRowHit();
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

//function countdown(){

    ///Countdown isn't working right now because I can't get the timing down. I need to make it so that I can wait in
    ///the for loop allowing the number to persist for a couple of seconds before the canvas gets cleared for another
    /// number.





    /*var count = 3;
    function loop() {
        var ans = String(count);
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText(ans, canvas.width / 2, canvas.height / 2);
        setTimeout(function () {
            count -= 1;
            if (count > 0) {
                ctx.clearRect(canvas.width/2, canvas.height/2, 20, 20)
                loop();
            }
        }, 1000);
    }

    loop();*/
    /*for (count = 3; count > 0; count--) {
        var ans = String(count);
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText(ans, canvas.width / 2 + (10*count), canvas.height / 2);
    }*/
//}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //countdown();
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
        }
    }

    if(rightArrowPressed && paddleX < canvas.width - paddleWidth){
        paddleX += 4;
    }else if(leftArrowPressed && paddleX > 0){
        paddleX -= 4;
    }

    //this statement works for now, but it should be improved. It is very clunky as is. Also, if you die, the speed
    //does not stay the same which is what the teacher wants I believe.
   /* if(statusCount == 4 || statusCount == 12 || statusCount == 36 || statusCount == 62) {
        dx += 1;
        dy += 1;
    }*/

   /* if(score % 100 == 0){
        drawSecondBall();
    }*/
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