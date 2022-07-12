let scoreBlock;
let score = 0;

/* Аудио */
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src ="E:/qyea/for practic/Shark/audio/dead.mp3";
eat.src ="E:/qyea/for practic/Shark/audio/eat.mp3";
up.src ="E:/qyea/for practic/Shark/audio/up.mp3";
left.src ="E:/qyea/for practic/Shark/audio/left.mp3";
right.src ="E:/qyea/for practic/Shark/audio/right.mp3";
down.src ="E:/qyea/for practic/Shark/audio/down.mp3";
/* Аудио */


/* Настройки игры */
const config = {
	step: 0, //нужны для запуска игрового цикла
	maxStep: 6,
	sizeCell: 16, //размеры одной ячейки
	sizeBerry: 16 / 4 //размер ягоды
}

/* Змейка */
const snake = {

	/* Координаты змейки */
	x: 160,
	y: 160,

	/* Скорость змейки по вертикали и горизонтали */
	dx: config.sizeCell,
	dy: 0,

	/* массив ячеек змейки */
	tails: [],
	maxTails: 3
}

/* Координаты ягодки */
let berry = {
	x: 0,
	y: 0
} 


/* Получаем canvas */
let canvas = document.querySelector("#game-canvas");
let context = canvas.getContext("2d");
scoreBlock = document.querySelector(".game-score .score-count");
drawScore();

/* Цикл игры */
function gameLoop() {

	requestAnimationFrame( gameLoop );
	if ( ++config.step < config.maxStep) {
		return;
	}
	config.step = 0;

	context.clearRect(0, 0, canvas.width, canvas.height); //на каждом кадре очищаем поле

	/* отрисовываем змейку и ягоду */
	drawBerry();
	drawSnake();
}

requestAnimationFrame( gameLoop );

function drawSnake() {
	/* Изменение координат змейки согласно скорости */
	snake.x += snake.dx;
	snake.y += snake.dy;

	collisionBorder();

	// добавляет в начало массива объект с х и у координатами
	snake.tails.unshift( { x: snake.x, y: snake.y } );

	/* Если количество дочерних элементов у змейки больше, чем разрешено 
	мы удаляем последний элемент*/
	if ( snake.tails.length > snake.maxTails ) {
		snake.tails.pop();
	}

	/* Перебираем все дочерние элементы у змейки, проверя на 
	столкновение с хвостом и ягодой  */
	snake.tails.forEach( function(el, index){
		//Красим змейку
		if (index == 0) {
			context.fillStyle = "#0dbd5c";
		} else {
			context.fillStyle = "#0a6138";
		}
		context.fillRect( el.x, el.y, config.sizeCell, config.sizeCell );

		/* Проверяем координаты ягоды и змейки, если они совпадают, 
		увеличиваем хвост, очки и создаем новую ягоду */
		if ( el.x === berry.x && el.y === berry.y ) {
			eat.play();
			snake.maxTails++;
			incScore();
			randomPositionBerry();
		}

		/* Проверяем координаты хвоста и змейки, если они совпадают, 
		то запускаем игру заново */
		for( let i = index + 1; i < snake.tails.length; i++ ) {

			if ( el.x == snake.tails[i].x && el.y == snake.tails[i].y ) {
				dead.play();
				refreshGame();
			}

		}

	} );
}

/* Выход змейки за пределы поля */
function collisionBorder() {
	if (snake.x < 0) {
		snake.x = canvas.width - config.sizeCell;
	} else if ( snake.x >= canvas.width ) {
		snake.x = 0;
	}

	if (snake.y < 0) {
		snake.y = canvas.height - config.sizeCell;
	} else if ( snake.y >= canvas.height ) {
		snake.y = 0;
	}
}

	/* обнуление всех значений */
function refreshGame() {
	score = 0;
	drawScore();

	snake.x = 160;
	snake.y = 160;
	snake.tails = [];
	snake.maxTails = 3;
	snake.dx = config.sizeCell;
	snake.dy = 0;

	randomPositionBerry();
}

	/* рисуем ягоду */
function drawBerry() {
	context.beginPath();
	context.fillStyle = "#A00034";
	context.arc( berry.x + (config.sizeCell / 2 ), berry.y + (config.sizeCell / 2 ), config.sizeBerry, 0, 2 * Math.PI );
	context.fill();
}

   /* Случайные координаты ягоды */
function randomPositionBerry() {
	berry.x = getRandomInt( 0, canvas.width / config.sizeCell ) * config.sizeCell;
	berry.y = getRandomInt( 0, canvas.height / config.sizeCell ) * config.sizeCell;
}


  /* Увеличивает значение очков на единицу */
function incScore() {
	score++;
	drawScore();
}

  /* Отображение очков */
function drawScore() {
	scoreBlock.innerHTML = score;
}

function getRandomInt(min, max) {
	return Math.floor( Math.random() * (max - min) + min );
}

  /* Направление движения */
document.addEventListener("keydown", function (e) {
	if ( e.code == "KeyW" ) {
		up.play();
		snake.dy = -config.sizeCell;
		snake.dx = 0;
	} else if ( e.code == "KeyA" ) {
		left.play();
		snake.dx = -config.sizeCell;
		snake.dy = 0;
	} else if ( e.code == "KeyS" ) {
		down.play();
		snake.dy = config.sizeCell;
		snake.dx = 0;
	} else if ( e.code == "KeyD" ) {
		right.play();
		snake.dx = config.sizeCell;
		snake.dy = 0;
	}
});