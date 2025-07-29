let isAutoplaying = false;
let intervalId;

try {
  score = JSON.parse(localStorage.getItem("score"));
  if (!score || typeof score !== "object") {
    throw new Error();
  }
} catch (e) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
}
UpdateScoreElement();



function autoPlay() {
  if (!isAutoplaying) {
    intervalId = setInterval(()=> {
      playGame(pickComputerMove());
    }, 2000);
    isAutoplaying = true;
  } else {
    clearInterval(intervalId);
    isAutoplaying = false;
    alert("Auto-Play has stopped");
  }
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";

  if (playerMove === "rock") {
    if (computerMove === "paper") {
      result = "You Lose";
    } else if (computerMove === "rock") {
      result = "You Tie";
    } else {
      result = "You Win";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "scissors") {
      result = "You Lose";
    } else if (computerMove === "rock") {
      result = "You Win";
    } else {
      result = "You Tie";
    }
  } else if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You Lose";
    } else if (computerMove === "paper") {
      result = "You Win";
    } else {
      result = "You Tie";
    }
  }

  if (result === "You Win") {
    score.wins += 1;
  } else if (result === "You Lose") {
    score.losses += 1;
  } else {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));
  UpdateScoreElement();
  document.querySelector(".js-result").innerHTML = `${result}`;
  document.querySelector(".js-moves").innerHTML = ` 
      You <img class="emoji" src="${playerMove}-emoji.png" alt="">
    <img class="emoji" src="${computerMove}-emoji.png" alt=""> Computer`;

  //       alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}
  // Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);
}

function UpdateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const num = Math.random();
  let computerMove = "";
  if (num < 1 / 3) {
    computerMove = "rock";
  } else if (num < 2 / 3) {
    computerMove = "paper";
  } else {
    computerMove = "scissors";
  }
  return computerMove;
}

// function resetScore() {
//   score = {
//     wins: 0,
//     losses: 0,
//     ties: 0
//   };
//   localStorage.removeItem('score');
//   UpdateScoreElement();
// //   alert('The scores have been reset');
// }
