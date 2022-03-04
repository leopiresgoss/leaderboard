import './style.css';
import Game from './modules/game.js';
import Display from './modules/display.js';

// create a new game
const gameName = 'Leader Game';
const game = new Game(gameName);
const display = new Display();

const form = document.querySelector('form');
const refreshBtn = document.querySelector('.refresh');
const resetBtn = document.querySelector('.reset');

const resfreshList = async () => {
  const scores = await game.getScores();
  display.displayScores(scores.result);
};

const render = async () => {
  await game.start();
  await resfreshList();
};

const addScore = async (e) => {
  e.preventDefault();
  const user = document.getElementById('name');
  const score = document.getElementById('score');
  await game.addScoreToGame(user.value, score.value);
  user.value = '';
  score.value = '';
};

const removeList = async () => {
  await game.resetScores();
  // to display an empty list
  await display.displayScores([]);
};

render();
form.addEventListener('submit', addScore);
refreshBtn.addEventListener('click', resfreshList);
resetBtn.addEventListener('click', removeList);