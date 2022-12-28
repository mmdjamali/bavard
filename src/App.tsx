import { Route , Routes} from "react-router-dom"
import { Auth , CreateProfile } from "./pages"
import { Sidebar } from "./components/layout"
import { useCheckForUser , useAuthStateChange} from "./features/auth/hooks"
import { ProtectedRoute } from "./features/auth"
import { useSelector } from "react-redux"
import { rootType } from "./redux/store"

function App() {
  const {user , profile} = useSelector((state : rootType) => state.AuthSlice)
  useCheckForUser()
  useAuthStateChange()

  return (
    <>
    <Sidebar/>
    <Routes>
      <Route path="/" element={<ProtectedRoute value={!user} path="/home" ><Auth/></ProtectedRoute>}/>
      <Route path="/create-profile" element={<ProtectedRoute value={!profile && user}><CreateProfile/></ProtectedRoute>}/>
      <Route path="/home" element={<p>Home</p>}/>
    </Routes>
  </>
  )
}

export default App
