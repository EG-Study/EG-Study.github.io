// Data
const allWords = [
    "contract", "assurance", "determine", "engage", "establish", "provision", "resolve", "specific", "assure",
    "cancel", "cancelled", "obligation", "obligatory", "provide", "specify", "specification", "attract", "compare",
    "competition", "consume"
];

let gameData = [
    { definition: "A binding agreement that is enforceable by law", word: "contract" },
    { definition: "A binding commitment to do or give or refrain from something", word: "assurance" },
    { definition: "Find out or learn with certainty, as by making an inquiry", word: "determine" },
    { definition: "Consume all of one's attention or time", word: "engage" },
    { definition: "Set up or foundy", word: "establish" },
    { definition: "The activity of supplying something", word: "provision" },
    { definition: "Find a solution or answer", word: "resolve" },
    { definition: "Stated explicitly or in detail", word: "specific" },
    { definition: "Inform positively and with certainty and confidence", word: "assure" },
    { definition: "Declare null and void", word: "cancel" },
    { definition: "The state of being bound to do or pay something", word: "obligation" },
    { definition: "Required by compulsion or convention", word: "obligatory" },
    { definition: "Give something useful or necessary to", word: "provide" },
    { definition: "Be particular about", word: "specify" },
    { definition: "The act of naming explicitly", word: "specification" },
    { definition: "Exert a force on", word: "attract" },
    { definition: "Examine and note the similarities or differences of", word: "compare" },
    { definition: "The act of contending with others for rewards or resources", word: "competition" },
    { definition: "Take in as food", word: "consume" },
];

let currentWordIndex = 0;
let playerScore = 0;

function loadWord() {
    // Shuffle the gameData array to randomize the questions
    gameData = shuffle(gameData);

    const currentWordData = gameData[currentWordIndex];
    document.getElementById("wordDefinition").textContent = currentWordData.definition;

    // Get three random options from the pool of all words (excluding the correct word)
    const optionsPool = allWords.filter(word => word !== currentWordData.word);
    const randomOptions = getRandomElements(optionsPool, 3);

    // Include the correct word among the options and shuffle them
    const shuffledOptions = shuffle([...randomOptions, currentWordData.word]);

    // Add the shuffled options as the text content of the corresponding buttons
    for (let i = 1; i <= shuffledOptions.length; i++) {
        document.getElementById("option" + i).textContent = shuffledOptions[i - 1];
    }

    // Hide the Play Again button (if it was shown previously)
    document.getElementById("playAgainButtonDiv").style.display = "none";
}

function getRandomElements(array, numElements) {
    const shuffledArray = shuffle(array);
    return shuffledArray.slice(0, numElements);
}


function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

function checkAnswer(selectedOption) {
    const currentWordData = gameData[currentWordIndex];
    const correctWord = currentWordData.word;
    const selectedWord = document.getElementById("option" + selectedOption).textContent;

    if (selectedWord === correctWord) {
        playerScore++;
        document.getElementById("feedbackMessage").textContent = "Correct! The English word is: " + correctWord;
    } else {
        document.getElementById("feedbackMessage").textContent = "Incorrect! The correct English word is: " + correctWord;
    }

    document.getElementById("playerScore").textContent = playerScore;

    currentWordIndex++;
    if (currentWordIndex < gameData.length) {
        loadWord();
    } else {
        document.getElementById("resultMessage").textContent = "You got " + playerScore + " correct answers out of " + gameData.length;
        // Implement any other actions when the game is over
        document.getElementById("playAgainButtonDiv").style.display = "block";
    }
}
function playAgain() {
    // Reset the game state
    currentWordIndex = 0;
    playerScore = 0;

    // Load the first word again
    loadWord();

    // Reset the player score display
    document.getElementById("playerScore").textContent = playerScore;

    // Hide the Play Again button again
    document.getElementById("playAgainButtonDiv").style.display = "none";

    // Clear previous feedback message
    document.getElementById("feedbackMessage").textContent = "";
    document.getElementById("resultMessage").textContent = "";
}

// Load the first word when the page loads
loadWord();

/*****************************/
// Game data
const gameWorlds = [
    { name: "Enchanted Forest", theme: "forest" },
    { name: "TOEIC Vocabulary", theme: "toeic" },
];

