//variable is assigned jquery call to html location
var panel = $("#quiz-area");
var countStartNumber = 30;

//create an array of objects - questions, choices, correct answers and gifs
var questions = [{
  question: '1. NewsRadio was set at WNYX, a fictional AM news radio station located in what city?',
  choices: ['A. Boston', 'B. Chicago', 'C. Los Angeles', 'D. New York City'],
  correctAnswer: 'D. New York City',
  image: "assets/images/newsradio.gif",
  audio: "assets/images/newsradio_theme.mp3" //attempted to add audio
},

{
  question: '2. WNYX station manager Dave Nelson has an intermittent relationship with whom?',
  choices: ['A. Lisa', 'B. Beth', 'C. Catherine', 'D. Andrea'],
  correctAnswer: 'A. Lisa',
  image: "assets/images/lisa.gif"
},

{
  question: '3. Station electrician Joe Garrelli espouses various conspiracy theories, being particularly concerned with the government\'s suppression of information about what?',
  choices: ['A. global warming', 'B. communism', 'C. the cold war', 'D. extraterrestrials'],
  correctAnswer: 'D. extraterrestrials',
  image: "assets/images/joe.gif"
},

{
  question: '4. Catherine Duke, the second of WNYX\'s news anchors, is often bitter rivals with whom?',
  choices: ['A. Lisa', 'B. Mr. James', 'C. Dave', 'D. Bill'],
  correctAnswer: 'D. Bill',
  image: "assets/images/catherine_bill.gif"
},

{
  question: '5. Lauren Graham had a four-episode run as Andrea, an efficiency expert who shakes up the office. Which of the following changes did she NOT make?',
  choices: ['A. fired Matthew', 'B. demoted Dave', 'C. promoted Lisa to station manager', 'D. fired Bill'],
  correctAnswer: 'D. fired Bill',
  image: "assets/images/lauren.gif"
},

{
  question: '6. Which character actually holds a degree in dentistry but prefers to work in radio journalism?',
  choices: ['A. Matthew', 'B. Dave', 'C. Bill', 'D. Catherine'],
  correctAnswer: 'A. Matthew',
  image: "assets/images/matthew.gif"
},

{
  question: '7. A recurring theme in the show is station manager Jimmy James\' desperate search for a what?',
  choices: ['A. new location for the radio station', 'B. dog', 'C. business partner', 'D. wife'],
  correctAnswer: 'D. wife',
  image: "assets/images/jimmy.gif"
},

{
  question: '8. What character\'s salary is often the subject of jokes on the show?',
  choices: ['A. Beth', 'B. Dave', 'C. Matthew', 'D. Joe'],
  correctAnswer: 'A. Beth',
  image: "assets/images/beth.gif"
},

{
  question: '9. What actor replaced Phil Hartman on "NewsRadio" after Hartman was murdered in 1998?',
  choices: ['A. Patrick Warburton', 'B. Bob Odenkirk', 'C. David Cross', 'D. Jon Lovitz'],
  correctAnswer: 'D. Jon Lovitz',
  image: "assets/images/john.gif"
},

{
  question: '10. There were three actors that appeared in all 97 episodes of "NewsRadio." Which of the following is NOT one of them?',
  choices: ['A. Dave Foley', 'B. Stephen Root', 'C. Maura Tierney', 'D. Andy Dick'],
  correctAnswer: 'C. Maura Tierney',
  image: "assets/images/hug.gif"
}];

//variables to hold setInterval
var timer;

var game = {

  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  countdown: function () {
    game.counter--;
    $('#counter-number').text(game.counter);
    if (game.counter === 0) {
      console.log("TIME'S UP");
      game.timeUp();
    }
  },

  loadQuestion: function () {
    timer = setInterval(game.countdown, 1000);
    panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");
    for (var i = 0; i < questions[this.currentQuestion].choices.length; i++) {
      panel.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].choices[i] + "'>" + questions[this.currentQuestion].choices[i] + "</button>");
    }
  },

  nextQuestion: function () {
    game.counter = countStartNumber;
    $("#counter-number").text(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },

  timeUp: function () {
    clearInterval(timer);
    $("#counter-number").html(game.counter);
    panel.html("<h2>Out of Time!</h2>");
    panel.append("<h3>The Correct Answer is: " + questions[this.currentQuestion].correctAnswer);
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");
    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 7 * 1000);
    } else {
      setTimeout(game.nextQuestion, 7 * 1000);
    }
  },

  results: function () {
    clearInterval(timer);
    panel.html("<h2>Your WNYX results are in.</h2>");
    $("#counter-number").text(game.counter);
    panel.append("<h3>Correct Answers: " + game.correct + "</h3>");
    panel.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
    panel.append("<h3>Unanswered: " + (questions.length - (game.incorrect)) + "</h3>");
    panel.append("<br><button id='start-over'>Wanna play again?</button>");
  },

  clicked: function (e) {
    clearInterval(timer);
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function () {
    clearInterval(timer);
    game.incorrect++;
    panel.html("<h2>Wrong.</h2>");
    panel.append("<h3>The Correct Answer is: " + questions[game.currentQuestion].correctAnswer + "</h3>");
    panel.append("<img src='" + questions[game.currentQuestion].image + "' />");
    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 7 * 1000);
    } else {
      setTimeout(game.nextQuestion, 7 * 1000);
    }
  },

  answeredCorrectly: function () {
    clearInterval(timer);
    game.correct++;
    panel.html("<h2>Right!</h2>");
    panel.append("<img src='" + questions[game.currentQuestion].image + "' />");
    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 7 * 1000);
    } else {
      setTimeout(game.nextQuestion, 7 * 1000);
    }
  },

  reset: function () {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

// click events

$(document).on("click", "#start-over", function () {
  game.reset();
});

$(document).on("click", ".answer-button", function (e) {
  game.clicked(e);
});

$(document).on("click", "#start", function () {
  $("#time-counter").prepend("<h2>Countdown : <span id='counter-number'>30</span> seconds</h2>");

  //*******attempted to have text display "second" instead of "seconds" when number reaches "1"
  // while (timer === 1000) {
  //   $("#time-counter").prepend("<h2>Countdown : <span id='counter-number'>30</span> second</h2>");
  // }

  game.loadQuestion();
});

