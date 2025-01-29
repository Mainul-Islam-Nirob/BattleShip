import Player from './player';
import DOM from './DOM';

const GameController = (() => {
  let player;
  let computer;
  let currentPlayer;

  const initGame = () => {
    // Create player and computer
    player = Player.createPlayer('Player');
    computer = Player.createPlayer('Computer', true);

    // Randomly place ships for computer
    placeShips(computer);

    // Add random placement button for the player
    addRandomPlacementButton();

    currentPlayer = player;

    // Initial render of the boards
    DOM.renderBoard(player.getBoard(), 'player-board');
    DOM.renderBoard(computer.getBoard(), 'computer-board', true);

    DOM.updateMessage("Player's turn");

    // Add event listeners after a short delay to ensure DOM is ready
    setTimeout(addEventListeners, 100);
  };

  const generateRandomPosition = (board, shipLength) => {
    let isValid = false;
    let direction, x, y;
  
    while (!isValid) {
      direction = Math.random() < 0.5 ? 'horizontal' : 'vertical'; // Random direction
      x = Math.floor(Math.random() * (direction === 'horizontal' ? 10 - shipLength : 10)); // Random x
      y = Math.floor(Math.random() * (direction === 'vertical' ? 10 - shipLength : 10)); // Random y
  
      // Check if the ship overlaps with any existing ships
      isValid = board.isValidPlacement(shipLength, x, y, direction);
    }
  
    return { x, y, direction };
  };

  const placeShips = (player) => {
    const ships = [
      { name: 'Destroyer', length: 2 },
      { name: 'Submarine', length: 3 },
      { name: 'Cruiser', length: 3 },
      { name: 'Battleship', length: 4 },
      { name: 'Carrier', length: 5 },
    ];

    ships.forEach((ship) => {
      const { x, y, direction } = generateRandomPosition(player.getBoard(), ship.length);
      player.getBoard().placeShip(ship.name, ship.length, x, y, direction);
    });
  };

  const addRandomPlacementButton = () => {
    const button = document.createElement('button');
    button.textContent = 'Place Ships Randomly';

    button.addEventListener('click', () => {
      resetGame(); // Reset the game state

      // Place ships randomly on both boards
      placeShips(player);
      placeShips(computer);

      // Reset turn to player
      currentPlayer = player;

      DOM.renderBoard(player.getBoard(), 'player-board');
      DOM.renderBoard(computer.getBoard(), 'computer-board', true); 
      
      DOM.updateMessage('Ships have been placed randomly! Game starts now!');
      addEventListeners();
    });
  
    document.body.appendChild(button);
  };
  

  const addEventListeners = () => {
    const computerCells = document.querySelectorAll('#computer-board .enemy-cell');
    computerCells.forEach((cell) => {
      cell.addEventListener('click', handlePlayerAttack);
    });
  };

  const handlePlayerAttack = (e) => {
    if (currentPlayer !== player) return; // Ensure it's the player's turn
    
    // Check if all ships are placed before allowing the attack
    if (player.getBoard().getShips().length === 0) {
      DOM.updateMessage('You must place all your ships before starting!');
      return;
    }

    const x = parseInt(e.target.dataset.x, 10);
    const y = parseInt(e.target.dataset.y, 10);

    const attackResult = player.attack(computer.getBoard(), x, y);

      if (attackResult === 'hit') {
        DOM.updateMessage('You hit a ship!');
        DOM.renderBoard(computer.getBoard(), 'computer-board', true); //*** */
        addEventListeners(); // Reattach event listeners to the re-rendered board

        if (computer.getBoard().areAllShipsSunk()) {
          DOM.updateMessage('Player wins! 🎉');
          endGame();
          return;
      }

      // Allow the player to attack again if it's a hit
      return;
    }else if (attackResult === 'miss') {
        DOM.updateMessage('You missed!');
      } else {
        DOM.updateMessage('You already attacked this spot!');
        return;
      }

      DOM.renderBoard(computer.getBoard(), 'computer-board', true);

      // Pass turn to computer
      currentPlayer = computer;
      setTimeout(computerTurn, 1000); // Delay computer's turn for better UX
    };



  const computerTurn = () => {
    DOM.updateMessage("Computer's turn...");

    setTimeout(() => {
      let attackResult;

      do {
        attackResult = computer.randomAttack(player.getBoard());
      } while (attackResult === 'already attacked');

      DOM.renderBoard(player.getBoard(), 'player-board');

      if (attackResult === 'hit') {
        DOM.updateMessage('Computer hit your ship!');

        if (player.getBoard().areAllShipsSunk()) {
          DOM.updateMessage('Computer wins! 💻');
          endGame();
          return;
        }

        // Allow the computer to attack again if it's a hit
        setTimeout(computerTurn, 1000); // Delay for better UX
        return;
      } else {
        DOM.updateMessage('Computer missed!');
      }

      currentPlayer = player;
      DOM.updateMessage("Player's turn");

      // Re-enable event listeners for player's turn
      addEventListeners();
    }, 1000); // Simulate computer "thinking" time
  };

  const endGame = () => {
    const computerCells = document.querySelectorAll('#computer-board .enemy-cell');
    computerCells.forEach((cell) => {
      cell.removeEventListener('click', handlePlayerAttack);
    });

    // Add a "Restart Game" button
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart Game';
    restartButton.addEventListener('click', () => {
      document.location.reload(); // Reload the page to restart the game
    });

    document.body.appendChild(restartButton);
  };

  const resetGame = () => {
    // Reset player and computer boards
    player.getBoard().resetBoard();
    computer.getBoard().resetBoard();
  
    // Reset turn to player
    currentPlayer = player;
  
    // Clear all event listeners and reinitialize them
    const computerCells = document.querySelectorAll('#computer-board .enemy-cell');
    computerCells.forEach((cell) => {
      const newCell = cell.cloneNode(true);
      cell.parentNode.replaceChild(newCell, cell);
    });
  

      // ✅ Reset the UI (clear styles for missed shots)
      // const allCells = document.querySelectorAll('.cell');
      // allCells.forEach(cell => {
      //     cell.classList.remove('hit', 'miss', 'damaged'); // Remove any hit or miss styling
      // });
  
  
    // Re-render boards
    DOM.renderBoard(player.getBoard(), 'player-board');
    DOM.renderBoard(computer.getBoard(), 'computer-board', true);
  
    // Update message
    DOM.updateMessage('Game reset! Place your ships or click "Place Ships Randomly" to start.');

    addEventListeners();

  };
  

  // Expose internal state and methods for testing
  return {
    initGame,
    getPlayer: () => player,
    getComputer: () => computer,
    getCurrentPlayer: () => currentPlayer,
    handlePlayerAttack,
    computerTurn,
    resetGame,
  };
})();

export default GameController;