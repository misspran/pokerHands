var assert = require('assert');
var nock = require('nock');
const {pokerLib, draw } = require('../index')

console.log(pokerLib, draw)


describe('pokerLib', function (){

    let pokeHand1;
    let objResult1;
    before(function(){
        pokeHand1 = { remaining: 47,
            deck_id: 'uz17m10nye6r',
            cards: 
            [ { code: '3S',
                value: '3',
                suit: 'SPADES' },
            { code: '9S',
                value: '9',
                suit: 'SPADES' },
            { code: '9H',
                value: '9',
                suit: 'HEARTS' },
            { code: '7H',
                value: '7',
                suit: 'HEARTS' },
            { code: '9D',
                value: '9',
                suit: 'DIAMONDS' } ],
            success: true 
        };
        objResult1 = {
                handCardSuit: { SPADES: 2, HEARTS: 2, DIAMONDS: 1 },
                handCardValue:{ '3': 1, '7': 1, '9': 3 },
                cardsCode: ['3S', '9S', '9H', '7H', '9D'],
                threesArr: ['9'],
                handValInNum:['3','7', '9']
        };
        
    });

    describe('hand', function(){

        before(function(){
            pokerLib.hand(pokeHand1)
        })

        it('handCardSuit object should equal to {SPADES: 2, HEARTS: 2, DIAMONDS: 1}', function (){
            assert.deepEqual(objResult1.handCardSuit, pokerLib.handCardSuit);
        });

        it("handCardSuit object should equal to { '3': 1, '7': 1, '9': 3 }", function (){
            assert.deepEqual(objResult1.handCardValue, pokerLib.handCardValue);
        });
        it("cardsCode array should equal to ['3S', '9S', '9H', '7H', '9D']", function(){
            assert.deepEqual(objResult1.cardsCode, pokerLib.cardsCode);
        });


    });

    describe('sortHand', function(){

        before(function(){
            pokerLib.sortHand()
        });

        it("threesArr should equal to ['9']", function(){
            assert.equal('9', pokerLib.threesArr[0]);
        });
        it("handValueInNum should equal to ['3', '7','9']", function (){
            assert.deepEqual(objResult1.handValInNum, pokerLib.handValInNum)

        });
    });

});