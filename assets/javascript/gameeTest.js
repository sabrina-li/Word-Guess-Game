var game;

// when document load, get a word
window.onload = function() {
    // start the game with initial vars
    game = new Game();
    
}


//add event listener for key press
document.addEventListener('keypress', keyPressed);

// when user press any key
function keyPressed(event) {
    // console.log(event.key);
    // console.log(game.gameready);
    if (game.gameready){
        
        
        // console.log(game.wordLetter);
        document.getElementById("notStarted").style.display = "none";
        var thisKey = String.fromCharCode(event.keyCode).toLowerCase();
        
        //check if the key press is a-z or A-Z, 
        if (event.keyCode < 65 || (event.keyCode >90 && event.keyCode < 97) || event.keyCode > 122){
            //if not, alert user
            // console.log("Please type in A-Z!");
        }else if (game.word.includes(thisKey)){
            //guessed right
            game.addToWordLetterArray(thisKey); 
        }else{
            //guessed wrong, add to guessed and decrease life
            game.addToGuessedLetters(thisKey);
        }

        // console.log(game.wordLetter);
        // console.log(game.constructDisplayWord());


        
        game.updateUI();

        //guessed all
        if(game.wordLetter.indexOf(false) == -1){
            alert("you guessed it!");
            // update the image and the title after wining
            game.updateTitleAndImg();
            game.playSound();
            //reset parameters and get a new word
            game.addWin();
            game.getWordFromAPI(game);
        }
        //run out of live
        if(game.lives == 0){
            //confirm if want to start over again
            var retry = confirm("you died! :( Try again?");
            if(retry){
                game = new Game();
            }else{
                //TODO show game over
            }
        }
        game.updateUI();
    }

};











