const buttonColours = [
    "red",
    "blue",
    "green",
    "yellow"
];
let gamePattern = [];
let userPattern = [];
let level = 1;

function newSequence(){
    userPattern = [];
    $("h1").text("level " + level);
    level++;
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed")
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}

function startOver(){
    level = 1;
    gamePattern = [];

}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userPattern[currentLevel]){
        if(userPattern.length === gamePattern.length){
            setTimeout(function () {
                newSequence();
            }, 1000);
    }}
    else{
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart")
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200);
        startOver();
    }
}

$(".btn").on("click", function(e){
    let userChosenColor = e.target.id;
    userPattern.push(userChosenColor);
    checkAnswer(userPattern.length - 1);
    playSound(userChosenColor);   
    animatePress(userChosenColor);
})

$(document).on("keydown", function() {
    newSequence();
})
