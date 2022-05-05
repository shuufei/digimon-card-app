/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';

const app = express();

type Card = {
  id: string;
  name: string;
};
type Deck = {
  id: string;
  name: string;
  cards: Card[];
};

let DeckData = [
  {
    id : '00',
    name : 'アルファモン',
    cards : require("/Users/hanakappa/Library/Mobile Documents/com~apple~CloudDocs/20210529_digimon-card-game/deck/deck_riki/アルファモン.json")
  },
  {
    id : '01',
    name : 'ジエスモン',
    cards : require("/Users/hanakappa/Library/Mobile Documents/com~apple~CloudDocs/20210529_digimon-card-game/deck/deck_riki/ジエスモン .json")
  }
]

app.get('/api', (req, res)=>{
  let DeckNameList : string[] ;
  DeckData.forEach((value, index, arr)=> {
    DeckNameList[index] = value.name ;
  });
  res.send({message: DeckNameList});
});


app.get('/api', (req, res) => {
  res.status(400).send({ message: 'Welcome to api/tutorial-riki!!!' });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
