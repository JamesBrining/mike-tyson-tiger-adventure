function drawBackground() {
    backgroundLayer.style.background = `url('${backgroundImage.src}')`;
    backgroundLayer.style.backgroundSize = 'cover';
    backgroundLayer.style.backgroundPosition = `center ${backgroundOffset}px`;
    backgroundOffset += 1; // Adjust speed of parallax effect
    requestAnimationFrame(drawBackground);
  }

  function draw() {
    if (!gamePaused) { // Only draw when the game is not paused
      ctx.clearRect(0, 0, width, height);

      const tiger = new Image();
      tiger.src = 'assets/tyson_tiger.png';
      ctx.drawImage(tiger, tigerX, tigerY, tigerSize, tigerSize);

      const mikeTyson = new Image()
      mikeTyson.src = 'assets/mike_tyson.png'
      ctx.drawImage(mikeTyson, tysonX, tysonY, tysonSize, tysonSize);

      createObstaclesIfNeeded(); // Create obstacles if needed
      // createPowerupsIfNeeded()

      if(Math.random() < 0.0025) {
        createPowerupsIfNeeded()
      }

      const powerup = powerups[0]

      if(powerups.length > 0) {
        const timerPowerup = new Image()
        timerPowerup.src = 'assets/clock.png'
        ctx.drawImage(timerPowerup, powerup.x, powerup.y, powerup.width, powerup.height)
        powerup.y += powerup.speed;
      }


      if(powerup) {
        if(
          tigerX < powerup.x + powerup.width &&
          tigerX + tigerSize > powerup.x &&
          tigerY < powerup.y + powerup.height &&
          tigerY + tigerSize > powerup.y
        ) {
          isTimePowerupActive = true
          powerup.x = -9999 // flakey move to side
          setTimeout(() => {
            isTimePowerupActive = false
            powerups = []
          }, 5000)
        }
      }

      obstacles.forEach(obstacle => {
        // ctx.fillStyle = 'red';
        // ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        const images = [{src: 'boxing_glove_main.png', height: 17, width: 12}, {src:'beer.png', height: 29, width: 7}, {src: 'belt.png', height: 13, width: 31}];
        const index = (level - 1) % images.length;
        const obstacleImage = new Image();
        const levelImage = images[index]
        obstacleImage.src = `assets/${levelImage.src}`;
        ctx.drawImage(obstacleImage, obstacle.x, obstacle.y, levelImage.width, levelImage.height);
        obstacle.y += obstacle.speed;
        if (
          // game running
          tigerX < obstacle.x + obstacle.width &&
          tigerX + tigerSize > obstacle.x &&
          tigerY < obstacle.y + obstacle.height &&
          tigerY + tigerSize > obstacle.y
        ) {
          // game over
          playGameOverSound();
          document.getElementById('finalScore').textContent = getScore(); // Corrected line
          document.getElementById('gameOverPopup').style.display = 'flex';
          gamePaused = true; // Pause the game
          clearInterval(timerInterval); // Stop the timer
          clearInterval(speedIncreaseInterval); // Stop the speed increase
          cancelAnimationFrame(drawInterval); // Stop the draw loop
        }
      });

      if (isLeftArrowPressed && tigerX > 0) {
        tigerX -= 5;
      }
      if (isRightArrowPressed && tigerX < width - tigerSize) {
        tigerX += 5;
      }

      if(tysonX > 0 && tysonDirection === 'left'){
        tysonX -= 5;  
      }

      if(tysonX < width - tysonSize && tysonDirection === 'right'){
        tysonX += 5;
      }

      if(tysonX === 0){
        tysonDirection = 'right';
      }

      if(tysonX >= (width - tysonSize)){
        tysonDirection = 'left';
      }
      
      drawInterval = requestAnimationFrame(draw);
    }
  }