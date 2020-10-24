// Variable for elements
let timerEl = document.getElementById("timerStart");
let startQuizEl = document.getElementById("startQuiz");
let questionsEl = document.getElementById("questions");
let container = document.getElementById("container");

// Variables total time, interval,  penalty and questions progress
let timer = 75;
let timeInterval = 0;
let penalty = 5;
let questionIndex = 0;
let score = 0;

// Creating the ul element for later use
let ulCreate = document.createElement("ul"); //Clear this up later

// Timer goes and user display
startQuizEl.addEventListener("click", function () {
  if (timeInterval === 0) {
    timeInterval = setInterval(function () {
      timer--;
      timerEl.textContent = "Time Left:" + timer;

      if (timer <= 0) {
        clearInterval(timeInterval);
        quizFinish();
        timerEl.textContent = "Out of time!";
      }
    }, 1000);
  }
  render(questionIndex);
});

// Render quiz and choices
function render(questionIndex) {
  // Clear questions
  questionsEl.innerHTML = "";
  ulCreate.innerHTML = "";
  // Loop through questions and choices
  for (var i = 0; i < questions.length; i++) {
    //
    var allQuestions = questions[questionIndex].title;
    //
    var allChoices = questions[questionIndex].choices;
    questionsEl.textContent = allQuestions;
  }

  // List question choices for each new questions
  allChoices.forEach(function (newEach) {
    let eachItem = document.createElement("li");
    eachItem.textContent = newEach;
    questionsEl.appendChild(ulCreate);
    ulCreate.appendChild(eachItem);
    eachItem.addEventListener("click", (compare));
  })
}

// Compare choices to answer
function compare(event) {
  var element = event.target;

  if (element.matches("li")) {

    var newDiv = document.createElement("div");
    newDiv.setAttribute("id", "newDiv");
    // Correct answer
    if (element.textContent == questions[questionIndex].anwser) {
      score++;
      newDiv.textContent =
        "Right! The answer is: " + questions[questionIndex].answer;
    } else {
      // Penalty for wrong answers
      timer = timer - penalty;
      newDiv.textContent =
        "Oops! The correct answer is " + questions[questionIndex].answer;
    }
  }

  // Question grogress
  questionIndex++;

  if (questionIndex >= questions.length) {
    // When quiz is finished we will show user stats
    quizFinish();
    newDiv.textContent =
      "This is the end" +
      " " +
      "You got " +
      score +
      "/" +
      questions.length +
      "right!";
  } else {
    render(questionIndex);
  }
  questionsEl.appendChild(newDiv);
}

// Quiz end
function quizFinish() {

  questionsEl.innerHTML = "";
  timerEl.innerHTML = "";

  // Heading:
  var createH1 = document.createElement("h1");
  createH1.setAttribute("id", "createH1");
  createH1.textContent = "All Done!";

  questionsEl.appendChild(createH1);

  // Paragraph
  var createP = document.createElement("p");
  createP.setAttribute("id", "createP");

  questionsEl.appendChild(createP);

  // Calculates time remaining and replaces it with score
  if (timer >= 0) {
    var timeRemaining = timer;
    var createP2 = document.createElement("p");
    clearInterval(timeInterval);
    createP.textContent = "Your final score is: " + timeRemaining;

    questionsEl.appendChild(createP2);
  }

  // Label
  var createLabel = document.createElement("label");
  createLabel.setAttribute("id", "createLabel");
  createLabel.textContent = "Enter your initials: ";

  questionsEl.appendChild(createLabel);

  // input
  var createInput = document.createElement("input");
  createInput.setAttribute("type", "text");
  createInput.setAttribute("id", "initials");
  createInput.textContent = "";

  questionsEl.appendChild(createInput);

  // submit
  var createSubmit = document.createElement("button");
  createSubmit.setAttribute("type", "submit");
  createSubmit.setAttribute("id", "Submit");
  createSubmit.textContent = "Submit";

  questionsEl.appendChild(createSubmit);

  // Event listener to capture initials and local storage for initials and score
  createSubmit.addEventListener("click", function () {
    var initials = createInput.value;

    if (initials === null) {
      console.log("No value entered!");
    } else {
      var finalScore = {
        initials: initials,
        score: timeRemaining,
      };
      console.log(finalScore);
      var allScores = localStorage.getItem("allScores");
      if (allScores === null) {
        allScores = [];
      } else {
        allScores = JSON.parse(allScores);
      }
      allScores.push(finalScore);
      var newScore = JSON.stringify(allScores);
      localStorage.setItem("allScores", newScore);
      // Travels to final page
      window.location.replace("./scoreboard.html");
    }
  });
}