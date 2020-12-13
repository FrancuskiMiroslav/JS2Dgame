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
