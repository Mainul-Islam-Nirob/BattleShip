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

    // Predefined ship placements for player and computer
    placeShips(player);
    placeShips(computer);

    currentPlayer = player;

    // Initial render of the boards
    DOM.renderBoard(player.getBoard(), 'player-board');
    DOM.renderBoard(computer.getBoard(), 'computer-board', true);

    DOM.updateMessage("Player's turn");

    // Add event listeners after a short delay to ensure DOM is ready
    setTimeout(addEventListeners, 100);
  };

  const placeShips = (player) => {
    const ships = [
      { name: 'Destroyer', length: 2, x: 0, y: 0, direction: 'horizontal' },
      { name: 'Submarine', length: 3, x: 2, y: 2, direction: 'vertical' },
      { name: 'Cruiser', length: 3, x: 4, y: 4, direction: 'horizontal' },
      { name: 'Battleship', length: 4, x: 6, y: 6, direction: 'vertical' },
      { name: 'Carrier', length: 5, x: 5, y: 1, direction: 'horizontal' },
    ];

    ships.forEach((ship) => {
      player.getBoard().placeShip(ship.name, ship.length, ship.x, ship.y, ship.direction);
    });
  };

  const addEventListeners = () => {
    const computerCells = document.querySelectorAll('#computer-board .enemy-cell');
    computerCells.forEach((cell) => {
      cell.addEventListener('click', handlePlayerAttack);
    });
  };

  const handlePlayerAttack = (e) => {
    if (currentPlayer !== player) return; // Ensure it's the player's turn
    
    const x = parseInt(e.target.dataset.x, 10);
    const y = parseInt(e.target.dataset.y, 10);

    const attackResult = player.attack(computer.getBoard(), x, y);

      if (attackResult === 'hit') {
        DOM.updateMessage('You hit a ship!');
      } else if (attackResult === 'miss') {
        DOM.updateMessage('You missed!');
      } else {
        DOM.updateMessage('You already attacked this spot!');
        return;
      }

      DOM.renderBoard(computer.getBoard(), 'computer-board', true);

      if (computer.getBoard().areAllShipsSunk()) {
        DOM.updateMessage('Player wins! 🎉');
        endGame();
        return;
      }

      
    // Switch to computer's turn
      currentPlayer = computer;
      setTimeout(computerTurn, 1000); // Delay computer's turn for better UX
    }


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
      } else {
        DOM.updateMessage('Computer missed!');
      }

      if (player.getBoard().areAllShipsSunk()) {
        DOM.updateMessage('Computer wins! 💻');
        endGame();
        return;
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

  // Expose internal state and methods for testing
  return {
    initGame,
    getPlayer: () => player,
    getComputer: () => computer,
    getCurrentPlayer: () => currentPlayer,
    handlePlayerAttack,
    computerTurn,
  };
})();

export default GameController;