const cards = document.querySelectorAll('.flip-card'); //For Flip Card Function
const max_match = 8;                                   //Used to matchup cards as max_match = 8 16 cards /2 as 1 flip count =2 flipped cards 
const flipcount = document.querySelector("#flips");    //In order to count the number of flips made during a game 2 flips = 1 count                                
const timercount = document.querySelector("#timer");   //In order to set a timer from first flip to end or restart of game 
const instcontent = document.getElementById("inst-content"); // Used to create the game instructions how to play modal
const modalBtn = document.getElementById("modalBtn");   // To open the Modal game instructions and show the Instructions  
const closemodal = document.getElementById("closeBtn"); // To close the Modal game instructions and go to game page
const winModal = document.getElementById("winModal");   // In Order for the GameWon Modal Message to be displayed at the end of the game once all pairs are matched 
const closeWin = document.getElementById("closeWin");  // To close the GameWon Modal on the X and go to game page                                                    

let runGame = false;         // Set to false until the game starts on first card clicked "flipped"
let CardFlipped = false;     // In order to check to see if the card has been clicke "flipped"
let firstCard, secondCard;   // In order for cards matchedup to be checked 
let cardsMatched = 0;        // On 0 for start of game as no cards matched and needed to match up against max-match
let lockBoard = false;       // Lock the game board until cards are matched
let flips = 0;               // Starts the game on 0 flips and to be used in GameWon Modal Message
let theTime = "";            // To be used in GameWon modal message to show theTime taken from start of game and displayed on Game Won Message


// https://marina-ferreira.github.io/tutorials/js/memory-game/ 
// Game Tutorial used to base game on code taken and addapted from above link.
// Css 3d card effect also used from the above link.
//Flip Card Function
function flipcard(){
    if(!runGame) {
        runGame = true;   // Set to true as game starts on 1st click "flipped" card
        runtimer();       // In order for the timer to start on the first card clicked "flipped"
    }
    if(lockBoard) return; // If lockBoard is true the rest of function wont be executed
    if(this === firstCard) return;

    this.classList.toggle('flip');

    if(!CardFlipped) {

        CardFlipped = true; // Indicates the First card clicked "flipped"
        firstCard = this; // Use to store this as the first card

        return;
    }

    secondCard = this; // Indicates the Second card clicked "flipped"
    
    matchedUp(); // In order for the machedUp to run with along side/ with this function   
}
//The on click event listner for the clicked "flipped" cards
cards.forEach(card => card.addEventListener('click', flipcard));


// "Shuffle" Memory Cards to insure that each game has a different card position 
cards.forEach(card => {
    const ramdomPositn = Math.floor(Math.random() * cards.length); 
    card.style.order = ramdomPositn;    
});

// https://marina-ferreira.github.io/tutorials/js/memory-game/ 
// Game Tutorial used to base game on code taken and addapted from above link for card matching.
// Used to check if firstCard and secondCard 'data-id = data-image as dataset' are matching up
function matchedUp() {
    let matched = firstCard.dataset.image === secondCard.dataset.image;
    if(matched) cardsMatched += 1;

    if(matched) twoMatched();
    else noMatch();

    if(cardsMatched === max_match) GameWon();    
} 

// The two Matched cards will be disabled for clicks once flipped and matched 
function twoMatched() {

    firstCard.removeEventListener('click', flipcard);
    secondCard.removeEventListener('click', flipcard);

    resetGame();
}

// If no cards are Matched , game board is locked until cards are flipped Back
function noMatch() {
      lockBoard = true;
      
      setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetGame();
      }, 800); 
      // add flip counter 
      addflips();
}

// To reset Cards on the game after each round 
function resetGame() {
    [CardFlipped, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
} 

// Number of flips counted  Nb: 1 set (2 cards flipped) should = 1 move ..
flips = 0;
flipcount.innerHTML = 0;

function addflips(){
    flips++;
    flipcount.innerHTML = flips;
}

// Timer from 1st flip to end of game
let time;
let minutes = 0;
let seconds = 0;
let Starttime = false;
timercount.innerHTML = `Time${minutes}:${seconds}`;

function runtimer(){
    time = setInterval(() => {
        seconds++;
        if (seconds === 59) {
            minutes++;
            seconds = 0;
        }
        timercount.innerHTML = "Time" + minutes + ":" + seconds;
    }, 1000);
}
// To Stop the timer  
function stopTime() {
    clearInterval(time);
}

//Re-Start Game 
function reset() {
    setTimeout(() => {
        CardFlipped = false;
        [firstCard, secondCard] = [null, null];               
        stopTime();
        runGame = false;
        Starttime = false;
        seconds = 0;
        minutes = 0;
        timercount.innerHTML = "Timer 0:00";
        flips = 0;
        flipcount.innerHTML = 0;
        cardsMatched = 0; 
        cards.forEach((cardReset) => cardReset.classList.remove('flip'));
        cards.forEach(card => {
            const ramdomPositn = Math.floor(Math.random() * cards.length); 
            card.style.order = ramdomPositn;    
        });                                  
    }, 500);
} 

//https://www.w3schools.com/howto/howto_css_modals.asp
// W3School I have used the modal pop up code and addapted for my use both here and in the Html & Css
// How to Play Game Instructions Modal Show
function showinstcontent() {
    instcontent.style.display = "block";
}

modalBtn.addEventListener('click',showinstcontent); //Listens for the click on how to play game button to display game instruction modal 

// How to Play Game Instructions Modal Close 
function closeinstcontent() {
    instcontent.style.display = "none";
}

closemodal.addEventListener('click',closeinstcontent); // Listens for the click on the "Play Button" in the Modal Game Instructions to close it 

//Game Won all pairs Matched and You Won Message "Modal" to be displayed
function GameWon() {
    stopTime();
    youWonMessage();  //To display GameWon message           
}

//https://www.w3schools.com/howto/howto_css_modals.asp
// W3School I have used the modal pop up code and addapted for my use both here and in the Html & Css
// You GameWon Message - Modal  
function youWonMessage() {
    winModal.style.display = "block";
    theTime = timercount.innerHTML;
    document.getElementById("theFlips").innerHTML = flips;
    document.getElementById("theTime").innerHTML = theTime;         
}
// To close the Game Won Message using the x after it has been displayed
function closewinModal() {
    winModal.style.display = "none";    
    reset();
    location.reload();
    return false;      
}

closeWin.addEventListener('click',closewinModal); //Listens for the click on the X to close the Modal








