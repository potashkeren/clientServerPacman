$.getScript("js/game.js",function () {});

//region ** Help Variables **
/* Human readable keyCode index */
var KEY = {'BACKSPACE': 8, 'TAB': 9, 'NUM_PAD_CLEAR': 12, 'ENTER': 13, 'SHIFT': 16, 'CTRL': 17, 'ALT': 18, 'PAUSE': 19, 'CAPS_LOCK': 20, 'ESCAPE': 27, 'SPACEBAR': 32, 'PAGE_UP': 33, 'PAGE_DOWN': 34, 'END': 35, 'HOME': 36, 'ARROW_LEFT': 37, 'ARROW_UP': 38, 'ARROW_RIGHT': 39, 'ARROW_DOWN': 40, 'PRINT_SCREEN': 44, 'INSERT': 45, 'DELETE': 46, 'SEMICOLON': 59, 'WINDOWS_LEFT': 91, 'WINDOWS_RIGHT': 92, 'SELECT': 93, 'NUM_PAD_ASTERISK': 106, 'NUM_PAD_PLUS_SIGN': 107, 'NUM_PAD_HYPHEN-MINUS': 109, 'NUM_PAD_FULL_STOP': 110, 'NUM_PAD_SOLIDUS': 111, 'NUM_LOCK': 144, 'SCROLL_LOCK': 145, 'SEMICOLON': 186, 'EQUALS_SIGN': 187, 'COMMA': 188, 'HYPHEN-MINUS': 189, 'FULL_STOP': 190, 'SOLIDUS': 191, 'GRAVE_ACCENT': 192, 'LEFT_SQUARE_BRACKET': 219, 'REVERSE_SOLIDUS': 220, 'RIGHT_SQUARE_BRACKET': 221, 'APOSTROPHE': 222};

var position  = null,
    due       = null,
    keyMap    = {};

keyMap[KEY.ARROW_LEFT]  = LEFT;
keyMap[KEY.ARROW_UP]    = UP;
keyMap[KEY.ARROW_RIGHT] = RIGHT;
keyMap[KEY.ARROW_DOWN]  = DOWN;

/* Human readable keyCode index */
var NONE        = 4,
    UP          = 3,
    LEFT        = 2,
    DOWN        = 1,
    RIGHT       = 11,
    WAITING     = 5,
    PAUSE       = 6,
    PLAYING     = 7,
    COUNTDOWN   = 8,
    EATEN_PAUSE = 9,
    DYING       = 10;
//endregion

//region ** Game Variables **
var client_board;
var client_score;
var client_eatenCoins;
var client_isGameOn;
var client_time;
var client_ghosts;
var client_numOfGhosts;
var client_starFish;
var client_lastPressedKey;
var ghostsPictures =["./img/pinki.ico", "./img/redi.png", "./img/blui.ico"];
var client_pacman = new Object();
var _audio, _sound;
var contex = canvas.getContext("2d");
//endregion



function client_get_message(json){
    var msg = JSON.parse(json);
    var param = msg.parameters
    switch (msg.messageType) {
        case "clientCreateBoard":
            clientCreateBoard(param.board);
            break;
        case "user_pressed_the_start_game_button":
            Start();
            break;
    }

}

function client_send_message(json){
    get_message(json);
}

function BuildJson(functionName,param, isObject) {
    if (!isObject) {
        var msg =  '{ "messageType" : "' + functionName +
                    '" , "parameters" : { ' + param + ' }' +
                    '}';
    }
    else{
        var msg ="";
    }
    return msg;
}


//region ** Flow Functionality **
function startGame(time,coins,numOfGhost) {
    client_numOfGhosts = numOfGhost;
    client_isGameOn = true;
    client_score = 0;
    client_eatenCoins=0;
    client_time=time;
    clientInitSoundAndLife();

    keysDown = {};
    addEventListener("keydown", function (e) {keysDown[e.keyCode] = true;}, false);
    addEventListener("keyup", function (e) {keysDown[e.keyCode] = false;}, false);

    var parameters = '"client_time" :' +time + ', "coins" :' + coins + ', "numOfGhosts" :' + client_numOfGhosts;
    //var exm = '{ "name":"John", "age":31, "city":"New York" }';
    client_send_message(BuildJson("Start",parameters,false));
    //Start(client_time,coins,client_numOfGhosts);
}

