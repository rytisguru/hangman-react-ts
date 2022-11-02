import styles from "./Keyboard.module.css"

const KEYS = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
]

type KeyboardProps = {
    activeLetters: string[]
    inActiveLetters: string[]
    addLetters: (letter: string) => void
    gameEnded: boolean
}

export function Keyboard({ activeLetters, inActiveLetters, addLetters, gameEnded=false }: KeyboardProps) {
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
            gap: ".5rem"
        }}>
            {KEYS.map((key) => {
                const isActive = activeLetters.includes(key)
                const isInActive = inActiveLetters.includes(key)
                return (
                    <button
                        key={key}
                        disabled={isActive || isInActive || gameEnded}
                        onClick={() => addLetters(key)}
                        className={`
                            ${styles.btn}
                            ${isActive ? `${styles.active}` : null}
                            ${isInActive ? `${styles.inactive}` : null}
                        `}
                    >{key}</button>
                )
            })}
        </div>
    )
}