{
  'use strict';
	const select = {
		templateOfBoard: '#template-board',
		buttonNewGame: '#button-new-game',
		divLock: '.lock',
		divInfo: 'info',
		optionBoardSize: '[name="option-board-size"]'
	};
	const templates = {
		divCard: Handlebars.compile(document.querySelector(select.templateOfBoard).innerHTML) 
		};
		
	const newGame = document.querySelector(select.buttonNewGame);
	const lock = document.querySelector(select.divLock);
	const infoElement = document.getElementById(select.divInfo);
	const formInputs = document.querySelectorAll(select.optionBoardSize);
	
	let boardSize;
	let openCards;

	startNewGame();

	function startNewGame(){ 
		createFormListener();
		boardSize = getBoardSize();
		createBoard();
		resetBoard();
		drawCards();
		createCardListener();
		clickCounter = 0;
		openCards = 0;
		clickedCards = [];
		infoElement.innerHTML = 'Liczba ruchów: ' + clickCounter;
	}
	function cardClickHandler (event){
		event.preventDefault();
		
		const clickedCard = this; 
		clickedCard.classList.remove('hidden');
		clickedCards.push(clickedCard);
		clickedCard.removeEventListener('click', cardClickHandler);

		if(clickedCards.length === 2){ 
			whenTwoCardClick();
		}
	}
	function whenTwoCardClick(){
		lock.classList.add('display-layer');
		const elementsAreEqual = clickedCards[0].className === clickedCards[1].className;
			if(elementsAreEqual){
				setTimeout(function(){
					moveCounter();
					showCards();
					lock.classList.remove('display-layer');
					}, 1000);
			} else {
				setTimeout(function(){
					moveCounter();
					hideCards();
					lock.classList.remove('display-layer');
				}, 1000);
			}
	}
	function showCards(){ 
		clickedCards[0].classList.add('card-open');
		clickedCards[1].classList.add('card-open');
		clickedCards = [];
		openCards+=2;  
			if(openCards == boardSize){
				infoElement.innerHTML = 'Koniec gry! Liczba ruchów: ' + clickCounter;
			}
	}
	function hideCards(){
		clickedCards[0].classList.add('hidden');
		clickedCards[1].classList.add('hidden');
		clickedCards[0].addEventListener('click', cardClickHandler);
		clickedCards[1].addEventListener('click', cardClickHandler);
		clickedCards = [];
	}
	function drawCards(){
		
		const cards = [];
		const images = ['img-1','img-2','img-3','img-4','img-5','img-6','img-7','img-8','img-9','img-10'];
		for(let index = 0; index < boardSize/2; index++){
			cards.push(images[index]);
			cards.push(images[index]);
		}
		for(let index = 0; cards.length !== 0; index++){
			const drawnCard = cards[Math.floor(Math.random() * (boardSize - index) + 0)];
			const idCard = document.querySelector('#card-' + index);
			idCard.classList.add(drawnCard, 'hidden');
			cards.splice(cards.indexOf(drawnCard),1);
		}
	}
	function moveCounter(){
		clickCounter++;
		infoElement.innerHTML = 'Liczba ruchów: ' + clickCounter;
	}
	function createCardListener(){
		const cards = document.querySelectorAll('.card'); 
		for(let card of cards){ 
			card.addEventListener('click', cardClickHandler);
		}
	}
	function createFormListener(){
		newGame.addEventListener('click', function(event){
			event.preventDefault();
			startNewGame();
		});
		
		for(let input of formInputs){
			input.addEventListener('change', function(event){
				event.preventDefault();
			});
		}
	}
	function resetBoard(){
		const cards = document.querySelectorAll('.card'); 
		for(let card of cards){
			card.classList.remove('hidden','card-open',card.classList.item(1));
		}
	}
	function createBoard(){ 
		const board = document.querySelector('.board');
		const cardsData = { cardList: []};
		for(let index =0; index < boardSize; index++){
			cardsData.cardList.push({id: index}); 
		} 
		board.innerHTML = templates.divCard(cardsData);
	}
	function getBoardSize(){
		for(let input of formInputs){
			if(input.checked === true) return input.getAttribute('value');
		}
	}
}