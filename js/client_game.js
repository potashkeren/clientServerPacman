var client_board;
var client_score;
var client_eatenCoins;
var client_isGameOn;
var client_time;
var client_ghosts;
var client_numOfGhosts;

function clientStart(time,isGameOn) {
    client_isGameOn = isGameOn;
    client_score = 0;
    client_eatenCoins=0;
    client_time=time;


    clientInitBoard();
}

function DrawBoard(){
    contex.clearRect(0, 0, canvas.width, canvas.height);
    for (var row = 0; row < _board.length; row++)
    {
        for (var col=0; col < _board[row].length; col++)
        {
            if(_board[row][col]==1)
            {
                contex.fillStyle="darkBlue";
                contex.fillRect(row*20,col*20,20,20);
            } else{
                contex.fillStyle="black";
                contex.fillRect(row*20,col*20,20,20);
            }
        }
    }
}

function DrawPoints(){
    for (var row = 0; row < _board.length; row++)
    {
        for (var col=0; col < _board[row].length; col++)
        {
            if(_board[row][col]==3) {

                var imageObj = new Image();
                imageObj.width = "20px";
                imageObj.height = "20px";
                imageObj.src = "./img/5.png";
                contex.drawImage(imageObj, row*20+10-10, col*20+10-10 , 20, 20);
            }
            else if(_board[row][col]==4) {
                var imageObj = new Image();
                imageObj.width = "20px";
                imageObj.height = "20px";
                imageObj.src = "./img/15.png";
                contex.drawImage(imageObj, row*20+10-10, col*20+10-10 , 20, 20);

            }
            else if(_board[row][col]==5) {
                var imageObj = new Image();
                imageObj.width = "20px";
                imageObj.height = "20px";
                imageObj.src = "./img/25.png";
                contex.drawImage(imageObj, row*20+10-10, col*20+10-10 , 20, 20);

            }
            else if(_board[row][col]==8) {
                var imageObj = new Image();
                imageObj.width = "20px";
                imageObj.height = "20px";
                imageObj.src = "./img/time.png";
                contex.drawImage(imageObj, row*20+10-10, col*20+10-10 , 20, 20);

            }
            else if(_board[row][col]==6) {
                var imageObj = new Image();
                imageObj.width = "20px";
                imageObj.height = "20px";
                imageObj.src = "./img/life.png";
                contex.drawImage(imageObj, row*20+10-10, col*20+10-10 , 20, 20);

            }
        }
    }
}

function DrawPacman() {
    var center = new Object();
    center.x = shape.i*20 + 10;// * 50 + 30;
    center.y = shape.j*20 + 10;// * 50 + 30;

    if(_lastPressedKey == "left"){
        //pacman
        contex.beginPath();
        contex.arc(center.x, center.y, 10, 0.85 * Math.PI, 1.15 * Math.PI, true); // half circle
        contex.lineTo(center.x, center.y);
        contex.fillStyle = "yellow"; //color
        contex.fill();

        //eye
        contex.beginPath();
        contex.arc(center.x - 1.6666 , center.y - 5 ,  1.5, 0, 2 * Math.PI, false); // circle
        contex.fillStyle = "black"; //color
        contex.fill();

    } else if(_lastPressedKey == "up"){
        //pacman
        contex.beginPath();
        contex.arc(center.x, center.y, 10, 1.4 * Math.PI, 1.65 * Math.PI, true); // half circle
        contex.lineTo(center.x, center.y);
        contex.fillStyle = "yellow"; //color
        contex.fill();

        //eye
        contex.beginPath();
        contex.arc(center.x + 3.6666 , center.y - 2 ,  1.5, 0, 2 * Math.PI, false); // circle
        contex.fillStyle = "black"; //color
        contex.fill();

    } else if(_lastPressedKey == "down"){
        //pacman
        contex.beginPath();
        contex.arc(center.x, center.y, 10, 0.4 * Math.PI, 0.65 * Math.PI, true); // half circle
        contex.lineTo(center.x, center.y);
        contex.fillStyle = "yellow"; //color
        contex.fill();

        //eye
        contex.beginPath();
        contex.arc(center.x + 3.6666 , center.y + 2 ,  1.5, 0, 2 * Math.PI, true); // circle
        contex.fillStyle = "black"; //color
        contex.fill();
    }else {
        //pacman
        contex.beginPath();
        contex.arc(center.x, center.y, 10, 0.15 * Math.PI, 1.85 * Math.PI, false); // half circle
        contex.lineTo(center.x, center.y);
        contex.fillStyle = "yellow"; //color
        contex.fill();

        //eye
        contex.beginPath();
        contex.arc(center.x + 1.6666 , center.y - 5 ,  1.5, 0, 2 * Math.PI, false); // circle
        contex.fillStyle = "black"; //color
        contex.fill();
    }
}

