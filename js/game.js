//jshint esversion:6
import { words } from "./listWords.js";
const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
let imgPlace;
let wordPlace;
let categoryPlace;
let word;
let tempWord;
let maxGuesses = 6;
let count = 0;

window.onload = () => {
  wordPlace = document.getElementById("wordPlace");
  categoryPlace = document.getElementById("categoryPlace");
  imgPlace = document.getElementsByTagName("img")[0];

  [categoryPlace.innerHTML, word] = randomWord();

  tempWord = "_".repeat(word.length);
  wordPlace.innerHTML = tempWord;

  buttonsRender();
};

//Calculate a random word+category from words
function randomWord() {
  let obj = words[Math.floor(Math.random() * words.length)];
  let category = obj.category.toUpperCase();
  let word =
    obj.list[Math.floor(Math.random() * obj.list.length)].toUpperCase();
  return [category, word];
}

//Renderise the buttons and give them properties
function buttonsRender() {
  let btnContainer = document.getElementById("btnContainer");
  alphabet.forEach((el) => {
    let newBtn = document.createElement("button");

    newBtn.innerHTML = el;
    newBtn.id = el;

    newBtn.addEventListener("click", function () {
      checkWord(el);
    });

    btnContainer.appendChild(newBtn);
  });
}

function checkWord(el) {
  let guessBtn = document.getElementById(el);

  if (word.includes(el)) {
    guessBtn.style.background = "green";
    let w = updateWord(el);
    if (!w.includes("_")) {
      gameWon();
    }
  } else {
    count++;
    let dir = "images/" + count + ".png";
    imgPlace.setAttribute("src", dir);
    guessBtn.style.background = "red";
    if (count === maxGuesses) {
      gameOver();
    }
  }
  guessBtn.disabled = true;
}

//update word
function updateWord(el) {
  for (let i = 0; i < word.length; i++) {
    if (word[i] === el) {
      tempWord = tempWord.split("");
      tempWord[i] = el;
      tempWord = tempWord.join("");
    }
  }
  wordPlace.innerHTML = tempWord;
  return tempWord;
}

//user won the game
function gameWon() {
  disableBtn();
  let winSign = document.querySelector(".win");
  winSign.classList.remove("hidden");
}

//user lost the game
function gameOver() {
  wordPlace.innerHTML = word;
  disableBtn();
  let loseSign = document.querySelector(".lose");
  loseSign.classList.remove("hidden");
}

function refreshPage() {
  window.location.reload();
}

//disable all buttons after game
function disableBtn() {
  Array.from(document.getElementsByTagName("button")).forEach(
    (b) => (b.disabled = true)
  );
}
