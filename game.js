var buttonColours = ["red", "blue", "green", "yellow"];
var gamePatern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


function startOver(){
  level = 0;
  gamePatern=[];
  started=false;
}

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] == gamePatern[currentLevel]){
    if (userClickedPattern.length === gamePatern.length){
      setTimeout(function(){
        nextSequence()
      },1000);
    }

  }else{
    playSound("wrong")
    $("body").addClass("game-over")
    setTimeout(function(){
      $("body").removeClass("game-over")

    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

$("body").keydown(function(){
  if (!started){
    nextSequence();
    started = true;
  }
})


$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
})


function nextSequence(){
  userClickedPattern=[];

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePatern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  $("#level-title").text("Level "+level);
  level++;

}

function playSound(name){
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  },100);
}
