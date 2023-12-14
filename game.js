function getRandomNumber() {
  return Math.random() < 1 ? 2 : 4;
}

function startGame() {
  const blockContainer = document.querySelector(".blockContainer");
  for (let i = 1; i <= 4; i++) {
    for (let j = 1; j <= 4; j++) {
      const block = document.querySelector(`.block[data-row="${i}"][data-column="${j}"]`);
      block.textContent = "";
      block.dataset.value = 0;
    }
  }
  placeOnRandomTile();
}

function placeOnRandomTile() {
  const emptyBlocks = [];
  const blockContainer = document.querySelector(".blockContainer");
  for (let i = 1; i <= 4; i++) {
    for (let j = 1; j <= 4; j++) {
      const block = document.querySelector(`.block[data-row="${i}"][data-column="${j}"]`);
      if (block.dataset.value == "0") {
        emptyBlocks.push({ row: i, column: j });
      }
    }
  }
  const value = Math.floor(Math.random() * emptyBlocks.length);
  const randomBlock = emptyBlocks[value];
  const randomValue = getRandomNumber();
  const block = document.querySelector(`.block[data-row="${randomBlock.row}"][data-column="${randomBlock.column}"]`);
  block.textContent = randomValue;
  block.dataset.value = randomValue;
}

function updateScore() {
  const currentScore = document.getElementById("currentScore");
  const highScore = document.getElementById("highScore");
  const maxScore = parseInt(highScore.textContent);
  let sum = 0;
  const blocks = document.querySelectorAll(".block");
  for (let block of blocks) {
    sum += parseInt(block.dataset.value);
  }
  currentScore.textContent = sum;
  if (sum > maxScore) {
    highScore.textContent = sum;
  }
}
document.addEventListener("keydown", function (event) {
  event.preventDefault();
  const direction = event.key;
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(direction)) {
    moveTiles(direction);
  }

  function moveUp() {
    for (let col = 1; col <= 4; col++) {
      for (let row = 2; row <= 4; row++) {
        let currentTile = document.querySelector(`.block[data-row="${row}"][data-column="${col}"]`);
        if (currentTile.dataset.value !== "0") {
          let newRow = row;
          while (newRow > 1) {
            let upTile = document.querySelector(`.block[data-row="${newRow - 1}"][data-column="${col}"]`);
            if (upTile.dataset.value == "0") {
              upTile.textContent = currentTile.textContent;
              upTile.dataset.value = currentTile.dataset.value;
              currentTile.textContent = "";
              currentTile.dataset.value = "0";
              newRow--;
              updateScore();
            } else if (upTile.dataset.value == currentTile.dataset.value) {
              upTile.textContent = 2 * (currentTile.dataset.value);
              upTile.dataset.value = upTile.textContent;
              currentTile.textContent = "";
              currentTile.dataset.value = "0";
              break;
            } else {
              break;
            }
          }
        }
      }
    }
  }
  function moveLeft() {
    for (let row = 1; row <= 4; row++) {
      for (let col = 2; col <= 4; col++) {
        let currentTile = document.querySelector(`.block[data-row="${row}"][data-column="${col}"]`);
        if (currentTile.dataset.value !== "0") {
          let newCol = col;
          while (newCol > 1) {
            let leftTile = document.querySelector(`.block[data-row="${row}"][data-column="${newCol - 1}"]`);
            if (leftTile.dataset.value == "0") {
              leftTile.textContent = currentTile.textContent;
              leftTile.dataset.value = currentTile.dataset.value;
              currentTile.textContent = "";
              currentTile.dataset.value = "0";
              newCol--;
              updateScore();
            } else if (leftTile.dataset.value == currentTile.dataset.value) {
              leftTile.textContent = 2 * (currentTile.dataset.value);
              leftTile.dataset.value = leftTile.textContent;
              currentTile.textContent = "";
              currentTile.dataset.value = "0";
              break;
            } else {
              break;
            }
          }
        }
      }
    }
  }

  function moveRight() {
    for (let row = 1; row <= 4; row++) {
      for (let col = 3; col >= 1; col--) {
        let currentTile = document.querySelector(`.block[data-row="${row}"][data-column="${col}"]`);
        if (currentTile.dataset.value !== "0") {
          let newCol = col;
          while (newCol < 4) {
            let rightTile = document.querySelector(`.block[data-row="${row}"][data-column="${newCol + 1}"]`);
            if (rightTile.dataset.value == "0") {
              rightTile.textContent = currentTile.textContent;
              rightTile.dataset.value = currentTile.dataset.value;
              currentTile.textContent = "";
              currentTile.dataset.value = "0";
              newCol++;
              updateScore();
            } else if (rightTile.dataset.value == currentTile.dataset.value) {
              rightTile.textContent = 2 * parseInt(currentTile.dataset.value);
              rightTile.dataset.value = rightTile.textContent;
              currentTile.textContent = "";
              currentTile.dataset.value = "0";
              break;
            } else {
              break;
            }
          }
        }
      }
    }
  }
  function moveDown() {
    for (let col = 1; col <= 4; col++) {
      for (let row = 3; row >= 1; row--) {
        let currentTile = document.querySelector(`.block[data-row="${row}"][data-column="${col}"]`);
        if (currentTile.dataset.value !== "0") {
          let newRow = row;
          while (newRow < 4) {
            let downTile = document.querySelector(`.block[data-row="${newRow + 1}"][data-column="${col}"]`);
            if (downTile.dataset.value == "0") {
              downTile.textContent = currentTile.textContent;
              downTile.dataset.value = currentTile.dataset.value;
              currentTile.textContent = "";
              currentTile.dataset.value = "0";
              updateScore();
              newRow++;
            } else if (downTile.dataset.value == currentTile.dataset.value) {
              downTile.textContent = 2 * (currentTile.dataset.value);
              downTile.dataset.value = downTile.textContent;
              currentTile.textContent = "";
              currentTile.dataset.value = "0";
              break;
            } else {
              break;
            }
          }
        }
      }
    }
  }
  

  function moveTiles(direction) {
    switch (direction) {
      case "ArrowUp":
        moveUp();
        break;
      case "ArrowLeft":
        moveLeft();
        break;
      case "ArrowRight":
        moveRight();
        break;
      case "ArrowDown":
        moveDown();
        break;
    }

    placeOnRandomTile();
    updateScore();
  }

  function gameOver() {
    window.location.href = "./gameover.html"
  }
});

startGame();
