import './style.css';

// create a new game
const gameName = 'Leader Gamer';

const startNewGame = async (gameName) => {
  const requestURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
  const res = await fetch(requestURL, {
    method: 'POST',
    body: JSON.stringify({
      name: `${gameName}`,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const newGame = await res.json();

  return newGame;
};

// get id from new game
const getId = async () => {
  const game = await startNewGame(gameName);
  const findId = game.result.match(/(\w+)\sadded\.$/);

  // the id is at the first
  if (findId !== null && findId[1]) return findId[1];

  return undefined;
};

getId();