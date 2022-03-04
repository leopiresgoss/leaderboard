export default class Game {
  constructor(gameName) {
    this.requestURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
    this.gameName = gameName;
  }

  // store Id to localStorage
  #saveId = () => {
    const game = {
      id: this.id,
      gameName: this.gameName,
    };

    localStorage.setItem('leaderboardGame', JSON.stringify(game));
  }

  // get Id from localStorage
  #getId = () => {
    const game = JSON.parse(localStorage.getItem('leaderboardGame'));
    return game || false;
  }

  #startNewGame = async (gameName) => {
    const res = await fetch(this.requestURL, {
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
  start = async () => {
    let game = this.#getId();
    if (!game) {
      game = await this.#startNewGame(this.gameName);
      const findId = game.result.match(/(\w+)\sadded\.$/);
      const id = findId[1];

      // the id is at the first
      if (findId !== null && id) {
        this.id = id;
        // save to local storage
        this.#saveId();
      }
    } else {
      this.id = game.id;
    }
  };

  // add to score to game
  addScoreToGame = async (user, score) => {
    const url = `${this.requestURL}${this.id}/scores`;

    // first test
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        user,
        score: Number(score),
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    return res.json();
  };

  getScores = async () => {
    const url = `${this.requestURL}${this.id}/scores`;

    let res = await fetch(url, {
      method: 'GET',
    });

    res = await res.json();
    return res;
  };

  resetScores = async () => {
    localStorage.removeItem('leaderboardGame');
    await this.start();
  }
}