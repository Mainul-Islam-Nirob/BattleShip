const Ship = (() => {
    const createShip = (shipName, shipLength) => {
      const name = shipName;
      const length = shipLength;
      let timesHit = 0;
      let isSunk = false;
      let isFound = false;
  
      // GETTERS
      const getName = () => name;
      const getLength = () => length;
      const getTimesHit = () => timesHit;
      const getSunk = () => isSunk;
      const getFound = () => isFound;
  
      // SHIP STATE MODIFIERS
      const hit = () => {
        if (timesHit < length) {
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
      };
  
      return {
        getName,
        getLength,
        getTimesHit,
        getSunk,
        getFound,
        hit,
        found,
        resetFound,
        resetShip,
      };
    };
  
    return { createShip };
  })();
  
  export default Ship;
  