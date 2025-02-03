import Ship from './ship';

const GameBoard = (() => {
  const createBoard = (size = 10) => {
    const board = Array.from({ length: size }, () => Array(size).fill(null));
    const ships = [];
    const missedShots = [];

    // Place a ship at specified coordinates
    const placeShip = (shipName, shipLength, startX, startY, direction = 'horizontal') => {
      const ship = Ship.createShip(shipName, shipLength);

      // Check if placement is valid
      for (let i = 0; i < shipLength; i++) {
        const x = direction === 'horizontal' ? startX + i : startX;
        const y = direction === 'vertical' ? startY + i : startY;

        if (x >= size || y >= size || board[y][x]) return false; // Out of bounds or space taken
      }

      const shipCells = [];
      for (let i = 0; i < shipLength; i++) {
        const x = direction === 'horizontal' ? startX + i : startX;
        const y = direction === 'vertical' ? startY + i : startY;
        board[y][x] = ship;
        shipCells.push({ x, y, hit: false }); 
      }

      // Assign the calculated cells to the ship
      ship.setCells(shipCells);
      ships.push(ship);
      return true;
    };
    

      // Check if placement is valid
      const isValidPlacement = (length, x, y, direction) => {
        for (let i = 0; i < length; i++) {
          const newX = direction === 'horizontal' ? x + i : x;
          const newY = direction === 'vertical' ? y + i : y;
  
          // Check if within bounds
          if (newX >= 10 || newY >= 10) {
            return false;
          }
  
          // Check for overlapping ships
          if (board[newY][newX] !== null) {
            return false;
          }
        }
        return true;
      };

    // Receive attack on board
    const receiveAttack = (x, y) => {
      if (board[y][x]) {
        const ship = board[y][x];
        ship.hit(x, y); // Hit the ship
    
        if (ship.getSunk()) {
          return 'sunk';  // Return 'sunk' if the ship is fully hit
        }
    
        return 'hit'; // Otherwise, just return 'hit'
      } else {
        missedShots.push({ x, y });
        return 'miss';
      }
    };
    
  // Add a resetBoard method
  const resetBoard = () => {
    // Reset the board to null
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        board[y][x] = null;
      }
    }

   // Clear the ships array
   ships.length = 0;

   // ✅ Clear missed shots as well
   missedShots.length = 0;
  };
    

  const alreadyAttacked = (x, y) => {
    return board[y][x] === 'miss' || board[y][x] === 'hit';
  };
  
    // Check if all ships have been sunk
    const areAllShipsSunk = () => ships.every((ship) => ship.getSunk());

    // Get board state for testing/debugging
    const getBoard = () => board;
    
    const getMissedShots = () => missedShots;
    const getShips = () => ships;
    
    const isSunkShipAt = (x, y) => {
      const ship = board[y][x];
      if (ship) {
        return ship.getSunk(); // Check if the ship at the position is sunk
      }
      return false;
    };

    return {
      placeShip,
      isValidPlacement,
      receiveAttack,
      areAllShipsSunk,
      getBoard,
      getMissedShots,
      resetBoard,
      getShips,
      alreadyAttacked,
      isSunkShipAt,
    };
  };

  return { createBoard };
})();

export default GameBoard;
