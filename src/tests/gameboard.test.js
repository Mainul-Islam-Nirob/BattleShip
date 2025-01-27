import Gameboard from '../modules/gameboard';
import Ship from '../modules/ship';

describe('Gameboard Factory', () => {
  let board;

  beforeEach(() => {
    board = Gameboard.createBoard();
  });

  // Ship placement tests
  test('should place a ship horizontally without overlapping', () => {
    expect(board.placeShip('destroyer', 3, 2, 3, 'horizontal')).toBe(true);
    expect(board.getBoard()[3][2]).not.toBe(null);
    expect(board.getBoard()[3][3]).not.toBe(null);
    expect(board.getBoard()[3][4]).not.toBe(null);
  });

  test('should place a ship vertically without overlapping', () => {
    expect(board.placeShip('submarine', 2, 1, 1, 'vertical')).toBe(true);
    expect(board.getBoard()[1][1]).not.toBe(null);
    expect(board.getBoard()[2][1]).not.toBe(null);
  });

  test('should not place a ship if out of bounds', () => {
    expect(board.placeShip('carrier', 5, 8, 8, 'horizontal')).toBe(false);
  });

  test('should not place overlapping ships', () => {
    board.placeShip('cruiser', 3, 4, 4, 'horizontal');
    expect(board.placeShip('battleship', 4, 5, 4, 'horizontal')).toBe(false);
  });

  // Attack tests
  test('should register a hit when attacking a ship', () => {
    board.placeShip('battleship', 4, 2, 2, 'horizontal');
    expect(board.receiveAttack(2, 2)).toBe('hit');
    expect(board.receiveAttack(3, 2)).toBe('hit');
  });

  test('should register a miss when attacking empty space', () => {
    expect(board.receiveAttack(0, 0)).toBe('miss');
    expect(board.getMissedShots()).toContainEqual({ x: 0, y: 0 });
  });

  test('should record missed shots correctly', () => {
    board.receiveAttack(5, 5);
    board.receiveAttack(6, 6);
    expect(board.getMissedShots()).toContainEqual({ x: 5, y: 5 });
    expect(board.getMissedShots()).toContainEqual({ x: 6, y: 6 });
  });

  // Game end condition tests
  test('should report when all ships are sunk', () => {
    board.placeShip('destroyer', 2, 1, 1, 'horizontal');
    board.receiveAttack(1, 1);
    board.receiveAttack(2, 1);
    expect(board.areAllShipsSunk()).toBe(true);
  });

  test('should report false if not all ships are sunk', () => {
    board.placeShip('cruiser', 3, 4, 4, 'horizontal');
    board.receiveAttack(4, 4);
    expect(board.areAllShipsSunk()).toBe(false);
  });
});
