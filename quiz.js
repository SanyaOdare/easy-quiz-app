let question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));

let currentQuestion = {};
let acceptingAnswers = true;
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
  questionCounter++;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  })
};

startQuiz();