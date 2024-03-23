function drawBackground() {
    backgroundLayer.style.background = `url('${backgroundImage.src}')`;
    backgroundLayer.style.backgroundSize = 'cover';
    backgroundLayer.style.backgroundPosition = `center ${backgroundOffset}px`;
    backgroundOffset += 1; // Adjust speed of parallax effect
    requestAnimationFrame(drawBackground);
  }

  function drawTiger(x, y, size) {
    // Tiger's body
    ctx.fillStyle = tigerColor;
    ctx.fillRect(x + 12, y + 4, 16, 4);
    ctx.fillRect(x + 8, y + 8, 24, 4);
    ctx.fillRect(x + 4, y + 12, 32, 16);
    ctx.fillRect(x, y + 28, 40, 4);
    ctx.fillRect(x + 4, y + 32, 8, 4);
    ctx.fillRect(x + 28, y + 32, 8, 4);
    ctx.fillRect(x + 8, y + 36, 2, 4);
    ctx.fillRect(x + 10, y + 36, 20, 4);
    ctx.fillRect(x + 30, y + 36, 2, 4);

    // Tiger's head
    ctx.fillRect(x + 12, y, 16, 8);
    ctx.fillRect(x + 8, y + 4, 4, 4);
    ctx.fillRect(x + 20, y + 4, 4, 4);
    ctx.fillRect(x + 10, y + 8, 2, 4);
    ctx.fillRect(x + 18, y + 8, 2, 4);
    ctx.fillRect(x + 6, y + 12, 4, 2);
    ctx.fillRect(x + 10, y + 12, 2, 2);
    ctx.fillRect(x + 18, y + 12, 2, 2);
    ctx.fillRect(x + 22, y + 12, 4, 2);
    ctx.fillRect(x + 4, y + 14, 4, 2);
    ctx.fillRect(x + 10, y + 14, 2, 2);
    ctx.fillRect(x + 18, y + 14, 2, 2);
    ctx.fillRect(x + 24, y + 14, 4, 2);
    ctx.fillRect(x + 4, y + 16, 2, 2);
    ctx.fillRect(x + 6, y + 16, 20, 2);
    ctx.fillRect(x + 24, y + 16, 2, 2);
    ctx.fillRect(x + 2, y + 18, 2, 4);
    ctx.fillRect(x + 6, y + 18, 20, 4);
    ctx.fillRect(x + 24, y + 18, 2, 4);
    ctx.fillRect(x, y + 20, 2, 6);
    ctx.fillRect(x + 2, y + 20, 2, 2);
    ctx.fillRect(x + 8, y + 20, 2, 2);
    ctx.fillRect(x + 18, y + 20, 2, 2);
    ctx.fillRect(x + 26, y + 20, 2, 2);
    ctx.fillRect(x + 28, y + 20, 2, 2);
    ctx.fillRect(x, y + 22, 32, 2);
    ctx.fillRect(x + 2, y + 24, 2, 2);
    ctx.fillRect(x + 8, y + 24, 2, 2);
    ctx.fillRect(x + 18, y + 24, 2, 2);
    ctx.fillRect(x + 26, y + 24, 2, 2);
    ctx.fillRect(x + 30, y + 24, 2, 2);
    ctx.fillRect(x + 4, y + 26, 2, 2);
    ctx.fillRect(x + 10, y + 26, 2, 2);
    ctx.fillRect(x + 20, y + 26, 2, 2);
    ctx.fillRect(x + 28, y + 26, 2, 2);
  }

  function drawCokeCan(obstacle) {
    // Draw the coke can
    ctx.fillStyle = 'red'; // Color of the coke can
    // Draw top of the can
    ctx.fillRect(obstacle.x + 12, obstacle.y, 16, 4);
    // Draw sides of the can
    ctx.fillRect(obstacle.x + 8, obstacle.y + 4, 4, 16);
    ctx.fillRect(obstacle.x + 28, obstacle.y + 4, 4, 16);
    // Draw bottom of the can
    ctx.fillRect(obstacle.x + 8, obstacle.y + 20, 24, 4);
  }

  function draw() {
    if (!gamePaused) { // Only draw when the game is not paused
      ctx.clearRect(0, 0, width, height);
      drawTiger(tigerX, tigerY, tigerSize);

      createObstaclesIfNeeded(); // Create obstacles if needed

      obstacles.forEach(obstacle => {
        // ctx.fillStyle = 'red';
        // ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        drawCokeCan(obstacle); // Draw the coke can
        obstacle.y += obstacle.speed;
        if (
          tigerX < obstacle.x + obstacle.width &&
          tigerX + tigerSize > obstacle.x &&
          tigerY < obstacle.y + obstacle.height &&
          tigerY + tigerSize > obstacle.y
        ) {
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

      drawInterval = requestAnimationFrame(draw);
    }
  }