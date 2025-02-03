import './styles.css';
import GameController from './modules/gameController';
document.getElementById('start-game-btn').addEventListener('click', function () {
  document.getElementById('placement-screen').style.display = 'none';
  document.getElementById('game-screen').style.display = 'block';
});