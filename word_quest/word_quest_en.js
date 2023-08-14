// Data
const allWords = [
    "in good hands", "to boast", "competence", "to lack", "competence", "collaboration", "a scholarship", "a trainee", "coachee", "restructure", "the desired destination", 
    "to track someone's progress", "a perspective", "prioritize", "objectivity"
];

let gameData = [
    { definition: "In the care of somebody who is able to do something well", word: "in good hands" },
    { definition: "To speak too proudly about what you have done", word: "to boast" },
    { definition: "The ability to do something well", word: "competence" },
    { definition: "To not have something or not have enough of it", word: "to lack" },
    { definition: "Working together with another people or a group of people to achieve something", word: "collaboration" },
    { definition: "An amount of money given by a school or a university to excellent students to the afford the school fees ", word: "a scholarship" },
    { definition: "A person who is receiving training how to do a job ", word:"a trainee" },
    { definition: "a person who receives training from a coach", word: "coachee" },
    { definition: "To reoganize company", word: "restructure" },
    { definition: "The place you want to arrive at", word: "the desired destination" },
    { definition: "To record someone's development over a period of time", word: "to track someone's progress" },
    { definition: "A particular way of looking at things", word: "a perspective" },
    { definition: "To decide which things are most important so you", word: "prioritize" },
    { definition: "An approach based on facts and not personal feeling or opinions", word: "objectivity" },
];

let currentWordIndex = 0;
let playerScore = 0;

// Event listener for the "Play" button
document.querySelector("#playBtn_1").addEventListener("click", startGame_1);

function startGame_1() {
    document.getElementById("playBtn_1").style.display = 'none';
    document.getElementById("gameContent").style.display = "block";
}

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