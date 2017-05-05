/* Human readable keyCode index */
var KEY = {'BACKSPACE': 8, 'TAB': 9, 'NUM_PAD_CLEAR': 12, 'ENTER': 13, 'SHIFT': 16, 'CTRL': 17, 'ALT': 18, 'PAUSE': 19, 'CAPS_LOCK': 20, 'ESCAPE': 27, 'SPACEBAR': 32, 'PAGE_UP': 33, 'PAGE_DOWN': 34, 'END': 35, 'HOME': 36, 'ARROW_LEFT': 37, 'ARROW_UP': 38, 'ARROW_RIGHT': 39, 'ARROW_DOWN': 40, 'PRINT_SCREEN': 44, 'INSERT': 45, 'DELETE': 46, 'SEMICOLON': 59, 'WINDOWS_LEFT': 91, 'WINDOWS_RIGHT': 92, 'SELECT': 93, 'NUM_PAD_ASTERISK': 106, 'NUM_PAD_PLUS_SIGN': 107, 'NUM_PAD_HYPHEN-MINUS': 109, 'NUM_PAD_FULL_STOP': 110, 'NUM_PAD_SOLIDUS': 111, 'NUM_LOCK': 144, 'SCROLL_LOCK': 145, 'SEMICOLON': 186, 'EQUALS_SIGN': 187, 'COMMA': 188, 'HYPHEN-MINUS': 189, 'FULL_STOP': 190, 'SOLIDUS': 191, 'GRAVE_ACCENT': 192, 'LEFT_SQUARE_BRACKET': 219, 'REVERSE_SOLIDUS': 220, 'RIGHT_SQUARE_BRACKET': 221, 'APOSTROPHE': 222};

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

var starFish = {
        x: 1,
        y : 21,
        prevX: 1,
        prevY: 21,
        boardX: 30 ,
        boardY: 430,
        img: "./img/starfish.png",
        isAlive: true,
}

keyMap[KEY.ARROW_LEFT]  = LEFT;
keyMap[KEY.ARROW_UP]    = UP;
keyMap[KEY.ARROW_RIGHT] = RIGHT;
keyMap[KEY.ARROW_DOWN]  = DOWN;

var _ghostMoveModolu = 0;
var eatenCoins =0;
var counter=setInterval(timer, 1000);
var ghostsPictures =["./img/pinki.ico", "./img/redi.png", "./img/blui.ico"];

var shape=new Object();

var _lastPressedKey;

