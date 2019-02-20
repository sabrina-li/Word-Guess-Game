//url to get the charactors name and pictures(public API)
const urlprefix="https://hp-api.herokuapp.com/api/characters";

class Game{

//reset all to initial and get new word
    constructor(){
        this._wins = 0;
        this._word="";//original word to be guessed
        this._wordLetter=[];//split into lettters guessed or not
        this._guessedLetter = [];
        this._lives=12;
        this._imgLink = "assets/images/HP_5_CVR_LRGB.jpg";
        this._gameReady = false;
        this._audio = new Audio();
        document.getElementById("leftimage").src = this._imgLink;
        document.getElementById("gametitle").style.display = "none";
        document.getElementById("notStarted").style.display = "initial";
        this._getWordFromAPI(this);
    }

    get gameReady() {
        return this._gameReady;
    }

    guessALetter(key){
        //check if the key press is a-z or A-Z, 
        if (key < 65 || (key >90 && key < 97) || key > 122){
            //if not, alert user
            // console.log("Please type in A-Z!");
        }else if (this._word.includes(key)){
            //guessed right
            this._addToWordLetterArray(key); 
        }else{
            //guessed wrong, add to guessed and decrease life
            this._addToGuessedLetters(key);
        }
    }

    guessedAll(){
        return (this._wordLetter.indexOf(false) == -1);
    }

    dies(){
        return(this._lives == 0);
    }

    addWin(){
        // update the image and the title after wining, then play sound
        this._updateTitleAndImg();
        this._playSound();

        //reset parameters
        this._lives=12;
        this._wins += 1;  
        this._word="";//original word to be guessed
        this._wordLetter=[];//split into lettters guessed or not
        this._guessedLetter = [];

        //get a new word
        this._getWordFromAPI(this);
    }

    //update UI with new word, guessed letter array, lives, wins
    updateUI(){
        document.getElementById("theWord").innerHTML = this._constructDisplayWord();
        document.getElementById("guessdLetter").innerHTML = this._guessedLetter.toString().replace(/,/g, ' ');;
        document.getElementById("lives").innerHTML = this._lives;
        document.getElementById("wins").innerHTML = this._wins;
    }




    //get a word form api
    _getWordFromAPI(obj){
        //test:
        // word = "Harry Potter potter";

        const http = new XMLHttpRequest();
        const url = urlprefix;
        http.open("GET",url);
        http.send();
        
        http.onreadystatechange = function(){
            if(this.readyState == 4 && this.status ==200){
                var j = JSON.parse(http.responseText)
                var characterId = Math.floor(Math.random() * j.length); //random charactor id generating

                obj._word = j[characterId].name.toLowerCase();
                obj._imgLink = j[characterId].image;
            
                for (let i = 0; i<obj._word.length;i++){
                    if (obj._word[i] !== " "){
                        obj._wordLetter.push(false);
                    }else{
                        obj._wordLetter.push(true);
                    }
                }
                obj._gameReady = true;
                console.log("the charachtoer you are trying to guess is: "+obj._word);
                obj.updateUI();
            }else if(this.status !== 200){
                alert("Sorry, API isn't working! Try again later!");
            }else{
               //log status;
            }
        }

    }

    //add guessed key to the wordLetter array(correct guess)
    _addToWordLetterArray(thisKey){
        let startIndex = 0;
        let i;
        while((i = this._word.indexOf(thisKey,startIndex))> -1 ){
            this._wordLetter[i] = thisKey;
            startIndex = i+1;
        }
    }

    //add guessed key to the guessedLetters array(wrong guess)
    _addToGuessedLetters(thisKey){
        if(this._guessedLetter.includes(thisKey.toUpperCase())){
            //guessed the same key already guessed
        }else{
            this._guessedLetter.push(thisKey.toUpperCase());
            this._lives -= 1;
            if(this._lives===10){
                alert("pssssst.. see console for hints on the word!");
            }
        }
    }  
        
    //construct the word to display properly based on the current word letter array
    _constructDisplayWord(){
        let displayWord = "";
        for (let i=0;i<this._wordLetter.length;i++){
            if (this._wordLetter[i] == true){
                displayWord += "&nbsp;&nbsp;&nbsp;";
            }else if(this._wordLetter[i] == false){
                displayWord += "_&nbsp;"
            }else{
                displayWord += this._wordLetter[i]+"&nbsp;";
            }
        }
        return displayWord;
    } 

    //reset parameters after winning, add wins, this do not reset UI
    



    //update UI with subtitle,image for last charactor
    _updateTitleAndImg(){
        document.getElementById("gametitle").style.display = "initial";
        document.getElementById("gametitle").innerHTML = "We love " + 
            this._word.toLowerCase().split(' ')
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ')
            + "!!";
        document.getElementById("leftimage").src = this._imgLink;
    }


    //play a sounds based on guessed charactor
    //sounds will stop and re-play everytime
    _playSound(){
            switch(this._word){
                case "bellatrix lestrange":
                    this._audio.src = "assets/sounds/Bellatrix.mp3";
                    break;
                case "dolores umbridge":
                    this._audio.src = "assets/sounds/deloros.mp3";
                    break;
                case "hermione granger":
                    this._audio.src = "assets/sounds/hermione.mp3";
                    break;
                case "luna lovegood":
                    this._audio.src = "assets/sounds/luna.mp3";
                    break;
                case "harry potter":
                    this._audio.src = "assets/sounds/harry.mp3";
                    break;
                default:         
                    this._audio.src = "assets/sounds/harry_potter_theme.mp3";
                    break;
            }
            this._audio.play(); 
    }

}

