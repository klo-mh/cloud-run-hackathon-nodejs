const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Let the battle begin!');
});

app.post('/', function (req, res) {
  console.log('BODY');
  console.log(req.body);
  const info = req.body;
  const moves = ['F', 'T', 'L', 'R'];
  // TODO add your implementation here to replace the random response
  // let lowestScorePlayer = findLowestScorePlayer(info);
  let arena = info.arena;
  let state = arena.state;
  let lowestScorePlayer = state["https://cloud-run-hackathon-nodejs-ytkkcthfia-uc.a.run.app"];
  for (let [key, value] of Object.entries(state)) {
    console.log("EACH PLAYER");
    console.log(value);
    if (value.score < lowestScorePlayer.score) {
      lowestScorePlayer = value;
    }
  }
  console.log('LOWEST PLAYER');
  console.log(lowestScorePlayer);
  res.send(moves[1]);
});

app.listen(process.env.PORT || 8080);
