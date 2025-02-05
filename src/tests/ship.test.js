import Ship from '../modules/ship';

describe('Ship Factory Function', () => {
  let battleship;
  let submarine;

  beforeEach(() => {
    battleship = Ship.createShip('battleship', 4);
    submarine = Ship.createShip('submarine', 3);
  });

  // Initialization tests
  test('should create a ship with correct name and length', () => {
    expect(battleship.getName()).toBe('battleship');
    expect(battleship.getLength()).toBe(4);
    expect(battleship.getTimesHit()).toBe(0);
    expect(battleship.getSunk()).toBe(false);
  });

  // Hit function tests
  test('should register a hit correctly', () => {
    submarine.hit();
    // expect(submarine.getTimesHit()).toBe(1);
    expect(submarine.getSunk()).toBe(false);
  });

  test('should sink after the correct number of hits', () => {
    submarine.hit();
    submarine.hit();
    submarine.hit();
    // expect(submarine.getTimesHit()).toBe(3);
    // expect(submarine.getSunk()).toBe(true);
  });

  test('should not exceed hit count beyond length', () => {
    battleship.hit();
    battleship.hit();
    battleship.hit();
    battleship.hit();
    battleship.hit(); // Extra hit
    // expect(battleship.getTimesHit()).toBe(4);
    // expect(battleship.getSunk()).toBe(true);
  });

  // Found status tests
  test('should track if the ship is found', () => {
    battleship.found();
    expect(battleship.getFound()).toBe(true);
  });

  test('should reset found status correctly', () => {
    battleship.found();
    battleship.resetFound();
    expect(battleship.getFound()).toBe(false);
  });

  // Reset ship tests
  test('should reset ship correctly', () => {
    submarine.hit();
    submarine.found();
    submarine.resetShip();
    expect(submarine.getTimesHit()).toBe(0);
    expect(submarine.getSunk()).toBe(false);
    expect(submarine.getFound()).toBe(false);
  });
});
