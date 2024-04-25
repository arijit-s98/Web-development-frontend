document.addEventListener("DOMContentLoaded", () => {

    let table = document.getElementById('ping-pong-table');
    let ball = document.getElementById("ball"); //targeting the ball element
    let paddle = document.getElementById('paddle');

    //here the ballX and ballY will be helping us to set a starting point of ball w.r.t table 
    let ballX = 50; //distance of the top of the ball w.r.t ping pong table
    let ballY = 50; //distance of the left of the ball w.r.t. ping pong table

    let dx = 2; // displacement factor in x-direction, 2 -> you will displace by 2 px in +x direction, -2 -> you will displace by 2px in -ve x direction
    let dy = 2; // displacemenet factor in y-direction, 2 -> you will displace by 2 px in +y direction, -2 -> you will displace by 2px in -ve y direction
    
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;
    setInterval(function exec() {
    
        ballX += dx;
        ballY += dy;

        ball.style.left = `${ballX}px`;
        ball.style.top = `${ballY}px`;

        // if(ballX > 600-20 || ballX <= 0) dx *= -1;
        // if(ballY > 300-20 || ballY <= 0) dy *= -1;

        if(ballX < paddle.offsetLeft + paddle.offsetWidth &&
            ballY > paddle.offsetTop && 
            ballY - ball.offsetHeight < paddle.offsetTop + paddle.offsetHeight){
            dx*= -1;
        }
        //collision of ball and paddle

        if(ballX > table.offsetWidth - ball.offsetWidth || ballX <= 0) dx *= -1;  //change x-direction
        if(ballY > table.offsetHeight - ball.offsetHeight || ballY <= 0) dy *= -1; //change y-direction

    });


    let paddleY = 0;
    let dPy = 5;
    document.addEventListener("keydown", (event) => {
        event.preventDefault();  // prevents the execution of the default event behaviour
        if(event.keyCode == 38 && paddleY > 0) {
            //up arrow
            paddleY += (-1)* dPy;
            console.log("up",paddleY);
        }
        else if(event.keyCode == 40 && paddleY < table.offsetHeight - paddle.offsetHeight) {
            //down arrow
            paddleY += dPy;
        }
        paddle.style.top = `${paddleY}px`;
    })

});