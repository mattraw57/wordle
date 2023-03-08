import React, {useCallback, useContext, useEffect} from 'react'
import { AppContext } from "../App"
import Key from "./Key"

function Keyboard() {
  const {onEnter, onDelete, onSelectLetter, disabledLetters, correctLetters, almostLetters} = useContext(AppContext)


  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"]

  const handleKeyboard = useCallback((event) => {
    if (event.key === "Enter"){
      onEnter();
    } else if (event.key === "Backspace"){
      onDelete()

    } else if (keys1.concat(keys2, keys3).includes(event.key.toUpperCase())){
      onSelectLetter(event.key.toUpperCase())
    
    }

  })

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard)
    return () => {
      document.removeEventListener("keydown", handleKeyboard)
    }

  }, [handleKeyboard])

  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      <div className="line1">{keys1.map((key) => {
        return <Key keyVal={key} disabled={disabledLetters.has(key)} correct={correctLetters.has(key)} almost={almostLetters.has(key)} />
      })}</div>
      <div className="line2">{keys2.map((key) => {
        return <Key keyVal={key} disabled={disabledLetters.has(key)} correct={correctLetters.has(key)} almost={almostLetters.has(key)}/>
      })}
      </div>
      <div className="line3">
        <Key keyVal={"ENTER"} bigKey />
        {keys3.map((key) => {
        return <Key keyVal={key} disabled={disabledLetters.has(key)} correct={correctLetters.has(key)} almost={almostLetters.has(key)} />
      })}
        <Key keyVal={"DELETE"} bigKey />
    
      </div>

    </div>
  )
}

export default Keyboard