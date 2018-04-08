
//region ** Game Variables **
var boardCorners = [{x : 1, y : 1} , { x : 21, y : 1 }, { x : 21, y : 21 }];
var canvasCorners = [{x : 30, y : 30} , { x : 430, y : 30 }, { x : 430, y : 430 }];
var ghosts = [];
var pacman=new Object();
var starFish;
var _ghostMoveModolu = 0;
var coins,_eatenCoins;
var time,_timeLeft, score;
var counter, _ghostMeet;
var _board,interval;
var numOfGhosts, _pacman_remain;
//endregion


function get_message(json){
     msg =JSON.parse(json);
    var param = msg.parameters
    switch (msg.messageType) {
        case "Start":
            Start(param.client_time,param.coins,param.numOfGhosts);
            break;
        case "user_pressed_the_start_game_button":
            Start();
            break;
    }
}

function send_message(json){
    client_get_message(json);
}

function ServerBuildJson(functionName,param) {

    var msg =  '{ "messageType" : "' + functionName +
        '" , "parameters" : { ' + param + ' }' +
        '}';

    return msg;
}

//region ** Flow Functionality **
function Start(ctime,ccoins,cnumOfGhost) {
    _isGameOn = true;
    score = 0;
     _eatenCoins=0;
    time = ctime;
    numOfGhosts = cnumOfGhost;
    coins = ccoins;
    _ghostMeet = false;
    _pacman_remain = 2;

    initBoard();
    createStarFish();
    placePacmanInRandomCell();
    fillPoints();
    createGhosts();

    // keysDown = {};
    // addEventListener("keydown", function (e) {keysDown[e.keyCode] = true;}, false);
    // addEventListener("keyup", function (e) {keysDown[e.keyCode] = false;}, false);
    interval=setInterval(UpdatePosition, 90);

    }

function UpdatePosition() {
    updateScore(score);
    _board[pacman.i][pacman.j]=0;
    updateBoard(0,pacman.i,pacman.j);
    var x = GetKeyPressed();
    if(x==1) {
        if(pacman.j>1 && _board[pacman.i][pacman.j-1]!=1) {
            pacman.j--;
            updatePacmanLocation(pacman.i,pacman.j,"up");
        }
    }
    if(x==2) {
        if(pacman.j<22 && _board[pacman.i][pacman.j+1]!=1) {
            pacman.j++;
            updatePacmanLocation(pacman.i,pacman.j,"down");
        }
    }
    if(x==3) {
        if(pacman.i>1 && _board[pacman.i-1][pacman.j]!=1) {
            pacman.i--;
            updatePacmanLocation(pacman.i,pacman.j,"left");
        }
    }
    if(x==4) {
        if(pacman.i<22 && _board[pacman.i+1][pacman.j]!=1) {
            pacman.i++;
            updatePacmanLocation(pacman.i,pacman.j,"right");
        }
    }

    checkScores();
    _board[pacman.i][pacman.j]=2;
    updateBoard(2,pacman.i,pacman.j);

    if(_eatenCoins==coins) {
        gameOver("coins");
    }
    else {
        checkPacmanGhostMeet();
        checkPacmanStarMeet();
        moveGhosts();
        moveStarfish();
        Draw()
     }
}

function checkScores(){
    if(_board[pacman.i][pacman.j]===3) {
       score = score+5;
       _eatenCoins++;
    }
    else if(_board[pacman.i][pacman.j]===4) {
        score = score + 15;
        _eatenCoins++;
    }
    else if(_board[pacman.i][pacman.j]===5) {
        score = score + 25;
        _eatenCoins++;
    }
    else if(_board[pacman.i][pacman.j]===8){
        time = time + 30;
    }
    else if(_board[pacman.i][pacman.j]===6){
        _pacman_remain++; // add life
        updateLife("up");
    }
}

function timer(){
    time=time-1;
    if (time == 0)
    {
        clearInterval(counter);
        gameOver("time is up");
        return;
    }
    updateTime(time);
}

function gameOver(reason){
    window.clearInterval(interval);
    window.clearInterval(counter);
    _isGameOn = false;
    clientGameOver(reason,false);
}
//endregion

