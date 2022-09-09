const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Let the battle begin!');
});

app.post('/', function (req, res) {
  console.log(req.body);
  const info = req.body;
  const moves = ['F', 'T', 'L', 'R'];
  let findLowestScorePlayer = function(info){

  }
  // TODO add your implementation here to replace the random response
  // let lowestScorePlayer = findLowestScorePlayer(info);
  let arena = info.arena;
  let state = arena.state;
  let lowestScorePlayer = state[0];
  for(let i=0;i<state.length;i++){
    console.log(state[i]);
    if (state[i].score < lowestScorePlayer.score){
      lowestScorePlayer = state[i];
    }
  }
  console.log('LOWEST PLAYER');
  console.log(lowestScorePlayer);
  res.send(moves[1]);


});

app.listen(process.env.PORT || 8080);
