let isTimePowerupActive = false
let isRob = false;

function createObstaclesIfNeeded() {
    if (obstacles.length === 0 || obstacles.every(obstacle => obstacle.y > height)) {
      obstacles = [];
      for (let i = 0; i < numObstacles; i++) {
        const obstacleWidth = Math.random() * (maxObstacleWidth - minObstacleWidth) + minObstacleWidth;
        const obstacleHeight = Math.random() * (maxObstacleHeight - minObstacleHeight) + minObstacleHeight;
        const obstacleX = tysonX;
        const obstacleY = tysonY;
        const obstacleSpeed = isTimePowerupActive ? (Math.random() * (maxObstacleSpeed - minObstacleSpeed) + minObstacleSpeed) / 4 : Math.random() * (maxObstacleSpeed - minObstacleSpeed) + minObstacleSpeed;
        obstacles.push({ x: obstacleX, y: obstacleY, width: obstacleWidth, height: obstacleHeight, speed: obstacleSpeed });
      }
    }
}

if(isTimePowerupActive) {
  obstacles.map((obstacle) => {
    obstacle.speed = obstacle.speed / 4
  })
}

function createPowerupsIfNeeded() {
  if(powerups.length !== 1 && Math.random() < 0.5) {
    powerups = []
    for (let i = 0; i < 1; i++){
      const powerupWidth = 30;
      const powerupHeight = 30
      const powerupX = Math.random() * (width - powerupWidth)
      const powerupY = -powerupHeight
      const powerupSpeed = 2
      const powerupType = Math.random() < 0.5 ? 'slowTime' : 'shrinkTiger'

      powerups.push({ x: powerupX, y: powerupY, width: powerupWidth, height: powerupHeight, speed: powerupSpeed, type: powerupType})
    }
  }
}

function increaseLevelAndSpeed() {
    level++;
    document.getElementById('levelDisplay').innerText = 'Level: ' + level;
    obstacleSpeed += 0.5;
    document.getElementById('speech-bubble-bottom').textContent = '';
    document.getElementById('speech-bubble-bottom').style.opacity = 0;
}

function restartGame() {
    isRob = false;
    const playerName = document.getElementById('playerNamePopup').value;
    const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById('gameOverPopup').style.display = 'none';
    document.getElementById('hourglass').classList.add('spin')
    document.getElementById('bigMikeSpeechContainer').style.display = 'flex';
    setTimeout(() => {
      gamePaused = false
    }, [2000])
    tigerX = width / 2;
    startTime = Date.now();
   
    level = 1;
    document.getElementById('levelDisplay').innerText = 'Level: ' + level;
    obstacleSpeed = 2;
    obstacles = [];
    powerups = []
    createObstaclesIfNeeded();
    score = 0;
    updateTimer();
    clearInterval(timerInterval);
    clearInterval(speedIncreaseInterval);
    clearInterval(drawInterval);
    timerInterval = setInterval(updateTimer, 1000);
    speedIncreaseInterval = setInterval(increaseLevelAndSpeed, speedIncrementDuration);

    if (playerName.trim() !== '') {
      saveHighScore(playerName, timeElapsed);
      document.getElementById('playerNamePopup').value = '';
        
    }
}

function startGame(){
  isGameStarted = true
  document.getElementById("startScreen").style.display = 'none'
  document.getElementById('hourglass').classList.add('spin')
  document.addEventListener('keydown', function(event) {
    if (event.code === 'ArrowLeft') {
      isLeftArrowPressed = true;
    } else if (event.code === 'ArrowRight') {
      isRightArrowPressed = true;
    }
  });

  document.addEventListener('keyup', function(event) {
    if (event.code === 'ArrowLeft') {
      isLeftArrowPressed = false;
    } else if (event.code === 'ArrowRight') {
      isRightArrowPressed = false;
    }
  });
  
  draw();
  setTimeout(() => {
    gamePaused = false
  }, [1250])

  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);

    setInterval(displayRandomQuote, 10000);
    displayRandomQuote();
  
  
  speedIncreaseInterval = setInterval(increaseLevelAndSpeed, speedIncrementDuration);
}