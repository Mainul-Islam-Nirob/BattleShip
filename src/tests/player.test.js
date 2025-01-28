import Player from '../modules/player';
import Gameboard from '../modules/gameBoard';

describe('Player Factory', () => {
  let player1, player2, aiPlayer;

  beforeEach(() => {
    player1 = Player.createPlayer('Alice');
    player2 = Player.createPlayer('Bob');
    aiPlayer = Player.createPlayer('AI Bot', true);
  });

  // Player creation tests
  test('should create a player with a name and gameboard', () => {
    expect(player1.getName()).toBe('Alice');
    expect(player1.getBoard()).toBeDefined();
  });

  test('should identify AI player correctly', () => {
    expect(aiPlayer.isComputerPlayer()).toBe(true);
    expect(player1.isComputerPlayer()).toBe(false);
  });

  // Attack tests
  test('should allow a player to attack an opponent board', () => {
    player2.getBoard().placeShip('submarine', 3, 2, 2, 'horizontal');
    expect(player1.attack(player2.getBoard(), 2, 2)).toBe('hit');
    expect(player1.attack(player2.getBoard(), 5, 5)).toBe('miss');
  });

  test('should prevent attacking the same coordinate twice', () => {
    expect(player1.attack(player2.getBoard(), 3, 3)).toBe('miss');
    expect(player1.attack(player2.getBoard(), 3, 3)).toBe('already attacked');
  });

  // AI attack tests
  test('AI should attack random coordinates', () => {
    const result = aiPlayer.randomAttack(player1.getBoard());
    expect(['hit', 'miss']).toContain(result);
  });

  test('AI should not attack the same spot twice', () => {
    aiPlayer.randomAttack(player1.getBoard());
    aiPlayer.randomAttack(player1.getBoard());
    expect(aiPlayer.getAttackHistory().length).toBe(2);
  });
});