function DrawGhosts(){
    for(var i = 0; i < client_numOfGhosts; i++)
    {
        var ghost = client_ghosts[i];
        var imageObj = new Image();
        imageObj.width = "20px";
        imageObj.height = "20px";
        imageObj.src = ghost.imagePath;
        contex.drawImage(imageObj, ghost.x*20+10 - ghost.radius, ghost.y*20+10 -ghost.radius , 20, 20);
        if(ghost.x == shape.i && ghost.y == shape.j && _ghostMeet == false)
            checkPacmanGhostMeet();
    }
}

function drawStarfish(){
    if(starFish.isAlive == true) {
        var imageObj = new Image();
        imageObj.width = "20px";
        imageObj.height = "20px";
        imageObj.src = starFish.img;
        contex.drawImage(imageObj, starFish.x*20+10 - 10, starFish.y*20+10 - 10 , 20, 20);
    }
}

function clientPacmanStrike(livesLeft) {
    _audio.pause();
    _sound = new Audio('./data/whawha.mp3');
    _sound.play();

    $("#strikeText").text("You met a ghost! \n you have " + livesLeft + " lives left");
    document.getElementById("Strike").showModal();
}

function clientMeetGhost() {
    _sound.pause();
    _audio.play();
    document.getElementById("Strike").close();

    meetGhost();
}

function backToSettings(){
    gameOver("");
    $("#settings").show();
    $("#play").hide();
}

function reStart(){
    gameOver("");
    Start();
}

function clientGameOver(reason,isGameOn){
    client_isGameOn =isGameOn;
    _audio.pause();
    if(reason == "coins"){
        $("#dialogText").text("You Won! \n Your score is: " + score);
        _sound = new Audio('./data/win.mp3');
    } else if(reason == "gameover"){
        $("#dialogText").text("You Lost! \n Your score is: " + score);
        _sound = new Audio('./data/gameOver.mp3');
    } else if (reason == ("time is up")){
        if(score < 150){
            $("#dialogText").text("You can do better. \n Your score is: "+ score);
            _sound = new Audio('./data/gameOver.mp3');
        }
        else{
            $("#dialogText").text("We have a winner. \n Your score is: "+ score);
            _sound = new Audio('./data/win.mp3');
        }
    }
    _sound.play();
    document.getElementById("Game Over").showModal();
    //remove heartes from the hearts div
    var heartDiv = document.getElementById("lives");
    while (heartDiv.hasChildNodes()) {
        heartDiv.removeChild(heartDiv.lastChild);
    }
}

function clientInitBoard(){
    if(_sound != null){
        _sound.pause();}

    _audio = new Audio('./data/StarWars.mp3');
    _audio.play();
    _audio.volume = 0.5;

    //reset life
    for(var i =0 ; i<3; i++){
        var elem = document.createElement("img");
        elem.src = 'img/life.png';
        elem.setAttribute("height", "28");
        elem.setAttribute("width", "28");
        var livesDive = document.getElementById("lives");
        livesDive.appendChild(elem);
    }
}

function clientAddLife() {
    var elem = document.createElement("img"); // draw life
    elem.src = 'img/life.png';
    elem.setAttribute("height", "30");
    elem.setAttribute("width", "30");
    var livesDive = document.getElementById("lives");
    livesDive.appendChild(elem);
}

function clientGetTime(time) {
    client_time=time;
    $("#lblTime").text(client_time);
}

function clientGetGhost(ghost,numOfGhost){
    client_ghosts = ghost;
    client_numOfGhosts = numOfGhost;
}

function clientMoveGhost(ghost) {
    client_ghosts=ghost;
}

function clientDraw() {
    DrawBoard();
    DrawPacman();
    DrawPoints();
    DrawGhosts();
    drawStarfish();
}

