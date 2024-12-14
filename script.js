// Elementos do jogo
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");

// Variáveis do jogo
let currentPlayer = "X"; // Jogador atual
let gameBoard = ["", "", "", "", "", "", "", "", ""]; // Estado do tabuleiro
let isGameActive = true;

// Combinações vencedoras
const winConditions = [
  [0, 1, 2], // Linha superior
  [3, 4, 5], // Linha do meio
  [6, 7, 8], // Linha inferior
  [0, 3, 6], // Coluna esquerda
  [1, 4, 7], // Coluna do meio
  [2, 5, 8], // Coluna direita
  [0, 4, 8], // Diagonal principal
  [2, 4, 6], // Diagonal secundária
];

// Atualiza o status do jogo
function updateStatus(message) {
  statusText.textContent = message;
}

// Verifica se há um vencedor
function checkWinner() {
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      isGameActive = false;
      updateStatus(`Jogador ${gameBoard[a]} venceu!`);
      highlightWinningCells(condition);
      return true;
    }
  }

  // Verifica empate
  if (!gameBoard.includes("")) {
    isGameActive = false;
    updateStatus("Empate!");
    return true;
  }

  return false;
}

// Destaca as células vencedoras
function highlightWinningCells(condition) {
  condition.forEach(index => {
    cells[index].style.backgroundColor = "#4CAF50";
  });
}

// Reinicia o jogo
function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameActive = true;
  updateStatus("Vez do jogador: X");
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken");
    cell.style.backgroundColor = "#fff";
  });
}

// Gerencia os cliques nas células
function handleCellClick(event) {
  const cell = event.target;
  const cellIndex = cell.getAttribute("data-index");

  // Verifica se a célula já está ocupada ou o jogo terminou
  if (gameBoard[cellIndex] !== "" || !isGameActive) return;

  // Marca a jogada
  gameBoard[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  // Verifica se há um vencedor ou muda o jogador
  if (!checkWinner()) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus(`Vez do jogador: ${currentPlayer}`);
  }
}

// Adiciona eventos aos elementos
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", resetGame);
