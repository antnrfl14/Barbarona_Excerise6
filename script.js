const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Lisbon", correct: false }
        ]
    },
    {
        question: "Which is the longest river in the world?",
        answers: [
            { text: "Amazon River", correct: false },
            { text: "Nile River", correct: true },
            { text: "Yangtze River", correct: false },
            { text: "Mississippi River", correct: false }
        ]
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        answers: [
            { text: "Japan", correct: true },
            { text: "China", correct: false },
            { text: "South Korea", correct: false },
            { text: "India", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const retakeButton = document.getElementById("retake-btn");
const scoreText = document.getElementById("score-text");

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreText.textContent = '';
    nextButton.style.display = "none";
    retakeButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    const question = questions[currentQuestionIndex];
    questionText.textContent = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    nextButton.style.display = "none";
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    if (correct) score++;
    Array.from(answerButtons.children).forEach(button => {
        button.classList.add(button.dataset.correct === "true" ? "correct" : "wrong");
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    questionText.textContent = `You scored ${score} out of ${questions.length}!`;
    nextButton.style.display = "none";
    retakeButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

retakeButton.addEventListener("click", startQuiz);

startQuiz();
