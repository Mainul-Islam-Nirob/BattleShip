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

    // Receive attack on board
    const receiveAttack = (x, y) => {
      if (board[y][x]) {
        board[y][x].hit(x, y);
        return 'hit';
      } else {
        missedShots.push({ x, y });
        return 'miss';
      }
    };

    // Check if all ships have been sunk
    const areAllShipsSunk = () => ships.every((ship) => ship.getSunk());

    // Get board state for testing/debugging
    const getBoard = () => board;
    const getMissedShots = () => missedShots;

    return {
      placeShip,
      receiveAttack,
      areAllShipsSunk,
      getBoard,
      getMissedShots,
    };
  };

  return { createBoard };
})();

export default GameBoard;
