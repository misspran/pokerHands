const axios = require('axios');


const cardsVal = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING', 'ACE'];
const suite = ['HEARTS', 'SPADES', 'DIAMONDS', 'CLUBS'];

// shuffle new deck https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
//draw 5 cards https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=5


let draw = async () =>{
    try{
        const response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        const deck = await response.data.deck_id;
        const draw_response = await axios.get(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=5`);
       return draw_response.data;

    }
    catch (err){
        console.log(err)
    }

}
draw()






// axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
//   .then(response => 
//     console.log(response.data)
    
//   )
//   .catch(error => {
//     console.log(error);
//   });

// axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=5`)
// .then(response => 
//     console.log(response.data)
//   )
//   .catch(error => {
//     console.log(error);
//   });