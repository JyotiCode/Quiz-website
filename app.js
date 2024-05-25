const question=[
     {
          question:"which is largest animal in the world",
          answer:[
               {text: "Shark", correct: false},
               {text: "blue whale", correct: true},
               {text: "elephant", correct: false},
               {text: "giraffe", correct: false},
          ]
     },
     {
          question:"which is smallest country in the world",
          answer:[
               {text: "vatican city", correct: true},
               {text: "bhutan", correct: false},
               {text: "nepal", correct: false},
               {text: "shri lanka", correct: false},
          ]
     },
     {
          question:"which is largest desert in the world",
          answer:[
               {text: "kalahari", correct: false},
               {text: "gobi", correct: false},
               {text: "sahara", correct: false},
               {text: "Antarctica", correct: true},
          ]
     },
     {
          question:"which is smallest continent in the world",
          answer:[
               {text: "Asia", correct: false},
               {text: "Australia", correct: true},
               {text: "Arctic", correct: false},
               {text: "Africa", correct: false},
          ]
     }
];

const questionElement= document.getElementById("question")
const answerButtons= document.getElementById("answer-btn")
const nextButton= document.getElementById("next-btn")

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
     currentQuestionIndex=0;
     score=0;
     nextButton.innerHTML="Next";
     showQuestion();
}

function showQuestion(){
     resetState();
     let currentQuestion= question[currentQuestionIndex];
     let questionNo= currentQuestionIndex +1;
     questionElement.innerHTML= questionNo + " ." + currentQuestion.question;

     currentQuestion.answer.forEach(answer=>{
          const button= document.createElement("button")
          button.innerHTML=answer.text;
          button.classList.add("btn");
          answerButtons.appendChild(button);
          if(answer.correct){
               button.dataset.correct= answer.correct;
          }
          button.addEventListener("click",selectAnswer);
     });
}
function resetState(){
     nextButton.style.display="none";
     while(answerButtons.firstChild){
          answerButtons.removeChild(answerButtons.firstChild)
     }
}

function selectAnswer(e){
     const selectedBtn=e.target;
     const isCorrect=selectedBtn.dataset.correct==="true";
     if(isCorrect){
          selectedBtn.classList.add("correct");
          score++;
     }else{
          selectedBtn.classList.add("incorrect");
     }
     Array.from(answerButtons.children).forEach(button=>{
          if(button.dataset.correct==="true"){
               button.classList.add("correct");
          }
          button.disabled= true;
     });
     nextButton.style.display= "block";
}

function showScore(){
     resetState();
     questionElement.innerHTML =` you Scored ${score} out of ${question.length}!`;
     nextButton.innerHTML="play Again";
     nextButton.style.display="block"
}


function handleNextButton(){
     currentQuestionIndex++;
     if(currentQuestionIndex<question.length){
          showQuestion();
     }else{
          showScore();
     }
}

nextButton.addEventListener("click", ()=>{
     if(currentQuestionIndex < question.length){
          handleNextButton();
     }else{
          startQuiz();
     }
})

startQuiz();