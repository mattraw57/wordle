import React, {useContext, useEffect} from 'react';
import {AppContext} from "../App"

function Letter({letterPos, attemptVal}) {
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


  const {board, correctWord, currAttempt, setDisabledLetters, setCorrectLetters, correctLetters, setAlmostLetters, almostLetters} = useContext(AppContext)
  const letter = board[attemptVal][letterPos]

  const correct = correctWord.toUpperCase()[letterPos] === letter
  const almost = !correct && letter !== "" && correctWord.toUpperCase().includes(letter) && !(containsLetterOnce(correctWord.toUpperCase(), letter) && correctLetters.has(letter))

  const letterState = currAttempt.attempt > attemptVal && 
  (correct ? "correct" : almost ? "almost" : "error")

  useEffect(() => {
    if (letter !== "" && !almost && correct){
      setCorrectLetters((prev) => new Set(prev.add(letter)))
    }
    if (letter !== "" && !correct && !almost){
      setDisabledLetters((prev) => new Set(prev.add(letter))
  
      )
    }

    if (almost){
      setAlmostLetters((prev) => new Set(prev.add(letter)))
      // correctLetters.forEach(element => {
      //   console.log('test')
      //   if (containsLetterOnce(correctWord, element)){
      //     setAlmostLetters(prev => new Set([...prev].filter(x => x !== element)))
      //     console.log(almostLetters)
      //   }
      // });
    }



  }, [currAttempt.attempt])


  return (
    <div className="letter" id={letterState}>{letter}</div>
  )
}

export default Letter