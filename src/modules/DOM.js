const DOM = (() => {
    // Render the gameboard
    const renderBoard = (gameBoard, elementId, isEnemy = false, clickHandler = null) => {
      const boardElement = document.getElementById(elementId);
      boardElement.innerHTML = ''; // Clear the existing board
  
      const board = gameBoard.getBoard();
      const missedShots = gameBoard.getMissedShots();
  
      for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
          const cell = document.createElement('div');
          cell.classList.add('cell');
          cell.dataset.x = x;
          cell.dataset.y = y;
  
          // Add styles based on cell state
          if (board[y][x]?.getSunk()) {
            cell.classList.add('hit'); // Hit ship
          }else if (board[y][x] && board[y][x].getDamage(x, y)) {
            cell.classList.add('damaged'); // Shot ship (hit but not sunk)
          } else if (board[y][x]) {
            if (!isEnemy) cell.classList.add('ship'); // Show ships only for the player
          } else if (missedShots.some((shot) => shot.x === x && shot.y === y)) {
            cell.classList.add('miss'); // Missed shots
          }
  
          if (isEnemy) {
            cell.classList.add('enemy-cell'); // Add class for enemy board interactivity
            if (clickHandler) {
              cell.addEventListener('click', (e) => clickHandler(e, x, y)); // Attach event listener
            }
          }
  
          boardElement.appendChild(cell);
        }
      }
    };
  
    // Update the game message
    const updateMessage = (message) => {
      const messageElement = document.getElementById('game-message');
      messageElement.textContent = message;
    };
  
    return {
      renderBoard,
      updateMessage,
    };
  })();
  
  export default DOM;
  