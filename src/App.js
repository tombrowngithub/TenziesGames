import React from 'react';
import './style.css'
import Die from "./component/Die";
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'


export default function App() {
    const [numbers, setNumber] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(() => {
        const allHeldDice = numbers.every(die => die.isHeld)
        const firstValue = numbers[0].value
        const allSameValue = numbers.every(die => die.value === firstValue)
        if (allHeldDice && allSameValue) {
            setTenzies(true)
            console.log("you won!!")
        } else {
            generateNewDie()
        }
    }, [numbers])

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    const numberElement = numbers.map(mapItem => (
        <Die key={mapItem.id}
             value={mapItem.value}
             isHeld={mapItem.isHeld}
             holdDice={() => holdDice(mapItem.id)}

        />

    ))

    function rollDice() {
        if (!tenzies) {
            setNumber(oldDice => oldDice.map(die => {
                if (die.isHeld) {
                    return die
                }
                return generateNewDie()
            }))
        }else{
            setTenzies(false)
            setNumber(allNewDice)
        }
    }

    function holdDice(id) {
        setNumber(oldDice => oldDice.map(die => {
            return die.id === id ?
                {...die, isHeld: !die.isHeld} : die
        }))

    }

    return (
        <main>
            {tenzies && <Confetti/>}
            <h1 className="title">Tenzies</h1>
            <p className="instruction">Roll until all dice are the same. Click each die to freeze it as its current
                value between rolls.</p>
            <div className="dice-container">
                {numberElement}
            </div>
            <button
                className="roll-dice"
                onClick={rollDice}>
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}

