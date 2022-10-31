const SUITS = ['♠', '♣', '♥', '♦'];
const VALUES = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
];
const CARD_VALUE_MAP = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

class Deck {
  constructor(cards = freshDeck()) {
    this.cards = cards;
  }

  get numberOfCards() {
    return this.cards.length;
  }

  pop() {
    return this.cards.shift();
  }

  push(card) {
    this.cards.push(card);
  }

  shuffle() {
    for (let i = this.numberOfCards - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1));
      const oldValue = this.cards[newIndex];
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
  }
}

class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }

  get color() {
    return this.suit === '♠' || this.suit === '♣' ? 'black' : 'red';
  }

  getHTML() {
    const cardDiv = document.createElement('div');
    cardDiv.innerText = this.suit;
    cardDiv.classList.add('card', this.color);
    cardDiv.dataset.value = `${this.value} ${this.suit}`;
    return cardDiv;
  }
}

function freshDeck() {
  return SUITS.flatMap((suit) => {
    return VALUES.map((value) => {
      return new Card(suit, value);
    });
  });
}

const computerCardSlot = document.querySelector('.computer-card-slot');
const computerDeckNumber = document.querySelector('.computer-deck');

const gameScore = document.querySelector('.game-score');

const playerCardSlot = document.querySelector('.player-card-slot');
const playerDeckNumber = document.querySelector('.player-deck');

let playerDeck, computerDeck, inRound, stopGame;
startGame();

document.addEventListener('click', () => {
  if (stopGame) {
    startGame();
    return;
  }
  if (inRound) {
    cleanBeforeRound();
  } else {
    flipCards();
  }
});

function startGame() {
  const deck = new Deck();
  deck.shuffle();

  const deckMidpoint = Math.ceil(deck.numberOfCards / 2);
  playerDeck = new Deck(deck.cards.slice(0, deckMidpoint));
  computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards));
  inRound = false;
  stopGame = false;

  console.log(playerDeck);
  console.log(computerDeck);

  cleanBeforeRound();
}

function cleanBeforeRound() {
  console.log('cleanbefore round calisti');
  inRound = false;
  computerCardSlot.innerHTML = '';
  playerCardSlot.innerHTML = '';
  gameScore.innerText = 'Click to pick a card';

  updateDeckCount();
}

function updateDeckCount() {
  computerDeckNumber.innerText = computerDeck.numberOfCards;
  playerDeckNumber.innerText = playerDeck.numberOfCards;
}

function flipCards() {
  inRound = true;
  const playerCard = playerDeck.pop();
  const computerCard = computerDeck.pop();

  playerCardSlot.appendChild(playerCard.getHTML());
  computerCardSlot.appendChild(computerCard.getHTML());

  updateDeckCount();

  if (isRoundWinner(playerCard, computerCard)) {
    gameScore.innerText = 'You Win';
    playerDeck.push(playerCard);
    playerDeck.push(computerCard);
  } else if ((computerCard, playerCard)) {
    gameScore.innerText = 'You lost';
    computerDeck.push(playerCard);
    computerDeck.push(computerCard);
  } else {
    gameScore.innerText = 'Draw';
    playerDeck.push(playerCard);
    computerDeck.push(computerCard);
  }

  if (isGameOver(playerDeck)) {
    gameScore.innerText = 'You Lost this Game!';
    stopGame = true;
  } else if (isGameOver(computerDeck)) {
    gameScore.innerText = 'You Win this Game!';
    stopGame = true;
  }
}

function isRoundWinner(cardOne, cardTwo) {
  return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value];
}

function isGameOver(deck) {
  return deck.numberOfCards === 0;
}
