import { useContext } from "react"
import AppContext from "../contexts/AppContext"
import { Link } from "react-router-dom"
import { List, ListItemButton, ListItemText} from "@mui/material"


function Home() {
  const { blogs } = useContext(AppContext)

  const displayedBlogs = blogs.sort((a,b) => b.likes - a.likes)

  return (
    <div>
      <h2>Blogs List</h2>
      <List sx={{
        listStyleType: 'disc',
        pl: 2
      }}>
        {displayedBlogs.map(blog =>
          <ListItemButton sx={{
              display: 'list-item',
              py: 0.5, px: 0.4
            }}
            key={blog.id} component={Link} to={`/blogs/${blog.id}`
          }>
            <ListItemText primary={blog.title} secondary={`By ${blog.owner.username}`}/>
          </ListItemButton>
        )}
      </List>
    </div>
  )
}

export default Home
