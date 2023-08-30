'use strict';

//+add dices
//+add a feature to disable buttons when someone wins

//getting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); //works just like quearySelector but faster (for id's)
const diceEl = document.querySelector('.dice');
const score0Cr = document.getElementById('current--0');
const score1Cr = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const player0Name = document.getElementById('name--0');
const player1Name = document.getElementById('name--1');
const dice = document.querySelector('.dice');
const rollButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');
const newButton = document.querySelector('.btn--new');
//resets all the elements
resetGame();

//resets the game
function resetGame() {
  diceEl.classList.add('hidden');
  resetCurrents();
  score0El.value = 0;
  score1El.value = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  player0Name.textContent = 'PLAYER 1';
  player1Name.textContent = 'PLAYER 2';
  //if player 2 current swap
  if (player1.classList.contains('player--active')) {
    holdAction();
  }
}
//resets only the current score elements
function resetCurrents() {
  score0Cr.value = 0;
  score1Cr.value = 0;
  score0Cr.textContent = 0;
  score1Cr.textContent = 0;
}

//creates a random number between 1-6
function rollDice() {
  let theNumber = Math.trunc(Math.random() * 6) + 1;

  return theNumber;
}

//adds current score value to the score element
//and checks if someone won
//if someone wins changes its name to `player x wins!` and resets the game in 3 seconds
function secureScore(scoreCr, scoreEl, playerName) {
  scoreEl.value += scoreCr.value;
  scoreEl.textContent = scoreEl.value;

  resetCurrents();
  if (scoreEl.value >= 100) {
    playerName.textContent = `${playerName.textContent} WINS!`;
    setTimeout(() => {
      resetGame();
    }, 3000);
  }
}

//it swaps the section's `player--active` class if someone gets 1 in a dice or if someone uses hold button
function holdAction() {
  //buttons get re-disabled
  changeBackground(false, 'current');
  changeButtonsStatues(false);
  if (player0.classList.contains('player--active')) {
    secureScore(score0Cr, score0El, player0Name);
    player0.classList.remove('player--active');
    player1.classList.add('player--active');
  } else {
    secureScore(score1Cr, score1El, player1Name);
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
  }
  //when sides change dice gets hidden
  if (!dice.classList.contains('hidden')) dice.classList.add('hidden');
}

//keeps current score updated
function addScore(scoreCr) {
  let theNumber = rollDice();
  if (!(theNumber === 1)) {
    scoreCr.value += showDice(theNumber);
    scoreCr.textContent = scoreCr.value;
  }
  //when dice rolls 1 buttons get disabled for 2 seconds
  else {
    showDice(1);
    changeBackground(true, 'current');
    changeButtonsStatues(true);
    setTimeout(() => {
      holdAction(), resetCurrents();
    }, 2000);
  }
}

function changeBackground(change, background) {
  let player;
  player0.classList.contains('player--active')
    ? (player = player0)
    : (player = player1);

  if (change) {
    player.classList.add(background);
  } else {
    player.classList.remove(background);
  }
}
//changes the buttons statues from true to false or reverse
function changeButtonsStatues(disable) {
  if (disable) {
    rollButton.disabled = true;
    holdButton.disabled = true;
  } else {
    rollButton.disabled = false;
    holdButton.disabled = false;
  }
}

//displayes the dice according to the value of dice
function showDice(value) {
  dice.src = `dice-${value}.png`;
  if (dice.classList.contains('hidden')) dice.classList.remove('hidden');
  return value;
}

//event listener for roll button
rollButton.addEventListener(`click`, function () {
  if (player0.classList.contains('player--active')) {
    addScore(score0Cr);
  } else {
    addScore(score1Cr);
  }
});

//event listener for hold button
holdButton.addEventListener(`click`, function () {
  holdAction();
});

//event listener for reset button
newButton.addEventListener(`click`, function () {
  resetGame();
});
