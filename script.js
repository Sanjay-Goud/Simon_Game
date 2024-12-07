let gameSeq = [];
let userSeq = [];
let gameStarted = false;
let level = 0;
let btns = ["purple", "blue", "orange", "green"];
let highScore = parseInt(localStorage.getItem("highScore")) || 0;

let isMobile = /Mobi|Android/i.test(navigator.userAgent);
let h2 = document.querySelector("h2");
let highScoreDisplay = document.getElementById("high-score-display");

// Update the initial high score display
function updateHighScoreDisplay() {
    highScoreDisplay.innerText = `High Score: ${highScore}`;
}
updateHighScoreDisplay();

function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        levelUp();
    }
}

if (isMobile) {
    h2.innerText = "Tap on the screen to start the game";
    document.addEventListener("touchstart", startGame);
} else {
    document.addEventListener("keypress", startGame);
}

function playSound(color) {
    let audio = new Audio(`sounds/${color}.wav`);
    audio.volume = 0.5;
    audio.play();
}

function blink(btn) {
    btn.classList.add("white");
    setTimeout(() => {
        btn.classList.remove("white");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randomIdx = Math.floor(Math.random() * 4);
    let randomColor = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    playSound(randomColor);
    blink(randomBtn);
}

function btnPress() {
    blink(this);
    let userColor = this.getAttribute("id");
    userSeq.push(userColor);
    playSound(userColor);
    checkAns(userSeq.length - 1);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        updateHighScore(level);
        let body = document.querySelector("body");
        body.classList.add("red");
        setTimeout(() => {
            body.classList.remove("red");
        }, 300);

        if (isMobile) {
            h2.innerHTML = `Game Over! Your score was ${level}.<br> Tap on the screen to restart the game.`;
        } else {
            h2.innerHTML = `Game Over! Your score was ${level}.<br> Press any key to restart the game.`;
        }
        reset();
    }
}

function updateHighScore(currentScore) {
    if (currentScore > highScore) {
        highScore = currentScore;
        localStorage.setItem("highScore", highScore);
        updateHighScoreDisplay();
    }
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    gameStarted = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

// Reset High Score Button
document.getElementById("reset-high-score").addEventListener("click", () => {
    localStorage.setItem("highScore", 0);
    highScore = 0;
    updateHighScoreDisplay();
    alert("High score has been reset!");
});
