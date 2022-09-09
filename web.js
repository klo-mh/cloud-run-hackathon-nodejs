const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Let the battle begin!');
});

app.post('/', function (req, res) {
  console.log('VERSION - 12');
  console.log('BODY');
  console.log(JSON.stringify(req.body));
  const info = req.body;
  // const moves = ['F', 'T', 'L', 'R'];
  const moves = ['F', 'L', 'R'];
  // TODO add your implementation here to replace the random response
  let findLowestScorePlayer = function(myList){
    let lowestScorePlayer = undefined;
    for (let [key, value] of Object.entries(myList)) {
      if (lowestScorePlayer == undefined){
        lowestScorePlayer = value;
      } else {
        if (value.score < lowestScorePlayer.score) {
          lowestScorePlayer = value;
        }
      }
    }
  }
  let findCoordInFront = function (me){
    let x = me.x;
    let y = me.y;
    let d = me.direction;
    let coords = [];
    let newX = x;
    let newY = y;
    if (d == 'W'){
      newX = x+1;
      newY = y;
      coords.push({'x':newX,'y':newY});
      newX = x+2;
      newY = y;
      coords.push({'x':newX,'y':newY});
      newX = x+3;
      newY = y;
      coords.push({'x':newX,'y':newY});
    }
    if (d == 'E'){
      newX = x-1;
      newY = y;
      coords.push({'x':newX,'y':newY});
      newX = x-2;
      newY = y;
      coords.push({'x':newX,'y':newY});
      newX = x-3;
      newY = y;
      coords.push({'x':newX,'y':newY});

    }
    if (d == 'S'){
      newX = x;
      newY = y+1;
      coords.push({'x':newX,'y':newY});
      newX = x;
      newY = y+2;
      coords.push({'x':newX,'y':newY});
      newX = x;
      newY = y+3;
      coords.push({'x':newX,'y':newY});
    }
    if (d == 'N'){
      newX = x;
      newY = y-1;
      coords.push({'x':newX,'y':newY});
      newX = x;
      newY = y-2;
      coords.push({'x':newX,'y':newY});
      newX = x;
      newY = y-3;
      coords.push({'x':newX,'y':newY});
    }
    return coords;
  }
  let isPlayerInFront = function(me,others){
    let shootCoords = findCoordInFront(me);
    console.log('SHOOT COORDS');
    console.log(shootCoords);
    for (let [key, value] of Object.entries(others)) {
      if (value == me){
        continue;
      } else {
        let coord = {'x':undefined,'y':undefined};
        coord.x = value.x;
        coord.y = value.y;
        if (shootCoords[0] && shootCoords[0].x == coord.x && shootCoords[0].y == coord.y){
          return true;
        }
        if (shootCoords[1] && shootCoords[1].x == coord.x && shootCoords[1].y == coord.y){
          return true;
        }
      }
    }
    return false;
  }

  let checkSurrounding = function(me, others){
    let x = me.x;
    let y = me.y;
    let d = me.direction;
    let east = [];
    let north = []
    let west = [];
    let south = [];
    let checkCoordE1 = {'x':x-1,'y':y};
    let checkCoordE2 = {'x':x-2,'y':y};
    let checkCoordE3 = {'x':x-3,'y':y};
    let checkCoordS1 = {'x':x,'y':y+1};
    let checkCoordS2 = {'x':x,'y':y+2};
    let checkCoordS3 = {'x':x,'y':y+3};
    let checkCoordN1 = {'x':x,'y':y-1};
    let checkCoordN2 = {'x':x,'y':y-2};
    let checkCoordN3 = {'x':x,'y':y-3};
    let checkCoordW1 = {'x':x+1,'y':y};
    let checkCoordW2 = {'x':x+2,'y':y};
    let checkCoordW3 = {'x':x+3,'y':y};
    for (let [key, value] of Object.entries(others)) {
      if (value == me){
        continue;
      } else {
        let coord = {'x':undefined,'y':undefined};
        coord.x = value.x;
        coord.y = value.y;
        console.log('DEBUG');
        console.log(checkCoordS2);
        console.log(coord);
        console.log('DEBUG');
        console.log(checkCoordS1);
        console.log(coord);
        if (checkCoordE1.x == coord.x && checkCoordE1.y == coord.y){
          east[0] = 1;
        } else {
          east[0] = 0;
        }
        if (checkCoordE2.x == coord.x && checkCoordE2.y == coord.y){
          east[1] = 1;
        } else {
          east[1] = 0;
        }
        if (checkCoordE3.x == coord.x && checkCoordE3.y == coord.y){
          east[2] = 1;
        } else {
          east[2] = 0;
        }
        if (checkCoordW1.x == coord.x && checkCoordW1.y == coord.y){
          west[0] = 1;
        } else {
          west[0] = 0;
        }
        if (checkCoordW2.x == coord.x && checkCoordW2.y == coord.y){
          west[1] = 1;
        } else {
          west[1] = 0;
        }
        if (checkCoordW3.x == coord.x && checkCoordW3.y == coord.y){
          west[2] = 1;
        } else {
          west[2] = 0;
        }
        if (checkCoordS1.x == coord.x && checkCoordS1.y == coord.y){
          south[0] = 1;
        } else {
          south[0] = 0;
        }
        if (checkCoordS2.x == coord.x && checkCoordS2.y == coord.y){
          south[1] = 1;
        } else {
          south[1] = 0;
        }
        if (checkCoordS3.x == coord.x && checkCoordS3.y == coord.y){
          south[2] = 1;
        } else {
          south[2] = 0;
        }
        if (checkCoordN1.x == coord.x && checkCoordN1.y == coord.y){
          north[0] = 1;
        } else {
          north[0] = 0;
        }
        if (checkCoordN2.x == coord.x && checkCoordN2.y == coord.y){
          north[1] = 1;
        } else {
          north[1] = 0;
        }
        if (checkCoordN3.x == coord.x && checkCoordN3.y == coord.y){
          north[2] = 1;
        } else {
          north[2] = 0;
        }
      }
    }
    return {'north':north,'west':west,'east':east,'south':south};
  }
  let arena = info.arena;
  let dims = arena.dims;
  let state = arena.state;
  let move = 'T';
  let myPlayer = state["https://cloud-run-hackathon-nodejs-ytkkcthfia-uc.a.run.app/"];
  let lowestScorePlayer = findLowestScorePlayer(state);
  //console.log('LOWEST PLAYER');
  //console.log(lowestScorePlayer);
  let playInFront = isPlayerInFront(myPlayer, state);
  console.log('PLAYER IN FRONT OF ME');
  console.log(playInFront);
  let surrounding = checkSurrounding(myPlayer, state);
  console.log('SURROUNDING');
  console.log(surrounding);
  if (myPlayer.wasHit) {
    move = 'F ';
  } else if (playInFront){
    move = 'T';
  } else {
    move = (moves[Math.floor(Math.random() * moves.length)]);
  }
  console.log('MOVE');
  console.log(move);
  res.send(move);
});

app.listen(process.env.PORT || 8080);
