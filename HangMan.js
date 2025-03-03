document.addEventListener("DOMContentLoaded", function () {
  const word = "RICK"; // Ordet spelaren ska gissa
  let guessedLetters = [];
  let wrongGuesses = 0;
  const maxWrong = 6;

  const hangmanBtn = document.getElementById("hangman-btn");
  const hangmanGame = document.getElementById("hangman-game");
  const wordDisplay = document.getElementById("word-display");
  const guessInput = document.getElementById("guess");
  const wrongGuessesDisplay = document.getElementById("wrong-guesses");
  const wrongLettersDisplay = document.getElementById("wrong-letters-display");
  const message = document.getElementById("message");

  // Starta spelet
  hangmanBtn.addEventListener("click", function () {
    hangmanGame.style.display = "block";
    guessedLetters = [];
    wrongGuesses = 0;
    updateDisplay();
  });

  // Kolla bokstaven
  window.checkLetter = function () {
    let letter = guessInput.value.toUpperCase();
    guessInput.value = ""; // Rensa input-fältet
    message.textContent = "";
    if (!letter.match(/[A-Z]/) || letter.length !== 1) {
      message.textContent = "Only 1 letter, A-Z!";
      return;
    }

    if (guessedLetters.includes(letter)) {
      message.textContent = "Already guessed that one!";
      return;
    }

    guessedLetters.push(letter);

    if (word.includes(letter)) {
      message.textContent = "Good guess!";
    } else {
      wrongGuesses++;
      message.textContent = "Wrong guess!";
      wrongGuessesDisplay.textContent = wrongGuesses;
      wrongLettersDisplay.textContent += letter + " ";
    }

    updateDisplay();
  };

  function updateDisplay() {
    wordDisplay.textContent = word
      .split("")
      .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
      .join(" ");

    if (!wordDisplay.textContent.includes("_")) {
      message.textContent = "You won!";
      setTimeout(playRickroll, 1000); // Spela låten efter 1 sek
    }

    if (wrongGuesses >= maxWrong) {
      message.textContent = "Game Over!";
      wordDisplay.textContent = word; // Visa hela ordet
      setTimeout(quitGame, 2000);
    }
  }
  //Makes sure it opens in a new window.
  function playRickroll() {
    const link = document.createElement("a");
    link.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    link.target = "_blank";
    link.click();
  }

  function quitGame() {
    hangmanGame.style.display = "none";
  }

  // Stäng spelet
  window.closeGame = function () {
    hangmanGame.style.display = "none";
  }; // Anropa funktionen för att starta hänga gubben-spelet
});
