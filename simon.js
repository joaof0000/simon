
// // JavaScript Logic
// Initialize game state variables:
// - sequence: Array to store the sequence of panels
// - userSequence: Array to store the user's input sequence
// - level: Current level of the game
// - gameStarted: Boolean flag to indicate if the game has started
// - gameOver: Boolean flag to indicate if the game is over

// Initialize sound effects for each panel:
// - Assign a unique sound effect to each panel for later use.

// // Event Handling
// Add event listeners to panels:
// - On panel click:
//   - If gameStarted and !gameOver:
//     - Add the ID or class of the clicked panel to the userSequence array.
//     - Check user input against the expected sequence:
//       - Iterate over each item in the userSequence array and compare it with the corresponding item in the sequence array.
//       - If any item doesn't match, end the game and display the game over message.
//     - If user input is correct:
//       - Play the sound effect associated with the clicked panel.
//       - If the userSequence length is equal to the sequence length:
//         - Increment the level.
//         - Generate a new random panel and add it to the sequence.
//         - Reset the userSequence array.
//         - Display the new sequence to the user using the displaySequence() function.
//       - Continue the game.

// // Game Flow
// Function startGame():
//   - Reset game state variables:
//     - sequence = []
//     - userSequence = []
//     - level = 1
//     - gameStarted = false
//     - gameOver = false
//   - Generate a random panel and add it to the sequence.
//   - Display the initial sequence to the user using the displaySequence() function.
//   - Set gameStarted to true.

// // DOM Manipulation
// Function displaySequence(sequence):
//   - Iterate over each panel ID or class in the sequence array:
//     - Highlight the panel visually for a short duration to indicate the next item in the sequence.
//     - Play the corresponding sound effect associated with the panel.
//     - Wait for a short delay before moving to the next panel in the sequence.

// // Responsive Design
// Apply responsive design techniques to ensure compatibility with different screen sizes and devices:
// - Use CSS media queries to adjust the layout, sizing, and positioning of elements based on the screen size.
// - Test the game on various devices and screen sizes to ensure a seamless experience.

// // Testing and Debugging
// Perform testing and debugging to ensure proper functioning of the game and address any issues encountered during development:
// - Test various game scenarios, including correct and incorrect user input, reaching higher levels, and game over conditions.
// - Use console.log() statements to log relevant information for debugging purposes.
// - Implement error handling to gracefully handle unexpected scenarios.

// // Other Considerations
// Additional features and enhancements you can explore:
// - Scoring mechanism: Keep track of the user's score based on the level they reached or the number of successful sequences completed.
// - Levels of difficulty: Introduce different difficulty levels that increase the complexity of the game, such as shorter timeouts or faster sequence display.
// - User interface improvements: Add visual feedback for correct and incorrect user input, provide hints or instructions to guide the user, and incorporate animations or transitions to enhance the overall user experience. -->
//  -->




let sequence = [];
let humanSequence = [];
let level = 0;
let gameStarted = false;
let gameOver = false;

// Define six different sounds
const sounds = {
    1: new Audio('camera_click.mp3'),
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
    sequence = [];
    humanSequence = [];
    level = 0;
    gameStarted = true;
    gameOver = false;
    addToSequence();
    playSequence();
}

function addToSequence() {
    sequence.push(getRandomNumber());
}

const lightUp = (color) => {
    const button = document.getElementById(`button${color}`);
    button.classList.add('active');
    setTimeout(() => {
        button.classList.remove('active');
    }, 1000);
    setTimeout(() => sounds[color].play(), 500); // Delay added to synchronize with button light
};

const playSequence = () => {
    sequence.forEach((color, index) => {
        setTimeout(() => {
            lightUp(color);
        }, 1000 * (index + 1));
    });
};

const humanTurn = (color) => {
    if (humanSequence[humanSequence.length - 1] !== sequence[humanSequence.length - 1]) {
        alert('Game over! You reached level ' + level + '.');
        gameOver = true;
        gameStarted = false;
    } else if (humanSequence.length === sequence.length && humanSequence.length !== 0) {
        humanSequence = [];
        level++;
        addToSequence();
        setTimeout(playSequence, 1000);
    }
};

// Reduce the sound effects to 1 second
Object.values(sounds).forEach(sound => {
    sound.onloadeddata = function() {
        const duration = sound.duration;
        if (duration > 1.0) {
            sound.playbackRate = duration;
        }
    };
});
