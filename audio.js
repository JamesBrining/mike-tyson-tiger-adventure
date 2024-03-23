function playBeep() {
    /*if you want to beep without using a wave file*/
  var context = new AudioContext();
  var oscillator = context.createOscillator();
  oscillator.type = "square";
  oscillator.frequency.value = 400;
  oscillator.connect(context.destination);
  oscillator.start();
  // Beep for 500 milliseconds
  setTimeout(function () {
      oscillator.stop();
  }, 100);
}

function playGameOverSound() {
    /*if you want to beep without using a wave file*/
    var context = new AudioContext();
    var oscillator = context.createOscillator();
    oscillator.type = "square";
    oscillator.frequency.value = 800;
    oscillator.connect(context.destination);
    // Start frequency
    const startFreq = 400;
    const noteDuration = 500; // in milliseconds
  
    // Define frequency progression for a death march
    const freqs = [startFreq, startFreq * 0.95, startFreq * 0.9, startFreq * 0.85, startFreq * 0.8, startFreq * 0.75, startFreq * 0.7, startFreq * 0.65, startFreq * 0.6];
    oscillator.start();
    freqs.forEach((freq, index) => {
      oscillator.frequency.setValueAtTime(freq, context.currentTime + index * (noteDuration / 1000));
      oscillator.frequency.setValueAtTime(freq, context.currentTime + (index + 0.5) * (noteDuration / 1000)); // This adds a little "pause" between each note
    });
    setTimeout(function () {
        oscillator.stop();
    }, 5000);
}