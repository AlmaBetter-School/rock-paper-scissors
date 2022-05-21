// variables
let playerScore = Number(localStorage.getItem("rpc-score")) ?? 0;
let playerSelection = "";
const houseOptions = ["rock", "paper", "scissors"];
let houseSelection = "";

// selectors
const $ = (selector) => document.querySelector(selector);
const scoreCount = $("#score-count");
scoreCount.innerText = playerScore;
const rock = $(".rock");
const paper = $(".paper");
const scissors = $(".scissors");
const gameContainer = $(".game-container");
const selectContainer = $(".select-container");
const housePickContainer = $("#house-pick-container");
const resultContainer = $(".result-container");
const playAgainBtn = $(".btn-play-again");

// event listeners
rock.addEventListener("click", () => handlePlayerSelection("rock"));
paper.addEventListener("click", () => handlePlayerSelection("paper"));
scissors.addEventListener("click", () => handlePlayerSelection("scissors"));
playAgainBtn.addEventListener("click", handlePlayAgain);

// functions

function handlePlayerSelection(selection) {
  playerSelection = selection;
  gameContainer.style.display = "none";
  selectContainer.style.display = "flex";
  playerPick(selection);
  setTimeout(() => {
    housePick();
    setTimeout(() => {
      printResult();
    }, 1000);
  }, 1000);
}

function playerPick(selection) {
  const pickElement = document.createElement("div");
  pickElement.id = "player-pick-element";
  pickElement.classList.add("icon");
  pickElement.classList.add(selection);
  pickElement.appendChild(getImage(selection));
  $("#player-pick-container").appendChild(pickElement);
}

function housePick() {
  const randomPick = Math.floor(Math.random() * 3);
  houseSelection = houseOptions[randomPick];

  const pickElement = document.createElement("div");
  pickElement.id = "house-pick-element";
  pickElement.classList.add("icon");
  pickElement.classList.add(houseSelection);
  pickElement.appendChild(getImage(houseSelection));
  housePickContainer.appendChild(pickElement);
  housePickContainer.style.display = "flex";
}

function getImage(selection) {
  const image = document.createElement("img");
  image.src = `../assets/icon-${selection}.svg`;
  image.alt = `${selection}`;
  return image;
}

function getResult(playerSelection, houseSelection) {
  if (playerSelection === houseSelection) {
    return "draw";
  } else if (
    (playerSelection === "rock" && houseSelection === "scissors") ||
    (playerSelection === "paper" && houseSelection === "rock") ||
    (playerSelection === "scissors" && houseSelection === "paper")
  ) {
    return "win";
  } else {
    return "lose";
  }
}

function printResult() {
  resultContainer.style.display = "flex";
  selectContainer.style.gap = "234px";

  const result = getResult(playerSelection, houseSelection);
  if (result === "win") {
    playerScore += 1;
    scoreCount.innerText = playerScore;
    localStorage.setItem("rpc-score", playerScore);
    $("#player-pick-element").classList.add("win");
  } else if (result === "lose") {
    $("#house-pick-element").classList.add("win");
    if (playerScore > 0) {
      playerScore -= 1;
      scoreCount.innerText = playerScore;
      localStorage.setItem("rpc-score", playerScore);
    }
  }
  $("#result-text").innerText = result == "draw" ? "Draw" : `you ${result}!`;
}

function handlePlayAgain() {
  gameContainer.style.display = "flex";
  selectContainer.style.display = "none";

  playerSelection = "";
  houseSelection = "";

  $("#player-pick-element").remove();
  $("#house-pick-element").remove();

  housePickContainer.style.display = "none";
  resultContainer.style.display = "none";
  selectContainer.style.gap = "80px";
}
