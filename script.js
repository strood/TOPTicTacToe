// ========== Javascript Tic-Tac-Toe ===============

//  GOAL IS TO HAVE AS LITTLE GLOBAL CODE AS POSSIBLE
// Try tucking everything away inside of a module or factory.
// Rule of thumb: if you only ever need ONE of something (gameBoard, displayController),
//  use a module. If you need multiples of something (players!), create them with factories.

// --------------Models------------------------

// ========== Players ============
// Players will be stored in objects
const playerFactory = (name, token, ai) => {
  // Default to human player, AI if checked at player select
  let bot = ai || false;
  const getName = () => name;
  const getToken = () => token;
  const isBot = () => bot;

  return {
    getName,
    getToken,
    isBot
  }
}


// =========== Game ==============
// Object to hold game details
const Game = (player1, player2) => {
  // Returns a new game object to be played with given chars and new board
  // will setup and hold current player

  // Randomly choose who goes first
  let currentPlayer = [player1, player2][Math.floor(Math.random() * 2)];

  return {
    player1,
    player2,
    currentPlayer
  }

}

// ========== Board =====================
//  Gameboard holds the board as an array, and functions to interact with board
// Built as a module (Revealing module pattern)
const gameBoard = (() => {
  // Default board on setup, false status signifying incomplete game, winner defaulted
  const board = Array(9).fill("");

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
    if (_playerWin(board)) {
      // Board has been won
      return true;
    } else if (!board.includes("")) {
      // Board is full
      return undefined;
    } else {
      // No winner or draw, continue play
      return false;
    }
  }

  // Reset the board to its blank form
  const resetBoard = () => {
    board.forEach((item, i) => {
      board[i] = "";
    });

  }

  // Check if a player has won the board
  const _playerWin = (board) => {
    // If any wins, return true, else false
    if (_horizontalWin(board) || _verticalWin(board) || _diagonalWin(board)) {
      return true
    } else {
      return false
    }
  }

  const _horizontalWin = (board) => {
    // Return true if any horizontal slize all equal to x or o, else false
    if (board.slice(0, 3).every((spot) => spot === "X") || board.slice(0, 3).every((spot) => spot === "O")) {
      return true;
    } else if (board.slice(3, 6).every((spot) => spot === "X") || board.slice(3, 6).every((spot) => spot === "O")) {
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
    getBoard: getBoard,
    playMove: playMove,
    checkBoard: checkBoard,
    resetBoard: resetBoard,
  };
})();


// ------- Display Controller -----------

