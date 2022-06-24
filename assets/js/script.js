const cards = document.querySelectorAll('.flip-card'); //For Flip Card Function
const max_match = 8 ;                                  //16 cards 2 pairs = 8 cards maximum number to match 
const statsflips = document.querySelector(flips);

let hasFlippedCard = false;
let firstCard,secondCard;
let flips = 0;

//Flip Card Function
function flipcard(){
    this.classList.add("flip"); 
    
    if(!hasFlippedCard) {

        hasFlippedCard = true;
        firstCard = this;

        return;
    }
}

cards.forEach(card => card.addEventListener('click', flipcard));

// Shuffle Memory Cards 
cards.forEach(card => {
    const ramdomPositn = Math.floor(Math.random() * cards.length); 
    card.style.order = ramdomPositn;    
});