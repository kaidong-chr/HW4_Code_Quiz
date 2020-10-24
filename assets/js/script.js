// Variable for elements
var timerEl = document.getElementById("timerStart");
var startQuizEl = document.getElementById("startQuiz");
var questionsEl = document.getElementById("questions");
var container = document.getElementById("container");

// Variables total time, interval,  penalty and questions progress
var timer = 75;
var timeInterval = 0;
var penalty = 5;
var questionIndex = 0;
var score = 0;

// Creating the ul element for later use
var ulCreate = document.createElement("ul"); //Clear this up later

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
  for (var i = 0; i < questions.length; i++) {
    //
    var allQuestions = questions[questionIndex].title;
    //
    var allChoices = questions[questionIndex].choices;
    questionsEl.textContent = allQuestions;
  }

  // List question choices for each new questions
  allChoices.forEach(function (newEach) {
    var eachItem = document.createElement("li");
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
        "The correct answer is " + questions[questionIndex].answer;
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
  var createH1 = document.createElement("h1");
  createH1.setAttribute("id", "createH1");
  createH1.textContent = "All Done!";

  questionsEl.appendChild(createH1);

  // Paragraph for displaying final score
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

  // Creat label to enter initials
  var createLabel = document.createElement("label");
  createLabel.setAttribute("id", "createLabel");
  createLabel.textContent = "Enter your initials: ";

  questionsEl.appendChild(createLabel);

  // Input for the initials
  var createInput = document.createElement("input");
  createInput.setAttribute("type", "text");
  createInput.setAttribute("id", "initials");
  createInput.textContent = "";

  questionsEl.appendChild(createInput);

  // Submit the highscore and user initials
  var createSubmit = document.createElement("button");
  createSubmit.setAttribute("type", "submit");
  createSubmit.setAttribute("id", "Submit");
  createSubmit.textContent = "Submit";

  questionsEl.appendChild(createSubmit);

  // Event listener to capture initials and scores for local storage
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
    
      // Go to scoreboard
      window.location.replace("./scoreboard.html");
    }
  });
}