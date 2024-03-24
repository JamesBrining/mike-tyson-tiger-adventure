function getScore() {
    const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
    return timeElapsed + 's';
  }

function displayHighScores() {
    const highScoreList = document.getElementById('highScoreList');
    highScoreList.innerHTML = '';
    highScores.sort((a, b) => b.score - a.score);
    highScores.slice(0, 5).forEach(entry => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${entry.name}</td><td>${entry.score}</td>`;
      highScoreList.appendChild(row);
    });
  }

  function saveHighScore(playerName, score) {
    highScores.push({ name: playerName, score: score });
    localStorage.setItem('highScores', JSON.stringify(highScores));
    displayHighScores();
  }