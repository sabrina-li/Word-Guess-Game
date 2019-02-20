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
    if (game.gameReady){
        document.getElementById("notStarted").style.display = "none";
        let thisKey = String.fromCharCode(event.keyCode).toLowerCase();
        
        game.guessALetter(thisKey);
        game.updateUI();

        //guessed all
        if(game.guessedAll()){
            alert("you guessed it!");
            //reset parameters and get a new word
            game.addWin();
        }
        //run out of live
        if(game.dies()){
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











