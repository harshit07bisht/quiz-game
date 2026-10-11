const originalQuestions = [
  {
    question: 'What is the capital of France?',
    answers: ['Paris', 'Madrid', 'Rome', 'Berlin'],
    correct: 0,
  },
  {
    question: 'Which HTML element adds a clickable button?',
    answers: ['<code>&lt;button&gt;</code>', '<code>&lt;link&gt;</code>', '<code>&lt;article&gt;</code>', '<code>&lt;footer&gt;</code>'],
    correct: 0,
  },
  {
    question: 'Which CSS property changes text color?',
    answers: ['background-color', 'color', 'font-size', 'margin'],
    correct: 1,
  },
  {
    question: 'In JavaScript, which keyword declares a constant?',
    answers: ['let', 'const', 'var', 'function'],
    correct: 1,
  },
  {
    question: 'Which one is a JavaScript array method?',
    answers: ['push()', 'align()', 'style()', 'repeat()'],
    correct: 0,
  },
];

let questions = [];
const questionEl = document.getElementById('question');
const answerButtons = Array.from(document.querySelectorAll('.answer-btn'));
const statusEl = document.getElementById('status');
const nextBtn = document.getElementById('nextBtn');
const resultCard = document.getElementById('resultCard');
const scoreText = document.getElementById('scoreText');
const restartBtn = document.getElementById('restartBtn');

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function cloneQuestions() {
  return originalQuestions.map((question) => ({
    question: question.question,
    answers: [...question.answers],
    correct: question.correct,
  }));
}

function shuffleAnswers(question) {
  const indexed = question.answers.map((answer, index) => ({ answer, index }));
  shuffleArray(indexed);
  question.answers = indexed.map((item) => item.answer);
  question.correct = indexed.findIndex((item) => item.index === question.correct);
}

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  answered = false;
  questions = cloneQuestions();
  shuffleArray(questions);
  questions.forEach(shuffleAnswers);

  resultCard.classList.add('hidden');
  document.querySelector('.quiz-card').classList.remove('hidden');
  nextBtn.disabled = true;
  loadQuestion();
}

function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionEl.innerHTML = currentQuestion.question;

  answerButtons.forEach((button, index) => {
    button.innerHTML = currentQuestion.answers[index];
    button.disabled = false;
    button.classList.remove('correct', 'incorrect');
  });

  statusEl.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  nextBtn.textContent = currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next';
  nextBtn.disabled = true;
  answered = false;
}

function selectAnswer(event) {
  if (answered) return;
  answered = true;

  const selectedIndex = Number(event.currentTarget.dataset.answer);
  const currentQuestion = questions[currentQuestionIndex];

  answerButtons.forEach((button, index) => {
    button.disabled = true;
    if (index === currentQuestion.correct) {
      button.classList.add('correct');
    }
  });

  if (selectedIndex === currentQuestion.correct) {
    score += 1;
    event.currentTarget.classList.add('correct');
  } else {
    event.currentTarget.classList.add('incorrect');
  }

  nextBtn.disabled = false;
}

function showResult() {
  document.querySelector('.quiz-card').classList.add('hidden');
  resultCard.classList.remove('hidden');
  scoreText.textContent = `You scored ${score} out of ${questions.length}.`;
}

function handleNext() {
  if (!answered) return;
  currentQuestionIndex += 1;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

answerButtons.forEach((button) => button.addEventListener('click', selectAnswer));
nextBtn.addEventListener('click', handleNext);
restartBtn.addEventListener('click', startQuiz);

startQuiz();
