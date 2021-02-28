'use strict';
const rollDice = document.querySelector('.btn--roll');
const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
let currentSumme;
let playing, activePlayer, scores;
const resetGame = function () {
  scores = [0, 0];
  currentSumme = 0;
  activePlayer = 0;
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  playing = true;
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  diceEl.classList.add('hidden');
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
};
resetGame();
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentSumme = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};
rollDice.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice != 1) {
      currentSumme += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentSumme;
    } else {
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentSumme;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', resetGame);
