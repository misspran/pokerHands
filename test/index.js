const assert = require('assert');
const {pokerLib, draw } = require('../index')


describe('pokerLib', function (){
  
        const pokeHand1 = { remaining: 47,
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
        const objResult1 = {
                handCardSuit: { SPADES: 2, HEARTS: 2, DIAMONDS: 1 },
                handCardValue:{ '3': 1, '7': 1, '9': 3 },
                cardsCode: ['3S', '9S', '9H', '7H', '9D'],
                threesArr: ['9'],
                handValInNum:[3, 7, 9]
        };

        const pokeHand2 = { remaining: 47,
            deck_id: 'uz17m10nye6r',
            cards: 
            [ { code: 'JS',
                value: 'JACK',
                suit: 'SPADES' },
            { code: '9S',
                value: '9',
                suit: 'SPADES' },
            { code: 'JH',
                value: 'JACK',
                suit: 'HEARTS' },
            { code: '7C',
                value: '7',
                suit: 'CLUBS' },
            { code: '9D',
                value: '9',
                suit: 'DIAMONDS' } ],
            success: true 
        };
        const objResult2 = {
            handCardSuit: { SPADES: 2, HEARTS: 1, DIAMONDS: 1, CLUBS:1 },
            handCardValue:{ 'JACK': 2,'9': 2, '7':1 },
            cardsCode: ['JS', '9S', 'JH', '7C', '9D'],
            pairsArr: ['J', '9'],
            handValInNum:[7, 9, 11]
    };
    
    let newPokerLib = Object.assign({}, pokerLib);;
    describe('hand', function(){
        
        before(function(){
            newPokerLib.hand(pokeHand1)
            newPokerLib.sortHand()
            
        })
        after(function(){
            newPokerLib.handCardSuit = {},
            newPokerLib.handCardValue = {},
            newPokerLib.handValInNum = [],
            newPokerLib.cardsCode = [],
            newPokerLib.threesArr = [],
            newPokerLib.pairsArr = []
        })
       

        it('handCardSuit object should equal to {SPADES: 2, HEARTS: 2, DIAMONDS: 1}', function (){
            assert.deepEqual(objResult1.handCardSuit, newPokerLib.handCardSuit);
        });

        it("handCardSuit object should equal to { '3': 1, '7': 1, '9': 3 }", function (){
            assert.deepEqual(objResult1.handCardValue, newPokerLib.handCardValue);
        });
        it("cardsCode array should equal to ['3S', '9S', '9H', '7H', '9D']", function(){
            assert.deepEqual(objResult1.cardsCode, newPokerLib.cardsCode);
        });


    });

    describe('sortHand', function(){

        afterEach(function(){
            newPokerLib.handCardSuit = {},
            newPokerLib.handCardValue = {},
            newPokerLib.handValInNum = [],
            newPokerLib.cardsCode = [],
            newPokerLib.threesArr = [],
            newPokerLib.pairsArr = []
        })

        it("pairsArr should equal to [ '9', 'JACK']", function(){
            newPokerLib.hand(pokeHand2)
            newPokerLib.sortHand(pokeHand2)
            assert.deepEqual(['9', 'JACK'], newPokerLib.pairsArr);
        });
        it("threesArr should equal to ['9']", function (){
            newPokerLib.hand(pokeHand1)
            newPokerLib.sortHand(pokeHand1)
            assert.equal('9', newPokerLib.threesArr[0])
        })
        it("handValueInNum should equal to [7, 9, 11]", function (){
            newPokerLib.hand(pokeHand2)
            newPokerLib.sortHand(pokeHand2)
            assert.deepEqual(objResult2.handValInNum, newPokerLib.handValInNum)

        });
        
    });
 
   
            let pokeHand3 = { remaining: 47,
                deck_id: 'uz17m10nye6r',
                cards: 
                [ { code: '3S',
                    value: '3',
                    suit: 'SPADES' },
                { code: '4S',
                    value: '4',
                    suit: 'SPADES' },
                { code: '5S',
                    value: '5',
                    suit: 'SPADES' },
                { code: '6S',
                    value: '6',
                    suit: 'SPADES' },
                { code: '7S',
                    value: '7',
                    suit: 'SPADES' } ],
                success: true 
            };
            let pokeHand4 = { remaining: 47,
                deck_id: 'uz17m10nye6r',
                cards: 
                [ { code: '3S',
                    value: '3',
                    suit: 'SPADES' },
                { code: '4S',
                    value: '4',
                    suit: 'SPADES' },
                { code: '5S',
                    value: '5',
                    suit: 'SPADES' },
                { code: '2S',
                    value: '2',
                    suit: 'SPADES' },
                { code: 'AS',
                    value: 'ACE',
                    suit: 'SPADES' } ],
                success: true 
            };

    describe('straightFlush', function(){
       
        beforeEach(function(){
            objResult3 = {
                handCardSuit: { SPADES: 5 },
                handCardValue:{ '3': 1, '4': 1, '5':1, '6': 1, '7': 1 },
                cardsCode: ['3S', '4S', '5S', '6S', '7S'],
                handValInNum:[3, 4, 5, 6, 7],
            };
            objResult4 = {
                handCardSuit: { SPADES: 5 },
                handCardValue:{ '3': 1, '4': 1, '5':1, '2': 1, 'ACE': 1 },
                cardsCode: ['2S','3S', '4S', '5S', '6S', 'S'],
                handValInNum:[2, 3, 4, 5, 14],
            };
            newPokerLib.handCardSuit = {},
            newPokerLib.handCardValue = {},
            newPokerLib.handValInNum = [],
            newPokerLib.cardsCode = [],
            newPokerLib.threesArr = [],
            newPokerLib.pairsArr = []
        })

        it('Should return true for a flush, straight, and straight flush', function(){
            newPokerLib.hand(pokeHand3)
            newPokerLib.sortHand()
            
            assert.equal(true, newPokerLib.flush())
            assert.equal(true, newPokerLib.straight())
            assert.equal(true, newPokerLib.straightFlush())
            assert.deepEqual(objResult3.handValInNum, newPokerLib.handValInNum)
        })
        it('Should return true for a flush, straight, and straight flush with ace starting', function(){
            newPokerLib.hand(pokeHand4)
            newPokerLib.sortHand()
            
            assert.equal(true, newPokerLib.flush())
            assert.equal(true, newPokerLib.straight())
            assert.equal(true, newPokerLib.straightFlush())
            assert.deepEqual(objResult4.handValInNum, newPokerLib.handValInNum)
        })
    })

    const pokeHand5 = { remaining: 47,
        deck_id: 'uz17m10nye6r',
        cards: 
        [ { code: 'AS',
            value: 'ACE',
            suit: 'SPADES' },
        { code: '3S',
            value: '3',
            suit: 'SPADES' },
        { code: 'AH',
            value: 'ACE',
            suit: 'HEARTS' },
        { code: 'AC',
            value: 'ACE',
            suit: 'CLUBS' },
        { code: 'AD',
            value: 'ACE',
            suit: 'DIAMONDS' } ],
        success: true 
    };

    describe('fourOfKind', function(){
        beforeEach(function(){
            newPokerLib.handCardSuit = {},
            newPokerLib.handCardValue = {},
            newPokerLib.handValInNum = [],
            newPokerLib.cardsCode = [],
            newPokerLib.threesArr = [],
            newPokerLib.pairsArr = []

            objResult5 = {
                handCardSuit: { SPADES: 2, HEARTS: 1, DIAMONDS: 1, CLUBS:1 },
                handCardValue:{ '3': 1, 'ACE': 4 },
                cardsCode: ['3S', 'AC', 'AH', 'AD', 'AS'],
                handValInNum:[3, 14],
            };



        })

        it('Should return true for four of a kind', function(){
            newPokerLib.hand(pokeHand5);
            newPokerLib.sortHand()

            assert.equal(true, newPokerLib.fourOfKind())
            assert.equal(objResult5.handCardValue['ACE'], newPokerLib.handCardValue['ACE'])
        })
    })

    const pokeHand6 = { remaining: 47,
        deck_id: 'uz17m10nye6r',
        cards: 
        [ { code: 'AS',
            value: 'ACE',
            suit: 'SPADES' },
        { code: '3S',
            value: '3',
            suit: 'SPADES' },
        { code: 'AH',
            value: 'ACE',
            suit: 'HEARTS' },
        { code: '3C',
            value: '3',
            suit: 'CLUBS' },
        { code: 'AD',
            value: 'ACE',
            suit: 'DIAMONDS' } ],
        success: true 
    };

    describe('fullHouse', function(){
        beforeEach(function(){
            newPokerLib.handCardSuit = {},
            newPokerLib.handCardValue = {},
            newPokerLib.handValInNum = [],
            newPokerLib.cardsCode = [],
            newPokerLib.threesArr = [],
            newPokerLib.pairsArr = []

            objResult6 = {
                handCardSuit: { SPADES: 2, HEARTS: 1, DIAMONDS: 1, CLUBS:1 },
                handCardValue:{ '3': 2, 'ACE': 3 },
                cardsCode: ['3S', '3C', 'AH', 'AD', 'AS'],
                handValInNum:[3, 14],
                threesArr:['ACE'],
                pairsArr:['3']
            };



        })

        it('Should return true for full house', function(){
            newPokerLib.hand(pokeHand6);
            newPokerLib.sortHand()

            assert.equal(true, newPokerLib.fullHouse())
            assert.deepEqual(objResult6.threesArr, newPokerLib.threesArr)
            assert.deepEqual(objResult6.pairsArr, newPokerLib.pairsArr)
            
        })
    })

    let pokeHand7 = { remaining: 47,
        deck_id: 'uz17m10nye6r',
        cards: 
        [ { code: 'QS',
            value: 'Queen',
            suit: 'SPADES' },
        { code: '4S',
            value: '4',
            suit: 'SPADES' },
        { code: '5S',
            value: '5',
            suit: 'SPADES' },
        { code: '2S',
            value: '2',
            suit: 'SPADES' },
        { code: 'AS',
            value: 'ACE',
            suit: 'SPADES' } ],
        success: true 
    };

    describe('flush', function(){
        beforeEach(function(){
            newPokerLib.handCardSuit = {},
            newPokerLib.handCardValue = {},
            newPokerLib.handValInNum = [],
            newPokerLib.cardsCode = [],
            newPokerLib.threesArr = [],
            newPokerLib.pairsArr = []

            objResult7 = {
                handCardSuit: { SPADES: 5 },
                handCardValue:{ '3': 1, '4': 1, '5':1, '2': 1, 'ACE': 1 },
                cardsCode: ['QS','3S', '4S', '5S', '6S', 'AS'],
                handValInNum:[2, 4, 5, 12, 14],
            };



        })

        it('Should return true for flush', function(){
            newPokerLib.hand(pokeHand7);
            newPokerLib.sortHand()

            assert.equal(true, newPokerLib.flush())
            assert.equal(1, Object.keys(newPokerLib.handCardSuit).length)
        });
    });

    describe('straight', function(){
        before(function(){
            newPokerLib.handCardSuit = {},
            newPokerLib.handCardValue = {},
            newPokerLib.handValInNum = [],
            newPokerLib.cardsCode = [],
            newPokerLib.threesArr = [],
            newPokerLib.pairsArr = []

            objResult4 = {
                handCardSuit: { SPADES: 5 },
                handCardValue:{ '3': 1, '4': 1, '5':1, '2': 1, 'ACE': 1 },
                cardsCode: ['2S','3S', '4S', '5S', '6S', 'S'],
                handValInNum:[2, 3, 4, 5, 14],
            };
        });
        it('Should return true for straight', function(){
            newPokerLib.hand(pokeHand4);
            newPokerLib.sortHand()
            assert.equal(objResult4.handValInNum[1], newPokerLib.handValInNum[0]+1)
        })

        
    })

    const pokeHand8 = { remaining: 47,
        deck_id: 'uz17m10nye6r',
        cards: 
        [ { code: 'AS',
            value: 'ACE',
            suit: 'SPADES' },
        { code: '3S',
            value: '3',
            suit: 'SPADES' },
        { code: 'AH',
            value: 'ACE',
            suit: 'HEARTS' },
        { code: '2C',
            value: '2',
            suit: 'CLUBS' },
        { code: 'AD',
            value: 'ACE',
            suit: 'DIAMONDS' } ],
        success: true 
    };

    const pokeHand9 = { remaining: 47,
        deck_id: 'uz17m10nye6r',
        cards: 
        [ { code: '2S',
            value: '2',
            suit: 'SPADES' },
        { code: '3S',
            value: '3',
            suit: 'SPADES' },
        { code: 'AH',
            value: 'ACE',
            suit: 'HEARTS' },
        { code: '2C',
            value: '2',
            suit: 'CLUBS' },
        { code: 'AD',
            value: 'ACE',
            suit: 'DIAMONDS' } ],
        success: true 
    };

    const pokeHand10 = { remaining: 47,
        deck_id: 'uz17m10nye6r',
        cards: 
        [ { code: '2S',
            value: '2',
            suit: 'SPADES' },
        { code: '3S',
            value: '3',
            suit: 'SPADES' },
        { code: 'AH',
            value: 'ACE',
            suit: 'HEARTS' },
        { code: '2C',
            value: '2',
            suit: 'CLUBS' },
        { code: 'KD',
            value: 'KING',
            suit: 'DIAMONDS' } ],
        success: true 
    };

    const pokeHand11 = { remaining: 47,
        deck_id: 'uz17m10nye6r',
        cards: 
        [ { code: '8S',
            value: '8',
            suit: 'SPADES' },
        { code: '4S',
            value: '4',
            suit: 'SPADES' },
        { code: '6H',
            value: '6',
            suit: 'HEARTS' },
        { code: '2C',
            value: '2',
            suit: 'CLUBS' },
        { code: 'QD',
            value: 'QUEEN',
            suit: 'DIAMONDS' } ],
        success: true 
    };



    describe('pairsAndThreesOrHighCard', function(){
        beforeEach(function(){
            newPokerLib.handCardSuit = {},
            newPokerLib.handCardValue = {},
            newPokerLib.handValInNum = [],
            newPokerLib.cardsCode = [],
            newPokerLib.threesArr = [],
            newPokerLib.pairsArr = []

            objResult8 = {
                handCardValue:{ '3': 1, '2': 1, 'ACE': 3 },
                cardsCode: ['2S', '3S', 'AH', '2C', 'AD'],
                handValInNum:[2, 3, 14],
                threesArr: ['ACE'],
            };
            objResult9 = {
                handCardValue:{ '3': 1, '2': 2, 'ACE': 2 },
                cardsCode: ['AS', '3S', 'AH', '2C', 'AD'],
                handValInNum:[2, 3, 14],
                pairsArr: ['2', 'ACE'],
            };
        });
        it('Should return 3 of a kind', function(){
            newPokerLib.hand(pokeHand8);
            newPokerLib.sortHand()
            assert.equal(newPokerLib.threesArr, newPokerLib.threesArr)
            assert.equal('3 of a kind', newPokerLib.pairsAndThreesOrHighCard())
        })
        it('Should return 2 pairs', function(){
            newPokerLib.hand(pokeHand9);
            newPokerLib.sortHand()
            assert.deepEqual(objResult9.pairsArr, newPokerLib.pairsArr)
            assert.equal('2 Pairs', newPokerLib.pairsAndThreesOrHighCard())
        })
        it('Should return 1 pair', function(){
            newPokerLib.hand(pokeHand10);
            newPokerLib.sortHand()
            assert.deepEqual(['2'], newPokerLib.pairsArr)
            assert.equal('1 Pair', newPokerLib.pairsAndThreesOrHighCard())
        })
        it('Should return high card', function(){
            newPokerLib.hand(pokeHand11);
            newPokerLib.sortHand()
            assert.deepEqual([2, 4, 6, 8, 12], newPokerLib.handValInNum)
            assert.equal('High Card', newPokerLib.pairsAndThreesOrHighCard())

        })

        
    })


});