// Function to render contents of gameboard array to page
const displayController = ((game) => {
  // Listed in order of appearance.

  // Render initial welcome screen
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
    body.appendChild(titleDiv);

    // Add element with one time event listener on html
    let html = document.querySelector('html');
    let setupFunct = () => {
      body.removeChild(titleDiv);
      html.removeEventListener('click', setupFunct);
      _renderPlayerSelection();
    }
    html.addEventListener('click', setupFunct);

  }

  const _renderPlayerSelection = () => {
    // Grab doc body
    let body = document.querySelector('body');

    // Container for player selection
    let selectBox = document.createElement('div');
    selectBox.setAttribute('class', 'selectBox');
    let selectTitle = document.createElement('h1');
    selectTitle.textContent = "Player Names"

    // Container for player 1
    let p1Box = document.createElement('div');
    p1Box.setAttribute('class', 'playerBox');

    // Container for player 2
    let p2Box = document.createElement('div');
    p2Box.setAttribute('class', 'playerBox');

    // P1 container elements
    const p1NameInput = document.createElement('input');
    p1NameInput.setAttribute('class', 'nameInput');
    p1NameInput.setAttribute('data-player', '1');
    p1NameInput.type = "name";
    p1NameInput.maxLength = 15;
    let p1AiInput = document.createElement('input');
    p1AiInput.type = "checkbox";
    let p1NameLabel = document.createElement('label');
    p1NameLabel.textContent = "Player 1:"
    let p1AiLabel = document.createElement('label');
    p1AiLabel.textContent = "- AI?"

    // P2 container elements
    const p2NameInput = document.createElement('input');
    p2NameInput.setAttribute('class', 'nameInput');
    p2NameInput.setAttribute('data-player', '2');
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

    // Function to setup and start a new game from our start game button
    let startGameFunct = () => {
      // Create players from info on page, then remove playerSelect
      let player1 = playerFactory(p1NameInput.value, "X", (p1AiInput.checked) ? true : false);
      let player2 = playerFactory(p2NameInput.value, "O", (p2AiInput.checked) ? true : false);

      // Clear page
      body.removeChild(selectBox);

      // Pass new game to board render
      let game = Game(player1, player2)
      _renderBoard(game);
    }
    // Add the above function to our start game button
    nameButton.addEventListener('click', startGameFunct)

    // Add P1 elements to container
    p1Box.appendChild(p1NameInput);
    p1Box.insertBefore(p1NameLabel, p1NameInput);
    p1NameInput.insertAdjacentElement("afterend", p1AiInput);
    p1AiInput.insertAdjacentElement("beforebegin", p1AiLabel);

    // Add P2 elements to container
    p2Box.appendChild(p2NameInput);
    p2Box.insertBefore(p2NameLabel, p2NameInput);
    p2NameInput.insertAdjacentElement("afterend", p2AiInput);
    p2AiInput.insertAdjacentElement("beforebegin", p2AiLabel);

    // Add the containers and title to base container
    selectBox.appendChild(selectTitle);
    selectBox.appendChild(p1Box);
    selectBox.appendChild(p2Box);
    selectBox.appendChild(nameButton);

    // Add our player select to the body
    body.insertBefore(selectBox, body.children[0]);
  }


  // render board in board display area
  const _renderBoard = (game) => {
    // Build boardBox and add to body
    let boardBox = document.createElement("div");
    boardBox.setAttribute('class', 'boardBox');
    let body = document.querySelector('body');
    body.insertAdjacentElement("afterbegin", boardBox);

    // Render the players div above board.
    _renderPlayers(game);

    // Loop through our boards array and set up spots accordingly
    // Go backwards so we can push appends out to end
    // Set count for data-keys
    let i = -1;

    for (let position of gameBoard.getBoard()) {
      // Increment count to set as data key for each spot
      i++
      if (position == "X") {
        let block = document.createElement('div');
        block.setAttribute("class", "spot");
        block.setAttribute("data-num", `${i}`);
        block.textContent = "X";
        boardBox.appendChild(block);
      } else if (position == "O") {
        let block = document.createElement('div');
        block.setAttribute("class", "spot");
        block.setAttribute("data-num", `${i}`);
        block.textContent = "O";
        boardBox.appendChild(block);
      } else {
        // Setup blank spot
        let block = document.createElement('div');
        block.setAttribute("class", "spot");
        // Add listener to blank spots to await clicks on turn
        block.addEventListener('click', (e) => {
          let dataNum = e.srcElement.getAttribute("data-num")
          if (gameBoard.playMove(game.currentPlayer, dataNum)) {
            // If move works, swap player and re-render spot
            let spot = document.querySelectorAll(`[data-num="${dataNum}"]`);
            spot.textContent = game.currentPlayer.getToken
            // Swap current player
            if (game.currentPlayer == game.player1) {
              game.currentPlayer = game.player2;
              reRenderBoard(game);
            } else {
              game.currentPlayer = game.player1;
              reRenderBoard(game);
            }
          } else {
            console.log("Invalid move");
          }
        })
        block.setAttribute("data-num", `${i}`);
        boardBox.appendChild(block);
      }
    }

    // Make vcomputer make first move if up
    if (game.currentPlayer.isBot()) {
      aiLogic.playMove(game);
    }

  };

  const reRenderBoard = (game) => {
    // Grab board and turn divs to change
    let boardBox = document.querySelector(".boardBox");
    let turnDiv = document.getElementById('turnDiv');

    // Clean turndiv
    turnDiv.lastChild.remove();
    turnDiv.lastChild.remove();

    // change info in turn div to point to correct player
    _renderTurn(game, turnDiv);
    for (let child of boardBox.children) {
      if (child.textContent === gameBoard.getBoard()[child.getAttribute("data-num")]) {
        // Leave it as is if exact same
      } else {
        // Update text if its been changed by the recent move
        child.textContent = gameBoard.getBoard()[child.getAttribute("data-num")]
      }
    }

    // Check if game has been won, if so _renderResults
    let boardStatus = gameBoard.checkBoard();
    // Check board to see if its been won, or filled, render if so
    if (boardStatus == true) {
      _renderResults(game, 'win');
    } else if (boardStatus == undefined) {
      _renderResults(game, 'tie');
    }

    // Check if current player is ai, if so make ai decide move and play it
    if (game.currentPlayer.isBot()) {
      aiLogic.playMove(game);
    }
  }

  // Render the player info sections during game
  const _renderPlayers = (game) => {
    // Grab board and body
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
    _renderTurn(game, turnDiv);

    // Player Div construction

    // Add our player divs and turn div to our parent player display
    pDiv.appendChild(p1Div);
    pDiv.appendChild(turnDiv);
    pDiv.appendChild(p2Div);

    // Add out player display before our board
    boardBox.insertAdjacentElement("beforebegin", pDiv)
  }

  const _renderTurn = (game, turnDiv) => {
    // Setup new elements
    let turnText = document.createElement('p');
    turnText.textContent = 'Your Turn';
    // append new elements
    turnDiv.appendChild(turnText);
    let arrow = document.createElement('i');

    if (game.currentPlayer == game.player1) {
      arrow.setAttribute('class', 'fas fa-arrow-left');
      turnText.insertAdjacentElement("afterend", arrow);
    } else {
      arrow.setAttribute('class', 'fas fa-arrow-right');
      turnText.insertAdjacentElement("afterend", arrow);
    }
  }

  // Render results screen when game complete
  const _renderResults = (game, status) => {
    // Clear board and players from screen, grab body
    let body = document.querySelector('body');
    let pDiv = document.querySelector('.pDiv');
    let boardBox = document.querySelector('.boardBox');

    pDiv.remove();
    boardBox.remove();

    // Setup results screen
    let resultDiv = document.createElement('div');
    resultDiv.setAttribute('class', 'resultDiv');
    let resultTitle = document.createElement('h1');

    // Setup title text based on outcome.
    if (status == 'win') {
      // Current player is winner, render a winner screen with our options to restart
      console.log('Render a winner')
      if (game.currentPlayer == game.player1) {
        resultTitle.textContent = `${game.player2.getName()} wins!`;
      } else {
        resultTitle.textContent = `${game.player1.getName()} wins!`;
      }
    } else {
      // Tie game, render a draw screen with our options to restart
      console.log('Render a draw')
      resultTitle.textContent = "Draw!";
    }

    // add title, and buttons to provide options
    resultDiv.appendChild(resultTitle);

    // Make Buttons w/ options on click
    // Play again button
    let playButton = document.createElement('button');
    playButton.textContent = '- Play Again -';
    playButton.addEventListener('click', (e) => {
      gameBoard.resetBoard();
      resultDiv.remove();
      _renderBoard(game);
    })
    // Select new players button
    let playerButton = document.createElement('button');
    playerButton.textContent = '- New Players -';
    playerButton.addEventListener('click', (e) => {
      gameBoard.resetBoard();
      resultDiv.remove();
      _renderPlayerSelection();
    })

    // Append buttons to div
    resultDiv.appendChild(playButton);
    resultDiv.appendChild(playerButton);

    // Append div to body
    body.appendChild(resultDiv);
  }

  // Expose public functions
  return {
    renderWelcome,
    reRenderBoard,
  };
})();

