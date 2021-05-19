// TODO: koniec gry (wynik)
// TODO: nowa gra
// TODO: uproszczenie kodu, porządki
// TODO: zmienny rozmiar planszy

let clickedCards = [];
let clickCounter = 0;
let openedCards = 20;

const counterElement = document.getElementById('count');
counterElement.innerHTML = `Liczba ruchów: <b>${clickCounter}</b>`;

function cardClickHandler(event) {
  const clickedCard = this;
  clickedCard.classList.remove('hidden');

  clickedCards.push(clickedCard);
  console.log('cards', clickedCards);

  if (clickedCards.length === 2) {
    const elementsAreEqual =
      clickedCards[0].className === clickedCards[1].className;

    if (elementsAreEqual) {
      setTimeout(function () {
        clickedCards[0].classList.add('card-open');
        clickedCards[1].classList.add('card-open');
        clickedCards[0].removeEventListener('click', cardClickHandler);
        clickedCards[1].removeEventListener('click', cardClickHandler);
        console.log('cardClickHandler', cardClickHandler);

        clickedCards = [];

        clickCounter += 1;
        counterElement.innerHTML = `Liczba ruchów: <b>${clickCounter}</b>`;

        // zlicz odkryte karty
        openedCards -= 2;
      }, 1000);
    } else {
      setTimeout(function () {
        clickedCards[0].classList.add('hidden');
        clickedCards[1].classList.add('hidden');

        clickedCards = [];

        clickCounter += 1;
        counterElement.innerHTML = `Liczba ruchów: <b>${clickCounter}</b>`;
      }, 1000);
    }

    console.log('equal?', elementsAreEqual);
    console.log('openedCards', openedCards);
  }
}

function drawCards() {
  const cards = [
    'img-1',
    'img-1',
    'img-2',
    'img-2',
    'img-3',
    'img-3',
    'img-4',
    'img-4',
    'img-5',
    'img-5',
    'img-6',
    'img-6',
    'img-7',
    'img-7',
    'img-8',
    'img-8',
    'img-9',
    'img-9',
    'img-10',
    'img-10',
  ];

  for (let index = 0; cards.length !== 0; index++) {
    const drawnCard = cards[Math.floor(Math.random() * (20 - index) + 0)];
    const idCard = document.querySelector('#card-' + index);
    idCard.classList.add(drawnCard, 'hidden');
    cards.splice(cards.indexOf(drawnCard), 1);
  }
}
drawCards();

const board = document.querySelectorAll('.board .card');
for (let card of board) {
  card.addEventListener('click', cardClickHandler);
}
