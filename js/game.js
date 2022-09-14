const grid = document.querySelector('.grid');

const teams = [
    'barcelona',
    'psg',
    'bayern',
    'man_city',
    'man_united',
    'real_madrid',
    'chealsea',
    'liverpool',
    'juventus',
    'milan',
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if(disabledCards.length === 20){
        alert('Congrats, you did It!');
    }
}

const checkCards = () => {
    const firstTeam = firstCard.getAttribute('data-team');
    const secondTeam = secondCard.getAttribute('data-team');

    if (firstTeam === secondTeam) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');
        firstCard = '';
        secondCard = '';

        checkEndGame();

    } else {
        setTimeout ( () => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
            firstCard = '';
            secondCard = '';

        }, 500);
    }
}


const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard =target.parentNode;

        checkCards();
    }

}

const createCard = (team) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../images/${team}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-team', team);

    return card;
}

const loadGame = () => {
    const duplicateTeams = [...teams, ...teams];


    const shuffledArray = duplicateTeams.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((team) => {
        const card = createCard(team);
        grid.appendChild(card);
    });
}

loadGame();
