const cards = document.querySelectorAll('.flip-card'); //For Flip Card Function
const max_match = 8 ;                                  //16 cards 2 pairs = 8 cards maximum number to match 

let hasFlippedCard = false;
let firstCard,secondCard;

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
    const ramdomPos = Math.floor(Math.random() * cards.length); 
    card.style.order = ramdomPos;    
});