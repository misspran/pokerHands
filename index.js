const axios = require('axios');

const cardsVal = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING', 'ACE'];
const suite = ['HEARTS', 'SPADES', 'DIAMONDS', 'CLUBS'];

let cards;
let draw = async () =>{
    try{
        const response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        const deck = await response.data.deck_id;
        const draw_response = await axios.get(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=5`);
        cards = await draw_response.data;
       // await console.log(cards)
        await pokerLib.hand(cards)
        await pokerLib.sortHand()
       // await console.log(pokerLib.handValInNum, pokerLib.pairsArr)
        pokerLib.calculateHand();
    }
    catch (err){
        console.log(err)
    }

}
 draw()

let pokerLib = {
    handCardValue: {},
    handCardSuit: {},
    cardsCode: [],
    pairsArr:[],
    threesArr:[],
    handValInNum: [],

    hand: (obj) =>{
    
        
        for (var i = 0; i< obj.cards.length; i++){
            pokerLib.cardsCode.push(obj.cards[i].code)
            if(!pokerLib.handCardValue[obj.cards[i].value]){
                pokerLib.handCardValue[obj.cards[i].value] = 1;
            }else{
                
                ++pokerLib.handCardValue[obj.cards[i].value];
            }
            if(!pokerLib.handCardSuit[obj.cards[i].suit]){
                pokerLib.handCardSuit[obj.cards[i].suit] = 1;
            }else{
                ++pokerLib.handCardSuit[obj.cards[i].suit];
            }
        }
        
      
        
       // console.log(pokerLib.handCardSuit, pokerLib.handCardValue, pokerLib.cardsCode, pokerLib.handValInNum)
    
    },
    sortHand: ()=>{
        
        
        for( key in pokerLib.handCardValue){
            if(pokerLib.handCardValue[key]===2){
                pokerLib.pairsArr.push(key)
            }
            if(pokerLib.handCardValue[key]===3){
                pokerLib.threesArr.push(key);
            }
            if(key ==='ACE'){
                pokerLib.handValInNum.push(14)
            }else if( key==='JACK'){
                pokerLib.handValInNum.push(11)
            }else if(key==='QUEEN'){
                pokerLib.handValInNum.push(12);
            }else if(key==='KING'){
                pokerLib.handValInNum.push(13)
            }else{
                pokerLib.handValInNum.push(Number(key))
            }
        }
        
        pokerLib.handValInNum = pokerLib.handValInNum.sort(function(a, b){return a-b})
        return pokerLib.handValInNum;
        

    },

   
    straightFlush: () =>{
      if(pokerLib.flush() && pokerLib.straight()){
          return true;
      }else{
          return false;
      }
    },
    fourOfKind: () =>{
        for(suit in pokerLib.handCardValue){
            if(pokerLib.handCardValue[suit] === 4){
                return true;
            }
        }
        return false;
    },
    fullHouse: () => {
        if(pokerLib.pairsArr.length && pokerLib.threesArr.length){
            console.log('full house');
            return true;
        }else{
            return false;
        }

    },

    flush:()=>{
        for( suit in this.handCardSuit){
            if(this.handCardSuit[suit] = 5){
                return true;
            }   
        }
        return false;
    },
    straight: ()=>{
        console.log(pokerLib.handValInNum)
        if(pokerLib.handValInNum.length === 5){
            if(pokerLib.handCardValue[0]===2 && pokerLib.handCardValue[4]===14){
                for(var j= 0; j<pokerLib.handCardValue-2;j++){
                    if(pokerLib.handValInNum[i] +1 !==  pokerLib.handValInNum[i+1]){
                        console.log('false');
                        return false;
                    }
                }
                return true
            }
            for(var i = 0; i< pokerLib.handValInNum-1; i++){
                if(pokerLib.handValInNum[i] +1 !==  pokerLib.handValInNum[i+1]){
                    console.log('false');
                    return false;
                }
                return true;
            }

        }else{
            return false;
        }
    },
   
    pairsAndThreesOrHighCard: ()=>{
    
        if(pokerLib.threesArr.length){
            console.log(`3 of a Kind, ${pokerLib.threesArr[0]}`)
            return '3 of a kind';
        }else if(pokerLib.pairsArr.length){
            if(pokerLib.pairsArr.length > 1){
                console.log(`2 Pairs, ${pokerLib.pairsArr[0]} & ${pokerLib.pairsArr[1]}`);
                return '2 Pairs';

            }else{
                console.log(`1 Pair, ${pokerLib.pairsArr[0]}`)
            return '1 Pairs';

            }
           
        }else{
            console.log('High Card');
            return pokerLib.handValInNum[4];
        }
    },
    calculateHand: () =>{
        const cardsHandString = pokerLib.cardsCode.join(', ')
        console.log(`Poker Hand: ${cardsHandString}`)

        switch (true) {
            case pokerLib.straightFlush():
                console.log("Straight Flush");
                break;
            case pokerLib.fourOfKind():
                console.log("Four of a Kind");
                break;
            case pokerLib.fullHouse():
                console.log("Full House");
                break;
            case pokerLib.flush():
                console.log("Flush");
                break;
            case pokerLib.straight():
                console.log("Straight");
                break;
            default:
                pokerLib.pairsAndThreesOrHighCard();;
        }
    }
}

module.exports = {pokerLib, draw};
