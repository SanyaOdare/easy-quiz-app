let question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Who delivered most inspiring speech at APC's Primaries?",
    choice1: "Osinbajo",
    choice2: "Tinubu",
    choice3: "Atiku",
    choice4: "Buhari",
    answer: 1
  },
  {
    question: "Which rock band was founded by Trent Reznor in 1988?",
    choice1: "Mamma Mia by Abba",
    choice2: "Coldplay",
    choice3: "Nine Inch Nails",
    choice4: "Joni Mitchell",
    answer: 3
  },
  {
    question: "Which English Sir has had No. l’s in the 50’s, 60’s, 70’s, 80’s and 90’s?",
    choice1: "Led Zeppelin",
    choice2: "Elton John",
    choice3: "Britney Spears",
    choice4: "Sir Cliff Richard",
    answer: 4
  },
]

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startQuiz = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  console.log(availableQuestions);  
  getNewQuestion();
}

getNewQuestion = () => {
  // if no more question 
  if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    // go to end of page
    return window.location.assign("/end.html");

  }
  
  
  
  questionCounter++;
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
    console.log(selectedAnswer);    
    getNewQuestion();
  });
});

startQuiz();