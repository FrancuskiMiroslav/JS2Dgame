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
	class Player {
		constructor() {
			this.x = canvas.width / 2;
			this.y = canvas.height / 2;
			this.radius = 50;
			this.angle = 0;
			this.frameX = 0;
			this.frameY = 0;
			this.frame = 0;
			this.spriteWidth = 498;
			this.spriteHeight = 327;
		}

		update() {
			const dx = this.x - mouse.x;
			const dy = this.y - mouse.y;

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

	function handleBubbles() {
		if (gameFrame % 50 == 0) {
			elementsArray.push(new Bubble());
			console.log(elementsArray.length);
		}

		elementsArray.forEach((bubble) => {
			bubble.update();
			bubble.draw();
		});

		elementsArray.forEach((bubble, index) => {
			if (bubble.y < 0 - bubble.radius * 2) {
				elementsArray.splice(index, 1);
			}

			if (bubble.distance < bubble.radius + player.radius) {
				console.log('collision');
				if (!bubble.counted) {
					score++;
					bubble.counted = true;
				}
			}
		});
	}

	// animation loop
	function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		handleBubbles();
		player.update();
		player.draw();

		ctx.fillText(`score: ${score}`, 10, 50);
		gameFrame++;
		requestAnimationFrame(animate);
	}

	animate();
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlCQUF5QixNQUFNO0FBQy9CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUMiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvbWFpbi5qc1wiKTtcbiIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKGUpID0+IHtcblx0XHRjb25zdCBwcmVsb2FkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWxvYWQnKTtcblxuXHRcdHByZWxvYWQuY2xhc3NMaXN0LmFkZCgncHJlbG9hZC1maW5pc2hlZCcpO1xuXHR9KTtcblxuXHRjb25zdCBidG5TY3JvbGxUb1RvcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5TY3JvbGxUb1RvcCcpO1xuXG5cdGlmIChidG5TY3JvbGxUb1RvcCkge1xuXHRcdGJ0blNjcm9sbFRvVG9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcblx0XHRcdHdpbmRvdy5zY3JvbGxUbyh7XG5cdFx0XHRcdHRvcDogMCxcblx0XHRcdFx0bGVmdDogMCxcblx0XHRcdFx0YmVoYXZpb3I6ICdzbW9vdGgnLFxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHQvLyBjYW52YXMgc2V0dXBcblx0Y29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhczEnKTtcblx0Y29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cdGNhbnZhcy53aWR0aCA9IDgwMDtcblx0Y2FudmFzLmhlaWdodCA9IDUwMDtcblxuXHRsZXQgc2NvcmUgPSAwO1xuXHRsZXQgZ2FtZUZyYW1lID0gMDtcblx0Y3R4LmZvbnQgPSAnNTBweCBHZW9yZ2lhJztcblxuXHQvLyBtb3VzZSBpbnRlcmFjdGl2aXR5XG5cdGxldCBjYW52YXNQb3NpdGlvbiA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuXHRjb25zdCBtb3VzZSA9IHtcblx0XHR4OiBjYW52YXMud2lkdGggLyAyLFxuXHRcdHk6IGNhbnZhcy5oZWlnaHQgLyAyLFxuXHRcdGNsaWNrOiBmYWxzZSxcblx0fTtcblxuXHRjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGUpID0+IHtcblx0XHRtb3VzZS5jbGljayA9IHRydWU7XG5cdFx0bW91c2UueCA9IGUueCAtIGNhbnZhc1Bvc2l0aW9uLmxlZnQ7XG5cdFx0bW91c2UueSA9IGUueSAtIGNhbnZhc1Bvc2l0aW9uLnRvcDtcblx0fSk7XG5cblx0Y2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoZSkgPT4ge1xuXHRcdG1vdXNlLmNsaWNrID0gZmFsc2U7XG5cdH0pO1xuXG5cdC8vIHBsYXllciBjaGFyYWN0ZXJcblx0Y2xhc3MgUGxheWVyIHtcblx0XHRjb25zdHJ1Y3RvcigpIHtcblx0XHRcdHRoaXMueCA9IGNhbnZhcy53aWR0aCAvIDI7XG5cdFx0XHR0aGlzLnkgPSBjYW52YXMuaGVpZ2h0IC8gMjtcblx0XHRcdHRoaXMucmFkaXVzID0gNTA7XG5cdFx0XHR0aGlzLmFuZ2xlID0gMDtcblx0XHRcdHRoaXMuZnJhbWVYID0gMDtcblx0XHRcdHRoaXMuZnJhbWVZID0gMDtcblx0XHRcdHRoaXMuZnJhbWUgPSAwO1xuXHRcdFx0dGhpcy5zcHJpdGVXaWR0aCA9IDQ5ODtcblx0XHRcdHRoaXMuc3ByaXRlSGVpZ2h0ID0gMzI3O1xuXHRcdH1cblxuXHRcdHVwZGF0ZSgpIHtcblx0XHRcdGNvbnN0IGR4ID0gdGhpcy54IC0gbW91c2UueDtcblx0XHRcdGNvbnN0IGR5ID0gdGhpcy55IC0gbW91c2UueTtcblxuXHRcdFx0aWYgKG1vdXNlLnggIT0gdGhpcy54KSB7XG5cdFx0XHRcdHRoaXMueCAtPSBkeCAvIDIwO1xuXHRcdFx0fVxuXHRcdFx0aWYgKG1vdXNlLnkgIT0gdGhpcy55KSB7XG5cdFx0XHRcdHRoaXMueSAtPSBkeSAvIDIwO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGRyYXcoKSB7XG5cdFx0XHRpZiAobW91c2UuY2xpY2spIHtcblx0XHRcdFx0Y3R4LmxpbmVXaWR0aCA9IDAuMjtcblx0XHRcdFx0Y3R4LmJlZ2luUGF0aCgpO1xuXHRcdFx0XHRjdHgubW92ZVRvKHRoaXMueCwgdGhpcy55KTtcblx0XHRcdFx0Y3R4LmxpbmVUbyhtb3VzZS54LCBtb3VzZS55KTtcblx0XHRcdFx0Y3R4LnN0cm9rZSgpO1xuXHRcdFx0fVxuXG5cdFx0XHRjdHguZmlsbFN0eWxlID0gJ3JlZCc7XG5cdFx0XHRjdHguYmVnaW5QYXRoKCk7XG5cdFx0XHRjdHguYXJjKHRoaXMueCwgdGhpcy55LCB0aGlzLnJhZGl1cywgMCwgTWF0aC5QSSAqIDIpO1xuXHRcdFx0Y3R4LmZpbGwoKTtcblx0XHRcdGN0eC5jbG9zZVBhdGgoKTtcblx0XHR9XG5cdH1cblxuXHRjb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKCk7XG5cblx0Ly8gaW50ZXJhY3RpdmUgZWxlbWVudHNcblx0Y29uc3QgZWxlbWVudHNBcnJheSA9IFtdO1xuXHRjbGFzcyBCdWJibGUge1xuXHRcdGNvbnN0cnVjdG9yKCkge1xuXHRcdFx0dGhpcy54ID0gTWF0aC5yYW5kb20oKSAqIGNhbnZhcy53aWR0aDtcblx0XHRcdHRoaXMueSA9IGNhbnZhcy5oZWlnaHQgKyAxMDA7XG5cdFx0XHR0aGlzLnJhZGl1cyA9IDUwO1xuXHRcdFx0dGhpcy5zcGVlZCA9IE1hdGgucmFuZG9tKCkgKiA1ICsgMTtcblx0XHRcdHRoaXMuZGlzdGFuY2U7XG5cdFx0XHR0aGlzLmNvdW50ZWQgPSBmYWxzZTtcblx0XHR9XG5cblx0XHR1cGRhdGUoKSB7XG5cdFx0XHR0aGlzLnkgLT0gdGhpcy5zcGVlZDtcblx0XHRcdGNvbnN0IGR4ID0gdGhpcy54IC0gcGxheWVyLng7XG5cdFx0XHRjb25zdCBkeSA9IHRoaXMueSAtIHBsYXllci55O1xuXHRcdFx0dGhpcy5kaXN0YW5jZSA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG5cdFx0fVxuXG5cdFx0ZHJhdygpIHtcblx0XHRcdGN0eC5maWxsU3R5bGUgPSAnYmx1ZSc7XG5cdFx0XHRjdHguYmVnaW5QYXRoKCk7XG5cdFx0XHRjdHguYXJjKHRoaXMueCwgdGhpcy55LCB0aGlzLnJhZGl1cywgMCwgTWF0aC5QSSAqIDIpO1xuXHRcdFx0Y3R4LmZpbGwoKTtcblx0XHRcdGN0eC5jbG9zZVBhdGgoKTtcblx0XHRcdGN0eC5zdHJva2UoKTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBoYW5kbGVCdWJibGVzKCkge1xuXHRcdGlmIChnYW1lRnJhbWUgJSA1MCA9PSAwKSB7XG5cdFx0XHRlbGVtZW50c0FycmF5LnB1c2gobmV3IEJ1YmJsZSgpKTtcblx0XHRcdGNvbnNvbGUubG9nKGVsZW1lbnRzQXJyYXkubGVuZ3RoKTtcblx0XHR9XG5cblx0XHRlbGVtZW50c0FycmF5LmZvckVhY2goKGJ1YmJsZSkgPT4ge1xuXHRcdFx0YnViYmxlLnVwZGF0ZSgpO1xuXHRcdFx0YnViYmxlLmRyYXcoKTtcblx0XHR9KTtcblxuXHRcdGVsZW1lbnRzQXJyYXkuZm9yRWFjaCgoYnViYmxlLCBpbmRleCkgPT4ge1xuXHRcdFx0aWYgKGJ1YmJsZS55IDwgMCAtIGJ1YmJsZS5yYWRpdXMgKiAyKSB7XG5cdFx0XHRcdGVsZW1lbnRzQXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGJ1YmJsZS5kaXN0YW5jZSA8IGJ1YmJsZS5yYWRpdXMgKyBwbGF5ZXIucmFkaXVzKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdjb2xsaXNpb24nKTtcblx0XHRcdFx0aWYgKCFidWJibGUuY291bnRlZCkge1xuXHRcdFx0XHRcdHNjb3JlKys7XG5cdFx0XHRcdFx0YnViYmxlLmNvdW50ZWQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHQvLyBhbmltYXRpb24gbG9vcFxuXHRmdW5jdGlvbiBhbmltYXRlKCkge1xuXHRcdGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblx0XHRoYW5kbGVCdWJibGVzKCk7XG5cdFx0cGxheWVyLnVwZGF0ZSgpO1xuXHRcdHBsYXllci5kcmF3KCk7XG5cblx0XHRjdHguZmlsbFRleHQoYHNjb3JlOiAke3Njb3JlfWAsIDEwLCA1MCk7XG5cdFx0Z2FtZUZyYW1lKys7XG5cdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xuXHR9XG5cblx0YW5pbWF0ZSgpO1xufSk7XG4iXSwicHJlRXhpc3RpbmdDb21tZW50IjoiLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5kbFluQmhZMnM2THk4dmQyVmljR0ZqYXk5aWIyOTBjM1J5WVhBaUxDSjNaV0p3WVdOck9pOHZMeTR2YzNKakwycHpMMjFoYVc0dWFuTWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqdFJRVUZCTzFGQlEwRTdPMUZCUlVFN1VVRkRRVHM3VVVGRlFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEU3VVVGRFFUczdVVUZGUVR0UlFVTkJPenRSUVVWQk8xRkJRMEU3TzFGQlJVRTdVVUZEUVR0UlFVTkJPenM3VVVGSFFUdFJRVU5CT3p0UlFVVkJPMUZCUTBFN08xRkJSVUU3VVVGRFFUdFJRVU5CTzFGQlEwRXNNRU5CUVRCRExHZERRVUZuUXp0UlFVTXhSVHRSUVVOQk96dFJRVVZCTzFGQlEwRTdVVUZEUVR0UlFVTkJMSGRFUVVGM1JDeHJRa0ZCYTBJN1VVRkRNVVU3VVVGRFFTeHBSRUZCYVVRc1kwRkJZenRSUVVNdlJEczdVVUZGUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEU3VVVGRFFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFc2VVTkJRWGxETEdsRFFVRnBRenRSUVVNeFJTeG5TRUZCWjBnc2JVSkJRVzFDTEVWQlFVVTdVVUZEY2trN1VVRkRRVHM3VVVGRlFUdFJRVU5CTzFGQlEwRTdVVUZEUVN3eVFrRkJNa0lzTUVKQlFUQkNMRVZCUVVVN1VVRkRka1FzYVVOQlFXbERMR1ZCUVdVN1VVRkRhRVE3VVVGRFFUdFJRVU5CT3p0UlFVVkJPMUZCUTBFc2MwUkJRWE5FTEN0RVFVRXJSRHM3VVVGRmNrZzdVVUZEUVRzN08xRkJSMEU3VVVGRFFUczdPenM3T3pzN096czdPMEZEYkVaQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJMRVZCUVVVN08wRkJSVVk3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzU1VGQlNUdEJRVU5LTEVkQlFVYzdRVUZEU0RzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hGUVVGRk96dEJRVVZHTzBGQlEwRTdRVUZEUVN4RlFVRkZPenRCUVVWR08wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEVkQlFVYzdPMEZCUlVnN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeEhRVUZITzBGQlEwZzdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJMSGxDUVVGNVFpeE5RVUZOTzBGQlF5OUNPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTEVOQlFVTWlMQ0ptYVd4bElqb2lZbVF5TmpsaU1tTm1ZalpsWkRkbFl6Z3lOamd1YW5NaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SWdYSFF2THlCVWFHVWdiVzlrZFd4bElHTmhZMmhsWEc0Z1hIUjJZWElnYVc1emRHRnNiR1ZrVFc5a2RXeGxjeUE5SUh0OU8xeHVYRzRnWEhRdkx5QlVhR1VnY21WeGRXbHlaU0JtZFc1amRHbHZibHh1SUZ4MFpuVnVZM1JwYjI0Z1gxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5aHRiMlIxYkdWSlpDa2dlMXh1WEc0Z1hIUmNkQzh2SUVOb1pXTnJJR2xtSUcxdlpIVnNaU0JwY3lCcGJpQmpZV05vWlZ4dUlGeDBYSFJwWmlocGJuTjBZV3hzWldSTmIyUjFiR1Z6VzIxdlpIVnNaVWxrWFNrZ2UxeHVJRngwWEhSY2RISmxkSFZ5YmlCcGJuTjBZV3hzWldSTmIyUjFiR1Z6VzIxdlpIVnNaVWxrWFM1bGVIQnZjblJ6TzF4dUlGeDBYSFI5WEc0Z1hIUmNkQzh2SUVOeVpXRjBaU0JoSUc1bGR5QnRiMlIxYkdVZ0tHRnVaQ0J3ZFhRZ2FYUWdhVzUwYnlCMGFHVWdZMkZqYUdVcFhHNGdYSFJjZEhaaGNpQnRiMlIxYkdVZ1BTQnBibk4wWVd4c1pXUk5iMlIxYkdWelcyMXZaSFZzWlVsa1hTQTlJSHRjYmlCY2RGeDBYSFJwT2lCdGIyUjFiR1ZKWkN4Y2JpQmNkRngwWEhSc09pQm1ZV3h6WlN4Y2JpQmNkRngwWEhSbGVIQnZjblJ6T2lCN2ZWeHVJRngwWEhSOU8xeHVYRzRnWEhSY2RDOHZJRVY0WldOMWRHVWdkR2hsSUcxdlpIVnNaU0JtZFc1amRHbHZibHh1SUZ4MFhIUnRiMlIxYkdWelcyMXZaSFZzWlVsa1hTNWpZV3hzS0cxdlpIVnNaUzVsZUhCdmNuUnpMQ0J0YjJSMWJHVXNJRzF2WkhWc1pTNWxlSEJ2Y25SekxDQmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZLVHRjYmx4dUlGeDBYSFF2THlCR2JHRm5JSFJvWlNCdGIyUjFiR1VnWVhNZ2JHOWhaR1ZrWEc0Z1hIUmNkRzF2WkhWc1pTNXNJRDBnZEhKMVpUdGNibHh1SUZ4MFhIUXZMeUJTWlhSMWNtNGdkR2hsSUdWNGNHOXlkSE1nYjJZZ2RHaGxJRzF2WkhWc1pWeHVJRngwWEhSeVpYUjFjbTRnYlc5a2RXeGxMbVY0Y0c5eWRITTdYRzRnWEhSOVhHNWNibHh1SUZ4MEx5OGdaWGh3YjNObElIUm9aU0J0YjJSMWJHVnpJRzlpYW1WamRDQW9YMTkzWldKd1lXTnJYMjF2WkhWc1pYTmZYeWxjYmlCY2RGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHViU0E5SUcxdlpIVnNaWE03WEc1Y2JpQmNkQzh2SUdWNGNHOXpaU0IwYUdVZ2JXOWtkV3hsSUdOaFkyaGxYRzRnWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxtTWdQU0JwYm5OMFlXeHNaV1JOYjJSMWJHVnpPMXh1WEc0Z1hIUXZMeUJrWldacGJtVWdaMlYwZEdWeUlHWjFibU4wYVc5dUlHWnZjaUJvWVhKdGIyNTVJR1Y0Y0c5eWRITmNiaUJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dVpDQTlJR1oxYm1OMGFXOXVLR1Y0Y0c5eWRITXNJRzVoYldVc0lHZGxkSFJsY2lrZ2UxeHVJRngwWEhScFppZ2hYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV2S0dWNGNHOXlkSE1zSUc1aGJXVXBLU0I3WEc0Z1hIUmNkRngwVDJKcVpXTjBMbVJsWm1sdVpWQnliM0JsY25SNUtHVjRjRzl5ZEhNc0lHNWhiV1VzSUhzZ1pXNTFiV1Z5WVdKc1pUb2dkSEoxWlN3Z1oyVjBPaUJuWlhSMFpYSWdmU2s3WEc0Z1hIUmNkSDFjYmlCY2RIMDdYRzVjYmlCY2RDOHZJR1JsWm1sdVpTQmZYMlZ6VFc5a2RXeGxJRzl1SUdWNGNHOXlkSE5jYmlCY2RGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVjaUE5SUdaMWJtTjBhVzl1S0dWNGNHOXlkSE1wSUh0Y2JpQmNkRngwYVdZb2RIbHdaVzltSUZONWJXSnZiQ0FoUFQwZ0ozVnVaR1ZtYVc1bFpDY2dKaVlnVTNsdFltOXNMblJ2VTNSeWFXNW5WR0ZuS1NCN1hHNGdYSFJjZEZ4MFQySnFaV04wTG1SbFptbHVaVkJ5YjNCbGNuUjVLR1Y0Y0c5eWRITXNJRk41YldKdmJDNTBiMU4wY21sdVoxUmhaeXdnZXlCMllXeDFaVG9nSjAxdlpIVnNaU2NnZlNrN1hHNGdYSFJjZEgxY2JpQmNkRngwVDJKcVpXTjBMbVJsWm1sdVpWQnliM0JsY25SNUtHVjRjRzl5ZEhNc0lDZGZYMlZ6VFc5a2RXeGxKeXdnZXlCMllXeDFaVG9nZEhKMVpTQjlLVHRjYmlCY2RIMDdYRzVjYmlCY2RDOHZJR055WldGMFpTQmhJR1poYTJVZ2JtRnRaWE53WVdObElHOWlhbVZqZEZ4dUlGeDBMeThnYlc5a1pTQW1JREU2SUhaaGJIVmxJR2x6SUdFZ2JXOWtkV3hsSUdsa0xDQnlaWEYxYVhKbElHbDBYRzRnWEhRdkx5QnRiMlJsSUNZZ01qb2diV1Z5WjJVZ1lXeHNJSEJ5YjNCbGNuUnBaWE1nYjJZZ2RtRnNkV1VnYVc1MGJ5QjBhR1VnYm5OY2JpQmNkQzh2SUcxdlpHVWdKaUEwT2lCeVpYUjFjbTRnZG1Gc2RXVWdkMmhsYmlCaGJISmxZV1I1SUc1eklHOWlhbVZqZEZ4dUlGeDBMeThnYlc5a1pTQW1JRGg4TVRvZ1ltVm9ZWFpsSUd4cGEyVWdjbVZ4ZFdseVpWeHVJRngwWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHk1MElEMGdablZ1WTNScGIyNG9kbUZzZFdVc0lHMXZaR1VwSUh0Y2JpQmNkRngwYVdZb2JXOWtaU0FtSURFcElIWmhiSFZsSUQwZ1gxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5aDJZV3gxWlNrN1hHNGdYSFJjZEdsbUtHMXZaR1VnSmlBNEtTQnlaWFIxY200Z2RtRnNkV1U3WEc0Z1hIUmNkR2xtS0NodGIyUmxJQ1lnTkNrZ0ppWWdkSGx3Wlc5bUlIWmhiSFZsSUQwOVBTQW5iMkpxWldOMEp5QW1KaUIyWVd4MVpTQW1KaUIyWVd4MVpTNWZYMlZ6VFc5a2RXeGxLU0J5WlhSMWNtNGdkbUZzZFdVN1hHNGdYSFJjZEhaaGNpQnVjeUE5SUU5aWFtVmpkQzVqY21WaGRHVW9iblZzYkNrN1hHNGdYSFJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWNpaHVjeWs3WEc0Z1hIUmNkRTlpYW1WamRDNWtaV1pwYm1WUWNtOXdaWEowZVNodWN5d2dKMlJsWm1GMWJIUW5MQ0I3SUdWdWRXMWxjbUZpYkdVNklIUnlkV1VzSUhaaGJIVmxPaUIyWVd4MVpTQjlLVHRjYmlCY2RGeDBhV1lvYlc5a1pTQW1JRElnSmlZZ2RIbHdaVzltSUhaaGJIVmxJQ0U5SUNkemRISnBibWNuS1NCbWIzSW9kbUZ5SUd0bGVTQnBiaUIyWVd4MVpTa2dYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTVrS0c1ekxDQnJaWGtzSUdaMWJtTjBhVzl1S0d0bGVTa2dleUJ5WlhSMWNtNGdkbUZzZFdWYmEyVjVYVHNnZlM1aWFXNWtLRzUxYkd3c0lHdGxlU2twTzF4dUlGeDBYSFJ5WlhSMWNtNGdibk03WEc0Z1hIUjlPMXh1WEc0Z1hIUXZMeUJuWlhSRVpXWmhkV3gwUlhod2IzSjBJR1oxYm1OMGFXOXVJR1p2Y2lCamIyMXdZWFJwWW1sc2FYUjVJSGRwZEdnZ2JtOXVMV2hoY20xdmJua2diVzlrZFd4bGMxeHVJRngwWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHk1dUlEMGdablZ1WTNScGIyNG9iVzlrZFd4bEtTQjdYRzRnWEhSY2RIWmhjaUJuWlhSMFpYSWdQU0J0YjJSMWJHVWdKaVlnYlc5a2RXeGxMbDlmWlhOTmIyUjFiR1VnUDF4dUlGeDBYSFJjZEdaMWJtTjBhVzl1SUdkbGRFUmxabUYxYkhRb0tTQjdJSEpsZEhWeWJpQnRiMlIxYkdWYkoyUmxabUYxYkhRblhUc2dmU0E2WEc0Z1hIUmNkRngwWm5WdVkzUnBiMjRnWjJWMFRXOWtkV3hsUlhod2IzSjBjeWdwSUhzZ2NtVjBkWEp1SUcxdlpIVnNaVHNnZlR0Y2JpQmNkRngwWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHk1a0tHZGxkSFJsY2l3Z0oyRW5MQ0JuWlhSMFpYSXBPMXh1SUZ4MFhIUnlaWFIxY200Z1oyVjBkR1Z5TzF4dUlGeDBmVHRjYmx4dUlGeDBMeThnVDJKcVpXTjBMbkJ5YjNSdmRIbHdaUzVvWVhOUGQyNVFjbTl3WlhKMGVTNWpZV3hzWEc0Z1hIUmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZMbThnUFNCbWRXNWpkR2x2YmlodlltcGxZM1FzSUhCeWIzQmxjblI1S1NCN0lISmxkSFZ5YmlCUFltcGxZM1F1Y0hKdmRHOTBlWEJsTG1oaGMwOTNibEJ5YjNCbGNuUjVMbU5oYkd3b2IySnFaV04wTENCd2NtOXdaWEowZVNrN0lIMDdYRzVjYmlCY2RDOHZJRjlmZDJWaWNHRmphMTl3ZFdKc2FXTmZjR0YwYUY5ZlhHNGdYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG5BZ1BTQmNJbHdpTzF4dVhHNWNiaUJjZEM4dklFeHZZV1FnWlc1MGNua2diVzlrZFd4bElHRnVaQ0J5WlhSMWNtNGdaWGh3YjNKMGMxeHVJRngwY21WMGRYSnVJRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMThvWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHk1eklEMGdYQ0l1TDNOeVl5OXFjeTl0WVdsdUxtcHpYQ0lwTzF4dUlpd2laRzlqZFcxbGJuUXVZV1JrUlhabGJuUk1hWE4wWlc1bGNpZ25SRTlOUTI5dWRHVnVkRXh2WVdSbFpDY3NJR1oxYm1OMGFXOXVJQ2dwSUh0Y2JseDBkMmx1Wkc5M0xtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb0oyeHZZV1FuTENBb1pTa2dQVDRnZTF4dVhIUmNkR052Ym5OMElIQnlaV3h2WVdRZ1BTQmtiMk4xYldWdWRDNXhkV1Z5ZVZObGJHVmpkRzl5S0NjdWNISmxiRzloWkNjcE8xeHVYRzVjZEZ4MGNISmxiRzloWkM1amJHRnpjMHhwYzNRdVlXUmtLQ2R3Y21Wc2IyRmtMV1pwYm1semFHVmtKeWs3WEc1Y2RIMHBPMXh1WEc1Y2RHTnZibk4wSUdKMGJsTmpjbTlzYkZSdlZHOXdJRDBnWkc5amRXMWxiblF1WjJWMFJXeGxiV1Z1ZEVKNVNXUW9KMkowYmxOamNtOXNiRlJ2Vkc5d0p5azdYRzVjYmx4MGFXWWdLR0owYmxOamNtOXNiRlJ2Vkc5d0tTQjdYRzVjZEZ4MFluUnVVMk55YjJ4c1ZHOVViM0F1WVdSa1JYWmxiblJNYVhOMFpXNWxjaWduWTJ4cFkyc25MQ0FvWlNrZ1BUNGdlMXh1WEhSY2RGeDBkMmx1Wkc5M0xuTmpjbTlzYkZSdktIdGNibHgwWEhSY2RGeDBkRzl3T2lBd0xGeHVYSFJjZEZ4MFhIUnNaV1owT2lBd0xGeHVYSFJjZEZ4MFhIUmlaV2hoZG1sdmNqb2dKM050YjI5MGFDY3NYRzVjZEZ4MFhIUjlLVHRjYmx4MFhIUjlLVHRjYmx4MGZWeHVYRzVjZEM4dklHTmhiblpoY3lCelpYUjFjRnh1WEhSamIyNXpkQ0JqWVc1MllYTWdQU0JrYjJOMWJXVnVkQzVuWlhSRmJHVnRaVzUwUW5sSlpDZ25ZMkZ1ZG1Gek1TY3BPMXh1WEhSamIyNXpkQ0JqZEhnZ1BTQmpZVzUyWVhNdVoyVjBRMjl1ZEdWNGRDZ25NbVFuS1R0Y2JseDBZMkZ1ZG1GekxuZHBaSFJvSUQwZ09EQXdPMXh1WEhSallXNTJZWE11YUdWcFoyaDBJRDBnTlRBd08xeHVYRzVjZEd4bGRDQnpZMjl5WlNBOUlEQTdYRzVjZEd4bGRDQm5ZVzFsUm5KaGJXVWdQU0F3TzF4dVhIUmpkSGd1Wm05dWRDQTlJQ2MxTUhCNElFZGxiM0puYVdFbk8xeHVYRzVjZEM4dklHMXZkWE5sSUdsdWRHVnlZV04wYVhacGRIbGNibHgwYkdWMElHTmhiblpoYzFCdmMybDBhVzl1SUQwZ1kyRnVkbUZ6TG1kbGRFSnZkVzVrYVc1blEyeHBaVzUwVW1WamRDZ3BPMXh1WEc1Y2RHTnZibk4wSUcxdmRYTmxJRDBnZTF4dVhIUmNkSGc2SUdOaGJuWmhjeTUzYVdSMGFDQXZJRElzWEc1Y2RGeDBlVG9nWTJGdWRtRnpMbWhsYVdkb2RDQXZJRElzWEc1Y2RGeDBZMnhwWTJzNklHWmhiSE5sTEZ4dVhIUjlPMXh1WEc1Y2RHTmhiblpoY3k1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0NkdGIzVnpaV1J2ZDI0bkxDQW9aU2tnUFQ0Z2UxeHVYSFJjZEcxdmRYTmxMbU5zYVdOcklEMGdkSEoxWlR0Y2JseDBYSFJ0YjNWelpTNTRJRDBnWlM1NElDMGdZMkZ1ZG1GelVHOXphWFJwYjI0dWJHVm1kRHRjYmx4MFhIUnRiM1Z6WlM1NUlEMGdaUzU1SUMwZ1kyRnVkbUZ6VUc5emFYUnBiMjR1ZEc5d08xeHVYSFI5S1R0Y2JseHVYSFJqWVc1MllYTXVZV1JrUlhabGJuUk1hWE4wWlc1bGNpZ25iVzkxYzJWMWNDY3NJQ2hsS1NBOVBpQjdYRzVjZEZ4MGJXOTFjMlV1WTJ4cFkyc2dQU0JtWVd4elpUdGNibHgwZlNrN1hHNWNibHgwTHk4Z2NHeGhlV1Z5SUdOb1lYSmhZM1JsY2x4dVhIUmpiR0Z6Y3lCUWJHRjVaWElnZTF4dVhIUmNkR052Ym5OMGNuVmpkRzl5S0NrZ2UxeHVYSFJjZEZ4MGRHaHBjeTU0SUQwZ1kyRnVkbUZ6TG5kcFpIUm9JQzhnTWp0Y2JseDBYSFJjZEhSb2FYTXVlU0E5SUdOaGJuWmhjeTVvWldsbmFIUWdMeUF5TzF4dVhIUmNkRngwZEdocGN5NXlZV1JwZFhNZ1BTQTFNRHRjYmx4MFhIUmNkSFJvYVhNdVlXNW5iR1VnUFNBd08xeHVYSFJjZEZ4MGRHaHBjeTVtY21GdFpWZ2dQU0F3TzF4dVhIUmNkRngwZEdocGN5NW1jbUZ0WlZrZ1BTQXdPMXh1WEhSY2RGeDBkR2hwY3k1bWNtRnRaU0E5SURBN1hHNWNkRngwWEhSMGFHbHpMbk53Y21sMFpWZHBaSFJvSUQwZ05EazRPMXh1WEhSY2RGeDBkR2hwY3k1emNISnBkR1ZJWldsbmFIUWdQU0F6TWpjN1hHNWNkRngwZlZ4dVhHNWNkRngwZFhCa1lYUmxLQ2tnZTF4dVhIUmNkRngwWTI5dWMzUWdaSGdnUFNCMGFHbHpMbmdnTFNCdGIzVnpaUzU0TzF4dVhIUmNkRngwWTI5dWMzUWdaSGtnUFNCMGFHbHpMbmtnTFNCdGIzVnpaUzU1TzF4dVhHNWNkRngwWEhScFppQW9iVzkxYzJVdWVDQWhQU0IwYUdsekxuZ3BJSHRjYmx4MFhIUmNkRngwZEdocGN5NTRJQzA5SUdSNElDOGdNakE3WEc1Y2RGeDBYSFI5WEc1Y2RGeDBYSFJwWmlBb2JXOTFjMlV1ZVNBaFBTQjBhR2x6TG5rcElIdGNibHgwWEhSY2RGeDBkR2hwY3k1NUlDMDlJR1I1SUM4Z01qQTdYRzVjZEZ4MFhIUjlYRzVjZEZ4MGZWeHVYRzVjZEZ4MFpISmhkeWdwSUh0Y2JseDBYSFJjZEdsbUlDaHRiM1Z6WlM1amJHbGpheWtnZTF4dVhIUmNkRngwWEhSamRIZ3ViR2x1WlZkcFpIUm9JRDBnTUM0eU8xeHVYSFJjZEZ4MFhIUmpkSGd1WW1WbmFXNVFZWFJvS0NrN1hHNWNkRngwWEhSY2RHTjBlQzV0YjNabFZHOG9kR2hwY3k1NExDQjBhR2x6TG5rcE8xeHVYSFJjZEZ4MFhIUmpkSGd1YkdsdVpWUnZLRzF2ZFhObExuZ3NJRzF2ZFhObExua3BPMXh1WEhSY2RGeDBYSFJqZEhndWMzUnliMnRsS0NrN1hHNWNkRngwWEhSOVhHNWNibHgwWEhSY2RHTjBlQzVtYVd4c1UzUjViR1VnUFNBbmNtVmtKenRjYmx4MFhIUmNkR04wZUM1aVpXZHBibEJoZEdnb0tUdGNibHgwWEhSY2RHTjBlQzVoY21Nb2RHaHBjeTU0TENCMGFHbHpMbmtzSUhSb2FYTXVjbUZrYVhWekxDQXdMQ0JOWVhSb0xsQkpJQ29nTWlrN1hHNWNkRngwWEhSamRIZ3VabWxzYkNncE8xeHVYSFJjZEZ4MFkzUjRMbU5zYjNObFVHRjBhQ2dwTzF4dVhIUmNkSDFjYmx4MGZWeHVYRzVjZEdOdmJuTjBJSEJzWVhsbGNpQTlJRzVsZHlCUWJHRjVaWElvS1R0Y2JseHVYSFF2THlCcGJuUmxjbUZqZEdsMlpTQmxiR1Z0Wlc1MGMxeHVYSFJqYjI1emRDQmxiR1Z0Wlc1MGMwRnljbUY1SUQwZ1cxMDdYRzVjZEdOc1lYTnpJRUoxWW1Kc1pTQjdYRzVjZEZ4MFkyOXVjM1J5ZFdOMGIzSW9LU0I3WEc1Y2RGeDBYSFIwYUdsekxuZ2dQU0JOWVhSb0xuSmhibVJ2YlNncElDb2dZMkZ1ZG1GekxuZHBaSFJvTzF4dVhIUmNkRngwZEdocGN5NTVJRDBnWTJGdWRtRnpMbWhsYVdkb2RDQXJJREV3TUR0Y2JseDBYSFJjZEhSb2FYTXVjbUZrYVhWeklEMGdOVEE3WEc1Y2RGeDBYSFIwYUdsekxuTndaV1ZrSUQwZ1RXRjBhQzV5WVc1a2IyMG9LU0FxSURVZ0t5QXhPMXh1WEhSY2RGeDBkR2hwY3k1a2FYTjBZVzVqWlR0Y2JseDBYSFJjZEhSb2FYTXVZMjkxYm5SbFpDQTlJR1poYkhObE8xeHVYSFJjZEgxY2JseHVYSFJjZEhWd1pHRjBaU2dwSUh0Y2JseDBYSFJjZEhSb2FYTXVlU0F0UFNCMGFHbHpMbk53WldWa08xeHVYSFJjZEZ4MFkyOXVjM1FnWkhnZ1BTQjBhR2x6TG5nZ0xTQndiR0Y1WlhJdWVEdGNibHgwWEhSY2RHTnZibk4wSUdSNUlEMGdkR2hwY3k1NUlDMGdjR3hoZVdWeUxuazdYRzVjZEZ4MFhIUjBhR2x6TG1ScGMzUmhibU5sSUQwZ1RXRjBhQzV6Y1hKMEtHUjRJQ29nWkhnZ0t5QmtlU0FxSUdSNUtUdGNibHgwWEhSOVhHNWNibHgwWEhSa2NtRjNLQ2tnZTF4dVhIUmNkRngwWTNSNExtWnBiR3hUZEhsc1pTQTlJQ2RpYkhWbEp6dGNibHgwWEhSY2RHTjBlQzVpWldkcGJsQmhkR2dvS1R0Y2JseDBYSFJjZEdOMGVDNWhjbU1vZEdocGN5NTRMQ0IwYUdsekxua3NJSFJvYVhNdWNtRmthWFZ6TENBd0xDQk5ZWFJvTGxCSklDb2dNaWs3WEc1Y2RGeDBYSFJqZEhndVptbHNiQ2dwTzF4dVhIUmNkRngwWTNSNExtTnNiM05sVUdGMGFDZ3BPMXh1WEhSY2RGeDBZM1I0TG5OMGNtOXJaU2dwTzF4dVhIUmNkSDFjYmx4MGZWeHVYRzVjZEdaMWJtTjBhVzl1SUdoaGJtUnNaVUoxWW1Kc1pYTW9LU0I3WEc1Y2RGeDBhV1lnS0dkaGJXVkdjbUZ0WlNBbElEVXdJRDA5SURBcElIdGNibHgwWEhSY2RHVnNaVzFsYm5SelFYSnlZWGt1Y0hWemFDaHVaWGNnUW5WaVlteGxLQ2twTzF4dVhIUmNkRngwWTI5dWMyOXNaUzVzYjJjb1pXeGxiV1Z1ZEhOQmNuSmhlUzVzWlc1bmRHZ3BPMXh1WEhSY2RIMWNibHh1WEhSY2RHVnNaVzFsYm5SelFYSnlZWGt1Wm05eVJXRmphQ2dvWW5WaVlteGxLU0E5UGlCN1hHNWNkRngwWEhSaWRXSmliR1V1ZFhCa1lYUmxLQ2s3WEc1Y2RGeDBYSFJpZFdKaWJHVXVaSEpoZHlncE8xeHVYSFJjZEgwcE8xeHVYRzVjZEZ4MFpXeGxiV1Z1ZEhOQmNuSmhlUzVtYjNKRllXTm9LQ2hpZFdKaWJHVXNJR2x1WkdWNEtTQTlQaUI3WEc1Y2RGeDBYSFJwWmlBb1luVmlZbXhsTG5rZ1BDQXdJQzBnWW5WaVlteGxMbkpoWkdsMWN5QXFJRElwSUh0Y2JseDBYSFJjZEZ4MFpXeGxiV1Z1ZEhOQmNuSmhlUzV6Y0d4cFkyVW9hVzVrWlhnc0lERXBPMXh1WEhSY2RGeDBmVnh1WEc1Y2RGeDBYSFJwWmlBb1luVmlZbXhsTG1ScGMzUmhibU5sSUR3Z1luVmlZbXhsTG5KaFpHbDFjeUFySUhCc1lYbGxjaTV5WVdScGRYTXBJSHRjYmx4MFhIUmNkRngwWTI5dWMyOXNaUzVzYjJjb0oyTnZiR3hwYzJsdmJpY3BPMXh1WEhSY2RGeDBYSFJwWmlBb0lXSjFZbUpzWlM1amIzVnVkR1ZrS1NCN1hHNWNkRngwWEhSY2RGeDBjMk52Y21Vckt6dGNibHgwWEhSY2RGeDBYSFJpZFdKaWJHVXVZMjkxYm5SbFpDQTlJSFJ5ZFdVN1hHNWNkRngwWEhSY2RIMWNibHgwWEhSY2RIMWNibHgwWEhSOUtUdGNibHgwZlZ4dVhHNWNkQzh2SUdGdWFXMWhkR2x2YmlCc2IyOXdYRzVjZEdaMWJtTjBhVzl1SUdGdWFXMWhkR1VvS1NCN1hHNWNkRngwWTNSNExtTnNaV0Z5VW1WamRDZ3dMQ0F3TENCallXNTJZWE11ZDJsa2RHZ3NJR05oYm5aaGN5NW9aV2xuYUhRcE8xeHVYSFJjZEdoaGJtUnNaVUoxWW1Kc1pYTW9LVHRjYmx4MFhIUndiR0Y1WlhJdWRYQmtZWFJsS0NrN1hHNWNkRngwY0d4aGVXVnlMbVJ5WVhjb0tUdGNibHh1WEhSY2RHTjBlQzVtYVd4c1ZHVjRkQ2hnYzJOdmNtVTZJQ1I3YzJOdmNtVjlZQ3dnTVRBc0lEVXdLVHRjYmx4MFhIUm5ZVzFsUm5KaGJXVXJLenRjYmx4MFhIUnlaWEYxWlhOMFFXNXBiV0YwYVc5dVJuSmhiV1VvWVc1cGJXRjBaU2s3WEc1Y2RIMWNibHh1WEhSaGJtbHRZWFJsS0NrN1hHNTlLVHRjYmlKZExDSnpiM1Z5WTJWU2IyOTBJam9pSW4wPSJ9
