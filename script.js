let questions = [];
const btn = document.getElementById('addqs');
const reset = document.getElementById('reset');

btn.addEventListener('click', addQuestion);
reset.addEventListener('click', clearForm);

function addQuestion() {
  const qs = document.getElementById('question').value;
  const opt1 = document.getElementById('option1').value;
  const opt2 = document.getElementById('option2').value;
  const opt3 = document.getElementById('option3').value;
  const opt4 = document.getElementById('option4').value;
  const correctAnswer = document.getElementById('correctAnswer').value;

  if (!qs || !opt1 || !opt2 || !opt3 || !opt4 || !correctAnswer) {
    alert('Please fill in all fields and select a correct answer.');
    return;
  }

  const answer = {1: opt1, 2: opt2, 3: opt3, 4: opt4}[correctAnswer];

  const Eachqs = {
    qs,
    options: [opt1, opt2, opt3, opt4],
    answer
  };

  questions.push(Eachqs);
  localStorage.setItem("quizData", JSON.stringify(questions));
  alert('Question added successfully!');
  clearForm();
}

function clearForm() {
  document.getElementById('question').value = '';
  document.getElementById('option1').value = '';
  document.getElementById('option2').value = '';
  document.getElementById('option3').value = '';
  document.getElementById('option4').value = '';
  document.getElementById('correctAnswer').value = '';
}