// Logic for bot player
const aiLogic = (() => {

  // Play move given board
  const playMove = (game) => {
    // Check to see best move given board
    let move = _bestMove(game);
    let player = game.currentPlayer;
    console.log("Im going to play my best move!")
    // Play move based on results of best move
    console.log(`my move index: ${move}`);
    if (gameBoard.playMove(player, move)) {
      // Once move made, swap player and re-render spot
      console.log("I did it!")
      let spot = document.querySelectorAll(`[data-num="${move}"]`);
      spot.textContent = player.getToken
      // Swap current player
      if (player == game.player1) {
        game.currentPlayer = game.player2;
        displayController.reRenderBoard(game);
      } else {
        game.currentPlayer = game.player1;
        displayController.reRenderBoard(game);
      }
    }
  }

  // Minimax function to calculate best move given board.
  const _minimax = (newBoard, player, game) => {

    // Establish who is the current player so we know who to optimize for
    switch (player) {
      case game.player1:
        enemy = game.player2;
        break;
      case game.player2:
        enemy = game.player1;
        break;
    }

    // Return list of open spots by index based on current board.
    let availSpots = newBoard.map((num, index) => {
      if (num == "") {
        return index;
      }
    }).filter((a) => a != undefined);

    console.log(newBoard)
    // Check to see if current board is won by anyone, rate accordingly
    // This will be our return if we have hit terminal end case and need to rank
    // result. Collect these results for each avail spot and choose best
    if (_checkWin(newBoard, player.getToken())) {
      // Positive restult of cp winning, rate high
      return {
        score: 10
      };
    } else if (_checkWin(newBoard, enemy.getToken())) {
      // enemy win, rank low
      return {
        score: -10
      };
    } else if (availSpots.length === 0) {
      // No spots left, tie game, neutral rating
      return {
        score: 0
      };
    }

    // Collect the moves as objects, includes index and score
    let moves = [];
    for (let i = 0; i < availSpots.length; i++) {
      let move = {};
      move.index = availSpots[i];

      newBoard[availSpots[i]] = player.getToken();

      if (player == game.player1) {
        let result = _minimax(newBoard, game.player2, game);
        move.score = result.score;
        console.log(`Move index: ${move.index}`)
        console.log(`Move score: ${move.score}`)

      } else {
        let result = _minimax(newBoard, game.player1, game);
        move.score = result.score;
        console.log(`Move index: ${move.index}`)
        console.log(`Move score: ${move.score}`)

      }

      newBoard[availSpots[i]] = "";
      moves.push(move);
    }

    // Evaluate best move from our moves array
    let bestMove;
    if (player == game.currentPlayer) {
      let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = 10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    console.log(`my moves: ${moves}`)


    return moves[bestMove];

  }

  // Calculate best move given board
  const _bestMove = (game) => {
    let currentBoard = gameBoard.getBoard();

    if (currentBoard.every((e) => e == "")) {
      // If board is empty, choose middle (All spots available)
      return 4;
    } else {
      // Check for optimum move here and return number at which to play
      // Currently just gets the next open spot and plays there
      // Utilizing MinMax fucntion here to get unbratable AI
      // get the index value of the object minimax returns(also includes winner)
      return _minimax(currentBoard, game.currentPlayer, game).index;
    };

  }

  // function to check if board has been won by player
  const _checkWin = (board, player) => {
    const winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2],
    ]

    // Find all indexes a player has played in to compare to winning combos
    let plays = board.reduce((a, e, i) =>
  		(e == player) ? a.concat(i) : a, []);
    let gameWon = null;

    // Has player played in every spot in the a wincombo element. if so, player
    // has won
    for (let [index, win] of winCombos.entries()) {
      if (win.every(elem => plays.indexOf(elem) > -1)) {
        // If so return winning player and index
        gameWon = {
          index: index,
          player: player
        };
        console.log(gameWon.player)
        break;
      }
    }

    // If no winner, null return, else return player
    return gameWon;
  }

  // Expose public functions
  return {
    playMove: playMove,
  }

})();



// Render welcome screen on load
document.onload = displayController.renderWelcome();
