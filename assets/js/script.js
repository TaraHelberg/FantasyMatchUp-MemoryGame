const cards = document.querySelectorAll('.flip-card'); //For Flip Card Function
const max_match = 8;                                   // max_match = 8 16 cards /2 as 1 flip count =2 flipped cards



let runGame = false;
let CardFlipped = false; 
let firstCard, secondCard; // for card match check 
let cardsMatched = 0;
let lockBoard = false; // lock the game board until cards are matched       



//Flip Card Function
function flipcard(){
    if(!runGame) {
        runGame = true;
    }
    if(lockBoard) return; // if lockBoard is true the rest of function wont be executed
    if(this === firstCard) return;

    this.classList.add('flip');

    if(!CardFlipped) {

        CardFlipped = true; // first card clicked 
        firstCard = this; // stores this as the first card

        return;
    }

    secondCard = this; // second card clicked 
    
    matchedUp(); // for the machedUp to run with this function
}

cards.forEach(card => card.addEventListener('click', flipcard));


// Shuffle Memory Cards 
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
}


