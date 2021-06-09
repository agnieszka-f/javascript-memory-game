{
  'use strict';
	const select = {
		templateOfBoard: '#template-board',
		buttonNewGame: '#button-new-game',
		divLock: '.lock',
		divInfo: 'info',
		optionBoardSize: '[name="option-board-size"]',
		board: '.board',
		card: '.card'
	};
	const templates = {
		divCard: Handlebars.compile(document.querySelector(select.templateOfBoard).innerHTML) 
		};
	class Game{
		constructor(){ 
			this.boardSize = app.boardSize;
			this.clickCounter = 0;
			this.openCards = 0;
			this.clickedCards = [];
			this.initElements();
			this.infoElement.innerHTML = 'Liczba ruchów: ' + this.clickCounter;
			this.initAction();
			
			console.log('this',this);
		}
		initElements(){
			this.infoElement = document.getElementById(select.divInfo);
			this.cards = document.querySelectorAll(select.card);
			this.lock = document.querySelector(select.divLock);
		}
		initAction() {
			const thisGame = this; 
			for(let card of thisGame.cards){ 
				card.addEventListener('click', thisGame.cardClickHandler);
			}
		}
		killAction() {
			const thisGame = this; 
			for(let card of thisGame.cards){ 
				card.removeEventListener('click', thisGame.cardClickHandler);
			}
		}
		cardClickHandler(event){ 
			event.preventDefault();
			const clickedCard = this; 
			const thisGame = app.game;
			clickedCard.classList.remove('hidden');
			thisGame.clickedCards.push(clickedCard);
			clickedCard.removeEventListener('click', thisGame.cardClickHandler);
				
			if(thisGame.clickedCards.length === 2){ 
				thisGame.whenTwoCardClick(thisGame.clickedCards);
			}
		}
		moveCounter(){ 
			this.clickCounter++;
			this.infoElement.innerHTML = 'Liczba ruchów: ' + this.clickCounter;
		}
		whenTwoCardClick(clickedCards){  
			const thisGame = this;
			this.lock.classList.add('display-layer');
			const elementsAreEqual = clickedCards[0].className === clickedCards[1].className;
				if(elementsAreEqual){ 
					setTimeout(function(){ 
						thisGame.moveCounter();
						thisGame.showCards();
						thisGame.lock.classList.remove('display-layer');
						}, 1000);
				} else { 
					setTimeout(function(){
						thisGame.moveCounter();
						thisGame.hideCards();
						thisGame.lock.classList.remove('display-layer');
					}, 1000);
				}
		}
		showCards(){ 
			this.clickedCards[0].classList.add('card-open');
			this.clickedCards[1].classList.add('card-open');
			this.clickedCards = [];
			this.openCards+=2;  
				if(this.openCards == this.boardSize){
					this.infoElement.innerHTML = 'Koniec gry! Liczba ruchów: ' + this.clickCounter;
				}
		}
		hideCards(){
			this.clickedCards[0].classList.add('hidden');
			this.clickedCards[1].classList.add('hidden');
			this.clickedCards[0].addEventListener('click', this.cardClickHandler);
			this.clickedCards[1].addEventListener('click', this.cardClickHandler);
			this.clickedCards = [];
		}
	}
	const app = {
		initElements: function(){
			this.newGame = document.querySelector(select.buttonNewGame);
			this.formInputs = document.querySelectorAll(select.optionBoardSize);
			this.board = document.querySelector(select.board);
			this.cardList = document.querySelectorAll(select.card); 
		},
		initFormListener: function(){
			this.newGame.addEventListener('click', function(event){
				event.preventDefault(); 
				//app.game.killAction();
				app.init(); 
			});
		
			for(let input of this.formInputs){ 
				input.addEventListener('change', function(event){
					event.preventDefault();
				});
			}
		},
		createBoard: function(boardSize){ 
			const cardsData = { cardList: []};
			for(let index =0; index < boardSize; index++){
				cardsData.cardList.push({id: index}); 
			} 
			this.board.innerHTML = templates.divCard(cardsData);
		},
		getBoardSize: function(){ 
			for(let input of this.formInputs){
				if(input.checked === true) return input.getAttribute('value');
			}
		},
		resetBoard: function(){ 			
			for(let card of this.cardList){
					card.classList.remove('hidden','card-open',card.classList.item(1));
				}
			},
		drawCards: function(boardSize){ 
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
		},
		initBoard: function(){
			this.resetBoard();
			this.boardSize = this.getBoardSize();
			this.createBoard(this.boardSize);
			this.drawCards(this.boardSize);
		},
		init: function(){ 
			this.initElements();
			//this.initFormListener();
			this.initBoard();
			this.game = new Game();
			console.log(this);
		}
	}; 
	app.init(); 
	app.initFormListener();
}