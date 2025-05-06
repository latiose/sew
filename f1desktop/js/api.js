//"use strict"; no funciona si pongo esto
//Apis usadas:
//Canvas para dibujar el juego
//Geolocation para cambiar el color de fondo con respecto a la temperatura que haya en la ubicación del usuario (usando openweather)
//Web audio para similar el sonido del coche. de las monedas y de las bombas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let carX = canvas.width / 2;
let carY = canvas.height / 2;
let carSpeed = 6;
let carWidth = 50;
let carHeight = 100;
let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;
let gameStarted = false;
let startMessageVisible = true;
let score = 0;
let radius = 10;
let coinSpawnInterval = 2000; 
let bombSpawnInterval = 3500; 
let minTimeCoin = 1500;
let maxTimeCoin = 2500;
let minTimeBomb = 10000;
let maxTimeBomb = 20000;
let coins = [];
let bombs = [];
let seAcabo = false;


function spawnCoin() {
    let coinX = Math.random() * (canvas.width - 200) + 100;
    let coinY = Math.random() * (canvas.height - 100);
    let spawnTime = Date.now();
    let lifeTime = Math.random() * (maxTimeCoin - minTimeCoin) + minTimeCoin; 
    coins.push({ x: coinX, y: coinY, spawnTime, lifeTime }); 
}

function spawnBomb() {
    let bombX = Math.random() * (canvas.width - 200) + 100;
    let bombY = Math.random() * (canvas.height - 100);
    let spawnTime = Date.now();
    let lifeTime = Math.random() * (maxTimeBomb - minTimeBomb) + minTimeBomb; 
    bombs.push({ x: bombX, y: bombY, spawnTime, lifeTime }); 
}


function drawCoins() {
    ctx.fillStyle = "yellow";
    coins.forEach(coin => {
        ctx.beginPath();
        ctx.arc(coin.x, coin.y, radius, 0, Math.PI * 2);
        ctx.fill();
    });
}

function drawBombs() {
    ctx.fillStyle = "black";
    bombs.forEach(bomb => {
        ctx.beginPath();
        ctx.arc(bomb.x, bomb.y, radius, 0, Math.PI * 2);
        ctx.fill();
    });
}

function playTone(frequency, duration) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);

    oscillator.start();
    setTimeout(() => {
        oscillator.stop();
    }, duration);
}


function checkCoinCollision() {
    coins = coins.filter(coin => {
        let distX = coin.x - (carX + carWidth / 2);
        let distY = coin.y - (carY + carHeight / 2);
        let distance = Math.sqrt(distX * distX + distY * distY);

        if (distance < radius + Math.min(carWidth, carHeight) / 2) {
            playTone(880, 200);
            score += 50;
            return false; 
        }
        return true;
    });
}

function checkBombCollision() {
    bombs = bombs.filter(bomb => {
        let distX = bomb.x - (carX + carWidth / 2); 
        let distY = bomb.y - (carY + carHeight / 2); 
        let distance = Math.sqrt(distX * distX + distY * distY);

        if (distance < radius + Math.min(carWidth, carHeight) / 2) {
            playTone(440, 400);
            score -= 100;  
            return false;  
        }
        return true;  
    });
}

function removeExpiredCoins() {
    let currentTime = Date.now();
    coins = coins.filter(coin => {
        return currentTime - coin.spawnTime <= coin.lifeTime; 
    });
}

function removeExpiredBombs() {
    let currentTime = Date.now();
    bombs = bombs.filter(bomb => {
        return currentTime - bomb.spawnTime <= bomb.lifeTime; 
    });
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "1em Arial";
    ctx.textAlign = "left";
    ctx.fillText("Puntuación: " + score, 20, 30);
}

function drawStartMessage() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "1.5em Arial";
    ctx.textAlign = "center";
  const messageLines = [
    "REGLAS DEL JUEGO:",
    "Coge las monedas para ganar puntos,",
    "las bombas te restan,",
    "ganas al llegar a 1000 puntos.",
    "Presiona cualquier flecha para empezar"
];
const lineHeight = 40; 
for (let i = 0; i < messageLines.length; i++) {
    ctx.fillText(messageLines[i], canvas.width / 2, canvas.height / 2 + (i - messageLines.length / 2) * lineHeight);
}
}

