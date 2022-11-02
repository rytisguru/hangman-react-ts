type HangmanWordProps = {
    guessedLetters: string[],
    wordToGuess: String,
    gameEnded?: boolean
}

export function HangmanWord({ guessedLetters, wordToGuess, gameEnded=false }: HangmanWordProps) {
    return (
        <div style={{ 
            display: "flex", 
            gap: ".25em", 
            fontSize: "6rem", 
            fontWeight: "bold", 
            textTransform: "uppercase", 
            fontFamily: "monospace",
            textAlign: "center" 
        }}>
            {wordToGuess.split("").map((letter, index) => (
                <span style={{ borderBottom: "0.1em solid black" }} key={index}>
                    <span 
                        style={{ 
                            visibility: guessedLetters.includes(letter) || gameEnded ? "visible" : "hidden", 
                            color: !guessedLetters.includes(letter) ? "red" : "black"
                        }}
                    >
                        {letter}
                    </span>
                </span>
            ))}
        </div>
    )
}