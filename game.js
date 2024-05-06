const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById('score')
const progressBarFull = document.getElementById('progressBarFull')

const imageContainer = document.getElementById("imageContainer");
const imageOverlay = document.getElementById("imageOverlay");
let isImageBlurred = false; //Variable to track the blurred state of the image

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

const CORRECT_BONUS = 5;
const MAX_QUESTIONS = 12;

// event listener to toggle blue effect 
imageOverlay.addEventListener("click", () => {
  isImageBlurred = !isImageBlurred;
  imageContainer.classList.toggle("blurred");
});

const questions = [{
    /* Your array of questions */
    question: "What is the largest planet in the solar system?",
    choice1: "Jupiter",
    choice2: "Neptune",
    choice3: "Saturn",
    choice4: "Uranus",
    answer: 1,
    image: "/assets/images/jupiter-1 .jpg"
  },
  {
    question: "Which of the following is the largest island in the world?",
    choice1: "New Guinea",
    choice2: "Madagascar",
    choice3: "Borneo",
    choice4: "Greenland",
    answer: 4,
    image: "/assets/images/greenland (1).jpg"

  },
  {
    question: "What was the first soft drink in space?",
    choice1: "Sprite",
    choice2: "Pepsi",
    choice3: "Coca Cola",
    choice4: "Dr Pepper",
    answer: 3,
    image: "/assets/images/cola.webp"
  },
  {
    question: "Which country produces the most coffee beans in the world?",
    choice1: "Brazil",
    choice2: "Switzerland",
    choice3: "Vietnam",
    choice4: "Peru",
    answer: 1,
    image: "/assets/images/coffee-beans.jpg"

  },
  {
    question: "How many hearts does an octopus have?",
    choice1: "7",
    choice2: "5",
    choice3: "1",
    choice4: "0",
    answer: 4,
    image: "/assets/images/octo (1).jpg"
  },
  {
    question: "Which planet is nearest to the sun?",
    choice1: "Mars",
    choice2: "Mercury",
    choice3: "Jupiter",
    choice4: "Venus",
    answer: 2,
    image: "/assets/images/mercury-1.jpg"
  },
  {
    question: "How many bones does a shark have?",
    choice1: "0",
    choice2: "50",
    choice3: "100",
    choice4: "150",
    answer: 1,
    image: "/assets/images/sharkie.jpg"
  },
  {
    question: "What is the largest continent?",
    choice1: "Europe",
    choice2: "Africa",
    choice3: "Asia",
    choice4: "North America",
    answer: 3,
    image: "/assets/images/asia-map.jpeg"
  },
  {
    question: "What is the most populous city in the world?",
    choice1: "New York",
    choice2: "Tokyo",
    choice3: "Dhaka",
    choice4: "Shanghai",
    answer: 2,
    image: "/assets/images/tokyo.jpg"
  },
  {
    question: "What year did Disneyland inaugurate?",
    choice1: "1965",
    choice2: "1980",
    choice3: "1970",
    choice4: "1955",
    answer: 4,
    image: "/assets/images/disneyland.jpeg"
  },
  {
    question: "Where was the mojito cocktail created?",
    choice1: "Spain",
    choice2: "Mexico",
    choice3: "Cuba",
    choice4: "Peru",
    answer: 3,
    image: "/assets/images/mojitos (1).jpg"
  },
  {
    question: "What is the tallest building in the world?",
    choice1: "Empire State Building",
    choice2: "Burj Khalifa",
    choice3: "Shanghai Tower",
    choice4: "Taipepi 101",
    answer: 2,
    image: "/assets/images/burj-khalif.jpg"
  },
];


// Shuffle questions
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startGame() {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  shuffle(availableQuestions);
  getNewQuestion();
}

function getNewQuestion() {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  // Add blur effect to image
  imageContainer.classList.add("blurred");

  // const imageContainer = document.querySelector(".image-container");
  imageContainer.innerHTML = `<img src="${currentQuestion.image}" alt="Question Image">`;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
}

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if (isImageBlurred) return;
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    } else {
      // Show the correct answer
      const correctChoice = choices.find(choice => choice.dataset["number"] == currentQuestion.answer);
      correctChoice.parentElement.classList.add('correct');

      selectedChoice.parentElement.classList.add('incorrect');
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      // Remove highlighting of the correct answer
      const correctChoice = choices.find(choice => choice.dataset["number"] == currentQuestion.answer);
      correctChoice.parentElement.classList.remove('correct');
      getNewQuestion();
      // Remove blur effect when the user selects an answer
      imageContainer.classList.remove("blurred");
    }, 1000)
  });
});


function incrementScore(num) {
  score += num;
  scoreText.innerText = score;
}

startGame();