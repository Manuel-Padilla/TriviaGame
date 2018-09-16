var panel = $("#quiz-area");
var countStartNumber = 30;

var questions = [{
  question: '1. NewsRadio was set at WNYX, a fictional AM news radio station located in what city?',
  answers: ['A. Boston','B. Chicago','C. Los Angeles','D. New York City'],
  correctAnswer: 'D. New York City',
  image: "assets/images/newsradio.gif"
},

{
  question: '2. WNYX station manager Dave Nelson has an intermittent relationship with whom?',
  answers: ['A. Lisa','B. Beth','C. Catherine','D. Andrea'],
  correctAnswer: 'A. Lisa',
  image: "assets/images/lisa.gif"
},

{
  question: '3. Station electrician Joe Garrelli espouses various conspiracy theories, being particularly concerned with the government\'s suppression of information about what?',
  answers: [ 'A. global warming','B. communism','C. the cold war','D. extraterrestrials'],
  correctAnswer: 'D. extraterrestrials',
  image: "assets/images/joe.gif"
},

{
  question: '4. Catherine Duke, the second of WNYX\'s news anchors, is often bitter rivals with whom?',
  answers: [ 'A. Lisa','B. Mr. James','C. Dave','D. Bill'],
  correctAnswer: 'D. Bill',
  image: "assets/images/catherine_bill.gif"
},

{
  question: '5. Lauren Graham had a four-episode run as Andrea, an efficiency expert who shakes up the office. Which of the following changes did she NOT make?',
  answers: [ 'A. fired Matthew','B. demoted Dave','C. promoted Lisa to station manager','D. fired Bill'],
  correctAnswer: 'D. fired Bill',
  image: "assets/images/lauren.gif"
},

{
  question: '6. Which character actually holds a degree in dentistry but prefers to work in radio journalism?',
  answers: [ 'A. Matthew','B. Dave','C. Bill','D. Catherine'],
  correctAnswer: 'A. Matthew',
  image: "assets/images/matthew.gif"
},

{
  question: '7. A recurring theme in the show is station manager Jimmy James\' desperate search for a what?',
  answers: [ 'A. new location for the radio station','B. dog','C. business partner','D. wife'],
  correctAnswer: 'D. wife',
  image: "assets/images/jimmy.gif"
},

{
  question: '8. What character\'s salary is often the subject of jokes on the show?',
  answers: [ 'A. Beth','B. Dave','C. Matthew','D. Joe'],
  correctAnswer: 'A. Beth',
  image: "assets/images/beth.gif"
},

{
  question: '9. What actor replaced Phil Hartman on "NewsRadio" after Hartman was murdered in 1998?',
  answers: [ 'A. Patrick Warburton','B. Bob Odenkirk','C. David Cross','D. Jon Lovitz'],
  correctAnswer: 'D. Jon Lovitz',
  image: "assets/images/john.gif"
},

{
  question: '10. There were three actors that appeared in all 97 episodes of "NewsRadio." Which of the following is NOT one of them?',
  answers: [ 'A. Dave Foley','B. Stephen Root','C. Maura Tierney','D. Andy Dick'],
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

    countdown: function() {
      game.counter--;
      $('#counter-number').text(game.counter);
      if (game.counter === 0) {
        console.log("TIME'S UP");
        game.timeUp();
      }
    },

    loadQuestion: function() {
      timer = setInterval(game.countdown, 1000);
      panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");
      for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
        panel.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i] + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
      }
    },

    nextQuestion: function() {
      game.counter = countStartNumber;
      $("#counter-number").text(game.counter);
      game.currentQuestion++;
      game.loadQuestion();
    },

    timeUp: function() {
      clearInterval(timer);
      $("#counter-number").html(game.counter);
      panel.html("<h2>Out of Time!</h2>");
      panel.append("<h3>The Correct Answer is: " + questions[this.currentQuestion].correctAnswer);
      panel.append("<img src='" + questions[this.currentQuestion].image + "' />");
      if (game.currentQuestion === questions.length - 1) {
        setTimeout(game.results, 6 * 1000);
      } else {
        setTimeout(game.nextQuestion, 6 * 1000);
      }
    },

    results: function() {
      clearInterval(timer);
      panel.html("<h2>The results are in.</h2>");
      $("#counter-number").text(game.counter);
      panel.append("<h3>Correct Answers: " + game.correct + "</h3>");
      panel.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
      panel.append("<h3>Unanswered: " + (questions.length - (game.incorrect)) + "</h3>");
      panel.append("<br><button id='start-over'>Play again?</button>");
    },

    clicked: function(e) {
      clearInterval(timer);
      if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
        this.answeredCorrectly();
      } else {
        this.answeredIncorrectly();
      }
    },

    answeredIncorrectly: function() {
      clearInterval(timer);
      game.incorrect++;
      panel.html("<h2>That is incorrect.</h2>");
      panel.append("<h3>The Correct Answer is: " + questions[game.currentQuestion].correctAnswer + "</h3>");
      panel.append("<img src='" + questions[game.currentQuestion].image + "' />");
      if (game.currentQuestion === questions.length - 1) {
        setTimeout(game.results, 6 * 1000);
      } else {
        setTimeout(game.nextQuestion, 6 * 1000);
      }
    },

    answeredCorrectly: function() {
      clearInterval(timer);
      game.correct++;
      panel.html("<h2>Right on!</h2>");
      panel.append("<img src='" + questions[game.currentQuestion].image + "' />");
      if (game.currentQuestion === questions.length - 1) {
        setTimeout(game.results, 6 * 1000);
      } else {
        setTimeout(game.nextQuestion, 6 * 1000);
      }
    },

    reset: function() {
      this.currentQuestion = 0;
      this.counter = countStartNumber;
      this.correct = 0;
      this.incorrect = 0;
      this.loadQuestion();
    }
 };   

    // click events

$(document).on("click", "#start-over", function() {
  game.reset();
});

$(document).on("click", ".answer-button", function(e) {
  game.clicked(e);
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
  game.loadQuestion();
});

