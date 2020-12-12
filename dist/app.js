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
				ctx.stroke();
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
					0 - 60,
					0 - 45,
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
					0 - 45,
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
	class Bubble {
		constructor() {
			this.x = Math.random() * canvas.width;
			this.y = canvas.height + 100;
			this.radius = 50;
			this.speed = Math.random() * 5 + 1;
			this.distance;
			this.counted = false;
			this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2';
		}

		update() {
			this.y -= this.speed;
			const dx = this.x - player.x;
			const dy = this.y - player.y;
			this.distance = Math.sqrt(dx * dx + dy * dy);
		}

		draw() {
			ctx.fillStyle = 'blue';
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
			ctx.fill();
			ctx.closePath();
			ctx.stroke();
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlCQUF5QixNQUFNO0FBQy9CO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGLENBQUMiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvbWFpbi5qc1wiKTtcbiIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKGUpID0+IHtcblx0XHRjb25zdCBwcmVsb2FkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWxvYWQnKTtcblxuXHRcdHByZWxvYWQuY2xhc3NMaXN0LmFkZCgncHJlbG9hZC1maW5pc2hlZCcpO1xuXHR9KTtcblxuXHRjb25zdCBidG5TY3JvbGxUb1RvcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5TY3JvbGxUb1RvcCcpO1xuXG5cdGlmIChidG5TY3JvbGxUb1RvcCkge1xuXHRcdGJ0blNjcm9sbFRvVG9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcblx0XHRcdHdpbmRvdy5zY3JvbGxUbyh7XG5cdFx0XHRcdHRvcDogMCxcblx0XHRcdFx0bGVmdDogMCxcblx0XHRcdFx0YmVoYXZpb3I6ICdzbW9vdGgnLFxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHQvLyBjYW52YXMgc2V0dXBcblx0Y29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhczEnKTtcblx0Y29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cdGNhbnZhcy53aWR0aCA9IDgwMDtcblx0Y2FudmFzLmhlaWdodCA9IDUwMDtcblxuXHRsZXQgc2NvcmUgPSAwO1xuXHRsZXQgZ2FtZUZyYW1lID0gMDtcblx0Y3R4LmZvbnQgPSAnNTBweCBHZW9yZ2lhJztcblx0bGV0IGdhbWVTcGVlZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDQgKyAxKTtcblxuXHQvLyBtb3VzZSBpbnRlcmFjdGl2aXR5XG5cdGxldCBjYW52YXNQb3NpdGlvbiA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuXHRjb25zdCBtb3VzZSA9IHtcblx0XHR4OiBjYW52YXMud2lkdGggLyAyLFxuXHRcdHk6IGNhbnZhcy5oZWlnaHQgLyAyLFxuXHRcdGNsaWNrOiBmYWxzZSxcblx0fTtcblxuXHRjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGUpID0+IHtcblx0XHRtb3VzZS5jbGljayA9IHRydWU7XG5cdFx0bW91c2UueCA9IGUueCAtIGNhbnZhc1Bvc2l0aW9uLmxlZnQ7XG5cdFx0bW91c2UueSA9IGUueSAtIGNhbnZhc1Bvc2l0aW9uLnRvcDtcblx0fSk7XG5cblx0Y2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoZSkgPT4ge1xuXHRcdG1vdXNlLmNsaWNrID0gZmFsc2U7XG5cdH0pO1xuXG5cdC8vIHBsYXllciBjaGFyYWN0ZXJcblx0Y29uc3QgcGxheWVyTGVmdCA9IG5ldyBJbWFnZSgpO1xuXHRwbGF5ZXJMZWZ0LnNyYyA9ICcuL2Fzc2V0cy9pbWFnZXMvbW9uc3RlcldhbGtMZWZ0LnBuZyc7XG5cdGNvbnN0IHBsYXllclJpZ2h0ID0gbmV3IEltYWdlKCk7XG5cdHBsYXllclJpZ2h0LnNyYyA9ICcuL2Fzc2V0cy9pbWFnZXMvbW9uc3RlcldhbGtSaWdodC5wbmcnO1xuXG5cdGNsYXNzIFBsYXllciB7XG5cdFx0Y29uc3RydWN0b3IoKSB7XG5cdFx0XHR0aGlzLnggPSBjYW52YXMud2lkdGggLyAyO1xuXHRcdFx0dGhpcy55ID0gY2FudmFzLmhlaWdodCAvIDI7XG5cdFx0XHR0aGlzLnJhZGl1cyA9IDUwO1xuXHRcdFx0dGhpcy5hbmdsZSA9IDA7XG5cdFx0XHR0aGlzLmZyYW1lWCA9IDA7XG5cdFx0XHR0aGlzLmZyYW1lWSA9IDA7XG5cdFx0XHR0aGlzLmZyYW1lID0gMDtcblx0XHRcdHRoaXMuc3ByaXRlV2lkdGggPSA1NzU7XG5cdFx0XHR0aGlzLnNwcml0ZUhlaWdodCA9IDU0Mjtcblx0XHR9XG5cblx0XHR1cGRhdGUoKSB7XG5cdFx0XHRjb25zdCBkeCA9IHRoaXMueCAtIG1vdXNlLng7XG5cdFx0XHRjb25zdCBkeSA9IHRoaXMueSAtIG1vdXNlLnk7XG5cdFx0XHRsZXQgdGhldGEgPSBNYXRoLmF0YW4yKGR5LCBkeCk7XG5cdFx0XHR0aGlzLmFuZ2xlID0gdGhldGE7XG5cblx0XHRcdGlmIChtb3VzZS54ICE9IHRoaXMueCkge1xuXHRcdFx0XHR0aGlzLnggLT0gZHggLyAyMDtcblx0XHRcdH1cblx0XHRcdGlmIChtb3VzZS55ICE9IHRoaXMueSkge1xuXHRcdFx0XHR0aGlzLnkgLT0gZHkgLyAyMDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRkcmF3KCkge1xuXHRcdFx0aWYgKG1vdXNlLmNsaWNrKSB7XG5cdFx0XHRcdGN0eC5saW5lV2lkdGggPSAwLjI7XG5cdFx0XHRcdGN0eC5iZWdpblBhdGgoKTtcblx0XHRcdFx0Y3R4Lm1vdmVUbyh0aGlzLngsIHRoaXMueSk7XG5cdFx0XHRcdGN0eC5saW5lVG8obW91c2UueCwgbW91c2UueSk7XG5cdFx0XHRcdGN0eC5zdHJva2UoKTtcblx0XHRcdH1cblxuXHRcdFx0Y3R4LmZpbGxTdHlsZSA9ICdyZWQnO1xuXHRcdFx0Y3R4LmJlZ2luUGF0aCgpO1xuXHRcdFx0Y3R4LmFyYyh0aGlzLngsIHRoaXMueSwgdGhpcy5yYWRpdXMsIDAsIE1hdGguUEkgKiAyKTtcblx0XHRcdGN0eC5maWxsKCk7XG5cdFx0XHRjdHguY2xvc2VQYXRoKCk7XG5cdFx0XHRjdHguZmlsbFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMucmFkaXVzLCAxMCk7XG5cblx0XHRcdGN0eC5zYXZlKCk7XG5cdFx0XHRjdHgudHJhbnNsYXRlKHRoaXMueCwgdGhpcy55KTtcblx0XHRcdGN0eC5yb3RhdGUodGhpcy5hbmdsZSk7XG5cblx0XHRcdGlmICh0aGlzLnggPj0gbW91c2UueCkge1xuXHRcdFx0XHRjdHguZHJhd0ltYWdlKFxuXHRcdFx0XHRcdHBsYXllckxlZnQsXG5cdFx0XHRcdFx0dGhpcy5mcmFtZVggKiB0aGlzLnNwcml0ZVdpZHRoLFxuXHRcdFx0XHRcdHRoaXMuZnJhbWVZICogdGhpcy5zcHJpdGVIZWlnaHQsXG5cdFx0XHRcdFx0dGhpcy5zcHJpdGVXaWR0aCxcblx0XHRcdFx0XHR0aGlzLnNwcml0ZUhlaWdodCxcblx0XHRcdFx0XHQwIC0gNjAsXG5cdFx0XHRcdFx0MCAtIDQ1LFxuXHRcdFx0XHRcdHRoaXMuc3ByaXRlV2lkdGggLyA1LFxuXHRcdFx0XHRcdHRoaXMuc3ByaXRlSGVpZ2h0IC8gNVxuXHRcdFx0XHQpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y3R4LmRyYXdJbWFnZShcblx0XHRcdFx0XHRwbGF5ZXJSaWdodCxcblx0XHRcdFx0XHR0aGlzLmZyYW1lWCAqIHRoaXMuc3ByaXRlV2lkdGgsXG5cdFx0XHRcdFx0dGhpcy5mcmFtZVkgKiB0aGlzLnNwcml0ZUhlaWdodCxcblx0XHRcdFx0XHR0aGlzLnNwcml0ZVdpZHRoLFxuXHRcdFx0XHRcdHRoaXMuc3ByaXRlSGVpZ2h0LFxuXHRcdFx0XHRcdDAgLSA2MCxcblx0XHRcdFx0XHQwIC0gNDUsXG5cdFx0XHRcdFx0dGhpcy5zcHJpdGVXaWR0aCAvIDUsXG5cdFx0XHRcdFx0dGhpcy5zcHJpdGVIZWlnaHQgLyA1XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cblx0XHRcdGN0eC5yZXN0b3JlKCk7XG5cdFx0fVxuXHR9XG5cblx0Y29uc3QgcGxheWVyID0gbmV3IFBsYXllcigpO1xuXG5cdC8vIGludGVyYWN0aXZlIGVsZW1lbnRzXG5cdGNvbnN0IGVsZW1lbnRzQXJyYXkgPSBbXTtcblx0Y2xhc3MgQnViYmxlIHtcblx0XHRjb25zdHJ1Y3RvcigpIHtcblx0XHRcdHRoaXMueCA9IE1hdGgucmFuZG9tKCkgKiBjYW52YXMud2lkdGg7XG5cdFx0XHR0aGlzLnkgPSBjYW52YXMuaGVpZ2h0ICsgMTAwO1xuXHRcdFx0dGhpcy5yYWRpdXMgPSA1MDtcblx0XHRcdHRoaXMuc3BlZWQgPSBNYXRoLnJhbmRvbSgpICogNSArIDE7XG5cdFx0XHR0aGlzLmRpc3RhbmNlO1xuXHRcdFx0dGhpcy5jb3VudGVkID0gZmFsc2U7XG5cdFx0XHR0aGlzLnNvdW5kID0gTWF0aC5yYW5kb20oKSA8PSAwLjUgPyAnc291bmQxJyA6ICdzb3VuZDInO1xuXHRcdH1cblxuXHRcdHVwZGF0ZSgpIHtcblx0XHRcdHRoaXMueSAtPSB0aGlzLnNwZWVkO1xuXHRcdFx0Y29uc3QgZHggPSB0aGlzLnggLSBwbGF5ZXIueDtcblx0XHRcdGNvbnN0IGR5ID0gdGhpcy55IC0gcGxheWVyLnk7XG5cdFx0XHR0aGlzLmRpc3RhbmNlID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcblx0XHR9XG5cblx0XHRkcmF3KCkge1xuXHRcdFx0Y3R4LmZpbGxTdHlsZSA9ICdibHVlJztcblx0XHRcdGN0eC5iZWdpblBhdGgoKTtcblx0XHRcdGN0eC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMucmFkaXVzLCAwLCBNYXRoLlBJICogMik7XG5cdFx0XHRjdHguZmlsbCgpO1xuXHRcdFx0Y3R4LmNsb3NlUGF0aCgpO1xuXHRcdFx0Y3R4LnN0cm9rZSgpO1xuXHRcdH1cblx0fVxuXG5cdGNvbnN0IGJ1YmJsZVBvcDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhdWRpbycpO1xuXHRidWJibGVQb3AxLnNyYyA9ICcuL3NvdW5kcy9lYXRfMDEub2dnJztcblx0Y29uc3QgYnViYmxlUG9wMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2F1ZGlvJyk7XG5cdGJ1YmJsZVBvcDIuc3JjID0gJy4vc291bmRzL2VhdF8wNC5vZ2cnO1xuXG5cdGZ1bmN0aW9uIGhhbmRsZUJ1YmJsZXMoKSB7XG5cdFx0aWYgKGdhbWVGcmFtZSAlIDUwID09IDApIHtcblx0XHRcdGVsZW1lbnRzQXJyYXkucHVzaChuZXcgQnViYmxlKCkpO1xuXHRcdH1cblxuXHRcdGVsZW1lbnRzQXJyYXkuZm9yRWFjaCgoYnViYmxlKSA9PiB7XG5cdFx0XHRidWJibGUudXBkYXRlKCk7XG5cdFx0XHRidWJibGUuZHJhdygpO1xuXHRcdH0pO1xuXG5cdFx0ZWxlbWVudHNBcnJheS5mb3JFYWNoKChidWJibGUsIGluZGV4KSA9PiB7XG5cdFx0XHRpZiAoYnViYmxlLnkgPCAwIC0gYnViYmxlLnJhZGl1cyAqIDIpIHtcblx0XHRcdFx0ZWxlbWVudHNBcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoYnViYmxlKSB7XG5cdFx0XHRcdGlmIChidWJibGUuZGlzdGFuY2UgPCBidWJibGUucmFkaXVzICsgcGxheWVyLnJhZGl1cykge1xuXHRcdFx0XHRcdGlmICghYnViYmxlLmNvdW50ZWQpIHtcblx0XHRcdFx0XHRcdC8qIGlmIChidWJibGUuc291bmQgPT0gJ3NvdW5kMScpIHtcblx0XHRcdFx0XHRcdFx0YnViYmxlUG9wMS5wbGF5KCk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRidWJibGVQb3AyLnBsYXkoKTtcblx0XHRcdFx0XHRcdH0gKi9cblx0XHRcdFx0XHRcdHNjb3JlKys7XG5cdFx0XHRcdFx0XHRidWJibGUuY291bnRlZCA9IHRydWU7XG5cdFx0XHRcdFx0XHRlbGVtZW50c0FycmF5LnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHQvLyByZXBlYXRpbmcgYmFja2dyb3VuZFxuXHRjb25zdCBiYWNrZ3JvdW5kID0gbmV3IEltYWdlKCk7XG5cdGJhY2tncm91bmQuc3JjID0gJy4vYXNzZXRzL2ltYWdlcy9wYXJhbGxheC1mb3Jlc3QtYmFjay10cmVlcy5wbmcnO1xuXG5cdGNvbnN0IGJhY2tncm91bmQyID0gbmV3IEltYWdlKCk7XG5cdGJhY2tncm91bmQyLnNyYyA9ICcuL2Fzc2V0cy9pbWFnZXMvcGFyYWxsYXgtZm9yZXN0LWZyb250LXRyZWVzLnBuZyc7XG5cblx0Y29uc3QgYmFja2dyb3VuZDMgPSBuZXcgSW1hZ2UoKTtcblx0YmFja2dyb3VuZDMuc3JjID0gJy4vYXNzZXRzL2ltYWdlcy9wYXJhbGxheC1mb3Jlc3QtbGlnaHRzLnBuZyc7XG5cblx0Y29uc3QgYmFja2dyb3VuZDQgPSBuZXcgSW1hZ2UoKTtcblx0YmFja2dyb3VuZDQuc3JjID0gJy4vYXNzZXRzL2ltYWdlcy9wYXJhbGxheC1mb3Jlc3QtbWlkZGxlLXRyZWVzLnBuZyc7XG5cblx0Y29uc3QgQkcgPSB7XG5cdFx0eDE6IDAsXG5cdFx0eDI6IGNhbnZhcy53aWR0aCxcblx0XHR5OiAwLFxuXHRcdHdpZHRoOiBjYW52YXMud2lkdGgsXG5cdFx0aGVpZ2h0OiBjYW52YXMuaGVpZ2h0LFxuXHR9O1xuXG5cdGZ1bmN0aW9uIGhhbmRsZUJhY2tncm91bmQoKSB7XG5cdFx0QkcueDEgLT0gZ2FtZVNwZWVkO1xuXHRcdGlmIChCRy54MSA8IC1CRy53aWR0aCkgQkcueDEgPSBCRy53aWR0aDtcblxuXHRcdGN0eC5kcmF3SW1hZ2UoYmFja2dyb3VuZCwgQkcueDEsIEJHLnksIEJHLndpZHRoLCBCRy5oZWlnaHQpO1xuXHRcdGN0eC5kcmF3SW1hZ2UoYmFja2dyb3VuZDMsIEJHLngxLCBCRy55LCBCRy53aWR0aCwgQkcuaGVpZ2h0KTtcblx0XHRjdHguZHJhd0ltYWdlKGJhY2tncm91bmQ0LCBCRy54MSwgQkcueSwgQkcud2lkdGgsIEJHLmhlaWdodCk7XG5cdFx0Y3R4LmRyYXdJbWFnZShiYWNrZ3JvdW5kMiwgQkcueDEsIEJHLnksIEJHLndpZHRoLCBCRy5oZWlnaHQpO1xuXG5cdFx0QkcueDIgLT0gZ2FtZVNwZWVkO1xuXHRcdGlmIChCRy54MiA8IC1CRy53aWR0aCkgQkcueDIgPSBCRy53aWR0aDtcblx0XHRjdHguZHJhd0ltYWdlKGJhY2tncm91bmQsIEJHLngyLCBCRy55LCBCRy53aWR0aCwgQkcuaGVpZ2h0KTtcblx0XHRjdHguZHJhd0ltYWdlKGJhY2tncm91bmQzLCBCRy54MiwgQkcueSwgQkcud2lkdGgsIEJHLmhlaWdodCk7XG5cdFx0Y3R4LmRyYXdJbWFnZShiYWNrZ3JvdW5kNCwgQkcueDIsIEJHLnksIEJHLndpZHRoLCBCRy5oZWlnaHQpO1xuXHRcdGN0eC5kcmF3SW1hZ2UoYmFja2dyb3VuZDIsIEJHLngyLCBCRy55LCBCRy53aWR0aCwgQkcuaGVpZ2h0KTtcblx0fVxuXG5cdC8vIGFuaW1hdGlvbiBsb29wXG5cdGZ1bmN0aW9uIGFuaW1hdGUoKSB7XG5cdFx0Y3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXHRcdGhhbmRsZUJhY2tncm91bmQoKTtcblx0XHRoYW5kbGVCdWJibGVzKCk7XG5cdFx0cGxheWVyLnVwZGF0ZSgpO1xuXHRcdHBsYXllci5kcmF3KCk7XG5cblx0XHRjdHguZmlsbFRleHQoYHNjb3JlOiAke3Njb3JlfWAsIDEwLCA1MCk7XG5cdFx0Z2FtZUZyYW1lKys7XG5cdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xuXHR9XG5cblx0YW5pbWF0ZSgpO1xuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoZSkgPT4ge1xuXHRcdGNhbnZhc1Bvc2l0aW9uID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHR9KTtcbn0pO1xuIl0sInByZUV4aXN0aW5nQ29tbWVudCI6Ii8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkluZGxZbkJoWTJzNkx5OHZkMlZpY0dGamF5OWliMjkwYzNSeVlYQWlMQ0ozWldKd1lXTnJPaTh2THk0dmMzSmpMMnB6TDIxaGFXNHVhbk1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanRSUVVGQk8xRkJRMEU3TzFGQlJVRTdVVUZEUVRzN1VVRkZRVHRSUVVOQk8xRkJRMEU3VVVGRFFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHM3VVVGRlFUdFJRVU5CT3p0UlFVVkJPMUZCUTBFN08xRkJSVUU3VVVGRFFUdFJRVU5CT3pzN1VVRkhRVHRSUVVOQk96dFJRVVZCTzFGQlEwRTdPMUZCUlVFN1VVRkRRVHRSUVVOQk8xRkJRMEVzTUVOQlFUQkRMR2REUVVGblF6dFJRVU14UlR0UlFVTkJPenRSUVVWQk8xRkJRMEU3VVVGRFFUdFJRVU5CTEhkRVFVRjNSQ3hyUWtGQmEwSTdVVUZETVVVN1VVRkRRU3hwUkVGQmFVUXNZMEZCWXp0UlFVTXZSRHM3VVVGRlFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEU3VVVGRFFUdFJRVU5CTzFGQlEwRXNlVU5CUVhsRExHbERRVUZwUXp0UlFVTXhSU3huU0VGQlowZ3NiVUpCUVcxQ0xFVkJRVVU3VVVGRGNrazdVVUZEUVRzN1VVRkZRVHRSUVVOQk8xRkJRMEU3VVVGRFFTd3lRa0ZCTWtJc01FSkJRVEJDTEVWQlFVVTdVVUZEZGtRc2FVTkJRV2xETEdWQlFXVTdVVUZEYUVRN1VVRkRRVHRSUVVOQk96dFJRVVZCTzFGQlEwRXNjMFJCUVhORUxDdEVRVUVyUkRzN1VVRkZja2c3VVVGRFFUczdPMUZCUjBFN1VVRkRRVHM3T3pzN096czdPenM3TzBGRGJFWkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTEVWQlFVVTdPMEZCUlVZN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1NVRkJTVHRCUVVOS0xFZEJRVWM3UVVGRFNEczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRVZCUVVVN08wRkJSVVk3UVVGRFFUdEJRVU5CTEVWQlFVVTdPMEZCUlVZN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1NVRkJTVHRCUVVOS08wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1IwRkJSenM3UVVGRlNEdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNUMEZCVHp0QlFVTlFPMEZCUTBFc1QwRkJUenRCUVVOUU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRWRCUVVjN1FVRkRTRHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTEhsQ1FVRjVRaXhOUVVGTk8wRkJReTlDTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRXNSVUZCUlR0QlFVTkdMRU5CUVVNaUxDSm1hV3hsSWpvaU1tSTBNVFZoTWpaaVl6QTFZek5oTjJVMU5URXVhbk1pTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJZ1hIUXZMeUJVYUdVZ2JXOWtkV3hsSUdOaFkyaGxYRzRnWEhSMllYSWdhVzV6ZEdGc2JHVmtUVzlrZFd4bGN5QTlJSHQ5TzF4dVhHNGdYSFF2THlCVWFHVWdjbVZ4ZFdseVpTQm1kVzVqZEdsdmJseHVJRngwWm5WdVkzUnBiMjRnWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHlodGIyUjFiR1ZKWkNrZ2UxeHVYRzRnWEhSY2RDOHZJRU5vWldOcklHbG1JRzF2WkhWc1pTQnBjeUJwYmlCallXTm9aVnh1SUZ4MFhIUnBaaWhwYm5OMFlXeHNaV1JOYjJSMWJHVnpXMjF2WkhWc1pVbGtYU2tnZTF4dUlGeDBYSFJjZEhKbGRIVnliaUJwYm5OMFlXeHNaV1JOYjJSMWJHVnpXMjF2WkhWc1pVbGtYUzVsZUhCdmNuUnpPMXh1SUZ4MFhIUjlYRzRnWEhSY2RDOHZJRU55WldGMFpTQmhJRzVsZHlCdGIyUjFiR1VnS0dGdVpDQndkWFFnYVhRZ2FXNTBieUIwYUdVZ1kyRmphR1VwWEc0Z1hIUmNkSFpoY2lCdGIyUjFiR1VnUFNCcGJuTjBZV3hzWldSTmIyUjFiR1Z6VzIxdlpIVnNaVWxrWFNBOUlIdGNiaUJjZEZ4MFhIUnBPaUJ0YjJSMWJHVkpaQ3hjYmlCY2RGeDBYSFJzT2lCbVlXeHpaU3hjYmlCY2RGeDBYSFJsZUhCdmNuUnpPaUI3ZlZ4dUlGeDBYSFI5TzF4dVhHNGdYSFJjZEM4dklFVjRaV04xZEdVZ2RHaGxJRzF2WkhWc1pTQm1kVzVqZEdsdmJseHVJRngwWEhSdGIyUjFiR1Z6VzIxdlpIVnNaVWxrWFM1allXeHNLRzF2WkhWc1pTNWxlSEJ2Y25SekxDQnRiMlIxYkdVc0lHMXZaSFZzWlM1bGVIQnZjblJ6TENCZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZktUdGNibHh1SUZ4MFhIUXZMeUJHYkdGbklIUm9aU0J0YjJSMWJHVWdZWE1nYkc5aFpHVmtYRzRnWEhSY2RHMXZaSFZzWlM1c0lEMGdkSEoxWlR0Y2JseHVJRngwWEhRdkx5QlNaWFIxY200Z2RHaGxJR1Y0Y0c5eWRITWdiMllnZEdobElHMXZaSFZzWlZ4dUlGeDBYSFJ5WlhSMWNtNGdiVzlrZFd4bExtVjRjRzl5ZEhNN1hHNGdYSFI5WEc1Y2JseHVJRngwTHk4Z1pYaHdiM05sSUhSb1pTQnRiMlIxYkdWeklHOWlhbVZqZENBb1gxOTNaV0p3WVdOclgyMXZaSFZzWlhOZlh5bGNiaUJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWJTQTlJRzF2WkhWc1pYTTdYRzVjYmlCY2RDOHZJR1Y0Y0c5elpTQjBhR1VnYlc5a2RXeGxJR05oWTJobFhHNGdYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG1NZ1BTQnBibk4wWVd4c1pXUk5iMlIxYkdWek8xeHVYRzRnWEhRdkx5QmtaV1pwYm1VZ1oyVjBkR1Z5SUdaMWJtTjBhVzl1SUdadmNpQm9ZWEp0YjI1NUlHVjRjRzl5ZEhOY2JpQmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1WkNBOUlHWjFibU4wYVc5dUtHVjRjRzl5ZEhNc0lHNWhiV1VzSUdkbGRIUmxjaWtnZTF4dUlGeDBYSFJwWmlnaFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NXZLR1Y0Y0c5eWRITXNJRzVoYldVcEtTQjdYRzRnWEhSY2RGeDBUMkpxWldOMExtUmxabWx1WlZCeWIzQmxjblI1S0dWNGNHOXlkSE1zSUc1aGJXVXNJSHNnWlc1MWJXVnlZV0pzWlRvZ2RISjFaU3dnWjJWME9pQm5aWFIwWlhJZ2ZTazdYRzRnWEhSY2RIMWNiaUJjZEgwN1hHNWNiaUJjZEM4dklHUmxabWx1WlNCZlgyVnpUVzlrZFd4bElHOXVJR1Y0Y0c5eWRITmNiaUJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWNpQTlJR1oxYm1OMGFXOXVLR1Y0Y0c5eWRITXBJSHRjYmlCY2RGeDBhV1lvZEhsd1pXOW1JRk41YldKdmJDQWhQVDBnSjNWdVpHVm1hVzVsWkNjZ0ppWWdVM2x0WW05c0xuUnZVM1J5YVc1blZHRm5LU0I3WEc0Z1hIUmNkRngwVDJKcVpXTjBMbVJsWm1sdVpWQnliM0JsY25SNUtHVjRjRzl5ZEhNc0lGTjViV0p2YkM1MGIxTjBjbWx1WjFSaFp5d2dleUIyWVd4MVpUb2dKMDF2WkhWc1pTY2dmU2s3WEc0Z1hIUmNkSDFjYmlCY2RGeDBUMkpxWldOMExtUmxabWx1WlZCeWIzQmxjblI1S0dWNGNHOXlkSE1zSUNkZlgyVnpUVzlrZFd4bEp5d2dleUIyWVd4MVpUb2dkSEoxWlNCOUtUdGNiaUJjZEgwN1hHNWNiaUJjZEM4dklHTnlaV0YwWlNCaElHWmhhMlVnYm1GdFpYTndZV05sSUc5aWFtVmpkRnh1SUZ4MEx5OGdiVzlrWlNBbUlERTZJSFpoYkhWbElHbHpJR0VnYlc5a2RXeGxJR2xrTENCeVpYRjFhWEpsSUdsMFhHNGdYSFF2THlCdGIyUmxJQ1lnTWpvZ2JXVnlaMlVnWVd4c0lIQnliM0JsY25ScFpYTWdiMllnZG1Gc2RXVWdhVzUwYnlCMGFHVWdibk5jYmlCY2RDOHZJRzF2WkdVZ0ppQTBPaUJ5WlhSMWNtNGdkbUZzZFdVZ2QyaGxiaUJoYkhKbFlXUjVJRzV6SUc5aWFtVmpkRnh1SUZ4MEx5OGdiVzlrWlNBbUlEaDhNVG9nWW1Wb1lYWmxJR3hwYTJVZ2NtVnhkV2x5WlZ4dUlGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTUwSUQwZ1puVnVZM1JwYjI0b2RtRnNkV1VzSUcxdlpHVXBJSHRjYmlCY2RGeDBhV1lvYlc5a1pTQW1JREVwSUhaaGJIVmxJRDBnWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHloMllXeDFaU2s3WEc0Z1hIUmNkR2xtS0cxdlpHVWdKaUE0S1NCeVpYUjFjbTRnZG1Gc2RXVTdYRzRnWEhSY2RHbG1LQ2h0YjJSbElDWWdOQ2tnSmlZZ2RIbHdaVzltSUhaaGJIVmxJRDA5UFNBbmIySnFaV04wSnlBbUppQjJZV3gxWlNBbUppQjJZV3gxWlM1ZlgyVnpUVzlrZFd4bEtTQnlaWFIxY200Z2RtRnNkV1U3WEc0Z1hIUmNkSFpoY2lCdWN5QTlJRTlpYW1WamRDNWpjbVZoZEdVb2JuVnNiQ2s3WEc0Z1hIUmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1Y2lodWN5azdYRzRnWEhSY2RFOWlhbVZqZEM1a1pXWnBibVZRY205d1pYSjBlU2h1Y3l3Z0oyUmxabUYxYkhRbkxDQjdJR1Z1ZFcxbGNtRmliR1U2SUhSeWRXVXNJSFpoYkhWbE9pQjJZV3gxWlNCOUtUdGNiaUJjZEZ4MGFXWW9iVzlrWlNBbUlESWdKaVlnZEhsd1pXOW1JSFpoYkhWbElDRTlJQ2R6ZEhKcGJtY25LU0JtYjNJb2RtRnlJR3RsZVNCcGJpQjJZV3gxWlNrZ1gxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NWtLRzV6TENCclpYa3NJR1oxYm1OMGFXOXVLR3RsZVNrZ2V5QnlaWFIxY200Z2RtRnNkV1ZiYTJWNVhUc2dmUzVpYVc1a0tHNTFiR3dzSUd0bGVTa3BPMXh1SUZ4MFhIUnlaWFIxY200Z2JuTTdYRzRnWEhSOU8xeHVYRzRnWEhRdkx5Qm5aWFJFWldaaGRXeDBSWGh3YjNKMElHWjFibU4wYVc5dUlHWnZjaUJqYjIxd1lYUnBZbWxzYVhSNUlIZHBkR2dnYm05dUxXaGhjbTF2Ym5rZ2JXOWtkV3hsYzF4dUlGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV1SUQwZ1puVnVZM1JwYjI0b2JXOWtkV3hsS1NCN1hHNGdYSFJjZEhaaGNpQm5aWFIwWlhJZ1BTQnRiMlIxYkdVZ0ppWWdiVzlrZFd4bExsOWZaWE5OYjJSMWJHVWdQMXh1SUZ4MFhIUmNkR1oxYm1OMGFXOXVJR2RsZEVSbFptRjFiSFFvS1NCN0lISmxkSFZ5YmlCdGIyUjFiR1ZiSjJSbFptRjFiSFFuWFRzZ2ZTQTZYRzRnWEhSY2RGeDBablZ1WTNScGIyNGdaMlYwVFc5a2RXeGxSWGh3YjNKMGN5Z3BJSHNnY21WMGRYSnVJRzF2WkhWc1pUc2dmVHRjYmlCY2RGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTVrS0dkbGRIUmxjaXdnSjJFbkxDQm5aWFIwWlhJcE8xeHVJRngwWEhSeVpYUjFjbTRnWjJWMGRHVnlPMXh1SUZ4MGZUdGNibHh1SUZ4MEx5OGdUMkpxWldOMExuQnliM1J2ZEhsd1pTNW9ZWE5QZDI1UWNtOXdaWEowZVM1allXeHNYRzRnWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxtOGdQU0JtZFc1amRHbHZiaWh2WW1wbFkzUXNJSEJ5YjNCbGNuUjVLU0I3SUhKbGRIVnliaUJQWW1wbFkzUXVjSEp2ZEc5MGVYQmxMbWhoYzA5M2JsQnliM0JsY25SNUxtTmhiR3dvYjJKcVpXTjBMQ0J3Y205d1pYSjBlU2s3SUgwN1hHNWNiaUJjZEM4dklGOWZkMlZpY0dGamExOXdkV0pzYVdOZmNHRjBhRjlmWEc0Z1hIUmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZMbkFnUFNCY0lsd2lPMXh1WEc1Y2JpQmNkQzh2SUV4dllXUWdaVzUwY25rZ2JXOWtkV3hsSUdGdVpDQnlaWFIxY200Z1pYaHdiM0owYzF4dUlGeDBjbVYwZFhKdUlGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOG9YMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV6SUQwZ1hDSXVMM055WXk5cWN5OXRZV2x1TG1welhDSXBPMXh1SWl3aVpHOWpkVzFsYm5RdVlXUmtSWFpsYm5STWFYTjBaVzVsY2lnblJFOU5RMjl1ZEdWdWRFeHZZV1JsWkNjc0lHWjFibU4wYVc5dUlDZ3BJSHRjYmx4MGQybHVaRzkzTG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvSjJ4dllXUW5MQ0FvWlNrZ1BUNGdlMXh1WEhSY2RHTnZibk4wSUhCeVpXeHZZV1FnUFNCa2IyTjFiV1Z1ZEM1eGRXVnllVk5sYkdWamRHOXlLQ2N1Y0hKbGJHOWhaQ2NwTzF4dVhHNWNkRngwY0hKbGJHOWhaQzVqYkdGemMweHBjM1F1WVdSa0tDZHdjbVZzYjJGa0xXWnBibWx6YUdWa0p5azdYRzVjZEgwcE8xeHVYRzVjZEdOdmJuTjBJR0owYmxOamNtOXNiRlJ2Vkc5d0lEMGdaRzlqZFcxbGJuUXVaMlYwUld4bGJXVnVkRUo1U1dRb0oySjBibE5qY205c2JGUnZWRzl3SnlrN1hHNWNibHgwYVdZZ0tHSjBibE5qY205c2JGUnZWRzl3S1NCN1hHNWNkRngwWW5SdVUyTnliMnhzVkc5VWIzQXVZV1JrUlhabGJuUk1hWE4wWlc1bGNpZ25ZMnhwWTJzbkxDQW9aU2tnUFQ0Z2UxeHVYSFJjZEZ4MGQybHVaRzkzTG5OamNtOXNiRlJ2S0h0Y2JseDBYSFJjZEZ4MGRHOXdPaUF3TEZ4dVhIUmNkRngwWEhSc1pXWjBPaUF3TEZ4dVhIUmNkRngwWEhSaVpXaGhkbWx2Y2pvZ0ozTnRiMjkwYUNjc1hHNWNkRngwWEhSOUtUdGNibHgwWEhSOUtUdGNibHgwZlZ4dVhHNWNkQzh2SUdOaGJuWmhjeUJ6WlhSMWNGeHVYSFJqYjI1emRDQmpZVzUyWVhNZ1BTQmtiMk4xYldWdWRDNW5aWFJGYkdWdFpXNTBRbmxKWkNnblkyRnVkbUZ6TVNjcE8xeHVYSFJqYjI1emRDQmpkSGdnUFNCallXNTJZWE11WjJWMFEyOXVkR1Y0ZENnbk1tUW5LVHRjYmx4MFkyRnVkbUZ6TG5kcFpIUm9JRDBnT0RBd08xeHVYSFJqWVc1MllYTXVhR1ZwWjJoMElEMGdOVEF3TzF4dVhHNWNkR3hsZENCelkyOXlaU0E5SURBN1hHNWNkR3hsZENCbllXMWxSbkpoYldVZ1BTQXdPMXh1WEhSamRIZ3VabTl1ZENBOUlDYzFNSEI0SUVkbGIzSm5hV0VuTzF4dVhIUnNaWFFnWjJGdFpWTndaV1ZrSUQwZ1RXRjBhQzVtYkc5dmNpaE5ZWFJvTG5KaGJtUnZiU2dwSUNvZ05DQXJJREVwTzF4dVhHNWNkQzh2SUcxdmRYTmxJR2x1ZEdWeVlXTjBhWFpwZEhsY2JseDBiR1YwSUdOaGJuWmhjMUJ2YzJsMGFXOXVJRDBnWTJGdWRtRnpMbWRsZEVKdmRXNWthVzVuUTJ4cFpXNTBVbVZqZENncE8xeHVYRzVjZEdOdmJuTjBJRzF2ZFhObElEMGdlMXh1WEhSY2RIZzZJR05oYm5aaGN5NTNhV1IwYUNBdklESXNYRzVjZEZ4MGVUb2dZMkZ1ZG1GekxtaGxhV2RvZENBdklESXNYRzVjZEZ4MFkyeHBZMnM2SUdaaGJITmxMRnh1WEhSOU8xeHVYRzVjZEdOaGJuWmhjeTVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLQ2R0YjNWelpXUnZkMjRuTENBb1pTa2dQVDRnZTF4dVhIUmNkRzF2ZFhObExtTnNhV05ySUQwZ2RISjFaVHRjYmx4MFhIUnRiM1Z6WlM1NElEMGdaUzU0SUMwZ1kyRnVkbUZ6VUc5emFYUnBiMjR1YkdWbWREdGNibHgwWEhSdGIzVnpaUzU1SUQwZ1pTNTVJQzBnWTJGdWRtRnpVRzl6YVhScGIyNHVkRzl3TzF4dVhIUjlLVHRjYmx4dVhIUmpZVzUyWVhNdVlXUmtSWFpsYm5STWFYTjBaVzVsY2lnbmJXOTFjMlYxY0Njc0lDaGxLU0E5UGlCN1hHNWNkRngwYlc5MWMyVXVZMnhwWTJzZ1BTQm1ZV3h6WlR0Y2JseDBmU2s3WEc1Y2JseDBMeThnY0d4aGVXVnlJR05vWVhKaFkzUmxjbHh1WEhSamIyNXpkQ0J3YkdGNVpYSk1aV1owSUQwZ2JtVjNJRWx0WVdkbEtDazdYRzVjZEhCc1lYbGxja3hsWm5RdWMzSmpJRDBnSnk0dllYTnpaWFJ6TDJsdFlXZGxjeTl0YjI1emRHVnlWMkZzYTB4bFpuUXVjRzVuSnp0Y2JseDBZMjl1YzNRZ2NHeGhlV1Z5VW1sbmFIUWdQU0J1WlhjZ1NXMWhaMlVvS1R0Y2JseDBjR3hoZVdWeVVtbG5hSFF1YzNKaklEMGdKeTR2WVhOelpYUnpMMmx0WVdkbGN5OXRiMjV6ZEdWeVYyRnNhMUpwWjJoMExuQnVaeWM3WEc1Y2JseDBZMnhoYzNNZ1VHeGhlV1Z5SUh0Y2JseDBYSFJqYjI1emRISjFZM1J2Y2lncElIdGNibHgwWEhSY2RIUm9hWE11ZUNBOUlHTmhiblpoY3k1M2FXUjBhQ0F2SURJN1hHNWNkRngwWEhSMGFHbHpMbmtnUFNCallXNTJZWE11YUdWcFoyaDBJQzhnTWp0Y2JseDBYSFJjZEhSb2FYTXVjbUZrYVhWeklEMGdOVEE3WEc1Y2RGeDBYSFIwYUdsekxtRnVaMnhsSUQwZ01EdGNibHgwWEhSY2RIUm9hWE11Wm5KaGJXVllJRDBnTUR0Y2JseDBYSFJjZEhSb2FYTXVabkpoYldWWklEMGdNRHRjYmx4MFhIUmNkSFJvYVhNdVpuSmhiV1VnUFNBd08xeHVYSFJjZEZ4MGRHaHBjeTV6Y0hKcGRHVlhhV1IwYUNBOUlEVTNOVHRjYmx4MFhIUmNkSFJvYVhNdWMzQnlhWFJsU0dWcFoyaDBJRDBnTlRReU8xeHVYSFJjZEgxY2JseHVYSFJjZEhWd1pHRjBaU2dwSUh0Y2JseDBYSFJjZEdOdmJuTjBJR1I0SUQwZ2RHaHBjeTU0SUMwZ2JXOTFjMlV1ZUR0Y2JseDBYSFJjZEdOdmJuTjBJR1I1SUQwZ2RHaHBjeTU1SUMwZ2JXOTFjMlV1ZVR0Y2JseDBYSFJjZEd4bGRDQjBhR1YwWVNBOUlFMWhkR2d1WVhSaGJqSW9aSGtzSUdSNEtUdGNibHgwWEhSY2RIUm9hWE11WVc1bmJHVWdQU0IwYUdWMFlUdGNibHh1WEhSY2RGeDBhV1lnS0cxdmRYTmxMbmdnSVQwZ2RHaHBjeTU0S1NCN1hHNWNkRngwWEhSY2RIUm9hWE11ZUNBdFBTQmtlQ0F2SURJd08xeHVYSFJjZEZ4MGZWeHVYSFJjZEZ4MGFXWWdLRzF2ZFhObExua2dJVDBnZEdocGN5NTVLU0I3WEc1Y2RGeDBYSFJjZEhSb2FYTXVlU0F0UFNCa2VTQXZJREl3TzF4dVhIUmNkRngwZlZ4dVhIUmNkSDFjYmx4dVhIUmNkR1J5WVhjb0tTQjdYRzVjZEZ4MFhIUnBaaUFvYlc5MWMyVXVZMnhwWTJzcElIdGNibHgwWEhSY2RGeDBZM1I0TG14cGJtVlhhV1IwYUNBOUlEQXVNanRjYmx4MFhIUmNkRngwWTNSNExtSmxaMmx1VUdGMGFDZ3BPMXh1WEhSY2RGeDBYSFJqZEhndWJXOTJaVlJ2S0hSb2FYTXVlQ3dnZEdocGN5NTVLVHRjYmx4MFhIUmNkRngwWTNSNExteHBibVZVYnlodGIzVnpaUzU0TENCdGIzVnpaUzU1S1R0Y2JseDBYSFJjZEZ4MFkzUjRMbk4wY205clpTZ3BPMXh1WEhSY2RGeDBmVnh1WEc1Y2RGeDBYSFJqZEhndVptbHNiRk4wZVd4bElEMGdKM0psWkNjN1hHNWNkRngwWEhSamRIZ3VZbVZuYVc1UVlYUm9LQ2s3WEc1Y2RGeDBYSFJqZEhndVlYSmpLSFJvYVhNdWVDd2dkR2hwY3k1NUxDQjBhR2x6TG5KaFpHbDFjeXdnTUN3Z1RXRjBhQzVRU1NBcUlESXBPMXh1WEhSY2RGeDBZM1I0TG1acGJHd29LVHRjYmx4MFhIUmNkR04wZUM1amJHOXpaVkJoZEdnb0tUdGNibHgwWEhSY2RHTjBlQzVtYVd4c1VtVmpkQ2gwYUdsekxuZ3NJSFJvYVhNdWVTd2dkR2hwY3k1eVlXUnBkWE1zSURFd0tUdGNibHh1WEhSY2RGeDBZM1I0TG5OaGRtVW9LVHRjYmx4MFhIUmNkR04wZUM1MGNtRnVjMnhoZEdVb2RHaHBjeTU0TENCMGFHbHpMbmtwTzF4dVhIUmNkRngwWTNSNExuSnZkR0YwWlNoMGFHbHpMbUZ1WjJ4bEtUdGNibHh1WEhSY2RGeDBhV1lnS0hSb2FYTXVlQ0ErUFNCdGIzVnpaUzU0S1NCN1hHNWNkRngwWEhSY2RHTjBlQzVrY21GM1NXMWhaMlVvWEc1Y2RGeDBYSFJjZEZ4MGNHeGhlV1Z5VEdWbWRDeGNibHgwWEhSY2RGeDBYSFIwYUdsekxtWnlZVzFsV0NBcUlIUm9hWE11YzNCeWFYUmxWMmxrZEdnc1hHNWNkRngwWEhSY2RGeDBkR2hwY3k1bWNtRnRaVmtnS2lCMGFHbHpMbk53Y21sMFpVaGxhV2RvZEN4Y2JseDBYSFJjZEZ4MFhIUjBhR2x6TG5Od2NtbDBaVmRwWkhSb0xGeHVYSFJjZEZ4MFhIUmNkSFJvYVhNdWMzQnlhWFJsU0dWcFoyaDBMRnh1WEhSY2RGeDBYSFJjZERBZ0xTQTJNQ3hjYmx4MFhIUmNkRngwWEhRd0lDMGdORFVzWEc1Y2RGeDBYSFJjZEZ4MGRHaHBjeTV6Y0hKcGRHVlhhV1IwYUNBdklEVXNYRzVjZEZ4MFhIUmNkRngwZEdocGN5NXpjSEpwZEdWSVpXbG5hSFFnTHlBMVhHNWNkRngwWEhSY2RDazdYRzVjZEZ4MFhIUjlJR1ZzYzJVZ2UxeHVYSFJjZEZ4MFhIUmpkSGd1WkhKaGQwbHRZV2RsS0Z4dVhIUmNkRngwWEhSY2RIQnNZWGxsY2xKcFoyaDBMRnh1WEhSY2RGeDBYSFJjZEhSb2FYTXVabkpoYldWWUlDb2dkR2hwY3k1emNISnBkR1ZYYVdSMGFDeGNibHgwWEhSY2RGeDBYSFIwYUdsekxtWnlZVzFsV1NBcUlIUm9hWE11YzNCeWFYUmxTR1ZwWjJoMExGeHVYSFJjZEZ4MFhIUmNkSFJvYVhNdWMzQnlhWFJsVjJsa2RHZ3NYRzVjZEZ4MFhIUmNkRngwZEdocGN5NXpjSEpwZEdWSVpXbG5hSFFzWEc1Y2RGeDBYSFJjZEZ4ME1DQXRJRFl3TEZ4dVhIUmNkRngwWEhSY2REQWdMU0EwTlN4Y2JseDBYSFJjZEZ4MFhIUjBhR2x6TG5Od2NtbDBaVmRwWkhSb0lDOGdOU3hjYmx4MFhIUmNkRngwWEhSMGFHbHpMbk53Y21sMFpVaGxhV2RvZENBdklEVmNibHgwWEhSY2RGeDBLVHRjYmx4MFhIUmNkSDFjYmx4dVhIUmNkRngwWTNSNExuSmxjM1J2Y21Vb0tUdGNibHgwWEhSOVhHNWNkSDFjYmx4dVhIUmpiMjV6ZENCd2JHRjVaWElnUFNCdVpYY2dVR3hoZVdWeUtDazdYRzVjYmx4MEx5OGdhVzUwWlhKaFkzUnBkbVVnWld4bGJXVnVkSE5jYmx4MFkyOXVjM1FnWld4bGJXVnVkSE5CY25KaGVTQTlJRnRkTzF4dVhIUmpiR0Z6Y3lCQ2RXSmliR1VnZTF4dVhIUmNkR052Ym5OMGNuVmpkRzl5S0NrZ2UxeHVYSFJjZEZ4MGRHaHBjeTU0SUQwZ1RXRjBhQzV5WVc1a2IyMG9LU0FxSUdOaGJuWmhjeTUzYVdSMGFEdGNibHgwWEhSY2RIUm9hWE11ZVNBOUlHTmhiblpoY3k1b1pXbG5hSFFnS3lBeE1EQTdYRzVjZEZ4MFhIUjBhR2x6TG5KaFpHbDFjeUE5SURVd08xeHVYSFJjZEZ4MGRHaHBjeTV6Y0dWbFpDQTlJRTFoZEdndWNtRnVaRzl0S0NrZ0tpQTFJQ3NnTVR0Y2JseDBYSFJjZEhSb2FYTXVaR2x6ZEdGdVkyVTdYRzVjZEZ4MFhIUjBhR2x6TG1OdmRXNTBaV1FnUFNCbVlXeHpaVHRjYmx4MFhIUmNkSFJvYVhNdWMyOTFibVFnUFNCTllYUm9MbkpoYm1SdmJTZ3BJRHc5SURBdU5TQS9JQ2R6YjNWdVpERW5JRG9nSjNOdmRXNWtNaWM3WEc1Y2RGeDBmVnh1WEc1Y2RGeDBkWEJrWVhSbEtDa2dlMXh1WEhSY2RGeDBkR2hwY3k1NUlDMDlJSFJvYVhNdWMzQmxaV1E3WEc1Y2RGeDBYSFJqYjI1emRDQmtlQ0E5SUhSb2FYTXVlQ0F0SUhCc1lYbGxjaTU0TzF4dVhIUmNkRngwWTI5dWMzUWdaSGtnUFNCMGFHbHpMbmtnTFNCd2JHRjVaWEl1ZVR0Y2JseDBYSFJjZEhSb2FYTXVaR2x6ZEdGdVkyVWdQU0JOWVhSb0xuTnhjblFvWkhnZ0tpQmtlQ0FySUdSNUlDb2daSGtwTzF4dVhIUmNkSDFjYmx4dVhIUmNkR1J5WVhjb0tTQjdYRzVjZEZ4MFhIUmpkSGd1Wm1sc2JGTjBlV3hsSUQwZ0oySnNkV1VuTzF4dVhIUmNkRngwWTNSNExtSmxaMmx1VUdGMGFDZ3BPMXh1WEhSY2RGeDBZM1I0TG1GeVl5aDBhR2x6TG5nc0lIUm9hWE11ZVN3Z2RHaHBjeTV5WVdScGRYTXNJREFzSUUxaGRHZ3VVRWtnS2lBeUtUdGNibHgwWEhSY2RHTjBlQzVtYVd4c0tDazdYRzVjZEZ4MFhIUmpkSGd1WTJ4dmMyVlFZWFJvS0NrN1hHNWNkRngwWEhSamRIZ3VjM1J5YjJ0bEtDazdYRzVjZEZ4MGZWeHVYSFI5WEc1Y2JseDBZMjl1YzNRZ1luVmlZbXhsVUc5d01TQTlJR1J2WTNWdFpXNTBMbU55WldGMFpVVnNaVzFsYm5Rb0oyRjFaR2x2SnlrN1hHNWNkR0oxWW1Kc1pWQnZjREV1YzNKaklEMGdKeTR2YzI5MWJtUnpMMlZoZEY4d01TNXZaMmNuTzF4dVhIUmpiMjV6ZENCaWRXSmliR1ZRYjNBeUlEMGdaRzlqZFcxbGJuUXVZM0psWVhSbFJXeGxiV1Z1ZENnbllYVmthVzhuS1R0Y2JseDBZblZpWW14bFVHOXdNaTV6Y21NZ1BTQW5MaTl6YjNWdVpITXZaV0YwWHpBMExtOW5aeWM3WEc1Y2JseDBablZ1WTNScGIyNGdhR0Z1Wkd4bFFuVmlZbXhsY3lncElIdGNibHgwWEhScFppQW9aMkZ0WlVaeVlXMWxJQ1VnTlRBZ1BUMGdNQ2tnZTF4dVhIUmNkRngwWld4bGJXVnVkSE5CY25KaGVTNXdkWE5vS0c1bGR5QkNkV0ppYkdVb0tTazdYRzVjZEZ4MGZWeHVYRzVjZEZ4MFpXeGxiV1Z1ZEhOQmNuSmhlUzVtYjNKRllXTm9LQ2hpZFdKaWJHVXBJRDArSUh0Y2JseDBYSFJjZEdKMVltSnNaUzUxY0dSaGRHVW9LVHRjYmx4MFhIUmNkR0oxWW1Kc1pTNWtjbUYzS0NrN1hHNWNkRngwZlNrN1hHNWNibHgwWEhSbGJHVnRaVzUwYzBGeWNtRjVMbVp2Y2tWaFkyZ29LR0oxWW1Kc1pTd2dhVzVrWlhncElEMCtJSHRjYmx4MFhIUmNkR2xtSUNoaWRXSmliR1V1ZVNBOElEQWdMU0JpZFdKaWJHVXVjbUZrYVhWeklDb2dNaWtnZTF4dVhIUmNkRngwWEhSbGJHVnRaVzUwYzBGeWNtRjVMbk53YkdsalpTaHBibVJsZUN3Z01TazdYRzVjZEZ4MFhIUjlYRzVjYmx4MFhIUmNkR2xtSUNoaWRXSmliR1VwSUh0Y2JseDBYSFJjZEZ4MGFXWWdLR0oxWW1Kc1pTNWthWE4wWVc1alpTQThJR0oxWW1Kc1pTNXlZV1JwZFhNZ0t5QndiR0Y1WlhJdWNtRmthWFZ6S1NCN1hHNWNkRngwWEhSY2RGeDBhV1lnS0NGaWRXSmliR1V1WTI5MWJuUmxaQ2tnZTF4dVhIUmNkRngwWEhSY2RGeDBMeW9nYVdZZ0tHSjFZbUpzWlM1emIzVnVaQ0E5UFNBbmMyOTFibVF4SnlrZ2UxeHVYSFJjZEZ4MFhIUmNkRngwWEhSaWRXSmliR1ZRYjNBeExuQnNZWGtvS1R0Y2JseDBYSFJjZEZ4MFhIUmNkSDBnWld4elpTQjdYRzVjZEZ4MFhIUmNkRngwWEhSY2RHSjFZbUpzWlZCdmNESXVjR3hoZVNncE8xeHVYSFJjZEZ4MFhIUmNkRngwZlNBcUwxeHVYSFJjZEZ4MFhIUmNkRngwYzJOdmNtVXJLenRjYmx4MFhIUmNkRngwWEhSY2RHSjFZbUpzWlM1amIzVnVkR1ZrSUQwZ2RISjFaVHRjYmx4MFhIUmNkRngwWEhSY2RHVnNaVzFsYm5SelFYSnlZWGt1YzNCc2FXTmxLR2x1WkdWNExDQXhLVHRjYmx4MFhIUmNkRngwWEhSOVhHNWNkRngwWEhSY2RIMWNibHgwWEhSY2RIMWNibHgwWEhSOUtUdGNibHgwZlZ4dVhHNWNkQzh2SUhKbGNHVmhkR2x1WnlCaVlXTnJaM0p2ZFc1a1hHNWNkR052Ym5OMElHSmhZMnRuY205MWJtUWdQU0J1WlhjZ1NXMWhaMlVvS1R0Y2JseDBZbUZqYTJkeWIzVnVaQzV6Y21NZ1BTQW5MaTloYzNObGRITXZhVzFoWjJWekwzQmhjbUZzYkdGNExXWnZjbVZ6ZEMxaVlXTnJMWFJ5WldWekxuQnVaeWM3WEc1Y2JseDBZMjl1YzNRZ1ltRmphMmR5YjNWdVpESWdQU0J1WlhjZ1NXMWhaMlVvS1R0Y2JseDBZbUZqYTJkeWIzVnVaREl1YzNKaklEMGdKeTR2WVhOelpYUnpMMmx0WVdkbGN5OXdZWEpoYkd4aGVDMW1iM0psYzNRdFpuSnZiblF0ZEhKbFpYTXVjRzVuSnp0Y2JseHVYSFJqYjI1emRDQmlZV05yWjNKdmRXNWtNeUE5SUc1bGR5QkpiV0ZuWlNncE8xeHVYSFJpWVdOclozSnZkVzVrTXk1emNtTWdQU0FuTGk5aGMzTmxkSE12YVcxaFoyVnpMM0JoY21Gc2JHRjRMV1p2Y21WemRDMXNhV2RvZEhNdWNHNW5KenRjYmx4dVhIUmpiMjV6ZENCaVlXTnJaM0p2ZFc1a05DQTlJRzVsZHlCSmJXRm5aU2dwTzF4dVhIUmlZV05yWjNKdmRXNWtOQzV6Y21NZ1BTQW5MaTloYzNObGRITXZhVzFoWjJWekwzQmhjbUZzYkdGNExXWnZjbVZ6ZEMxdGFXUmtiR1V0ZEhKbFpYTXVjRzVuSnp0Y2JseHVYSFJqYjI1emRDQkNSeUE5SUh0Y2JseDBYSFI0TVRvZ01DeGNibHgwWEhSNE1qb2dZMkZ1ZG1GekxuZHBaSFJvTEZ4dVhIUmNkSGs2SURBc1hHNWNkRngwZDJsa2RHZzZJR05oYm5aaGN5NTNhV1IwYUN4Y2JseDBYSFJvWldsbmFIUTZJR05oYm5aaGN5NW9aV2xuYUhRc1hHNWNkSDA3WEc1Y2JseDBablZ1WTNScGIyNGdhR0Z1Wkd4bFFtRmphMmR5YjNWdVpDZ3BJSHRjYmx4MFhIUkNSeTU0TVNBdFBTQm5ZVzFsVTNCbFpXUTdYRzVjZEZ4MGFXWWdLRUpITG5neElEd2dMVUpITG5kcFpIUm9LU0JDUnk1NE1TQTlJRUpITG5kcFpIUm9PMXh1WEc1Y2RGeDBZM1I0TG1SeVlYZEpiV0ZuWlNoaVlXTnJaM0p2ZFc1a0xDQkNSeTU0TVN3Z1FrY3VlU3dnUWtjdWQybGtkR2dzSUVKSExtaGxhV2RvZENrN1hHNWNkRngwWTNSNExtUnlZWGRKYldGblpTaGlZV05yWjNKdmRXNWtNeXdnUWtjdWVERXNJRUpITG5rc0lFSkhMbmRwWkhSb0xDQkNSeTVvWldsbmFIUXBPMXh1WEhSY2RHTjBlQzVrY21GM1NXMWhaMlVvWW1GamEyZHliM1Z1WkRRc0lFSkhMbmd4TENCQ1J5NTVMQ0JDUnk1M2FXUjBhQ3dnUWtjdWFHVnBaMmgwS1R0Y2JseDBYSFJqZEhndVpISmhkMGx0WVdkbEtHSmhZMnRuY205MWJtUXlMQ0JDUnk1NE1Td2dRa2N1ZVN3Z1FrY3VkMmxrZEdnc0lFSkhMbWhsYVdkb2RDazdYRzVjYmx4MFhIUkNSeTU0TWlBdFBTQm5ZVzFsVTNCbFpXUTdYRzVjZEZ4MGFXWWdLRUpITG5neUlEd2dMVUpITG5kcFpIUm9LU0JDUnk1NE1pQTlJRUpITG5kcFpIUm9PMXh1WEhSY2RHTjBlQzVrY21GM1NXMWhaMlVvWW1GamEyZHliM1Z1WkN3Z1FrY3VlRElzSUVKSExua3NJRUpITG5kcFpIUm9MQ0JDUnk1b1pXbG5hSFFwTzF4dVhIUmNkR04wZUM1a2NtRjNTVzFoWjJVb1ltRmphMmR5YjNWdVpETXNJRUpITG5neUxDQkNSeTU1TENCQ1J5NTNhV1IwYUN3Z1FrY3VhR1ZwWjJoMEtUdGNibHgwWEhSamRIZ3VaSEpoZDBsdFlXZGxLR0poWTJ0bmNtOTFibVEwTENCQ1J5NTRNaXdnUWtjdWVTd2dRa2N1ZDJsa2RHZ3NJRUpITG1obGFXZG9kQ2s3WEc1Y2RGeDBZM1I0TG1SeVlYZEpiV0ZuWlNoaVlXTnJaM0p2ZFc1a01pd2dRa2N1ZURJc0lFSkhMbmtzSUVKSExuZHBaSFJvTENCQ1J5NW9aV2xuYUhRcE8xeHVYSFI5WEc1Y2JseDBMeThnWVc1cGJXRjBhVzl1SUd4dmIzQmNibHgwWm5WdVkzUnBiMjRnWVc1cGJXRjBaU2dwSUh0Y2JseDBYSFJqZEhndVkyeGxZWEpTWldOMEtEQXNJREFzSUdOaGJuWmhjeTUzYVdSMGFDd2dZMkZ1ZG1GekxtaGxhV2RvZENrN1hHNWNkRngwYUdGdVpHeGxRbUZqYTJkeWIzVnVaQ2dwTzF4dVhIUmNkR2hoYm1Sc1pVSjFZbUpzWlhNb0tUdGNibHgwWEhSd2JHRjVaWEl1ZFhCa1lYUmxLQ2s3WEc1Y2RGeDBjR3hoZVdWeUxtUnlZWGNvS1R0Y2JseHVYSFJjZEdOMGVDNW1hV3hzVkdWNGRDaGdjMk52Y21VNklDUjdjMk52Y21WOVlDd2dNVEFzSURVd0tUdGNibHgwWEhSbllXMWxSbkpoYldVckt6dGNibHgwWEhSeVpYRjFaWE4wUVc1cGJXRjBhVzl1Um5KaGJXVW9ZVzVwYldGMFpTazdYRzVjZEgxY2JseHVYSFJoYm1sdFlYUmxLQ2s3WEc1Y2JseDBkMmx1Wkc5M0xtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb0ozSmxjMmw2WlNjc0lDaGxLU0E5UGlCN1hHNWNkRngwWTJGdWRtRnpVRzl6YVhScGIyNGdQU0JqWVc1MllYTXVaMlYwUW05MWJtUnBibWREYkdsbGJuUlNaV04wS0NrN1hHNWNkSDBwTzF4dWZTazdYRzRpWFN3aWMyOTFjbU5sVW05dmRDSTZJaUo5In0=
