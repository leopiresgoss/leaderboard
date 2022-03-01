export default class Display {
  displayScores = (scores) => {
    const scoresList = document.querySelector('.scores');
    scores = this.#orderScores(scores);
    scoresList.innerHTML = '';
    scores.forEach((score) => {
      const li = document.createElement('li');
      li.textContent = `${score.user}: ${score.score}`;
      scoresList.appendChild(li);
    });
  };

  #orderScores = (scores) => scores.sort((a, b) => b.score - a.score)
}