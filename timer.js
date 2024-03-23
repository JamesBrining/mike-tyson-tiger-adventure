function updateTimer() {
    const timeElapsed = Math.floor((Date.now() - startTime) / 1000); // Time in seconds
    document.getElementById('timerDiv').innerText = 'Time: ' + timeElapsed + 's';
  }