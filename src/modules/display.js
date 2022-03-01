export default class Display {
  displayScores = (scores) => {
    const scoresList = document.querySelector('.scores');

    scores.forEach((score) => {
      const li = document.createElement('li');
      li.textContent = `${score.user}: ${score.score}`;
      scoresList.appendChild(li);
    });
  };
}