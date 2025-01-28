/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../../\u0000#\u0000#CSE FREE DEGREE\u0000#\u0000#/\u0000#All Projects/@TOP/19.Battleship/src/index.js":
/*!******************************************************************************************!*\
  !*** ../../../../ # #CSE FREE DEGREE # #/ #All Projects/@TOP/19.Battleship/src/index.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ \"../../../../\\u0000#\\u0000#CSE FREE DEGREE\\u0000#\\u0000#/\\u0000#All Projects/@TOP/19.Battleship/src/styles.css\");\n/* harmony import */ var _modules_gameController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/gameController */ \"../../../../\\u0000#\\u0000#CSE FREE DEGREE\\u0000#\\u0000#/\\u0000#All Projects/@TOP/19.Battleship/src/modules/gameController.js\");\n\n\n_modules_gameController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].initGame();\n\n//# sourceURL=webpack://battleship/../../../../%00#%00#CSE_FREE_DEGREE%00#%00#/%00#All_Projects/@TOP/19.Battleship/src/index.js?");

/***/ }),

/***/ "../../../../\u0000#\u0000#CSE FREE DEGREE\u0000#\u0000#/\u0000#All Projects/@TOP/19.Battleship/src/modules/DOM.js":
/*!************************************************************************************************!*\
  !*** ../../../../ # #CSE FREE DEGREE # #/ #All Projects/@TOP/19.Battleship/src/modules/DOM.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar DOM = function () {\n  // Render the gameboard\n  var renderBoard = function renderBoard(gameBoard, elementId) {\n    var isEnemy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;\n    var clickHandler = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;\n    var boardElement = document.getElementById(elementId);\n    boardElement.innerHTML = ''; // Clear the existing board\n\n    var board = gameBoard.getBoard();\n    var missedShots = gameBoard.getMissedShots();\n    var _loop = function _loop(y) {\n      var _loop2 = function _loop2(x) {\n        var _board$y$x;\n        var cell = document.createElement('div');\n        cell.classList.add('cell');\n        cell.dataset.x = x;\n        cell.dataset.y = y;\n\n        // Add styles based on cell state\n        if ((_board$y$x = board[y][x]) !== null && _board$y$x !== void 0 && _board$y$x.getSunk()) {\n          cell.classList.add('hit'); // Hit ship\n        } else if (board[y][x] && board[y][x].getDamage(x, y)) {\n          cell.classList.add('damaged'); // Shot ship (hit but not sunk)\n        } else if (board[y][x]) {\n          if (!isEnemy) cell.classList.add('ship'); // Show ships only for the player\n        } else if (missedShots.some(function (shot) {\n          return shot.x === x && shot.y === y;\n        })) {\n          cell.classList.add('miss'); // Missed shots\n        }\n        if (isEnemy) {\n          cell.classList.add('enemy-cell'); // Add class for enemy board interactivity\n          if (clickHandler) {\n            cell.addEventListener('click', function (e) {\n              return clickHandler(e, x, y);\n            }); // Attach event listener\n          }\n        }\n        boardElement.appendChild(cell);\n      };\n      for (var x = 0; x < board[y].length; x++) {\n        _loop2(x);\n      }\n    };\n    for (var y = 0; y < board.length; y++) {\n      _loop(y);\n    }\n  };\n\n  // Update the game message\n  var updateMessage = function updateMessage(message) {\n    var messageElement = document.getElementById('game-message');\n    messageElement.textContent = message;\n  };\n  return {\n    renderBoard: renderBoard,\n    updateMessage: updateMessage\n  };\n}();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DOM);\n\n//# sourceURL=webpack://battleship/../../../../%00#%00#CSE_FREE_DEGREE%00#%00#/%00#All_Projects/@TOP/19.Battleship/src/modules/DOM.js?");

/***/ }),

