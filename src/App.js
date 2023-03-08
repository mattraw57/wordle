
import './App.css';
import Keyboard from './components/Keyboard';
import Board from './components/Board';
import {createContext, useEffect, useState} from 'react'
import { boardDefault, generateWordSet } from './Words';
import ControlledPopup from './components/ControlledPopup'
import GameOver from "./components/GameOver";


export const AppContext = createContext()

function App() {
  const [open, setOpen] = useState(false);
  const [board, setBoard] = useState(boardDefault)
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0})
  const [wordSet, setWordSet] = useState(new Set())
  const [disabledLetters, setDisabledLetters] = useState(new Set())
  const [correctLetters, setCorrectLetters] = useState(new Set())
  const [almostLetters, setAlmostLetters] = useState(new Set())
  const [correctWord, setCorrectWord] = useState("")
  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false})


  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet)
      setCorrectWord(words.todaysWord)
      console.log(words.todaysWord)
    })
  }, [])

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return;
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal
    setBoard(newBoard)
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos + 1})

  }

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos -1] = ""
    setBoard(newBoard)
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos - 1})
    
  }

  const containsLetterOnce = (word, letter) => {
    let count = 0
    for (let char of word) {
      if (char === letter){
        count = count + 1;
      }
    }

    if (count === 1) return true;
    return false;

  }

  const onEnter = () => {

    if (currAttempt.letterPos !== 5) return

    let currWord = ""
    for (let i=0; i<5; i++){
      currWord += board[currAttempt.attempt][i];
    }


    if (wordSet.has(currWord.toLowerCase())){
      setCurrAttempt({attempt: currAttempt.attempt + 1, letterPos: 0})
    } else {
      alert("Word not found")
    }

    if (currWord === correctWord.toUpperCase()){
      setGameOver({gameOver: true, guessedWord: true})

    }

    if (currAttempt.attempt === 5) {
      setOpen(true)
      setGameOver({gameOver: true, guessedWord: false})
    }


  }

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
        <AppContext.Provider value={{board, setBoard, currAttempt, setCurrAttempt, onSelectLetter, onDelete, onEnter, correctWord, disabledLetters, setDisabledLetters, correctLetters, setCorrectLetters, almostLetters, setAlmostLetters, gameOver, setGameOver, open, setOpen}}>
          <div className="game">  
          
          <Board />
          {gameOver.gameOver ?  <GameOver/> : <Keyboard />}
          <ControlledPopup/>
          </div>
        </AppContext.Provider>
    </div>
  );
}

export default App;
