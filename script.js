const questions = [{
    question: "What is largest animal in the world?",
    answers: [
        { text: "Shark", correct: false },
        { text: "Blue whale", correct: true},
        { text: "Elephant", correct: false },
        { text: "Giraffe", correct: false }
    ]
},
{
    question: "How would one say goodbye in Spanish?",
    answers: [
        { text: "Hola", correct: false },
        { text: "Au Revoir", correct: false },
        { text: "Adi&oacute;s", correct: true },
        { text: "Salir", correct: false }
    ]
},
{
    question: "What is the nickname of the US state of California?",
    answers: [
        { text: "Golden State", correct: true },
        { text: "Sunshine State", correct: false },
        { text: "Bay State", correct: false },
        { text: "Treasure State", correct: false }
    ]
},
{
    question: "Five dollars is worth how many nickles?",
    answers: [
        { text: "50", correct: false },
        { text: "25", correct: false },
        { text: "69", correct: false },
        { text: "100", correct: true }
    ]
},
{
    question: "What do the letters in the GMT time zone stand for?",
    answers: [
        { text: "Global Meridian Time", correct: false },
        { text: "General Median Time", correct: false },
        { text: "Greenwich Mean Time", correct: true },
        { text: "Glasgow Man Time", correct: false }
    ]
},
{
    question: "What nuts are used in the production of marzipan?",
    answers: [
        { text: "Peanuts", correct: false },
        { text: "Almonds", correct: true },
        { text: "Walnuts", correct: false },
        { text: "Pistachios", correct: false }
    ]
},
{
    question: "How many colors are there in a rainbow?",
    answers: [
        { text: "7", correct: true },
        { text: "8", correct: false },
        { text: "9", correct: false },
        { text: "10", correct: false }
    ]
},
{
    question: "Which country, not including Japan, has the most people of japanese decent?",
    answers: [
        { text: "South Korea", correct: false },
        { text: "China", correct: false },
        { text: "Brazil", correct: true },
        { text: "United States of America", correct: false }
    ]
},
{
    question: "Which country has the union jack in its flag?",
    answers: [
        { text: "South Africa", correct: false },
        { text: "Canada", correct: false },
        { text: "New Zealand", correct: true },
        { text: "Hong Kong", correct: false }
    ]
},
{
    question: "What is the official language of Brazil?",
    answers: [
        { text: "Portugese", correct: true },
        { text: "Brazilian", correct: false },
        { text: "Spanish", correct: false },
        { text: "English", correct: false }
    ]
}
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("btn-next");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    })
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrent = selectedBtn.dataset.correct === "true";
    if (isCorrent) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();