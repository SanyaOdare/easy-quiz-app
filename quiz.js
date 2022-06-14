let question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progress-text');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progress-bar-full')
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

// Fetch data
fetch('https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple')
.then(res => {
  return res.json();
})
.then(loadedQuestions => {
  console.log(loadedQuestions.results);
  questions = loadedQuestions.results.map(loadedQuestion => {
    const formattedQuestion = {
      question: loadedQuestion.question
    };
    // generate random 3 incorrect answers
    const answerChoices = [...loadedQuestion.incorrect_answers];
    formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
    answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);
    // loop through answerChoices
    answerChoices.forEach((choice, index) => {
      formattedQuestion['choice' + (index + 1)] = choice;
    })
    return formattedQuestion;
  });
  startGame();
})
.catch(err => {
  console.error(err);
  
})

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  // if no more question 
  if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    // save score to local storage
    localStorage.setItem('mostRecentScore', score);
    // go to end of page
    return window.location.assign("/endpage.html");
  }  
  
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  // update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  })

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    // if no answer is clicked
    if(!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    // Indicate correct or incorrect answer
    const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
    // console.log(classToApply);

    if(classToApply === 'correct') {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);
    // delay a little bit before removing correct || incorrect
    setTimeout( () => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);

    
  });
});

// Validate user's choice and add 10 marks to correct answer
incrementScore = num => {
  score += num;
  scoreText.innerText = score;
}
