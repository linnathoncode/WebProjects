'use strict';

let highscore = document.querySelector('.highscore').textContent;
let randNumber = randomNumber();
//function that generates a random number
function randomNumber() {
  return Math.trunc(Math.random() * 20) + 1;
}
//funtion that resets the game and creates a new random number
function resetGame(scoreValid) {
  if (scoreValid && document.querySelector('.score').textContent > highscore) {
    document.querySelector('.highscore').textContent =
      document.querySelector('.score').textContent;
  }
  //css manipulation
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').textContent = `?`;
  document.querySelector('.number').style.width = '15rem';
  //dom manipulation & game logic
  document.querySelector('.message').textContent = `Start guessing...`;
  document.querySelector('.score').textContent = 20;
  document.querySelector('.guess').value = ``;
  randNumber = randomNumber();
}
//function for game loop

function gameLoop(givenNumber) {
  const message = document.querySelector('.message');
  let score = document.querySelector('.score').textContent;
  console.log(score);
  //changes the label then restarts the game when the player wins
  if (givenNumber === randNumber) {
    message.textContent = `You have won with the score of ${score}`;
    // css manipulation
    document.querySelector('.number').textContent = String(randNumber);
    document.querySelector('body').style.backgroundColor = '#355E3B';
    document.querySelector('.number').style.width = '30rem';
    // game reset
    setTimeout(() => {
      resetGame(true);
    }, 3000);
  } else if (givenNumber > randNumber) {
    message.textContent = `The number is smaller than that`;
    score--;
  } else {
    message.textContent = `The number is bigger than that`;
    score--;
  }

  //resets the game with a delay of 3 seconds
  if (!score) {
    message.textContent = `You have lost`;
    setTimeout(() => {
      resetGame(false);
    }, 3000);
  } else {
    //clears the text label and corrects the score
    document.querySelector('.guess').value = ``;
    document.querySelector('.score').textContent = score;
  }
}

//click event for check button
document.querySelector('.check').addEventListener('click', function () {
  const givenNumber = Number(document.querySelector('.guess').value);
  if (!givenNumber) {
    document.querySelector(
      '.message'
    ).textContent = `You have not entered any number`;
  } else gameLoop(givenNumber);
});

//click event for again button
document.querySelector('.again').addEventListener('click', function () {
  resetGame(false);
});
