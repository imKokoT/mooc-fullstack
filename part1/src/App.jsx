import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

function Header({value}) {
  return (
    <h1>{value}</h1>
  )
}

function StatisticRow({name, value}){
  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  )
}

function Statistics({good, neutral, bad}) {
  const total = good + neutral + bad
  const average = (good-bad) / total
  const positive = 100/total * good

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
      
      <table>
        <tbody>
          <StatisticRow name='good' value={good} />
          <StatisticRow name='neutral' value={neutral} />
          <StatisticRow name='bad' value={bad} />

          <StatisticRow name='Total' value={total} />
          <StatisticRow name='Average' value={average} />
          <StatisticRow name='Positive' value={positive} />
        </tbody>
      </table>
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
