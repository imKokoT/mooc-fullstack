
function Part({part}) {
  return(
    <li>
      <p>{part.name} - {part.exercises}</p>
    </li>
  )
}

function StatisticLine({name, value}){
  return (
    <div>
      {name}: {value}
    </div>
  )
}

function Course({course}) {
  const total = course.parts.reduce(
    (a, part) => a += part.exercises,
    0
  )

  return(
    <div>
      <h2>{course.name}</h2>

      <ul>
        {course.parts.map(
          p => <Part key={p.id} part={p}/>
        )}
      </ul>

      <StatisticLine name='Total exercises' value={total} />
    </div>
  )
}

function Courses({courses}) {
  return (
    <div>
      <h1>Course information</h1>

      {courses.map(c => <Course key={c.id} course={c}/>)}
    </div>
  )
}

export default Courses
