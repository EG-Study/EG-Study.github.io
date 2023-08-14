
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