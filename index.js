const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;
let questions = [];
let startTime;
let endTime;


fetch( 'https://opentdb.com/api.php?amount=20&category=18&difficulty=medium&type=multiple')
    .then((response) => {
        return response.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions.results.map((loadedQuestion) => {
            const formattedQuestion = {
                question: loadedQuestion.question,
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            answerChoices.splice(
                formattedQuestion.answer - 1,
                0,
                loadedQuestion.correct_answer
            );

            answerChoices.forEach((choice, index) => {
                formattedQuestion['choice' + (index + 1)] = choice;
            });

            return formattedQuestion;
        });
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });


startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('/end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};

function start() {
    startTime = new Date();

    var x = setInterval(function() {

        endTime = new Date();
        let diffTime = endTime - startTime;

        diffTime /=1000;

        let seconds = Math.round(diffTime);

        var x = setInterval(function () {
            console.log(seconds + ' seconds');


            clearInterval(x);
            document.getElementById("timer").innerHTML = seconds;

        });

        if (time === 0) {
            clearInterval(x);
            window.onload = start();
        }
    });
}

const quizQuestions = [
    {
        "question": "What Programming language is taught in introduction to programming at St John's?",
        "choice1": "Python",
        "choice2": "Java",
        "choice3": "C++",
        "choice4": "Ruby",
        "answer": 2
    },
    {
        "question": "What Programming language is designed for the .NET framework?",
        "choice1": "Objective-C",
        "choice2": "C",
        "choice3": "C#",
        "choice4": "C++",
        "answer": 3
    },
    {
        "question": "What year was Javascript Created?",
        "choice1": "1970",
        "choice2": "1990",
        "choice3": "2000",
        "choice4": "1995",
        "answer": 4
    },

    {
        "question": "How do you print in the Console in Java?",
        "choice1": "Println",
        "choice2": "Print",
        "choice3": "Console.log",
        "choice4": "None of the Above",
        "answer": 4
    },
    {
        "question": "What language does not require Semicolons",
        "choice1": "Python",
        "choice2": "Java",
        "choice3": "C#",
        "choice4": "Ruby",
        "answer": 1
    },
    {
        "question": "What OS is created by Microsoft",
        "choice1": "iOS",
        "choice2": "Windows",
        "choice3": "Linux",
        "choice4": "Android",
        "answer": 2
    },
    {
        "question": "Which of the following is NOT a data structure",
        "choice1": "Binary-Search",
        "choice2": "Linked-List",
        "choice3": "Pyramid-Search",
        "choice4": "Red-Black Tree",
        "answer": 3
    },
    {
        "question": "What year did the C Language come out?",
        "choice1": "1965",
        "choice2": "1971",
        "choice3": "1975",
        "choice4": "1972",
        "answer": 4
    },
    {
        "question": "What is an example of a string",
        "choice1": "Hello",
        "choice2": "A",
        "choice3": "3",
        "choice4": "3.14",
        "answer": 1
    },
    {
        "question": "What is an example of an integer",
        "choice1": "Hello",
        "choice2": "A",
        "choice3": "3",
        "choice4": "3.14",
        "answer": 3
    },
    {
        "question": "What is an example of a double/float",
        "choice1": "Hello",
        "choice2": "A",
        "choice3": "3",
        "choice4": "3.14",
        "answer": 4
    },
    {
        "question": "What is an example of a char",
        "choice1": "Hello",
        "choice2": "A",
        "choice3": "3",
        "choice4": "3.14",
        "answer": 2
    },
    {
        "question": "Which language does not support libraries",
        "choice1": "Java",
        "choice2": "C",
        "choice3": "C++",
        "choice4": "Python",
        "answer": 2
    },
    {
        "question": "What do you use to create elements on a page in HTML?",
        "choice1": "Marks",
        "choice2": "Things",
        "choice3": "Tags",
        "choice4": "Commands",
        "answer": 3
    },
    {
        "question": "The rails framework pairs with which language",
        "choice1": "Ruby",
        "choice2": "Java",
        "choice3": "Python",
        "choice4": "C++",
        "answer": 1
    },
    {
        "question": "Which language is designed for Apple",
        "choice1": "Objective-C",
        "choice2": "Ruby",
        "choice3": "Python",
        "choice4": "Swift",
        "answer": 4
    },
    {
        "question": "What is the building blocks of coding using Hexadecimal code known as?",
        "choice1": "Binary",
        "choice2": "Assembly",
        "choice3": "C",
        "choice4": "Fortran",
        "answer": 2
    },
    {
        "question": "What uses bits containing 0 and 1 to communicate with the machine",
        "choice1": "Hexadecimal",
        "choice2": "Octagonal",
        "choice3": "Decimal",
        "choice4": "Binary",
        "answer": 4
    },
    {
        "question": "What do you use to Style HTML",
        "choice1": "CSS",
        "choice2": "C++",
        "choice3": "Java",
        "choice4": "Github",
        "answer": 1
    },
    {
        "question": "Which is a framework of Javascript?",
        "choice1": "Java",
        "choice2": "Kotlin",
        "choice3": "JQuery",
        "choice4": "JTable",
        "answer": 3
    }
];

/*
Sources
https://www.bestcssbuttongenerator.com/
https://www.youtube.com/watch?v=jK5zzSA2JHI&list=PLDlWc9AfQBfZIkdVaOQXi1tizJeNJipEx&index=11
https://stackoverflow.com/questions/356809/best-way-to-center-a-div-on-a-page-vertically-and-horizontally
 */
