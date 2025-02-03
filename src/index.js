import './styles.css';
import GameController from './modules/gameController';

document.getElementById('start-game-btn').addEventListener('click', () => {
    document.getElementById('placement-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    GameController.initGame();
  });
  