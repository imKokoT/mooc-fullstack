import { useContext } from "react"
import AppContext from "../contexts/AppContext"
import Blog from "../components/Blog"


function Home() {
  const { blogs } = useContext(AppContext)

  const displayedBlogs = blogs.sort((a,b) => b.likes - a.likes)

  return (
    <div>
      <h2>Blogs List</h2>
      {displayedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default Home
