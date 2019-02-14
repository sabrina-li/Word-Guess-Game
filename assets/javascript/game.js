var pageloaded = false;
var wins = 0;
var word="";//original word to be guessed
var wordLetter=[false];//split into lettters guessed or not
var guessedLetter = [];
var lives=12;
var imgLink = "assets/images/HP_5_CVR_LRGB.jpg";


var urlprefix="http://hp-api.herokuapp.com/api/characters";
// var apikey = "$2a$10$b/eT7zLFv5byV8neJHr5Cenzbty4CSQZB17Q8L26AcHZ7i4KH.54i";


// when document load, get a word
window.onload = function() {
    // start the game with initial vars
    restartGame();
}


//add event listener for key press
document.addEventListener('keypress', keyPressed);

// when user press any key
function keyPressed(event) {
    if (pageloaded){
        document.getElementById("notStarted").style.display = "none";
        var thisKey = String.fromCharCode(event.keyCode).toLowerCase();
        
        //check if the key press is a-z or A-Z, 
        if (event.keyCode < 65 || (event.keyCode >90 && event.keyCode < 97) || event.keyCode > 122){
            //if not, alert user
            alert("Please type in A-Z!")
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
            // update the image and the title after wining
            updateTitleAndImg();
            //reset parameters and get a new word
            addWin();
            getWordFromAPI();
        }
        //run out of live
        if(lives == 0){
            //confirm if want to start over again
            var retry = confirm("you died! :( Try again?");
            if(retry){
                restartGame();
            }else{
                //TODO show game over
            }
        }
    }

};

//reset all to initial and get new word
function restartGame(){
    wins = 0;
    word="";//original word to be guessed
    wordLetter=[];//split into lettters guessed or not
    guessedLetter = [];
    lives=12;
    imgLink = "assets/images/HP_5_CVR_LRGB.jpg";
    document.getElementById("leftimage").src = imgLink;
    document.getElementById("gametitle").style.display = "none";
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
            //console.log(j.length);
            var characterId = Math.floor(Math.random() * j.length); //random charactor id generating
            
            //test case:
            // word = "Harry Potter potter";

            word = j[characterId].name.toLowerCase();
            imgLink = j[characterId].image;
            console.log(word);
            //removing all spaces
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
            updateUI();
            pageloaded = true;

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
    if(guessedLetter.includes(thisKey.toUpperCase())){
        //guessed the same key already guessed
    }else{
        guessedLetter.push(thisKey.toUpperCase());
        lives -= 1;
        if(lives<10){
            alert("pssssst.. see console for hints on the word!");
        }
    }
}

function updateUI(){
    document.getElementById("theWord").innerHTML = constructDisplayWord();
    document.getElementById("guessdLetter").innerHTML = guessedLetter.toString().replace(/,/g, ' ');;
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


function updateTitleAndImg(){
    document.getElementById("gametitle").style.display = "initial";
    document.getElementById("gametitle").innerHTML = "We love " + word + "!!";
    document.getElementById("leftimage").src = imgLink;
}