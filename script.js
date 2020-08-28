//  Gameboard holds the board as an array, and functions to interact with board
// Built as a module (Revealing module pattern) -- Scratch that
const gameBoard = (() => {
  'use strict';
  // Default board on setup, false status signifying incomplete game, winner defaulted
  const board = Array(9).fill("");
  const status = false;
  const winner = "";

  // --- Functions to interact with board ---

  // Return board at current state
  const getBoard = () => board;

  // Make a move on game board
  const playMove = (player, position) => {
    // Check if move valid, if so play it
    if (board[position] == "") {
      board[position] = player.getToken()
      return true;
    } else {
      return false;
    }
  };

  // Check to see if board full or won, return false if incomplete, true if won, "tie" if full
  const _checkBoard = () => {
    if (!board.any("")) {
      console.log("Board is full")
    } else if (_playerWin()) {
      console.log("Winner!")
    }
  }

  const _playerWin = () => {
    // If any wins, return true, else false
    if (_horizontalWin || _verticalWin || _diagonalWin) {
      return true
    } else {
      return false
    }
  }

  const _horizontalWin = () => {
    // Return true if any horizontal slize all equal to x or o, else false
    if (board.slice(0,2).all("X") || board.slice(0,2).all("O")) {
      return true;
    } else if (board.slice(3,5).all("X") || board.slice(3,5).all("O")) {
      return true;
    } else if (board.slice(6,8).all("X") || board.slice(6,8).all("O")) {
      return true;
    } else {
      return false;
    }
  }
  const _verticalWin = () => {
    // return true if any vertical chunk all equal X or O, else false
  }
  const _diagonalWin = () => {
    // return true if any horizontal chunk all equal X or O, else false

  }
  // Exposing our public functions
  return {
    getBoard:getBoard,
    playMove:playMove
  };
})();

// Players will be stored in objects, include player functionality
// Add functions to allow players to mark a specific spot on board and tie to DOM
// allowing for "click to play" interaction
const Player = (name, token, human) => {
  // Check if human, will setup differently if AI
  human = human || true;
  const getName = () => name;
  const isHuman = () => human;
  const getToken = () => token;

  return {getName, isHuman, getToken}
}



// Object to control flow of game
// MAY MAKE INTO MODULE AS WE ONLY NEED ONE
const Game = (player1, player2, board) => {
  // Returns  a new game object to be played with given chars and new board
  // Result will be false to start, change to winner/ tie based on outcome
  let result = false;
  let currentPlayer = player1;

  return { player1, player2, board, result, currentPlayer}
}



// Function to render contents of gameboard array to page
// (Maybe use to add all stages of game to page too)
// ie, renderBoardBox, renderPlayerSelect
const displayController = ((game) => {

  // render board in board display area
  const renderBoard = (game) => {
    // Grab board box
    let boardBox = document.querySelector(".boardBox");

    // Loop through our boards array and set up spots accordingly
    // Go backwards so we can push appends out to end
    // Set count for data-keys
    let i = -1;

    for (let position of game.board.getBoard()) {
      // Increment count to set as data key for each spot
      i ++
      if (position == "X") {
          let block = document.createElement('div');
          block.setAttribute("class", "spot");
          block.setAttribute("data-num", `${i}`);
          block.textContent = "X";
          boardBox.appendChild(block)
      } else if (position == "O") {
          let block = document.createElement('div');
          block.setAttribute("class", "spot");
          block.setAttribute("data-num", `${i}`);
          block.textContent = "O";
          boardBox.appendChild(block)
      } else {
          // Setup blank spot
          let block = document.createElement('div');
          block.setAttribute("class", "spot");
          // Add listener to blank spots to await clicks on turn
          block.addEventListener('click', (e) => {
            let dataNum = e.srcElement.getAttribute("data-num")
            console.log(dataNum)
            if (game.board.playMove(game.currentPlayer, dataNum)) {
              // If move works, swap player and re-render spot
              let spot = document.querySelectorAll(`[data-num="${dataNum}"]`)
              spot.textContent = game.currentPlayer.getToken
              if (game.currentPlayer == game.player1) {
                game.currentPlayer = game.player2;
                displayController.reRenderBoard(game)
              } else {
                game.currentPlayer = game.player1;
                displayController.reRenderBoard(game)
              }
            } else {
              console.log("Invalid move")
            }
          })
          block.setAttribute("data-num", `${i}`);
          boardBox.appendChild(block)
      }
    }
  };

  const reRenderBoard = (game) => {
    let boardBox = document.querySelector(".boardBox");

    for (let child of boardBox.children) {
        console.log(child)
        console.log(child.textContent)
        console.log(game.board.getBoard()[child.getAttribute("data-num")])
        if (child.textContent === game.board.getBoard()[child.getAttribute("data-num")]) {
          // Leave it as is if exact same
        } else {
          // Update text if its been changed
          child.textContent = game.board.getBoard()[child.getAttribute("data-num")]
        }
    }
  }

  return {
    renderBoard,
    reRenderBoard,
  };
})();

//  GOAL IS TO HAVE AS LITTLE GLOBAL CODE AS POSSIBLE
// Try tucking everything away inside of a module or factory.
// Rule of thumb: if you only ever need ONE of something (gameBoard, displayController),
//  use a module. If you need
 // multiples of something (players!), create them with factories.



// Game setup for testing
console.log(gameBoard.getBoard());
console.log(gameBoard);
gameBoard.getBoard();

const myPlayer1 = Player("Joe", "X");
console.log(myPlayer1.getName());
console.log(myPlayer1.isHuman());
console.log(myPlayer1);

const myPlayer2 = Player("Jeb", "O");
console.log(myPlayer2.getName());
console.log(myPlayer2.isHuman());
console.log(myPlayer2);

const newGame = Game(myPlayer1, myPlayer2, gameBoard)

// newGame.board.playMove(myPlayer1, 0);
// newGame.board.playMove(myPlayer1, 1);
// newGame.board.playMove(myPlayer2, 4);
// newGame.board.playMove(myPlayer2, 6);

console.log(gameBoard.getBoard());

displayController.renderBoard(newGame)
