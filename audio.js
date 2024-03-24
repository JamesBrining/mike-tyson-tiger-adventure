function playBeep(timeElapsed) {
  var context = new AudioContext();
  var oscillator = context.createOscillator();
  oscillator.type = "square";
  oscillator.frequency.value = (timeElapsed * 10);
  oscillator.connect(context.destination);
  oscillator.start();
  setTimeout(function () {
      oscillator.stop();
  }, 100);
}

function playGameOverSound() {
    var context = new AudioContext();
    var oscillator = context.createOscillator();
    oscillator.type = "square";
    oscillator.frequency.value = 800;
    oscillator.connect(context.destination);
    const startFreq = 400;
    const noteDuration = 500;
  

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

    const melody = [
        329.63, 391.99, 466.16, 466.16, 391.99, 329.63, 391.99, 466.16, 466.16, 391.99,
        349.23, 391.99, 466.16, 466.16, 391.99, 349.23, 391.99, 466.16, 466.16, 391.99,
        329.63, 391.99, 466.16, 466.16, 391.99, 329.63, 391.99, 466.16, 466.16, 391.99,
        349.23, 391.99, 466.16, 466.16, 391.99, 349.23, 391.99, 466.16, 466.16, 391.99,
        349.23, 391.99, 466.16, 466.16, 466.16, 466.16, 466.16, 466.16, 466.16, 466.16,
        523.25, 587.33, 622.25, 622.25, 587.33, 523.25, 587.33, 622.25, 622.25, 587.33,
        587.33, 659.26, 587.33, 523.25, 466.16
    ];

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sine';
    gainNode.gain.value = 0.2;

    oscillator.start();

    const startTime = audioContext.currentTime + 0.1;
    const tempo = 120;
    const beatDuration = 60 / tempo;

    melody.forEach((frequency, index) => {
        const time = startTime + index * beatDuration;
        oscillator.frequency.setValueAtTime(frequency, time);
        gainNode.gain.setValueAtTime(0.2, time);
    });

    const endTime = startTime + melody.length * beatDuration;
    oscillator.stop(endTime);
}

function playPowerUpSound() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1000, audioContext.currentTime + 0.5);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(1, audioContext.currentTime + 0.5);

    oscillator.start();

    oscillator.stop(audioContext.currentTime + 0.8);
}
