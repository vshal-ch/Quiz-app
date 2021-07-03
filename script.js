import { questions } from "./question.js";

const starTButton = document.querySelector(".start-quiz");
const homePage = document.querySelector(".homepage");
const questionPage = document.querySelector(".question-page");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const options = document.querySelectorAll(".option-text");
const question = document.querySelector(".question");
const finish = document.querySelector(".next.finish");
const resultPage = document.querySelector(".result-page");
const reQuiz = document.querySelector(".requiz");
const radios = document.querySelectorAll(".option-radio");
const score = document.querySelector(".score");

let current = 0;
let prevIndex;
let awnsers = [];

function startQuiz() {
  homePage.classList.add("gone");
  questionPage.classList.add("visible");
  setQuestion(current);
  prevIndex = current;
  current++;
}

function nextQuestion() {
  //pushing awnser to awnsers array to calculate score at the end
  awnsers.push(getResponse());
  //changing the question
  setQuestion(current);
  //resetting radio buttons
  radios.forEach((element) => {
    element.checked = false;
  });

  //changing the indexes used for prev and next question
  prevIndex = current - 1;
  //incrementing the current variable to use when next button is clicked
  current++;
  prev.classList.add("visible");

  //if the questions reach to end to change the next button into finish button
  if (current >= 10) {
    next.classList.add("final");
    next.textContent = "FINISH";
    next.removeEventListener("click", nextQuestion);
    document
      .querySelector(".next.final")
      .addEventListener("click", showResults);
  }
}

function getResponse() {
  return [...radios]
    .filter((radio) => radio.checked)
    .map((checked) => checked.labels[0].textContent)[0];
}

function prevQuestion() {
  setQuestion(prevIndex);
  current = prevIndex + 1;
  prevIndex = prevIndex - 1;
  awnsers.pop();
  if (prevIndex < 0) {
    prev.classList.remove("visible");
  }
  if (current < 10) {
    document
      .querySelector(".next.final")
      .removeEventListener("click", showResults);
    next.classList.remove("final");
    next.textContent = "NEXT";
    next.addEventListener("click", nextQuestion);
  }
}

function showResults() {
  awnsers.push(getResponse());
  score.textContent = calculateScore(awnsers);
  resultPage.classList.add("active");
  questionPage.classList.remove("visible");
  document
    .querySelector(".next.final")
    .removeEventListener("click", showResults);
  next.classList.remove("final");
  next.textContent = "NEXT";
  prev.classList.remove("visible");
  current = 0;
  prevIndex = -1;
  setQuestion(current);
  awnsers = [];
  radios.forEach((element) => {
    element.checked = false;
  });
}

function requiz() {
  resultPage.classList.remove("active");
  homePage.classList.remove("gone");
  next.addEventListener("click", nextQuestion);
}

function setQuestion(questionNo) {
  question.textContent = `${questionNo + 1}) ${
    questions.questions[questionNo].text
  }`;
  options[0].textContent = questions.questions[questionNo].option1;
  options[1].textContent = questions.questions[questionNo].option2;
  options[2].textContent = questions.questions[questionNo].option3;
  options[3].textContent = questions.questions[questionNo].option4;
}

function calculateScore(awnsers) {
  let mark = 0;
  awnsers.forEach((awnser, index) => {
    if (awnser === questions.questions[index].correctAwnser) {
      mark++;
    }
  });
  return mark;
}

starTButton.addEventListener("click", startQuiz);
next.addEventListener("click", nextQuestion);
prev.addEventListener("click", prevQuestion);
reQuiz.addEventListener("click", requiz);
