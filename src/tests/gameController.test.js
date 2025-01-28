import '@testing-library/jest-dom';
import GameController from '../modules/gameController';
import Player from '../modules/player';
import DOM from '../modules/DOM';

// Mock DOM module
jest.mock('../modules/DOM', () => ({
  renderBoard: jest.fn(),
  updateMessage: jest.fn(),
}));

describe('GameController', () => {
  let controller;

  beforeEach(() => {
    // Initialize the game
    controller = GameController;
    controller.initGame();
  });

  test('should initialize the game with player and computer', () => {
    const player = controller.getPlayer();
    const computer = controller.getComputer();

    expect(player.getName()).toBe('Player');
    expect(computer.getName()).toBe('Computer');
    expect(controller.getCurrentPlayer()).toBe(player);
  });

  test('should place predefined ships on player and computer boards', () => {
    const playerBoard = controller.getPlayer().getBoard().getBoard();
    const computerBoard = controller.getComputer().getBoard().getBoard();

    // Check if ships are placed on the player's board
    expect(playerBoard[0][0]).toBeDefined(); // Destroyer at (0, 0)
    expect(playerBoard[2][2]).toBeDefined(); // Submarine at (2, 2)

    // Check if ships are placed on the computer's board
    expect(computerBoard[1][1]).toBeDefined(); // Destroyer at (1, 1)
    expect(computerBoard[4][3]).toBeDefined(); // Submarine at (4, 3)
  });

  // test('should handle player attack on computer board', () => {
  //   const player = controller.getPlayer();
  //   const computerBoard = controller.getComputer().getBoard();

  //   // Simulate player attack at (0, 0)
  //   const attackResult = player.attack(computerBoard, 0, 0);

  //   expect(attackResult).toBe('hit'); // Assuming (0, 0) is a hit
  //   expect(DOM.updateMessage).toHaveBeenCalledWith('You hit a ship!');
  //   expect(DOM.renderBoard).toHaveBeenCalledWith(computerBoard, 'computer-board', true);
  // });

  test('should allow computer to attack player board', () => {
    const computer = controller.getComputer();
    const playerBoard = controller.getPlayer().getBoard();

    // Simulate computer's turn
    controller.computerTurn();

    expect(DOM.updateMessage).toHaveBeenCalledWith("Computer's turn...");
    expect(DOM.renderBoard).toHaveBeenCalledWith(playerBoard, 'player-board');
  });
});
