import './style.css';
import Game from './modules/game.js';
import Display from './modules/display.js';

// create a new game
const gameName = 'Leader Game';

const render = async (Game, Display) => {
  const game = new Game(gameName);
  const display = new Display();

  await game.start();
  // todo add event listener to add score
  const scores = await game.getScores();
  display.displayScores(scores.result);
};

render(Game, Display);
