const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Let the battle begin!');
});

app.post('/', function (req, res) {
  console.log('VERSION - 6');
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
    }
    if (d == 'E'){
      newX = x-1;
      newY = y;
      coords.push({'x':newX,'y':newY});
      newX = x-2;
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
    }
    if (d == 'N'){
      newX = x;
      newY = y-1;
      coords.push({'x':newX,'y':newY});
      newX = x;
      newY = y-2;
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
  if (playInFront){
    move = 'T';
  } else {
    move = (moves[Math.floor(Math.random() * moves.length)]);

  }
  move = 'W';
  console.log('MOVE');
  console.log(move);
  res.send(move);
});

app.listen(process.env.PORT || 8080);
