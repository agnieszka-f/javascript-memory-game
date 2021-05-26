let clickedCards = [];
let clickCounter = 0;
let openCards = 0;
const infoElement = document.getElementById('info');
infoElement.innerHTML = 'Liczba ruchów: ' + clickCounter;

function cardClickHandler (event){
    const clickedCard = this; 
    clickedCard.classList.remove('hidden');
    clickedCards.push(clickedCard);
    clickedCard.removeEventListener('click', cardClickHandler);
    
    if(clickedCards.length === 2){
        const elementsAreEqual = clickedCards[0].className === clickedCards[1].className;
        if(elementsAreEqual){
            setTimeout(function(){
                moveCounter();
                openCard();
                }, 1000);
        } else {
            setTimeout(function(){
                moveCounter();
                hiddenCard();
            }, 1000);
        }
    }    
}
function openCard(){
    clickedCards[0].classList.add('card-open');
    clickedCards[1].classList.add('card-open');
    clickedCards = [];
    openCards+=2; 
        if(openCards === 20){ 
            infoElement.innerHTML = 'Koniec gry! Liczba ruchów: ' + clickCounter;
        }
}
function hiddenCard(){
    clickedCards[0].classList.add('hidden');
    clickedCards[1].classList.add('hidden');
    clickedCards[0].addEventListener('click', cardClickHandler);
    clickedCards[1].addEventListener('click', cardClickHandler);
    clickedCards = [];
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
function moveCounter(){
    clickCounter++;
    infoElement.innerHTML = 'Liczba ruchów: ' + clickCounter;
}
function addListener(){
    const board = document.querySelectorAll('.board .card'); 
    for(let card of board){ 
    card.addEventListener('click', cardClickHandler);
    }
    
    const newGame = document.querySelector('#button-new-game');
    newGame.addEventListener('click', startNewGame);
}
function startNewGame(){
    resetBoard();
    drawCards();
    addListener();
    clickCounter = 0;
    openCards = 0;
    clickedCards = [];
    infoElement.innerHTML = 'Liczba ruchów: ' + clickCounter;
}
function resetBoard(){
    const cardList = document.querySelectorAll('.card');
    for(let card of cardList){
        card.classList.toggle('hidden', false);
        card.classList.toggle('card-open', false);
        card.classList.remove(card.classList.item(1));
    }
}
drawCards();
addListener();