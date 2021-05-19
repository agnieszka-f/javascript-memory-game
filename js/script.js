function cardClickHandler (event){
    const clickedCard = this; 
    clickedCard.classList.remove('hidden');
    
}
                
function drawCards(){
    const cards = ['img-1','img-1','img-2','img-2','img-3','img-3','img-4','img-4','img-5','img-5',
                'img-6','img-6','img-7','img-7','img-8','img-8','img-9','img-9','img-10','img-10'];
                
    for(let index = 0; cards.length !== 0; index++){
        const drawnCard = cards[Math.floor(Math.random() * (20 - index) + 0)];
        const idCard = document.querySelector('#card-' + index);
        idCard.classList.add(drawnCard, 'hidden');
        cards.splice(cards.indexOf(drawnCard),1);
    }
}
drawCards();

const board = document.querySelectorAll('.board .card'); 
for(let card of board){ 
    card.addEventListener('click', cardClickHandler);
}