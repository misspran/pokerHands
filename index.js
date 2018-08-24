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
        await pokerLib.hand(cards)
        await pokerLib.sortHand()
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
    

    hand: function (obj) {
        for (var i = 0; i< obj.cards.length; i++){
            this.cardsCode.push(obj.cards[i].code)
            if(!this.handCardValue[obj.cards[i].value]){
                this.handCardValue[obj.cards[i].value] = 1;
            }else{
                
                ++this.handCardValue[obj.cards[i].value];
            }
            if(!this.handCardSuit[obj.cards[i].suit]){
                this.handCardSuit[obj.cards[i].suit] = 1;
            }else{
                ++this.handCardSuit[obj.cards[i].suit];
            }
        }
    },
    sortHand: function(){
        
        for( key in this.handCardValue){
            if(this.handCardValue[key]===2){
                this.pairsArr.push(key)
            }
            if(this.handCardValue[key]===3){
                this.threesArr.push(key);
            }
            if(key ==='ACE'){
                this.handValInNum.push(14)
            }else if( key==='JACK'){
                this.handValInNum.push(11)
            }else if(key==='QUEEN'){
                this.handValInNum.push(12);
            }else if(key==='KING'){
                this.handValInNum.push(13)
            }else{
                this.handValInNum.push(Number(key))
            }
        }
        
        this.handValInNum = this.handValInNum.sort(function(a, b){return a-b})
        return this.handValInNum;
        

    },

   
    straightFlush: function() {
      if(this.flush() && this.straight()){
          return true;
      }else{
          return false;
      }
    },
    fourOfKind: function(){
        for(suit in this.handCardValue){
            if(this.handCardValue[suit] === 4){
                return true;
            }
        }
        return false;
    },
    fullHouse: function(){
        if(this.pairsArr.length && this.threesArr.length){
            return true;
        }else{
            return false;
        }

    },

    flush:function(){
        for( suit in this.handCardSuit){
            if(this.handCardSuit[suit] === 5){
                return true;
            }   
        }
        return false;
    },
    straight: function(){
        if(this.handValInNum.length === 5){
            if(this.handCardValue[0]===2 && this.handCardValue[4]===14){
                for(var j= 0; j<3;j++){
                    if(this.handValInNum[i] +1 !==  this.handValInNum[i+1]){
                        
                        return false;
                    }
                }
                return true
            }
            for(var i = 0; i< 4; i++){
                if(this.handValInNum[i] +1 !==  this.handValInNum[i+1]){
                    
                    return false;
                }
                return true;
            }
        }else{
            return false;
        }
    },
   
    pairsAndThreesOrHighCard: function (){
    
        if(this.threesArr.length){
            console.log(`3 of a Kind, ${this.threesArr[0]}`)
            return '3 of a kind';
        }else if(this.pairsArr.length){
            if(this.pairsArr.length > 1){
                console.log(`2 Pairs, ${this.pairsArr[0]} & ${this.pairsArr[1]}`);
                return '2 Pairs';

            }else{
                console.log(`1 Pair, ${this.pairsArr[0]}`)
            return '1 Pair';

            }
           
        }else{
            console.log('High Card');
            return 'High Card';
        }
    },
    calculateHand: function(){
        const cardsHandString = this.cardsCode.join(', ')
        console.log(`Poker Hand: ${cardsHandString}`)

        switch (true) {
            case this.straightFlush():
                console.log("Straight Flush");
                break;
            case this.fourOfKind():
                console.log("Four of a Kind");
                break;
            case this.fullHouse():
                console.log("Full House");
                break;
            case this.flush():
                console.log("Flush");
                break;
            case this.straight():
                console.log("Straight");
                break;
            default:
                this.pairsAndThreesOrHighCard();;
        }
    }
}

module.exports = {pokerLib, draw};
