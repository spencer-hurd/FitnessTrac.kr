import { useState } from 'react'
import { useImmerReducer } from 'use-immer'
import './App.css'

const initState = {counterValue: 0}

function counterReducer(draft, action) {
  switch (action.type) {
    case "reset":
      return initState
    case "increment":
      draft.counterValue++
      break
    case "decrement":
      return void draft.counterValue--
  }
}

function App() {
  const [state, dispatch] = useImmerReducer(counterReducer, initState)

  return (
    <div className="App">
      <h1>Here's a counter controlled by immer: {state.counterValue}</h1>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </div>
  )
}

export default App
