/* Data */
const gameData = [
    { definition: "A vehicle with four wheels that is usually propelled by an engine", word: "Car", options: ["Car", "Bus", "Bicycle", "Train"] },
    { definition: "A device used for writing or drawing with ink", word: "Pen", options: ["Pen", "Pencil", "Marker", "Crayon"] },
    
];

let currentWordIndex = 0;
let playerScore = 0;

function loadWord() {
    const currentWordData = gameData[currentWordIndex];
    document.getElementById("wordDefinition").textContent = currentWordData.definition;

    // Shuffle the English word options to randomize their order
    const shuffledOptions = shuffle(currentWordData.options);

    document.getElementById("option1").textContent = shuffledOptions[0];
    document.getElementById("option2").textContent = shuffledOptions[1];
    document.getElementById("option3").textContent = shuffledOptions[2];
    document.getElementById("option4").textContent = shuffledOptions[3];

    // Hide the Play Again button (if it was shown previously)
    document.getElementById("playAgainButtonDiv").style.display = "none";
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
        document.getElementById("resultMessage").textContent = "Game Over! You have completed all the words.";
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

