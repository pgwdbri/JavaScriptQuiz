
//set up variables
var startButton = document.getElementById('startBtn')
var nextButton = document.getElementById('nextBtn')
var questionContainer = document.getElementById('questionContainer')
var questionEl = document.getElementById('question')
var answerButtonsEl = document.getElementById('answerButtons')
var restartButtonEl = document.getElementById('restartBtn')

//set up questions
//is the answer correct, using true or false
var questions = [
  {
    question: 'How do you write "Hello World" as an alert box in JavaScript?',
    answers: [
      { text: 'alert("Hello World")', correct: true },
      { text: 'msgBox("Hello World")', correct: false },
      { text: 'alertBox="Hello World"', correct: false },
      { text: 'alert."Hello World"', correct: false }
    ]
  },
  {
    question: 'How do you call a function named "myFunction" in JavaScript?',
    answers: [
      { text: 'myFunction ()', correct: true },
      { text: 'call myFunction ()', correct: false },
      { text: 'call function myFunction ()', correct: false },
      { text: 'call.myFunction ()', correct: false }
    ]
  },
  {
    question: 'What do you type in to add a comment in JavaScript?',
    answers: [
      { text: '#', correct: false },
      { text: '<!-->', correct: false },
      { text: '()', correct: false },
      { text: '//', correct: true }
    ]
  },
  {
    question: 'In JavaScript the symbols "+-/*" are referred to as?',
    answers: [
      { text: 'expressions', correct: false },
      { text: 'operators', correct: true },
      { text: 'commands', correct: false },
      { text: 'none of the above', correct: false }
    ]
  }
]

//setting up a timer function
var interval;

function startTimer(){
  clearInterval(interval);
  var time = 30
  interval = setInterval(function() {
    time--;
    if (time >= 0) {
      span = document.getElementById("time");
      span.innerHTML = time;
    }
    if (time === 0) {
      alert('Out of time');
    }
  }, 1000);
  //not working, need to deduct time when wrong answer is selected
}
//start timer function
function start() {
  document.getElementById("time");
  startTimer();
};


//setting up buttons to for quiz
//function to start quiz and function to set question order
startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

//function will begin the quiz, going through questions
//include function to setup next question
function startQuiz() {
  startButton.classList.add('hide')
  showQuestions = questions.sort()
  currentQuestionIndex = 0
  //0 = first
  questionContainer.classList.remove('hide')
  setNextQuestion()
}

//function will go to next questions once next is clicked
//include function to display question
function setNextQuestion() {
  resetState()
  showQuestion(showQuestions[currentQuestionIndex]);
  showQuestion()
}

//
function showQuestion(question) {
  questionEl.innerText = question.question
  //to go to next question

  question.answers.forEach(answer => {
    var button = document.createElement('button')
    //target button
    button.innerText = answer.text
    button.classList.add('btn')
    
    if (answer.correct) {
      button.dataset.correct = answer.correct
      //if the answer is true then it is correct, 
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsEl.appendChild(button)
  })
}

//re-sets answers and questions after each sequence
function resetState() {
  clearAnswer(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsEl.childNodes[0]) {
    //only want the first 4 answers for each question
    //for loop will just add on answers instead of limit to 4
    answerButtonsEl.removeChild(answerButtonsEl.childNodes[0])
  }
}


//selecting answers and recording if correct
function selectAnswer(e) {
  var selectedButton = e.target

  var correct = selectedButton.dataset.correct

  console.log(correct)
  //true if correct answer is picked
  //undefined if false

  if (showQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } 
  
  else {
    startButton.innerText = 'Restart'
    alert("Quiz Complete")
    startButton.classList.remove('hide')
  }
}

//function adds correct or wrong to the class name

function setAnswer(element, correct) {
  clearAnswer(element);
  if (correct) {
    element.classList.add('correct')
  } 
  else {
    element.classList.add('wrong')
  }
}
//clears the answers, removes correct and wrong identification class name
function clearAnswer(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}





