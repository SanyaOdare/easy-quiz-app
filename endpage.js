const userName = document.getElementById('username');
const saveScoreBtn = document.getElementById('save-score-btn');
const finalScore = document.getElementById('final-score');
const mostRecentScore = localStorage.getItem('most-recent-score');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORE = 5;
console.log(highScores);

finalScore.innerText = mostRecentScore;

userName.addEventListener('keyup', () => {
  saveScoreBtn.disabled = !userName.value;
});

saveHighScore = e => {
  console.log('You clicked the save button');  
  e.preventDefault();

  const score = {
    score: Math.floor(Math.random() * 100),
    name: userName.value
  };

  highScores.push(score);
  // add score to list and sort - based on decrease in score
  highScores.sort((a,b) => b.score - a.score);
  highScores.splice(5);

  console.log(highScores);
  
}