function resizeCanvas() {
    let previousWidth = canvas.width;
    let previousHeight = canvas.height;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if (!gameStarted) {
        carX = canvas.width / 2;
        carY = canvas.height / 2;
    } else {
        carX = (carX / previousWidth) * canvas.width;
        carY = (carY / previousHeight) * canvas.height;

        coins.forEach(coin => {
            coin.x = (coin.x / previousWidth) * canvas.width;
            coin.y = (coin.y / previousHeight) * canvas.height;
        });

        bombs.forEach(bomb => {
            bomb.x = (bomb.x / previousWidth) * canvas.width;
            bomb.y = (bomb.y / previousHeight) * canvas.height;
        });
    }

    if (!gameStarted && startMessageVisible) {
        drawStartMessage();
    }
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let engineSound = audioContext.createOscillator();
let gainNode = audioContext.createGain();
engineSound.connect(gainNode);
gainNode.connect(audioContext.destination);

function startEngineSound() {
    engineSound.type = "sine";
    engineSound.frequency.setValueAtTime(300, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    engineSound.start();
    engineSound.loop = true;
}

function stopEngineSound() {
    engineSound.stop();
}

function getWeather() {
    return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(function (position) {
            const apikey = "9b78bae472a2bd2d0d112053ad77a805";
            const tipo = "&mode=xml";
            const unidades = "&units=metric";
            const idioma = "&lang=es";
            const url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + tipo + unidades + idioma + "&appid=" + apikey;

            $.ajax({
                dataType: "xml",
                url: url,
                method: "GET",
                success: (datos) => {
                    const temperatura = $(datos).find("temperature").attr("value");
                    resolve(getColorFromTemperature(parseFloat(temperatura)));
                },
                error: () => {
                    resolve("white");
                },
            });
        }, () => {
            resolve("white");
        });
    });
}

function getColorFromTemperature(temperatura) {
    if (temperatura <= 0) {
        return "white";
    } else if (temperatura >= 1 && temperatura <= 20) {
        return "green";
    } else {
        return "orange";
    }
}

function drawCar() {
    ctx.fillStyle = "red";
    ctx.fillRect(carX, carY, carWidth, carHeight);
}

function drawTrack() {
    ctx.fillStyle = "#333";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = this.color;
    if (!this.color) {
        ctx.fillStyle = "white";
    }
    ctx.fillRect(100, 0, canvas.width - 200, canvas.height);
}

function update() {
    if(!seAcabo){
    if (startMessageVisible) {
        drawStartMessage();
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTrack();
    drawCar();
    drawCoins();
    drawBombs();
    checkCoinCollision();
    checkBombCollision();
    removeExpiredCoins();
    removeExpiredBombs();
    drawScore();
    if (upPressed && carY > 0) carY -= carSpeed;
    if (downPressed && carY < canvas.height - carHeight) carY += carSpeed;
    if (leftPressed && carX > 100) carX -= carSpeed;
    if (rightPressed && carX < canvas.width - carWidth - 100) carX += carSpeed;
    requestAnimationFrame(update);
    if(score==1000){
        seAcabo = true;
    }
    } else{
        drawFinalScreen();
    }
}
window.addEventListener("keydown", function (event) {
    if (!gameStarted && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        handleGameStart();
    }
    if (event.key === "ArrowUp") upPressed = true;
    if (event.key === "ArrowDown") downPressed = true;
    if (event.key === "ArrowLeft") leftPressed = true;
    if (event.key === "ArrowRight") rightPressed = true;
});

window.addEventListener("keyup", function (event) {
    if (event.key === "ArrowUp") upPressed = false;
    if (event.key === "ArrowDown") downPressed = false;
    if (event.key === "ArrowLeft") leftPressed = false;
    if (event.key === "ArrowRight") rightPressed = false;
});

function handleGameStart() {
    if (!gameStarted) {
        gameStarted = true;
        startMessageVisible = false;
        startGame();
    }
}

async function startGame() {
    drawLoadingScreen();
    this.color = await getWeather();
    startEngineSound();
    drawTrack();
    update();
}

function drawLoadingScreen() { // para esperar a que open weather devuela la temperatura
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Cargando...", canvas.width / 2, canvas.height / 2);
}


function drawFinalScreen() {
    stopEngineSound();
    ctx.fillStyle = "yellow";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("¡¡HAS GANADO!!", canvas.width / 2, canvas.height / 2);
}


const controls = document.createElement("section");
const h3Controles = document.createElement("h3");
h3Controles.innerText = "Controles";
controls.appendChild(h3Controles);


const arrows = {
    up: document.createElement("article"),
    left: document.createElement("article"),
    down: document.createElement("article"),
    right: document.createElement("article"),
};


Object.keys(arrows).forEach(key => {
    const arrow = arrows[key];
    h3 = document.createElement("h3");
    h3.innerText = key === "up" ? "↑" : key === "down" ? "↓" : key === "left" ? "←" : "→";
    const startAction = () => {
        handleGameStart();
        if (key === "up") upPressed = true;
        if (key === "down") downPressed = true;
        if (key === "left") leftPressed = true;
        if (key === "right") rightPressed = true;
    };

    const endAction = () => {
        if (key === "up") upPressed = false;
        if (key === "down") downPressed = false;
        if (key === "left") leftPressed = false;
        if (key === "right") rightPressed = false;
    };

    arrow.addEventListener("touchstart", startAction);
    arrow.addEventListener("touchend", endAction);

    arrow.addEventListener("mousedown", startAction);
    arrow.addEventListener("mouseup", endAction);
    arrow.appendChild(h3);
    controls.appendChild(arrow);
});
const main = document.querySelector("main");
main.appendChild(controls);

update();
setInterval(spawnCoin, coinSpawnInterval);
setInterval(spawnBomb, bombSpawnInterval);
update();
