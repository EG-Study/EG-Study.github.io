// TOEIC Vocabulary
const toeicWords = [
    { word: "abide by", meaning: "tôn trọng, tuân theo, giữ (lời)" },
    { word: "agreement", meaning: "hợp đồng, giao kèo, sự đồng ý/thỏa thuận với nhau" },
    { word: "assurance", meaning: "sự cam đoan, bảo đảm, chắc chắn; sự tin chắc, tự tin" },
    { word: "cancellation", meaning: "sự bãi bỏ, hủy bỏ" },
    { word: "determine", meaning: "quyết định, xác định, định rõ; quyết tâm, kiên quyết" },
    { word: "engage", meaning: "(v)Tham gia, cam kết, (n)sự hứa hẹn, hứa hôn" },
    { word: "establish", meaning: "thiết lập, thành lập; xác minh, chứng minh, củng cố" },
    { word: "obligate", meaning: "bắt buộc, ép buộc" },
    { word: "party", meaning: "đảng, phái, đội, nhóm; người tham dự/tham gia; buổi liên hoan, buổi tiệc" },
    { word: "provision", meaning: "sự dự liệu, dự trữ, dự phòng, cung cấp; điều khoản" },
    { word: "resolve", meaning: "(v) giải quyết, (n) sự kiên quyết / sự tin chắc" },
    { word: "specific", meaning: "riêng biệt, cụ thể, đặc trưng; rõ ràng, rành mạch" },
    { word: "attract", meaning: "hấp dẫn, lôi cuốn, thu hút" },
    { word: "compare", meaning: "so sánh, đối chiếu" },
    { word: "competition", meaning: "‹sự/cuộc› cạnh tranh, tranh giành, thi đấu" },
    { word: "consume", meaning: "tiêu thụ, tiêu dùng" },
    { word: "convince", meaning: "Thuyết phục" },
    { word: "currently", meaning: "hiện thời, hiện nay, lúc này" },
    { word: "fad", meaning: "mốt nhất thời, sự thích thú tạm thời; dở hơi, gàn dở" },
    { word: "inspiration", meaning: "‹sự/người/vật› truyền cảm hứng, gây cảm hứng" },
    { word: "market", meaning: "thị trường, chợ, nơi mua bán sản phẩm" },
];

// A1 Level
const a1Words = [
{ word: "wordA1_1", meaning: "meaningA1_1" },
{ word: "wordA1_2", meaning: "meaningA1_2" },
// ... add more words for A1 category
];

let words = [];

function start() {
    document.getElementById("category").style.display = "none";
    document.getElementById("game-container").style.display = "block";  
    changeCategory();
    displayNextWord();
    userInput.addEventListener("input", function() {
    if (userInput.value.trim() === words[currentWordIndex].word) {
        currentWordIndex++;
        playerScore++;
        document.getElementById("playerScore").textContent = playerScore;
        displayNextWord();
    }
    });
    
    displayNextWord();
}

function changeCategory() {
    const selectedCategory = document.getElementById("categorySelect").value;
    switch (selectedCategory) {
        case "toeic":
            words = toeicWords;
            break;
        case "a1":
            words = a1Words;
            break;
        // ... add cases for other categories
        default:
            // Handle invalid category selection
            break;
    }
}

const wordDisplay = document.getElementById("word-display");
const meaningDisplay = document.getElementById("meaning-display");
const userInput = document.getElementById("user-input");

let currentWordIndex = 0;
let playerScore = 0;

function displayNextWord() {
if (currentWordIndex < words.length) {
    wordDisplay.textContent = `${words[currentWordIndex].word}`;
    meaningDisplay.textContent = `${words[currentWordIndex].meaning}`;
    userInput.value = "";
} else {
    wordDisplay.textContent = "Game Over";
    meaningDisplay.textContent = "";
    userInput.disabled = true;
    document.getElementById("playAgainButtonDiv").style.display = "block";
}
}


function playAgain() {
    // Reset the game and scores
    currentWordIndex = 0;
    playerScore = 0;

    document.getElementById("playerScore").textContent = "0";
    document.getElementById("playAgainButtonDiv").style.display = "none";
    userInput.disabled = false;

    document.getElementById("category").style.display = "block";
    document.getElementById("game-container").style.display = "none";
}