/***/ "../../../../\u0000#\u0000#CSE FREE DEGREE\u0000#\u0000#/\u0000#All Projects/@TOP/19.Battleship/src/modules/gameBoard.js":
/*!******************************************************************************************************!*\
  !*** ../../../../ # #CSE FREE DEGREE # #/ #All Projects/@TOP/19.Battleship/src/modules/gameBoard.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"../../../../\\u0000#\\u0000#CSE FREE DEGREE\\u0000#\\u0000#/\\u0000#All Projects/@TOP/19.Battleship/src/modules/ship.js\");\n\nvar GameBoard = function () {\n  var createBoard = function createBoard() {\n    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;\n    var board = Array.from({\n      length: size\n    }, function () {\n      return Array(size).fill(null);\n    });\n    var ships = [];\n    var missedShots = [];\n\n    // Place a ship at specified coordinates\n    var placeShip = function placeShip(shipName, shipLength, startX, startY) {\n      var direction = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'horizontal';\n      var ship = _ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createShip(shipName, shipLength);\n\n      // Check if placement is valid\n      for (var i = 0; i < shipLength; i++) {\n        var x = direction === 'horizontal' ? startX + i : startX;\n        var y = direction === 'vertical' ? startY + i : startY;\n        if (x >= size || y >= size || board[y][x]) return false; // Out of bounds or space taken\n      }\n      var shipCells = [];\n      for (var _i = 0; _i < shipLength; _i++) {\n        var _x = direction === 'horizontal' ? startX + _i : startX;\n        var _y = direction === 'vertical' ? startY + _i : startY;\n        board[_y][_x] = ship;\n        shipCells.push({\n          x: _x,\n          y: _y,\n          hit: false\n        });\n      }\n\n      // Assign the calculated cells to the ship\n      ship.setCells(shipCells);\n      ships.push(ship);\n      return true;\n    };\n\n    // Receive attack on board\n    var receiveAttack = function receiveAttack(x, y) {\n      if (board[y][x]) {\n        board[y][x].hit(x, y);\n        return 'hit';\n      } else {\n        missedShots.push({\n          x: x,\n          y: y\n        });\n        return 'miss';\n      }\n    };\n\n    // Check if all ships have been sunk\n    var areAllShipsSunk = function areAllShipsSunk() {\n      return ships.every(function (ship) {\n        return ship.getSunk();\n      });\n    };\n\n    // Get board state for testing/debugging\n    var getBoard = function getBoard() {\n      return board;\n    };\n    var getMissedShots = function getMissedShots() {\n      return missedShots;\n    };\n    return {\n      placeShip: placeShip,\n      receiveAttack: receiveAttack,\n      areAllShipsSunk: areAllShipsSunk,\n      getBoard: getBoard,\n      getMissedShots: getMissedShots\n    };\n  };\n  return {\n    createBoard: createBoard\n  };\n}();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameBoard);\n\n//# sourceURL=webpack://battleship/../../../../%00#%00#CSE_FREE_DEGREE%00#%00#/%00#All_Projects/@TOP/19.Battleship/src/modules/gameBoard.js?");

/***/ }),

