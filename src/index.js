import './style.css';
import Game from './modules/game.js';
import Display from './modules/display.js';

// create a new game
const gameName = 'Leader Game';
const game = new Game(gameName);
const display = new Display();
const form = document.querySelector('form');

const render = async () => {
  await game.start();
  // todo add event listener to add score
  const scores = await game.getScores();
  display.displayScores(scores.result);
};

const addScore = async (e) => {
  e.preventDefault();
  const user = document.getElementById('name');
  const score = document.getElementById('score');
  await game.addScoreToGame(user.value, score.value);
  user.value = '';
  score.value = '';
};

render();
form.addEventListener('submit', addScore);