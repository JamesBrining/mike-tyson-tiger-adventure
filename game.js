let isTimePowerupActive=!1,isRob=!1;function createObstaclesIfNeeded(){if(0===obstacles.length||obstacles.every(e=>e.y>height)){obstacles=[];for(let e=0;e<numObstacles;e++){let t=Math.random()*(maxObstacleWidth-minObstacleWidth)+minObstacleWidth,n=Math.random()*(maxObstacleHeight-minObstacleHeight)+minObstacleHeight,d=tysonX,i=tysonY,l=isTimePowerupActive?(Math.random()*(maxObstacleSpeed-minObstacleSpeed)+minObstacleSpeed)/4:Math.random()*(maxObstacleSpeed-minObstacleSpeed)+minObstacleSpeed;obstacles.push({x:d,y:i,width:t,height:n,speed:l})}}}function createPowerupsIfNeeded(){if(1!==powerups.length&&.5>Math.random()){powerups=[];for(let e=0;e<1;e++){let t=Math.random()*(width-30),n=.5>Math.random()?"slowTime":"shrinkTiger";powerups.push({x:t,y:-30,width:30,height:30,speed:2,type:n})}}}function increaseLevelAndSpeed(){level++,document.getElementById("levelDisplay").innerText="Level: "+level,obstacleSpeed+=.5,isRob=level%3==0,displayRandomQuote()}function restartGame(){isRob=!1;let e=document.getElementById("playerNamePopup").value,t=Math.floor((Date.now()-startTime)/1e3);document.getElementById("gameOverPopup").style.display="none",document.getElementById("hourglass").classList.add("spin"),document.getElementById("bigMikeSpeechContainer").style.display="flex",setTimeout(()=>{gamePaused=!1},[1250]),tigerX=width/2,startTime=Date.now(),level=1,document.getElementById("levelDisplay").innerText="Level: "+level,obstacleSpeed=2,obstacles=[],powerups=[],createObstaclesIfNeeded(),score=0,updateTimer(),clearInterval(timerInterval),clearInterval(speedIncreaseInterval),clearInterval(drawInterval),timerInterval=setInterval(updateTimer,1e3),speedIncreaseInterval=setInterval(increaseLevelAndSpeed,speedIncrementDuration),""!==e.trim()&&(saveHighScore(e,t),document.getElementById("playerNamePopup").value="")}function startGame(){isGameStarted=!0,document.getElementById("startScreen").style.display="none",document.getElementById("hourglass").classList.add("spin"),document.addEventListener("keydown",function(e){"ArrowLeft"===e.code?isLeftArrowPressed=!0:"ArrowRight"===e.code&&(isRightArrowPressed=!0)}),document.addEventListener("keyup",function(e){"ArrowLeft"===e.code?isLeftArrowPressed=!1:"ArrowRight"===e.code&&(isRightArrowPressed=!1)}),draw(),setTimeout(()=>{gamePaused=!1},[1250]),startTime=Date.now(),timerInterval=setInterval(updateTimer,1e3),speedIncreaseInterval=setInterval(increaseLevelAndSpeed,speedIncrementDuration)}isTimePowerupActive&&obstacles.map(e=>{e.speed=e.speed/4});