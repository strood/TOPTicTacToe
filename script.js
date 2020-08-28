// ========== Javascript Tic-Tac-Toe ===============


// ========== Players ============
// Players will be stored in objects
const playerFactory = (name, token, ai) => {
  // Check if human, will setup differently if AI
  let bot = ai || false;
  const getName = () => name;
  const getToken = () => token;
  const isBot = () => bot;

  return {getName, getToken, isBot}
}


// =========== Game ==============
// Object to hold game details
const Game = (player1, player2, board) => {
  // Returns  a new game object to be played with given chars and new board
  // Result will be false to start, change to winner/ tie based on outcome
  let result = false;
  // Randomly choose who goes first
  let currentPlayer = [player1, player2][Math.floor(Math.random() * 2)];
  return { player1, player2, board, result, currentPlayer}
}


// ========== Board =====================
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
  const checkBoard = () => {
    console.log(board.slice(0,3).all)
    if (!board.includes("")) {
      console.log("Board is full")
    } else if (_playerWin(board)) {
      console.log("Winner!")
    } else {
      console.log("play-On!")
    }
  }

  const _playerWin = (board) => {
    // If any wins, return true, else false
    if (_horizontalWin(board) || _verticalWin(board) || _diagonalWin(board)) {
      console.log("Player won!")
      return true
    } else {
      return false
    }
  }

  const _horizontalWin = (board) => {
    // Return true if any horizontal slize all equal to x or o, else false
    if (board.slice(0,3).every((spot) => spot === "X") || board.slice(0,3).every((spot) => spot === "O")) {
      return true;
    } else if (board.slice(3,6).every((spot) => spot === "X") || board.slice(3,6).every((spot) => spot === "O")) {
      return true;
    } else if (board.slice(6).every((spot) => spot === "X") || board.slice(6).every((spot) => spot === "O")) {
      return true;
    } else {
      return false;

    }
  }
  const _verticalWin = (board) => {
    // return true if any vertical chunk all equal X or O, else false
    if (board[0] === board[3] && board[0] === board[6] && (board[0] === "O" || board[0] === "X")) {
      return true;
    } else if (board[1] === board[4] && board[1] === board[7] && (board[1] === "O" || board[1] === "X")) {
      return true;
    } else if (board[2] === board[5] && board[2] === board[8] && (board[2] === "O" || board[2] === "X")) {
      return true;
    } else {
      return false

    }
  }
  const _diagonalWin = (board) => {
    // return true if any horizontal chunk all equal X or O, else false
    if (board[0] === board[4] && board[0] === board[8] && (board[0] === "O" || board[0] === "X")) {
      return true;

    } else if (board[2] === board[4] && board[2] === board[6] && (board[2] === "O" || board[2] === "X")) {
      return true;

    } else {
      return false

    }
  }
  // Exposing our public functions
  return {
    getBoard:getBoard,
    playMove:playMove,
    checkBoard: checkBoard,
  };
})();