/***/ "../../../../\u0000#\u0000#CSE FREE DEGREE\u0000#\u0000#/\u0000#All Projects/@TOP/19.Battleship/src/modules/gameController.js":
/*!***********************************************************************************************************!*\
  !*** ../../../../ # #CSE FREE DEGREE # #/ #All Projects/@TOP/19.Battleship/src/modules/gameController.js ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"../../../../\\u0000#\\u0000#CSE FREE DEGREE\\u0000#\\u0000#/\\u0000#All Projects/@TOP/19.Battleship/src/modules/player.js\");\n/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM */ \"../../../../\\u0000#\\u0000#CSE FREE DEGREE\\u0000#\\u0000#/\\u0000#All Projects/@TOP/19.Battleship/src/modules/DOM.js\");\n\n\nvar GameController = function () {\n  var player;\n  var computer;\n  var currentPlayer;\n  var initGame = function initGame() {\n    // Create player and computer\n    player = _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createPlayer('Player');\n    computer = _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createPlayer('Computer', true);\n\n    // Predefined ship placements for player and computer\n    placeShips(player);\n    placeShips(computer);\n    currentPlayer = player;\n\n    // Initial render of the boards\n    _DOM__WEBPACK_IMPORTED_MODULE_1__[\"default\"].renderBoard(player.getBoard(), 'player-board');\n    _DOM__WEBPACK_IMPORTED_MODULE_1__[\"default\"].renderBoard(computer.getBoard(), 'computer-board', true);\n    _DOM__WEBPACK_IMPORTED_MODULE_1__[\"default\"].updateMessage(\"Player's turn\");\n\n    // Add event listeners after a short delay to ensure DOM is ready\n    setTimeout(addEventListeners, 100);\n  };\n  var placeShips = function placeShips(player) {\n    var ships = [{\n      name: 'Destroyer',\n      length: 2,\n      x: 0,\n      y: 0,\n      direction: 'horizontal'\n    }, {\n      name: 'Submarine',\n      length: 3,\n      x: 2,\n      y: 2,\n      direction: 'vertical'\n    }, {\n      name: 'Cruiser',\n      length: 3,\n      x: 4,\n      y: 4,\n      direction: 'horizontal'\n    }, {\n      name: 'Battleship',\n      length: 4,\n      x: 6,\n      y: 6,\n      direction: 'vertical'\n    }, {\n      name: 'Carrier',\n      length: 5,\n      x: 5,\n      y: 1,\n      direction: 'horizontal'\n    }];\n    ships.forEach(function (ship) {\n      player.getBoard().placeShip(ship.name, ship.length, ship.x, ship.y, ship.direction);\n    });\n  };\n  var addEventListeners = function addEventListeners() {\n    var computerCells = document.querySelectorAll('#computer-board .enemy-cell');\n    computerCells.forEach(function (cell) {\n      cell.addEventListener('click', handlePlayerAttack);\n    });\n  };\n  var handlePlayerAttack = function handlePlayerAttack(e) {\n    if (currentPlayer !== player) return; // Ensure it's the player's turn\n\n    var x = parseInt(e.target.dataset.x, 10);\n    var y = parseInt(e.target.dataset.y, 10);\n    var attackResult = player.attack(computer.getBoard(), x, y);\n    if (attackResult === 'hit') {\n      _DOM__WEBPACK_IMPORTED_MODULE_1__[\"default\"].updateMessage('You hit a ship!');\n    } else if (attackResult === 'miss') {\n      _DOM__WEBPACK_IMPORTED_MODULE_1__[\"default\"].updateMessage('You missed!');\n    } else {\n      _DOM__WEBPACK_IMPORTED_MODULE_1__[\"default\"].updateMessage('You already attacked this spot!');\n      return;\n    }\n    _DOM__WEBPACK_IMPORTED_MODULE_1__[\"default\"].renderBoard(computer.getBoard(), 'computer-board', true);\n    if (computer.getBoard().areAllShipsSunk()) {\n      _DOM__WEBPACK_IMPORTED_MODULE_1__[\"default\"].updateMessage('Player wins! 🎉');\n      endGame();\n      return;\n    }\n\n    // Switch to computer's turn\n    currentPlayer = computer;\n    setTimeout(computerTurn, 1000); // Delay computer's turn for better UX\n  };\n  var computerTurn = function computerTurn() {\n    _DOM__WEBPACK_IMPORTED_MODULE_1__[\"default\"].updateMessage(\"Computer's turn...\");\n    setTimeout(function () {\n      var attackResult;\n      do {\n        attackResult = computer.randomAttack(player.getBoard());\n      } while (attackResult === 'already attacked');\n      _DOM__WEBPACK_IMPORTED_MODULE_1__[\"default\"].renderBoard(player.getBoard(), 'player-board');\n      if (attackResult === 'hit') {\n        _DOM__WEBPACK_IMPORTED_MODULE_1__[\"default\"].updateMessage('Computer hit your ship!');\n      } else {\n        _DOM__WEBPACK_IMPORTED_MODULE_1__[\"default\"].updateMessage('Computer missed!');\n      }\n      if (player.getBoard().areAllShipsSunk()) {\n        _DOM__WEBPACK_IMPORTED_MODULE_1__[\"default\"].updateMessage('Computer wins! 💻');\n        endGame();\n        return;\n      }\n      currentPlayer = player;\n      _DOM__WEBPACK_IMPORTED_MODULE_1__[\"default\"].updateMessage(\"Player's turn\");\n\n      // Re-enable event listeners for player's turn\n      addEventListeners();\n    }, 1000); // Simulate computer \"thinking\" time\n  };\n  var endGame = function endGame() {\n    var computerCells = document.querySelectorAll('#computer-board .enemy-cell');\n    computerCells.forEach(function (cell) {\n      cell.removeEventListener('click', handlePlayerAttack);\n    });\n\n    // Add a \"Restart Game\" button\n    var restartButton = document.createElement('button');\n    restartButton.textContent = 'Restart Game';\n    restartButton.addEventListener('click', function () {\n      document.location.reload(); // Reload the page to restart the game\n    });\n    document.body.appendChild(restartButton);\n  };\n\n  // Expose internal state and methods for testing\n  return {\n    initGame: initGame,\n    getPlayer: function getPlayer() {\n      return player;\n    },\n    getComputer: function getComputer() {\n      return computer;\n    },\n    getCurrentPlayer: function getCurrentPlayer() {\n      return currentPlayer;\n    },\n    handlePlayerAttack: handlePlayerAttack,\n    computerTurn: computerTurn\n  };\n}();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameController);\n\n//# sourceURL=webpack://battleship/../../../../%00#%00#CSE_FREE_DEGREE%00#%00#/%00#All_Projects/@TOP/19.Battleship/src/modules/gameController.js?");

