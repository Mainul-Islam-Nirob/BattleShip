import './styles.css';
import GameController from './modules/gameController';
import DOM from './modules/DOM';
import Player from "./modules/player";

const player = Player.createPlayer('Player');
// const computer = Player.createPlayer('Computer');

DOM.renderBoard(player.getBoard(), 'placement-board');
document.getElementById('start-game-btn').disabled = true;

document.getElementById('shuffle-btn').addEventListener('click', () => {
    GameController.placeShips(player);
    // GameController.placeShips(computer);

    // Render the boards after ships have been placed
    DOM.renderBoard(player.getBoard(), 'placement-board');
    // DOM.renderBoard(computer.getBoard(), 'computer-board', true);

    //enable this button after placing ships
    document.getElementById('start-game-btn').disabled  = false;
})

document.getElementById('start-game-btn').addEventListener('click', () => {
    document.getElementById('placement-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    GameController.initGame();
});
