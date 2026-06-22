import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

function Header({value}) {
  return (
    <h1>{value}</h1>
  )
}

function StatisticLine({name, value}){
  return (
    <div>
      {name}: {value}
    </div>
  )
}

function Statistics({good, neutral, bad}) {
  const total = good + neutral + bad

  if (total == 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Statistics</h2>
      
      <ul>
        <li><StatisticLine name='good' value={good}/></li>
        <li><StatisticLine name='neutral' value={neutral}/></li>
        <li><StatisticLine name='bad' value={bad}/></li>
      </ul>
        <StatisticLine name='Total' value={total} />
        <StatisticLine name='Average' value={(good-bad) / total} />
        <StatisticLine name='Positive' value={100/total * good + '%'} />
    </div>
  )
}

function Button({text, onClick}) {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

// i would prefer old syntax of a function definition
// because this recent React version changed its style
// back to older style
function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good+1)
  const handleNeutral = () => setNeutral(neutral+1)
  const handleBad = () => setBad(bad+1)

  return (
    <div>
      <Header value='Give your feedback!'/>

      <div>
        <Button text='good' onClick={handleGood} />
        <Button text='neutral' onClick={handleNeutral} />
        <Button text='bad' onClick={handleBad} />
      </div>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
