const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});

const counters = document.querySelectorAll('[data-counter]');
let countersStarted = false;

function animateCounters() {
  if (countersStarted) return;

  const metricsSection = document.querySelector('.metrics-section');
  const sectionTop = metricsSection.getBoundingClientRect().top;

  if (sectionTop < window.innerHeight - 80) {
    countersStarted = true;
    counters.forEach((counter) => {
      const target = Number(counter.dataset.counter);
      let current = 0;
      const increment = Math.max(1, Math.ceil(target / 60));

      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(interval);
        } else {
          counter.textContent = current;
        }
      }, 22);
    });
  }
}

window.addEventListener('scroll', animateCounters);
window.addEventListener('load', animateCounters);

const questions = [
  {
    text: 'Qual prática ajuda a proteger o solo contra erosão?',
    answers: ['Queimada frequente', 'Plantio direto', 'Desmatamento de margens', 'Uso excessivo de água'],
    correct: 1,
    explanation: 'O plantio direto mantém cobertura vegetal no solo e reduz a erosão.'
  },
  {
    text: 'O que significa usar a água de forma racional no agro?',
    answers: ['Irrigar sem controle', 'Evitar qualquer irrigação', 'Aplicar água com planejamento e eficiência', 'Usar apenas água de rios'],
    correct: 2,
    explanation: 'O manejo eficiente da irrigação reduz desperdícios e protege os recursos hídricos.'
  },
  {
    text: 'Qual alternativa representa economia circular no campo?',
    answers: ['Descartar todo resíduo orgânico', 'Transformar resíduos em composto', 'Aumentar o desperdício', 'Ignorar sobras da produção'],
    correct: 1,
    explanation: 'A compostagem reaproveita resíduos e devolve nutrientes ao sistema produtivo.'
  }
];

const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const feedbackElement = document.getElementById('feedback');
const nextButton = document.getElementById('nextQuestion');
let currentQuestion = 0;
let answered = false;

function loadQuestion() {
  answered = false;
  feedbackElement.textContent = '';
  answersElement.innerHTML = '';

  const question = questions[currentQuestion];
  questionElement.textContent = question.text;

  question.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'answer-btn';
    button.textContent = answer;
    button.addEventListener('click', () => selectAnswer(button, index));
    answersElement.appendChild(button);
  });
}

function selectAnswer(button, index) {
  if (answered) return;

  answered = true;
  const question = questions[currentQuestion];
  const buttons = document.querySelectorAll('.answer-btn');

  buttons.forEach((answerButton, buttonIndex) => {
    answerButton.disabled = true;
    if (buttonIndex === question.correct) {
      answerButton.classList.add('correct');
    }
  });

  if (index === question.correct) {
    feedbackElement.textContent = `✅ Correto! ${question.explanation}`;
  } else {
    button.classList.add('wrong');
    feedbackElement.textContent = `🌿 Quase! ${question.explanation}`;
  }
}

nextButton.addEventListener('click', () => {
  currentQuestion = (currentQuestion + 1) % questions.length;
  loadQuestion();
});

loadQuestion();

const pledgeForm = document.getElementById('pledgeForm');
const pledgeInput = document.getElementById('pledge');
const pledgeMessage = document.getElementById('pledgeMessage');

pledgeForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const pledge = pledgeInput.value.trim();

  if (pledge.length < 8) {
    pledgeMessage.textContent = 'Escreva uma ação um pouco mais completa para registrar seu compromisso.';
    return;
  }

  pledgeMessage.textContent = 'Compromisso registrado! Toda grande mudança começa com uma atitude.';
  pledgeInput.value = '';
});
