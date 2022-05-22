/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));


type Card = {
  id: string;
  name: string;
};
type Deck = {
  id: string;
  name: string;
  cards: Card[];
};
type DeckObject = {
  id: string;
  deckname: string;
};


let Deck_Data = [
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


function getDeckName(Deck_Data : Deck[]) : string[]{
  const deckNameList : string[] = [] ;
  Deck_Data.map((value, index)=> {
    deckNameList.push(value.name) ;
  });
  return deckNameList
}

let deckNameList : string[] = getDeckName(Deck_Data);
app.get('/decks', (req, res)=>{
  deckNameList = getDeckName(Deck_Data);
  res.send(deckNameList);
});

app.get('/decks/:id', (req, res) =>{
  Deck_Data.map((value, index) => {
    if (value.id === req.params.id){
      res.send(value.cards);
    };
  });
});

const New_Deck : Deck = {
  id : '02',
  name : 'シャウトモン',
  cards : require('/Users/hanakappa/Library/Mobile Documents/com~apple~CloudDocs/20210529_digimon-card-game/deck/deck_riki/シャウトモン.json')
};

app.post('/decks', function(req, res){
  Deck_Data.push(req.body);
  deckNameList.push(req.body.name);
  res.send(deckNameList);
});

let changedCards : Card[] = require('/Users/hanakappa/Library/Mobile Documents/com~apple~CloudDocs/20210529_digimon-card-game/deck/deck_riki/ロードナイトモン-2.json');

app.put('/decks/:id', function(req, res){
  Deck_Data.map((value, index)=>{
    if(value.id === req.params.id){
      value.cards = changedCards;
    };
  });
  deckNameList = getDeckName(Deck_Data);
  res.send(deckNameList);
});


app.delete('/decks/:id', function(req, res){
  Deck_Data = Deck_Data.filter(item => item.id.match(req.params.id)==null);
  deckNameList = getDeckName(Deck_Data);
  res.send(deckNameList);
});





const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
