document.addEventListener("DOMContentLoaded", function () {
  const hangmanGame = document.getElementById("hangman-game");
  const wordDisplay = document.getElementById("word-display");
  const wrongGuessesDisplay = document.getElementById("wrong-guesses");
  const wrongLettersDisplay = document.getElementById("wrong-letters-display");
  const message = document.getElementById("message");
  const guessInput = document.getElementById("guess");
  const hangmanBtn = document.getElementById("hangman-btn");
  const closeBtn = document.getElementById("close-btn");

  let guessedLetters = [];
  let wrongGuesses = 0;
  const maxWrong = 6;
  const word = "RICK"; // Ordet spelaren ska gissa

  // Starta spelet
  function startGame() {
    hangmanGame.style.display = "block";
    guessedLetters = [];
    wrongGuesses = 0;
    updateDisplay();
  }

  // Kolla bokstaven
  function checkLetter(letter) {
    letter = letter.toUpperCase();
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

    // Sätt fokus tillbaka till inputfältet efter varje gissning
    guessInput.focus();
  }

  // Uppdatera displayen
  function updateDisplay() {
    guessInput.focus();
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

  // Spela Rickroll-låten
  function playRickroll() {
    guessedLetters = [];
    wrongGuesses = 0;
    const link = document.createElement("a");
    link.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    link.target = "_blank";
    link.click();
  }

  // Stäng spelet
  function quitGame() {
    hangmanGame.style.display = "none";
  }

  // Lyssna på Enter-tangenttryckning och trigga gissning
  window.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      // Simulera ett klick på gissa-knappen när Enter trycks
      hangmanBtn.click();
    }
  });

  // Klickhändelse på Gissa-knappen
  hangmanBtn.addEventListener("click", function () {
    const inputValue = guessInput.value.trim();
    if (inputValue) {
      checkLetter(inputValue); // Kolla bokstaven
      guessInput.value = ""; // Rensa input-fältet

      // Sätt fokus tillbaka till inputfältet efter varje gissning
      guessInput.focus();
    }
  });

  // Starta spelet om användaren skriver "1337"
  let typedString = "";
  window.addEventListener("keydown", function (event) {
    typedString += event.key; // Lägg till den tryckta tangenten

    // Om strängen blir längre än 4, ta bort det första tecknet för att hålla det till "1337"
    if (typedString.length > 4) {
      typedString = typedString.slice(1);
    }

    // Om användaren skriver "1337", starta spelet
    if (typedString === "1337") {
      startGame();
      typedString = ""; // Återställ strängen
    }
  });

  // Stäng spelet när kryssknappen klickas
  closeBtn.addEventListener("click", function () {
    hangmanGame.style.display = "none"; // Döljer spelet
  });
});
