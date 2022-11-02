import { useCallback, useEffect, useState } from 'react';
import { HangmanDrawing } from './components/HangmanDrawing';
import { HangmanWord } from './components/HangmanWord';
import { Keyboard } from './components/Keyboard';
import words from './wordList.json';

function App() {
  const getWord = () => {
    return words[Math.floor(Math.random() * words.length)]
  }
  const [wordToGuess, setWordToGuess] = useState(getWord)
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const inCorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))
  
  const isLoser = inCorrectLetters.length >= 6
  const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter))
  const gameEnded = isLoser || isWinner

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;

      setGuessedLetters(currentLetters => [...currentLetters, letter])
    }, [guessedLetters]
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    }
    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [guessedLetters])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (key !== "Enter") return;

      e.preventDefault();
      setWordToGuess(getWord)
      setGuessedLetters([])
    }
    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [guessedLetters])

  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center"
      }}
    >
      <div style={{ fontSize: "2rem", textAlign: "center" }}>
        {isLoser && (<span>You lost, refresh the page</span>)}
        {isWinner && (<span>You won, congrats!</span>)}
      </div>
      <HangmanDrawing numberOfGuesses={inCorrectLetters.length} />
      <HangmanWord gameEnded={gameEnded} guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard 
          activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))} 
          inActiveLetters={inCorrectLetters}
          addLetters={addGuessedLetter}
          gameEnded={gameEnded}
        />
      </div>
    </div>
  )
}

export default App