//region ** Init Board **
function initBoard(){
    counter = setInterval(timer, 1000);
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

    var param = '"board" :' + JSON.stringify(_board);
    send_message(ServerBuildJson("clientCreateBoard",param));
    //clientCreateBoard(_board);

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
            updateBoard(3,emptyCell[0],emptyCell[1]);
            whitePoints--;
        } else if(pinkPoints>0){
            _board[emptyCell[0]][emptyCell[1]] = 4;
            updateBoard(4,emptyCell[0],emptyCell[1]);
            pinkPoints--;
        } else if(orangePoints >0){
            _board[emptyCell[0]][emptyCell[1]] = 5;
            updateBoard(5,emptyCell[0],emptyCell[1]);
            orangePoints--;
        }
        food_remain--;
    }
    var emptyCell = findRandomEmptyCell(_board);
    _board[emptyCell[0]][emptyCell[1]] = 8; // Extra
    updateBoard(8,emptyCell[0],emptyCell[1]);
    var emptyCell2 = findRandomEmptyCell(_board);
    _board[emptyCell2[0]][emptyCell2[1]] = 6; // Extra Life
    updateBoard(6,emptyCell2[0],emptyCell2[1]);
}
//endregion

//region ** Move Functionality **


function placePacmanInRandomCell() {
    var emptyCell = findRandomEmptyCell(_board);
    _board[emptyCell[0]][emptyCell[1]] = 2;
    pacman.i = emptyCell[0];
    pacman.j = emptyCell[1];
    updatePacmanLocation(pacman.i,pacman.j,"");
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

function pacmanStrike(){
    window.clearInterval(interval);
    window.clearInterval(counter);
    _timeLeft = time;

    var  livesLeft = _pacman_remain +1;
    clientPacmanStrike(livesLeft);
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

// function keyDown(e) {
//     if (typeof keyMap[e.keyCode] !== "undefined") {
//         due = keyMap[e.keyCode];
//         e.preventDefault();
//         e.stopPropagation();
//         return false;
//     }
//     return true;
// }
//endregion

//region ** StarFish Functionality **
function createStarFish() {
    starFish = {
        x: 1,
        y: 21,
        prevX: 1,
        prevY: 21,
        boardX: 30,
        boardY: 430,
        isAlive: true,
    };
    getStarFish(starFish)
}

function checkPacmanStarMeet(){
    if( starFish.isAlive == true && starFish.x == pacman.i && starFish.y == pacman.j){
        score = score + 50;
        starFish.isAlive = false;
        updateStarFishAlive(false);
    }
}

function moveStarfish(){
    if(starFish.isAlive == true) {
        if( _ghostMoveModolu % 5 == 0){
            var locations = getPossibleMoves(starFish.x,starFish.y);
            if(locations.length == 1){
                starFish.prevX = starFish.x;
                starFish.prevY = starFish.y;
                starFish.x =  locations[0].x;
                starFish.y = locations[0].y;
                updateStarFishLocation(starFish.x,starFish.y);
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
                        updateStarFishLocation(starFish.x,starFish.y);
                    }
                }
            }
        }
        if(starFish.x == pacman.i && starFish.y == pacman.j){
            checkPacmanStarMeet();
        }
    }
}
//endregion

//region ** Ghost Functionality **
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

        ghosts.push(ghost);
    }
    getGhost(ghosts);
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
            updateGhostLocation(i,g.x,g.y);
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
            var manhaten = Math.sqrt(Math.pow(locations[i].x-pacman.i,2)+ Math.pow(locations[i].y-pacman.j,2));
            if(manhaten < lastMax && (ghost.prevY != locations[i].y || ghost.prevX != locations[i].x )){
                lastMax = manhaten;
                result = {x: locations[i].x,y: locations[i].y};
            }
        }
    }
    return result;
}

function checkPacmanGhostMeet(){
    for(var i=0; i<numOfGhosts; i++){

        var ghost = ghosts[i];
        if(ghost.x == pacman.i && ghost.y == pacman.j){
            _ghostMeet = true;
            if(_pacman_remain == 0){
                gameOver("gameover");
            }
            else{
                _pacman_remain--;
                updateLife("down");
                pacmanStrike();
            }
        }
    }
    ghostMeet = false;
}

function meetGhost(){
    placePacmanInRandomCell();
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
//endregion