import { useContext } from "react"
import AppContext from "../contexts/AppContext"
import { Link } from "react-router-dom"


function Home() {
  const { blogs } = useContext(AppContext)

  const displayedBlogs = blogs.sort((a,b) => b.likes - a.likes)

  return (
    <div>
      <h2>Blogs List</h2>
      <ul>
        {displayedBlogs.map(blog =>
          <li key={blog.id}><Link to={`/blogs/${blog.id}`}>
            {`${blog.title} By ${blog.owner.username}`}
          </Link></li>
        )}
      </ul>
    </div>
  )
}

export default Home
