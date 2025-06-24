let questions = JSON.parse(localStorage.getItem("quizData")) || [];
let timer = 10;
let interval;
let currentIndex = -1;
let score = 0;
let answeredQuestions = new Set();

if (questions.length === 0) {
  document.getElementById("questionText").textContent = "No questions found!";
} else {
  window.onload = showNextQuestion;
}

function startTimer() {
  clearInterval(interval);
  timer = 10;
  document.getElementById("timer").textContent = `Time Left: ${timer}s`;

  interval = setInterval(() => {
    timer--;
    document.getElementById("timer").textContent = `Time Left: ${timer}s`;
    if (timer === 0) {
      clearInterval(interval);
      showFeedback(null);
    }
  }, 1000);
}

function showNextQuestion() {
  clearInterval(interval);

  if (answeredQuestions.size === questions.length) {
    showScorecard();
    return;
  }

  let nextIndex;
  do {
    nextIndex = Math.floor(Math.random() * questions.length);
  } while (answeredQuestions.has(nextIndex));

  currentIndex = nextIndex;
  const q = questions[currentIndex];

  document.getElementById("questionText").textContent = q.qs;

  const optionsList = document.getElementById("optionsList");
  optionsList.innerHTML = "";

  q.options.forEach((opt) => {
    const li = document.createElement("li");
    li.textContent = opt;
    li.classList.add("option");
    li.onclick = () => {
      clearInterval(interval);
      showFeedback(opt);
    };
    optionsList.appendChild(li);
  });

  startTimer();
}

function showFeedback(selected) {
  const q = questions[currentIndex];
  const options = document.querySelectorAll(".option");

  if (selected === q.answer) {
    score++;
  }

  options.forEach((opt) => {
    if (opt.textContent === q.answer) {
      opt.style.backgroundColor = "#4caf50"; // Correct
    } else if (opt.textContent === selected) {
      opt.style.backgroundColor = "#f44336"; // Wrong
    }
    opt.style.pointerEvents = "none";
  });

  answeredQuestions.add(currentIndex);

  setTimeout(showNextQuestion, 2000);
}

function showScorecard() {
  const scorecard = document.getElementById("scorecard");
  const scoreText = document.getElementById("scoreText");
  const percentage = ((score / questions.length) * 100).toFixed(2);

  let speak;
  if (score === questions.length) {
    speak = 'You are Number One!';
  } else if (score === 0) {
    speak = 'You are a loser';
  } else {
    speak = 'Better luck next time';
  }

  scoreText.textContent = `Your Score: ${score}/${questions.length} (${percentage}%) - ${speak}`;
  scorecard.classList.remove("hidden");

  document.getElementById("restartQuiz").onclick = () => {
    location.reload();
  };
}