// ------- Display Controller -----------

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

    // Make Button
    let nameButton = document.createElement('button')
    nameButton.textContent = "- Play Game -"

    let startGameFunct = () => {

      // Create players from info on page, then remove playerSelect
      let player1 = playerFactory(p1NameInput.value, "X", (p1AiInput.checked) ? true : false);
      let player2 = playerFactory(p2NameInput.value, "O", (p2AiInput.checked) ? true : false);

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
    renderPlayers(game);
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
    let turnDiv = document.getElementById('turnDiv');
    turnDiv.lastChild.remove();
    turnDiv.firstChild.remove();
    renderTurn(game, turnDiv);
    for (let child of boardBox.children) {
        if (child.textContent === game.board.getBoard()[child.getAttribute("data-num")]) {
          // Leave it as is if exact same - could do an error or something here
        } else {
          // Update text if its been changed
          child.textContent = game.board.getBoard()[child.getAttribute("data-num")]
        }
    }
  }

  // Render the player info sections during game
  const renderPlayers = (game) => {

    let boardBox = document.querySelector('.boardBox');
    let body = document.querySelector('body');

    // Parent Holder div
    let pDiv = document.createElement('div');
    pDiv.setAttribute('class', 'pDiv');

    // Player 1
    let p1Div = document.createElement('div');
    let p1Name = document.createElement('h2');
    p1Name.textContent = `${game.player1.getName()}`;

    if (game.player1.isBot()) {
      // Append bot icon and style to fit on line
      let botIcon = document.createElement('i')
      let nameBox = document.createElement('div')
      botIcon.setAttribute('class', 'fas fa-robot');
      nameBox.appendChild(p1Name);
      p1Name.insertAdjacentElement("afterend", botIcon);
      p1Div.appendChild(nameBox);

    } else {
      // Just add name
      p1Div.appendChild(p1Name);
    }

    // Line Break
    p1Div.appendChild(document.createElement('hr'));

    // Add player icon
    let p1Icon = document.createElement('h2');
    p1Icon.textContent = `${game.player1.getToken()}`;
    p1Div.appendChild(p1Icon);


    // Player 2
    let p2Div = document.createElement('div');
    let p2Name = document.createElement('h2');
    p2Name.textContent = `${game.player2.getName()}`;

    if (game.player2.isBot()) {
      // Append bot icon and style to fit on line
      let botIcon = document.createElement('i')
      let nameBox = document.createElement('div')
      botIcon.setAttribute('class', 'fas fa-robot');
      nameBox.appendChild(p2Name);
      p2Name.insertAdjacentElement("afterend", botIcon);
      p2Div.appendChild(nameBox);

    } else {
      // Just add name
      p2Div.appendChild(p2Name);
    }

    // Line Break
    p2Div.appendChild(document.createElement('hr'));

    // Add player icon
    let p2Icon = document.createElement('h2');
    p2Icon.textContent = `${game.player2.getToken()}`;
    p2Div.appendChild(p2Icon);

    // =========================================================

    // Turn indicator
    let turnDiv = document.createElement('div');
    turnDiv.setAttribute('id', 'turnDiv');
    renderTurn(game, turnDiv);

    // Player Div construction

    // Add our player divs and turn div to our parent player display
    pDiv.appendChild(p1Div);
    pDiv.appendChild(turnDiv);
    pDiv.appendChild(p2Div);

    // Add out player display before our board
    boardBox.insertAdjacentElement("beforebegin", pDiv)
  }

  const renderTurn = (game, turnDiv) => {
    let turnText = document.createElement('p');
    turnText.textContent = 'Your Turn';

    console.log(`turn div:${turnDiv}`)
    console.log(`turn text:${turnText}`)

    turnDiv.appendChild(turnText);
    let arrow = document.createElement('i');
    if (game.currentPlayer == game.player1) {
      arrow.setAttribute('class', 'fas fa-arrow-left');
      turnText.insertAdjacentElement("beforebegin", arrow);
    } else {
      arrow.setAttribute('class', 'fas fa-arrow-right');
      turnText.insertAdjacentElement("afterend", arrow);
    }
  }

  // Expose public functions
  return {
    renderWelcome,
    // TODO: DETETE renderBoard qwhen not testing
    renderBoard,
  };
})();

//  GOAL IS TO HAVE AS LITTLE GLOBAL CODE AS POSSIBLE
// Try tucking everything away inside of a module or factory.
// Rule of thumb: if you only ever need ONE of something (gameBoard, displayController),
//  use a module. If you need
 // multiples of something (players!), create them with factories.

// Function that plays a round of tic-tac-toe, running setup and looping until done
const playRound = (game) => {

}


// Game setup for testing
console.log(gameBoard.getBoard());
console.log(gameBoard);
gameBoard.getBoard();

const myPlayer1 = playerFactory("Wilma", "X", true);
console.log(myPlayer1.getName());
console.log(myPlayer1.isBot());
console.log(myPlayer1);

const myPlayer2 = playerFactory("Kevin", "O");
console.log(myPlayer2.getName());
console.log(myPlayer2.isBot());
console.log(myPlayer2);

// const newGame = Game(myPlayer1, myPlayer2, gameBoard)

// newGame.board.playMove(myPlayer1, 0);
// newGame.board.playMove(myPlayer1, 1);
// newGame.board.playMove(myPlayer2, 4);
// newGame.board.playMove(myPlayer2, 6);

console.log(gameBoard.getBoard());
// displayController.renderBoard(newGame);

// On load enter in with welcome.
document.onload = displayController.renderWelcome();


// To Do:
//  1. Render turn indicator in player name div to show whos turn it is
//  2. Figure out how to run a game loop, rendering a Play Again button at the end
//     which will restart the loop at player select by re-rending that part (may need to expose
//     NOTE: randomize first player maybe so we dont always start same
//  3. Hook up board checking so as we play it will detect a win
//  3a. With that also need to display proper response based on winner.
//  4. Build AI logic
//  4a. Hook login into game loop if player isBot is true, (even allow AI v AI)
