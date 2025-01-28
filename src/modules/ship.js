const Ship = (() => {
    const createShip = (shipName, shipLength) => {
      const name = shipName;
      const length = shipLength;
      let timesHit = 0;
      let isSunk = false;
      let isFound = false;
      let cells = [];
  
      // GETTERS
      const getName = () => name;
      const getLength = () => length;
      const getTimesHit = () => timesHit;
      const getSunk = () => isSunk;
      const getFound = () => isFound;
      const getCells = () => cells;
  
    const getDamage = (x, y) => {
      const cell = cells.find(cell => cell.x === x && cell.y === y);
      return cell ? cell.hit : false;  // Check if this cell has been hit    }
    }

  // SHIP STATE MODIFIERS
  const hit = (x, y) => {
    const cell = cells.find(cell => cell.x === x && cell.y === y); // Find the cell being hit
    if (cell && !cell.hit) {
      cell.hit = true; // Mark the specific cell as hit
      timesHit++;
      if (timesHit === length) {
        isSunk = true;
      }
    }
  };
  
      const found = () => {
        isFound = true;
      };
  
      const resetFound = () => {
        isFound = false;
      };
  
      const resetShip = () => {
        timesHit = 0;
      isSunk = false;
      isFound = false;
      cells.forEach(cell => cell.hit = false); // Reset hit state for each cell
      };

       // Set the coordinates of the ship (to be used when placing the ship on the board)
      const setCells = (coordinates) => {
        cells = coordinates; // Set coordinates once the ship is placed
      };
  
      return {
        getName,
        getLength,
        getTimesHit,
        getSunk,
        getFound,
        getCells,
        getDamage,
        hit,
        found,
        resetFound,
        resetShip,
        setCells,
      };
    };
  
    return { createShip };
  })();
  
  export default Ship;
  