var urlprefix="http://hp-api.herokuapp.com/api/characters";
class Game{

//reset all to initial and get new word
    constructor(){
        this.wins = 0;
        this.word="";//original word to be guessed
        this.wordLetter=[];//split into lettters guessed or not
        this.guessedLetter = [];
        this.lives=12;
        this.imgLink = "assets/images/HP_5_CVR_LRGB.jpg";
        this.gameready = false;
        this.audio = new Audio();
        document.getElementById("leftimage").src = this.imgLink;
        document.getElementById("gametitle").style.display = "none";
        document.getElementById("notStarted").style.display = "initial";
        this.getWordFromAPI(this);
    }

    //get a word form api
    getWordFromAPI(obj){
        const http = new XMLHttpRequest();
        const url = urlprefix;
        http.open("GET",url);
        http.send();
        
        http.onreadystatechange = function(){
            if(this.readyState == 4 && this.status ==200){
                var j = JSON.parse(http.responseText)
                var characterId = Math.floor(Math.random() * j.length); //random charactor id generating
                
                //test case:
                // word = "Harry Potter potter";
                obj.word = j[characterId].name.toLowerCase();
                obj.imgLink = j[characterId].image;
                
                //removing all spaces
                // word = word.toLowerCase().replace(/\s/g, '');
                // console.log(obj.word);
                for (var i = 0; i<obj.word.length;i++){
                if (obj.word[i] !== " "){
                    // console.log(obj.word[i]);
                    // console.log("false");
                    obj.wordLetter.push(false);
                }else{
                    // console.log(obj.word[i]);
                    // console.log("true");
                    obj.wordLetter.push(true);
                }
                }
                // console.log(obj.wordLetter);
                obj.gameready = true;
                // console.log(obj.wordLetter);
                console.log(game.word);
                obj.updateUI();
            }else if(this.status !== 200){
                alert("Sorry, API isn't working! Try again later!");
            }
        }

    }

    addToWordLetterArray(thisKey){
        var startIndex = 0;
        var i;
        while((i = this.word.indexOf(thisKey,startIndex))> -1 ){
            // console.log( "here index is: " + i);
            this.wordLetter[i] = thisKey;
            // console.log("word is now: " + word);
            // console.log("word array is now: "+wordLetter);
            startIndex = i+1;
        }
    }

    addToGuessedLetters(thisKey){
        if(this.guessedLetter.includes(thisKey.toUpperCase())){
            //guessed the same key already guessed
        }else{
            this.guessedLetter.push(thisKey.toUpperCase());
            this.lives -= 1;
            if(this.lives===10){
                alert("pssssst.. see console for hints on the word!");
            }
        }
    }  
        
    constructDisplayWord(){
        var displayWord = "";
        // console.log("display word build for: " +wordLetter);
        for (var i=0;i<this.wordLetter.length;i++){
            if (this.wordLetter[i] == true){
                displayWord += "&nbsp;&nbsp;&nbsp;";
            }else if(this.wordLetter[i] == false){
                displayWord += "_&nbsp;"
            }else{
                displayWord += this.wordLetter[i]+"&nbsp;";
            }
            // console.log(i + "th iteration: " + displayWord);
        }
        return displayWord;
    } 


    addWin(){
        this.lives=12;
        this.wins += 1;  
        this.word="";//original word to be guessed
        this.wordLetter=[];//split into lettters guessed or not
        this.guessedLetter = [];
    }


    updateUI(){
        document.getElementById("theWord").innerHTML = this.constructDisplayWord();
        document.getElementById("guessdLetter").innerHTML = this.guessedLetter.toString().replace(/,/g, ' ');;
        document.getElementById("lives").innerHTML = this.lives;
        document.getElementById("wins").innerHTML = this.wins;
    }


    updateTitleAndImg(){
        document.getElementById("gametitle").style.display = "initial";
        document.getElementById("gametitle").innerHTML = "We love " + this.word + "!!";
        document.getElementById("leftimage").src = this.imgLink;
    }




    playSound(){
        // var audio = document.getElementById('audio');
        //if there is anything playing, do not restart
        // if(this.audio.paused){
            switch(this.word){
                case "bellatrix lestrange":
                    this.audio.src = "assets/sounds/Bellatrix.mp3";
                    break;
                case "dolores umbridge":
                    this.audio.src = "assets/sounds/deloros.mp3";
                    break;
                case "hermione granger":
                    this.audio.src = "assets/sounds/hermione.mp3";
                    break;
                case "luna lovegood":
                    this.audio.src = "assets/sounds/luna.mp3";
                    break;
                case "harry potter":
                    this.audio.src = "assets/sounds/harry.mp3";
                    break;
                default:         
                    this.audio.src = "assets/sounds/harry_potter_theme.mp3";
                    break;
            }
            // var audio = new Audio("assets/sounds/hermione.mp3");
            // audio.src = "assets/sounds/hermione.wav";
            this.audio.play(); 
        // }

    }

}

