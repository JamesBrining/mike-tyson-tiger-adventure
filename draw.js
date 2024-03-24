function drawBackground() {
    const backgroundLayer = document.getElementById('backgroundLayer');
    const backgroundImage = new Image();
    backgroundImage.src = 'assets/gameboy-80-center.png';
    backgroundLayer.style.background = `url('${backgroundImage.src}')`;
    backgroundLayer.style.backgroundSize = 'contain';
    backgroundLayer.style.backgroundPosition = `center`;
    backgroundLayer.style.backgroundRepeat = 'no-repeat'
  }

  function draw() {
    // Only draw when the game is not paused
      ctx.clearRect(0, 0, width, height);

      const tiger = new Image();
      tiger.src = 'assets/tyson_tiger.png';
      ctx.drawImage(tiger, tigerX, tigerY, tigerSize, tigerSize);

      const mikeTyson = new Image()
      mikeTyson.src = (level % 5 === 0) ? 'assets/green-rob.jpg' : 'assets/mike_tyson.png'
      ctx.drawImage(mikeTyson, tysonX, tysonY, tysonSize, tysonSize);
      if (isLeftArrowPressed && tigerX > 0) {
        tigerX -= 5;
      }
      if (isRightArrowPressed && tigerX < (width - tigerSize)) {
        tigerX += 5;
      }

      if(tysonX >= -5 && tysonDirection === 'left'){

        if(isTimePowerupActive){
          tysonX -= 1
        }
        else {
          tysonX -= 5;  
        }
      }

      if(tysonX < (width - tysonSize) + 20 && tysonDirection === 'right'){
       
        if(isTimePowerupActive){
          tysonX += 1
        }
        else {
          tysonX += 5;
        }
      }

      if(tysonX <= -5){
        tysonDirection = 'right';
      }


      if(tysonX >= ((width - tysonSize) + 20)){
        tysonDirection = 'left';
      }

      setTimeout(() => {
        createObstaclesIfNeeded(); // Create obstacles if needed
      }, [1250])

      if (!gamePaused) { 
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
          document.getElementById('bigMikeSpeechContainer').style.display = 'none';
          document.getElementById('hourglass').classList.remove('spin')
          gamePaused = true; // Pause the game
          clearInterval(timerInterval); // Stop the timer
          clearInterval(speedIncreaseInterval); // Stop the speed increase
          cancelAnimationFrame(drawInterval); // Stop the draw loop
        }
      });

    
      
    }
    drawInterval = requestAnimationFrame(draw);
  }

  const mikeTysonQuotes = [
    "Everyone has a plan until they get punched in the mouth.",
    "I'm the best ever. I'm the most brutal and vicious, and most ruthless champion there's ever been.",
    "I just want to conquer people and their souls.",
    "Everyone has a plan until they get punched in the mouth.",
    "I just want to conquer people and their souls.",
    "I'm not a tycoon. I'm just a small guy from Brooklyn.",
    "I could feel his muscle tissues collapse under my force. It's ludicrous these mortals even attempt to enter my realm.",
    "I'm not Mother Teresa, but I'm not Charles Manson, either.",
    "I don't try to intimidate anybody before a fight. That's nonsense. I intimidate people by hitting them.",
    "I refuse to be beaten by people who believe in luck.",
    "I just want to do what I do best, and that's fight. I love it.",
    "Hard times fall upon everybody. Whatever it is, we're going to get out of it.",
    "Everybody you fight is not your enemy and everybody that helps you is not your friend."
  ];
  
  function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * mikeTysonQuotes.length);
    const randomQuote = mikeTysonQuotes[randomIndex];
    const speechBubble = document.getElementById('speech-bubble');
    speechBubble.textContent = randomQuote; // Set the speech bubble text to the random quote
    speechBubble.style.opacity = '1'; // Make the speech bubble visible
  
    // // Hide the speech bubble after 5 seconds
    setTimeout(() => {
      speechBubble.style.opacity = '0';
    }, 5000);
  }

  
  if(!gamePaused)
  {
    setInterval(displayRandomQuote, 10000);
    displayRandomQuote();
  }
