// JavaScript code to handle sliding animation of the main box button
document.addEventListener("DOMContentLoaded", function() {
    const mainBox = document.querySelector('.main_box');
    const btnOne = document.querySelector('.btn_one');
    const btnTwo = document.querySelector('.btn_two');
    const sidebarMenu = document.querySelector('.sidebar_menu');

    btnOne.addEventListener('click', function() {
        mainBox.classList.add('slide');
        sidebarMenu.style.left = '0';
    });

    btnTwo.addEventListener('click', function() {
        mainBox.classList.remove('slide');
        sidebarMenu.style.left = '-400px';
    });
});



let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highestScore = 0;

let h2 = document.querySelector("h2");
let startBtn = document.getElementById("startBtn");
let restartBtn = document.getElementById("restartBtn");
let highestScoreElement = document.getElementById("highestScore");

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);

// -------------------------------------------------------

function startGame() {
    if (!started) {
        console.log("Game is Started");
        started = true;
        startBtn.style.display = "none";
        restartBtn.style.display = "block";
        levelUp();
    }
}

function restartGame() {
    started = false;
    startBtn.style.display = "block";
    restartBtn.style.display = "none";
    reset();
    startGame();
}

// -------------------------------------------------------

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

// level up 

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    updateHighestScore();

    //random btn choose
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randbtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br> Press Restart button to Start Game again.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        if (level > highestScore) {
            highestScore = level;
            highestScoreElement.innerText = highestScore;
        }
        reset();
    }
}

// button Event Listeners

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    gameSeq = [];
    userSeq = [];
    level = 0;
}

function updateHighestScore() {
    if (level > highestScore) {
        highestScore = level;
        highestScoreElement.innerText = highestScore;
    }
}
