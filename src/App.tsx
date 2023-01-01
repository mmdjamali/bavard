import { Route , Routes} from "react-router-dom"
import { Auth , CreateProfile } from "./pages"
import { Sidebar } from "./components/layout"
import { useCheckForUser , useAuthStateChange} from "./features/auth/hooks"
import { ProtectedRoute } from "./features/auth"
import { useSelector } from "react-redux"
import { rootType } from "./redux/store"
import Loader from "./components/Loader"
import { 
  Home , Explore , Messages,
  Bookmarks , Profile
} from "./pages"

function App() {
  const {user , profile , pending} = useSelector((state : rootType) => state.AuthSlice)
  useCheckForUser()
  useAuthStateChange()

  if(pending) return(<Loader/>)

  return (
    <>
    <Sidebar/>
    <Routes>
      <Route path="/" element={<ProtectedRoute value={!user} path="/home" ><Auth/></ProtectedRoute>}/>
      <Route path="/create-profile" element={<ProtectedRoute value={!profile && user}><CreateProfile/></ProtectedRoute>}/>
      <Route path="/home" element={<ProtectedRoute value={user && profile}><Home/></ProtectedRoute>}/>
      <Route path="/explore" element={<ProtectedRoute value={user && profile}><Explore/></ProtectedRoute>}/>
      <Route path="/messages" element={<ProtectedRoute value={user && profile}><Messages/></ProtectedRoute>}/>
      <Route path="/bookmarks" element={<ProtectedRoute value={user && profile}><Bookmarks/></ProtectedRoute>}/>
      <Route path="/profile" element={<ProtectedRoute value={user && profile}><Profile/></ProtectedRoute>}/>
    </Routes>
  </>
  )
}

export default App