const puzzles = {
    forest: [
        { scrambledWord: "ANTHELEE", correctWord: "ELEPHANT" },
        { scrambledWord: "ASLCITE", correctWord: "ELASTIC" },
    ],
    toeic: [
        { scrambledWord: "TEMOCPCMUNI", correctWord: "COMPETITION" },
        { scrambledWord: "SECUCCS", correctWord: "SUCCESS" },
    ],
};

let currentWorld = null;
let score = 0;
let currentPuzzleIndex = 0;

// Event listener for the "Play" button
document.querySelector("#playBtn").addEventListener("click", startGame);

function startGame() {
    // Clear the game container
    document.getElementById("gameContainer").innerHTML = '';

    // Show game instructions (you can use modal or dynamically populate content)
    // Generate game worlds for player selection
    showGameWorlds();
}

function showGameWorlds() {
    // hide play button
    document.getElementById("playBtn").style.display = "none";
    // Generate the HTML for game world selection
    const worldSelectionHTML = `
        <h5 class="text-center">CHOOSE A WORLD:</h5>
        <div class="row justify-content-center">
        ${gameWorlds.map((world) => `
            <div class="col-md-4 mt-4">
            <div class="card">
                <div class="card-body">
                <h5 class="card-title">${world.name}</h5>
                <button class="btn btn-primary btn-block" onclick="startWorld('${world.theme}')">Start</button>
                </div>
            </div>
            </div>
        `).join('')}
        </div>
    `;

    // Append the world selection HTML to the game container
    document.getElementById("gameContainer").innerHTML = worldSelectionHTML;
}

function startWorld(worldTheme) {
    // Load the selected world and its content
    // Implement the game mechanics for the selected world
    currentWorld = gameWorlds.find(world => world.theme === worldTheme);
    score = 0;
    currentPuzzleIndex = 0;
    showNextPuzzle();
}

function showNextPuzzle() {
    const currentPuzzles = puzzles[currentWorld.theme];
    if (currentPuzzleIndex < currentPuzzles.length) {
        const puzzle = currentPuzzles[currentPuzzleIndex];
        const puzzleHTML = `
        <h2 class="text-center">Unscramble the Word:</h2>
        <div class="text-center mt-4">
            <p>${puzzle.scrambledWord}</p>
            <input type="text" id="userInput" class="form-control w-50 mx-auto" placeholder="Enter the word">
            <button class="btn btn-primary mt-3" id="submit" onclick="checkKey('${puzzle.correctWord}')">Submit</button>
            <button class="btn btn-secondary mt-3" onclick="getHint('${puzzle.correctWord}')">Hint</button>
            <button class="btn btn-primary mt-3" onclick="moveToNextPuzzle()" id="nextBtn">Next</button>
            <p id="feedback" class="mt-3"></p>
        </div>
        `;

        // Replace the game container content with the word puzzle
        document.getElementById("gameContainer").innerHTML = puzzleHTML;
    } else {
        showFinalScore();
    }
}

function checkKey(correctAnswer) {
    const userInput = document.getElementById("userInput").value.toUpperCase();
    const feedbackElement = document.getElementById("feedback");

    if (userInput === correctAnswer) {
        score++;
        feedbackElement.textContent = "Correct! Great job!";
        document.getElementById("userInput").disabled = true;
        document.getElementById("submit").disabled = true;
    } else {
        feedbackElement.textContent = "Incorrect. Keep trying!";
    }
}

let hintCount = 0; 

function getHint(correctAnswer) {
    hintCount++;
    const hintLength = hintCount * 2;
    const hint = correctAnswer.substring(0, hintLength);
    document.getElementById("userInput").value = hint;
}

function moveToNextPuzzle() {
    currentPuzzleIndex++;
    hintCount = 0;
    showNextPuzzle();
}

function showFinalScore() {
    const finalScoreHTML = `
        <h2 class="text-center">Congratulations!</h2>
        <p class="text-center">Your final score: ${score}</p>
        <div class="text-center mt-3">
        <button class="btn btn-primary" onclick="startGame()">Play Again</button>
        </div>
    `;

    // Replace the game container content with the final score
    document.getElementById("gameContainer").innerHTML = finalScoreHTML;
}