/***/ }),

/***/ "../../../../\u0000#\u0000#CSE FREE DEGREE\u0000#\u0000#/\u0000#All Projects/@TOP/19.Battleship/src/modules/player.js":
/*!***************************************************************************************************!*\
  !*** ../../../../ # #CSE FREE DEGREE # #/ #All Projects/@TOP/19.Battleship/src/modules/player.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameBoard */ \"../../../../\\u0000#\\u0000#CSE FREE DEGREE\\u0000#\\u0000#/\\u0000#All Projects/@TOP/19.Battleship/src/modules/gameBoard.js\");\nfunction _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(r, a) { if (r) { if (\"string\" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return \"Object\" === t && r.constructor && (t = r.constructor.name), \"Map\" === t || \"Set\" === t ? Array.from(r) : \"Arguments\" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }\nfunction _iterableToArray(r) { if (\"undefined\" != typeof Symbol && null != r[Symbol.iterator] || null != r[\"@@iterator\"]) return Array.from(r); }\nfunction _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }\nfunction _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }\n\nvar Player = function () {\n  var createPlayer = function createPlayer(name) {\n    var isComputer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n    var boardSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;\n    var playerName = name;\n    var isAI = isComputer;\n    var gameBoard = _gameBoard__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createBoard(boardSize);\n    var attackHistory = new Set(); // Store attacks to prevent duplicates\n\n    // Attack opponent's board\n    var attack = function attack(opponentBoard, x, y) {\n      if (attackHistory.has(\"\".concat(x, \",\").concat(y))) {\n        return 'already attacked';\n      }\n      attackHistory.add(\"\".concat(x, \",\").concat(y));\n      return opponentBoard.receiveAttack(x, y);\n    };\n\n    // Random AI attack logic\n    var randomAttack = function randomAttack(opponentBoard) {\n      var x, y;\n      do {\n        x = Math.floor(Math.random() * boardSize);\n        y = Math.floor(Math.random() * boardSize);\n      } while (attackHistory.has(\"\".concat(x, \",\").concat(y)));\n      return attack(opponentBoard, x, y);\n    };\n    var getName = function getName() {\n      return playerName;\n    };\n    var getBoard = function getBoard() {\n      return gameBoard;\n    };\n    var isComputerPlayer = function isComputerPlayer() {\n      return isAI;\n    };\n    var getAttackHistory = function getAttackHistory() {\n      return _toConsumableArray(attackHistory);\n    };\n    return {\n      getName: getName,\n      getBoard: getBoard,\n      attack: attack,\n      randomAttack: randomAttack,\n      isComputerPlayer: isComputerPlayer,\n      getAttackHistory: getAttackHistory\n    };\n  };\n  return {\n    createPlayer: createPlayer\n  };\n}();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n//# sourceURL=webpack://battleship/../../../../%00#%00#CSE_FREE_DEGREE%00#%00#/%00#All_Projects/@TOP/19.Battleship/src/modules/player.js?");

