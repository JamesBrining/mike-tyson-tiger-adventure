function drawBackground() {
    const backgroundLayer = document.getElementById('backgroundLayer');
    const backgroundImage = new Image();
    backgroundImage.src = 'assets/gameboy-80-center.png';
    backgroundLayer.style.background = `url('${backgroundImage.src}')`;
    backgroundLayer.style.backgroundSize = 'contain';
    backgroundLayer.style.backgroundPosition = `center`;
    backgroundLayer.style.backgroundRepeat = 'no-repeat'
  }

  const fps = 60
  let now;
  let then = Date.now()
  const interval = 1000/fps
  let delta

  function draw() {
    drawInterval = requestAnimationFrame(draw);  
    now = Date.now()
    delta = now - then
 
    if(delta > interval) {
      then = now - (delta % interval)

      ctx.clearRect(0, 0, width, height);

      const tiger = new Image();
      tiger.src = 'assets/tyson_tiger.png';
      ctx.drawImage(tiger, tigerX, tigerY, tigerSize, tigerSize);

      const mikeTyson = new Image();
      isRob = (level % 3 === 0) ? true : false;
      mikeTyson.src = (isRob) ? 'assets/big-rob.png' : 'assets/mike_tyson.png'
      document.getElementById('bigMike').src = (isRob) ? 'assets/big-rob.png' : 'assets/big_mike_tyson.png'
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
        createObstaclesIfNeeded();
      }, [1250])

      if (!gamePaused) { 

      if(Math.random() < 0.0025) {
        createPowerupsIfNeeded()
      }

      const powerup = powerups[0]


      if(powerups.length > 0) {
        let powerupImage = new Image()
        if(powerup.type === 'slowTime'){
          powerupImage.src = 'assets/clock.png'
        }
        if(powerup.type === 'shrinkTiger'){
          powerupImage.src = 'assets/blue_shroom.png'
        }
        ctx.drawImage(powerupImage, powerup.x, powerup.y, powerup.width, powerup.height)
        powerup.y += powerup.speed;
      }


      if(powerup) {
        if(
          tigerX < powerup.x + powerup.width &&
          tigerX + tigerSize > powerup.x &&
          tigerY < powerup.y + powerup.height &&
          tigerY + tigerSize > powerup.y
        ) {
          if(powerup.type === 'slowTime'){
            isTimePowerupActive = true
          }
          if(powerup.type === 'shrinkTiger'){
            tigerSize = 15
          }
          playPowerUpSound();
          powerup.x = -9999
          setTimeout(() => {
            if(powerup.type === 'slowTime'){
              isTimePowerupActive = false
            }
            if(powerup.type === 'shrinkTiger'){
              tigerSize = 30
            }
            powerups = []
          }, 5000)
        }
        if(powerup.y > height - powerup.height){
          powerups = []
        }
      }

      obstacles.forEach(obstacle => {
        const images = [{src: 'boxing_glove_main.png', height: 17, width: 12}, {src:'beer.png', height: 29, width: 7}, {src: 'belt.png', height: 13, width: 31}];
        const index = (level - 1) % images.length;
        const obstacleImage = new Image();
        const levelImage = images[index]
        obstacleImage.src = `assets/${levelImage.src}`;
        ctx.drawImage(obstacleImage, obstacle.x, obstacle.y, levelImage.width, levelImage.height);
        obstacle.y += obstacle.speed;
        if (
          tigerX < obstacle.x + obstacle.width &&
          tigerX + tigerSize > obstacle.x &&
          tigerY < obstacle.y + obstacle.height &&
          tigerY + tigerSize > obstacle.y
        ) {
          playGameOverSound();
          document.getElementById('finalScore').textContent = getScore();
          document.getElementById('gameOverPopup').style.display = 'flex';
          document.getElementById('bigMikeSpeechContainer').style.display = 'none';
          document.getElementById('hourglass').classList.remove('spin')
          document.getElementById('speech-bubble-bottom').textContent = '';
          document.getElementById('speech-bubble-bottom').style.opacity = 0;
          gamePaused = true;
          clearInterval(timerInterval);
          clearInterval(speedIncreaseInterval);
          cancelAnimationFrame(drawInterval);
        }
      });
     }
    }
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

  const robQuotes = [
    "Why am I the only one wearing a high-vis vest?",
    "Breakfast will be in about 10 minutes guys.",
    "Why are you taking a picture of my face?",
    "Anyone got any rubbish for me?",
    "Hi, I'm Rob."
  ]
  
  function displayRandomQuote() {
    const randomIndex = isRob ? Math.floor(Math.random() * robQuotes.length) 
      : Math.floor(Math.random() * mikeTysonQuotes.length);
    const randomQuote = (isRob) ? robQuotes[randomIndex] : mikeTysonQuotes[randomIndex];
    const speechBubble = document.getElementById('speech-bubble-bottom');
    speechBubble.textContent = randomQuote;
    speechBubble.style.opacity = '1'; 
  }

    setInterval(displayRandomQuote, 10000);
    displayRandomQuote();
