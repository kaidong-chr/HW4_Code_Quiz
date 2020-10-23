// Variable for elements
let startQuizEl = document.getElementById("startQuiz")
let timerEl = document.getElementById("timer");
let questionsEl = document.getElementById("questions")
let choicesEl = document.getElementById("choices")

// Variables total time and questions progress
let timer = 75;
let questionsIndex = 0;
let timerFunc;

// Start timer 
function startQuiz() {
    //start the timer
    //click listener on start button
    //tell js to count in seconds
    

  // We only want to start the timer if totalSeconds is > 0
 
    /* The "interval" variable here using "setInterval()" begins the recurring increment of the
       secondsElapsed variable which is used to check if the time is up */
    timerFunc = setInterval(function() {
        timerEl.textContent = timer
        // console.log("function is firing")
        timer--;
        if (timer<0) { //won't go negative
            timer = 0;
        }
      }, 1000);
      console.log(timer)
      
    //show first question and possible answers
    //countdown number
}


// Start quiz
startQuizEl.onclick = startQuiz;

// Render quiz
// Variable for current question
// Render quesions to screen


// Compare choices to answer
// Loop for choices per question
// 

// Question grogress
// Increment questionIndex++
// 

// Quiz end
// When timer runs out or all questions answerd end quiz
// Make timer 0

// Save highscore
// When enter their name show highscore