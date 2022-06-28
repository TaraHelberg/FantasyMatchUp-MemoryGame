const cards = document.querySelectorAll('.flip-card'); //For Flip Card Function
const max_match = 8;                                   //Used to matchup cards as max_match = 8 16 cards /2 as 1 flip count =2 flipped cards 
const flipcount = document.querySelector("#flips");    //In order to count the number of flips made during a game 2 flips = 1 count                                
const timercount = document.querySelector("#timer");   //In order to set a timer from first flip to end or restart of game 


let runGame = false;         // Set to false until the game starts on first card clicked "flipped"
let CardFlipped = false;     // In order to check to see if the card has been clicke "flipped"
let firstCard, secondCard;   // In order for cards matchedup to be checked 
let cardsMatched = 0;        // On 0 for start of game as no cards matched and needed to match up against max-match
let lockBoard = false;       // Lock the game board until cards are matched
let flips = 0;               // Starts the game on 0 flips 
let theTime = "";       



//Flip Card Function
function flipcard(){
    if(!runGame) {
        runGame = true;   // Set to true as game starts on 1st click "flipped" card
        runtimer();       // In order for the timer to start on the first card clicked "flipped"
    }
    if(lockBoard) return; // If lockBoard is true the rest of function wont be executed
    if(this === firstCard) return;

    this.classList.add('flip');

    if(!CardFlipped) {

        CardFlipped = true; // Indicarted the First card clicked "flipped"
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
        matchedUp = 0;
        cards.forEach(() => cardRest.classList.remove('flip'));
        cards.forEach(card => card.addEventListener('click'), flipcard);
    }, 500);
} 



    


