import './style.css';
import Game from './modules/game.js';

// create a new game
const gameName = 'Leader Game';

const render = async (Game) => {
  const game = new Game(gameName);

  await game.start();
  // todo add event listener to add score
  await game.addScoreToGame();
  const scores = await game.getScores();
};

render(Game);
