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

	// animation loop
	function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		handleBackground();
		handleBubbles();
		player.update();
		player.draw();

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx5QkFBeUIsTUFBTTtBQUMvQjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRixDQUFDIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pzL21haW4uanNcIik7XG4iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIChlKSA9PiB7XG5cdFx0Y29uc3QgcHJlbG9hZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVsb2FkJyk7XG5cblx0XHRwcmVsb2FkLmNsYXNzTGlzdC5hZGQoJ3ByZWxvYWQtZmluaXNoZWQnKTtcblx0fSk7XG5cblx0Y29uc3QgYnRuU2Nyb2xsVG9Ub3AgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuU2Nyb2xsVG9Ub3AnKTtcblxuXHRpZiAoYnRuU2Nyb2xsVG9Ub3ApIHtcblx0XHRidG5TY3JvbGxUb1RvcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG5cdFx0XHR3aW5kb3cuc2Nyb2xsVG8oe1xuXHRcdFx0XHR0b3A6IDAsXG5cdFx0XHRcdGxlZnQ6IDAsXG5cdFx0XHRcdGJlaGF2aW9yOiAnc21vb3RoJyxcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0Ly8gY2FudmFzIHNldHVwXG5cdGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMxJyk7XG5cdGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXHRjYW52YXMud2lkdGggPSA4MDA7XG5cdGNhbnZhcy5oZWlnaHQgPSA1MDA7XG5cblx0bGV0IHNjb3JlID0gMDtcblx0bGV0IGdhbWVGcmFtZSA9IDA7XG5cdGN0eC5mb250ID0gJzUwcHggR2VvcmdpYSc7XG5cdGxldCBnYW1lU3BlZWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA0ICsgMSk7XG5cblx0Ly8gbW91c2UgaW50ZXJhY3Rpdml0eVxuXHRsZXQgY2FudmFzUG9zaXRpb24gPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cblx0Y29uc3QgbW91c2UgPSB7XG5cdFx0eDogY2FudmFzLndpZHRoIC8gMixcblx0XHR5OiBjYW52YXMuaGVpZ2h0IC8gMixcblx0XHRjbGljazogZmFsc2UsXG5cdH07XG5cblx0Y2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChlKSA9PiB7XG5cdFx0bW91c2UuY2xpY2sgPSB0cnVlO1xuXHRcdG1vdXNlLnggPSBlLnggLSBjYW52YXNQb3NpdGlvbi5sZWZ0O1xuXHRcdG1vdXNlLnkgPSBlLnkgLSBjYW52YXNQb3NpdGlvbi50b3A7XG5cdH0pO1xuXG5cdGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKGUpID0+IHtcblx0XHRtb3VzZS5jbGljayA9IGZhbHNlO1xuXHR9KTtcblxuXHQvLyBwbGF5ZXIgY2hhcmFjdGVyXG5cdGNvbnN0IHBsYXllckxlZnQgPSBuZXcgSW1hZ2UoKTtcblx0cGxheWVyTGVmdC5zcmMgPSAnLi9hc3NldHMvaW1hZ2VzL21vbnN0ZXJXYWxrTGVmdC5wbmcnO1xuXHRjb25zdCBwbGF5ZXJSaWdodCA9IG5ldyBJbWFnZSgpO1xuXHRwbGF5ZXJSaWdodC5zcmMgPSAnLi9hc3NldHMvaW1hZ2VzL21vbnN0ZXJXYWxrUmlnaHQucG5nJztcblxuXHRjbGFzcyBQbGF5ZXIge1xuXHRcdGNvbnN0cnVjdG9yKCkge1xuXHRcdFx0dGhpcy54ID0gY2FudmFzLndpZHRoIC8gMjtcblx0XHRcdHRoaXMueSA9IGNhbnZhcy5oZWlnaHQgLyAyO1xuXHRcdFx0dGhpcy5yYWRpdXMgPSA1MDtcblx0XHRcdHRoaXMuYW5nbGUgPSAwO1xuXHRcdFx0dGhpcy5mcmFtZVggPSAwO1xuXHRcdFx0dGhpcy5mcmFtZVkgPSAwO1xuXHRcdFx0dGhpcy5mcmFtZSA9IDA7XG5cdFx0XHR0aGlzLnNwcml0ZVdpZHRoID0gNTc1O1xuXHRcdFx0dGhpcy5zcHJpdGVIZWlnaHQgPSA1NDI7XG5cdFx0fVxuXG5cdFx0dXBkYXRlKCkge1xuXHRcdFx0Y29uc3QgZHggPSB0aGlzLnggLSBtb3VzZS54O1xuXHRcdFx0Y29uc3QgZHkgPSB0aGlzLnkgLSBtb3VzZS55O1xuXHRcdFx0bGV0IHRoZXRhID0gTWF0aC5hdGFuMihkeSwgZHgpO1xuXHRcdFx0dGhpcy5hbmdsZSA9IHRoZXRhO1xuXG5cdFx0XHRpZiAobW91c2UueCAhPSB0aGlzLngpIHtcblx0XHRcdFx0dGhpcy54IC09IGR4IC8gMjA7XG5cdFx0XHR9XG5cdFx0XHRpZiAobW91c2UueSAhPSB0aGlzLnkpIHtcblx0XHRcdFx0dGhpcy55IC09IGR5IC8gMjA7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZHJhdygpIHtcblx0XHRcdGlmIChtb3VzZS5jbGljaykge1xuXHRcdFx0XHRjdHgubGluZVdpZHRoID0gMC4yO1xuXHRcdFx0XHRjdHguYmVnaW5QYXRoKCk7XG5cdFx0XHRcdGN0eC5tb3ZlVG8odGhpcy54LCB0aGlzLnkpO1xuXHRcdFx0XHRjdHgubGluZVRvKG1vdXNlLngsIG1vdXNlLnkpO1xuXHRcdFx0fVxuXG5cdFx0XHRjdHguZmlsbFN0eWxlID0gJ3JlZCc7XG5cdFx0XHRjdHguYmVnaW5QYXRoKCk7XG5cdFx0XHRjdHguYXJjKHRoaXMueCwgdGhpcy55LCB0aGlzLnJhZGl1cywgMCwgTWF0aC5QSSAqIDIpO1xuXHRcdFx0Y3R4LmZpbGwoKTtcblx0XHRcdGN0eC5jbG9zZVBhdGgoKTtcblx0XHRcdGN0eC5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy5yYWRpdXMsIDEwKTtcblxuXHRcdFx0Y3R4LnNhdmUoKTtcblx0XHRcdGN0eC50cmFuc2xhdGUodGhpcy54LCB0aGlzLnkpO1xuXHRcdFx0Y3R4LnJvdGF0ZSh0aGlzLmFuZ2xlKTtcblxuXHRcdFx0aWYgKHRoaXMueCA+PSBtb3VzZS54KSB7XG5cdFx0XHRcdGN0eC5kcmF3SW1hZ2UoXG5cdFx0XHRcdFx0cGxheWVyTGVmdCxcblx0XHRcdFx0XHR0aGlzLmZyYW1lWCAqIHRoaXMuc3ByaXRlV2lkdGgsXG5cdFx0XHRcdFx0dGhpcy5mcmFtZVkgKiB0aGlzLnNwcml0ZUhlaWdodCxcblx0XHRcdFx0XHR0aGlzLnNwcml0ZVdpZHRoLFxuXHRcdFx0XHRcdHRoaXMuc3ByaXRlSGVpZ2h0LFxuXHRcdFx0XHRcdDAgLSA1NSxcblx0XHRcdFx0XHQwIC0gNTAsXG5cdFx0XHRcdFx0dGhpcy5zcHJpdGVXaWR0aCAvIDUsXG5cdFx0XHRcdFx0dGhpcy5zcHJpdGVIZWlnaHQgLyA1XG5cdFx0XHRcdCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjdHguZHJhd0ltYWdlKFxuXHRcdFx0XHRcdHBsYXllclJpZ2h0LFxuXHRcdFx0XHRcdHRoaXMuZnJhbWVYICogdGhpcy5zcHJpdGVXaWR0aCxcblx0XHRcdFx0XHR0aGlzLmZyYW1lWSAqIHRoaXMuc3ByaXRlSGVpZ2h0LFxuXHRcdFx0XHRcdHRoaXMuc3ByaXRlV2lkdGgsXG5cdFx0XHRcdFx0dGhpcy5zcHJpdGVIZWlnaHQsXG5cdFx0XHRcdFx0MCAtIDYwLFxuXHRcdFx0XHRcdDAgLSA1NSxcblx0XHRcdFx0XHR0aGlzLnNwcml0ZVdpZHRoIC8gNSxcblx0XHRcdFx0XHR0aGlzLnNwcml0ZUhlaWdodCAvIDVcblx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0Y3R4LnJlc3RvcmUoKTtcblx0XHR9XG5cdH1cblxuXHRjb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKCk7XG5cblx0Ly8gaW50ZXJhY3RpdmUgZWxlbWVudHNcblx0Y29uc3QgZWxlbWVudHNBcnJheSA9IFtdO1xuXHRjb25zdCBmcnVpdEltYWdlID0gbmV3IEltYWdlKCk7XG5cdGZydWl0SW1hZ2Uuc3JjID0gJy4vYXNzZXRzL2ltYWdlcy9hcHBsZS5wbmcnO1xuXG5cdGNsYXNzIEJ1YmJsZSB7XG5cdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0XHR0aGlzLnggPSBNYXRoLnJhbmRvbSgpICogY2FudmFzLndpZHRoO1xuXHRcdFx0dGhpcy55ID0gLTEwMDtcblx0XHRcdHRoaXMucmFkaXVzID0gNTA7XG5cdFx0XHR0aGlzLnNwZWVkID0gTWF0aC5yYW5kb20oKSAqIDUgKyAxO1xuXHRcdFx0dGhpcy5kaXN0YW5jZTtcblx0XHRcdHRoaXMuY291bnRlZCA9IGZhbHNlO1xuXHRcdFx0dGhpcy5zb3VuZCA9IE1hdGgucmFuZG9tKCkgPD0gMC41ID8gJ3NvdW5kMScgOiAnc291bmQyJztcblx0XHR9XG5cblx0XHR1cGRhdGUoKSB7XG5cdFx0XHR0aGlzLnkgKz0gdGhpcy5zcGVlZDtcblx0XHRcdGNvbnN0IGR4ID0gdGhpcy54IC0gcGxheWVyLng7XG5cdFx0XHRjb25zdCBkeSA9IHRoaXMueSAtIHBsYXllci55O1xuXHRcdFx0dGhpcy5kaXN0YW5jZSA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG5cdFx0fVxuXG5cdFx0ZHJhdygpIHtcblx0XHRcdC8qIGN0eC5maWxsU3R5bGUgPSAnYmx1ZSc7XG5cdFx0XHRjdHguYmVnaW5QYXRoKCk7XG5cdFx0XHRjdHguYXJjKHRoaXMueCwgdGhpcy55LCB0aGlzLnJhZGl1cywgMCwgTWF0aC5QSSAqIDIpO1xuXHRcdFx0Y3R4LmZpbGwoKTtcblx0XHRcdGN0eC5jbG9zZVBhdGgoKTtcblx0XHRcdGN0eC5zdHJva2UoKTsgKi9cblx0XHRcdGN0eC5kcmF3SW1hZ2UoXG5cdFx0XHRcdGZydWl0SW1hZ2UsXG5cdFx0XHRcdHRoaXMueCAtIDUwLFxuXHRcdFx0XHR0aGlzLnkgLSA1MCxcblx0XHRcdFx0dGhpcy5yYWRpdXMgKiAyLFxuXHRcdFx0XHR0aGlzLnJhZGl1cyAqIDJcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cblx0Y29uc3QgYnViYmxlUG9wMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2F1ZGlvJyk7XG5cdGJ1YmJsZVBvcDEuc3JjID0gJy4vc291bmRzL2VhdF8wMS5vZ2cnO1xuXHRjb25zdCBidWJibGVQb3AyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYXVkaW8nKTtcblx0YnViYmxlUG9wMi5zcmMgPSAnLi9zb3VuZHMvZWF0XzA0Lm9nZyc7XG5cblx0ZnVuY3Rpb24gaGFuZGxlQnViYmxlcygpIHtcblx0XHRpZiAoZ2FtZUZyYW1lICUgNTAgPT0gMCkge1xuXHRcdFx0ZWxlbWVudHNBcnJheS5wdXNoKG5ldyBCdWJibGUoKSk7XG5cdFx0fVxuXG5cdFx0ZWxlbWVudHNBcnJheS5mb3JFYWNoKChidWJibGUpID0+IHtcblx0XHRcdGJ1YmJsZS51cGRhdGUoKTtcblx0XHRcdGJ1YmJsZS5kcmF3KCk7XG5cdFx0fSk7XG5cblx0XHRlbGVtZW50c0FycmF5LmZvckVhY2goKGJ1YmJsZSwgaW5kZXgpID0+IHtcblx0XHRcdGlmIChidWJibGUueSA8IDAgLSBidWJibGUucmFkaXVzICogMikge1xuXHRcdFx0XHRlbGVtZW50c0FycmF5LnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChidWJibGUpIHtcblx0XHRcdFx0aWYgKGJ1YmJsZS5kaXN0YW5jZSA8IGJ1YmJsZS5yYWRpdXMgKyBwbGF5ZXIucmFkaXVzKSB7XG5cdFx0XHRcdFx0aWYgKCFidWJibGUuY291bnRlZCkge1xuXHRcdFx0XHRcdFx0LyogaWYgKGJ1YmJsZS5zb3VuZCA9PSAnc291bmQxJykge1xuXHRcdFx0XHRcdFx0XHRidWJibGVQb3AxLnBsYXkoKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGJ1YmJsZVBvcDIucGxheSgpO1xuXHRcdFx0XHRcdFx0fSAqL1xuXHRcdFx0XHRcdFx0c2NvcmUrKztcblx0XHRcdFx0XHRcdGJ1YmJsZS5jb3VudGVkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdGVsZW1lbnRzQXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdC8vIHJlcGVhdGluZyBiYWNrZ3JvdW5kXG5cdGNvbnN0IGJhY2tncm91bmQgPSBuZXcgSW1hZ2UoKTtcblx0YmFja2dyb3VuZC5zcmMgPSAnLi9hc3NldHMvaW1hZ2VzL3BhcmFsbGF4LWZvcmVzdC1iYWNrLXRyZWVzLnBuZyc7XG5cblx0Y29uc3QgYmFja2dyb3VuZDIgPSBuZXcgSW1hZ2UoKTtcblx0YmFja2dyb3VuZDIuc3JjID0gJy4vYXNzZXRzL2ltYWdlcy9wYXJhbGxheC1mb3Jlc3QtZnJvbnQtdHJlZXMucG5nJztcblxuXHRjb25zdCBiYWNrZ3JvdW5kMyA9IG5ldyBJbWFnZSgpO1xuXHRiYWNrZ3JvdW5kMy5zcmMgPSAnLi9hc3NldHMvaW1hZ2VzL3BhcmFsbGF4LWZvcmVzdC1saWdodHMucG5nJztcblxuXHRjb25zdCBiYWNrZ3JvdW5kNCA9IG5ldyBJbWFnZSgpO1xuXHRiYWNrZ3JvdW5kNC5zcmMgPSAnLi9hc3NldHMvaW1hZ2VzL3BhcmFsbGF4LWZvcmVzdC1taWRkbGUtdHJlZXMucG5nJztcblxuXHRjb25zdCBCRyA9IHtcblx0XHR4MTogMCxcblx0XHR4MjogY2FudmFzLndpZHRoLFxuXHRcdHk6IDAsXG5cdFx0d2lkdGg6IGNhbnZhcy53aWR0aCxcblx0XHRoZWlnaHQ6IGNhbnZhcy5oZWlnaHQsXG5cdH07XG5cblx0ZnVuY3Rpb24gaGFuZGxlQmFja2dyb3VuZCgpIHtcblx0XHRCRy54MSAtPSBnYW1lU3BlZWQ7XG5cdFx0aWYgKEJHLngxIDwgLUJHLndpZHRoKSBCRy54MSA9IEJHLndpZHRoO1xuXG5cdFx0Y3R4LmRyYXdJbWFnZShiYWNrZ3JvdW5kLCBCRy54MSwgQkcueSwgQkcud2lkdGgsIEJHLmhlaWdodCk7XG5cdFx0Y3R4LmRyYXdJbWFnZShiYWNrZ3JvdW5kMywgQkcueDEsIEJHLnksIEJHLndpZHRoLCBCRy5oZWlnaHQpO1xuXHRcdGN0eC5kcmF3SW1hZ2UoYmFja2dyb3VuZDQsIEJHLngxLCBCRy55LCBCRy53aWR0aCwgQkcuaGVpZ2h0KTtcblx0XHRjdHguZHJhd0ltYWdlKGJhY2tncm91bmQyLCBCRy54MSwgQkcueSwgQkcud2lkdGgsIEJHLmhlaWdodCk7XG5cblx0XHRCRy54MiAtPSBnYW1lU3BlZWQ7XG5cdFx0aWYgKEJHLngyIDwgLUJHLndpZHRoKSBCRy54MiA9IEJHLndpZHRoO1xuXHRcdGN0eC5kcmF3SW1hZ2UoYmFja2dyb3VuZCwgQkcueDIsIEJHLnksIEJHLndpZHRoLCBCRy5oZWlnaHQpO1xuXHRcdGN0eC5kcmF3SW1hZ2UoYmFja2dyb3VuZDMsIEJHLngyLCBCRy55LCBCRy53aWR0aCwgQkcuaGVpZ2h0KTtcblx0XHRjdHguZHJhd0ltYWdlKGJhY2tncm91bmQ0LCBCRy54MiwgQkcueSwgQkcud2lkdGgsIEJHLmhlaWdodCk7XG5cdFx0Y3R4LmRyYXdJbWFnZShiYWNrZ3JvdW5kMiwgQkcueDIsIEJHLnksIEJHLndpZHRoLCBCRy5oZWlnaHQpO1xuXHR9XG5cblx0Ly8gYW5pbWF0aW9uIGxvb3Bcblx0ZnVuY3Rpb24gYW5pbWF0ZSgpIHtcblx0XHRjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cdFx0aGFuZGxlQmFja2dyb3VuZCgpO1xuXHRcdGhhbmRsZUJ1YmJsZXMoKTtcblx0XHRwbGF5ZXIudXBkYXRlKCk7XG5cdFx0cGxheWVyLmRyYXcoKTtcblxuXHRcdGN0eC5maWxsVGV4dChgc2NvcmU6ICR7c2NvcmV9YCwgMTAsIDUwKTtcblx0XHRnYW1lRnJhbWUrKztcblx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XG5cdH1cblxuXHRhbmltYXRlKCk7XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIChlKSA9PiB7XG5cdFx0Y2FudmFzUG9zaXRpb24gPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdH0pO1xufSk7XG4iXSwicHJlRXhpc3RpbmdDb21tZW50IjoiLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5kbFluQmhZMnM2THk4dmQyVmljR0ZqYXk5aWIyOTBjM1J5WVhBaUxDSjNaV0p3WVdOck9pOHZMeTR2YzNKakwycHpMMjFoYVc0dWFuTWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqdFJRVUZCTzFGQlEwRTdPMUZCUlVFN1VVRkRRVHM3VVVGRlFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEU3VVVGRFFUczdVVUZGUVR0UlFVTkJPenRSUVVWQk8xRkJRMEU3TzFGQlJVRTdVVUZEUVR0UlFVTkJPenM3VVVGSFFUdFJRVU5CT3p0UlFVVkJPMUZCUTBFN08xRkJSVUU3VVVGRFFUdFJRVU5CTzFGQlEwRXNNRU5CUVRCRExHZERRVUZuUXp0UlFVTXhSVHRSUVVOQk96dFJRVVZCTzFGQlEwRTdVVUZEUVR0UlFVTkJMSGRFUVVGM1JDeHJRa0ZCYTBJN1VVRkRNVVU3VVVGRFFTeHBSRUZCYVVRc1kwRkJZenRSUVVNdlJEczdVVUZGUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEU3VVVGRFFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFc2VVTkJRWGxETEdsRFFVRnBRenRSUVVNeFJTeG5TRUZCWjBnc2JVSkJRVzFDTEVWQlFVVTdVVUZEY2trN1VVRkRRVHM3VVVGRlFUdFJRVU5CTzFGQlEwRTdVVUZEUVN3eVFrRkJNa0lzTUVKQlFUQkNMRVZCUVVVN1VVRkRka1FzYVVOQlFXbERMR1ZCUVdVN1VVRkRhRVE3VVVGRFFUdFJRVU5CT3p0UlFVVkJPMUZCUTBFc2MwUkJRWE5FTEN0RVFVRXJSRHM3VVVGRmNrZzdVVUZEUVRzN08xRkJSMEU3VVVGRFFUczdPenM3T3pzN096czdPMEZEYkVaQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJMRVZCUVVVN08wRkJSVVk3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzU1VGQlNUdEJRVU5LTEVkQlFVYzdRVUZEU0RzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFVkJRVVU3TzBGQlJVWTdRVUZEUVR0QlFVTkJMRVZCUVVVN08wRkJSVVk3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFbEJRVWs3UVVGRFNqdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk96dEJRVVZCT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeG5Ra0ZCWjBJN1FVRkRhRUk3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFZEJRVWM3TzBGQlJVZzdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRTlCUVU4N1FVRkRVRHRCUVVOQkxFOUJRVTg3UVVGRFVEdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hIUVVGSE8wRkJRMGc3TzBGQlJVRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVN4NVFrRkJlVUlzVFVGQlRUdEJRVU12UWp0QlFVTkJPMEZCUTBFN08wRkJSVUU3TzBGQlJVRTdRVUZEUVR0QlFVTkJMRVZCUVVVN1FVRkRSaXhEUVVGRElpd2labWxzWlNJNklqRmxPV0kyTURVeU4yRXdZakF3TmpnNFl6Z3hMbXB6SWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUlGeDBMeThnVkdobElHMXZaSFZzWlNCallXTm9aVnh1SUZ4MGRtRnlJR2x1YzNSaGJHeGxaRTF2WkhWc1pYTWdQU0I3ZlR0Y2JseHVJRngwTHk4Z1ZHaGxJSEpsY1hWcGNtVWdablZ1WTNScGIyNWNiaUJjZEdaMWJtTjBhVzl1SUY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4b2JXOWtkV3hsU1dRcElIdGNibHh1SUZ4MFhIUXZMeUJEYUdWamF5QnBaaUJ0YjJSMWJHVWdhWE1nYVc0Z1kyRmphR1ZjYmlCY2RGeDBhV1lvYVc1emRHRnNiR1ZrVFc5a2RXeGxjMXR0YjJSMWJHVkpaRjBwSUh0Y2JpQmNkRngwWEhSeVpYUjFjbTRnYVc1emRHRnNiR1ZrVFc5a2RXeGxjMXR0YjJSMWJHVkpaRjB1Wlhod2IzSjBjenRjYmlCY2RGeDBmVnh1SUZ4MFhIUXZMeUJEY21WaGRHVWdZU0J1WlhjZ2JXOWtkV3hsSUNoaGJtUWdjSFYwSUdsMElHbHVkRzhnZEdobElHTmhZMmhsS1Z4dUlGeDBYSFIyWVhJZ2JXOWtkV3hsSUQwZ2FXNXpkR0ZzYkdWa1RXOWtkV3hsYzF0dGIyUjFiR1ZKWkYwZ1BTQjdYRzRnWEhSY2RGeDBhVG9nYlc5a2RXeGxTV1FzWEc0Z1hIUmNkRngwYkRvZ1ptRnNjMlVzWEc0Z1hIUmNkRngwWlhod2IzSjBjem9nZTMxY2JpQmNkRngwZlR0Y2JseHVJRngwWEhRdkx5QkZlR1ZqZFhSbElIUm9aU0J0YjJSMWJHVWdablZ1WTNScGIyNWNiaUJjZEZ4MGJXOWtkV3hsYzF0dGIyUjFiR1ZKWkYwdVkyRnNiQ2h0YjJSMWJHVXVaWGh3YjNKMGN5d2diVzlrZFd4bExDQnRiMlIxYkdVdVpYaHdiM0owY3l3Z1gxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5azdYRzVjYmlCY2RGeDBMeThnUm14aFp5QjBhR1VnYlc5a2RXeGxJR0Z6SUd4dllXUmxaRnh1SUZ4MFhIUnRiMlIxYkdVdWJDQTlJSFJ5ZFdVN1hHNWNiaUJjZEZ4MEx5OGdVbVYwZFhKdUlIUm9aU0JsZUhCdmNuUnpJRzltSUhSb1pTQnRiMlIxYkdWY2JpQmNkRngwY21WMGRYSnVJRzF2WkhWc1pTNWxlSEJ2Y25Sek8xeHVJRngwZlZ4dVhHNWNiaUJjZEM4dklHVjRjRzl6WlNCMGFHVWdiVzlrZFd4bGN5QnZZbXBsWTNRZ0tGOWZkMlZpY0dGamExOXRiMlIxYkdWelgxOHBYRzRnWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxtMGdQU0J0YjJSMWJHVnpPMXh1WEc0Z1hIUXZMeUJsZUhCdmMyVWdkR2hsSUcxdlpIVnNaU0JqWVdOb1pWeHVJRngwWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHk1aklEMGdhVzV6ZEdGc2JHVmtUVzlrZFd4bGN6dGNibHh1SUZ4MEx5OGdaR1ZtYVc1bElHZGxkSFJsY2lCbWRXNWpkR2x2YmlCbWIzSWdhR0Z5Ylc5dWVTQmxlSEJ2Y25SelhHNGdYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG1RZ1BTQm1kVzVqZEdsdmJpaGxlSEJ2Y25SekxDQnVZVzFsTENCblpYUjBaWElwSUh0Y2JpQmNkRngwYVdZb0lWOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVieWhsZUhCdmNuUnpMQ0J1WVcxbEtTa2dlMXh1SUZ4MFhIUmNkRTlpYW1WamRDNWtaV1pwYm1WUWNtOXdaWEowZVNobGVIQnZjblJ6TENCdVlXMWxMQ0I3SUdWdWRXMWxjbUZpYkdVNklIUnlkV1VzSUdkbGREb2daMlYwZEdWeUlIMHBPMXh1SUZ4MFhIUjlYRzRnWEhSOU8xeHVYRzRnWEhRdkx5QmtaV1pwYm1VZ1gxOWxjMDF2WkhWc1pTQnZiaUJsZUhCdmNuUnpYRzRnWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxuSWdQU0JtZFc1amRHbHZiaWhsZUhCdmNuUnpLU0I3WEc0Z1hIUmNkR2xtS0hSNWNHVnZaaUJUZVcxaWIyd2dJVDA5SUNkMWJtUmxabWx1WldRbklDWW1JRk41YldKdmJDNTBiMU4wY21sdVoxUmhaeWtnZTF4dUlGeDBYSFJjZEU5aWFtVmpkQzVrWldacGJtVlFjbTl3WlhKMGVTaGxlSEJ2Y25SekxDQlRlVzFpYjJ3dWRHOVRkSEpwYm1kVVlXY3NJSHNnZG1Gc2RXVTZJQ2ROYjJSMWJHVW5JSDBwTzF4dUlGeDBYSFI5WEc0Z1hIUmNkRTlpYW1WamRDNWtaV1pwYm1WUWNtOXdaWEowZVNobGVIQnZjblJ6TENBblgxOWxjMDF2WkhWc1pTY3NJSHNnZG1Gc2RXVTZJSFJ5ZFdVZ2ZTazdYRzRnWEhSOU8xeHVYRzRnWEhRdkx5QmpjbVZoZEdVZ1lTQm1ZV3RsSUc1aGJXVnpjR0ZqWlNCdlltcGxZM1JjYmlCY2RDOHZJRzF2WkdVZ0ppQXhPaUIyWVd4MVpTQnBjeUJoSUcxdlpIVnNaU0JwWkN3Z2NtVnhkV2x5WlNCcGRGeHVJRngwTHk4Z2JXOWtaU0FtSURJNklHMWxjbWRsSUdGc2JDQndjbTl3WlhKMGFXVnpJRzltSUhaaGJIVmxJR2x1ZEc4Z2RHaGxJRzV6WEc0Z1hIUXZMeUJ0YjJSbElDWWdORG9nY21WMGRYSnVJSFpoYkhWbElIZG9aVzRnWVd4eVpXRmtlU0J1Y3lCdlltcGxZM1JjYmlCY2RDOHZJRzF2WkdVZ0ppQTRmREU2SUdKbGFHRjJaU0JzYVd0bElISmxjWFZwY21WY2JpQmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1ZENBOUlHWjFibU4wYVc5dUtIWmhiSFZsTENCdGIyUmxLU0I3WEc0Z1hIUmNkR2xtS0cxdlpHVWdKaUF4S1NCMllXeDFaU0E5SUY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4b2RtRnNkV1VwTzF4dUlGeDBYSFJwWmlodGIyUmxJQ1lnT0NrZ2NtVjBkWEp1SUhaaGJIVmxPMXh1SUZ4MFhIUnBaaWdvYlc5a1pTQW1JRFFwSUNZbUlIUjVjR1Z2WmlCMllXeDFaU0E5UFQwZ0oyOWlhbVZqZENjZ0ppWWdkbUZzZFdVZ0ppWWdkbUZzZFdVdVgxOWxjMDF2WkhWc1pTa2djbVYwZFhKdUlIWmhiSFZsTzF4dUlGeDBYSFIyWVhJZ2JuTWdQU0JQWW1wbFkzUXVZM0psWVhSbEtHNTFiR3dwTzF4dUlGeDBYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG5Jb2JuTXBPMXh1SUZ4MFhIUlBZbXBsWTNRdVpHVm1hVzVsVUhKdmNHVnlkSGtvYm5Nc0lDZGtaV1poZFd4MEp5d2dleUJsYm5WdFpYSmhZbXhsT2lCMGNuVmxMQ0IyWVd4MVpUb2dkbUZzZFdVZ2ZTazdYRzRnWEhSY2RHbG1LRzF2WkdVZ0ppQXlJQ1ltSUhSNWNHVnZaaUIyWVd4MVpTQWhQU0FuYzNSeWFXNW5KeWtnWm05eUtIWmhjaUJyWlhrZ2FXNGdkbUZzZFdVcElGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVaQ2h1Y3l3Z2EyVjVMQ0JtZFc1amRHbHZiaWhyWlhrcElIc2djbVYwZFhKdUlIWmhiSFZsVzJ0bGVWMDdJSDB1WW1sdVpDaHVkV3hzTENCclpYa3BLVHRjYmlCY2RGeDBjbVYwZFhKdUlHNXpPMXh1SUZ4MGZUdGNibHh1SUZ4MEx5OGdaMlYwUkdWbVlYVnNkRVY0Y0c5eWRDQm1kVzVqZEdsdmJpQm1iM0lnWTI5dGNHRjBhV0pwYkdsMGVTQjNhWFJvSUc1dmJpMW9ZWEp0YjI1NUlHMXZaSFZzWlhOY2JpQmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1YmlBOUlHWjFibU4wYVc5dUtHMXZaSFZzWlNrZ2UxeHVJRngwWEhSMllYSWdaMlYwZEdWeUlEMGdiVzlrZFd4bElDWW1JRzF2WkhWc1pTNWZYMlZ6VFc5a2RXeGxJRDljYmlCY2RGeDBYSFJtZFc1amRHbHZiaUJuWlhSRVpXWmhkV3gwS0NrZ2V5QnlaWFIxY200Z2JXOWtkV3hsV3lka1pXWmhkV3gwSjEwN0lIMGdPbHh1SUZ4MFhIUmNkR1oxYm1OMGFXOXVJR2RsZEUxdlpIVnNaVVY0Y0c5eWRITW9LU0I3SUhKbGRIVnliaUJ0YjJSMWJHVTdJSDA3WEc0Z1hIUmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1WkNoblpYUjBaWElzSUNkaEp5d2daMlYwZEdWeUtUdGNiaUJjZEZ4MGNtVjBkWEp1SUdkbGRIUmxjanRjYmlCY2RIMDdYRzVjYmlCY2RDOHZJRTlpYW1WamRDNXdjbTkwYjNSNWNHVXVhR0Z6VDNkdVVISnZjR1Z5ZEhrdVkyRnNiRnh1SUZ4MFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NXZJRDBnWm5WdVkzUnBiMjRvYjJKcVpXTjBMQ0J3Y205d1pYSjBlU2tnZXlCeVpYUjFjbTRnVDJKcVpXTjBMbkJ5YjNSdmRIbHdaUzVvWVhOUGQyNVFjbTl3WlhKMGVTNWpZV3hzS0c5aWFtVmpkQ3dnY0hKdmNHVnlkSGtwT3lCOU8xeHVYRzRnWEhRdkx5QmZYM2RsWW5CaFkydGZjSFZpYkdsalgzQmhkR2hmWDF4dUlGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV3SUQwZ1hDSmNJanRjYmx4dVhHNGdYSFF2THlCTWIyRmtJR1Z1ZEhKNUlHMXZaSFZzWlNCaGJtUWdjbVYwZFhKdUlHVjRjRzl5ZEhOY2JpQmNkSEpsZEhWeWJpQmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZLRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1Y3lBOUlGd2lMaTl6Y21NdmFuTXZiV0ZwYmk1cWMxd2lLVHRjYmlJc0ltUnZZM1Z0Wlc1MExtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb0owUlBUVU52Ym5SbGJuUk1iMkZrWldRbkxDQm1kVzVqZEdsdmJpQW9LU0I3WEc1Y2RIZHBibVJ2ZHk1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0Nkc2IyRmtKeXdnS0dVcElEMCtJSHRjYmx4MFhIUmpiMjV6ZENCd2NtVnNiMkZrSUQwZ1pHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZjaWduTG5CeVpXeHZZV1FuS1R0Y2JseHVYSFJjZEhCeVpXeHZZV1F1WTJ4aGMzTk1hWE4wTG1Ga1pDZ25jSEpsYkc5aFpDMW1hVzVwYzJobFpDY3BPMXh1WEhSOUtUdGNibHh1WEhSamIyNXpkQ0JpZEc1VFkzSnZiR3hVYjFSdmNDQTlJR1J2WTNWdFpXNTBMbWRsZEVWc1pXMWxiblJDZVVsa0tDZGlkRzVUWTNKdmJHeFViMVJ2Y0NjcE8xeHVYRzVjZEdsbUlDaGlkRzVUWTNKdmJHeFViMVJ2Y0NrZ2UxeHVYSFJjZEdKMGJsTmpjbTlzYkZSdlZHOXdMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSW9KMk5zYVdOckp5d2dLR1VwSUQwK0lIdGNibHgwWEhSY2RIZHBibVJ2ZHk1elkzSnZiR3hVYnloN1hHNWNkRngwWEhSY2RIUnZjRG9nTUN4Y2JseDBYSFJjZEZ4MGJHVm1kRG9nTUN4Y2JseDBYSFJjZEZ4MFltVm9ZWFpwYjNJNklDZHpiVzl2ZEdnbkxGeHVYSFJjZEZ4MGZTazdYRzVjZEZ4MGZTazdYRzVjZEgxY2JseHVYSFF2THlCallXNTJZWE1nYzJWMGRYQmNibHgwWTI5dWMzUWdZMkZ1ZG1GeklEMGdaRzlqZFcxbGJuUXVaMlYwUld4bGJXVnVkRUo1U1dRb0oyTmhiblpoY3pFbktUdGNibHgwWTI5dWMzUWdZM1I0SUQwZ1kyRnVkbUZ6TG1kbGRFTnZiblJsZUhRb0p6SmtKeWs3WEc1Y2RHTmhiblpoY3k1M2FXUjBhQ0E5SURnd01EdGNibHgwWTJGdWRtRnpMbWhsYVdkb2RDQTlJRFV3TUR0Y2JseHVYSFJzWlhRZ2MyTnZjbVVnUFNBd08xeHVYSFJzWlhRZ1oyRnRaVVp5WVcxbElEMGdNRHRjYmx4MFkzUjRMbVp2Ym5RZ1BTQW5OVEJ3ZUNCSFpXOXlaMmxoSnp0Y2JseDBiR1YwSUdkaGJXVlRjR1ZsWkNBOUlFMWhkR2d1Wm14dmIzSW9UV0YwYUM1eVlXNWtiMjBvS1NBcUlEUWdLeUF4S1R0Y2JseHVYSFF2THlCdGIzVnpaU0JwYm5SbGNtRmpkR2wyYVhSNVhHNWNkR3hsZENCallXNTJZWE5RYjNOcGRHbHZiaUE5SUdOaGJuWmhjeTVuWlhSQ2IzVnVaR2x1WjBOc2FXVnVkRkpsWTNRb0tUdGNibHh1WEhSamIyNXpkQ0J0YjNWelpTQTlJSHRjYmx4MFhIUjRPaUJqWVc1MllYTXVkMmxrZEdnZ0x5QXlMRnh1WEhSY2RIazZJR05oYm5aaGN5NW9aV2xuYUhRZ0x5QXlMRnh1WEhSY2RHTnNhV05yT2lCbVlXeHpaU3hjYmx4MGZUdGNibHh1WEhSallXNTJZWE11WVdSa1JYWmxiblJNYVhOMFpXNWxjaWduYlc5MWMyVmtiM2R1Snl3Z0tHVXBJRDArSUh0Y2JseDBYSFJ0YjNWelpTNWpiR2xqYXlBOUlIUnlkV1U3WEc1Y2RGeDBiVzkxYzJVdWVDQTlJR1V1ZUNBdElHTmhiblpoYzFCdmMybDBhVzl1TG14bFpuUTdYRzVjZEZ4MGJXOTFjMlV1ZVNBOUlHVXVlU0F0SUdOaGJuWmhjMUJ2YzJsMGFXOXVMblJ2Y0R0Y2JseDBmU2s3WEc1Y2JseDBZMkZ1ZG1GekxtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb0oyMXZkWE5sZFhBbkxDQW9aU2tnUFQ0Z2UxeHVYSFJjZEcxdmRYTmxMbU5zYVdOcklEMGdabUZzYzJVN1hHNWNkSDBwTzF4dVhHNWNkQzh2SUhCc1lYbGxjaUJqYUdGeVlXTjBaWEpjYmx4MFkyOXVjM1FnY0d4aGVXVnlUR1ZtZENBOUlHNWxkeUJKYldGblpTZ3BPMXh1WEhSd2JHRjVaWEpNWldaMExuTnlZeUE5SUNjdUwyRnpjMlYwY3k5cGJXRm5aWE12Ylc5dWMzUmxjbGRoYkd0TVpXWjBMbkJ1WnljN1hHNWNkR052Ym5OMElIQnNZWGxsY2xKcFoyaDBJRDBnYm1WM0lFbHRZV2RsS0NrN1hHNWNkSEJzWVhsbGNsSnBaMmgwTG5OeVl5QTlJQ2N1TDJGemMyVjBjeTlwYldGblpYTXZiVzl1YzNSbGNsZGhiR3RTYVdkb2RDNXdibWNuTzF4dVhHNWNkR05zWVhOeklGQnNZWGxsY2lCN1hHNWNkRngwWTI5dWMzUnlkV04wYjNJb0tTQjdYRzVjZEZ4MFhIUjBhR2x6TG5nZ1BTQmpZVzUyWVhNdWQybGtkR2dnTHlBeU8xeHVYSFJjZEZ4MGRHaHBjeTU1SUQwZ1kyRnVkbUZ6TG1obGFXZG9kQ0F2SURJN1hHNWNkRngwWEhSMGFHbHpMbkpoWkdsMWN5QTlJRFV3TzF4dVhIUmNkRngwZEdocGN5NWhibWRzWlNBOUlEQTdYRzVjZEZ4MFhIUjBhR2x6TG1aeVlXMWxXQ0E5SURBN1hHNWNkRngwWEhSMGFHbHpMbVp5WVcxbFdTQTlJREE3WEc1Y2RGeDBYSFIwYUdsekxtWnlZVzFsSUQwZ01EdGNibHgwWEhSY2RIUm9hWE11YzNCeWFYUmxWMmxrZEdnZ1BTQTFOelU3WEc1Y2RGeDBYSFIwYUdsekxuTndjbWwwWlVobGFXZG9kQ0E5SURVME1qdGNibHgwWEhSOVhHNWNibHgwWEhSMWNHUmhkR1VvS1NCN1hHNWNkRngwWEhSamIyNXpkQ0JrZUNBOUlIUm9hWE11ZUNBdElHMXZkWE5sTG5nN1hHNWNkRngwWEhSamIyNXpkQ0JrZVNBOUlIUm9hWE11ZVNBdElHMXZkWE5sTG5rN1hHNWNkRngwWEhSc1pYUWdkR2hsZEdFZ1BTQk5ZWFJvTG1GMFlXNHlLR1I1TENCa2VDazdYRzVjZEZ4MFhIUjBhR2x6TG1GdVoyeGxJRDBnZEdobGRHRTdYRzVjYmx4MFhIUmNkR2xtSUNodGIzVnpaUzU0SUNFOUlIUm9hWE11ZUNrZ2UxeHVYSFJjZEZ4MFhIUjBhR2x6TG5nZ0xUMGdaSGdnTHlBeU1EdGNibHgwWEhSY2RIMWNibHgwWEhSY2RHbG1JQ2h0YjNWelpTNTVJQ0U5SUhSb2FYTXVlU2tnZTF4dVhIUmNkRngwWEhSMGFHbHpMbmtnTFQwZ1pIa2dMeUF5TUR0Y2JseDBYSFJjZEgxY2JseDBYSFI5WEc1Y2JseDBYSFJrY21GM0tDa2dlMXh1WEhSY2RGeDBhV1lnS0cxdmRYTmxMbU5zYVdOcktTQjdYRzVjZEZ4MFhIUmNkR04wZUM1c2FXNWxWMmxrZEdnZ1BTQXdMakk3WEc1Y2RGeDBYSFJjZEdOMGVDNWlaV2RwYmxCaGRHZ29LVHRjYmx4MFhIUmNkRngwWTNSNExtMXZkbVZVYnloMGFHbHpMbmdzSUhSb2FYTXVlU2s3WEc1Y2RGeDBYSFJjZEdOMGVDNXNhVzVsVkc4b2JXOTFjMlV1ZUN3Z2JXOTFjMlV1ZVNrN1hHNWNkRngwWEhSOVhHNWNibHgwWEhSY2RHTjBlQzVtYVd4c1UzUjViR1VnUFNBbmNtVmtKenRjYmx4MFhIUmNkR04wZUM1aVpXZHBibEJoZEdnb0tUdGNibHgwWEhSY2RHTjBlQzVoY21Nb2RHaHBjeTU0TENCMGFHbHpMbmtzSUhSb2FYTXVjbUZrYVhWekxDQXdMQ0JOWVhSb0xsQkpJQ29nTWlrN1hHNWNkRngwWEhSamRIZ3VabWxzYkNncE8xeHVYSFJjZEZ4MFkzUjRMbU5zYjNObFVHRjBhQ2dwTzF4dVhIUmNkRngwWTNSNExtWnBiR3hTWldOMEtIUm9hWE11ZUN3Z2RHaHBjeTU1TENCMGFHbHpMbkpoWkdsMWN5d2dNVEFwTzF4dVhHNWNkRngwWEhSamRIZ3VjMkYyWlNncE8xeHVYSFJjZEZ4MFkzUjRMblJ5WVc1emJHRjBaU2gwYUdsekxuZ3NJSFJvYVhNdWVTazdYRzVjZEZ4MFhIUmpkSGd1Y205MFlYUmxLSFJvYVhNdVlXNW5iR1VwTzF4dVhHNWNkRngwWEhScFppQW9kR2hwY3k1NElENDlJRzF2ZFhObExuZ3BJSHRjYmx4MFhIUmNkRngwWTNSNExtUnlZWGRKYldGblpTaGNibHgwWEhSY2RGeDBYSFJ3YkdGNVpYSk1aV1owTEZ4dVhIUmNkRngwWEhSY2RIUm9hWE11Wm5KaGJXVllJQ29nZEdocGN5NXpjSEpwZEdWWGFXUjBhQ3hjYmx4MFhIUmNkRngwWEhSMGFHbHpMbVp5WVcxbFdTQXFJSFJvYVhNdWMzQnlhWFJsU0dWcFoyaDBMRnh1WEhSY2RGeDBYSFJjZEhSb2FYTXVjM0J5YVhSbFYybGtkR2dzWEc1Y2RGeDBYSFJjZEZ4MGRHaHBjeTV6Y0hKcGRHVklaV2xuYUhRc1hHNWNkRngwWEhSY2RGeDBNQ0F0SURVMUxGeHVYSFJjZEZ4MFhIUmNkREFnTFNBMU1DeGNibHgwWEhSY2RGeDBYSFIwYUdsekxuTndjbWwwWlZkcFpIUm9JQzhnTlN4Y2JseDBYSFJjZEZ4MFhIUjBhR2x6TG5Od2NtbDBaVWhsYVdkb2RDQXZJRFZjYmx4MFhIUmNkRngwS1R0Y2JseDBYSFJjZEgwZ1pXeHpaU0I3WEc1Y2RGeDBYSFJjZEdOMGVDNWtjbUYzU1cxaFoyVW9YRzVjZEZ4MFhIUmNkRngwY0d4aGVXVnlVbWxuYUhRc1hHNWNkRngwWEhSY2RGeDBkR2hwY3k1bWNtRnRaVmdnS2lCMGFHbHpMbk53Y21sMFpWZHBaSFJvTEZ4dVhIUmNkRngwWEhSY2RIUm9hWE11Wm5KaGJXVlpJQ29nZEdocGN5NXpjSEpwZEdWSVpXbG5hSFFzWEc1Y2RGeDBYSFJjZEZ4MGRHaHBjeTV6Y0hKcGRHVlhhV1IwYUN4Y2JseDBYSFJjZEZ4MFhIUjBhR2x6TG5Od2NtbDBaVWhsYVdkb2RDeGNibHgwWEhSY2RGeDBYSFF3SUMwZ05qQXNYRzVjZEZ4MFhIUmNkRngwTUNBdElEVTFMRnh1WEhSY2RGeDBYSFJjZEhSb2FYTXVjM0J5YVhSbFYybGtkR2dnTHlBMUxGeHVYSFJjZEZ4MFhIUmNkSFJvYVhNdWMzQnlhWFJsU0dWcFoyaDBJQzhnTlZ4dVhIUmNkRngwWEhRcE8xeHVYSFJjZEZ4MGZWeHVYRzVjZEZ4MFhIUmpkSGd1Y21WemRHOXlaU2dwTzF4dVhIUmNkSDFjYmx4MGZWeHVYRzVjZEdOdmJuTjBJSEJzWVhsbGNpQTlJRzVsZHlCUWJHRjVaWElvS1R0Y2JseHVYSFF2THlCcGJuUmxjbUZqZEdsMlpTQmxiR1Z0Wlc1MGMxeHVYSFJqYjI1emRDQmxiR1Z0Wlc1MGMwRnljbUY1SUQwZ1cxMDdYRzVjZEdOdmJuTjBJR1p5ZFdsMFNXMWhaMlVnUFNCdVpYY2dTVzFoWjJVb0tUdGNibHgwWm5KMWFYUkpiV0ZuWlM1emNtTWdQU0FuTGk5aGMzTmxkSE12YVcxaFoyVnpMMkZ3Y0d4bExuQnVaeWM3WEc1Y2JseDBZMnhoYzNNZ1FuVmlZbXhsSUh0Y2JseDBYSFJqYjI1emRISjFZM1J2Y2lncElIdGNibHgwWEhSY2RIUm9hWE11ZUNBOUlFMWhkR2d1Y21GdVpHOXRLQ2tnS2lCallXNTJZWE11ZDJsa2RHZzdYRzVjZEZ4MFhIUjBhR2x6TG5rZ1BTQXRNVEF3TzF4dVhIUmNkRngwZEdocGN5NXlZV1JwZFhNZ1BTQTFNRHRjYmx4MFhIUmNkSFJvYVhNdWMzQmxaV1FnUFNCTllYUm9MbkpoYm1SdmJTZ3BJQ29nTlNBcklERTdYRzVjZEZ4MFhIUjBhR2x6TG1ScGMzUmhibU5sTzF4dVhIUmNkRngwZEdocGN5NWpiM1Z1ZEdWa0lEMGdabUZzYzJVN1hHNWNkRngwWEhSMGFHbHpMbk52ZFc1a0lEMGdUV0YwYUM1eVlXNWtiMjBvS1NBOFBTQXdMalVnUHlBbmMyOTFibVF4SnlBNklDZHpiM1Z1WkRJbk8xeHVYSFJjZEgxY2JseHVYSFJjZEhWd1pHRjBaU2dwSUh0Y2JseDBYSFJjZEhSb2FYTXVlU0FyUFNCMGFHbHpMbk53WldWa08xeHVYSFJjZEZ4MFkyOXVjM1FnWkhnZ1BTQjBhR2x6TG5nZ0xTQndiR0Y1WlhJdWVEdGNibHgwWEhSY2RHTnZibk4wSUdSNUlEMGdkR2hwY3k1NUlDMGdjR3hoZVdWeUxuazdYRzVjZEZ4MFhIUjBhR2x6TG1ScGMzUmhibU5sSUQwZ1RXRjBhQzV6Y1hKMEtHUjRJQ29nWkhnZ0t5QmtlU0FxSUdSNUtUdGNibHgwWEhSOVhHNWNibHgwWEhSa2NtRjNLQ2tnZTF4dVhIUmNkRngwTHlvZ1kzUjRMbVpwYkd4VGRIbHNaU0E5SUNkaWJIVmxKenRjYmx4MFhIUmNkR04wZUM1aVpXZHBibEJoZEdnb0tUdGNibHgwWEhSY2RHTjBlQzVoY21Nb2RHaHBjeTU0TENCMGFHbHpMbmtzSUhSb2FYTXVjbUZrYVhWekxDQXdMQ0JOWVhSb0xsQkpJQ29nTWlrN1hHNWNkRngwWEhSamRIZ3VabWxzYkNncE8xeHVYSFJjZEZ4MFkzUjRMbU5zYjNObFVHRjBhQ2dwTzF4dVhIUmNkRngwWTNSNExuTjBjbTlyWlNncE95QXFMMXh1WEhSY2RGeDBZM1I0TG1SeVlYZEpiV0ZuWlNoY2JseDBYSFJjZEZ4MFpuSjFhWFJKYldGblpTeGNibHgwWEhSY2RGeDBkR2hwY3k1NElDMGdOVEFzWEc1Y2RGeDBYSFJjZEhSb2FYTXVlU0F0SURVd0xGeHVYSFJjZEZ4MFhIUjBhR2x6TG5KaFpHbDFjeUFxSURJc1hHNWNkRngwWEhSY2RIUm9hWE11Y21Ga2FYVnpJQ29nTWx4dVhIUmNkRngwS1R0Y2JseDBYSFI5WEc1Y2RIMWNibHh1WEhSamIyNXpkQ0JpZFdKaWJHVlFiM0F4SUQwZ1pHOWpkVzFsYm5RdVkzSmxZWFJsUld4bGJXVnVkQ2duWVhWa2FXOG5LVHRjYmx4MFluVmlZbXhsVUc5d01TNXpjbU1nUFNBbkxpOXpiM1Z1WkhNdlpXRjBYekF4TG05blp5YzdYRzVjZEdOdmJuTjBJR0oxWW1Kc1pWQnZjRElnUFNCa2IyTjFiV1Z1ZEM1amNtVmhkR1ZGYkdWdFpXNTBLQ2RoZFdScGJ5Y3BPMXh1WEhSaWRXSmliR1ZRYjNBeUxuTnlZeUE5SUNjdUwzTnZkVzVrY3k5bFlYUmZNRFF1YjJkbkp6dGNibHh1WEhSbWRXNWpkR2x2YmlCb1lXNWtiR1ZDZFdKaWJHVnpLQ2tnZTF4dVhIUmNkR2xtSUNobllXMWxSbkpoYldVZ0pTQTFNQ0E5UFNBd0tTQjdYRzVjZEZ4MFhIUmxiR1Z0Wlc1MGMwRnljbUY1TG5CMWMyZ29ibVYzSUVKMVltSnNaU2dwS1R0Y2JseDBYSFI5WEc1Y2JseDBYSFJsYkdWdFpXNTBjMEZ5Y21GNUxtWnZja1ZoWTJnb0tHSjFZbUpzWlNrZ1BUNGdlMXh1WEhSY2RGeDBZblZpWW14bExuVndaR0YwWlNncE8xeHVYSFJjZEZ4MFluVmlZbXhsTG1SeVlYY29LVHRjYmx4MFhIUjlLVHRjYmx4dVhIUmNkR1ZzWlcxbGJuUnpRWEp5WVhrdVptOXlSV0ZqYUNnb1luVmlZbXhsTENCcGJtUmxlQ2tnUFQ0Z2UxeHVYSFJjZEZ4MGFXWWdLR0oxWW1Kc1pTNTVJRHdnTUNBdElHSjFZbUpzWlM1eVlXUnBkWE1nS2lBeUtTQjdYRzVjZEZ4MFhIUmNkR1ZzWlcxbGJuUnpRWEp5WVhrdWMzQnNhV05sS0dsdVpHVjRMQ0F4S1R0Y2JseDBYSFJjZEgxY2JseHVYSFJjZEZ4MGFXWWdLR0oxWW1Kc1pTa2dlMXh1WEhSY2RGeDBYSFJwWmlBb1luVmlZbXhsTG1ScGMzUmhibU5sSUR3Z1luVmlZbXhsTG5KaFpHbDFjeUFySUhCc1lYbGxjaTV5WVdScGRYTXBJSHRjYmx4MFhIUmNkRngwWEhScFppQW9JV0oxWW1Kc1pTNWpiM1Z1ZEdWa0tTQjdYRzVjZEZ4MFhIUmNkRngwWEhRdktpQnBaaUFvWW5WaVlteGxMbk52ZFc1a0lEMDlJQ2R6YjNWdVpERW5LU0I3WEc1Y2RGeDBYSFJjZEZ4MFhIUmNkR0oxWW1Kc1pWQnZjREV1Y0d4aGVTZ3BPMXh1WEhSY2RGeDBYSFJjZEZ4MGZTQmxiSE5sSUh0Y2JseDBYSFJjZEZ4MFhIUmNkRngwWW5WaVlteGxVRzl3TWk1d2JHRjVLQ2s3WEc1Y2RGeDBYSFJjZEZ4MFhIUjlJQ292WEc1Y2RGeDBYSFJjZEZ4MFhIUnpZMjl5WlNzck8xeHVYSFJjZEZ4MFhIUmNkRngwWW5WaVlteGxMbU52ZFc1MFpXUWdQU0IwY25WbE8xeHVYSFJjZEZ4MFhIUmNkRngwWld4bGJXVnVkSE5CY25KaGVTNXpjR3hwWTJVb2FXNWtaWGdzSURFcE8xeHVYSFJjZEZ4MFhIUmNkSDFjYmx4MFhIUmNkRngwZlZ4dVhIUmNkRngwZlZ4dVhIUmNkSDBwTzF4dVhIUjlYRzVjYmx4MEx5OGdjbVZ3WldGMGFXNW5JR0poWTJ0bmNtOTFibVJjYmx4MFkyOXVjM1FnWW1GamEyZHliM1Z1WkNBOUlHNWxkeUJKYldGblpTZ3BPMXh1WEhSaVlXTnJaM0p2ZFc1a0xuTnlZeUE5SUNjdUwyRnpjMlYwY3k5cGJXRm5aWE12Y0dGeVlXeHNZWGd0Wm05eVpYTjBMV0poWTJzdGRISmxaWE11Y0c1bkp6dGNibHh1WEhSamIyNXpkQ0JpWVdOclozSnZkVzVrTWlBOUlHNWxkeUJKYldGblpTZ3BPMXh1WEhSaVlXTnJaM0p2ZFc1a01pNXpjbU1nUFNBbkxpOWhjM05sZEhNdmFXMWhaMlZ6TDNCaGNtRnNiR0Y0TFdadmNtVnpkQzFtY205dWRDMTBjbVZsY3k1d2JtY25PMXh1WEc1Y2RHTnZibk4wSUdKaFkydG5jbTkxYm1ReklEMGdibVYzSUVsdFlXZGxLQ2s3WEc1Y2RHSmhZMnRuY205MWJtUXpMbk55WXlBOUlDY3VMMkZ6YzJWMGN5OXBiV0ZuWlhNdmNHRnlZV3hzWVhndFptOXlaWE4wTFd4cFoyaDBjeTV3Ym1jbk8xeHVYRzVjZEdOdmJuTjBJR0poWTJ0bmNtOTFibVEwSUQwZ2JtVjNJRWx0WVdkbEtDazdYRzVjZEdKaFkydG5jbTkxYm1RMExuTnlZeUE5SUNjdUwyRnpjMlYwY3k5cGJXRm5aWE12Y0dGeVlXeHNZWGd0Wm05eVpYTjBMVzFwWkdSc1pTMTBjbVZsY3k1d2JtY25PMXh1WEc1Y2RHTnZibk4wSUVKSElEMGdlMXh1WEhSY2RIZ3hPaUF3TEZ4dVhIUmNkSGd5T2lCallXNTJZWE11ZDJsa2RHZ3NYRzVjZEZ4MGVUb2dNQ3hjYmx4MFhIUjNhV1IwYURvZ1kyRnVkbUZ6TG5kcFpIUm9MRnh1WEhSY2RHaGxhV2RvZERvZ1kyRnVkbUZ6TG1obGFXZG9kQ3hjYmx4MGZUdGNibHh1WEhSbWRXNWpkR2x2YmlCb1lXNWtiR1ZDWVdOclozSnZkVzVrS0NrZ2UxeHVYSFJjZEVKSExuZ3hJQzA5SUdkaGJXVlRjR1ZsWkR0Y2JseDBYSFJwWmlBb1FrY3VlREVnUENBdFFrY3VkMmxrZEdncElFSkhMbmd4SUQwZ1FrY3VkMmxrZEdnN1hHNWNibHgwWEhSamRIZ3VaSEpoZDBsdFlXZGxLR0poWTJ0bmNtOTFibVFzSUVKSExuZ3hMQ0JDUnk1NUxDQkNSeTUzYVdSMGFDd2dRa2N1YUdWcFoyaDBLVHRjYmx4MFhIUmpkSGd1WkhKaGQwbHRZV2RsS0dKaFkydG5jbTkxYm1RekxDQkNSeTU0TVN3Z1FrY3VlU3dnUWtjdWQybGtkR2dzSUVKSExtaGxhV2RvZENrN1hHNWNkRngwWTNSNExtUnlZWGRKYldGblpTaGlZV05yWjNKdmRXNWtOQ3dnUWtjdWVERXNJRUpITG5rc0lFSkhMbmRwWkhSb0xDQkNSeTVvWldsbmFIUXBPMXh1WEhSY2RHTjBlQzVrY21GM1NXMWhaMlVvWW1GamEyZHliM1Z1WkRJc0lFSkhMbmd4TENCQ1J5NTVMQ0JDUnk1M2FXUjBhQ3dnUWtjdWFHVnBaMmgwS1R0Y2JseHVYSFJjZEVKSExuZ3lJQzA5SUdkaGJXVlRjR1ZsWkR0Y2JseDBYSFJwWmlBb1FrY3VlRElnUENBdFFrY3VkMmxrZEdncElFSkhMbmd5SUQwZ1FrY3VkMmxrZEdnN1hHNWNkRngwWTNSNExtUnlZWGRKYldGblpTaGlZV05yWjNKdmRXNWtMQ0JDUnk1NE1pd2dRa2N1ZVN3Z1FrY3VkMmxrZEdnc0lFSkhMbWhsYVdkb2RDazdYRzVjZEZ4MFkzUjRMbVJ5WVhkSmJXRm5aU2hpWVdOclozSnZkVzVrTXl3Z1FrY3VlRElzSUVKSExua3NJRUpITG5kcFpIUm9MQ0JDUnk1b1pXbG5hSFFwTzF4dVhIUmNkR04wZUM1a2NtRjNTVzFoWjJVb1ltRmphMmR5YjNWdVpEUXNJRUpITG5neUxDQkNSeTU1TENCQ1J5NTNhV1IwYUN3Z1FrY3VhR1ZwWjJoMEtUdGNibHgwWEhSamRIZ3VaSEpoZDBsdFlXZGxLR0poWTJ0bmNtOTFibVF5TENCQ1J5NTRNaXdnUWtjdWVTd2dRa2N1ZDJsa2RHZ3NJRUpITG1obGFXZG9kQ2s3WEc1Y2RIMWNibHh1WEhRdkx5QmhibWx0WVhScGIyNGdiRzl2Y0Z4dVhIUm1kVzVqZEdsdmJpQmhibWx0WVhSbEtDa2dlMXh1WEhSY2RHTjBlQzVqYkdWaGNsSmxZM1FvTUN3Z01Dd2dZMkZ1ZG1GekxuZHBaSFJvTENCallXNTJZWE11YUdWcFoyaDBLVHRjYmx4MFhIUm9ZVzVrYkdWQ1lXTnJaM0p2ZFc1a0tDazdYRzVjZEZ4MGFHRnVaR3hsUW5WaVlteGxjeWdwTzF4dVhIUmNkSEJzWVhsbGNpNTFjR1JoZEdVb0tUdGNibHgwWEhSd2JHRjVaWEl1WkhKaGR5Z3BPMXh1WEc1Y2RGeDBZM1I0TG1acGJHeFVaWGgwS0dCelkyOXlaVG9nSkh0elkyOXlaWDFnTENBeE1Dd2dOVEFwTzF4dVhIUmNkR2RoYldWR2NtRnRaU3NyTzF4dVhIUmNkSEpsY1hWbGMzUkJibWx0WVhScGIyNUdjbUZ0WlNoaGJtbHRZWFJsS1R0Y2JseDBmVnh1WEc1Y2RHRnVhVzFoZEdVb0tUdGNibHh1WEhSM2FXNWtiM2N1WVdSa1JYWmxiblJNYVhOMFpXNWxjaWduY21WemFYcGxKeXdnS0dVcElEMCtJSHRjYmx4MFhIUmpZVzUyWVhOUWIzTnBkR2x2YmlBOUlHTmhiblpoY3k1blpYUkNiM1Z1WkdsdVowTnNhV1Z1ZEZKbFkzUW9LVHRjYmx4MGZTazdYRzU5S1R0Y2JpSmRMQ0p6YjNWeVkyVlNiMjkwSWpvaUluMD0ifQ==