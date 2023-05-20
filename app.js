const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissors = document.getElementById('scissors');
const update = document.getElementById('update');
const autoPlay = document.querySelector('.auto');

let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

rock.addEventListener('click', () => playGame('rock'))
paper.addEventListener('click', () => playGame('paper'))
scissors.addEventListener('click', () => playGame('scissors'))

update.addEventListener('click', () => {
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      localStorage.removeItem('score');
      updateScoreElement();
})

let autoPlaying = false;
let intervalStop;

autoPlay.addEventListener('click', () => {
  // auto play
  if (!autoPlaying) {
    intervalStop =  setInterval(() => {
      const compMove = pickComputerMove()
      playGame(compMove)
    }, 1000)
    autoPlaying = true;
  } else { // to stop auto play
    clearInterval(intervalStop);
    autoPlaying = false;
  }
})

// Playing the game with keyboard
document.body.addEventListener('keydown', (e) => {
  if (e.key === 'r') {
    playGame('rock')
  } else if (e.key === 'p') {
    playGame('paper')
  } else if (e.key === 's') {
    playGame('scissors')
  }
})

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
    
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML =
    
    `You <img src="imgs/${playerMove}-emoji.png" class="move-icon">
    <img src="imgs/${computerMove}-emoji.png" class="move-icon">
    Computer`
    // `You ${playerMove} - ${computerMove} Computer`;
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}





