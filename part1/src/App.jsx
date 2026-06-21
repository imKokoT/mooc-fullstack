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

// i would prefer old syntax of a function definition
// because this recent React version changed its style
// back to older style
function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      <Header value={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
