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
	ctx.font = '50px Georgia';
	let gameSpeed = Math.floor(Math.random() * 4 + 1);

	// mouse interactivity
	let canvasPosition = canvas.getBoundingClientRect();

	const mouse = {
		x: canvas.width / 2,
		y: canvas.height / 2,
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
			this.x = canvas.width / 2;
			this.y = canvas.height / 2;
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
		}

		draw() {
			if (mouse.click) {
				ctx.lineWidth = 0.2;
				ctx.beginPath();
				ctx.moveTo(this.x, this.y);
				ctx.lineTo(mouse.x, mouse.y);
			}

			ctx.fillStyle = 'red';
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
			ctx.fill();
			ctx.closePath();
			ctx.fillRect(this.x, this.y, this.radius, 10);

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
						/* if (bubble.sound == 'sound1') {
							bubblePop1.play();
						} else {
							bubblePop2.play();
						} */
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
		}
	}

	const enemy1 = new Enemy();

	function handleEnemies() {
		enemy1.update();
		enemy1.draw();
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
		requestAnimationFrame(animate);
	}

	animate();

	window.addEventListener('resize', (e) => {
		canvasPosition = canvas.getBoundingClientRect();
	});
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYzs7QUFFZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsTUFBTTtBQUMvQjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRixDQUFDIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pzL21haW4uanNcIik7XG4iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIChlKSA9PiB7XG5cdFx0Y29uc3QgcHJlbG9hZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVsb2FkJyk7XG5cblx0XHRwcmVsb2FkLmNsYXNzTGlzdC5hZGQoJ3ByZWxvYWQtZmluaXNoZWQnKTtcblx0fSk7XG5cblx0Y29uc3QgYnRuU2Nyb2xsVG9Ub3AgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuU2Nyb2xsVG9Ub3AnKTtcblxuXHRpZiAoYnRuU2Nyb2xsVG9Ub3ApIHtcblx0XHRidG5TY3JvbGxUb1RvcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG5cdFx0XHR3aW5kb3cuc2Nyb2xsVG8oe1xuXHRcdFx0XHR0b3A6IDAsXG5cdFx0XHRcdGxlZnQ6IDAsXG5cdFx0XHRcdGJlaGF2aW9yOiAnc21vb3RoJyxcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0Ly8gY2FudmFzIHNldHVwXG5cdGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMxJyk7XG5cdGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXHRjYW52YXMud2lkdGggPSA4MDA7XG5cdGNhbnZhcy5oZWlnaHQgPSA1MDA7XG5cblx0bGV0IHNjb3JlID0gMDtcblx0bGV0IGdhbWVGcmFtZSA9IDA7XG5cdGN0eC5mb250ID0gJzUwcHggR2VvcmdpYSc7XG5cdGxldCBnYW1lU3BlZWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA0ICsgMSk7XG5cblx0Ly8gbW91c2UgaW50ZXJhY3Rpdml0eVxuXHRsZXQgY2FudmFzUG9zaXRpb24gPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cblx0Y29uc3QgbW91c2UgPSB7XG5cdFx0eDogY2FudmFzLndpZHRoIC8gMixcblx0XHR5OiBjYW52YXMuaGVpZ2h0IC8gMixcblx0XHRjbGljazogZmFsc2UsXG5cdH07XG5cblx0Y2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChlKSA9PiB7XG5cdFx0bW91c2UuY2xpY2sgPSB0cnVlO1xuXHRcdG1vdXNlLnggPSBlLnggLSBjYW52YXNQb3NpdGlvbi5sZWZ0O1xuXHRcdG1vdXNlLnkgPSBlLnkgLSBjYW52YXNQb3NpdGlvbi50b3A7XG5cdH0pO1xuXG5cdGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKGUpID0+IHtcblx0XHRtb3VzZS5jbGljayA9IGZhbHNlO1xuXHR9KTtcblxuXHQvLyBwbGF5ZXIgY2hhcmFjdGVyXG5cdGNvbnN0IHBsYXllckxlZnQgPSBuZXcgSW1hZ2UoKTtcblx0cGxheWVyTGVmdC5zcmMgPSAnLi9hc3NldHMvaW1hZ2VzL21vbnN0ZXJXYWxrTGVmdC5wbmcnO1xuXHRjb25zdCBwbGF5ZXJSaWdodCA9IG5ldyBJbWFnZSgpO1xuXHRwbGF5ZXJSaWdodC5zcmMgPSAnLi9hc3NldHMvaW1hZ2VzL21vbnN0ZXJXYWxrUmlnaHQucG5nJztcblxuXHRjbGFzcyBQbGF5ZXIge1xuXHRcdGNvbnN0cnVjdG9yKCkge1xuXHRcdFx0dGhpcy54ID0gY2FudmFzLndpZHRoIC8gMjtcblx0XHRcdHRoaXMueSA9IGNhbnZhcy5oZWlnaHQgLyAyO1xuXHRcdFx0dGhpcy5yYWRpdXMgPSA1MDtcblx0XHRcdHRoaXMuYW5nbGUgPSAwO1xuXHRcdFx0dGhpcy5mcmFtZVggPSAwO1xuXHRcdFx0dGhpcy5mcmFtZVkgPSAwO1xuXHRcdFx0dGhpcy5mcmFtZSA9IDA7XG5cdFx0XHR0aGlzLnNwcml0ZVdpZHRoID0gNTc1O1xuXHRcdFx0dGhpcy5zcHJpdGVIZWlnaHQgPSA1NDI7XG5cdFx0fVxuXG5cdFx0dXBkYXRlKCkge1xuXHRcdFx0Y29uc3QgZHggPSB0aGlzLnggLSBtb3VzZS54O1xuXHRcdFx0Y29uc3QgZHkgPSB0aGlzLnkgLSBtb3VzZS55O1xuXHRcdFx0bGV0IHRoZXRhID0gTWF0aC5hdGFuMihkeSwgZHgpO1xuXHRcdFx0dGhpcy5hbmdsZSA9IHRoZXRhO1xuXG5cdFx0XHRpZiAobW91c2UueCAhPSB0aGlzLngpIHtcblx0XHRcdFx0dGhpcy54IC09IGR4IC8gMjA7XG5cdFx0XHR9XG5cdFx0XHRpZiAobW91c2UueSAhPSB0aGlzLnkpIHtcblx0XHRcdFx0dGhpcy55IC09IGR5IC8gMjA7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZHJhdygpIHtcblx0XHRcdGlmIChtb3VzZS5jbGljaykge1xuXHRcdFx0XHRjdHgubGluZVdpZHRoID0gMC4yO1xuXHRcdFx0XHRjdHguYmVnaW5QYXRoKCk7XG5cdFx0XHRcdGN0eC5tb3ZlVG8odGhpcy54LCB0aGlzLnkpO1xuXHRcdFx0XHRjdHgubGluZVRvKG1vdXNlLngsIG1vdXNlLnkpO1xuXHRcdFx0fVxuXG5cdFx0XHRjdHguZmlsbFN0eWxlID0gJ3JlZCc7XG5cdFx0XHRjdHguYmVnaW5QYXRoKCk7XG5cdFx0XHRjdHguYXJjKHRoaXMueCwgdGhpcy55LCB0aGlzLnJhZGl1cywgMCwgTWF0aC5QSSAqIDIpO1xuXHRcdFx0Y3R4LmZpbGwoKTtcblx0XHRcdGN0eC5jbG9zZVBhdGgoKTtcblx0XHRcdGN0eC5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy5yYWRpdXMsIDEwKTtcblxuXHRcdFx0Y3R4LnNhdmUoKTtcblx0XHRcdGN0eC50cmFuc2xhdGUodGhpcy54LCB0aGlzLnkpO1xuXHRcdFx0Y3R4LnJvdGF0ZSh0aGlzLmFuZ2xlKTtcblxuXHRcdFx0aWYgKHRoaXMueCA+PSBtb3VzZS54KSB7XG5cdFx0XHRcdGN0eC5kcmF3SW1hZ2UoXG5cdFx0XHRcdFx0cGxheWVyTGVmdCxcblx0XHRcdFx0XHR0aGlzLmZyYW1lWCAqIHRoaXMuc3ByaXRlV2lkdGgsXG5cdFx0XHRcdFx0dGhpcy5mcmFtZVkgKiB0aGlzLnNwcml0ZUhlaWdodCxcblx0XHRcdFx0XHR0aGlzLnNwcml0ZVdpZHRoLFxuXHRcdFx0XHRcdHRoaXMuc3ByaXRlSGVpZ2h0LFxuXHRcdFx0XHRcdDAgLSA1NSxcblx0XHRcdFx0XHQwIC0gNTAsXG5cdFx0XHRcdFx0dGhpcy5zcHJpdGVXaWR0aCAvIDUsXG5cdFx0XHRcdFx0dGhpcy5zcHJpdGVIZWlnaHQgLyA1XG5cdFx0XHRcdCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjdHguZHJhd0ltYWdlKFxuXHRcdFx0XHRcdHBsYXllclJpZ2h0LFxuXHRcdFx0XHRcdHRoaXMuZnJhbWVYICogdGhpcy5zcHJpdGVXaWR0aCxcblx0XHRcdFx0XHR0aGlzLmZyYW1lWSAqIHRoaXMuc3ByaXRlSGVpZ2h0LFxuXHRcdFx0XHRcdHRoaXMuc3ByaXRlV2lkdGgsXG5cdFx0XHRcdFx0dGhpcy5zcHJpdGVIZWlnaHQsXG5cdFx0XHRcdFx0MCAtIDYwLFxuXHRcdFx0XHRcdDAgLSA1NSxcblx0XHRcdFx0XHR0aGlzLnNwcml0ZVdpZHRoIC8gNSxcblx0XHRcdFx0XHR0aGlzLnNwcml0ZUhlaWdodCAvIDVcblx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0Y3R4LnJlc3RvcmUoKTtcblx0XHR9XG5cdH1cblxuXHRjb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKCk7XG5cblx0Ly8gaW50ZXJhY3RpdmUgZWxlbWVudHNcblx0Y29uc3QgZWxlbWVudHNBcnJheSA9IFtdO1xuXHRjb25zdCBmcnVpdEltYWdlID0gbmV3IEltYWdlKCk7XG5cdGZydWl0SW1hZ2Uuc3JjID0gJy4vYXNzZXRzL2ltYWdlcy9hcHBsZS5wbmcnO1xuXG5cdGNsYXNzIEJ1YmJsZSB7XG5cdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0XHR0aGlzLnggPSBNYXRoLnJhbmRvbSgpICogY2FudmFzLndpZHRoO1xuXHRcdFx0dGhpcy55ID0gLTEwMDtcblx0XHRcdHRoaXMucmFkaXVzID0gNTA7XG5cdFx0XHR0aGlzLnNwZWVkID0gTWF0aC5yYW5kb20oKSAqIDUgKyAxO1xuXHRcdFx0dGhpcy5kaXN0YW5jZTtcblx0XHRcdHRoaXMuY291bnRlZCA9IGZhbHNlO1xuXHRcdFx0dGhpcy5zb3VuZCA9IE1hdGgucmFuZG9tKCkgPD0gMC41ID8gJ3NvdW5kMScgOiAnc291bmQyJztcblx0XHR9XG5cblx0XHR1cGRhdGUoKSB7XG5cdFx0XHR0aGlzLnkgKz0gdGhpcy5zcGVlZDtcblx0XHRcdGNvbnN0IGR4ID0gdGhpcy54IC0gcGxheWVyLng7XG5cdFx0XHRjb25zdCBkeSA9IHRoaXMueSAtIHBsYXllci55O1xuXHRcdFx0dGhpcy5kaXN0YW5jZSA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG5cdFx0fVxuXG5cdFx0ZHJhdygpIHtcblx0XHRcdC8qIGN0eC5maWxsU3R5bGUgPSAnYmx1ZSc7XG5cdFx0XHRjdHguYmVnaW5QYXRoKCk7XG5cdFx0XHRjdHguYXJjKHRoaXMueCwgdGhpcy55LCB0aGlzLnJhZGl1cywgMCwgTWF0aC5QSSAqIDIpO1xuXHRcdFx0Y3R4LmZpbGwoKTtcblx0XHRcdGN0eC5jbG9zZVBhdGgoKTtcblx0XHRcdGN0eC5zdHJva2UoKTsgKi9cblx0XHRcdGN0eC5kcmF3SW1hZ2UoXG5cdFx0XHRcdGZydWl0SW1hZ2UsXG5cdFx0XHRcdHRoaXMueCAtIDUwLFxuXHRcdFx0XHR0aGlzLnkgLSA1MCxcblx0XHRcdFx0dGhpcy5yYWRpdXMgKiAyLFxuXHRcdFx0XHR0aGlzLnJhZGl1cyAqIDJcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cblx0Y29uc3QgYnViYmxlUG9wMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2F1ZGlvJyk7XG5cdGJ1YmJsZVBvcDEuc3JjID0gJy4vc291bmRzL2VhdF8wMS5vZ2cnO1xuXHRjb25zdCBidWJibGVQb3AyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYXVkaW8nKTtcblx0YnViYmxlUG9wMi5zcmMgPSAnLi9zb3VuZHMvZWF0XzA0Lm9nZyc7XG5cblx0ZnVuY3Rpb24gaGFuZGxlQnViYmxlcygpIHtcblx0XHRpZiAoZ2FtZUZyYW1lICUgNTAgPT0gMCkge1xuXHRcdFx0ZWxlbWVudHNBcnJheS5wdXNoKG5ldyBCdWJibGUoKSk7XG5cdFx0fVxuXG5cdFx0ZWxlbWVudHNBcnJheS5mb3JFYWNoKChidWJibGUpID0+IHtcblx0XHRcdGJ1YmJsZS51cGRhdGUoKTtcblx0XHRcdGJ1YmJsZS5kcmF3KCk7XG5cdFx0fSk7XG5cblx0XHRlbGVtZW50c0FycmF5LmZvckVhY2goKGJ1YmJsZSwgaW5kZXgpID0+IHtcblx0XHRcdGlmIChidWJibGUueSA8IDAgLSBidWJibGUucmFkaXVzICogMikge1xuXHRcdFx0XHRlbGVtZW50c0FycmF5LnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChidWJibGUpIHtcblx0XHRcdFx0aWYgKGJ1YmJsZS5kaXN0YW5jZSA8IGJ1YmJsZS5yYWRpdXMgKyBwbGF5ZXIucmFkaXVzKSB7XG5cdFx0XHRcdFx0aWYgKCFidWJibGUuY291bnRlZCkge1xuXHRcdFx0XHRcdFx0LyogaWYgKGJ1YmJsZS5zb3VuZCA9PSAnc291bmQxJykge1xuXHRcdFx0XHRcdFx0XHRidWJibGVQb3AxLnBsYXkoKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGJ1YmJsZVBvcDIucGxheSgpO1xuXHRcdFx0XHRcdFx0fSAqL1xuXHRcdFx0XHRcdFx0c2NvcmUrKztcblx0XHRcdFx0XHRcdGJ1YmJsZS5jb3VudGVkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdGVsZW1lbnRzQXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdC8vIHJlcGVhdGluZyBiYWNrZ3JvdW5kXG5cdGNvbnN0IGJhY2tncm91bmQgPSBuZXcgSW1hZ2UoKTtcblx0YmFja2dyb3VuZC5zcmMgPSAnLi9hc3NldHMvaW1hZ2VzL3BhcmFsbGF4LWZvcmVzdC1iYWNrLXRyZWVzLnBuZyc7XG5cblx0Y29uc3QgYmFja2dyb3VuZDIgPSBuZXcgSW1hZ2UoKTtcblx0YmFja2dyb3VuZDIuc3JjID0gJy4vYXNzZXRzL2ltYWdlcy9wYXJhbGxheC1mb3Jlc3QtZnJvbnQtdHJlZXMucG5nJztcblxuXHRjb25zdCBiYWNrZ3JvdW5kMyA9IG5ldyBJbWFnZSgpO1xuXHRiYWNrZ3JvdW5kMy5zcmMgPSAnLi9hc3NldHMvaW1hZ2VzL3BhcmFsbGF4LWZvcmVzdC1saWdodHMucG5nJztcblxuXHRjb25zdCBiYWNrZ3JvdW5kNCA9IG5ldyBJbWFnZSgpO1xuXHRiYWNrZ3JvdW5kNC5zcmMgPSAnLi9hc3NldHMvaW1hZ2VzL3BhcmFsbGF4LWZvcmVzdC1taWRkbGUtdHJlZXMucG5nJztcblxuXHRjb25zdCBCRyA9IHtcblx0XHR4MTogMCxcblx0XHR4MjogY2FudmFzLndpZHRoLFxuXHRcdHk6IDAsXG5cdFx0d2lkdGg6IGNhbnZhcy53aWR0aCxcblx0XHRoZWlnaHQ6IGNhbnZhcy5oZWlnaHQsXG5cdH07XG5cblx0ZnVuY3Rpb24gaGFuZGxlQmFja2dyb3VuZCgpIHtcblx0XHRCRy54MSAtPSBnYW1lU3BlZWQ7XG5cdFx0aWYgKEJHLngxIDwgLUJHLndpZHRoKSBCRy54MSA9IEJHLndpZHRoO1xuXG5cdFx0Y3R4LmRyYXdJbWFnZShiYWNrZ3JvdW5kLCBCRy54MSwgQkcueSwgQkcud2lkdGgsIEJHLmhlaWdodCk7XG5cdFx0Y3R4LmRyYXdJbWFnZShiYWNrZ3JvdW5kMywgQkcueDEsIEJHLnksIEJHLndpZHRoLCBCRy5oZWlnaHQpO1xuXHRcdGN0eC5kcmF3SW1hZ2UoYmFja2dyb3VuZDQsIEJHLngxLCBCRy55LCBCRy53aWR0aCwgQkcuaGVpZ2h0KTtcblx0XHRjdHguZHJhd0ltYWdlKGJhY2tncm91bmQyLCBCRy54MSwgQkcueSwgQkcud2lkdGgsIEJHLmhlaWdodCk7XG5cblx0XHRCRy54MiAtPSBnYW1lU3BlZWQ7XG5cdFx0aWYgKEJHLngyIDwgLUJHLndpZHRoKSBCRy54MiA9IEJHLndpZHRoO1xuXHRcdGN0eC5kcmF3SW1hZ2UoYmFja2dyb3VuZCwgQkcueDIsIEJHLnksIEJHLndpZHRoLCBCRy5oZWlnaHQpO1xuXHRcdGN0eC5kcmF3SW1hZ2UoYmFja2dyb3VuZDMsIEJHLngyLCBCRy55LCBCRy53aWR0aCwgQkcuaGVpZ2h0KTtcblx0XHRjdHguZHJhd0ltYWdlKGJhY2tncm91bmQ0LCBCRy54MiwgQkcueSwgQkcud2lkdGgsIEJHLmhlaWdodCk7XG5cdFx0Y3R4LmRyYXdJbWFnZShiYWNrZ3JvdW5kMiwgQkcueDIsIEJHLnksIEJHLndpZHRoLCBCRy5oZWlnaHQpO1xuXHR9XG5cblx0Ly8gZW5lbWllc1xuXHRjb25zdCBlbmVteUltYWdlID0gbmV3IEltYWdlKCk7XG5cdGVuZW15SW1hZ2Uuc3JjID0gJy4vYXNzZXRzL2ltYWdlcy9zbm93YmFsbF9zcHJpdGVzaGVldF8zeDIucG5nJztcblxuXHRjbGFzcyBFbmVteSB7XG5cdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0XHR0aGlzLnggPSBjYW52YXMud2lkdGggKyAyMDA7XG5cdFx0XHR0aGlzLnkgPSBNYXRoLnJhbmRvbSgpICogKGNhbnZhcy5oZWlnaHQgLSAxNTApICsgOTA7XG5cdFx0XHR0aGlzLnJhZGl1cyA9IDQwO1xuXHRcdFx0dGhpcy5zcGVlZCA9IE1hdGgucmFuZG9tKCkgKiAyICsgMjtcblx0XHRcdHRoaXMuZnJhbWUgPSAwO1xuXHRcdFx0dGhpcy5mcmFtZVggPSAwO1xuXHRcdFx0dGhpcy5mcmFtZVkgPSAwO1xuXHRcdFx0dGhpcy5zcHJpdGVXaWR0aCA9IDUxMjtcblx0XHRcdHRoaXMuc3ByaXRlSGVpZ2h0ID0gMzg1LjU7XG5cdFx0fVxuXG5cdFx0ZHJhdygpIHtcblx0XHRcdC8qIGN0eC5maWxsU3R5bGUgPSAncmVkJztcblx0XHRcdGN0eC5iZWdpblBhdGgoKTtcblx0XHRcdGN0eC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMucmFkaXVzLCAwLCBNYXRoLlBJICogMik7XG5cdFx0XHRjdHguZmlsbCgpOyAqL1xuXG5cdFx0XHRjdHguZHJhd0ltYWdlKFxuXHRcdFx0XHRlbmVteUltYWdlLFxuXHRcdFx0XHR0aGlzLmZyYW1lWCAqIHRoaXMuc3ByaXRlV2lkdGgsXG5cdFx0XHRcdHRoaXMuZnJhbWVZICogdGhpcy5zcHJpdGVIZWlnaHQsXG5cdFx0XHRcdHRoaXMuc3ByaXRlV2lkdGgsXG5cdFx0XHRcdHRoaXMuc3ByaXRlSGVpZ2h0LFxuXHRcdFx0XHR0aGlzLnggLSA0NSxcblx0XHRcdFx0dGhpcy55IC0gNjgsXG5cdFx0XHRcdHRoaXMuc3ByaXRlV2lkdGggLyAzLFxuXHRcdFx0XHR0aGlzLnNwcml0ZUhlaWdodCAvIDNcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0dXBkYXRlKCkge1xuXHRcdFx0dGhpcy54IC09IHRoaXMuc3BlZWQ7XG5cblx0XHRcdGlmICh0aGlzLnggPCAwIC0gdGhpcy5yYWRpdXMgKiAyKSB7XG5cdFx0XHRcdHRoaXMueCA9IGNhbnZhcy53aWR0aCArIDIwMDtcblx0XHRcdFx0dGhpcy55ID0gTWF0aC5yYW5kb20oKSAqIChjYW52YXMuaGVpZ2h0IC0gMTUwKSArIDkwO1xuXHRcdFx0XHR0aGlzLnNwZWVkID0gTWF0aC5yYW5kb20oKSAqIDIgKyAyO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZ2FtZUZyYW1lICUgNSA9PSAwKSB7XG5cdFx0XHRcdHRoaXMuZnJhbWUrKztcblxuXHRcdFx0XHRpZiAodGhpcy5mcmFtZSA+PSA2KSB0aGlzLmZyYW1lID0gMDtcblx0XHRcdFx0aWYgKHRoaXMuZnJhbWUgPT0gMiB8fCB0aGlzLmZyYW1lID09IDUpIHtcblx0XHRcdFx0XHR0aGlzLmZyYW1lWCA9IDA7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5mcmFtZVgrKztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0aGlzLmZyYW1lIDwgMikgdGhpcy5mcmFtZVkgPSAwO1xuXHRcdFx0XHRlbHNlIGlmICh0aGlzLmZyYW1lIDwgNSkgdGhpcy5mcmFtZVkgPSAxO1xuXHRcdFx0XHRlbHNlIHRoaXMuZnJhbWVZID0gMDtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRjb25zdCBlbmVteTEgPSBuZXcgRW5lbXkoKTtcblxuXHRmdW5jdGlvbiBoYW5kbGVFbmVtaWVzKCkge1xuXHRcdGVuZW15MS51cGRhdGUoKTtcblx0XHRlbmVteTEuZHJhdygpO1xuXHR9XG5cblx0Ly8gYW5pbWF0aW9uIGxvb3Bcblx0ZnVuY3Rpb24gYW5pbWF0ZSgpIHtcblx0XHRjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cdFx0aGFuZGxlQmFja2dyb3VuZCgpO1xuXHRcdGhhbmRsZUJ1YmJsZXMoKTtcblx0XHRwbGF5ZXIudXBkYXRlKCk7XG5cdFx0cGxheWVyLmRyYXcoKTtcblx0XHRoYW5kbGVFbmVtaWVzKCk7XG5cdFx0Y3R4LmZpbGxUZXh0KGBzY29yZTogJHtzY29yZX1gLCAxMCwgNTApO1xuXHRcdGdhbWVGcmFtZSsrO1xuXHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcblx0fVxuXG5cdGFuaW1hdGUoKTtcblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKGUpID0+IHtcblx0XHRjYW52YXNQb3NpdGlvbiA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0fSk7XG59KTtcbiJdLCJwcmVFeGlzdGluZ0NvbW1lbnQiOiIvLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbmRsWW5CaFkyczZMeTh2ZDJWaWNHRmpheTlpYjI5MGMzUnlZWEFpTENKM1pXSndZV05yT2k4dkx5NHZjM0pqTDJwekwyMWhhVzR1YW5NaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWp0UlFVRkJPMUZCUTBFN08xRkJSVUU3VVVGRFFUczdVVUZGUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEU3VVVGRFFUdFJRVU5CTzFGQlEwRTdVVUZEUVRzN1VVRkZRVHRSUVVOQk96dFJRVVZCTzFGQlEwRTdPMUZCUlVFN1VVRkRRVHRSUVVOQk96czdVVUZIUVR0UlFVTkJPenRSUVVWQk8xRkJRMEU3TzFGQlJVRTdVVUZEUVR0UlFVTkJPMUZCUTBFc01FTkJRVEJETEdkRFFVRm5RenRSUVVNeFJUdFJRVU5CT3p0UlFVVkJPMUZCUTBFN1VVRkRRVHRSUVVOQkxIZEVRVUYzUkN4clFrRkJhMEk3VVVGRE1VVTdVVUZEUVN4cFJFRkJhVVFzWTBGQll6dFJRVU12UkRzN1VVRkZRVHRSUVVOQk8xRkJRMEU3VVVGRFFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEVzZVVOQlFYbERMR2xEUVVGcFF6dFJRVU14UlN4blNFRkJaMGdzYlVKQlFXMUNMRVZCUVVVN1VVRkRja2s3VVVGRFFUczdVVUZGUVR0UlFVTkJPMUZCUTBFN1VVRkRRU3d5UWtGQk1rSXNNRUpCUVRCQ0xFVkJRVVU3VVVGRGRrUXNhVU5CUVdsRExHVkJRV1U3VVVGRGFFUTdVVUZEUVR0UlFVTkJPenRSUVVWQk8xRkJRMEVzYzBSQlFYTkVMQ3RFUVVFclJEczdVVUZGY2tnN1VVRkRRVHM3TzFGQlIwRTdVVUZEUVRzN096czdPenM3T3pzN08wRkRiRVpCTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQkxFVkJRVVU3TzBGQlJVWTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNTVUZCU1R0QlFVTktMRWRCUVVjN1FVRkRTRHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEVWQlFVVTdPMEZCUlVZN1FVRkRRVHRCUVVOQkxFVkJRVVU3TzBGQlJVWTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEVsQlFVazdRVUZEU2p0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4blFrRkJaMEk3UVVGRGFFSTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEVkQlFVYzdPMEZCUlVnN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFOUJRVTg3UVVGRFVEdEJRVU5CTEU5QlFVODdRVUZEVUR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeEhRVUZITzBGQlEwZzdPMEZCUlVFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNZMEZCWXpzN1FVRkZaRHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRXNTMEZCU3p0QlFVTk1PMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3g1UWtGQmVVSXNUVUZCVFR0QlFVTXZRanRCUVVOQk8wRkJRMEU3TzBGQlJVRTdPMEZCUlVFN1FVRkRRVHRCUVVOQkxFVkJRVVU3UVVGRFJpeERRVUZESWl3aVptbHNaU0k2SW1WbU9UUTFORGxrWWpJek1HTmlNVFl6TW1RMExtcHpJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpSUZ4MEx5OGdWR2hsSUcxdlpIVnNaU0JqWVdOb1pWeHVJRngwZG1GeUlHbHVjM1JoYkd4bFpFMXZaSFZzWlhNZ1BTQjdmVHRjYmx4dUlGeDBMeThnVkdobElISmxjWFZwY21VZ1puVnVZM1JwYjI1Y2JpQmNkR1oxYm1OMGFXOXVJRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMThvYlc5a2RXeGxTV1FwSUh0Y2JseHVJRngwWEhRdkx5QkRhR1ZqYXlCcFppQnRiMlIxYkdVZ2FYTWdhVzRnWTJGamFHVmNiaUJjZEZ4MGFXWW9hVzV6ZEdGc2JHVmtUVzlrZFd4bGMxdHRiMlIxYkdWSlpGMHBJSHRjYmlCY2RGeDBYSFJ5WlhSMWNtNGdhVzV6ZEdGc2JHVmtUVzlrZFd4bGMxdHRiMlIxYkdWSlpGMHVaWGh3YjNKMGN6dGNiaUJjZEZ4MGZWeHVJRngwWEhRdkx5QkRjbVZoZEdVZ1lTQnVaWGNnYlc5a2RXeGxJQ2hoYm1RZ2NIVjBJR2wwSUdsdWRHOGdkR2hsSUdOaFkyaGxLVnh1SUZ4MFhIUjJZWElnYlc5a2RXeGxJRDBnYVc1emRHRnNiR1ZrVFc5a2RXeGxjMXR0YjJSMWJHVkpaRjBnUFNCN1hHNGdYSFJjZEZ4MGFUb2diVzlrZFd4bFNXUXNYRzRnWEhSY2RGeDBiRG9nWm1Gc2MyVXNYRzRnWEhSY2RGeDBaWGh3YjNKMGN6b2dlMzFjYmlCY2RGeDBmVHRjYmx4dUlGeDBYSFF2THlCRmVHVmpkWFJsSUhSb1pTQnRiMlIxYkdVZ1puVnVZM1JwYjI1Y2JpQmNkRngwYlc5a2RXeGxjMXR0YjJSMWJHVkpaRjB1WTJGc2JDaHRiMlIxYkdVdVpYaHdiM0owY3l3Z2JXOWtkV3hsTENCdGIyUjFiR1V1Wlhod2IzSjBjeXdnWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHlrN1hHNWNiaUJjZEZ4MEx5OGdSbXhoWnlCMGFHVWdiVzlrZFd4bElHRnpJR3h2WVdSbFpGeHVJRngwWEhSdGIyUjFiR1V1YkNBOUlIUnlkV1U3WEc1Y2JpQmNkRngwTHk4Z1VtVjBkWEp1SUhSb1pTQmxlSEJ2Y25SeklHOW1JSFJvWlNCdGIyUjFiR1ZjYmlCY2RGeDBjbVYwZFhKdUlHMXZaSFZzWlM1bGVIQnZjblJ6TzF4dUlGeDBmVnh1WEc1Y2JpQmNkQzh2SUdWNGNHOXpaU0IwYUdVZ2JXOWtkV3hsY3lCdlltcGxZM1FnS0Y5ZmQyVmljR0ZqYTE5dGIyUjFiR1Z6WDE4cFhHNGdYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG0wZ1BTQnRiMlIxYkdWek8xeHVYRzRnWEhRdkx5QmxlSEJ2YzJVZ2RHaGxJRzF2WkhWc1pTQmpZV05vWlZ4dUlGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTVqSUQwZ2FXNXpkR0ZzYkdWa1RXOWtkV3hsY3p0Y2JseHVJRngwTHk4Z1pHVm1hVzVsSUdkbGRIUmxjaUJtZFc1amRHbHZiaUJtYjNJZ2FHRnliVzl1ZVNCbGVIQnZjblJ6WEc0Z1hIUmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZMbVFnUFNCbWRXNWpkR2x2YmlobGVIQnZjblJ6TENCdVlXMWxMQ0JuWlhSMFpYSXBJSHRjYmlCY2RGeDBhV1lvSVY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWJ5aGxlSEJ2Y25SekxDQnVZVzFsS1NrZ2UxeHVJRngwWEhSY2RFOWlhbVZqZEM1a1pXWnBibVZRY205d1pYSjBlU2hsZUhCdmNuUnpMQ0J1WVcxbExDQjdJR1Z1ZFcxbGNtRmliR1U2SUhSeWRXVXNJR2RsZERvZ1oyVjBkR1Z5SUgwcE8xeHVJRngwWEhSOVhHNGdYSFI5TzF4dVhHNGdYSFF2THlCa1pXWnBibVVnWDE5bGMwMXZaSFZzWlNCdmJpQmxlSEJ2Y25SelhHNGdYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG5JZ1BTQm1kVzVqZEdsdmJpaGxlSEJ2Y25SektTQjdYRzRnWEhSY2RHbG1LSFI1Y0dWdlppQlRlVzFpYjJ3Z0lUMDlJQ2QxYm1SbFptbHVaV1FuSUNZbUlGTjViV0p2YkM1MGIxTjBjbWx1WjFSaFp5a2dlMXh1SUZ4MFhIUmNkRTlpYW1WamRDNWtaV1pwYm1WUWNtOXdaWEowZVNobGVIQnZjblJ6TENCVGVXMWliMnd1ZEc5VGRISnBibWRVWVdjc0lIc2dkbUZzZFdVNklDZE5iMlIxYkdVbklIMHBPMXh1SUZ4MFhIUjlYRzRnWEhSY2RFOWlhbVZqZEM1a1pXWnBibVZRY205d1pYSjBlU2hsZUhCdmNuUnpMQ0FuWDE5bGMwMXZaSFZzWlNjc0lIc2dkbUZzZFdVNklIUnlkV1VnZlNrN1hHNGdYSFI5TzF4dVhHNGdYSFF2THlCamNtVmhkR1VnWVNCbVlXdGxJRzVoYldWemNHRmpaU0J2WW1wbFkzUmNiaUJjZEM4dklHMXZaR1VnSmlBeE9pQjJZV3gxWlNCcGN5QmhJRzF2WkhWc1pTQnBaQ3dnY21WeGRXbHlaU0JwZEZ4dUlGeDBMeThnYlc5a1pTQW1JREk2SUcxbGNtZGxJR0ZzYkNCd2NtOXdaWEowYVdWeklHOW1JSFpoYkhWbElHbHVkRzhnZEdobElHNXpYRzRnWEhRdkx5QnRiMlJsSUNZZ05Eb2djbVYwZFhKdUlIWmhiSFZsSUhkb1pXNGdZV3h5WldGa2VTQnVjeUJ2WW1wbFkzUmNiaUJjZEM4dklHMXZaR1VnSmlBNGZERTZJR0psYUdGMlpTQnNhV3RsSUhKbGNYVnBjbVZjYmlCY2RGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVkQ0E5SUdaMWJtTjBhVzl1S0haaGJIVmxMQ0J0YjJSbEtTQjdYRzRnWEhSY2RHbG1LRzF2WkdVZ0ppQXhLU0IyWVd4MVpTQTlJRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMThvZG1Gc2RXVXBPMXh1SUZ4MFhIUnBaaWh0YjJSbElDWWdPQ2tnY21WMGRYSnVJSFpoYkhWbE8xeHVJRngwWEhScFppZ29iVzlrWlNBbUlEUXBJQ1ltSUhSNWNHVnZaaUIyWVd4MVpTQTlQVDBnSjI5aWFtVmpkQ2NnSmlZZ2RtRnNkV1VnSmlZZ2RtRnNkV1V1WDE5bGMwMXZaSFZzWlNrZ2NtVjBkWEp1SUhaaGJIVmxPMXh1SUZ4MFhIUjJZWElnYm5NZ1BTQlBZbXBsWTNRdVkzSmxZWFJsS0c1MWJHd3BPMXh1SUZ4MFhIUmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZMbklvYm5NcE8xeHVJRngwWEhSUFltcGxZM1F1WkdWbWFXNWxVSEp2Y0dWeWRIa29ibk1zSUNka1pXWmhkV3gwSnl3Z2V5QmxiblZ0WlhKaFlteGxPaUIwY25WbExDQjJZV3gxWlRvZ2RtRnNkV1VnZlNrN1hHNGdYSFJjZEdsbUtHMXZaR1VnSmlBeUlDWW1JSFI1Y0dWdlppQjJZV3gxWlNBaFBTQW5jM1J5YVc1bkp5a2dabTl5S0haaGNpQnJaWGtnYVc0Z2RtRnNkV1VwSUY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dVpDaHVjeXdnYTJWNUxDQm1kVzVqZEdsdmJpaHJaWGtwSUhzZ2NtVjBkWEp1SUhaaGJIVmxXMnRsZVYwN0lIMHVZbWx1WkNodWRXeHNMQ0JyWlhrcEtUdGNiaUJjZEZ4MGNtVjBkWEp1SUc1ek8xeHVJRngwZlR0Y2JseHVJRngwTHk4Z1oyVjBSR1ZtWVhWc2RFVjRjRzl5ZENCbWRXNWpkR2x2YmlCbWIzSWdZMjl0Y0dGMGFXSnBiR2wwZVNCM2FYUm9JRzV2Ymkxb1lYSnRiMjU1SUcxdlpIVnNaWE5jYmlCY2RGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHViaUE5SUdaMWJtTjBhVzl1S0cxdlpIVnNaU2tnZTF4dUlGeDBYSFIyWVhJZ1oyVjBkR1Z5SUQwZ2JXOWtkV3hsSUNZbUlHMXZaSFZzWlM1ZlgyVnpUVzlrZFd4bElEOWNiaUJjZEZ4MFhIUm1kVzVqZEdsdmJpQm5aWFJFWldaaGRXeDBLQ2tnZXlCeVpYUjFjbTRnYlc5a2RXeGxXeWRrWldaaGRXeDBKMTA3SUgwZ09seHVJRngwWEhSY2RHWjFibU4wYVc5dUlHZGxkRTF2WkhWc1pVVjRjRzl5ZEhNb0tTQjdJSEpsZEhWeWJpQnRiMlIxYkdVN0lIMDdYRzRnWEhSY2RGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVaQ2huWlhSMFpYSXNJQ2RoSnl3Z1oyVjBkR1Z5S1R0Y2JpQmNkRngwY21WMGRYSnVJR2RsZEhSbGNqdGNiaUJjZEgwN1hHNWNiaUJjZEM4dklFOWlhbVZqZEM1d2NtOTBiM1I1Y0dVdWFHRnpUM2R1VUhKdmNHVnlkSGt1WTJGc2JGeHVJRngwWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHk1dklEMGdablZ1WTNScGIyNG9iMkpxWldOMExDQndjbTl3WlhKMGVTa2dleUJ5WlhSMWNtNGdUMkpxWldOMExuQnliM1J2ZEhsd1pTNW9ZWE5QZDI1UWNtOXdaWEowZVM1allXeHNLRzlpYW1WamRDd2djSEp2Y0dWeWRIa3BPeUI5TzF4dVhHNGdYSFF2THlCZlgzZGxZbkJoWTJ0ZmNIVmliR2xqWDNCaGRHaGZYMXh1SUZ4MFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NXdJRDBnWENKY0lqdGNibHh1WEc0Z1hIUXZMeUJNYjJGa0lHVnVkSEo1SUcxdlpIVnNaU0JoYm1RZ2NtVjBkWEp1SUdWNGNHOXlkSE5jYmlCY2RISmxkSFZ5YmlCZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZktGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVjeUE5SUZ3aUxpOXpjbU12YW5NdmJXRnBiaTVxYzF3aUtUdGNiaUlzSW1SdlkzVnRaVzUwTG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvSjBSUFRVTnZiblJsYm5STWIyRmtaV1FuTENCbWRXNWpkR2x2YmlBb0tTQjdYRzVjZEhkcGJtUnZkeTVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLQ2RzYjJGa0p5d2dLR1VwSUQwK0lIdGNibHgwWEhSamIyNXpkQ0J3Y21Wc2IyRmtJRDBnWkc5amRXMWxiblF1Y1hWbGNubFRaV3hsWTNSdmNpZ25MbkJ5Wld4dllXUW5LVHRjYmx4dVhIUmNkSEJ5Wld4dllXUXVZMnhoYzNOTWFYTjBMbUZrWkNnbmNISmxiRzloWkMxbWFXNXBjMmhsWkNjcE8xeHVYSFI5S1R0Y2JseHVYSFJqYjI1emRDQmlkRzVUWTNKdmJHeFViMVJ2Y0NBOUlHUnZZM1Z0Wlc1MExtZGxkRVZzWlcxbGJuUkNlVWxrS0NkaWRHNVRZM0p2Ykd4VWIxUnZjQ2NwTzF4dVhHNWNkR2xtSUNoaWRHNVRZM0p2Ykd4VWIxUnZjQ2tnZTF4dVhIUmNkR0owYmxOamNtOXNiRlJ2Vkc5d0xtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb0oyTnNhV05ySnl3Z0tHVXBJRDArSUh0Y2JseDBYSFJjZEhkcGJtUnZkeTV6WTNKdmJHeFVieWg3WEc1Y2RGeDBYSFJjZEhSdmNEb2dNQ3hjYmx4MFhIUmNkRngwYkdWbWREb2dNQ3hjYmx4MFhIUmNkRngwWW1Wb1lYWnBiM0k2SUNkemJXOXZkR2duTEZ4dVhIUmNkRngwZlNrN1hHNWNkRngwZlNrN1hHNWNkSDFjYmx4dVhIUXZMeUJqWVc1MllYTWdjMlYwZFhCY2JseDBZMjl1YzNRZ1kyRnVkbUZ6SUQwZ1pHOWpkVzFsYm5RdVoyVjBSV3hsYldWdWRFSjVTV1FvSjJOaGJuWmhjekVuS1R0Y2JseDBZMjl1YzNRZ1kzUjRJRDBnWTJGdWRtRnpMbWRsZEVOdmJuUmxlSFFvSnpKa0p5azdYRzVjZEdOaGJuWmhjeTUzYVdSMGFDQTlJRGd3TUR0Y2JseDBZMkZ1ZG1GekxtaGxhV2RvZENBOUlEVXdNRHRjYmx4dVhIUnNaWFFnYzJOdmNtVWdQU0F3TzF4dVhIUnNaWFFnWjJGdFpVWnlZVzFsSUQwZ01EdGNibHgwWTNSNExtWnZiblFnUFNBbk5UQndlQ0JIWlc5eVoybGhKenRjYmx4MGJHVjBJR2RoYldWVGNHVmxaQ0E5SUUxaGRHZ3VabXh2YjNJb1RXRjBhQzV5WVc1a2IyMG9LU0FxSURRZ0t5QXhLVHRjYmx4dVhIUXZMeUJ0YjNWelpTQnBiblJsY21GamRHbDJhWFI1WEc1Y2RHeGxkQ0JqWVc1MllYTlFiM05wZEdsdmJpQTlJR05oYm5aaGN5NW5aWFJDYjNWdVpHbHVaME5zYVdWdWRGSmxZM1FvS1R0Y2JseHVYSFJqYjI1emRDQnRiM1Z6WlNBOUlIdGNibHgwWEhSNE9pQmpZVzUyWVhNdWQybGtkR2dnTHlBeUxGeHVYSFJjZEhrNklHTmhiblpoY3k1b1pXbG5hSFFnTHlBeUxGeHVYSFJjZEdOc2FXTnJPaUJtWVd4elpTeGNibHgwZlR0Y2JseHVYSFJqWVc1MllYTXVZV1JrUlhabGJuUk1hWE4wWlc1bGNpZ25iVzkxYzJWa2IzZHVKeXdnS0dVcElEMCtJSHRjYmx4MFhIUnRiM1Z6WlM1amJHbGpheUE5SUhSeWRXVTdYRzVjZEZ4MGJXOTFjMlV1ZUNBOUlHVXVlQ0F0SUdOaGJuWmhjMUJ2YzJsMGFXOXVMbXhsWm5RN1hHNWNkRngwYlc5MWMyVXVlU0E5SUdVdWVTQXRJR05oYm5aaGMxQnZjMmwwYVc5dUxuUnZjRHRjYmx4MGZTazdYRzVjYmx4MFkyRnVkbUZ6TG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvSjIxdmRYTmxkWEFuTENBb1pTa2dQVDRnZTF4dVhIUmNkRzF2ZFhObExtTnNhV05ySUQwZ1ptRnNjMlU3WEc1Y2RIMHBPMXh1WEc1Y2RDOHZJSEJzWVhsbGNpQmphR0Z5WVdOMFpYSmNibHgwWTI5dWMzUWdjR3hoZVdWeVRHVm1kQ0E5SUc1bGR5QkpiV0ZuWlNncE8xeHVYSFJ3YkdGNVpYSk1aV1owTG5OeVl5QTlJQ2N1TDJGemMyVjBjeTlwYldGblpYTXZiVzl1YzNSbGNsZGhiR3RNWldaMExuQnVaeWM3WEc1Y2RHTnZibk4wSUhCc1lYbGxjbEpwWjJoMElEMGdibVYzSUVsdFlXZGxLQ2s3WEc1Y2RIQnNZWGxsY2xKcFoyaDBMbk55WXlBOUlDY3VMMkZ6YzJWMGN5OXBiV0ZuWlhNdmJXOXVjM1JsY2xkaGJHdFNhV2RvZEM1d2JtY25PMXh1WEc1Y2RHTnNZWE56SUZCc1lYbGxjaUI3WEc1Y2RGeDBZMjl1YzNSeWRXTjBiM0lvS1NCN1hHNWNkRngwWEhSMGFHbHpMbmdnUFNCallXNTJZWE11ZDJsa2RHZ2dMeUF5TzF4dVhIUmNkRngwZEdocGN5NTVJRDBnWTJGdWRtRnpMbWhsYVdkb2RDQXZJREk3WEc1Y2RGeDBYSFIwYUdsekxuSmhaR2wxY3lBOUlEVXdPMXh1WEhSY2RGeDBkR2hwY3k1aGJtZHNaU0E5SURBN1hHNWNkRngwWEhSMGFHbHpMbVp5WVcxbFdDQTlJREE3WEc1Y2RGeDBYSFIwYUdsekxtWnlZVzFsV1NBOUlEQTdYRzVjZEZ4MFhIUjBhR2x6TG1aeVlXMWxJRDBnTUR0Y2JseDBYSFJjZEhSb2FYTXVjM0J5YVhSbFYybGtkR2dnUFNBMU56VTdYRzVjZEZ4MFhIUjBhR2x6TG5Od2NtbDBaVWhsYVdkb2RDQTlJRFUwTWp0Y2JseDBYSFI5WEc1Y2JseDBYSFIxY0dSaGRHVW9LU0I3WEc1Y2RGeDBYSFJqYjI1emRDQmtlQ0E5SUhSb2FYTXVlQ0F0SUcxdmRYTmxMbmc3WEc1Y2RGeDBYSFJqYjI1emRDQmtlU0E5SUhSb2FYTXVlU0F0SUcxdmRYTmxMbms3WEc1Y2RGeDBYSFJzWlhRZ2RHaGxkR0VnUFNCTllYUm9MbUYwWVc0eUtHUjVMQ0JrZUNrN1hHNWNkRngwWEhSMGFHbHpMbUZ1WjJ4bElEMGdkR2hsZEdFN1hHNWNibHgwWEhSY2RHbG1JQ2h0YjNWelpTNTRJQ0U5SUhSb2FYTXVlQ2tnZTF4dVhIUmNkRngwWEhSMGFHbHpMbmdnTFQwZ1pIZ2dMeUF5TUR0Y2JseDBYSFJjZEgxY2JseDBYSFJjZEdsbUlDaHRiM1Z6WlM1NUlDRTlJSFJvYVhNdWVTa2dlMXh1WEhSY2RGeDBYSFIwYUdsekxua2dMVDBnWkhrZ0x5QXlNRHRjYmx4MFhIUmNkSDFjYmx4MFhIUjlYRzVjYmx4MFhIUmtjbUYzS0NrZ2UxeHVYSFJjZEZ4MGFXWWdLRzF2ZFhObExtTnNhV05yS1NCN1hHNWNkRngwWEhSY2RHTjBlQzVzYVc1bFYybGtkR2dnUFNBd0xqSTdYRzVjZEZ4MFhIUmNkR04wZUM1aVpXZHBibEJoZEdnb0tUdGNibHgwWEhSY2RGeDBZM1I0TG0xdmRtVlVieWgwYUdsekxuZ3NJSFJvYVhNdWVTazdYRzVjZEZ4MFhIUmNkR04wZUM1c2FXNWxWRzhvYlc5MWMyVXVlQ3dnYlc5MWMyVXVlU2s3WEc1Y2RGeDBYSFI5WEc1Y2JseDBYSFJjZEdOMGVDNW1hV3hzVTNSNWJHVWdQU0FuY21Wa0p6dGNibHgwWEhSY2RHTjBlQzVpWldkcGJsQmhkR2dvS1R0Y2JseDBYSFJjZEdOMGVDNWhjbU1vZEdocGN5NTRMQ0IwYUdsekxua3NJSFJvYVhNdWNtRmthWFZ6TENBd0xDQk5ZWFJvTGxCSklDb2dNaWs3WEc1Y2RGeDBYSFJqZEhndVptbHNiQ2dwTzF4dVhIUmNkRngwWTNSNExtTnNiM05sVUdGMGFDZ3BPMXh1WEhSY2RGeDBZM1I0TG1acGJHeFNaV04wS0hSb2FYTXVlQ3dnZEdocGN5NTVMQ0IwYUdsekxuSmhaR2wxY3l3Z01UQXBPMXh1WEc1Y2RGeDBYSFJqZEhndWMyRjJaU2dwTzF4dVhIUmNkRngwWTNSNExuUnlZVzV6YkdGMFpTaDBhR2x6TG5nc0lIUm9hWE11ZVNrN1hHNWNkRngwWEhSamRIZ3VjbTkwWVhSbEtIUm9hWE11WVc1bmJHVXBPMXh1WEc1Y2RGeDBYSFJwWmlBb2RHaHBjeTU0SUQ0OUlHMXZkWE5sTG5ncElIdGNibHgwWEhSY2RGeDBZM1I0TG1SeVlYZEpiV0ZuWlNoY2JseDBYSFJjZEZ4MFhIUndiR0Y1WlhKTVpXWjBMRnh1WEhSY2RGeDBYSFJjZEhSb2FYTXVabkpoYldWWUlDb2dkR2hwY3k1emNISnBkR1ZYYVdSMGFDeGNibHgwWEhSY2RGeDBYSFIwYUdsekxtWnlZVzFsV1NBcUlIUm9hWE11YzNCeWFYUmxTR1ZwWjJoMExGeHVYSFJjZEZ4MFhIUmNkSFJvYVhNdWMzQnlhWFJsVjJsa2RHZ3NYRzVjZEZ4MFhIUmNkRngwZEdocGN5NXpjSEpwZEdWSVpXbG5hSFFzWEc1Y2RGeDBYSFJjZEZ4ME1DQXRJRFUxTEZ4dVhIUmNkRngwWEhSY2REQWdMU0ExTUN4Y2JseDBYSFJjZEZ4MFhIUjBhR2x6TG5Od2NtbDBaVmRwWkhSb0lDOGdOU3hjYmx4MFhIUmNkRngwWEhSMGFHbHpMbk53Y21sMFpVaGxhV2RvZENBdklEVmNibHgwWEhSY2RGeDBLVHRjYmx4MFhIUmNkSDBnWld4elpTQjdYRzVjZEZ4MFhIUmNkR04wZUM1a2NtRjNTVzFoWjJVb1hHNWNkRngwWEhSY2RGeDBjR3hoZVdWeVVtbG5hSFFzWEc1Y2RGeDBYSFJjZEZ4MGRHaHBjeTVtY21GdFpWZ2dLaUIwYUdsekxuTndjbWwwWlZkcFpIUm9MRnh1WEhSY2RGeDBYSFJjZEhSb2FYTXVabkpoYldWWklDb2dkR2hwY3k1emNISnBkR1ZJWldsbmFIUXNYRzVjZEZ4MFhIUmNkRngwZEdocGN5NXpjSEpwZEdWWGFXUjBhQ3hjYmx4MFhIUmNkRngwWEhSMGFHbHpMbk53Y21sMFpVaGxhV2RvZEN4Y2JseDBYSFJjZEZ4MFhIUXdJQzBnTmpBc1hHNWNkRngwWEhSY2RGeDBNQ0F0SURVMUxGeHVYSFJjZEZ4MFhIUmNkSFJvYVhNdWMzQnlhWFJsVjJsa2RHZ2dMeUExTEZ4dVhIUmNkRngwWEhSY2RIUm9hWE11YzNCeWFYUmxTR1ZwWjJoMElDOGdOVnh1WEhSY2RGeDBYSFFwTzF4dVhIUmNkRngwZlZ4dVhHNWNkRngwWEhSamRIZ3VjbVZ6ZEc5eVpTZ3BPMXh1WEhSY2RIMWNibHgwZlZ4dVhHNWNkR052Ym5OMElIQnNZWGxsY2lBOUlHNWxkeUJRYkdGNVpYSW9LVHRjYmx4dVhIUXZMeUJwYm5SbGNtRmpkR2wyWlNCbGJHVnRaVzUwYzF4dVhIUmpiMjV6ZENCbGJHVnRaVzUwYzBGeWNtRjVJRDBnVzEwN1hHNWNkR052Ym5OMElHWnlkV2wwU1cxaFoyVWdQU0J1WlhjZ1NXMWhaMlVvS1R0Y2JseDBabkoxYVhSSmJXRm5aUzV6Y21NZ1BTQW5MaTloYzNObGRITXZhVzFoWjJWekwyRndjR3hsTG5CdVp5YzdYRzVjYmx4MFkyeGhjM01nUW5WaVlteGxJSHRjYmx4MFhIUmpiMjV6ZEhKMVkzUnZjaWdwSUh0Y2JseDBYSFJjZEhSb2FYTXVlQ0E5SUUxaGRHZ3VjbUZ1Wkc5dEtDa2dLaUJqWVc1MllYTXVkMmxrZEdnN1hHNWNkRngwWEhSMGFHbHpMbmtnUFNBdE1UQXdPMXh1WEhSY2RGeDBkR2hwY3k1eVlXUnBkWE1nUFNBMU1EdGNibHgwWEhSY2RIUm9hWE11YzNCbFpXUWdQU0JOWVhSb0xuSmhibVJ2YlNncElDb2dOU0FySURFN1hHNWNkRngwWEhSMGFHbHpMbVJwYzNSaGJtTmxPMXh1WEhSY2RGeDBkR2hwY3k1amIzVnVkR1ZrSUQwZ1ptRnNjMlU3WEc1Y2RGeDBYSFIwYUdsekxuTnZkVzVrSUQwZ1RXRjBhQzV5WVc1a2IyMG9LU0E4UFNBd0xqVWdQeUFuYzI5MWJtUXhKeUE2SUNkemIzVnVaREluTzF4dVhIUmNkSDFjYmx4dVhIUmNkSFZ3WkdGMFpTZ3BJSHRjYmx4MFhIUmNkSFJvYVhNdWVTQXJQU0IwYUdsekxuTndaV1ZrTzF4dVhIUmNkRngwWTI5dWMzUWdaSGdnUFNCMGFHbHpMbmdnTFNCd2JHRjVaWEl1ZUR0Y2JseDBYSFJjZEdOdmJuTjBJR1I1SUQwZ2RHaHBjeTU1SUMwZ2NHeGhlV1Z5TG5rN1hHNWNkRngwWEhSMGFHbHpMbVJwYzNSaGJtTmxJRDBnVFdGMGFDNXpjWEowS0dSNElDb2daSGdnS3lCa2VTQXFJR1I1S1R0Y2JseDBYSFI5WEc1Y2JseDBYSFJrY21GM0tDa2dlMXh1WEhSY2RGeDBMeW9nWTNSNExtWnBiR3hUZEhsc1pTQTlJQ2RpYkhWbEp6dGNibHgwWEhSY2RHTjBlQzVpWldkcGJsQmhkR2dvS1R0Y2JseDBYSFJjZEdOMGVDNWhjbU1vZEdocGN5NTRMQ0IwYUdsekxua3NJSFJvYVhNdWNtRmthWFZ6TENBd0xDQk5ZWFJvTGxCSklDb2dNaWs3WEc1Y2RGeDBYSFJqZEhndVptbHNiQ2dwTzF4dVhIUmNkRngwWTNSNExtTnNiM05sVUdGMGFDZ3BPMXh1WEhSY2RGeDBZM1I0TG5OMGNtOXJaU2dwT3lBcUwxeHVYSFJjZEZ4MFkzUjRMbVJ5WVhkSmJXRm5aU2hjYmx4MFhIUmNkRngwWm5KMWFYUkpiV0ZuWlN4Y2JseDBYSFJjZEZ4MGRHaHBjeTU0SUMwZ05UQXNYRzVjZEZ4MFhIUmNkSFJvYVhNdWVTQXRJRFV3TEZ4dVhIUmNkRngwWEhSMGFHbHpMbkpoWkdsMWN5QXFJRElzWEc1Y2RGeDBYSFJjZEhSb2FYTXVjbUZrYVhWeklDb2dNbHh1WEhSY2RGeDBLVHRjYmx4MFhIUjlYRzVjZEgxY2JseHVYSFJqYjI1emRDQmlkV0ppYkdWUWIzQXhJRDBnWkc5amRXMWxiblF1WTNKbFlYUmxSV3hsYldWdWRDZ25ZWFZrYVc4bktUdGNibHgwWW5WaVlteGxVRzl3TVM1emNtTWdQU0FuTGk5emIzVnVaSE12WldGMFh6QXhMbTluWnljN1hHNWNkR052Ym5OMElHSjFZbUpzWlZCdmNESWdQU0JrYjJOMWJXVnVkQzVqY21WaGRHVkZiR1Z0Wlc1MEtDZGhkV1JwYnljcE8xeHVYSFJpZFdKaWJHVlFiM0F5TG5OeVl5QTlJQ2N1TDNOdmRXNWtjeTlsWVhSZk1EUXViMmRuSnp0Y2JseHVYSFJtZFc1amRHbHZiaUJvWVc1a2JHVkNkV0ppYkdWektDa2dlMXh1WEhSY2RHbG1JQ2huWVcxbFJuSmhiV1VnSlNBMU1DQTlQU0F3S1NCN1hHNWNkRngwWEhSbGJHVnRaVzUwYzBGeWNtRjVMbkIxYzJnb2JtVjNJRUoxWW1Kc1pTZ3BLVHRjYmx4MFhIUjlYRzVjYmx4MFhIUmxiR1Z0Wlc1MGMwRnljbUY1TG1admNrVmhZMmdvS0dKMVltSnNaU2tnUFQ0Z2UxeHVYSFJjZEZ4MFluVmlZbXhsTG5Wd1pHRjBaU2dwTzF4dVhIUmNkRngwWW5WaVlteGxMbVJ5WVhjb0tUdGNibHgwWEhSOUtUdGNibHh1WEhSY2RHVnNaVzFsYm5SelFYSnlZWGt1Wm05eVJXRmphQ2dvWW5WaVlteGxMQ0JwYm1SbGVDa2dQVDRnZTF4dVhIUmNkRngwYVdZZ0tHSjFZbUpzWlM1NUlEd2dNQ0F0SUdKMVltSnNaUzV5WVdScGRYTWdLaUF5S1NCN1hHNWNkRngwWEhSY2RHVnNaVzFsYm5SelFYSnlZWGt1YzNCc2FXTmxLR2x1WkdWNExDQXhLVHRjYmx4MFhIUmNkSDFjYmx4dVhIUmNkRngwYVdZZ0tHSjFZbUpzWlNrZ2UxeHVYSFJjZEZ4MFhIUnBaaUFvWW5WaVlteGxMbVJwYzNSaGJtTmxJRHdnWW5WaVlteGxMbkpoWkdsMWN5QXJJSEJzWVhsbGNpNXlZV1JwZFhNcElIdGNibHgwWEhSY2RGeDBYSFJwWmlBb0lXSjFZbUpzWlM1amIzVnVkR1ZrS1NCN1hHNWNkRngwWEhSY2RGeDBYSFF2S2lCcFppQW9ZblZpWW14bExuTnZkVzVrSUQwOUlDZHpiM1Z1WkRFbktTQjdYRzVjZEZ4MFhIUmNkRngwWEhSY2RHSjFZbUpzWlZCdmNERXVjR3hoZVNncE8xeHVYSFJjZEZ4MFhIUmNkRngwZlNCbGJITmxJSHRjYmx4MFhIUmNkRngwWEhSY2RGeDBZblZpWW14bFVHOXdNaTV3YkdGNUtDazdYRzVjZEZ4MFhIUmNkRngwWEhSOUlDb3ZYRzVjZEZ4MFhIUmNkRngwWEhSelkyOXlaU3NyTzF4dVhIUmNkRngwWEhSY2RGeDBZblZpWW14bExtTnZkVzUwWldRZ1BTQjBjblZsTzF4dVhIUmNkRngwWEhSY2RGeDBaV3hsYldWdWRITkJjbkpoZVM1emNHeHBZMlVvYVc1a1pYZ3NJREVwTzF4dVhIUmNkRngwWEhSY2RIMWNibHgwWEhSY2RGeDBmVnh1WEhSY2RGeDBmVnh1WEhSY2RIMHBPMXh1WEhSOVhHNWNibHgwTHk4Z2NtVndaV0YwYVc1bklHSmhZMnRuY205MWJtUmNibHgwWTI5dWMzUWdZbUZqYTJkeWIzVnVaQ0E5SUc1bGR5QkpiV0ZuWlNncE8xeHVYSFJpWVdOclozSnZkVzVrTG5OeVl5QTlJQ2N1TDJGemMyVjBjeTlwYldGblpYTXZjR0Z5WVd4c1lYZ3RabTl5WlhOMExXSmhZMnN0ZEhKbFpYTXVjRzVuSnp0Y2JseHVYSFJqYjI1emRDQmlZV05yWjNKdmRXNWtNaUE5SUc1bGR5QkpiV0ZuWlNncE8xeHVYSFJpWVdOclozSnZkVzVrTWk1emNtTWdQU0FuTGk5aGMzTmxkSE12YVcxaFoyVnpMM0JoY21Gc2JHRjRMV1p2Y21WemRDMW1jbTl1ZEMxMGNtVmxjeTV3Ym1jbk8xeHVYRzVjZEdOdmJuTjBJR0poWTJ0bmNtOTFibVF6SUQwZ2JtVjNJRWx0WVdkbEtDazdYRzVjZEdKaFkydG5jbTkxYm1RekxuTnlZeUE5SUNjdUwyRnpjMlYwY3k5cGJXRm5aWE12Y0dGeVlXeHNZWGd0Wm05eVpYTjBMV3hwWjJoMGN5NXdibWNuTzF4dVhHNWNkR052Ym5OMElHSmhZMnRuY205MWJtUTBJRDBnYm1WM0lFbHRZV2RsS0NrN1hHNWNkR0poWTJ0bmNtOTFibVEwTG5OeVl5QTlJQ2N1TDJGemMyVjBjeTlwYldGblpYTXZjR0Z5WVd4c1lYZ3RabTl5WlhOMExXMXBaR1JzWlMxMGNtVmxjeTV3Ym1jbk8xeHVYRzVjZEdOdmJuTjBJRUpISUQwZ2UxeHVYSFJjZEhneE9pQXdMRnh1WEhSY2RIZ3lPaUJqWVc1MllYTXVkMmxrZEdnc1hHNWNkRngwZVRvZ01DeGNibHgwWEhSM2FXUjBhRG9nWTJGdWRtRnpMbmRwWkhSb0xGeHVYSFJjZEdobGFXZG9kRG9nWTJGdWRtRnpMbWhsYVdkb2RDeGNibHgwZlR0Y2JseHVYSFJtZFc1amRHbHZiaUJvWVc1a2JHVkNZV05yWjNKdmRXNWtLQ2tnZTF4dVhIUmNkRUpITG5neElDMDlJR2RoYldWVGNHVmxaRHRjYmx4MFhIUnBaaUFvUWtjdWVERWdQQ0F0UWtjdWQybGtkR2dwSUVKSExuZ3hJRDBnUWtjdWQybGtkR2c3WEc1Y2JseDBYSFJqZEhndVpISmhkMGx0WVdkbEtHSmhZMnRuY205MWJtUXNJRUpITG5neExDQkNSeTU1TENCQ1J5NTNhV1IwYUN3Z1FrY3VhR1ZwWjJoMEtUdGNibHgwWEhSamRIZ3VaSEpoZDBsdFlXZGxLR0poWTJ0bmNtOTFibVF6TENCQ1J5NTRNU3dnUWtjdWVTd2dRa2N1ZDJsa2RHZ3NJRUpITG1obGFXZG9kQ2s3WEc1Y2RGeDBZM1I0TG1SeVlYZEpiV0ZuWlNoaVlXTnJaM0p2ZFc1a05Dd2dRa2N1ZURFc0lFSkhMbmtzSUVKSExuZHBaSFJvTENCQ1J5NW9aV2xuYUhRcE8xeHVYSFJjZEdOMGVDNWtjbUYzU1cxaFoyVW9ZbUZqYTJkeWIzVnVaRElzSUVKSExuZ3hMQ0JDUnk1NUxDQkNSeTUzYVdSMGFDd2dRa2N1YUdWcFoyaDBLVHRjYmx4dVhIUmNkRUpITG5neUlDMDlJR2RoYldWVGNHVmxaRHRjYmx4MFhIUnBaaUFvUWtjdWVESWdQQ0F0UWtjdWQybGtkR2dwSUVKSExuZ3lJRDBnUWtjdWQybGtkR2c3WEc1Y2RGeDBZM1I0TG1SeVlYZEpiV0ZuWlNoaVlXTnJaM0p2ZFc1a0xDQkNSeTU0TWl3Z1FrY3VlU3dnUWtjdWQybGtkR2dzSUVKSExtaGxhV2RvZENrN1hHNWNkRngwWTNSNExtUnlZWGRKYldGblpTaGlZV05yWjNKdmRXNWtNeXdnUWtjdWVESXNJRUpITG5rc0lFSkhMbmRwWkhSb0xDQkNSeTVvWldsbmFIUXBPMXh1WEhSY2RHTjBlQzVrY21GM1NXMWhaMlVvWW1GamEyZHliM1Z1WkRRc0lFSkhMbmd5TENCQ1J5NTVMQ0JDUnk1M2FXUjBhQ3dnUWtjdWFHVnBaMmgwS1R0Y2JseDBYSFJqZEhndVpISmhkMGx0WVdkbEtHSmhZMnRuY205MWJtUXlMQ0JDUnk1NE1pd2dRa2N1ZVN3Z1FrY3VkMmxrZEdnc0lFSkhMbWhsYVdkb2RDazdYRzVjZEgxY2JseHVYSFF2THlCbGJtVnRhV1Z6WEc1Y2RHTnZibk4wSUdWdVpXMTVTVzFoWjJVZ1BTQnVaWGNnU1cxaFoyVW9LVHRjYmx4MFpXNWxiWGxKYldGblpTNXpjbU1nUFNBbkxpOWhjM05sZEhNdmFXMWhaMlZ6TDNOdWIzZGlZV3hzWDNOd2NtbDBaWE5vWldWMFh6TjRNaTV3Ym1jbk8xeHVYRzVjZEdOc1lYTnpJRVZ1WlcxNUlIdGNibHgwWEhSamIyNXpkSEoxWTNSdmNpZ3BJSHRjYmx4MFhIUmNkSFJvYVhNdWVDQTlJR05oYm5aaGN5NTNhV1IwYUNBcklESXdNRHRjYmx4MFhIUmNkSFJvYVhNdWVTQTlJRTFoZEdndWNtRnVaRzl0S0NrZ0tpQW9ZMkZ1ZG1GekxtaGxhV2RvZENBdElERTFNQ2tnS3lBNU1EdGNibHgwWEhSY2RIUm9hWE11Y21Ga2FYVnpJRDBnTkRBN1hHNWNkRngwWEhSMGFHbHpMbk53WldWa0lEMGdUV0YwYUM1eVlXNWtiMjBvS1NBcUlESWdLeUF5TzF4dVhIUmNkRngwZEdocGN5NW1jbUZ0WlNBOUlEQTdYRzVjZEZ4MFhIUjBhR2x6TG1aeVlXMWxXQ0E5SURBN1hHNWNkRngwWEhSMGFHbHpMbVp5WVcxbFdTQTlJREE3WEc1Y2RGeDBYSFIwYUdsekxuTndjbWwwWlZkcFpIUm9JRDBnTlRFeU8xeHVYSFJjZEZ4MGRHaHBjeTV6Y0hKcGRHVklaV2xuYUhRZ1BTQXpPRFV1TlR0Y2JseDBYSFI5WEc1Y2JseDBYSFJrY21GM0tDa2dlMXh1WEhSY2RGeDBMeW9nWTNSNExtWnBiR3hUZEhsc1pTQTlJQ2R5WldRbk8xeHVYSFJjZEZ4MFkzUjRMbUpsWjJsdVVHRjBhQ2dwTzF4dVhIUmNkRngwWTNSNExtRnlZeWgwYUdsekxuZ3NJSFJvYVhNdWVTd2dkR2hwY3k1eVlXUnBkWE1zSURBc0lFMWhkR2d1VUVrZ0tpQXlLVHRjYmx4MFhIUmNkR04wZUM1bWFXeHNLQ2s3SUNvdlhHNWNibHgwWEhSY2RHTjBlQzVrY21GM1NXMWhaMlVvWEc1Y2RGeDBYSFJjZEdWdVpXMTVTVzFoWjJVc1hHNWNkRngwWEhSY2RIUm9hWE11Wm5KaGJXVllJQ29nZEdocGN5NXpjSEpwZEdWWGFXUjBhQ3hjYmx4MFhIUmNkRngwZEdocGN5NW1jbUZ0WlZrZ0tpQjBhR2x6TG5Od2NtbDBaVWhsYVdkb2RDeGNibHgwWEhSY2RGeDBkR2hwY3k1emNISnBkR1ZYYVdSMGFDeGNibHgwWEhSY2RGeDBkR2hwY3k1emNISnBkR1ZJWldsbmFIUXNYRzVjZEZ4MFhIUmNkSFJvYVhNdWVDQXRJRFExTEZ4dVhIUmNkRngwWEhSMGFHbHpMbmtnTFNBMk9DeGNibHgwWEhSY2RGeDBkR2hwY3k1emNISnBkR1ZYYVdSMGFDQXZJRE1zWEc1Y2RGeDBYSFJjZEhSb2FYTXVjM0J5YVhSbFNHVnBaMmgwSUM4Z00xeHVYSFJjZEZ4MEtUdGNibHgwWEhSOVhHNWNibHgwWEhSMWNHUmhkR1VvS1NCN1hHNWNkRngwWEhSMGFHbHpMbmdnTFQwZ2RHaHBjeTV6Y0dWbFpEdGNibHh1WEhSY2RGeDBhV1lnS0hSb2FYTXVlQ0E4SURBZ0xTQjBhR2x6TG5KaFpHbDFjeUFxSURJcElIdGNibHgwWEhSY2RGeDBkR2hwY3k1NElEMGdZMkZ1ZG1GekxuZHBaSFJvSUNzZ01qQXdPMXh1WEhSY2RGeDBYSFIwYUdsekxua2dQU0JOWVhSb0xuSmhibVJ2YlNncElDb2dLR05oYm5aaGN5NW9aV2xuYUhRZ0xTQXhOVEFwSUNzZ09UQTdYRzVjZEZ4MFhIUmNkSFJvYVhNdWMzQmxaV1FnUFNCTllYUm9MbkpoYm1SdmJTZ3BJQ29nTWlBcklESTdYRzVjZEZ4MFhIUjlYRzVjYmx4MFhIUmNkR2xtSUNobllXMWxSbkpoYldVZ0pTQTFJRDA5SURBcElIdGNibHgwWEhSY2RGeDBkR2hwY3k1bWNtRnRaU3NyTzF4dVhHNWNkRngwWEhSY2RHbG1JQ2gwYUdsekxtWnlZVzFsSUQ0OUlEWXBJSFJvYVhNdVpuSmhiV1VnUFNBd08xeHVYSFJjZEZ4MFhIUnBaaUFvZEdocGN5NW1jbUZ0WlNBOVBTQXlJSHg4SUhSb2FYTXVabkpoYldVZ1BUMGdOU2tnZTF4dVhIUmNkRngwWEhSY2RIUm9hWE11Wm5KaGJXVllJRDBnTUR0Y2JseDBYSFJjZEZ4MGZTQmxiSE5sSUh0Y2JseDBYSFJjZEZ4MFhIUjBhR2x6TG1aeVlXMWxXQ3NyTzF4dVhIUmNkRngwWEhSOVhHNWNibHgwWEhSY2RGeDBhV1lnS0hSb2FYTXVabkpoYldVZ1BDQXlLU0IwYUdsekxtWnlZVzFsV1NBOUlEQTdYRzVjZEZ4MFhIUmNkR1ZzYzJVZ2FXWWdLSFJvYVhNdVpuSmhiV1VnUENBMUtTQjBhR2x6TG1aeVlXMWxXU0E5SURFN1hHNWNkRngwWEhSY2RHVnNjMlVnZEdocGN5NW1jbUZ0WlZrZ1BTQXdPMXh1WEhSY2RGeDBmVnh1WEhSY2RIMWNibHgwZlZ4dVhHNWNkR052Ym5OMElHVnVaVzE1TVNBOUlHNWxkeUJGYm1WdGVTZ3BPMXh1WEc1Y2RHWjFibU4wYVc5dUlHaGhibVJzWlVWdVpXMXBaWE1vS1NCN1hHNWNkRngwWlc1bGJYa3hMblZ3WkdGMFpTZ3BPMXh1WEhSY2RHVnVaVzE1TVM1a2NtRjNLQ2s3WEc1Y2RIMWNibHh1WEhRdkx5QmhibWx0WVhScGIyNGdiRzl2Y0Z4dVhIUm1kVzVqZEdsdmJpQmhibWx0WVhSbEtDa2dlMXh1WEhSY2RHTjBlQzVqYkdWaGNsSmxZM1FvTUN3Z01Dd2dZMkZ1ZG1GekxuZHBaSFJvTENCallXNTJZWE11YUdWcFoyaDBLVHRjYmx4MFhIUm9ZVzVrYkdWQ1lXTnJaM0p2ZFc1a0tDazdYRzVjZEZ4MGFHRnVaR3hsUW5WaVlteGxjeWdwTzF4dVhIUmNkSEJzWVhsbGNpNTFjR1JoZEdVb0tUdGNibHgwWEhSd2JHRjVaWEl1WkhKaGR5Z3BPMXh1WEhSY2RHaGhibVJzWlVWdVpXMXBaWE1vS1R0Y2JseDBYSFJqZEhndVptbHNiRlJsZUhRb1lITmpiM0psT2lBa2UzTmpiM0psZldBc0lERXdMQ0ExTUNrN1hHNWNkRngwWjJGdFpVWnlZVzFsS3lzN1hHNWNkRngwY21WeGRXVnpkRUZ1YVcxaGRHbHZia1p5WVcxbEtHRnVhVzFoZEdVcE8xeHVYSFI5WEc1Y2JseDBZVzVwYldGMFpTZ3BPMXh1WEc1Y2RIZHBibVJ2ZHk1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0NkeVpYTnBlbVVuTENBb1pTa2dQVDRnZTF4dVhIUmNkR05oYm5aaGMxQnZjMmwwYVc5dUlEMGdZMkZ1ZG1GekxtZGxkRUp2ZFc1a2FXNW5RMnhwWlc1MFVtVmpkQ2dwTzF4dVhIUjlLVHRjYm4wcE8xeHVJbDBzSW5OdmRYSmpaVkp2YjNRaU9pSWlmUT09In0=
