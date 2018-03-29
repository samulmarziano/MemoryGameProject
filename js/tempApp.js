// Globals
// Store cards in the card array
let card = document.getElementsByClassName('card');
let cards = [...card];

// Create the deck - this makes it easier to change the card values
const cardDeck = ['fa-anchor', 'fa-bolt', 'fa-cube', 'fa-bicycle', 'fa-diamond',
'fa-leaf', 'fa-bomb', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-bicycle', 'fa-diamond',
'fa-leaf', 'fa-bomb', 'fa-paper-plane-o'];

// Resets moves and counter
let moves = 0;
let counter = document.querySelector('.moves');

// Array for cards that are matches
let matches = document.getElementsByClassName('match');

// Array for cards that have been flipped
var flippedCards = [];

// Add event listeners to each card element
for (var i = 0; i < cards.length; i++) {
  currentCard = cards[i];
  currentCard.addEventListener('click', flipCard);
  currentCard.addEventListener('click', flippedCardCheck);
  currentCard.addEventListener('click', youWon)
}

// Shuffle the card deck
function shuffle() {
    var currentIndex = cardDeck.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cardDeck[currentIndex];
        cardDeck[currentIndex] = cardDeck[randomIndex];
        cardDeck[randomIndex] = temporaryValue;
    }
}

// Run on load
$(function() {
  // Shuffle deck
  shuffle();

  // Reset variables
  reset();

  // Layout the deck
  layoutDeck();

  $('.fa-repeat').on('click', function() {
    reset();
  });
});

// Reset variables for new game
function reset() {
  $('*').removeClass('open show');
  $('*').removeClass('match');
  $('.card').removeClass('lock');
  $('.card').find('i').attr('class', '');
  $('.card').find('i').addClass('fa');
  moves = 0;
  counter.innerHTML = moves;
  cards = [];
  matches = [];
  shuffle();
  layoutDeck();
}

// Layout the shuffled deck
function layoutDeck() {
  var target = $('.card');

  for (var i = 0; i < cardDeck.length; i++) {
    target.eq(i).find('i').addClass(cardDeck[i]);
  }
}

// Show the card
function flipCard() {
  this.classList.toggle('open', 'show', 'lock');
}

// Check if the card is a match
function flippedCardCheck() {
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    incrementMoves();

    if (flippedCards[0].firstChild.nextSibling.getAttribute('class') === flippedCards[1].firstChild.nextSibling.getAttribute('class')) {
      match();
    } else {
      noMatch();
    }
  }
}

// Increment the Moves counter
function incrementMoves() {
  moves++;
  counter.innerHTML = moves;
}

// Change the classes from flipping the card to matched card
function match() {
  flippedCards[0].classList.add('match', 'lock');
  flippedCards[1].classList.add('match', 'lock');
  flippedCards[0].classList.remove('open', 'show');
  flippedCards[1].classList.remove('open', 'show');
  matches.push(flippedCards[0]);
  matches.push(flippedCards[1]);
  flippedCards = [];
}

// Cards don't match, flip them back over
function noMatch() {
  flippedCards[0].classList.add('lock');
  flippedCards[1].classList.add('lock');
  setTimeout(function() {
    flippedCards[0].classList.remove('open', 'show', 'lock');
    flippedCards[1].classList.remove('open', 'show', 'lock');
    flippedCards = [];
  }, 1100);
}

// Win logic
function youWon() {
  if (matches.length == 16) {
    // The timeouts allow a transitional feel to the win msg coming and going
    setTimeout(function() {
      $('.win-msg').text('You won in ' + moves + ' moves!');
      $('.win-container').css('display', 'flex');
    }, 1000);
    setTimeout(function() {
      $('.win-container').css('display', 'none');
      $('.win-msg').text('');

      reset();
    }, 4000);
  }
}
