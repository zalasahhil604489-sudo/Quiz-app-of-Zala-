const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      "HyperText Markup Language",
      "HighText Machine Language",
      "Hyper Transfer Main Link",
      "Home Tool Markup Language"
    ],
    correct: 0,
    explanation: "HTML stands for HyperText Markup Language. It is used to structure content on a web page."
  },
  {
    question: "Which language is mainly used to style a web page?",
    answers: ["JavaScript", "CSS", "HTML", "Python"],
    correct: 1,
    explanation: "CSS is used to style web pages, including colors, fonts, spacing, and layout."
  },
  {
    question: "Which HTML tag is used to create a link?",
    answers: ["<img>", "<p>", "<a>", "<h1>"],
    correct: 2,
    explanation: "The <a> tag creates a link. Its href attribute tells the browser where the link goes."
  },
  {
    question: "What is JavaScript commonly used for on a website?",
    answers: [
      "Adding interaction and behavior",
      "Choosing the computer's wallpaper",
      "Replacing the internet connection",
      "Creating the physical keyboard"
    ],
    correct: 0,
    explanation: "JavaScript adds interactive behavior, such as responding when a user clicks a button."
  },
  {
    question: "If index.html and style.css are in the same folder, what is the relative path to the CSS file?",
    answers: ["C:/style.css", "https://style.css", "../style.css", "style.css"],
    correct: 3,
    explanation: "Because both files are in the same folder, the relative path is simply style.css."
  }
];

const introScreen = document.getElementById("intro-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const questionCount = document.getElementById("question-count");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");

let currentQuestion = 0;
let score = 0;
let answered = false;

document.getElementById("start-btn").addEventListener("click", startQuiz);
nextButton.addEventListener("click", showNextQuestion);
document.getElementById("restart-btn").addEventListener("click", startQuiz);

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  introScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  answered = false;
  feedback.textContent = "";
  nextButton.disabled = true;
  nextButton.textContent = currentQuestion === questions.length - 1
    ? "See my result"
    : "Next question";

  const item = questions[currentQuestion];
  questionCount.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  questionText.textContent = item.question;
  progressBar.style.width = `${(currentQuestion / questions.length) * 100}%`;
  answersContainer.innerHTML = "";

  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-btn";
    button.textContent = answer;
    button.addEventListener("click", () => selectAnswer(index));
    answersContainer.appendChild(button);
  });
}

function selectAnswer(selectedIndex) {
  if (answered) return;
  answered = true;

  const item = questions[currentQuestion];
  const answerButtons = answersContainer.querySelectorAll("button");

  answerButtons.forEach((button, index) => {
    button.disabled = true;
    if (index === item.correct) {
      button.classList.add("correct");
    } else if (index === selectedIndex) {
      button.classList.add("wrong");
    }
  });

  if (selectedIndex === item.correct) {
    score += 1;
    feedback.textContent = `Correct! You earned 1 mark. ${item.explanation}`;
    feedback.style.color = "#176337";
  } else {
    feedback.textContent = `Not quite. You earned 0 marks. ${item.explanation}`;
    feedback.style.color = "#9b3030";
  }

  nextButton.disabled = false;
}

function showNextQuestion() {
  if (!answered) return;

  currentQuestion += 1;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  progressBar.style.width = "100%";

  const total = questions.length;
  const percentage = Math.round((score / total) * 100);

  document.getElementById("score-text").textContent = `${score} / ${total} marks`;
  document.getElementById("percentage").textContent = `${percentage}%`;

  let message;
  if (score === total) {
    message = "Excellent work! You answered every question correctly.";
  } else if (score >= 3) {
    message = "Good job! Keep practicing to improve your knowledge.";
  } else {
    message = "Keep learning and try again. Practice will help you improve.";
  }

  document.getElementById("result-message").textContent = message;
}