function GetKeyPressed() {
    if (keysDown[38]) {return 1;}
    if (keysDown[40]) {return 2;}
    if (keysDown[37]) {return 3;}
    if (keysDown[39]) {return 4;}
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

function reStart(){
    gameOver("");
    Start();
}

function backToSettings(){
    gameOver("");
    $("#settings").show();
    $("#play").hide();
}

function keyDown(e) {
    if (typeof keyMap[e.keyCode] !== "undefined") {
        due = keyMap[e.keyCode];
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
    return true;
}
//endregion

//region ** Init Functionality **
function clientInitSoundAndLife(){
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

function clientCreateBoard(board) {
    client_board=board;
}

function getStarFish(starFish){
    client_starFish = starFish;
    client_starFish.img= "./img/starfish.png";
}

function getGhost(ghost){
    client_ghosts = ghost;
    for (var i = 0; i < client_numOfGhosts; i++){
        client_ghosts[i].imagePath = ghostsPictures[i];
    }
}
//endregion

//region ** Update Functions **
function updateBoard(number,x,y) {
    client_board[x][y]=number;
}

function updateTime(time) {
    client_time=time;
    $("#lblTime").text(client_time);
}

function updateScore(score) {
    client_score=score;
    $("#lblScore").text(client_score);
}

function updateLife(life) {
    if(life=="up"){
        var elem = document.createElement("img"); // draw life
        elem.src = 'img/life.png';
        elem.setAttribute("height", "30");
        elem.setAttribute("width", "30");
        var livesDive = document.getElementById("lives");
        livesDive.appendChild(elem);
    }
    if (life=="down"){
        var heartDiv = document.getElementById("lives");
        heartDiv.removeChild(heartDiv.lastChild);
    }

}

function updatePacmanLocation(x,y,lastPressKey) {
    if (lastPressKey!=""){
        client_lastPressedKey = lastPressKey;
    }
    client_pacman.i = x;
    client_pacman.j = y;
}

function updateGhostLocation(ghost_id,x,y) {
    client_ghosts[ghost_id].x=x;
    client_ghosts[ghost_id].y=y;
}

function updateStarFishLocation(x, y) {
    client_starFish.x = x;
    client_starFish.y = y;
}

function updateStarFishAlive(isAlive) {
    client_starFish.isAlive=isAlive;
}
//endregion

//region ** Draw Functions **
function Draw() {
    DrawBoard();
    DrawPacman();
    DrawPoints();
    DrawGhosts();
    drawStarfish();
}

function DrawBoard(){
    contex.clearRect(0, 0, canvas.width, canvas.height);
    for (var row = 0; row < client_board.length; row++)
    {
        for (var col=0; col < client_board[row].length; col++)
        {
            if(client_board[row][col]==1)
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
    for (var row = 0; row < client_board.length; row++)
    {
        for (var col=0; col < client_board[row].length; col++)
        {
            if(client_board[row][col]==3) {

                var imageObj = new Image();
                imageObj.width = "20px";
                imageObj.height = "20px";
                imageObj.src = "./img/5.png";
                contex.drawImage(imageObj, row*20+10-10, col*20+10-10 , 20, 20);
            }
            else if(client_board[row][col]==4) {
                var imageObj = new Image();
                imageObj.width = "20px";
                imageObj.height = "20px";
                imageObj.src = "./img/15.png";
                contex.drawImage(imageObj, row*20+10-10, col*20+10-10 , 20, 20);

            }
            else if(client_board[row][col]===5) {
                var imageObj = new Image();
                imageObj.width = "20px";
                imageObj.height = "20px";
                imageObj.src = "./img/25.png";
                contex.drawImage(imageObj, row*20+10-10, col*20+10-10 , 20, 20);

            }
            else if(client_board[row][col]==8) {
                var imageObj = new Image();
                imageObj.width = "20px";
                imageObj.height = "20px";
                imageObj.src = "./img/time.png";
                contex.drawImage(imageObj, row*20+10-10, col*20+10-10 , 20, 20);

            }
            else if(client_board[row][col]==6) {
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
    center.x = client_pacman.i*20 + 10;// * 50 + 30;
    center.y = client_pacman.j*20 + 10;// * 50 + 30;

    if(client_lastPressedKey === "left"){
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

    } else if(client_lastPressedKey === "up"){
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

    } else if(client_lastPressedKey === "down"){
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
    }
}

function drawStarfish(){
    if(client_starFish.isAlive == true) {
        var imageObj = new Image();
        imageObj.width = "20px";
        imageObj.height = "20px";
        imageObj.src = client_starFish.img;
        contex.drawImage(imageObj, client_starFish.x*20+10 - 10, client_starFish.y*20+10 - 10 , 20, 20);
    }
}
//endregion

