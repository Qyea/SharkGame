const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const box = 32; //размер одного квадратика поля

let ground = new Image();//устанавливаем фон
ground.src = '../img/ground.png';

let foodImg = new Image();
foodImg.src = '../img/fish02.png';


let score = 0;  //счетчик

let food = {
  x: Math.floor((Math.random() * 17 + 1)) * box,
  y: Math.floor((Math.random() * 15 + 3)) * box
};


/* Аудио */
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.crs ="audio/dead.mp3"
eat.crs ="audio/eat.mp3"
up.crs ="audio/up.mp3"
left.crs ="audio/left.mp3"
right.crs ="audio/right.mp3"
down.crs ="audio/down.mp3"
/* Аудио */


let shark = [];
shark[0] = {
  x: 9 * box,
  y: 10 * box
};

document.addEventListener("keydown", direction);

let dir;//направление движения

function direction(event) {
    if (event.keyCode === 37 && dir!=="right"){
      left.play();
      dir = "left";
    } else if(event.keyCode === 38 && dir!=="down"){
      up.play();
      dir = "up";
    }
    else if(event.keyCode === 39 && dir!=="left"){
      right.play();
      dir = "right";
    }
    else if(event.keyCode === 40 && dir!=="up"){
      down.play();
      dir = "down";
    }
}
/*Проверка на столкновение с хвостом*/
function eatTail(head, array){
    for(let i = 0; i < array.length; i++){
        if(head.x === arr[i].x && head.y === arr.y){
            clearInterval(game);
        }
    }
}

function drawGame() {
    ctx.drawImage(ground, 0, 0);//рисуем фон
    ctx.drawImage(foodImg, food.x, food.y);//рисуем еду

/*
   рисуем нашу Акулу
*/
    for(let i = 0; i < shark.length; i++){
        ctx.fillStyle = i === 0 ? "blue" : "green";
        ctx.fillRect(shark[i].x, shark[i].y, box, box);
    }


/* Счетчик */
    ctx.fillStyle = "white";
    ctx.font = "50 px Arial";
    ctx.fillText(score, box * 2.5 , box * 1.7);


/*Столкновение с едой*/
    let sharkX = shark[0].x;
    let sharkY = shark[0].y;

    if(sharkX === food.x && sharkY === food.y){
        score++;
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box,
          };
    }else{
        shark.pop();
    }

/*Проверка на выход за пределы поля*/
    if(sharkX < box || sharkX > box * 17
        || sharkY < 3 * box || sharkY > box * 17){
            clearInterval(game);
            dead.play();
        }


    if(dir === "left") sharkX -= box;
    if(dir === "right") sharkX += box;
    if(dir === "up") sharkY -= box;
    if(dir === "down") sharkY += box;

    let newHead = {
        x: sharkX,
        y: sharkY
    };
}

eatTail(newHead, shark);

shark.unshift(newHead);

let game = setInterval(drawGame, 100);
