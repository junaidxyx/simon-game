
let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];  //randomChosenColour

let userClickedPattern = [];  //If the user clicks a button, it gets pushed into this array.

let started = false;

let level = 0;


// When user presses a key. Game starts.
$(document).keydown(function () {
    if (started == false) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});


function nextSequence () {
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("." + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("h1").text("Level " + level);
}

// User clicks
$(".btn").on("click", function () {
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


// Boss fight
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

// Plays sound 
function playSound(name) {
    let audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();  
}

// Adds grey animation to button
function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function () {
        $("." + currentColour).removeClass("pressed");
    }, 100);
}



