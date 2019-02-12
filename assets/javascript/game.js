var started = false;
var wins = 0;
var word="";//original word to be guessed
var wordLetter=[];//split into lettters guessed or not
var guessedLetter = [];
var lives=12;
var imgLink = "http://lorempixel.com/g/200/400/";

//api key for https://www.potterapi.com/#introduction
var urlprefix="http://hp-api.herokuapp.com/api/characters";
// var apikey = "$2a$10$b/eT7zLFv5byV8neJHr5Cenzbty4CSQZB17Q8L26AcHZ7i4KH.54i";


// when document load, get a word
window.onload = function() {
    // console.log("here");
    restartGame();
}

//add event listener for key press
document.addEventListener('keypress', keyPressed);

// when user press any key
function keyPressed(event) {
    console.log("key pressed! " )
    // start the game with initial vars
    document.getElementById("notStarted").style.display = "none";
    var thisKey = String.fromCharCode(event.keyCode).toLowerCase();
    
    if (thisKey == " "){
        //if space do nothing
    }else if (word.includes(thisKey)){
        //guessed right
        addToWordLetterArray(thisKey); 
    }else{
        //guessed wrong, add to guessed and decrease life
        addToGuessedLetters(thisKey);
    }

     updateUI();

    //guessed all
    if(wordLetter.indexOf(false) == -1){
        alert("you guessed it!");
        addWin();
        getWordFromAPI();
        updateUI();
        //TODO update the image and the title after wining
        // updateTitleAndImg();
    }
    //run out of live
    if(lives == 0){
        //confirm if want to start over again
        alert("you died! :(");
    }

};

//reset all to initial and get new word
function restartGame(){
    wins = 0;
    word="";//original word to be guessed
    wordLetter=[];//split into lettters guessed or not
    guessedLetter = [];
    lives=12;
    document.getElementById("notStarted").style.display = "initial";
    getWordFromAPI();
}

//get a word form api
function getWordFromAPI(){
    const http = new XMLHttpRequest();
    const url = urlprefix;
    http.open("GET",url);
    http.send();
    
    http.onreadystatechange = function(){
        // console.log(http.status);
        if(this.readyState == 4 && this.status ==200){
            var j = JSON.parse(http.responseText)
            // console.log(j[0].name);
            // console.log(j[0].image);

            var characterId = Math.floor(Math.random() * j.length); //random charactor id generating
                //test case:
            // word = "Harry Potter potter";
            word = j[characterId].name.toLowerCase();
            console.log(word);
            //removing all spaces
            //TODO show spaces in ui
            // word = word.toLowerCase().replace(/\s/g, '');
            for (i = 0; i<word.length;i++){
               if (word[i] !== " "){
                    wordLetter.push(false);
               }else{
                   wordLetter.push(true);
               }
            }
            // console.log(word);
            // console.log(wordLetter);

        }else if(this.status !== 200){
            alert("Sorry, API isn't working! Try again later!");
        }
    }

}


function addToWordLetterArray(thisKey){
    var startIndex = 0;
    while((i = word.indexOf(thisKey,startIndex))> -1 ){
        // console.log( "here index is: " + i);
        wordLetter[i] = thisKey;
        // console.log("word is now: " + word);
        // console.log("word array is now: "+wordLetter);
        startIndex = i+1;
    }
}

function constructDisplayWord(){
    var displayWord = "";
    // console.log("display word build for: " +wordLetter);
    for (i=0;i<wordLetter.length;i++){
        if (wordLetter[i] == true){
            displayWord += "&nbsp;&nbsp;&nbsp;";
        }else if(wordLetter[i] == false){
            displayWord += "_&nbsp;"
        }else{
            displayWord += wordLetter[i]+"&nbsp;";
        }
        // console.log(i + "th iteration: " + displayWord);
    }
    return displayWord;
}

function addToGuessedLetters(thisKey){
    if(guessedLetter.includes(thisKey)){
        //guessed the same key already guessed
    }else{
        guessedLetter.push(thisKey);
        lives -= 1;
    }
}

function updateUI(){
    document.getElementById("theWord").innerHTML = constructDisplayWord();
    document.getElementById("guessdLetter").innerHTML = guessedLetter;
    document.getElementById("lives").innerHTML = lives;
    document.getElementById("wins").innerHTML = wins;
}



function addWin(){
    lives=12;
    wins += 1;  
    word="";//original word to be guessed
    wordLetter=[];//split into lettters guessed or not
    guessedLetter = [];
}