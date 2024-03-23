function createObstaclesIfNeeded() {
    if (obstacles.length === 0 || obstacles.every(obstacle => obstacle.y > height)) {
      obstacles = [];
      for (let i = 0; i < numObstacles; i++) {
        const obstacleWidth = Math.random() * (maxObstacleWidth - minObstacleWidth) + minObstacleWidth;
        const obstacleHeight = Math.random() * (maxObstacleHeight - minObstacleHeight) + minObstacleHeight;
        const obstacleX = tysonX;
        const obstacleY = tysonY;
        const obstacleSpeed = Math.random() * (maxObstacleSpeed - minObstacleSpeed) + minObstacleSpeed;
        obstacles.push({ x: obstacleX, y: obstacleY, width: obstacleWidth, height: obstacleHeight, speed: obstacleSpeed });
      }
    }
}

function increaseLevelAndSpeed() {
    level++;
    document.getElementById('levelDisplay').innerText = 'Level: ' + level;
    obstacleSpeed += 0.5;
}

function restartGame() {
    const playerName = document.getElementById('playerNamePopup').value;
    if (playerName.trim() === '') {
        alert('Please enter your name!');
        return;
    }
    const timeElapsed = Math.floor((Date.now() - startTime) / 1000); // Calculate time elapsed in seconds
    saveHighScore(playerName, timeElapsed); // Save high score with correct name and score
    document.getElementById('gameOverPopup').style.display = 'none';
    gamePaused = false; // Unpause the game
    tigerX = width / 2;
    startTime = Date.now();
    level = 1;
    document.getElementById('levelDisplay').innerText = 'Level: ' + level;
    obstacleSpeed = 2;
    obstacles = []; // Reset obstacles
    createObstaclesIfNeeded(); // Create new obstacles
    score = 0; // Reset the score
    updateTimer(); // Update the timer display
    clearInterval(timerInterval); // Clear the timer interval
    clearInterval(speedIncreaseInterval); // Clear the speed increase interval
    clearInterval(drawInterval); // Clear the draw interval
    timerInterval = setInterval(updateTimer, 1000); // Restart the timer
    speedIncreaseInterval = setInterval(increaseLevelAndSpeed, speedIncrementDuration); // Restart the speed increase interval
    drawInterval = requestAnimationFrame(draw); // Restart the draw interval
}