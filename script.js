let puzzleContainer = document.getElementById("puzzle");
let difficultySelector = document.getElementById("difficulty");
let uploadInput = document.getElementById("upload");
let startButton = document.getElementById("startGame");
let puzzleImage = "/image/puzzle.jpg";
let isShuffled = false;

let emptyRow, emptyCol;
let gridSize;

const createPuzzle = (size, imageSrc) => {
  puzzleContainer.innerHTML = "";
  gridSize = size;
  puzzleContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  puzzleContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  emptyRow = size - 1;
  emptyCol = size - 1;

  let tileWidth = puzzleContainer.clientWidth / size;
  let tileHeight = puzzleContainer.clientHeight / size;

  let numbers = Array.from({ length: size * size - 1 }, (_, i) => i + 1);
  numbers.push(null); // пусте місце

  numbers.forEach((number, index) => {
    const row = Math.floor(index / size);
    const col = index % size;

    if (number !== null) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.style.width = `${tileWidth}px`;
      tile.style.height = `${tileHeight}px`;
      tile.style.backgroundImage = `url(${imageSrc})`;
      tile.style.backgroundSize = `${puzzleContainer.clientWidth}px ${puzzleContainer.clientHeight}px`;
      tile.style.backgroundPosition = `${(col / (size - 1)) * 100}% ${
        (row / (size - 1)) * 100
      }%`;
      tile.style.top = `${row * tileHeight}px`;
      tile.style.left = `${col * tileWidth}px`;
      tile.setAttribute("data-row", row);
      tile.setAttribute("data-col", col);
      tile.setAttribute("data-index", index);
      tile.addEventListener("click", () => moveTile(tile));
      puzzleContainer.appendChild(tile);
    }
  });
};

const moveTile = (tile) => {
  const row = parseInt(tile.getAttribute("data-row"));
  const col = parseInt(tile.getAttribute("data-col"));
  const rowOffset = Math.abs(emptyRow - row);
  const colOffset = Math.abs(emptyCol - col);

  if (rowOffset + colOffset === 1) {
    const emptyTileTop = `${
      emptyRow * (puzzleContainer.clientHeight / gridSize)
    }px`;
    const emptyTileLeft = `${
      emptyCol * (puzzleContainer.clientWidth / gridSize)
    }px`;

    tile.style.top = emptyTileTop;
    tile.style.left = emptyTileLeft;

    tile.setAttribute("data-row", emptyRow);
    tile.setAttribute("data-col", emptyCol);

    emptyRow = row;
    emptyCol = col;

    if (isShuffled) {
      checkWin();
    }
  }
};

const loadPuzzleImage = (event) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    puzzleImage = e.target.result;
  };
  reader.readAsDataURL(event.target.files[0]);
};

const shufflePuzzle = () => {
  for (let i = 0; i < 1000; i++) {
    const movableTiles = getMovableTiles();
    const randomTile =
      movableTiles[Math.floor(Math.random() * movableTiles.length)];
    moveTile(randomTile);
  }
  isShuffled = true;
};

const getMovableTiles = () => {
  return Array.from(puzzleContainer.getElementsByClassName("tile")).filter(
    (tile) => {
      const row = parseInt(tile.getAttribute("data-row"));
      const col = parseInt(tile.getAttribute("data-col"));
      const rowOffset = Math.abs(emptyRow - row);
      const colOffset = Math.abs(emptyCol - col);
      return rowOffset + colOffset === 1;
    }
  );
};

const checkWin = () => {
  const tiles = Array.from(puzzleContainer.getElementsByClassName("tile"));
  let isWin = true;

  tiles.forEach((tile) => {
    const row = parseInt(tile.getAttribute("data-row"));
    const col = parseInt(tile.getAttribute("data-col"));
    const index = parseInt(tile.getAttribute("data-index"));
    const correctRow = Math.floor(index / gridSize);
    const correctCol = index % gridSize;

    if (row !== correctRow || col !== correctCol) {
      isWin = false;
    }
  });

  if (isWin) {
    setTimeout(() => {
      alert("Congratulations! You have solved the puzzle!");
      isShuffled = false;
    }, 300);
  }
};

const startGame = () => {
  const size = parseInt(difficultySelector.value);
  createPuzzle(size, puzzleImage);
  isShuffled = false;
  shufflePuzzle();
};

uploadInput.addEventListener("change", loadPuzzleImage);
startButton.addEventListener("click", startGame);

startGame();