var _board =  [
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
var score;
var pac_color = "yellow";
var start_time;
var time_elapsed;
var interval;
var state   = WAITING;

/* Human readable keyCode index */
var KEY = {'BACKSPACE': 8, 'TAB': 9, 'NUM_PAD_CLEAR': 12, 'ENTER': 13, 'SHIFT': 16, 'CTRL': 17, 'ALT': 18, 'PAUSE': 19, 'CAPS_LOCK': 20, 'ESCAPE': 27, 'SPACEBAR': 32, 'PAGE_UP': 33, 'PAGE_DOWN': 34, 'END': 35, 'HOME': 36, 'ARROW_LEFT': 37, 'ARROW_UP': 38, 'ARROW_RIGHT': 39, 'ARROW_DOWN': 40, 'PRINT_SCREEN': 44, 'INSERT': 45, 'DELETE': 46, 'SEMICOLON': 59, 'WINDOWS_LEFT': 91, 'WINDOWS_RIGHT': 92, 'SELECT': 93, 'NUM_PAD_ASTERISK': 106, 'NUM_PAD_PLUS_SIGN': 107, 'NUM_PAD_HYPHEN-MINUS': 109, 'NUM_PAD_FULL_STOP': 110, 'NUM_PAD_SOLIDUS': 111, 'NUM_LOCK': 144, 'SCROLL_LOCK': 145, 'SEMICOLON': 186, 'EQUALS_SIGN': 187, 'COMMA': 188, 'HYPHEN-MINUS': 189, 'FULL_STOP': 190, 'SOLIDUS': 191, 'GRAVE_ACCENT': 192, 'LEFT_SQUARE_BRACKET': 219, 'REVERSE_SOLIDUS': 220, 'RIGHT_SQUARE_BRACKET': 221, 'APOSTROPHE': 222};
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

var pacman_remain = 3;
var contex = canvas.getContext("2d");

function Start() {
                score = 0;
                var cnt = 100;


                start_time= new Date();

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
                 interval=setInterval(UpdatePosition, 80);
            }

function moveStarfish(){
        var locations = getPossibleMoves(starFish.x,starFish.y);
        var rnd = Math.floor((Math.random() * locations.length));

        starFish.x = locations[rnd].x;
        starFish.y = locations[rnd].y;
}

function drawStarfish(){
        var locations = getPossibleMoves(starFish.x,starFish.y);
        var rnd = Math.floor((Math.random() * locations.length));

        var imageObj = new Image();
                   imageObj.width = "20px";
                   imageObj.height = "20px";
                   imageObj.src = starFish.img;
                   contex.drawImage(imageObj, starFish.x*20+10 - 10, starFish.y*20+10 - 10 , 20, 20);
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
}
function createGhosts(){
    for (var i = 0; i < numOfGhosts; i++)
    {
        if (ghosts[i] == null)
        {
            var ghost = {x : boardCorners[i+1].x, y : boardCorners[i+1].y, prevX:  boardCorners[i+1].x, prevY: boardCorners[i+1].y,
             radius: 10,  startingX : canvasCorners[i+1].x, startingY : canvasCorners[i+1].y};

            ghost.imagePath = ghostsPictures[i];
            ghost.isAlive = true;

            ghosts.push(ghost)
        }
    }
}
function DrawGhosts(){
    for(var i = 0; i < numOfGhosts; i++)
    {
        var ghost = ghosts[i];
            var imageObj = new Image();
            imageObj.width = "20px";
            imageObj.height = "20px";
            imageObj.src = ghost.imagePath;
            contex.drawImage(imageObj, ghost.x*20+10 - ghost.radius, ghost.y*20+10 -ghost.radius , 20, 20);
    }
}
function DrawPacman() {
    lblScore.value = score;
    lblTime.value = time_elapsed;
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
function moveGhosts(){
    _ghostMoveModolu = _ghostMoveModolu + 1 ;

        for (var i = 0; i < numOfGhosts; i++)
        {
            if( _ghostMoveModolu % 5 == i){
                var g = ghosts[i];

                var bestMove = getBestMoveForGhost(g);
                g.prevX = g.x;
                g.prevY = g.y;
                g.x = bestMove.x;
                g.y = bestMove.y;
        }
    }
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

function keyDown(e) {
if (typeof keyMap[e.keyCode] !== "undefined") {
    due = keyMap[e.keyCode];
    e.preventDefault();
    e.stopPropagation();
    return false;
}
return true;
};

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
    if(_board[shape.i][shape.j]==3)
    {
       score = score+5;
       eatenCoins++;
    }
    else if(_board[shape.i][shape.j]==4)
      {
           score = score + 15;
           eatenCoins++;
      }
      else if(_board[shape.i][shape.j]==5)
     {
           score = score + 25;
           eatenCoins++;
     }
    _board[shape.i][shape.j]=2;
    var currentTime=new Date();
    time_elapsed=(currentTime-start_time)/1000;
    if(eatenCoins==coins)
    {
        gameOver("coins");
    }
    else
    {
            DrawBoard();
            DrawPacman();
            DrawPoints();
            DrawGhosts();
            drawStarfish();
            moveGhosts();
            moveStarfish();
            checkPacmanGhostMeet();
     }
}

function gameOver(reason){
     window.clearInterval(interval);
    if(reason == "coins"){
        window.alert("Game completed");
    } else if(reason == "gameover"){
            window.alert("GAME OVER");
    }
}

function checkPacmanGhostMeet(){

    for(var i=0; i<numOfGhosts; i++){

    var ghost = ghosts[i];
    if(ghost.x == shape.i && ghost.y == shape.j){
        gameOver("gameover");
        }
    }
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
        }
    }
}

