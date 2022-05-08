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

function GetDeckName(DeckList : Deck[]){
  let DeckNameList : DeckList[] = new Array();
  DeckData.forEach((value, index, arr)=> {
    DeckNameList.push({id : value.id, deckname : value.name}) ;
  });
  return DeckNameList
}

let DeckNameList : DeckList[] = new Array();
app.get('/api/decklist', (req, res)=>{
  DeckNameList = GetDeckName(DeckData);
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

app.put('/api/deck_change', function(req, res){
  DeckData.forEach((value, index, arr)=>{
    if(value.id === DirectedId2){
      value.cards = ChangedCards;
    };
  });
  DeckNameList = GetDeckName(DeckData);
  res.json(DeckNameList);
});

let DirectedId3 : string = '01';
app.delete('/api/delete', function(req, res){
  DeckData = DeckData.filter(item => item.id.match(DirectedId3)==null);
  DeckNameList = GetDeckName(DeckData);
  res.json(DeckNameList);
});




const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
