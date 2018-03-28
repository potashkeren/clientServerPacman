/* Human readable keyCode index */
var KEY = {'BACKSPACE': 8, 'TAB': 9, 'NUM_PAD_CLEAR': 12, 'ENTER': 13, 'SHIFT': 16, 'CTRL': 17, 'ALT': 18, 'PAUSE': 19, 'CAPS_LOCK': 20, 'ESCAPE': 27, 'SPACEBAR': 32, 'PAGE_UP': 33, 'PAGE_DOWN': 34, 'END': 35, 'HOME': 36, 'ARROW_LEFT': 37, 'ARROW_UP': 38, 'ARROW_RIGHT': 39, 'ARROW_DOWN': 40, 'PRINT_SCREEN': 44, 'INSERT': 45, 'DELETE': 46, 'SEMICOLON': 59, 'WINDOWS_LEFT': 91, 'WINDOWS_RIGHT': 92, 'SELECT': 93, 'NUM_PAD_ASTERISK': 106, 'NUM_PAD_PLUS_SIGN': 107, 'NUM_PAD_HYPHEN-MINUS': 109, 'NUM_PAD_FULL_STOP': 110, 'NUM_PAD_SOLIDUS': 111, 'NUM_LOCK': 144, 'SCROLL_LOCK': 145, 'SEMICOLON': 186, 'EQUALS_SIGN': 187, 'COMMA': 188, 'HYPHEN-MINUS': 189, 'FULL_STOP': 190, 'SOLIDUS': 191, 'GRAVE_ACCENT': 192, 'LEFT_SQUARE_BRACKET': 219, 'REVERSE_SOLIDUS': 220, 'RIGHT_SQUARE_BRACKET': 221, 'APOSTROPHE': 222};

var counter, _ghostMeet;
var position  = null,
        direction = null,
        eaten     = null,
        due       = null,
        lives     = null,
        score     = 5,
        keyMap    = {};

keyMap[KEY.ARROW_LEFT]  = LEFT;
keyMap[KEY.ARROW_UP]    = UP;
keyMap[KEY.ARROW_RIGHT] = RIGHT;
keyMap[KEY.ARROW_DOWN]  = DOWN;

var ghosts = [];
var boardCorners = [{x : 1, y : 1} , { x : 21, y : 1 }, { x : 21, y : 21 }];
var canvasCorners = [{x : 30, y : 30} , { x : 430, y : 30 }, { x : 430, y : 430 }];

var starFish, _timeLeft;

var _ghostMoveModolu = 0;
var _eatenCoins;
var ghostsPictures =["./img/pinki.ico", "./img/redi.png", "./img/blui.ico"];

var shape=new Object();
var _lastPressedKey;
var _board;
var score;
var interval, _audio, _sound;

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
DYING       = 10,
Pacman      = {};

var _pacman_remain;
var contex = canvas.getContext("2d");

function Start() {
    _isGameOn = true;
    score = 0;
     _eatenCoins=0;
    var cnt = 100;
    time = $("#selectTime").val();
    initBoard();

    ///place the pacman in randome cell
    var emptyCell = findRandomEmptyCell(_board);
    _board[emptyCell[0]][emptyCell[1]] = 2;
    shape.i = emptyCell[0];
    shape.j = emptyCell[1];

    fillPoints();
    createGhosts();

    keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.keyCode] = false;
    }, false);
     interval=setInterval(UpdatePosition, 90);

     clientStart(time,_isGameOn)
            }

