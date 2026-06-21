import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

function Header(props) {
  return(
    <h1>{props.value}</h1>
  )
}

function Part(props) {
  return(
    <li>
      <p>{props.part} - {props.exercises}</p>
    </li>
  )
}

function Content(props) {
  return(
    <ul>
      {props.parts.map(
        // lol why do i must use key with <ul>, why is it not automated?
        p => <Part key={p.part} part={p.part} exercises={p.exercises}/>
      )}
    </ul>
  )
}

function Total(props) {
  const parts = props.parts

  const total = parts.reduce(             // reduce() is impressive!
    (sum, part) => sum + part.exercises,  // (accumulator, currentValue, index, array) => expr
    0                                     // init value
  )

  return(
    <p>
      Total number of exercises {total}
    </p>
  )
}

/* 
  i wish there is no problem if use things not precented in the course
  to complete the exercises, because i have some experience with other
  languages and frameworks. so i want also to do some experiments if 
  they don't took to much time or do things in more efficient way
*/
function App() {
  const courseName = 'Half Stack application development' 
  const parts = [
    {
      part: 'Fundamentals of React',
      exercises: 10
    },
    {
      part: 'Using props to pass data',
      exercises: 7
    },
    {
      part: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header value={courseName}/>
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App
