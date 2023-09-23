// All Buttons
var buttonColors = ["red", "blue", "green", "yellow"];

// Game Sequence & Answer Sequence
var gamePattern = [];
var userClickedPattern = [];

// Event Handler for keypress
var started = false;
var level = 0;
$(document).keydown(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});   

// Event Handler for Buttons
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

// Check Answer
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function(){
            nextSequence();
        }, 500);
      }
    } else {
      playSound("wrong");
      // $("body").addClass("game-over");
  
      // setTimeout(function(){
      //     $("body").removeClass("game-over");
      // },200);
  
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }
}
  
// Generating Next Sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 3);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // Animation
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  //Make Sound
  playSound(randomChosenColor);
}

// Play Sound
function playSound(name) {
  var audio = new Audio("assets/sounds/" + name + ".mp3");
  audio.play();
}

// Animate Press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


// Restart Game
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}