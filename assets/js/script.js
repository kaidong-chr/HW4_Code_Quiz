// variable for elements
let timerEl = document.getElementById("timerStart");
let startQuizEl = document.getElementById("startQuiz");
let questionsEl = document.getElementById("questions");
let container = document.getElementById("container");

// variables total time, interval,  penalty and questions progress
let timer = 75;
let timeInterval = 0;
let penalty = 5;
let questionIndex = 0;
let score = 0;

// Creating the ul element for later use
let ulCreate = document.createElement("ul");

// Timer goes and user display
startQuizEl.addEventListener("click", function () {
  if (timeInterval === 0) {
    timeInterval = setInterval(function () {
      timer--;
      timerEl.textContent = "Time Left: " + timer;

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
  for (let i = 0; i < questions.length; i++) {
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
  let element = event.target;

  if (element.matches("li")) {

    var newDiv = document.createElement("div");
    newDiv.setAttribute("id", "newDiv");
    // Correct answer
    if (element.textContent == questions[questionIndex].answer) {
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
      "This is the end!" +
      " " +
      "You got " +
      score +
      "/" +
      questions.length +
      " right!";
  } else {
    render(questionIndex);
  }
  questionsEl.appendChild(newDiv);
}

// Quiz end
function quizFinish() {

  questionsEl.innerHTML = "";
  timerEl.innerHTML = "";

  // Heading for done message
  let createH1 = document.createElement("h1");
  createH1.setAttribute("id", "createH1");
  createH1.textContent = "All Done!";

  questionsEl.appendChild(createH1);

  // Paragraph for displaying final score
  let createP = document.createElement("p");
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

  // Create label to enter initials
  let createLabel = document.createElement("label");
  createLabel.setAttribute("id", "createLabel");
  createLabel.textContent = "Enter your initials: ";

  questionsEl.appendChild(createLabel);

  // Create input for the initials
  let createInput = document.createElement("input");
  createInput.setAttribute("type", "text");
  createInput.setAttribute("id", "initials");
  createInput.textContent = "";

  questionsEl.appendChild(createInput);

  // Create submit for highscore and user initials
  let createSubmit = document.createElement("button");
  createSubmit.setAttribute("type", "submit");
  createSubmit.setAttribute("id", "Submit");
  createSubmit.textContent = "Submit";

  questionsEl.appendChild(createSubmit);

  // Event listener to capture initials and scores for local storage
  createSubmit.addEventListener("click", function () {
    let initials = createInput.value;

    if (initials === null) {
    } else {
      var finalScore = {
        initials: initials,
        score: timeRemaining,
      };
      var allScores = localStorage.getItem("allScores");
      if (allScores === null) {
        allScores = [];
      } else {
        allScores = JSON.parse(allScores);
      }
      allScores.push(finalScore);
      var newScore = JSON.stringify(allScores);
      localStorage.setItem("allScores", newScore);
    
      // Go to scoreboard
      window.location.replace("./scoreboard.html");
    }
  });
}