const cards = document.querySelectorAll('.flip-card');

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