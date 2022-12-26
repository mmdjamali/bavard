import { Route , Routes} from "react-router-dom"
import { Auth , CreateProfile } from "./pages"
import { useCheckForUser , useAuthStateChange} from "./features/auth/hooks"
import { ProtectedRoute } from "./features/auth"
import { useSelector } from "react-redux"
import { rootType } from "./redux/store"

function App() {
  const {user , profile} = useSelector((state : rootType) => state.AuthSlice)
  useCheckForUser()
  useAuthStateChange()

  return (
    <Routes>
      <Route path="/" element={<Auth/>}/>
      <Route path="/create-profile" element={<ProtectedRoute value={!profile && user}><CreateProfile/></ProtectedRoute>}/>
    </Routes>
  )
}

export default App