/***/ }),

/***/ "../../../../\u0000#\u0000#CSE FREE DEGREE\u0000#\u0000#/\u0000#All Projects/@TOP/19.Battleship/src/modules/ship.js":
/*!*************************************************************************************************!*\
  !*** ../../../../ # #CSE FREE DEGREE # #/ #All Projects/@TOP/19.Battleship/src/modules/ship.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Ship = function () {\n  var createShip = function createShip(shipName, shipLength) {\n    var name = shipName;\n    var length = shipLength;\n    var timesHit = 0;\n    var isSunk = false;\n    var isFound = false;\n    var cells = [];\n\n    // GETTERS\n    var getName = function getName() {\n      return name;\n    };\n    var getLength = function getLength() {\n      return length;\n    };\n    var getTimesHit = function getTimesHit() {\n      return timesHit;\n    };\n    var getSunk = function getSunk() {\n      return isSunk;\n    };\n    var getFound = function getFound() {\n      return isFound;\n    };\n    var getCells = function getCells() {\n      return cells;\n    };\n    var getDamage = function getDamage(x, y) {\n      var cell = cells.find(function (cell) {\n        return cell.x === x && cell.y === y;\n      });\n      return cell ? cell.hit : false; // Check if this cell has been hit    }\n    };\n\n    // SHIP STATE MODIFIERS\n    var hit = function hit(x, y) {\n      var cell = cells.find(function (cell) {\n        return cell.x === x && cell.y === y;\n      }); // Find the cell being hit\n      if (cell && !cell.hit) {\n        cell.hit = true; // Mark the specific cell as hit\n        timesHit++;\n        if (timesHit === length) {\n          isSunk = true;\n        }\n      }\n    };\n    var found = function found() {\n      isFound = true;\n    };\n    var resetFound = function resetFound() {\n      isFound = false;\n    };\n    var resetShip = function resetShip() {\n      timesHit = 0;\n      isSunk = false;\n      isFound = false;\n      cells.forEach(function (cell) {\n        return cell.hit = false;\n      }); // Reset hit state for each cell\n    };\n\n    // Set the coordinates of the ship (to be used when placing the ship on the board)\n    var setCells = function setCells(coordinates) {\n      cells = coordinates; // Set coordinates once the ship is placed\n    };\n    return {\n      getName: getName,\n      getLength: getLength,\n      getTimesHit: getTimesHit,\n      getSunk: getSunk,\n      getFound: getFound,\n      getCells: getCells,\n      getDamage: getDamage,\n      hit: hit,\n      found: found,\n      resetFound: resetFound,\n      resetShip: resetShip,\n      setCells: setCells\n    };\n  };\n  return {\n    createShip: createShip\n  };\n}();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);\n\n//# sourceURL=webpack://battleship/../../../../%00#%00#CSE_FREE_DEGREE%00#%00#/%00#All_Projects/@TOP/19.Battleship/src/modules/ship.js?");

/***/ }),

/***/ "../../../../\u0000#\u0000#CSE FREE DEGREE\u0000#\u0000#/\u0000#All Projects/@TOP/19.Battleship/src/styles.css":
/*!********************************************************************************************!*\
  !*** ../../../../ # #CSE FREE DEGREE # #/ #All Projects/@TOP/19.Battleship/src/styles.css ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://battleship/../../../../%00#%00#CSE_FREE_DEGREE%00#%00#/%00#All_Projects/@TOP/19.Battleship/src/styles.css?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("../../../../\u0000#\u0000#CSE FREE DEGREE\u0000#\u0000#/\u0000#All Projects/@TOP/19.Battleship/src/index.js");
/******/ 	
/******/ })()
;