/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import { __values } from 'tslib';

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
type DeckList = {
  id: string;
  deckname: string;
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



app.get('/api', (req, res) => {
  res.status(400).send({ message: 'Welcome to api/tutorial-riki!' });
});

let DeckNameList : DeckList[] ;
app.get('/api/decklist', (req, res)=>{
  DeckData.forEach((value, index, arr)=> {
    DeckNameList[index] = {id : value.id, deckname : value.name} ;
  });
  res.json(DeckNameList);
});

let DirectedId : string = '01';
app.get('/api/deckname', (req, res) =>{
  DeckData.forEach((value, index, arr) => {
    if (value.id === DirectedId){
      res.send(value.name);
    };
  });
});

const NewDeck : Deck = {
  id : '02',
  name : 'シャウトモン',
  cards : require('/Users/hanakappa/Library/Mobile Documents/com~apple~CloudDocs/20210529_digimon-card-game/deck/deck_riki/シャウトモン.json')
};

app.post('/api/newdeck', function(req, res){
  DeckData.push(NewDeck);
  DeckNameList.push({id: NewDeck.id, deckname: NewDeck.name});
  res.json(DeckNameList);
});

let DirectedId2 : string = '02';
let ChangedCards : Card[] = require('/Users/hanakappa/Library/Mobile Documents/com~apple~CloudDocs/20210529_digimon-card-game/deck/deck_riki/ロードナイトモン-2.json');

app.put('/api/put', function(req, res){
  DeckData.forEach((value, index, arr)=>{
    if(value.id === DirectedId2){
      value.cards = ChangedCards;
      DeckNameList[index].deckname = value.name;
    };
  });
  res.json(DeckNameList);
});



const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
