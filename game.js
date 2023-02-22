var started = false;
var level = 0;

var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red","blue","green","yellow"];

$(".popup").click(function() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
})

$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if(gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }
    else {
        // console.log("wrong");
        var audio = new Audio("wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over! Press Any Key to Restart.");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
}

function playSound(name){
    var sound = new Audio(name + ".mp3");
    sound.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}
