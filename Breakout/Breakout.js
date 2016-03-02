/**
 * Created by whipnwalt on 3/1/2016.
 **/

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/ 2,
    y = canvas.height-30,
    dx = 2,
    dy = -2,
    ballRadius = 5;

function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(y + dy < ballRadius || y + dy > canvas.height - ballRadius){
        dy = -dy;
    }
    if(x + dx < ballRadius || x + dx > canvas.height - ballRadius){
        dx = -dx;
    }
    drawBall();
    x += dx;
    y += dy;
}

setInterval(draw, 10);