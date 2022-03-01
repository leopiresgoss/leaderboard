import './style.css';

// create a new game
const gameName = 'Leader Gamer';
const requestURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';

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

// add to score to game
const addScoreToGame = async () => {
  const id = await getId();

  const url = `${requestURL}${id}/scores`;

  // first test
  let res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      user: 'Juan',
      score: 500,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  // second test
  res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      user: 'Lisa',
      score: 100,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const result = await res.json();
  return result;
};

addScoreToGame();