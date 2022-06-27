const cards = document.querySelectorAll('.flip-card'); //For Flip Card Function
                         



let hasFlippedCard = false; 
let firstCard, secondCard; // fo card match check 


 

//Flip Card Function
function flipcard(){

    this.classList.add('flip');

    if(!hasFlippedCard) {

        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    secondCard = this;
    
}

cards.forEach(card => card.addEventListener('click', flipcard));

// Shuffle Memory Cards 
cards.forEach(card => {
    const ramdomPositn = Math.floor(Math.random() * cards.length); 
    card.style.order = ramdomPositn;    
});


