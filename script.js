//  Gameboard holds the board as an array, and functions to interact with board
// Built as a module (Revealing module pattern)
const gameBoard = (() => {
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
    } else if (_playerWin) {
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
    if (board[0] == board[3] && board[0] == board[6]) {
      return true;
    } else if (board[1] == board[4] && board[1] == board[7]) {
      return true;
    } else if (board[2] == board[5] && board[2] == board[8]) {
      return true;
    } else {
      return false
    }
  }
  const _diagonalWin = () => {
    // return true if any horizontal chunk all equal X or O, else false
    if (board[0] == board[4] && board[0] == board[8]) {
      return true;
    } else if (board[2] == board[4] && board[2] == board[6]) {
      return true;
    } else {
      return false
    }
  }
  // Exposing our public functions
  return {
    getBoard:getBoard,
    playMove:playMove
  };
})();

// Players will be stored in objects
const playerFactory = (name, token, ai) => {
  // Check if human, will setup differently if AI
  let bot = ai || false;
  const getName = () => name;
  const getToken = () => token;
  const isBot = () => bot;

  return {getName, getToken, isBot}
}



// Object to hold game details
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

  const renderPlayerSelection = () => {

    let body = document.querySelector('body');

    let selectBox = document.createElement('div');
    selectBox.setAttribute('class', 'selectBox');
    let selectTitle = document.createElement('h1');
    selectTitle.textContent = "Player Names"

    let p1Box = document.createElement('div');
    p1Box.setAttribute('class', 'playerBox');

    let p2Box = document.createElement('div');
    p2Box.setAttribute('class', 'playerBox');

    const p1NameInput = document.createElement('input');
    p1NameInput.setAttribute('class','nameInput');
    p1NameInput.setAttribute('data-player','1');
    p1NameInput.type = "name";
    p1NameInput.maxLength = 15;
    let p1AiInput = document.createElement('input');
    p1AiInput.type = "checkbox";
    let p1NameLabel = document.createElement('label');
    p1NameLabel.textContent = "Player 1:"
    let p1AiLabel = document.createElement('label');
    p1AiLabel.textContent = "- AI?"

    const p2NameInput = document.createElement('input');
    p2NameInput.setAttribute('class','nameInput');
    p2NameInput.setAttribute('data-player','2');
    p2NameInput.type = "name";
    p2NameInput.maxLength = 15;
    let p2AiInput = document.createElement('input');
    p2AiInput.type = "checkbox";
    let p2NameLabel = document.createElement('label');
    p2NameLabel.textContent = "Player 2:"
    let p2AiLabel = document.createElement('label');
    p2AiLabel.textContent = "- AI?"

    let nameButton = document.createElement('button')
    nameButton.textContent = "- Play Game -"
    let startGameFunct = () => {
      // Create players from info on page, then remove playerSelect

      let player1 = playerFactory(p1NameInput.value, "X", (p1AiInput.checked) ? true : false);
      let player2 = playerFactory(p2NameInput.value, "O", (p2AiInput.checked) ? true : false);
      console.log(player1);
      console.log(typeof(player2));
      console.log(player1.getName());
      console.log(player2.getName());
      console.log(player1.getToken());
      console.log(player2.getToken());
      console.log(player1.isBot());
      console.log(player2.isBot());

      // Setup new game
      let game = Game(player1, player2, gameBoard);

      // Clear page
      body.removeChild(selectBox);

      // Pass new game to board render
      renderBoard(game);
    }
    nameButton.addEventListener('click', startGameFunct)


    p1Box.appendChild(p1NameInput);
    p1Box.insertBefore(p1NameLabel, p1NameInput);
    p1NameInput.insertAdjacentElement("afterend", p1AiInput);
    p1AiInput.insertAdjacentElement("beforebegin", p1AiLabel);


    p2Box.appendChild(p2NameInput);
    p2Box.insertBefore(p2NameLabel, p2NameInput);
    p2NameInput.insertAdjacentElement("afterend", p2AiInput);
    p2AiInput.insertAdjacentElement("beforebegin", p2AiLabel);

    selectBox.appendChild(selectTitle);
    selectBox.appendChild(p1Box);
    selectBox.appendChild(p2Box);
    selectBox.appendChild(nameButton);

    console.log(selectBox);
    body.insertBefore(selectBox, body.children[0]);
  }

  const renderWelcome = () => {
    // Build element
    let title1 = document.createElement('h1');
    title1.textContent = "Welcome";

    let title2 = document.createElement('h2');
    title2.textContent = "to"

    let title3 = document.createElement('h1');
    title3.textContent = "Tic-Tac-Toe"

    let clickText = document.createElement('p');
    clickText.textContent = "- Click Anywhere to Continue -"

    let titleDiv = document.createElement('div');
    titleDiv.setAttribute('class', 'titleDiv')
    titleDiv.appendChild(title1);
    titleDiv.appendChild(title2);
    titleDiv.appendChild(title3);
    titleDiv.appendChild(clickText);

    let body = document.querySelector('body');
    body.appendChild(titleDiv)

    // Add element with one time event listener on html
    let html = document.querySelector('html');
    let setupFunct = () => {
      body.removeChild(titleDiv)
      html.removeEventListener('click', setupFunct)
      renderPlayerSelection()
    }
    html.addEventListener('click', setupFunct);

  }

  // render board in board display area
  const renderBoard = (game) => {
    // Grab board box

    let boardBox = document.createElement("div");
    boardBox.setAttribute('class', 'boardBox');
    let body = document.querySelector('body');
    body.insertAdjacentElement("afterbegin", boardBox);

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
                reRenderBoard(game)
              } else {
                game.currentPlayer = game.player1;
                reRenderBoard(game)
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
    renderWelcome,
    renderBoard,
  };
})();

//  GOAL IS TO HAVE AS LITTLE GLOBAL CODE AS POSSIBLE
// Try tucking everything away inside of a module or factory.
// Rule of thumb: if you only ever need ONE of something (gameBoard, displayController),
//  use a module. If you need
 // multiples of something (players!), create them with factories.

// Function that plays a round of tic-tac-toe, running setup and looping until done
const playRound = () => {

}








// Game setup for testing
console.log(gameBoard.getBoard());
console.log(gameBoard);
gameBoard.getBoard();

const myPlayer1 = playerFactory("Joe", "X");
console.log(myPlayer1.getName());
console.log(myPlayer1.isBot());
console.log(myPlayer1);

const myPlayer2 = playerFactory("Jeb", "O");
console.log(myPlayer2.getName());
console.log(myPlayer2.isBot());
console.log(myPlayer2);

const newGame = Game(myPlayer1, myPlayer2, gameBoard)

// newGame.board.playMove(myPlayer1, 0);
// newGame.board.playMove(myPlayer1, 1);
// newGame.board.playMove(myPlayer2, 4);
// newGame.board.playMove(myPlayer2, 6);

console.log(gameBoard.getBoard());
// displayController.renderBoard(newGame);

// On load enter in with welcome.
document.onload = displayController.renderWelcome()
