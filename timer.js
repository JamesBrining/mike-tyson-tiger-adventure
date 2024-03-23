function updateTimer() {
    const timeElapsed = Math.floor((Date.now() - startTime) / 1000); // Time in seconds
    document.getElementById('timer').innerText = timeElapsed + 's';
    const hourglass = document.getElementById('hourglass')
    const isRotated = hourglass.style.transform === 'rotate(45deg)'
    hourglass.style.transform = isRotated ? '' : 'rotate(45deg)'
  }