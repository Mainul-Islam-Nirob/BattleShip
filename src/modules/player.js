import GameBoard from './gameBoard';

const Player = (() => {
  const createPlayer = (name, isComputer = false, boardSize = 10) => {
    const playerName = name;
    const isAI = isComputer;
    const gameBoard = GameBoard.createBoard(boardSize);
    const attackHistory = new Set(); // Store attacks to prevent duplicates

    // Attack opponent's board
    const attack = (opponentBoard, x, y) => {
      console.log("attaking at", x, y)
      if (attackHistory.has(`${x},${y}`)) {
        return 'already attacked';
      }
      attackHistory.add(`${x},${y}`);
      return opponentBoard.receiveAttack(x, y);
    };

    // Random AI attack logic
    const randomAttack = (opponentBoard) => {
      let x, y;
      do {
        x = Math.floor(Math.random() * boardSize);
        y = Math.floor(Math.random() * boardSize);
      } while (attackHistory.has(`${x},${y}`));

      return attack(opponentBoard, x, y);
    };

    const getName = () => playerName;
    const getBoard = () => gameBoard;
    const isComputerPlayer = () => isAI;
    const getAttackHistory = () => [...attackHistory];  


    return {
      getName,
      getBoard,
      attack,
      randomAttack,
      isComputerPlayer,
      getAttackHistory,  
    };
  };

  return { createPlayer };
})();

export default Player;
