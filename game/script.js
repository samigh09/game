document.addEventListener('DOMContentLoaded', () => {
    const cardArray = [
        { name: 'A', img: 'A' },
        { name: 'A', img: 'A' },
        { name: 'B', img: 'B' },
        { name: 'B', img: 'B' },
        { name: 'C', img: 'C' },
        { name: 'C', img: 'C' },
        { name: 'D', img: 'D' },
        { name: 'D', img: 'D' },
        { name: 'E', img: 'E' },
        { name: 'E', img: 'E' },
        { name: 'F', img: 'F' },
        { name: 'F', img: 'F' },
        { name: 'G', img: 'G' },
        { name: 'G', img: 'G' },
        { name: 'H', img: 'H' },
        { name: 'H', img: 'H' }
    ];

    cardArray.sort(() => 0.5 - Math.random());

    const gameBoard = document.getElementById('gameBoard');
    const timeDisplay = document.getElementById('time');
    const movesDisplay = document.getElementById('moves');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    let moves = 0;
    let seconds = 0;
    let timerInterval;

    function startTimer() {
        timerInterval = setInterval(() => {
            seconds++;
            timeDisplay.textContent = seconds;
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('div');
            card.setAttribute('class', 'card');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        }
        startTimer();
    }

    function flipCard() {
        const cardId = this.getAttribute('data-id');
        if (!cardsChosenId.includes(cardId) && cardsChosen.length < 2) {
            cardsChosen.push(cardArray[cardId].name);
            cardsChosenId.push(cardId);
            this.innerHTML = cardArray[cardId].img;
            this.classList.add('flipped');
            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 500);
                moves++;
                movesDisplay.textContent = moves;
            }
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('.card');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];

        if (cardsChosen[0] === cardsChosen[1]) {
            cards[optionOneId].classList.add('matched');
            cards[optionTwoId].classList.add('matched');
            cardsWon.push(cardsChosen);
        } else {
            cards[optionOneId].innerHTML = '';
            cards[optionTwoId].innerHTML = '';
            cards[optionOneId].classList.remove('flipped');
            cards[optionTwoId].classList.remove('flipped');
        }
        cardsChosen = [];
        cardsChosenId = [];

        if (cardsWon.length === cardArray.length / 2) {
            stopTimer();
            setTimeout(() => alert(`Congratulations! You found all the matches in ${seconds} seconds and ${moves} moves!`), 100);
        }
    }

    createBoard();
});
