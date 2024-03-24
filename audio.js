function playBeep(timeElapsed) {
    /*if you want to beep without using a wave file*/
  var context = new AudioContext();
  var oscillator = context.createOscillator();
  oscillator.type = "square";
  oscillator.frequency.value = (timeElapsed * 10);
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

function playIntroMusic() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();

    // Define frequencies for the melody
    const melody = [
        329.63, 391.99, 466.16, 466.16, 391.99, 329.63, 391.99, 466.16, 466.16, 391.99,
        349.23, 391.99, 466.16, 466.16, 391.99, 349.23, 391.99, 466.16, 466.16, 391.99,
        329.63, 391.99, 466.16, 466.16, 391.99, 329.63, 391.99, 466.16, 466.16, 391.99,
        349.23, 391.99, 466.16, 466.16, 391.99, 349.23, 391.99, 466.16, 466.16, 391.99,
        349.23, 391.99, 466.16, 466.16, 466.16, 466.16, 466.16, 466.16, 466.16, 466.16,
        523.25, 587.33, 622.25, 622.25, 587.33, 523.25, 587.33, 622.25, 622.25, 587.33,
        587.33, 659.26, 587.33, 523.25, 466.16
    ];

    // Create oscillator and gain node
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    // Connect oscillator to gain node and gain node to the destination
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Set properties
    oscillator.type = 'sine'; // Sine wave
    gainNode.gain.value = 0.2; // Volume

    // Start the oscillator
    oscillator.start();

    // Schedule the melody
    const startTime = audioContext.currentTime + 0.1; // Start slightly after current time
    const tempo = 120; // Beats per minute
    const beatDuration = 60 / tempo; // Duration of one beat in seconds

    melody.forEach((frequency, index) => {
        const time = startTime + index * beatDuration;
        oscillator.frequency.setValueAtTime(frequency, time);
        gainNode.gain.setValueAtTime(0.2, time);
    });

    // Stop the oscillator after the melody finishes
    const endTime = startTime + melody.length * beatDuration;
    oscillator.stop(endTime);
}

function playPowerUpSound() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();

    // Create oscillator and gain node
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    // Connect oscillator to gain node and gain node to the destination
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Set oscillator properties
    oscillator.type = 'sine'; // Sine wave
    oscillator.frequency.setValueAtTime(100, audioContext.currentTime); // Initial frequency
    oscillator.frequency.exponentialRampToValueAtTime(1000, audioContext.currentTime + 0.5); // Ramp up to higher frequency
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Initial volume
    gainNode.gain.exponentialRampToValueAtTime(1, audioContext.currentTime + 0.5); // Ramp up to higher volume

    // Start the oscillator
    oscillator.start();

    // Stop the oscillator after the ramp-up
    oscillator.stop(audioContext.currentTime + 0.8);
}
