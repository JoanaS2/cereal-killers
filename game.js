const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById('score')
const progressBarFull = document.getElementById('progressBarFull')

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];



const CORRECT_BONUS = 5;
const MAX_QUESTIONS = 12;

let questions = [{
    question: "What is the largest planet in the solar system?",
    choice1: "Jupiter",
    choice2: "Neptune",
    choice3: "Saturn",
    choice4: "Uranus",
    answer: 1
  },
  {
    question: "Which of the following is the largest island in the world?",
    choice1: "New Guinea",
    choice2: "Madagascar",
    choice3: "Borneo",
    choice4: "Greenland",
    answer: 4

  },
  {
    question: "What was the first soft drink in space?",
    choice1: "Sprite",
    choice2: "Pepsi",
    choice3: "Coca Cola",
    choice4: "Dr Pepper",
    answer: 3
  },
  {
    question: "What year was the famous movie Titanic released?",
    choice1: "1997",
    choice2: "1995",
    choice3: "2000",
    choice4: "1998",
    answer: 1

  },
  {
    question: "How many hearts does an octopus have?",
    choice1: "7",
    choice2: "5",
    choice3: "1",
    choice4: "3",
    answer: 4
  },
  {
    question: "Which planet is nearest to the sun?",
    choice1: "Mars",
    choice2: "Mercury",
    choice3: "Jupiter",
    choice4: "Venus",
    answer: 2
  },
  {
    question: "How many bones does a shark have?",
    choice1: "0",
    choice2: "50",
    choice3: "100",
    choice4: "150",
    answer: 1
  },
  {
    question: "What is the largest continent?",
    choice1: "Europe",
    choice2: "Africa",
    choice3: "Asia",
    choice4: "North America",
    answer: 3
  },
  {
    question: "In which country did the Olympics originate?",
    choice1: "Italy",
    choice2: "Greece",
    choice3: "Egypt",
    choice4: "China",
    answer: 2
  },
  {
    question: "What year did Disneyland inaugurate?",
    choice1: "1965",
    choice2: "1980",
    choice3: "1970",
    choice4: "1955",
    answer: 4
  },
  {
    question: "Where was the mojito cocktail created?",
    choice1: "Spain",
    choice2: "Mexico",
    choice3: "Cuba",
    choice4: "Peru",
    answer: 3
  },
  {
    question: "What is the tallest building in the world?",
    choice1: "Empire State Building",
    choice2: "Burj Khalifa",
    choice3: "Shanghai Tower",
    choice4: "Taipepi 101",
    answer: 2
  },
];

// Shuffle questions
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  shuffle(availableQuestions);
  // console.log(availableQuestions);
  getNewQuestion();
};

getNewQuestion = () => {

  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  // questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

  //Update the progress bar
  // console.log((questionCounter / MAX_QUESTIONS) * 100);
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;


  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  // console.log(availableQuestions);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    // console.log(e.target);
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    // console.log('Selected Answer:', selectedAnswer);
    // console.log('Correct Answer:', currentQuestion.answer);


    // let classToApply = 'incorrect';
    // if (selectedAnswer === currentQuestion.answer) {
    //   classToApply = 'correct';
    // }

    const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000)
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();