let sequence = [];
let humanSequence = [];
let level = 0;
let gameStarted = false;
let gameOver = false;
let turnTimeout;  


// Define six different sounds
const sounds = {
    1: new Audio('camera_click.wav'),
    2: new Audio('http://www.freesound.org/data/previews/58/58277_634166-lq.mp3'),
    3: new Audio('http://www.freesound.org/data/previews/58/58277_634166-lq.mp3'),
    4: new Audio('http://www.freesound.org/data/previews/336/336899_4939433-lq.mp3'),
    5: new Audio('http://www.freesound.org/data/previews/336/336899_4939433-lq.mp3'),
    6: new Audio('http://www.freesound.org/data/previews/336/336899_4939433-lq.mp3')
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
        resetCountdown();
    }, 5000);
}

function renderWelcomeMessage() {
    document.getElementById('welcome-message').textContent = 
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
    setTimeout(() => sounds[color].play(), 500);
};

const playSequence = () => {
    sequence.forEach((color, index) => {
        setTimeout(() => {
            lightUp(color);
        }, 2000 * (index + 1));
    });
};

function humanTurn(color) {
    clearTimeout(turnTimeout);
    if (humanSequence[humanSequence.length - 1] !== sequence[humanSequence.length - 1]) {
        endGame();
    } else if (humanSequence.length === sequence.length && humanSequence.length !== 0) {
        humanSequence = [], level++;
        addToSequence();
        setTimeout(playSequence, 1000);
        if(level === 5) renderGameStatus('Awesome work! You have reached level 5. Keep going!');
    } else {
        turnTimeout = setTimeout(endGame, 10000);
    }
}

function endGame() {
    gameStarted = false, gameOver = true;
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

// Reduce the sound effects to 1 second
Object.values(sounds).forEach(sound => {
    sound.onloadeddata = function() {
        const duration = sound.duration;
        if (duration > 1.0) {
            sound.playbackRate = duration;
        }
    };
});