function initBoard(){
    counter = setInterval(timer, 1000);

    _ghostMeet = false;
    _pacman_remain = 2;
    _board = [
                           [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                         	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                         	[1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
                         	[1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1],
                         	[1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
                         	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                         	[1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1],
                         	[1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
                         	[1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
                         	[1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
                         	[1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
                         	[1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
                         	[1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
                         	[1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
                         	[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
                         	[1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                         	[1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
                         	[1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
                         	[1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
                         	[1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                         	[1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
                         	[1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                           [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
                         ];
    starFish = {
    x: 1,
    y : 21,
    prevX: 1,
    prevY: 21,
    boardX: 30 ,
    boardY: 430,
    img: "./img/starfish.png",
    isAlive: true,
  };
}

function moveStarfish(){
    if(starFish.isAlive == true)
    {
        if( _ghostMoveModolu % 5 == 0){
            var locations = getPossibleMoves(starFish.x,starFish.y);
             if(locations.length == 1){
                starFish.prevX = starFish.x;
                starFish.prevY = starFish.y;
                starFish.x =  locations[0].x;
                starFish.y = locations[0].y;
             }else{
             var moved = false;
             while(!moved){
                var rnd = Math.floor((Math.random() * locations.length));
                if((starFish.prevY != locations[rnd].y || starFish.prevX != locations[rnd].x )){
                        starFish.prevX = starFish.x;
                        starFish.prevY = starFish.y;
                        starFish.x = locations[rnd].x;
                        starFish.y = locations[rnd].y;
                        moved = true;
                     }
                }
              }
        }
        if(starFish.x == shape.i && starFish.y == shape.j){
                checkPacmanStarMeet();
        }
     }
}

function fillPoints(){
   //fill Points
   var food_remain = coins;
   var whitePoints = 0.6 * coins;
   var pinkPoints = 0.3 * coins;
   var orangePoints = coins - pinkPoints - whitePoints;

   while(food_remain>0){
        var emptyCell = findRandomEmptyCell(_board);
        if(whitePoints > 0){
            _board[emptyCell[0]][emptyCell[1]] = 3; // 3==white coin
            whitePoints--;
        } else if(pinkPoints>0){
            _board[emptyCell[0]][emptyCell[1]] = 4;
            pinkPoints--;
        } else if(orangePoints >0){
            _board[emptyCell[0]][emptyCell[1]] = 5;
            orangePoints--;
        }
        food_remain--;
   }
   var emptyCell = findRandomEmptyCell(_board);
    _board[emptyCell[0]][emptyCell[1]] = 8; // Extra Time
   var emptyCell2 = findRandomEmptyCell(_board);
   _board[emptyCell2[0]][emptyCell2[1]] = 6; // Extra Life
}


function moveGhosts(){
    _ghostMoveModolu = _ghostMoveModolu + 1 ;

        for (var i = 0; i < numOfGhosts; i++)
        {
            if( _ghostMoveModolu % 4 == i){
                var g = ghosts[i];

                var bestMove = getBestMoveForGhost(g);
                g.prevX = g.x;
                g.prevY = g.y;
                g.x = bestMove.x;
                g.y = bestMove.y;
        }
    }
    clientMoveGhost(ghosts);
}

function getRandomDirection(){
    var i = Math.random();
    if(i<0.25){
        return "up";
    }else if(i<0.5){
        return "down";
    }else if(i<0.75){
        return "right";
    }else{
        return "left";
    }
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

function findRandomEmptyCell(_board){
    var i = Math.floor((Math.random() * 22) + 1);
    var j = Math.floor((Math.random() * 22) + 1);
    while(_board[i][j]!=0)
    {
        i = Math.floor((Math.random() * 22) + 1);
        j = Math.floor((Math.random() * 22) + 1);
    }
    return [i,j];
 }

function GetKeyPressed() {
    if (keysDown[38]) {
        return 1;
    }
    if (keysDown[40]) {
        return 2;
    }
    if (keysDown[37]) {
        return 3;
    }
    if (keysDown[39]) {
        return 4;
    }
}

function UpdatePosition() {
    $("#lblScore").text(score);
    _board[shape.i][shape.j]=0;
    var x = GetKeyPressed()
    if(x==1)
    {
        if(shape.j>1 && _board[shape.i][shape.j-1]!=1)
        {
            shape.j--;
            _lastPressedKey = "up";
        }
    }
    if(x==2)
    {
        if(shape.j<22 && _board[shape.i][shape.j+1]!=1)
        {
            shape.j++;
            _lastPressedKey = "down";
        }
    }
    if(x==3)
    {
        if(shape.i>1 && _board[shape.i-1][shape.j]!=1)
        {
            shape.i--;
            _lastPressedKey = "left";
        }
    }
    if(x==4)
    {
        if(shape.i<22 && _board[shape.i+1][shape.j]!=1)
        {
            shape.i++;
            _lastPressedKey = "right";
        }
    }
    checkScores();

    _board[shape.i][shape.j]=2;
    if(_eatenCoins==coins)
    {
        gameOver("coins");
    }
    else
    {

        checkPacmanGhostMeet();
        checkPacmanStarMeet();
        moveGhosts();
        moveStarfish();
        clientDraw()
     }
}

function checkScores(){
    if(_board[shape.i][shape.j]==3)
    {
       score = score+5;
       _eatenCoins++;
    }
    else if(_board[shape.i][shape.j]==4)
      {
           score = score + 15;
           _eatenCoins++;
      }
      else if(_board[shape.i][shape.j]==5)
     {
           score = score + 25;
           _eatenCoins++;
     }
     else if(_board[shape.i][shape.j]==8){
            time = time + 30;
     }
     else if(_board[shape.i][shape.j]==6){
            _pacman_remain++; // add life
            clientAddLife();
    }
}

function checkPacmanStarMeet(){
    if( starFish.isAlive == true && starFish.x == shape.i && starFish.y == shape.j){
       score = score + 50;
       starFish.isAlive = false;
    }
}

function checkPacmanGhostMeet(){
    for(var i=0; i<numOfGhosts; i++){

    var ghost = ghosts[i];
    if(ghost.x == shape.i && ghost.y == shape.j){
        _ghostMeet = true;
            if(_pacman_remain == 0){
                gameOver("gameover");
            }
            else{
                _pacman_remain--;
                var heartDiv = document.getElementById("lives");
                heartDiv.removeChild(heartDiv.lastChild);
                pacmanStrike();
            }
        }
    }
    ghostMeet = false;
}

function gameOver(reason){
     window.clearInterval(interval);
     window.clearInterval(counter);
     _isGameOn = false;
     clientGameOver(reason,false);
}

function meetGhost(){
      var emptyCell = findRandomEmptyCell(_board);
      _board[emptyCell[0]][emptyCell[1]] = 2;
      shape.i = emptyCell[0];
      shape.j = emptyCell[1];
      DrawPacman();
      createGhosts();
      keysDown = {};
      addEventListener("keydown", function (e) {
          keysDown[e.keyCode] = true;
      }, false);
      addEventListener("keyup", function (e) {
          keysDown[e.keyCode] = false;
      }, false);
       interval=setInterval(UpdatePosition, 80);
       time = _timeLeft;
       counter=setInterval(timer, 1000);
       _ghostMeet = false;
}

function pacmanStrike(){
   window.clearInterval(interval);
   window.clearInterval(counter);
   _timeLeft = time;

   var  livesLeft = _pacman_remain +1;
    clientPacmanStrike(livesLeft);
}


// ------------ fixed ------------ //

function timer(){
    time=time-1;
    if (time == 0)
    {
        clearInterval(counter);
        gameOver("time is up");
        return;
    }
    clientGetTime(time);
}

function getPossibleMoves( x,  y){
    var locations = [];
    if(_board[x-1][y] != 1){
        var place = {x: x-1, y: y};
        locations.push(place);
    }
    if(_board[x+1][y]  != 1){
        var place = {x: x+1, y: y};
        locations.push(place);
    }
    if(_board[x][y-1] != 1){
        var place = {x: x, y: y-1};
        locations.push(place);
    } if(_board[x][y+1] != 1){
        var place = {x: x, y: y+1};
        locations.push(place);
    }
    return locations;
}

function getBestMoveForGhost(ghost){
    var locations = getPossibleMoves(ghost.x, ghost.y);
    var lastMax = 1000000000000000000000000;
    var result;
    if(locations.length == 1) return {x: locations[0].x,y: locations[0].y};
    for(var i=0; i < 4; i++){
        if(locations[i] != null){
            var manhaten = Math.sqrt(Math.pow(locations[i].x-shape.i,2)+ Math.pow(locations[i].y-shape.j,2));
            if(manhaten < lastMax && (ghost.prevY != locations[i].y || ghost.prevX != locations[i].x )){
                lastMax = manhaten;
                result = {x: locations[i].x,y: locations[i].y};
            }
        }
    }
    return result;
}

function createGhosts(){
    ghosts = [];
    for (var i = 0; i < numOfGhosts; i++)
    {
        var ghost ={x : boardCorners[i].x,
            y : boardCorners[i].y,
            prevX:  boardCorners[i].x,
            prevY: boardCorners[i].y,
            radius: 10,
            startingX : canvasCorners[i].x,
            startingY : canvasCorners[i].y};

        ghost.imagePath = ghostsPictures[i];
        ghosts.push(ghost);
    }
    clientGetGhost(ghosts,numOfGhosts);
}
