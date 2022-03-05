export default class Display {
  displayScores = (scores) => {
    const scoresList = document.querySelector('.scores');

    if (scores.length === 0) {
      scoresList.style.display = 'none';
    } else {
      scoresList.style.display = 'block';
    }

    scores = this.#orderScores(scores);
    scoresList.innerHTML = '';
    scores.forEach((score) => {
      const li = document.createElement('li');
      li.textContent = `${score.user}: ${score.score}`;
      scoresList.appendChild(li);
    });
  };

  #orderScores = (scores) => scores.sort((a, b) => b.score - a.score)

  showModal = () => {
    const modal = document.createElement('div');
    modal.classList.add('modal-overlay');
    modal.innerHTML = `
    <div class="alert">
      <h3>Do you really want to reset all scores and start a new game?</h3>
      <div class="buttons">
          <button class="confirm" type="button" aria-label="reset score list">Yes</button>
          <button class="reject" type="button" aria-label="maitain score list">No</button>
      </div>
    </div>
    `;
    document.body.appendChild(modal);
  }

  closeModal = () => {
    document.body.removeChild(document.body.lastChild);
  }
}