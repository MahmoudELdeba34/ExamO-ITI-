let currentQuestionIndex = 0;
let questions = [];
let timer;
let timeLeft = 300; // 5 minutes

//! DOM
const questionText = document.getElementById('question-text');
const answersSection = document.getElementById('answers-section');
const circleQ = document.getElementById('circleQ');
const btnPrevious = document.getElementById('btn-previous');
const btnNext = document.getElementById('btn-next');
const btnSubmit = document.getElementById('btn-submit');
const timerDisplay = document.getElementById('timer');
const questionList = document.getElementById('question-list');

// * exam type from localStorage
const selectedExam = localStorage.getItem('selectedExam');

// ! Load questions based on exam type
async function loadQuestions() {
    let questionsUrl = '';

    // ! Check if an exam is selected
    if (!selectedExam) {
        Swal.fire({
            title: 'No exam selected!',
            text: 'Please select an exam to start.',
            icon: 'warning',
            confirmButtonText: 'Okay'
        });
        return;
    }

    // ! Show loading message using SweetAlert2
    Swal.fire({
        title: 'Loading questions...',
        text: 'Please wait while we load the questions.',
        icon: 'info',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    // ! the question file based on the exam type
    if (selectedExam === 'html') {
        questionsUrl = 'json/html-questions.json';
    } else if (selectedExam === 'css') {
        questionsUrl = 'json/css-questions.json';
    } else if (selectedExam === 'js') {
        questionsUrl = 'json/js-questions.json';
    }

    try {
        const response = await fetch(questionsUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        questions = data.questions;

        // ! order of questions randomly
        shuffleArray(questions);

        loadQuestion(currentQuestionIndex);
        updateSolvedQuestionsList();
        startTimer();

        // ! Close loading message
        Swal.close();
    } catch (error) {
        console.error('Error loading questions:', error);
        // ! Show error message using SweetAlert2
        Swal.fire({
            title: 'Error!',
            text: 'Failed to load questions. Please try again later.',
            icon: 'error',
            confirmButtonText: 'Okay'
        });
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]]; // ! Switch items
    }
}

// ? Load current question
function loadQuestion(index) {
    const question = questions[index];
    questionText.textContent = question.text;
    circleQ.textContent = index + 1;

   //?  Retrieve the stored answer for the current question
    const selectedAnswers = JSON.parse(localStorage.getItem('selectedAnswers')) || {};
    const selectedAnswer = selectedAnswers[question.id];

    // ! Add answers
    answersSection.innerHTML = '';
    question.answers.forEach((answer, answerIndex) => {
        const answerButton = document.createElement('button');
        answerButton.className = 'form-control answer-input mb-3';
        answerButton.textContent = answer.text;

        // ? Highlight the selected answer
        if (selectedAnswer && selectedAnswer.answerIndex === answerIndex) {
            answerButton.classList.add('selected');
        }

        answerButton.addEventListener('click', () => selectAnswer(answer, answerIndex, question.id));
        answersSection.appendChild(answerButton);
    });

    // ? Hide the "Previous" button in the first question
    if (index === 0) {
        btnPrevious.style.display = 'none';
    } else {
        btnPrevious.style.display = 'inline-block';
    }
}

// ! Save the selected answer
function selectAnswer(answer, answerIndex, questionId) {
    const selectedAnswers = JSON.parse(localStorage.getItem('selectedAnswers')) || {};
    selectedAnswers[questionId] = { answerIndex, answerText: answer.text };
    localStorage.setItem('selectedAnswers', JSON.stringify(selectedAnswers));
    updateSolvedQuestionsList();
}

// ! Update the list of solved questions
function updateSolvedQuestionsList() {
    questionList.innerHTML = '';
    const selectedAnswers = JSON.parse(localStorage.getItem('selectedAnswers')) || {};

    questions.forEach((question, index) => {
        const questionButton = document.createElement('button');
        questionButton.textContent = `Q${index + 1}`;
        questionButton.className = selectedAnswers[question.id] ? 'solved' : '';

        questionButton.addEventListener('click', () => {
            currentQuestionIndex = index;
            loadQuestion(currentQuestionIndex);
        });

        questionList.appendChild(questionButton);
    });
}

// ! swap between questions
btnNext.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }
});

btnPrevious.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
});

// !  Count down begins
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;          
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;   

        if (timeLeft <= 0) {
            clearInterval(timer);
            window.location.href = 'reslut.html'; // ! Go to the result page
        }
    }, 1000);
}

// ? Result calculation 
function calculateScore() {
    let correctAnswers = 0;
    let incorrectAnswers = 0;

    const selectedAnswers = JSON.parse(localStorage.getItem('selectedAnswers')) || {};

    questions.forEach((question) => {
        const selectedAnswer = selectedAnswers[question.id];
        if (selectedAnswer) {
            const correctAnswer = question.answers.find(answer => answer.isCorrect);
            if (correctAnswer && correctAnswer.text === selectedAnswer.answerText) {
                correctAnswers++;
            } else {
                incorrectAnswers++;
            }
        }
    });

    console.log('Correct Answers:', correctAnswers); // ! Check correct answers
    console.log('Incorrect Answers:', incorrectAnswers); // ! Check for wrong answers

    return { correctAnswers, incorrectAnswers };
}

// ! Display the result
btnSubmit.addEventListener('click', () => {
    clearInterval(timer);

   // ! Calculate the result
    const { correctAnswers, incorrectAnswers } = calculateScore();

   // ! Save the result to localStorage
    localStorage.setItem('examResult', JSON.stringify({ correctAnswers, incorrectAnswers }));

    window.location.href = 'reslut.html'; // ! Go to the exam results page
});

// ! Clear exam answers when exiting and opening a new exam
window.addEventListener('beforeunload', () => {
    localStorage.removeItem('selectedAnswers');
});

// !Load questions when page loads
loadQuestions();