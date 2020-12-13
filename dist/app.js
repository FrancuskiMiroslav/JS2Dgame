/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

document.addEventListener('DOMContentLoaded', function () {
	window.addEventListener('load', (e) => {
		const preload = document.querySelector('.preload');

		preload.classList.add('preload-finished');
	});

	const btnScrollToTop = document.getElementById('btnScrollToTop');

	if (btnScrollToTop) {
		btnScrollToTop.addEventListener('click', (e) => {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth',
			});
		});
	}

	// canvas setup
	const canvas = document.getElementById('canvas1');
	const ctx = canvas.getContext('2d');
	canvas.width = 800;
	canvas.height = 500;

	let score = 0;
	let gameFrame = 0;
	ctx.font = '40px Georgia';
	let gameSpeed = Math.floor(Math.random() * 4 + 1);
	let gameOver = false;

	// mouse interactivity
	let canvasPosition = canvas.getBoundingClientRect();

	const mouse = {
		x: 100,
		y: canvas.height - 100,
		click: false,
	};

	canvas.addEventListener('mousedown', (e) => {
		mouse.click = true;
		mouse.x = e.x - canvasPosition.left;
		mouse.y = e.y - canvasPosition.top;
	});

	canvas.addEventListener('mouseup', (e) => {
		mouse.click = false;
	});

	// player character
	const playerLeft = new Image();
	playerLeft.src = './assets/images/monsterWalkLeft.png';
	const playerRight = new Image();
	playerRight.src = './assets/images/monsterWalkRight.png';

	class Player {
		constructor() {
			this.x = 100;
			this.y = canvas.height - 100;
			this.radius = 50;
			this.angle = 0;
			this.frameX = 0;
			this.frameY = 0;
			this.frame = 0;
			this.spriteWidth = 575;
			this.spriteHeight = 542;
		}

		update() {
			const dx = this.x - mouse.x;
			const dy = this.y - mouse.y;
			let theta = Math.atan2(dy, dx);
			this.angle = theta;

			if (mouse.x != this.x) {
				this.x -= dx / 20;
			}
			if (mouse.y != this.y) {
				this.y -= dy / 20;
			}

			if (mouse.click == true) {
				if (gameFrame % 4 == 0) {
					this.frame++;

					if (this.frame >= 16) this.frame = 0;
					if (
						this.frame == 3 ||
						this.frame == 7 ||
						this.frame == 11 ||
						this.frame == 15
					) {
						this.frameX = 0;
					} else {
						this.frameX++;
					}

					if (this.frame < 3) this.frameY = 0;
					else if (this.frame < 7) this.frameY = 1;
					else if (this.frame < 11) this.frameY = 2;
					else if (this.frame < 15) this.frameY = 3;
					else this.frameY = 0;
				}
			}
		}

		draw() {
			if (mouse.click) {
				ctx.lineWidth = 0.2;
				ctx.beginPath();
				ctx.moveTo(this.x, this.y);
				ctx.lineTo(mouse.x, mouse.y);
			}

			/* 	ctx.fillStyle = 'red';
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
			ctx.fill();
			ctx.closePath();
			ctx.fillRect(this.x, this.y, this.radius, 10); */

			ctx.save();
			ctx.translate(this.x, this.y);
			ctx.rotate(this.angle);

			if (this.x >= mouse.x) {
				ctx.drawImage(
					playerLeft,
					this.frameX * this.spriteWidth,
					this.frameY * this.spriteHeight,
					this.spriteWidth,
					this.spriteHeight,
					0 - 55,
					0 - 50,
					this.spriteWidth / 5,
					this.spriteHeight / 5
				);
			} else {
				ctx.drawImage(
					playerRight,
					this.frameX * this.spriteWidth,
					this.frameY * this.spriteHeight,
					this.spriteWidth,
					this.spriteHeight,
					0 - 60,
					0 - 55,
					this.spriteWidth / 5,
					this.spriteHeight / 5
				);
			}

			ctx.restore();
		}
	}

	const player = new Player();

	// interactive elements
	const elementsArray = [];
	const fruitImage = new Image();
	fruitImage.src = './assets/images/apple.png';

	class Bubble {
		constructor() {
			this.x = Math.random() * canvas.width;
			this.y = -100;
			this.radius = 50;
			this.speed = Math.random() * 5 + 1;
			this.distance;
			this.counted = false;
			this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2';
		}

		update() {
			this.y += this.speed;
			const dx = this.x - player.x;
			const dy = this.y - player.y;
			this.distance = Math.sqrt(dx * dx + dy * dy);
		}

		draw() {
			/* ctx.fillStyle = 'blue';
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
			ctx.fill();
			ctx.closePath();
			ctx.stroke(); */
			ctx.drawImage(
				fruitImage,
				this.x - 50,
				this.y - 50,
				this.radius * 2,
				this.radius * 2
			);
		}
	}

	const bubblePop1 = document.createElement('audio');
	bubblePop1.src = './sounds/eat_01.ogg';
	const bubblePop2 = document.createElement('audio');
	bubblePop2.src = './sounds/eat_04.ogg';

	function handleBubbles() {
		if (gameFrame % 50 == 0) {
			elementsArray.push(new Bubble());
		}

		elementsArray.forEach((bubble) => {
			bubble.update();
			bubble.draw();
		});

		elementsArray.forEach((bubble, index) => {
			if (bubble.y < 0 - bubble.radius * 2) {
				elementsArray.splice(index, 1);
			}

			if (bubble) {
				if (bubble.distance < bubble.radius + player.radius) {
					if (!bubble.counted) {
						if (bubble.sound == 'sound1') {
							bubblePop1.play();
						} else {
							bubblePop2.play();
						}
						score++;
						bubble.counted = true;
						elementsArray.splice(index, 1);
					}
				}
			}
		});
	}

	// repeating background
	const background = new Image();
	background.src = './assets/images/parallax-forest-back-trees.png';

	const background2 = new Image();
	background2.src = './assets/images/parallax-forest-front-trees.png';

	const background3 = new Image();
	background3.src = './assets/images/parallax-forest-lights.png';

	const background4 = new Image();
	background4.src = './assets/images/parallax-forest-middle-trees.png';

	const BG = {
		x1: 0,
		x2: canvas.width,
		y: 0,
		width: canvas.width,
		height: canvas.height,
	};

	function handleBackground() {
		BG.x1 -= gameSpeed;
		if (BG.x1 < -BG.width) BG.x1 = BG.width;

		ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
		ctx.drawImage(background3, BG.x1, BG.y, BG.width, BG.height);
		ctx.drawImage(background4, BG.x1, BG.y, BG.width, BG.height);
		ctx.drawImage(background2, BG.x1, BG.y, BG.width, BG.height);

		BG.x2 -= gameSpeed;
		if (BG.x2 < -BG.width) BG.x2 = BG.width;
		ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
		ctx.drawImage(background3, BG.x2, BG.y, BG.width, BG.height);
		ctx.drawImage(background4, BG.x2, BG.y, BG.width, BG.height);
		ctx.drawImage(background2, BG.x2, BG.y, BG.width, BG.height);
	}

	// enemies
	const enemyImage = new Image();
	enemyImage.src = './assets/images/snowball_spritesheet_3x2.png';

	class Enemy {
		constructor() {
			this.x = canvas.width + 200;
			this.y = Math.random() * (canvas.height - 150) + 90;
			this.radius = 40;
			this.speed = Math.random() * 2 + 2;
			this.frame = 0;
			this.frameX = 0;
			this.frameY = 0;
			this.spriteWidth = 512;
			this.spriteHeight = 385.5;
		}

		draw() {
			/* ctx.fillStyle = 'red';
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
			ctx.fill(); */

			ctx.drawImage(
				enemyImage,
				this.frameX * this.spriteWidth,
				this.frameY * this.spriteHeight,
				this.spriteWidth,
				this.spriteHeight,
				this.x - 45,
				this.y - 68,
				this.spriteWidth / 3,
				this.spriteHeight / 3
			);
		}

		update() {
			this.x -= this.speed;

			if (this.x < 0 - this.radius * 2) {
				this.x = canvas.width + 200;
				this.y = Math.random() * (canvas.height - 150) + 90;
				this.speed = Math.random() * 2 + 2;
			}

			if (gameFrame % 5 == 0) {
				this.frame++;

				if (this.frame >= 6) this.frame = 0;
				if (this.frame == 2 || this.frame == 5) {
					this.frameX = 0;
				} else {
					this.frameX++;
				}

				if (this.frame < 2) this.frameY = 0;
				else if (this.frame < 5) this.frameY = 1;
				else this.frameY = 0;
			}

			// COLLISION with player
			const dx = this.x - player.x;
			const dy = this.y - player.y;
			const distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < this.radius + player.radius) {
				handleGameOver();
			}
		}
	}

	const enemy1 = new Enemy();

	function handleEnemies() {
		enemy1.draw();
		enemy1.update();
	}

	function handleGameOver() {
		ctx.fillStyle = 'white';
		ctx.fillText('GAME OVER, your score is ' + score, 130, 250);
		gameOver = true;
	}

	// animation loop
	function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		handleBackground();
		handleBubbles();
		player.update();
		player.draw();
		handleEnemies();
		ctx.fillText(`score: ${score}`, 10, 50);
		gameFrame++;
		if (!gameOver) requestAnimationFrame(animate);
	}

	animate();

	window.addEventListener('resize', (e) => {
		canvasPosition = canvas.getBoundingClientRect();
	});
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDs7QUFFakQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7O0FBRWQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLE1BQU07QUFDL0I7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0YsQ0FBQyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qcy9tYWluLmpzXCIpO1xuIiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoZSkgPT4ge1xuXHRcdGNvbnN0IHByZWxvYWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlbG9hZCcpO1xuXG5cdFx0cHJlbG9hZC5jbGFzc0xpc3QuYWRkKCdwcmVsb2FkLWZpbmlzaGVkJyk7XG5cdH0pO1xuXG5cdGNvbnN0IGJ0blNjcm9sbFRvVG9wID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0blNjcm9sbFRvVG9wJyk7XG5cblx0aWYgKGJ0blNjcm9sbFRvVG9wKSB7XG5cdFx0YnRuU2Nyb2xsVG9Ub3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuXHRcdFx0d2luZG93LnNjcm9sbFRvKHtcblx0XHRcdFx0dG9wOiAwLFxuXHRcdFx0XHRsZWZ0OiAwLFxuXHRcdFx0XHRiZWhhdmlvcjogJ3Ntb290aCcsXG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdC8vIGNhbnZhcyBzZXR1cFxuXHRjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzMScpO1xuXHRjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblx0Y2FudmFzLndpZHRoID0gODAwO1xuXHRjYW52YXMuaGVpZ2h0ID0gNTAwO1xuXG5cdGxldCBzY29yZSA9IDA7XG5cdGxldCBnYW1lRnJhbWUgPSAwO1xuXHRjdHguZm9udCA9ICc0MHB4IEdlb3JnaWEnO1xuXHRsZXQgZ2FtZVNwZWVkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNCArIDEpO1xuXHRsZXQgZ2FtZU92ZXIgPSBmYWxzZTtcblxuXHQvLyBtb3VzZSBpbnRlcmFjdGl2aXR5XG5cdGxldCBjYW52YXNQb3NpdGlvbiA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuXHRjb25zdCBtb3VzZSA9IHtcblx0XHR4OiAxMDAsXG5cdFx0eTogY2FudmFzLmhlaWdodCAtIDEwMCxcblx0XHRjbGljazogZmFsc2UsXG5cdH07XG5cblx0Y2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChlKSA9PiB7XG5cdFx0bW91c2UuY2xpY2sgPSB0cnVlO1xuXHRcdG1vdXNlLnggPSBlLnggLSBjYW52YXNQb3NpdGlvbi5sZWZ0O1xuXHRcdG1vdXNlLnkgPSBlLnkgLSBjYW52YXNQb3NpdGlvbi50b3A7XG5cdH0pO1xuXG5cdGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKGUpID0+IHtcblx0XHRtb3VzZS5jbGljayA9IGZhbHNlO1xuXHR9KTtcblxuXHQvLyBwbGF5ZXIgY2hhcmFjdGVyXG5cdGNvbnN0IHBsYXllckxlZnQgPSBuZXcgSW1hZ2UoKTtcblx0cGxheWVyTGVmdC5zcmMgPSAnLi9hc3NldHMvaW1hZ2VzL21vbnN0ZXJXYWxrTGVmdC5wbmcnO1xuXHRjb25zdCBwbGF5ZXJSaWdodCA9IG5ldyBJbWFnZSgpO1xuXHRwbGF5ZXJSaWdodC5zcmMgPSAnLi9hc3NldHMvaW1hZ2VzL21vbnN0ZXJXYWxrUmlnaHQucG5nJztcblxuXHRjbGFzcyBQbGF5ZXIge1xuXHRcdGNvbnN0cnVjdG9yKCkge1xuXHRcdFx0dGhpcy54ID0gMTAwO1xuXHRcdFx0dGhpcy55ID0gY2FudmFzLmhlaWdodCAtIDEwMDtcblx0XHRcdHRoaXMucmFkaXVzID0gNTA7XG5cdFx0XHR0aGlzLmFuZ2xlID0gMDtcblx0XHRcdHRoaXMuZnJhbWVYID0gMDtcblx0XHRcdHRoaXMuZnJhbWVZID0gMDtcblx0XHRcdHRoaXMuZnJhbWUgPSAwO1xuXHRcdFx0dGhpcy5zcHJpdGVXaWR0aCA9IDU3NTtcblx0XHRcdHRoaXMuc3ByaXRlSGVpZ2h0ID0gNTQyO1xuXHRcdH1cblxuXHRcdHVwZGF0ZSgpIHtcblx0XHRcdGNvbnN0IGR4ID0gdGhpcy54IC0gbW91c2UueDtcblx0XHRcdGNvbnN0IGR5ID0gdGhpcy55IC0gbW91c2UueTtcblx0XHRcdGxldCB0aGV0YSA9IE1hdGguYXRhbjIoZHksIGR4KTtcblx0XHRcdHRoaXMuYW5nbGUgPSB0aGV0YTtcblxuXHRcdFx0aWYgKG1vdXNlLnggIT0gdGhpcy54KSB7XG5cdFx0XHRcdHRoaXMueCAtPSBkeCAvIDIwO1xuXHRcdFx0fVxuXHRcdFx0aWYgKG1vdXNlLnkgIT0gdGhpcy55KSB7XG5cdFx0XHRcdHRoaXMueSAtPSBkeSAvIDIwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAobW91c2UuY2xpY2sgPT0gdHJ1ZSkge1xuXHRcdFx0XHRpZiAoZ2FtZUZyYW1lICUgNCA9PSAwKSB7XG5cdFx0XHRcdFx0dGhpcy5mcmFtZSsrO1xuXG5cdFx0XHRcdFx0aWYgKHRoaXMuZnJhbWUgPj0gMTYpIHRoaXMuZnJhbWUgPSAwO1xuXHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdHRoaXMuZnJhbWUgPT0gMyB8fFxuXHRcdFx0XHRcdFx0dGhpcy5mcmFtZSA9PSA3IHx8XG5cdFx0XHRcdFx0XHR0aGlzLmZyYW1lID09IDExIHx8XG5cdFx0XHRcdFx0XHR0aGlzLmZyYW1lID09IDE1XG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmZyYW1lWCA9IDA7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRoaXMuZnJhbWVYKys7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHRoaXMuZnJhbWUgPCAzKSB0aGlzLmZyYW1lWSA9IDA7XG5cdFx0XHRcdFx0ZWxzZSBpZiAodGhpcy5mcmFtZSA8IDcpIHRoaXMuZnJhbWVZID0gMTtcblx0XHRcdFx0XHRlbHNlIGlmICh0aGlzLmZyYW1lIDwgMTEpIHRoaXMuZnJhbWVZID0gMjtcblx0XHRcdFx0XHRlbHNlIGlmICh0aGlzLmZyYW1lIDwgMTUpIHRoaXMuZnJhbWVZID0gMztcblx0XHRcdFx0XHRlbHNlIHRoaXMuZnJhbWVZID0gMDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGRyYXcoKSB7XG5cdFx0XHRpZiAobW91c2UuY2xpY2spIHtcblx0XHRcdFx0Y3R4LmxpbmVXaWR0aCA9IDAuMjtcblx0XHRcdFx0Y3R4LmJlZ2luUGF0aCgpO1xuXHRcdFx0XHRjdHgubW92ZVRvKHRoaXMueCwgdGhpcy55KTtcblx0XHRcdFx0Y3R4LmxpbmVUbyhtb3VzZS54LCBtb3VzZS55KTtcblx0XHRcdH1cblxuXHRcdFx0LyogXHRjdHguZmlsbFN0eWxlID0gJ3JlZCc7XG5cdFx0XHRjdHguYmVnaW5QYXRoKCk7XG5cdFx0XHRjdHguYXJjKHRoaXMueCwgdGhpcy55LCB0aGlzLnJhZGl1cywgMCwgTWF0aC5QSSAqIDIpO1xuXHRcdFx0Y3R4LmZpbGwoKTtcblx0XHRcdGN0eC5jbG9zZVBhdGgoKTtcblx0XHRcdGN0eC5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy5yYWRpdXMsIDEwKTsgKi9cblxuXHRcdFx0Y3R4LnNhdmUoKTtcblx0XHRcdGN0eC50cmFuc2xhdGUodGhpcy54LCB0aGlzLnkpO1xuXHRcdFx0Y3R4LnJvdGF0ZSh0aGlzLmFuZ2xlKTtcblxuXHRcdFx0aWYgKHRoaXMueCA+PSBtb3VzZS54KSB7XG5cdFx0XHRcdGN0eC5kcmF3SW1hZ2UoXG5cdFx0XHRcdFx0cGxheWVyTGVmdCxcblx0XHRcdFx0XHR0aGlzLmZyYW1lWCAqIHRoaXMuc3ByaXRlV2lkdGgsXG5cdFx0XHRcdFx0dGhpcy5mcmFtZVkgKiB0aGlzLnNwcml0ZUhlaWdodCxcblx0XHRcdFx0XHR0aGlzLnNwcml0ZVdpZHRoLFxuXHRcdFx0XHRcdHRoaXMuc3ByaXRlSGVpZ2h0LFxuXHRcdFx0XHRcdDAgLSA1NSxcblx0XHRcdFx0XHQwIC0gNTAsXG5cdFx0XHRcdFx0dGhpcy5zcHJpdGVXaWR0aCAvIDUsXG5cdFx0XHRcdFx0dGhpcy5zcHJpdGVIZWlnaHQgLyA1XG5cdFx0XHRcdCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjdHguZHJhd0ltYWdlKFxuXHRcdFx0XHRcdHBsYXllclJpZ2h0LFxuXHRcdFx0XHRcdHRoaXMuZnJhbWVYICogdGhpcy5zcHJpdGVXaWR0aCxcblx0XHRcdFx0XHR0aGlzLmZyYW1lWSAqIHRoaXMuc3ByaXRlSGVpZ2h0LFxuXHRcdFx0XHRcdHRoaXMuc3ByaXRlV2lkdGgsXG5cdFx0XHRcdFx0dGhpcy5zcHJpdGVIZWlnaHQsXG5cdFx0XHRcdFx0MCAtIDYwLFxuXHRcdFx0XHRcdDAgLSA1NSxcblx0XHRcdFx0XHR0aGlzLnNwcml0ZVdpZHRoIC8gNSxcblx0XHRcdFx0XHR0aGlzLnNwcml0ZUhlaWdodCAvIDVcblx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0Y3R4LnJlc3RvcmUoKTtcblx0XHR9XG5cdH1cblxuXHRjb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKCk7XG5cblx0Ly8gaW50ZXJhY3RpdmUgZWxlbWVudHNcblx0Y29uc3QgZWxlbWVudHNBcnJheSA9IFtdO1xuXHRjb25zdCBmcnVpdEltYWdlID0gbmV3IEltYWdlKCk7XG5cdGZydWl0SW1hZ2Uuc3JjID0gJy4vYXNzZXRzL2ltYWdlcy9hcHBsZS5wbmcnO1xuXG5cdGNsYXNzIEJ1YmJsZSB7XG5cdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0XHR0aGlzLnggPSBNYXRoLnJhbmRvbSgpICogY2FudmFzLndpZHRoO1xuXHRcdFx0dGhpcy55ID0gLTEwMDtcblx0XHRcdHRoaXMucmFkaXVzID0gNTA7XG5cdFx0XHR0aGlzLnNwZWVkID0gTWF0aC5yYW5kb20oKSAqIDUgKyAxO1xuXHRcdFx0dGhpcy5kaXN0YW5jZTtcblx0XHRcdHRoaXMuY291bnRlZCA9IGZhbHNlO1xuXHRcdFx0dGhpcy5zb3VuZCA9IE1hdGgucmFuZG9tKCkgPD0gMC41ID8gJ3NvdW5kMScgOiAnc291bmQyJztcblx0XHR9XG5cblx0XHR1cGRhdGUoKSB7XG5cdFx0XHR0aGlzLnkgKz0gdGhpcy5zcGVlZDtcblx0XHRcdGNvbnN0IGR4ID0gdGhpcy54IC0gcGxheWVyLng7XG5cdFx0XHRjb25zdCBkeSA9IHRoaXMueSAtIHBsYXllci55O1xuXHRcdFx0dGhpcy5kaXN0YW5jZSA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG5cdFx0fVxuXG5cdFx0ZHJhdygpIHtcblx0XHRcdC8qIGN0eC5maWxsU3R5bGUgPSAnYmx1ZSc7XG5cdFx0XHRjdHguYmVnaW5QYXRoKCk7XG5cdFx0XHRjdHguYXJjKHRoaXMueCwgdGhpcy55LCB0aGlzLnJhZGl1cywgMCwgTWF0aC5QSSAqIDIpO1xuXHRcdFx0Y3R4LmZpbGwoKTtcblx0XHRcdGN0eC5jbG9zZVBhdGgoKTtcblx0XHRcdGN0eC5zdHJva2UoKTsgKi9cblx0XHRcdGN0eC5kcmF3SW1hZ2UoXG5cdFx0XHRcdGZydWl0SW1hZ2UsXG5cdFx0XHRcdHRoaXMueCAtIDUwLFxuXHRcdFx0XHR0aGlzLnkgLSA1MCxcblx0XHRcdFx0dGhpcy5yYWRpdXMgKiAyLFxuXHRcdFx0XHR0aGlzLnJhZGl1cyAqIDJcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cblx0Y29uc3QgYnViYmxlUG9wMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2F1ZGlvJyk7XG5cdGJ1YmJsZVBvcDEuc3JjID0gJy4vc291bmRzL2VhdF8wMS5vZ2cnO1xuXHRjb25zdCBidWJibGVQb3AyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYXVkaW8nKTtcblx0YnViYmxlUG9wMi5zcmMgPSAnLi9zb3VuZHMvZWF0XzA0Lm9nZyc7XG5cblx0ZnVuY3Rpb24gaGFuZGxlQnViYmxlcygpIHtcblx0XHRpZiAoZ2FtZUZyYW1lICUgNTAgPT0gMCkge1xuXHRcdFx0ZWxlbWVudHNBcnJheS5wdXNoKG5ldyBCdWJibGUoKSk7XG5cdFx0fVxuXG5cdFx0ZWxlbWVudHNBcnJheS5mb3JFYWNoKChidWJibGUpID0+IHtcblx0XHRcdGJ1YmJsZS51cGRhdGUoKTtcblx0XHRcdGJ1YmJsZS5kcmF3KCk7XG5cdFx0fSk7XG5cblx0XHRlbGVtZW50c0FycmF5LmZvckVhY2goKGJ1YmJsZSwgaW5kZXgpID0+IHtcblx0XHRcdGlmIChidWJibGUueSA8IDAgLSBidWJibGUucmFkaXVzICogMikge1xuXHRcdFx0XHRlbGVtZW50c0FycmF5LnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChidWJibGUpIHtcblx0XHRcdFx0aWYgKGJ1YmJsZS5kaXN0YW5jZSA8IGJ1YmJsZS5yYWRpdXMgKyBwbGF5ZXIucmFkaXVzKSB7XG5cdFx0XHRcdFx0aWYgKCFidWJibGUuY291bnRlZCkge1xuXHRcdFx0XHRcdFx0aWYgKGJ1YmJsZS5zb3VuZCA9PSAnc291bmQxJykge1xuXHRcdFx0XHRcdFx0XHRidWJibGVQb3AxLnBsYXkoKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGJ1YmJsZVBvcDIucGxheSgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0c2NvcmUrKztcblx0XHRcdFx0XHRcdGJ1YmJsZS5jb3VudGVkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdGVsZW1lbnRzQXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdC8vIHJlcGVhdGluZyBiYWNrZ3JvdW5kXG5cdGNvbnN0IGJhY2tncm91bmQgPSBuZXcgSW1hZ2UoKTtcblx0YmFja2dyb3VuZC5zcmMgPSAnLi9hc3NldHMvaW1hZ2VzL3BhcmFsbGF4LWZvcmVzdC1iYWNrLXRyZWVzLnBuZyc7XG5cblx0Y29uc3QgYmFja2dyb3VuZDIgPSBuZXcgSW1hZ2UoKTtcblx0YmFja2dyb3VuZDIuc3JjID0gJy4vYXNzZXRzL2ltYWdlcy9wYXJhbGxheC1mb3Jlc3QtZnJvbnQtdHJlZXMucG5nJztcblxuXHRjb25zdCBiYWNrZ3JvdW5kMyA9IG5ldyBJbWFnZSgpO1xuXHRiYWNrZ3JvdW5kMy5zcmMgPSAnLi9hc3NldHMvaW1hZ2VzL3BhcmFsbGF4LWZvcmVzdC1saWdodHMucG5nJztcblxuXHRjb25zdCBiYWNrZ3JvdW5kNCA9IG5ldyBJbWFnZSgpO1xuXHRiYWNrZ3JvdW5kNC5zcmMgPSAnLi9hc3NldHMvaW1hZ2VzL3BhcmFsbGF4LWZvcmVzdC1taWRkbGUtdHJlZXMucG5nJztcblxuXHRjb25zdCBCRyA9IHtcblx0XHR4MTogMCxcblx0XHR4MjogY2FudmFzLndpZHRoLFxuXHRcdHk6IDAsXG5cdFx0d2lkdGg6IGNhbnZhcy53aWR0aCxcblx0XHRoZWlnaHQ6IGNhbnZhcy5oZWlnaHQsXG5cdH07XG5cblx0ZnVuY3Rpb24gaGFuZGxlQmFja2dyb3VuZCgpIHtcblx0XHRCRy54MSAtPSBnYW1lU3BlZWQ7XG5cdFx0aWYgKEJHLngxIDwgLUJHLndpZHRoKSBCRy54MSA9IEJHLndpZHRoO1xuXG5cdFx0Y3R4LmRyYXdJbWFnZShiYWNrZ3JvdW5kLCBCRy54MSwgQkcueSwgQkcud2lkdGgsIEJHLmhlaWdodCk7XG5cdFx0Y3R4LmRyYXdJbWFnZShiYWNrZ3JvdW5kMywgQkcueDEsIEJHLnksIEJHLndpZHRoLCBCRy5oZWlnaHQpO1xuXHRcdGN0eC5kcmF3SW1hZ2UoYmFja2dyb3VuZDQsIEJHLngxLCBCRy55LCBCRy53aWR0aCwgQkcuaGVpZ2h0KTtcblx0XHRjdHguZHJhd0ltYWdlKGJhY2tncm91bmQyLCBCRy54MSwgQkcueSwgQkcud2lkdGgsIEJHLmhlaWdodCk7XG5cblx0XHRCRy54MiAtPSBnYW1lU3BlZWQ7XG5cdFx0aWYgKEJHLngyIDwgLUJHLndpZHRoKSBCRy54MiA9IEJHLndpZHRoO1xuXHRcdGN0eC5kcmF3SW1hZ2UoYmFja2dyb3VuZCwgQkcueDIsIEJHLnksIEJHLndpZHRoLCBCRy5oZWlnaHQpO1xuXHRcdGN0eC5kcmF3SW1hZ2UoYmFja2dyb3VuZDMsIEJHLngyLCBCRy55LCBCRy53aWR0aCwgQkcuaGVpZ2h0KTtcblx0XHRjdHguZHJhd0ltYWdlKGJhY2tncm91bmQ0LCBCRy54MiwgQkcueSwgQkcud2lkdGgsIEJHLmhlaWdodCk7XG5cdFx0Y3R4LmRyYXdJbWFnZShiYWNrZ3JvdW5kMiwgQkcueDIsIEJHLnksIEJHLndpZHRoLCBCRy5oZWlnaHQpO1xuXHR9XG5cblx0Ly8gZW5lbWllc1xuXHRjb25zdCBlbmVteUltYWdlID0gbmV3IEltYWdlKCk7XG5cdGVuZW15SW1hZ2Uuc3JjID0gJy4vYXNzZXRzL2ltYWdlcy9zbm93YmFsbF9zcHJpdGVzaGVldF8zeDIucG5nJztcblxuXHRjbGFzcyBFbmVteSB7XG5cdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0XHR0aGlzLnggPSBjYW52YXMud2lkdGggKyAyMDA7XG5cdFx0XHR0aGlzLnkgPSBNYXRoLnJhbmRvbSgpICogKGNhbnZhcy5oZWlnaHQgLSAxNTApICsgOTA7XG5cdFx0XHR0aGlzLnJhZGl1cyA9IDQwO1xuXHRcdFx0dGhpcy5zcGVlZCA9IE1hdGgucmFuZG9tKCkgKiAyICsgMjtcblx0XHRcdHRoaXMuZnJhbWUgPSAwO1xuXHRcdFx0dGhpcy5mcmFtZVggPSAwO1xuXHRcdFx0dGhpcy5mcmFtZVkgPSAwO1xuXHRcdFx0dGhpcy5zcHJpdGVXaWR0aCA9IDUxMjtcblx0XHRcdHRoaXMuc3ByaXRlSGVpZ2h0ID0gMzg1LjU7XG5cdFx0fVxuXG5cdFx0ZHJhdygpIHtcblx0XHRcdC8qIGN0eC5maWxsU3R5bGUgPSAncmVkJztcblx0XHRcdGN0eC5iZWdpblBhdGgoKTtcblx0XHRcdGN0eC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMucmFkaXVzLCAwLCBNYXRoLlBJICogMik7XG5cdFx0XHRjdHguZmlsbCgpOyAqL1xuXG5cdFx0XHRjdHguZHJhd0ltYWdlKFxuXHRcdFx0XHRlbmVteUltYWdlLFxuXHRcdFx0XHR0aGlzLmZyYW1lWCAqIHRoaXMuc3ByaXRlV2lkdGgsXG5cdFx0XHRcdHRoaXMuZnJhbWVZICogdGhpcy5zcHJpdGVIZWlnaHQsXG5cdFx0XHRcdHRoaXMuc3ByaXRlV2lkdGgsXG5cdFx0XHRcdHRoaXMuc3ByaXRlSGVpZ2h0LFxuXHRcdFx0XHR0aGlzLnggLSA0NSxcblx0XHRcdFx0dGhpcy55IC0gNjgsXG5cdFx0XHRcdHRoaXMuc3ByaXRlV2lkdGggLyAzLFxuXHRcdFx0XHR0aGlzLnNwcml0ZUhlaWdodCAvIDNcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0dXBkYXRlKCkge1xuXHRcdFx0dGhpcy54IC09IHRoaXMuc3BlZWQ7XG5cblx0XHRcdGlmICh0aGlzLnggPCAwIC0gdGhpcy5yYWRpdXMgKiAyKSB7XG5cdFx0XHRcdHRoaXMueCA9IGNhbnZhcy53aWR0aCArIDIwMDtcblx0XHRcdFx0dGhpcy55ID0gTWF0aC5yYW5kb20oKSAqIChjYW52YXMuaGVpZ2h0IC0gMTUwKSArIDkwO1xuXHRcdFx0XHR0aGlzLnNwZWVkID0gTWF0aC5yYW5kb20oKSAqIDIgKyAyO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZ2FtZUZyYW1lICUgNSA9PSAwKSB7XG5cdFx0XHRcdHRoaXMuZnJhbWUrKztcblxuXHRcdFx0XHRpZiAodGhpcy5mcmFtZSA+PSA2KSB0aGlzLmZyYW1lID0gMDtcblx0XHRcdFx0aWYgKHRoaXMuZnJhbWUgPT0gMiB8fCB0aGlzLmZyYW1lID09IDUpIHtcblx0XHRcdFx0XHR0aGlzLmZyYW1lWCA9IDA7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5mcmFtZVgrKztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0aGlzLmZyYW1lIDwgMikgdGhpcy5mcmFtZVkgPSAwO1xuXHRcdFx0XHRlbHNlIGlmICh0aGlzLmZyYW1lIDwgNSkgdGhpcy5mcmFtZVkgPSAxO1xuXHRcdFx0XHRlbHNlIHRoaXMuZnJhbWVZID0gMDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ09MTElTSU9OIHdpdGggcGxheWVyXG5cdFx0XHRjb25zdCBkeCA9IHRoaXMueCAtIHBsYXllci54O1xuXHRcdFx0Y29uc3QgZHkgPSB0aGlzLnkgLSBwbGF5ZXIueTtcblx0XHRcdGNvbnN0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcblxuXHRcdFx0aWYgKGRpc3RhbmNlIDwgdGhpcy5yYWRpdXMgKyBwbGF5ZXIucmFkaXVzKSB7XG5cdFx0XHRcdGhhbmRsZUdhbWVPdmVyKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Y29uc3QgZW5lbXkxID0gbmV3IEVuZW15KCk7XG5cblx0ZnVuY3Rpb24gaGFuZGxlRW5lbWllcygpIHtcblx0XHRlbmVteTEuZHJhdygpO1xuXHRcdGVuZW15MS51cGRhdGUoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGhhbmRsZUdhbWVPdmVyKCkge1xuXHRcdGN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuXHRcdGN0eC5maWxsVGV4dCgnR0FNRSBPVkVSLCB5b3VyIHNjb3JlIGlzICcgKyBzY29yZSwgMTMwLCAyNTApO1xuXHRcdGdhbWVPdmVyID0gdHJ1ZTtcblx0fVxuXG5cdC8vIGFuaW1hdGlvbiBsb29wXG5cdGZ1bmN0aW9uIGFuaW1hdGUoKSB7XG5cdFx0Y3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXHRcdGhhbmRsZUJhY2tncm91bmQoKTtcblx0XHRoYW5kbGVCdWJibGVzKCk7XG5cdFx0cGxheWVyLnVwZGF0ZSgpO1xuXHRcdHBsYXllci5kcmF3KCk7XG5cdFx0aGFuZGxlRW5lbWllcygpO1xuXHRcdGN0eC5maWxsVGV4dChgc2NvcmU6ICR7c2NvcmV9YCwgMTAsIDUwKTtcblx0XHRnYW1lRnJhbWUrKztcblx0XHRpZiAoIWdhbWVPdmVyKSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XG5cdH1cblxuXHRhbmltYXRlKCk7XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIChlKSA9PiB7XG5cdFx0Y2FudmFzUG9zaXRpb24gPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdH0pO1xufSk7XG4iXSwicHJlRXhpc3RpbmdDb21tZW50IjoiLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5kbFluQmhZMnM2THk4dmQyVmljR0ZqYXk5aWIyOTBjM1J5WVhBaUxDSjNaV0p3WVdOck9pOHZMeTR2YzNKakwycHpMMjFoYVc0dWFuTWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqdFJRVUZCTzFGQlEwRTdPMUZCUlVFN1VVRkRRVHM3VVVGRlFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEU3VVVGRFFUczdVVUZGUVR0UlFVTkJPenRSUVVWQk8xRkJRMEU3TzFGQlJVRTdVVUZEUVR0UlFVTkJPenM3VVVGSFFUdFJRVU5CT3p0UlFVVkJPMUZCUTBFN08xRkJSVUU3VVVGRFFUdFJRVU5CTzFGQlEwRXNNRU5CUVRCRExHZERRVUZuUXp0UlFVTXhSVHRSUVVOQk96dFJRVVZCTzFGQlEwRTdVVUZEUVR0UlFVTkJMSGRFUVVGM1JDeHJRa0ZCYTBJN1VVRkRNVVU3VVVGRFFTeHBSRUZCYVVRc1kwRkJZenRSUVVNdlJEczdVVUZGUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEU3VVVGRFFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFc2VVTkJRWGxETEdsRFFVRnBRenRSUVVNeFJTeG5TRUZCWjBnc2JVSkJRVzFDTEVWQlFVVTdVVUZEY2trN1VVRkRRVHM3VVVGRlFUdFJRVU5CTzFGQlEwRTdVVUZEUVN3eVFrRkJNa0lzTUVKQlFUQkNMRVZCUVVVN1VVRkRka1FzYVVOQlFXbERMR1ZCUVdVN1VVRkRhRVE3VVVGRFFUdFJRVU5CT3p0UlFVVkJPMUZCUTBFc2MwUkJRWE5FTEN0RVFVRXJSRHM3VVVGRmNrZzdVVUZEUVRzN08xRkJSMEU3VVVGRFFUczdPenM3T3pzN096czdPMEZEYkVaQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJMRVZCUVVVN08wRkJSVVk3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzU1VGQlNUdEJRVU5LTEVkQlFVYzdRVUZEU0RzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzUlVGQlJUczdRVUZGUmp0QlFVTkJPMEZCUTBFc1JVRkJSVHM3UVVGRlJqdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRTFCUVUwN1FVRkRUanRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxHbEVRVUZwUkRzN1FVRkZha1E3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFbEJRVWs3UVVGRFNqdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk96dEJRVVZCT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeG5Ra0ZCWjBJN1FVRkRhRUk3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFZEJRVWM3TzBGQlJVZzdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRTlCUVU4N1FVRkRVRHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1IwRkJSenRCUVVOSU96dEJRVVZCTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxHTkJRV003TzBGQlJXUTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFdEJRVXM3UVVGRFREdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNlVUpCUVhsQ0xFMUJRVTA3UVVGREwwSTdRVUZEUVR0QlFVTkJPenRCUVVWQk96dEJRVVZCTzBGQlEwRTdRVUZEUVN4RlFVRkZPMEZCUTBZc1EwRkJReUlzSW1acGJHVWlPaUppT0RBd1pEazVZV0V5T1RsbE9EY3hNMlU1T1M1cWN5SXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJaUJjZEM4dklGUm9aU0J0YjJSMWJHVWdZMkZqYUdWY2JpQmNkSFpoY2lCcGJuTjBZV3hzWldSTmIyUjFiR1Z6SUQwZ2UzMDdYRzVjYmlCY2RDOHZJRlJvWlNCeVpYRjFhWEpsSUdaMWJtTjBhVzl1WEc0Z1hIUm1kVzVqZEdsdmJpQmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZLRzF2WkhWc1pVbGtLU0I3WEc1Y2JpQmNkRngwTHk4Z1EyaGxZMnNnYVdZZ2JXOWtkV3hsSUdseklHbHVJR05oWTJobFhHNGdYSFJjZEdsbUtHbHVjM1JoYkd4bFpFMXZaSFZzWlhOYmJXOWtkV3hsU1dSZEtTQjdYRzRnWEhSY2RGeDBjbVYwZFhKdUlHbHVjM1JoYkd4bFpFMXZaSFZzWlhOYmJXOWtkV3hsU1dSZExtVjRjRzl5ZEhNN1hHNGdYSFJjZEgxY2JpQmNkRngwTHk4Z1EzSmxZWFJsSUdFZ2JtVjNJRzF2WkhWc1pTQW9ZVzVrSUhCMWRDQnBkQ0JwYm5SdklIUm9aU0JqWVdOb1pTbGNiaUJjZEZ4MGRtRnlJRzF2WkhWc1pTQTlJR2x1YzNSaGJHeGxaRTF2WkhWc1pYTmJiVzlrZFd4bFNXUmRJRDBnZTF4dUlGeDBYSFJjZEdrNklHMXZaSFZzWlVsa0xGeHVJRngwWEhSY2RHdzZJR1poYkhObExGeHVJRngwWEhSY2RHVjRjRzl5ZEhNNklIdDlYRzRnWEhSY2RIMDdYRzVjYmlCY2RGeDBMeThnUlhobFkzVjBaU0IwYUdVZ2JXOWtkV3hsSUdaMWJtTjBhVzl1WEc0Z1hIUmNkRzF2WkhWc1pYTmJiVzlrZFd4bFNXUmRMbU5oYkd3b2JXOWtkV3hsTG1WNGNHOXlkSE1zSUcxdlpIVnNaU3dnYlc5a2RXeGxMbVY0Y0c5eWRITXNJRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMThwTzF4dVhHNGdYSFJjZEM4dklFWnNZV2NnZEdobElHMXZaSFZzWlNCaGN5QnNiMkZrWldSY2JpQmNkRngwYlc5a2RXeGxMbXdnUFNCMGNuVmxPMXh1WEc0Z1hIUmNkQzh2SUZKbGRIVnliaUIwYUdVZ1pYaHdiM0owY3lCdlppQjBhR1VnYlc5a2RXeGxYRzRnWEhSY2RISmxkSFZ5YmlCdGIyUjFiR1V1Wlhod2IzSjBjenRjYmlCY2RIMWNibHh1WEc0Z1hIUXZMeUJsZUhCdmMyVWdkR2hsSUcxdlpIVnNaWE1nYjJKcVpXTjBJQ2hmWDNkbFluQmhZMnRmYlc5a2RXeGxjMTlmS1Z4dUlGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV0SUQwZ2JXOWtkV3hsY3p0Y2JseHVJRngwTHk4Z1pYaHdiM05sSUhSb1pTQnRiMlIxYkdVZ1kyRmphR1ZjYmlCY2RGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVZeUE5SUdsdWMzUmhiR3hsWkUxdlpIVnNaWE03WEc1Y2JpQmNkQzh2SUdSbFptbHVaU0JuWlhSMFpYSWdablZ1WTNScGIyNGdabTl5SUdoaGNtMXZibmtnWlhod2IzSjBjMXh1SUZ4MFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NWtJRDBnWm5WdVkzUnBiMjRvWlhod2IzSjBjeXdnYm1GdFpTd2daMlYwZEdWeUtTQjdYRzRnWEhSY2RHbG1LQ0ZmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG04b1pYaHdiM0owY3l3Z2JtRnRaU2twSUh0Y2JpQmNkRngwWEhSUFltcGxZM1F1WkdWbWFXNWxVSEp2Y0dWeWRIa29aWGh3YjNKMGN5d2dibUZ0WlN3Z2V5QmxiblZ0WlhKaFlteGxPaUIwY25WbExDQm5aWFE2SUdkbGRIUmxjaUI5S1R0Y2JpQmNkRngwZlZ4dUlGeDBmVHRjYmx4dUlGeDBMeThnWkdWbWFXNWxJRjlmWlhOTmIyUjFiR1VnYjI0Z1pYaHdiM0owYzF4dUlGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV5SUQwZ1puVnVZM1JwYjI0b1pYaHdiM0owY3lrZ2UxeHVJRngwWEhScFppaDBlWEJsYjJZZ1UzbHRZbTlzSUNFOVBTQW5kVzVrWldacGJtVmtKeUFtSmlCVGVXMWliMnd1ZEc5VGRISnBibWRVWVdjcElIdGNiaUJjZEZ4MFhIUlBZbXBsWTNRdVpHVm1hVzVsVUhKdmNHVnlkSGtvWlhod2IzSjBjeXdnVTNsdFltOXNMblJ2VTNSeWFXNW5WR0ZuTENCN0lIWmhiSFZsT2lBblRXOWtkV3hsSnlCOUtUdGNiaUJjZEZ4MGZWeHVJRngwWEhSUFltcGxZM1F1WkdWbWFXNWxVSEp2Y0dWeWRIa29aWGh3YjNKMGN5d2dKMTlmWlhOTmIyUjFiR1VuTENCN0lIWmhiSFZsT2lCMGNuVmxJSDBwTzF4dUlGeDBmVHRjYmx4dUlGeDBMeThnWTNKbFlYUmxJR0VnWm1GclpTQnVZVzFsYzNCaFkyVWdiMkpxWldOMFhHNGdYSFF2THlCdGIyUmxJQ1lnTVRvZ2RtRnNkV1VnYVhNZ1lTQnRiMlIxYkdVZ2FXUXNJSEpsY1hWcGNtVWdhWFJjYmlCY2RDOHZJRzF2WkdVZ0ppQXlPaUJ0WlhKblpTQmhiR3dnY0hKdmNHVnlkR2xsY3lCdlppQjJZV3gxWlNCcGJuUnZJSFJvWlNCdWMxeHVJRngwTHk4Z2JXOWtaU0FtSURRNklISmxkSFZ5YmlCMllXeDFaU0IzYUdWdUlHRnNjbVZoWkhrZ2JuTWdiMkpxWldOMFhHNGdYSFF2THlCdGIyUmxJQ1lnT0h3eE9pQmlaV2hoZG1VZ2JHbHJaU0J5WlhGMWFYSmxYRzRnWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxuUWdQU0JtZFc1amRHbHZiaWgyWVd4MVpTd2diVzlrWlNrZ2UxeHVJRngwWEhScFppaHRiMlJsSUNZZ01Ta2dkbUZzZFdVZ1BTQmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZLSFpoYkhWbEtUdGNiaUJjZEZ4MGFXWW9iVzlrWlNBbUlEZ3BJSEpsZEhWeWJpQjJZV3gxWlR0Y2JpQmNkRngwYVdZb0tHMXZaR1VnSmlBMEtTQW1KaUIwZVhCbGIyWWdkbUZzZFdVZ1BUMDlJQ2R2WW1wbFkzUW5JQ1ltSUhaaGJIVmxJQ1ltSUhaaGJIVmxMbDlmWlhOTmIyUjFiR1VwSUhKbGRIVnliaUIyWVd4MVpUdGNiaUJjZEZ4MGRtRnlJRzV6SUQwZ1QySnFaV04wTG1OeVpXRjBaU2h1ZFd4c0tUdGNiaUJjZEZ4MFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NXlLRzV6S1R0Y2JpQmNkRngwVDJKcVpXTjBMbVJsWm1sdVpWQnliM0JsY25SNUtHNXpMQ0FuWkdWbVlYVnNkQ2NzSUhzZ1pXNTFiV1Z5WVdKc1pUb2dkSEoxWlN3Z2RtRnNkV1U2SUhaaGJIVmxJSDBwTzF4dUlGeDBYSFJwWmlodGIyUmxJQ1lnTWlBbUppQjBlWEJsYjJZZ2RtRnNkV1VnSVQwZ0ozTjBjbWx1WnljcElHWnZjaWgyWVhJZ2EyVjVJR2x1SUhaaGJIVmxLU0JmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG1Rb2JuTXNJR3RsZVN3Z1puVnVZM1JwYjI0b2EyVjVLU0I3SUhKbGRIVnliaUIyWVd4MVpWdHJaWGxkT3lCOUxtSnBibVFvYm5Wc2JDd2dhMlY1S1NrN1hHNGdYSFJjZEhKbGRIVnliaUJ1Y3p0Y2JpQmNkSDA3WEc1Y2JpQmNkQzh2SUdkbGRFUmxabUYxYkhSRmVIQnZjblFnWm5WdVkzUnBiMjRnWm05eUlHTnZiWEJoZEdsaWFXeHBkSGtnZDJsMGFDQnViMjR0YUdGeWJXOXVlU0J0YjJSMWJHVnpYRzRnWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxtNGdQU0JtZFc1amRHbHZiaWh0YjJSMWJHVXBJSHRjYmlCY2RGeDBkbUZ5SUdkbGRIUmxjaUE5SUcxdlpIVnNaU0FtSmlCdGIyUjFiR1V1WDE5bGMwMXZaSFZzWlNBL1hHNGdYSFJjZEZ4MFpuVnVZM1JwYjI0Z1oyVjBSR1ZtWVhWc2RDZ3BJSHNnY21WMGRYSnVJRzF2WkhWc1pWc25aR1ZtWVhWc2RDZGRPeUI5SURwY2JpQmNkRngwWEhSbWRXNWpkR2x2YmlCblpYUk5iMlIxYkdWRmVIQnZjblJ6S0NrZ2V5QnlaWFIxY200Z2JXOWtkV3hsT3lCOU8xeHVJRngwWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxtUW9aMlYwZEdWeUxDQW5ZU2NzSUdkbGRIUmxjaWs3WEc0Z1hIUmNkSEpsZEhWeWJpQm5aWFIwWlhJN1hHNGdYSFI5TzF4dVhHNGdYSFF2THlCUFltcGxZM1F1Y0hKdmRHOTBlWEJsTG1oaGMwOTNibEJ5YjNCbGNuUjVMbU5oYkd4Y2JpQmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1YnlBOUlHWjFibU4wYVc5dUtHOWlhbVZqZEN3Z2NISnZjR1Z5ZEhrcElIc2djbVYwZFhKdUlFOWlhbVZqZEM1d2NtOTBiM1I1Y0dVdWFHRnpUM2R1VUhKdmNHVnlkSGt1WTJGc2JDaHZZbXBsWTNRc0lIQnliM0JsY25SNUtUc2dmVHRjYmx4dUlGeDBMeThnWDE5M1pXSndZV05yWDNCMVlteHBZMTl3WVhSb1gxOWNiaUJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWNDQTlJRndpWENJN1hHNWNibHh1SUZ4MEx5OGdURzloWkNCbGJuUnllU0J0YjJSMWJHVWdZVzVrSUhKbGRIVnliaUJsZUhCdmNuUnpYRzRnWEhSeVpYUjFjbTRnWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHloZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxuTWdQU0JjSWk0dmMzSmpMMnB6TDIxaGFXNHVhbk5jSWlrN1hHNGlMQ0prYjJOMWJXVnVkQzVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLQ2RFVDAxRGIyNTBaVzUwVEc5aFpHVmtKeXdnWm5WdVkzUnBiMjRnS0NrZ2UxeHVYSFIzYVc1a2IzY3VZV1JrUlhabGJuUk1hWE4wWlc1bGNpZ25iRzloWkNjc0lDaGxLU0E5UGlCN1hHNWNkRngwWTI5dWMzUWdjSEpsYkc5aFpDQTlJR1J2WTNWdFpXNTBMbkYxWlhKNVUyVnNaV04wYjNJb0p5NXdjbVZzYjJGa0p5azdYRzVjYmx4MFhIUndjbVZzYjJGa0xtTnNZWE56VEdsemRDNWhaR1FvSjNCeVpXeHZZV1F0Wm1sdWFYTm9aV1FuS1R0Y2JseDBmU2s3WEc1Y2JseDBZMjl1YzNRZ1luUnVVMk55YjJ4c1ZHOVViM0FnUFNCa2IyTjFiV1Z1ZEM1blpYUkZiR1Z0Wlc1MFFubEpaQ2duWW5SdVUyTnliMnhzVkc5VWIzQW5LVHRjYmx4dVhIUnBaaUFvWW5SdVUyTnliMnhzVkc5VWIzQXBJSHRjYmx4MFhIUmlkRzVUWTNKdmJHeFViMVJ2Y0M1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0NkamJHbGpheWNzSUNobEtTQTlQaUI3WEc1Y2RGeDBYSFIzYVc1a2IzY3VjMk55YjJ4c1ZHOG9lMXh1WEhSY2RGeDBYSFIwYjNBNklEQXNYRzVjZEZ4MFhIUmNkR3hsWm5RNklEQXNYRzVjZEZ4MFhIUmNkR0psYUdGMmFXOXlPaUFuYzIxdmIzUm9KeXhjYmx4MFhIUmNkSDBwTzF4dVhIUmNkSDBwTzF4dVhIUjlYRzVjYmx4MEx5OGdZMkZ1ZG1GeklITmxkSFZ3WEc1Y2RHTnZibk4wSUdOaGJuWmhjeUE5SUdSdlkzVnRaVzUwTG1kbGRFVnNaVzFsYm5SQ2VVbGtLQ2RqWVc1MllYTXhKeWs3WEc1Y2RHTnZibk4wSUdOMGVDQTlJR05oYm5aaGN5NW5aWFJEYjI1MFpYaDBLQ2N5WkNjcE8xeHVYSFJqWVc1MllYTXVkMmxrZEdnZ1BTQTRNREE3WEc1Y2RHTmhiblpoY3k1b1pXbG5hSFFnUFNBMU1EQTdYRzVjYmx4MGJHVjBJSE5qYjNKbElEMGdNRHRjYmx4MGJHVjBJR2RoYldWR2NtRnRaU0E5SURBN1hHNWNkR04wZUM1bWIyNTBJRDBnSnpRd2NIZ2dSMlZ2Y21kcFlTYzdYRzVjZEd4bGRDQm5ZVzFsVTNCbFpXUWdQU0JOWVhSb0xtWnNiMjl5S0UxaGRHZ3VjbUZ1Wkc5dEtDa2dLaUEwSUNzZ01TazdYRzVjZEd4bGRDQm5ZVzFsVDNabGNpQTlJR1poYkhObE8xeHVYRzVjZEM4dklHMXZkWE5sSUdsdWRHVnlZV04wYVhacGRIbGNibHgwYkdWMElHTmhiblpoYzFCdmMybDBhVzl1SUQwZ1kyRnVkbUZ6TG1kbGRFSnZkVzVrYVc1blEyeHBaVzUwVW1WamRDZ3BPMXh1WEc1Y2RHTnZibk4wSUcxdmRYTmxJRDBnZTF4dVhIUmNkSGc2SURFd01DeGNibHgwWEhSNU9pQmpZVzUyWVhNdWFHVnBaMmgwSUMwZ01UQXdMRnh1WEhSY2RHTnNhV05yT2lCbVlXeHpaU3hjYmx4MGZUdGNibHh1WEhSallXNTJZWE11WVdSa1JYWmxiblJNYVhOMFpXNWxjaWduYlc5MWMyVmtiM2R1Snl3Z0tHVXBJRDArSUh0Y2JseDBYSFJ0YjNWelpTNWpiR2xqYXlBOUlIUnlkV1U3WEc1Y2RGeDBiVzkxYzJVdWVDQTlJR1V1ZUNBdElHTmhiblpoYzFCdmMybDBhVzl1TG14bFpuUTdYRzVjZEZ4MGJXOTFjMlV1ZVNBOUlHVXVlU0F0SUdOaGJuWmhjMUJ2YzJsMGFXOXVMblJ2Y0R0Y2JseDBmU2s3WEc1Y2JseDBZMkZ1ZG1GekxtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb0oyMXZkWE5sZFhBbkxDQW9aU2tnUFQ0Z2UxeHVYSFJjZEcxdmRYTmxMbU5zYVdOcklEMGdabUZzYzJVN1hHNWNkSDBwTzF4dVhHNWNkQzh2SUhCc1lYbGxjaUJqYUdGeVlXTjBaWEpjYmx4MFkyOXVjM1FnY0d4aGVXVnlUR1ZtZENBOUlHNWxkeUJKYldGblpTZ3BPMXh1WEhSd2JHRjVaWEpNWldaMExuTnlZeUE5SUNjdUwyRnpjMlYwY3k5cGJXRm5aWE12Ylc5dWMzUmxjbGRoYkd0TVpXWjBMbkJ1WnljN1hHNWNkR052Ym5OMElIQnNZWGxsY2xKcFoyaDBJRDBnYm1WM0lFbHRZV2RsS0NrN1hHNWNkSEJzWVhsbGNsSnBaMmgwTG5OeVl5QTlJQ2N1TDJGemMyVjBjeTlwYldGblpYTXZiVzl1YzNSbGNsZGhiR3RTYVdkb2RDNXdibWNuTzF4dVhHNWNkR05zWVhOeklGQnNZWGxsY2lCN1hHNWNkRngwWTI5dWMzUnlkV04wYjNJb0tTQjdYRzVjZEZ4MFhIUjBhR2x6TG5nZ1BTQXhNREE3WEc1Y2RGeDBYSFIwYUdsekxua2dQU0JqWVc1MllYTXVhR1ZwWjJoMElDMGdNVEF3TzF4dVhIUmNkRngwZEdocGN5NXlZV1JwZFhNZ1BTQTFNRHRjYmx4MFhIUmNkSFJvYVhNdVlXNW5iR1VnUFNBd08xeHVYSFJjZEZ4MGRHaHBjeTVtY21GdFpWZ2dQU0F3TzF4dVhIUmNkRngwZEdocGN5NW1jbUZ0WlZrZ1BTQXdPMXh1WEhSY2RGeDBkR2hwY3k1bWNtRnRaU0E5SURBN1hHNWNkRngwWEhSMGFHbHpMbk53Y21sMFpWZHBaSFJvSUQwZ05UYzFPMXh1WEhSY2RGeDBkR2hwY3k1emNISnBkR1ZJWldsbmFIUWdQU0ExTkRJN1hHNWNkRngwZlZ4dVhHNWNkRngwZFhCa1lYUmxLQ2tnZTF4dVhIUmNkRngwWTI5dWMzUWdaSGdnUFNCMGFHbHpMbmdnTFNCdGIzVnpaUzU0TzF4dVhIUmNkRngwWTI5dWMzUWdaSGtnUFNCMGFHbHpMbmtnTFNCdGIzVnpaUzU1TzF4dVhIUmNkRngwYkdWMElIUm9aWFJoSUQwZ1RXRjBhQzVoZEdGdU1paGtlU3dnWkhncE8xeHVYSFJjZEZ4MGRHaHBjeTVoYm1kc1pTQTlJSFJvWlhSaE8xeHVYRzVjZEZ4MFhIUnBaaUFvYlc5MWMyVXVlQ0FoUFNCMGFHbHpMbmdwSUh0Y2JseDBYSFJjZEZ4MGRHaHBjeTU0SUMwOUlHUjRJQzhnTWpBN1hHNWNkRngwWEhSOVhHNWNkRngwWEhScFppQW9iVzkxYzJVdWVTQWhQU0IwYUdsekxua3BJSHRjYmx4MFhIUmNkRngwZEdocGN5NTVJQzA5SUdSNUlDOGdNakE3WEc1Y2RGeDBYSFI5WEc1Y2JseDBYSFJjZEdsbUlDaHRiM1Z6WlM1amJHbGpheUE5UFNCMGNuVmxLU0I3WEc1Y2RGeDBYSFJjZEdsbUlDaG5ZVzFsUm5KaGJXVWdKU0EwSUQwOUlEQXBJSHRjYmx4MFhIUmNkRngwWEhSMGFHbHpMbVp5WVcxbEt5czdYRzVjYmx4MFhIUmNkRngwWEhScFppQW9kR2hwY3k1bWNtRnRaU0ErUFNBeE5pa2dkR2hwY3k1bWNtRnRaU0E5SURBN1hHNWNkRngwWEhSY2RGeDBhV1lnS0Z4dVhIUmNkRngwWEhSY2RGeDBkR2hwY3k1bWNtRnRaU0E5UFNBeklIeDhYRzVjZEZ4MFhIUmNkRngwWEhSMGFHbHpMbVp5WVcxbElEMDlJRGNnZkh4Y2JseDBYSFJjZEZ4MFhIUmNkSFJvYVhNdVpuSmhiV1VnUFQwZ01URWdmSHhjYmx4MFhIUmNkRngwWEhSY2RIUm9hWE11Wm5KaGJXVWdQVDBnTVRWY2JseDBYSFJjZEZ4MFhIUXBJSHRjYmx4MFhIUmNkRngwWEhSY2RIUm9hWE11Wm5KaGJXVllJRDBnTUR0Y2JseDBYSFJjZEZ4MFhIUjlJR1ZzYzJVZ2UxeHVYSFJjZEZ4MFhIUmNkRngwZEdocGN5NW1jbUZ0WlZnckt6dGNibHgwWEhSY2RGeDBYSFI5WEc1Y2JseDBYSFJjZEZ4MFhIUnBaaUFvZEdocGN5NW1jbUZ0WlNBOElETXBJSFJvYVhNdVpuSmhiV1ZaSUQwZ01EdGNibHgwWEhSY2RGeDBYSFJsYkhObElHbG1JQ2gwYUdsekxtWnlZVzFsSUR3Z055a2dkR2hwY3k1bWNtRnRaVmtnUFNBeE8xeHVYSFJjZEZ4MFhIUmNkR1ZzYzJVZ2FXWWdLSFJvYVhNdVpuSmhiV1VnUENBeE1Ta2dkR2hwY3k1bWNtRnRaVmtnUFNBeU8xeHVYSFJjZEZ4MFhIUmNkR1ZzYzJVZ2FXWWdLSFJvYVhNdVpuSmhiV1VnUENBeE5Ta2dkR2hwY3k1bWNtRnRaVmtnUFNBek8xeHVYSFJjZEZ4MFhIUmNkR1ZzYzJVZ2RHaHBjeTVtY21GdFpWa2dQU0F3TzF4dVhIUmNkRngwWEhSOVhHNWNkRngwWEhSOVhHNWNkRngwZlZ4dVhHNWNkRngwWkhKaGR5Z3BJSHRjYmx4MFhIUmNkR2xtSUNodGIzVnpaUzVqYkdsamF5a2dlMXh1WEhSY2RGeDBYSFJqZEhndWJHbHVaVmRwWkhSb0lEMGdNQzR5TzF4dVhIUmNkRngwWEhSamRIZ3VZbVZuYVc1UVlYUm9LQ2s3WEc1Y2RGeDBYSFJjZEdOMGVDNXRiM1psVkc4b2RHaHBjeTU0TENCMGFHbHpMbmtwTzF4dVhIUmNkRngwWEhSamRIZ3ViR2x1WlZSdktHMXZkWE5sTG5nc0lHMXZkWE5sTG5rcE8xeHVYSFJjZEZ4MGZWeHVYRzVjZEZ4MFhIUXZLaUJjZEdOMGVDNW1hV3hzVTNSNWJHVWdQU0FuY21Wa0p6dGNibHgwWEhSY2RHTjBlQzVpWldkcGJsQmhkR2dvS1R0Y2JseDBYSFJjZEdOMGVDNWhjbU1vZEdocGN5NTRMQ0IwYUdsekxua3NJSFJvYVhNdWNtRmthWFZ6TENBd0xDQk5ZWFJvTGxCSklDb2dNaWs3WEc1Y2RGeDBYSFJqZEhndVptbHNiQ2dwTzF4dVhIUmNkRngwWTNSNExtTnNiM05sVUdGMGFDZ3BPMXh1WEhSY2RGeDBZM1I0TG1acGJHeFNaV04wS0hSb2FYTXVlQ3dnZEdocGN5NTVMQ0IwYUdsekxuSmhaR2wxY3l3Z01UQXBPeUFxTDF4dVhHNWNkRngwWEhSamRIZ3VjMkYyWlNncE8xeHVYSFJjZEZ4MFkzUjRMblJ5WVc1emJHRjBaU2gwYUdsekxuZ3NJSFJvYVhNdWVTazdYRzVjZEZ4MFhIUmpkSGd1Y205MFlYUmxLSFJvYVhNdVlXNW5iR1VwTzF4dVhHNWNkRngwWEhScFppQW9kR2hwY3k1NElENDlJRzF2ZFhObExuZ3BJSHRjYmx4MFhIUmNkRngwWTNSNExtUnlZWGRKYldGblpTaGNibHgwWEhSY2RGeDBYSFJ3YkdGNVpYSk1aV1owTEZ4dVhIUmNkRngwWEhSY2RIUm9hWE11Wm5KaGJXVllJQ29nZEdocGN5NXpjSEpwZEdWWGFXUjBhQ3hjYmx4MFhIUmNkRngwWEhSMGFHbHpMbVp5WVcxbFdTQXFJSFJvYVhNdWMzQnlhWFJsU0dWcFoyaDBMRnh1WEhSY2RGeDBYSFJjZEhSb2FYTXVjM0J5YVhSbFYybGtkR2dzWEc1Y2RGeDBYSFJjZEZ4MGRHaHBjeTV6Y0hKcGRHVklaV2xuYUhRc1hHNWNkRngwWEhSY2RGeDBNQ0F0SURVMUxGeHVYSFJjZEZ4MFhIUmNkREFnTFNBMU1DeGNibHgwWEhSY2RGeDBYSFIwYUdsekxuTndjbWwwWlZkcFpIUm9JQzhnTlN4Y2JseDBYSFJjZEZ4MFhIUjBhR2x6TG5Od2NtbDBaVWhsYVdkb2RDQXZJRFZjYmx4MFhIUmNkRngwS1R0Y2JseDBYSFJjZEgwZ1pXeHpaU0I3WEc1Y2RGeDBYSFJjZEdOMGVDNWtjbUYzU1cxaFoyVW9YRzVjZEZ4MFhIUmNkRngwY0d4aGVXVnlVbWxuYUhRc1hHNWNkRngwWEhSY2RGeDBkR2hwY3k1bWNtRnRaVmdnS2lCMGFHbHpMbk53Y21sMFpWZHBaSFJvTEZ4dVhIUmNkRngwWEhSY2RIUm9hWE11Wm5KaGJXVlpJQ29nZEdocGN5NXpjSEpwZEdWSVpXbG5hSFFzWEc1Y2RGeDBYSFJjZEZ4MGRHaHBjeTV6Y0hKcGRHVlhhV1IwYUN4Y2JseDBYSFJjZEZ4MFhIUjBhR2x6TG5Od2NtbDBaVWhsYVdkb2RDeGNibHgwWEhSY2RGeDBYSFF3SUMwZ05qQXNYRzVjZEZ4MFhIUmNkRngwTUNBdElEVTFMRnh1WEhSY2RGeDBYSFJjZEhSb2FYTXVjM0J5YVhSbFYybGtkR2dnTHlBMUxGeHVYSFJjZEZ4MFhIUmNkSFJvYVhNdWMzQnlhWFJsU0dWcFoyaDBJQzhnTlZ4dVhIUmNkRngwWEhRcE8xeHVYSFJjZEZ4MGZWeHVYRzVjZEZ4MFhIUmpkSGd1Y21WemRHOXlaU2dwTzF4dVhIUmNkSDFjYmx4MGZWeHVYRzVjZEdOdmJuTjBJSEJzWVhsbGNpQTlJRzVsZHlCUWJHRjVaWElvS1R0Y2JseHVYSFF2THlCcGJuUmxjbUZqZEdsMlpTQmxiR1Z0Wlc1MGMxeHVYSFJqYjI1emRDQmxiR1Z0Wlc1MGMwRnljbUY1SUQwZ1cxMDdYRzVjZEdOdmJuTjBJR1p5ZFdsMFNXMWhaMlVnUFNCdVpYY2dTVzFoWjJVb0tUdGNibHgwWm5KMWFYUkpiV0ZuWlM1emNtTWdQU0FuTGk5aGMzTmxkSE12YVcxaFoyVnpMMkZ3Y0d4bExuQnVaeWM3WEc1Y2JseDBZMnhoYzNNZ1FuVmlZbXhsSUh0Y2JseDBYSFJqYjI1emRISjFZM1J2Y2lncElIdGNibHgwWEhSY2RIUm9hWE11ZUNBOUlFMWhkR2d1Y21GdVpHOXRLQ2tnS2lCallXNTJZWE11ZDJsa2RHZzdYRzVjZEZ4MFhIUjBhR2x6TG5rZ1BTQXRNVEF3TzF4dVhIUmNkRngwZEdocGN5NXlZV1JwZFhNZ1BTQTFNRHRjYmx4MFhIUmNkSFJvYVhNdWMzQmxaV1FnUFNCTllYUm9MbkpoYm1SdmJTZ3BJQ29nTlNBcklERTdYRzVjZEZ4MFhIUjBhR2x6TG1ScGMzUmhibU5sTzF4dVhIUmNkRngwZEdocGN5NWpiM1Z1ZEdWa0lEMGdabUZzYzJVN1hHNWNkRngwWEhSMGFHbHpMbk52ZFc1a0lEMGdUV0YwYUM1eVlXNWtiMjBvS1NBOFBTQXdMalVnUHlBbmMyOTFibVF4SnlBNklDZHpiM1Z1WkRJbk8xeHVYSFJjZEgxY2JseHVYSFJjZEhWd1pHRjBaU2dwSUh0Y2JseDBYSFJjZEhSb2FYTXVlU0FyUFNCMGFHbHpMbk53WldWa08xeHVYSFJjZEZ4MFkyOXVjM1FnWkhnZ1BTQjBhR2x6TG5nZ0xTQndiR0Y1WlhJdWVEdGNibHgwWEhSY2RHTnZibk4wSUdSNUlEMGdkR2hwY3k1NUlDMGdjR3hoZVdWeUxuazdYRzVjZEZ4MFhIUjBhR2x6TG1ScGMzUmhibU5sSUQwZ1RXRjBhQzV6Y1hKMEtHUjRJQ29nWkhnZ0t5QmtlU0FxSUdSNUtUdGNibHgwWEhSOVhHNWNibHgwWEhSa2NtRjNLQ2tnZTF4dVhIUmNkRngwTHlvZ1kzUjRMbVpwYkd4VGRIbHNaU0E5SUNkaWJIVmxKenRjYmx4MFhIUmNkR04wZUM1aVpXZHBibEJoZEdnb0tUdGNibHgwWEhSY2RHTjBlQzVoY21Nb2RHaHBjeTU0TENCMGFHbHpMbmtzSUhSb2FYTXVjbUZrYVhWekxDQXdMQ0JOWVhSb0xsQkpJQ29nTWlrN1hHNWNkRngwWEhSamRIZ3VabWxzYkNncE8xeHVYSFJjZEZ4MFkzUjRMbU5zYjNObFVHRjBhQ2dwTzF4dVhIUmNkRngwWTNSNExuTjBjbTlyWlNncE95QXFMMXh1WEhSY2RGeDBZM1I0TG1SeVlYZEpiV0ZuWlNoY2JseDBYSFJjZEZ4MFpuSjFhWFJKYldGblpTeGNibHgwWEhSY2RGeDBkR2hwY3k1NElDMGdOVEFzWEc1Y2RGeDBYSFJjZEhSb2FYTXVlU0F0SURVd0xGeHVYSFJjZEZ4MFhIUjBhR2x6TG5KaFpHbDFjeUFxSURJc1hHNWNkRngwWEhSY2RIUm9hWE11Y21Ga2FYVnpJQ29nTWx4dVhIUmNkRngwS1R0Y2JseDBYSFI5WEc1Y2RIMWNibHh1WEhSamIyNXpkQ0JpZFdKaWJHVlFiM0F4SUQwZ1pHOWpkVzFsYm5RdVkzSmxZWFJsUld4bGJXVnVkQ2duWVhWa2FXOG5LVHRjYmx4MFluVmlZbXhsVUc5d01TNXpjbU1nUFNBbkxpOXpiM1Z1WkhNdlpXRjBYekF4TG05blp5YzdYRzVjZEdOdmJuTjBJR0oxWW1Kc1pWQnZjRElnUFNCa2IyTjFiV1Z1ZEM1amNtVmhkR1ZGYkdWdFpXNTBLQ2RoZFdScGJ5Y3BPMXh1WEhSaWRXSmliR1ZRYjNBeUxuTnlZeUE5SUNjdUwzTnZkVzVrY3k5bFlYUmZNRFF1YjJkbkp6dGNibHh1WEhSbWRXNWpkR2x2YmlCb1lXNWtiR1ZDZFdKaWJHVnpLQ2tnZTF4dVhIUmNkR2xtSUNobllXMWxSbkpoYldVZ0pTQTFNQ0E5UFNBd0tTQjdYRzVjZEZ4MFhIUmxiR1Z0Wlc1MGMwRnljbUY1TG5CMWMyZ29ibVYzSUVKMVltSnNaU2dwS1R0Y2JseDBYSFI5WEc1Y2JseDBYSFJsYkdWdFpXNTBjMEZ5Y21GNUxtWnZja1ZoWTJnb0tHSjFZbUpzWlNrZ1BUNGdlMXh1WEhSY2RGeDBZblZpWW14bExuVndaR0YwWlNncE8xeHVYSFJjZEZ4MFluVmlZbXhsTG1SeVlYY29LVHRjYmx4MFhIUjlLVHRjYmx4dVhIUmNkR1ZzWlcxbGJuUnpRWEp5WVhrdVptOXlSV0ZqYUNnb1luVmlZbXhsTENCcGJtUmxlQ2tnUFQ0Z2UxeHVYSFJjZEZ4MGFXWWdLR0oxWW1Kc1pTNTVJRHdnTUNBdElHSjFZbUpzWlM1eVlXUnBkWE1nS2lBeUtTQjdYRzVjZEZ4MFhIUmNkR1ZzWlcxbGJuUnpRWEp5WVhrdWMzQnNhV05sS0dsdVpHVjRMQ0F4S1R0Y2JseDBYSFJjZEgxY2JseHVYSFJjZEZ4MGFXWWdLR0oxWW1Kc1pTa2dlMXh1WEhSY2RGeDBYSFJwWmlBb1luVmlZbXhsTG1ScGMzUmhibU5sSUR3Z1luVmlZbXhsTG5KaFpHbDFjeUFySUhCc1lYbGxjaTV5WVdScGRYTXBJSHRjYmx4MFhIUmNkRngwWEhScFppQW9JV0oxWW1Kc1pTNWpiM1Z1ZEdWa0tTQjdYRzVjZEZ4MFhIUmNkRngwWEhScFppQW9ZblZpWW14bExuTnZkVzVrSUQwOUlDZHpiM1Z1WkRFbktTQjdYRzVjZEZ4MFhIUmNkRngwWEhSY2RHSjFZbUpzWlZCdmNERXVjR3hoZVNncE8xeHVYSFJjZEZ4MFhIUmNkRngwZlNCbGJITmxJSHRjYmx4MFhIUmNkRngwWEhSY2RGeDBZblZpWW14bFVHOXdNaTV3YkdGNUtDazdYRzVjZEZ4MFhIUmNkRngwWEhSOVhHNWNkRngwWEhSY2RGeDBYSFJ6WTI5eVpTc3JPMXh1WEhSY2RGeDBYSFJjZEZ4MFluVmlZbXhsTG1OdmRXNTBaV1FnUFNCMGNuVmxPMXh1WEhSY2RGeDBYSFJjZEZ4MFpXeGxiV1Z1ZEhOQmNuSmhlUzV6Y0d4cFkyVW9hVzVrWlhnc0lERXBPMXh1WEhSY2RGeDBYSFJjZEgxY2JseDBYSFJjZEZ4MGZWeHVYSFJjZEZ4MGZWeHVYSFJjZEgwcE8xeHVYSFI5WEc1Y2JseDBMeThnY21Wd1pXRjBhVzVuSUdKaFkydG5jbTkxYm1SY2JseDBZMjl1YzNRZ1ltRmphMmR5YjNWdVpDQTlJRzVsZHlCSmJXRm5aU2dwTzF4dVhIUmlZV05yWjNKdmRXNWtMbk55WXlBOUlDY3VMMkZ6YzJWMGN5OXBiV0ZuWlhNdmNHRnlZV3hzWVhndFptOXlaWE4wTFdKaFkyc3RkSEpsWlhNdWNHNW5KenRjYmx4dVhIUmpiMjV6ZENCaVlXTnJaM0p2ZFc1a01pQTlJRzVsZHlCSmJXRm5aU2dwTzF4dVhIUmlZV05yWjNKdmRXNWtNaTV6Y21NZ1BTQW5MaTloYzNObGRITXZhVzFoWjJWekwzQmhjbUZzYkdGNExXWnZjbVZ6ZEMxbWNtOXVkQzEwY21WbGN5NXdibWNuTzF4dVhHNWNkR052Ym5OMElHSmhZMnRuY205MWJtUXpJRDBnYm1WM0lFbHRZV2RsS0NrN1hHNWNkR0poWTJ0bmNtOTFibVF6TG5OeVl5QTlJQ2N1TDJGemMyVjBjeTlwYldGblpYTXZjR0Z5WVd4c1lYZ3RabTl5WlhOMExXeHBaMmgwY3k1d2JtY25PMXh1WEc1Y2RHTnZibk4wSUdKaFkydG5jbTkxYm1RMElEMGdibVYzSUVsdFlXZGxLQ2s3WEc1Y2RHSmhZMnRuY205MWJtUTBMbk55WXlBOUlDY3VMMkZ6YzJWMGN5OXBiV0ZuWlhNdmNHRnlZV3hzWVhndFptOXlaWE4wTFcxcFpHUnNaUzEwY21WbGN5NXdibWNuTzF4dVhHNWNkR052Ym5OMElFSkhJRDBnZTF4dVhIUmNkSGd4T2lBd0xGeHVYSFJjZEhneU9pQmpZVzUyWVhNdWQybGtkR2dzWEc1Y2RGeDBlVG9nTUN4Y2JseDBYSFIzYVdSMGFEb2dZMkZ1ZG1GekxuZHBaSFJvTEZ4dVhIUmNkR2hsYVdkb2REb2dZMkZ1ZG1GekxtaGxhV2RvZEN4Y2JseDBmVHRjYmx4dVhIUm1kVzVqZEdsdmJpQm9ZVzVrYkdWQ1lXTnJaM0p2ZFc1a0tDa2dlMXh1WEhSY2RFSkhMbmd4SUMwOUlHZGhiV1ZUY0dWbFpEdGNibHgwWEhScFppQW9Ra2N1ZURFZ1BDQXRRa2N1ZDJsa2RHZ3BJRUpITG5neElEMGdRa2N1ZDJsa2RHZzdYRzVjYmx4MFhIUmpkSGd1WkhKaGQwbHRZV2RsS0dKaFkydG5jbTkxYm1Rc0lFSkhMbmd4TENCQ1J5NTVMQ0JDUnk1M2FXUjBhQ3dnUWtjdWFHVnBaMmgwS1R0Y2JseDBYSFJqZEhndVpISmhkMGx0WVdkbEtHSmhZMnRuY205MWJtUXpMQ0JDUnk1NE1Td2dRa2N1ZVN3Z1FrY3VkMmxrZEdnc0lFSkhMbWhsYVdkb2RDazdYRzVjZEZ4MFkzUjRMbVJ5WVhkSmJXRm5aU2hpWVdOclozSnZkVzVrTkN3Z1FrY3VlREVzSUVKSExua3NJRUpITG5kcFpIUm9MQ0JDUnk1b1pXbG5hSFFwTzF4dVhIUmNkR04wZUM1a2NtRjNTVzFoWjJVb1ltRmphMmR5YjNWdVpESXNJRUpITG5neExDQkNSeTU1TENCQ1J5NTNhV1IwYUN3Z1FrY3VhR1ZwWjJoMEtUdGNibHh1WEhSY2RFSkhMbmd5SUMwOUlHZGhiV1ZUY0dWbFpEdGNibHgwWEhScFppQW9Ra2N1ZURJZ1BDQXRRa2N1ZDJsa2RHZ3BJRUpITG5neUlEMGdRa2N1ZDJsa2RHZzdYRzVjZEZ4MFkzUjRMbVJ5WVhkSmJXRm5aU2hpWVdOclozSnZkVzVrTENCQ1J5NTRNaXdnUWtjdWVTd2dRa2N1ZDJsa2RHZ3NJRUpITG1obGFXZG9kQ2s3WEc1Y2RGeDBZM1I0TG1SeVlYZEpiV0ZuWlNoaVlXTnJaM0p2ZFc1a015d2dRa2N1ZURJc0lFSkhMbmtzSUVKSExuZHBaSFJvTENCQ1J5NW9aV2xuYUhRcE8xeHVYSFJjZEdOMGVDNWtjbUYzU1cxaFoyVW9ZbUZqYTJkeWIzVnVaRFFzSUVKSExuZ3lMQ0JDUnk1NUxDQkNSeTUzYVdSMGFDd2dRa2N1YUdWcFoyaDBLVHRjYmx4MFhIUmpkSGd1WkhKaGQwbHRZV2RsS0dKaFkydG5jbTkxYm1ReUxDQkNSeTU0TWl3Z1FrY3VlU3dnUWtjdWQybGtkR2dzSUVKSExtaGxhV2RvZENrN1hHNWNkSDFjYmx4dVhIUXZMeUJsYm1WdGFXVnpYRzVjZEdOdmJuTjBJR1Z1WlcxNVNXMWhaMlVnUFNCdVpYY2dTVzFoWjJVb0tUdGNibHgwWlc1bGJYbEpiV0ZuWlM1emNtTWdQU0FuTGk5aGMzTmxkSE12YVcxaFoyVnpMM051YjNkaVlXeHNYM053Y21sMFpYTm9aV1YwWHpONE1pNXdibWNuTzF4dVhHNWNkR05zWVhOeklFVnVaVzE1SUh0Y2JseDBYSFJqYjI1emRISjFZM1J2Y2lncElIdGNibHgwWEhSY2RIUm9hWE11ZUNBOUlHTmhiblpoY3k1M2FXUjBhQ0FySURJd01EdGNibHgwWEhSY2RIUm9hWE11ZVNBOUlFMWhkR2d1Y21GdVpHOXRLQ2tnS2lBb1kyRnVkbUZ6TG1obGFXZG9kQ0F0SURFMU1Da2dLeUE1TUR0Y2JseDBYSFJjZEhSb2FYTXVjbUZrYVhWeklEMGdOREE3WEc1Y2RGeDBYSFIwYUdsekxuTndaV1ZrSUQwZ1RXRjBhQzV5WVc1a2IyMG9LU0FxSURJZ0t5QXlPMXh1WEhSY2RGeDBkR2hwY3k1bWNtRnRaU0E5SURBN1hHNWNkRngwWEhSMGFHbHpMbVp5WVcxbFdDQTlJREE3WEc1Y2RGeDBYSFIwYUdsekxtWnlZVzFsV1NBOUlEQTdYRzVjZEZ4MFhIUjBhR2x6TG5Od2NtbDBaVmRwWkhSb0lEMGdOVEV5TzF4dVhIUmNkRngwZEdocGN5NXpjSEpwZEdWSVpXbG5hSFFnUFNBek9EVXVOVHRjYmx4MFhIUjlYRzVjYmx4MFhIUmtjbUYzS0NrZ2UxeHVYSFJjZEZ4MEx5b2dZM1I0TG1acGJHeFRkSGxzWlNBOUlDZHlaV1FuTzF4dVhIUmNkRngwWTNSNExtSmxaMmx1VUdGMGFDZ3BPMXh1WEhSY2RGeDBZM1I0TG1GeVl5aDBhR2x6TG5nc0lIUm9hWE11ZVN3Z2RHaHBjeTV5WVdScGRYTXNJREFzSUUxaGRHZ3VVRWtnS2lBeUtUdGNibHgwWEhSY2RHTjBlQzVtYVd4c0tDazdJQ292WEc1Y2JseDBYSFJjZEdOMGVDNWtjbUYzU1cxaFoyVW9YRzVjZEZ4MFhIUmNkR1Z1WlcxNVNXMWhaMlVzWEc1Y2RGeDBYSFJjZEhSb2FYTXVabkpoYldWWUlDb2dkR2hwY3k1emNISnBkR1ZYYVdSMGFDeGNibHgwWEhSY2RGeDBkR2hwY3k1bWNtRnRaVmtnS2lCMGFHbHpMbk53Y21sMFpVaGxhV2RvZEN4Y2JseDBYSFJjZEZ4MGRHaHBjeTV6Y0hKcGRHVlhhV1IwYUN4Y2JseDBYSFJjZEZ4MGRHaHBjeTV6Y0hKcGRHVklaV2xuYUhRc1hHNWNkRngwWEhSY2RIUm9hWE11ZUNBdElEUTFMRnh1WEhSY2RGeDBYSFIwYUdsekxua2dMU0EyT0N4Y2JseDBYSFJjZEZ4MGRHaHBjeTV6Y0hKcGRHVlhhV1IwYUNBdklETXNYRzVjZEZ4MFhIUmNkSFJvYVhNdWMzQnlhWFJsU0dWcFoyaDBJQzhnTTF4dVhIUmNkRngwS1R0Y2JseDBYSFI5WEc1Y2JseDBYSFIxY0dSaGRHVW9LU0I3WEc1Y2RGeDBYSFIwYUdsekxuZ2dMVDBnZEdocGN5NXpjR1ZsWkR0Y2JseHVYSFJjZEZ4MGFXWWdLSFJvYVhNdWVDQThJREFnTFNCMGFHbHpMbkpoWkdsMWN5QXFJRElwSUh0Y2JseDBYSFJjZEZ4MGRHaHBjeTU0SUQwZ1kyRnVkbUZ6TG5kcFpIUm9JQ3NnTWpBd08xeHVYSFJjZEZ4MFhIUjBhR2x6TG5rZ1BTQk5ZWFJvTG5KaGJtUnZiU2dwSUNvZ0tHTmhiblpoY3k1b1pXbG5hSFFnTFNBeE5UQXBJQ3NnT1RBN1hHNWNkRngwWEhSY2RIUm9hWE11YzNCbFpXUWdQU0JOWVhSb0xuSmhibVJ2YlNncElDb2dNaUFySURJN1hHNWNkRngwWEhSOVhHNWNibHgwWEhSY2RHbG1JQ2huWVcxbFJuSmhiV1VnSlNBMUlEMDlJREFwSUh0Y2JseDBYSFJjZEZ4MGRHaHBjeTVtY21GdFpTc3JPMXh1WEc1Y2RGeDBYSFJjZEdsbUlDaDBhR2x6TG1aeVlXMWxJRDQ5SURZcElIUm9hWE11Wm5KaGJXVWdQU0F3TzF4dVhIUmNkRngwWEhScFppQW9kR2hwY3k1bWNtRnRaU0E5UFNBeUlIeDhJSFJvYVhNdVpuSmhiV1VnUFQwZ05Ta2dlMXh1WEhSY2RGeDBYSFJjZEhSb2FYTXVabkpoYldWWUlEMGdNRHRjYmx4MFhIUmNkRngwZlNCbGJITmxJSHRjYmx4MFhIUmNkRngwWEhSMGFHbHpMbVp5WVcxbFdDc3JPMXh1WEhSY2RGeDBYSFI5WEc1Y2JseDBYSFJjZEZ4MGFXWWdLSFJvYVhNdVpuSmhiV1VnUENBeUtTQjBhR2x6TG1aeVlXMWxXU0E5SURBN1hHNWNkRngwWEhSY2RHVnNjMlVnYVdZZ0tIUm9hWE11Wm5KaGJXVWdQQ0ExS1NCMGFHbHpMbVp5WVcxbFdTQTlJREU3WEc1Y2RGeDBYSFJjZEdWc2MyVWdkR2hwY3k1bWNtRnRaVmtnUFNBd08xeHVYSFJjZEZ4MGZWeHVYRzVjZEZ4MFhIUXZMeUJEVDB4TVNWTkpUMDRnZDJsMGFDQndiR0Y1WlhKY2JseDBYSFJjZEdOdmJuTjBJR1I0SUQwZ2RHaHBjeTU0SUMwZ2NHeGhlV1Z5TG5nN1hHNWNkRngwWEhSamIyNXpkQ0JrZVNBOUlIUm9hWE11ZVNBdElIQnNZWGxsY2k1NU8xeHVYSFJjZEZ4MFkyOXVjM1FnWkdsemRHRnVZMlVnUFNCTllYUm9Mbk54Y25Rb1pIZ2dLaUJrZUNBcklHUjVJQ29nWkhrcE8xeHVYRzVjZEZ4MFhIUnBaaUFvWkdsemRHRnVZMlVnUENCMGFHbHpMbkpoWkdsMWN5QXJJSEJzWVhsbGNpNXlZV1JwZFhNcElIdGNibHgwWEhSY2RGeDBhR0Z1Wkd4bFIyRnRaVTkyWlhJb0tUdGNibHgwWEhSY2RIMWNibHgwWEhSOVhHNWNkSDFjYmx4dVhIUmpiMjV6ZENCbGJtVnRlVEVnUFNCdVpYY2dSVzVsYlhrb0tUdGNibHh1WEhSbWRXNWpkR2x2YmlCb1lXNWtiR1ZGYm1WdGFXVnpLQ2tnZTF4dVhIUmNkR1Z1WlcxNU1TNWtjbUYzS0NrN1hHNWNkRngwWlc1bGJYa3hMblZ3WkdGMFpTZ3BPMXh1WEhSOVhHNWNibHgwWm5WdVkzUnBiMjRnYUdGdVpHeGxSMkZ0WlU5MlpYSW9LU0I3WEc1Y2RGeDBZM1I0TG1acGJHeFRkSGxzWlNBOUlDZDNhR2wwWlNjN1hHNWNkRngwWTNSNExtWnBiR3hVWlhoMEtDZEhRVTFGSUU5V1JWSXNJSGx2ZFhJZ2MyTnZjbVVnYVhNZ0p5QXJJSE5qYjNKbExDQXhNekFzSURJMU1DazdYRzVjZEZ4MFoyRnRaVTkyWlhJZ1BTQjBjblZsTzF4dVhIUjlYRzVjYmx4MEx5OGdZVzVwYldGMGFXOXVJR3h2YjNCY2JseDBablZ1WTNScGIyNGdZVzVwYldGMFpTZ3BJSHRjYmx4MFhIUmpkSGd1WTJ4bFlYSlNaV04wS0RBc0lEQXNJR05oYm5aaGN5NTNhV1IwYUN3Z1kyRnVkbUZ6TG1obGFXZG9kQ2s3WEc1Y2RGeDBhR0Z1Wkd4bFFtRmphMmR5YjNWdVpDZ3BPMXh1WEhSY2RHaGhibVJzWlVKMVltSnNaWE1vS1R0Y2JseDBYSFJ3YkdGNVpYSXVkWEJrWVhSbEtDazdYRzVjZEZ4MGNHeGhlV1Z5TG1SeVlYY29LVHRjYmx4MFhIUm9ZVzVrYkdWRmJtVnRhV1Z6S0NrN1hHNWNkRngwWTNSNExtWnBiR3hVWlhoMEtHQnpZMjl5WlRvZ0pIdHpZMjl5WlgxZ0xDQXhNQ3dnTlRBcE8xeHVYSFJjZEdkaGJXVkdjbUZ0WlNzck8xeHVYSFJjZEdsbUlDZ2haMkZ0WlU5MlpYSXBJSEpsY1hWbGMzUkJibWx0WVhScGIyNUdjbUZ0WlNoaGJtbHRZWFJsS1R0Y2JseDBmVnh1WEc1Y2RHRnVhVzFoZEdVb0tUdGNibHh1WEhSM2FXNWtiM2N1WVdSa1JYWmxiblJNYVhOMFpXNWxjaWduY21WemFYcGxKeXdnS0dVcElEMCtJSHRjYmx4MFhIUmpZVzUyWVhOUWIzTnBkR2x2YmlBOUlHTmhiblpoY3k1blpYUkNiM1Z1WkdsdVowTnNhV1Z1ZEZKbFkzUW9LVHRjYmx4MGZTazdYRzU5S1R0Y2JpSmRMQ0p6YjNWeVkyVlNiMjkwSWpvaUluMD0ifQ==
