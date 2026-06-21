import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

// passing params by props arg
function Test(props) {
  return (
    <div>
      <p color='blue'>Testing text from the Test component</p>
      <p>{props.note}</p>
    </div>
  )
}

// JSX looks so similar to Jinja but with its stranges
function App() {
  const [count, setCount] = useState(0) // some magic here lets count updates
  const testingList = [1,2,3,4,5]

  const a = 10
  const b = 20
  
  return (
    <div>
      <h1>Hello World</h1>

      {/*
        rendering of the object not valid, because React accepts base type only.
        However, it's possible to render lists
      */}
      <p>{testingList}</p>

      <hr />
  
      <p>
        {a} + {b} = {a + b}
      </p>
      
      <hr />

      {/* We can define own components */}
      <Test note='note 1' />
      <Test note='note 2'/>
      <Test note='note 3'/>

      <hr />
      {/* cool clicker from example app '-'d */}
      <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
    </div>
  )
}

// important stuff
export default App
