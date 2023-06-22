let sequence = [];
let humanSequence = [];
let level = 0;
let gameStarted = false;
let gameOver = false;
const welcomeMessage = document.getElementById('welcome-message');  
welcomeMessage.style.display = 'none'

// Define six different sounds
const sounds = {
    1: new Audio('sounds/In Your Eyes.mp3'),
    2: new Audio('sounds/01 The Best.mp3'),
    3: new Audio('sounds/Jump.mp3'),
    4: new Audio('sounds/Viva La Vida.mp3'),
    5: new Audio('sounds/The Rhythm of the Night.mp3'),
    6: new Audio('sounds/I Want To Know What Love Is.mp3')
};


// Generate a random number from 1 to 6
const getRandomNumber = () => Math.floor(Math.random() * 6) + 1;

for (let i = 1; i <= 6; i++) {
    document.getElementById(`button${i}`).addEventListener('click', () => {
        if (gameStarted && !gameOver) {
            humanSequence.push(i);
            humanTurn(i);
        }
    });
}

document.getElementById('start-button').addEventListener('click', startGame);

function startGame() {
    sequence = [], humanSequence = [], level = 0;
    gameStarted = true, gameOver = false;
    renderWelcomeMessage();
    addToSequence();
    renderScore();
    renderGameStatus('Game is starting in 5 seconds...');
    setTimeout(() => {
        renderGameStatus('');
        playSequence();
    }, 5000);
}

function renderWelcomeMessage() {
    welcomeMessage.style.display = 'block'
    welcomeMessage.textContent = 
    "Welcome to Simon Game! You will see a sequence of buttons light up. Your task is to repeat the sequence by clicking the buttons in the same order. If you make a mistake, the game is over. The sequence gets one button longer each time you correctly repeat it. Good luck!";
}


// Event listener for flash speed change
document.getElementById('flash-speed').addEventListener('change', (event) => {
    document.documentElement.style.setProperty('--flash-speed', `${event.target.value}s`);
});


function addToSequence() {
    sequence.push(getRandomNumber());
    renderScore();
}

const lightUp = (color) => {
    const button = document.getElementById(`button${color}`);
    button.classList.add('active');
    setTimeout(() => {
        button.classList.remove('active');
    }, 1500);
    
    // Play the sound for only 1 second
    const sound = sounds[color];
    sound.currentTime = 0; // start playing from the beginning
    sound.play();
    setTimeout(() => {
        sound.pause();
        sound.currentTime = 0; // reset to the start for the next time
    }, 1500); // stop playing after 1.5 second
};


const playSequence = () => {
    sequence.forEach((color, index) => {
        setTimeout(() => {
            lightUp(color);
        }, 2000 * (index + 1));
    });
};

function humanTurn(color) {
    if (humanSequence[humanSequence.length - 1] !== sequence[humanSequence.length - 1]) {
        endGame();
    } else if (humanSequence.length === sequence.length && humanSequence.length !== 0) {
        humanSequence = [], level++;
        addToSequence();
        setTimeout(playSequence, 1000);
        if (level === 5) renderGameStatus('Awesome work! You have reached level 5. Keep going!');
    }
}

function endGame() {
    gameStarted = false;
    gameOver = true;
    
    const scoreElement = document.getElementById('score');
    scoreElement.style.display = 'none';

    renderGameStatus(`Game over! You reached level ${level}.`);
}

function renderGameStatus(message) {
    const gameStatusElement = document.getElementById('game-status');
    gameStatusElement.textContent = message;
    if(message === '') {
        gameStatusElement.style.display = 'none'; // Hide the message
    } else {
        gameStatusElement.style.display = 'block'; // Show the message
    }
}

function renderScore() {
    document.getElementById('score').textContent = 'Score: ' + level;
}

