// Data
const allWords = [
    "yêu cầu sự hợp tác", "mức độ niềm tin cao", "cố gắng gắn kết với họ", "phong cách nuôi con", "tạo ấn tượng tốt", "đạt/dành được học bổng", "phân tích", "có khả năng", "ưu tiên", "hình thành mối quan hệ công việc gần gũi",
    "thay đổi cách chúng ta xây dựng niềm tin", "tin/giả định ý định tốt nhất", "tạo ra thay đổi tích cực trong cuộc sống bạn", "tự trở thành chuyên gia trong việc làm thế nào để đạt được mục tiêu", "cảm thấy ít chuẩn bị và thiếu động lực", "xem xét việc thuê 1 huấn luyện viên chuyên nghiệp", "1 khoảng thời gian ngắn, cụ thể", "so sánh với", "đưa ra lời khuyên", "kế hoạch cố định",
    "làm cho họ có thể thấy tình huống rõ ràng / hiểu rõ tình hình", "xác định mục tiêu và ưu tiên chúng", "và bằng cách làm như vậy", "giữ cho họ tập trung vào mục tiêu cuối cùng", "tìm thấy chiến lược phù hợp", "đạt được mục tiêu của họ", "có được/ đạt được/ học kỹ năng huấn luyện",
    "đảm bảo rằng nhân viên vui vẻ và có động lực", "cải thiện sự thể hiện của đội nhóm của họ/ nâng cao năng suất làm việc", "thay cho cấu trúc help sb do sth"
];

let gameData = [
    { definition: "Requires collaboration", word: "yêu cầu sự hợp tác" },
    { definition: "High level of trust", word:"mức độ niềm tin cao" },
    { definition: "Try to bond with them", word:"cố gắng gắn kết với họ" },
    { definition: "Parenting style", word:"phong cách nuôi con" },
    { definition: "Make a good impression on/ leave a good impression on", word:"tạo ấn tượng tốt" },
    { definition: "Win/gain a scholarship", word:"đạt/dành được học bổng" },
    { definition: "Analyze", word:"phân tích" },
    { definition: "Capable of", word:"có khả năng" },
    { definition: "Prioritize", word:"ưu tiên" },
    { definition: "Form close professional relationships", word:"hình thành mối quan hệ công việc gần gũi" },
    { definition: "Adapt the way we build trust", word:"thay đổi cách chúng ta xây dựng niềm tin" },
    { definition: "Assume the best intention", word:"tin/giả định ý định tốt nhất" },
    { definition: "Make/bring about postive changes in your life", word:"tạo ra thay đổi tích cực trong cuộc sống bạn" },
    { definition: "become your own expert in hơ to achieve", word:"tự trở thành chuyên gia trong việc làm thế nào để đạt được mục tiêu" },
    { definition: "Feel less prepared and demotivated", word:"cảm thấy ít chuẩn bị và thiếu động lực" },
    { definition: "Consider hiring a professional coach", word:"xem xét việc thuê 1 huấn luyện viên chuyên nghiệp" },
    { definition: "A short, specified amount of time", word:"1 khoảng thời gian ngắn, cụ thể" },
    { definition: "Compare to", word:"so sánh với" },
    { definition: "Give/ offer advice", word:"đưa ra lời khuyên" },
    { definition: "A fixed plan", word:"kế hoạch cố định" },
    { definition: "Enable them to see the situation clearly/ help them see the situation clearly", word:"làm cho họ có thể thấy tình huống rõ ràng / hiểu rõ tình hình" },
    { definition: "Identify goals and prioritize them", word:"xác định mục tiêu và ưu tiên chúng" },
    { definition: "And in doing so,", word:"và bằng cách làm như vậy" },
    { definition: "Keep them focused on the end goal", word:"giữ cho họ tập trung vào mục tiêu cuối cùng" },
    { definition: "Find the appropriate strategies", word:"tìm thấy chiến lược phù hợp" },
    { definition: "Reach/ achieve/ attain their goals", word:"đạt được mục tiêu của họ" },
    { definition: "Acquire/ learn/ pick up coaching skills", word:"có được/ đạt được/ học kỹ năng huấn luyện" },
    { definition: "Ensure their staff are happy and motivated", word:"đảm bảo rằng nhân viên vui vẻ và có động lực" },
    { definition: "Improve the performance of their teams / boost/ increase their team productivity", word:"cải thiện sự thể hiện của đội nhóm của họ/ nâng cao năng suất làm việc" },
    { definition: "Enable sb to do sth / assist sb in doing sth /ensure S+V /allow sb to +VO", word:"thay cho cấu trúc help sb do sth" },
];

let usedWordIndices = [];
let currentWordIndex = 0;
let playerScore = 0;

// Event listener for the "Play" button
document.querySelector("#playBtn_1").addEventListener("click", startGame_1);

function startGame_1() {
    document.getElementById("playBtn_1").style.display = 'none';
    document.getElementById("gameContent").style.display = "block";
}

function loadWord() {
    if (usedWordIndices.length === gameData.length) {
        // All words have been used in this round
        endRound();
        return;
    }

    // Shuffle the gameData array if all words have been used once
    if (usedWordIndices.length === 0) {
        gameData = shuffle(gameData);
    }

    // Find a new word index that hasn't been used in this round
    let newWordIndex;
    do {
        newWordIndex = Math.floor(Math.random() * gameData.length);
    } while (usedWordIndices.includes(newWordIndex));

    usedWordIndices.push(newWordIndex);

    const currentWordData = gameData[newWordIndex];
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

function endRound() {
    // Display end-of-round message or perform any other actions
    // ...
    // Reset used word indices for the next round
    usedWordIndices = [];
}

function playAgain() {
    // Reset the game state
    currentWordIndex = 0;
    playerScore = 0;
    usedWordIndices = [];

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