'use strict';

//getting elements
const diceEl = document.querySelector('.dice');
const dice = document.querySelector('.dice');
const rollButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');
const newButton = document.querySelector('.btn--new');

let score = [0, 0];
let activePlayer = 0;
const maxScore = 100;

//resets all the elements
resetGame();

function resetGame() {
  diceEl.classList.add('hidden');

  //setting the value and the text content of current score to zero
  resetCurrent();

  //getting elements
  const player0 = document.getElementById(`score--0`);
  const player1 = document.getElementById(`score--1`);
  const player0Name = document.getElementById('name--0');
  const player1Name = document.getElementById('name--1');
  const player1Cr = document.getElementById(`current--1`);

  //setting values and text content of scores to zero
  player1Cr.value = 0;
  player0.value = 0;
  player1.value = 0;
  player0.textContent = 0;
  player1.textContent = 0;

  player0Name.textContent = 'PLAYER 1';
  player1Name.textContent = 'PLAYER 2';

  //removes the winner's background
  if (
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.contains(`player--winner`)
  ) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove(`player--winner`);
  }

  if (activePlayer) {
    //if player 2 current swap
    changeActivePlayer();
  }

  //resets the score
  score = [0, 0];

  //reactivates the buttons
  changeButtonsStatues(false);
}
//resets only the current score elements
function resetCurrent() {
  const scoreCr = document.getElementById(`current--${activePlayer}`);

  scoreCr.value = 0;
  scoreCr.textContent = 0;
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
  console.log(activePlayer);
  score[activePlayer] += scoreCr.value;
  console.log(score[activePlayer]);
  scoreEl.textContent = score[activePlayer];

  resetCurrent();
  console.log(score[activePlayer]);
  if (score[activePlayer] >= maxScore) {
    playerName.textContent = `${playerName.textContent} WINS!`;

    //disables the buttons
    changeButtonsStatues(true);

    //changes the background of the winning player
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add(`player--winner`);

    //resets the game with a 3 sec delay
    setTimeout(() => {
      resetGame();
    }, 3000);

    return 0;
  } else return 1;
}

function changeActivePlayer() {
  const player = document.querySelector(`.player--${activePlayer}`);
  let player2;

  //swaps the "playerActive" class between the players
  activePlayer
    ? (player2 = document.querySelector(`.player--0`))
    : (player2 = document.querySelector(`.player--1`));
  player.classList.remove('player--active');
  player2.classList.add('player--active');

  // if activePlayer 1 set to 0, if activePlayer 0 set to 1
  activePlayer ? (activePlayer = 0) : (activePlayer = 1);
}

//keeps current score updated
function addScore(scoreCr) {
  let theNumber = rollDice();
  if (!(theNumber === 1)) {
    scoreCr.value += showDice(theNumber);
    scoreCr.textContent = scoreCr.value;
  }
  //when dice rolls 1 buttons get disabled for 2 seconds
  //background changes for 2 seconds
  else {
    changeButtonsStatues(true);
    showDice(1);
    changeBackground(true, 'current');
    setTimeout(() => {
      resetCurrent(),
        changeBackground(false, 'current'),
        changeActivePlayer(),
        changeButtonsStatues(false);
    }, 2000);
  }
}

//add or removes the given background
function changeBackground(change, background) {
  let player = document.querySelector(`.player--${activePlayer}`);

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
  const current = document.getElementById(`current--${activePlayer}`);
  addScore(current);
});

//event listener for hold button
//it swaps the section's `player--active` class if someone gets 1 in a dice or if someone uses hold button
holdButton.addEventListener(`click`, function () {
  //buttons get re-disabled
  changeBackground(false, 'current');
  changeButtonsStatues(false);

  //adds the current score to the "score"
  //if the activePlayer does not win, returns 1 and changes the active player
  if (
    secureScore(
      document.getElementById(`current--${activePlayer}`),
      document.getElementById(`score--${activePlayer}`),
      document.getElementById(`name--${activePlayer}`)
    )
  ) {
    changeActivePlayer();
  }

  //when sides change dice gets hidden
  if (!dice.classList.contains('hidden')) dice.classList.add('hidden');
});

//event listener for reset button
newButton.addEventListener(`click`, function () {
  resetGame();
});
