  // Initialize game variables
  let sequence = [];
  let humanSequence = [];
  let level = 0;
  let gameStarted = false;
  let gameOver = false;
  
  // Hide welcome message initially
  const welcomeMessage = document.getElementById('welcome-message');
  welcomeMessage.style.display = 'none';
  
  // Define six different sounds
  const sounds = {
    1: new Audio('sounds/In Your Eyes.mp3'),
    2: new Audio('sounds/01 The Best.mp3'),
    3: new Audio('sounds/Jump.mp3'),
    4: new Audio('sounds/Viva La Vida.mp3'),
    5: new Audio('sounds/The Rhythm of the Night.mp3'),
    6: new Audio('sounds/I Want To Know What Love Is.mp3')
  };
  
  // Function to generate a random number between 1 and 6
  const getRandomNumber = () => Math.floor(Math.random() * 6) + 1;
  
  // Attach click listeners to the buttons
  for (let i = 1; i <= 6; i++) {
    document.getElementById(`button${i}`).addEventListener('click', () => {
      if (gameStarted && !gameOver) {
        humanSequence.push(i);
        humanTurn(i);
      }
    });
  }
  
  // Attach listener to the start button to begin the game
  document.getElementById('start-button').addEventListener('click', startGame);
  
  // Function to start the game
  function startGame() {
    // Reset game variables
    sequence = [];
    humanSequence = [];
    level = 0;
    gameStarted = true;
    gameOver = false;
    // Display the welcome message
    renderWelcomeMessage();
  
    // Add the first item to the sequence
    addToSequence();
  
    // Display the initial score
    renderScore();
  
    // Notify the user that the game is about to start
    renderGameStatus('Game is starting in 5 seconds...');
  
    // Start playing the sequence after 5 seconds
    setTimeout(() => {
      renderGameStatus('');
      playSequence();
    }, 5000);
  }
  
  // Function to render the welcome message
  function renderWelcomeMessage() {
    welcomeMessage.style.display = 'block';
    welcomeMessage.textContent =
      'Welcome to Simon Game! You will see a sequence of buttons light up. Your task is to repeat the sequence by clicking the buttons in the same order. If you make a mistake, the game is over. The sequence gets one button longer each time you correctly repeat it. Good luck!';
  }
  
  // Function to add a random number to the sequence
  function addToSequence() {
    sequence.push(getRandomNumber());
    renderScore();
  }
  
  // Function to light up a button and play the corresponding sound
  const lightUp = (color) => {
    const button = document.getElementById(`button${color}`);
    button.classList.add('active');
  
    // Stop light after 1.5 seconds
    setTimeout(() => {
      button.classList.remove('active');
    }, 1500);
  
    // Play the sound for only 1.5 seconds
    const sound = sounds[color];
    sound.currentTime = 0; // start playing from the beginning
    sound.play();
    setTimeout(() => {
      sound.pause();
      sound.currentTime = 0; // reset to the start for the next time
    }, 1500); // stop playing after 1.5 seconds
  };
  
  // Function to play the current sequence
  const playSequence = () => {
    let currentIndex = 0;
  
    function playNext() {
      if (currentIndex < sequence.length) {
        const color = sequence[currentIndex];
        lightUp(color);
        currentIndex++;
        setTimeout(playNext, 2000);
      } else {
        // Delay before showing the high score message and playing the high score song
        setTimeout(() => {
          const highScoreAchieved = checkHighScore(level);
          if (highScoreAchieved) {
            renderGameStatus('Congratulations! You achieved a new high score!');
            const highScoreSound = new Audio('sounds/Viva La Vida.mp3');
            highScoreSound.addEventListener('ended', () => {
              // Add any additional logic to perform after the high score song finishes playing
            });
            highScoreSound.play();
          }
        }, 2000);
      }
    }
  
    playNext();
  };
  
  // Function to handle the player's turn
  function humanTurn(color) {
    if (humanSequence[humanSequence.length - 1] !== sequence[humanSequence.length - 1]) {
      endGame();
    } else if (humanSequence.length === sequence.length && humanSequence.length !== 0) {
      if (level === 0) {
        // Show the score after the first correct answer
        const scoreElement = document.getElementById('score');
        scoreElement.style.display = 'block';
      }
      humanSequence = [];
      level++;
      addToSequence();
      setTimeout(playSequence, 1000);
      if (level === 5) renderGameStatus('Awesome work! You have reached level 5. Keep going!');
    }
  }
  
  // Function to handle game over
  function endGame() {
    gameStarted = false;
    gameOver = true;
  
    // Hide score and display game over message
    const scoreElement = document.getElementById('score');
    scoreElement.style.display = 'none';
  
    renderGameStatus(`Game over! You reached level ${level}.`);
  }
  
  // Function to display messages to the user
  function renderGameStatus(message) {
    const gameStatusElement = document.getElementById('game-status');
    gameStatusElement.textContent = message;
    if (message === '') {
      gameStatusElement.style.display = 'none'; // Hide the message
    } else {
      gameStatusElement.style.display = 'block'; // Show the message
    }
  }
  
  // Function to render the current score
  function renderScore() {
    document.getElementById('score').textContent = 'Score: ' + level;
  }