import React , { Suspense } from "react"
import { Route , Routes} from "react-router-dom"
import { Sidebar , BottomNavbar} from "./components/layout"
import { useCheckForUser , useAuthStateChange} from "./features/auth/hooks"
import { ProtectedRoute , ProtectedAuth } from "./features/auth"
import { useSelector } from "react-redux"
import { rootType } from "./redux/store"
import Loader from "./components/Loader"
import { QueryClientProvider , QueryClient } from 'react-query'
import { NewPostPopup } from "./features/posts"
import LoaderLogo from "./components/LoaderLogo"
import { logout } from "./features/auth/utils"

const Home = React.lazy(() => import("./pages/Home"))
const Auth = React.lazy(() => import("./pages/Auth"))
const Explore = React.lazy(() => import("./pages/Explore"))
const Messages = React.lazy(() => import("./pages/Messages"))
const Profile = React.lazy(() => import("./pages/Profile"))
const CreateProfile = React.lazy(() => import("./pages/CreateProfile"))
const Bookmarks = React.lazy(() => import("./pages/Bookmarks"))

function App() {
  const {user , profile , pending , error} = useSelector((state : rootType) => state.AuthSlice)
  useCheckForUser()
  useAuthStateChange()
  
  if(error) {
    return(<p>Error!!</p>
  )}

  if(pending) return(<LoaderLogo/>)
  
  return (
    <QueryClientProvider client={new QueryClient}>
    <Sidebar/>
    <NewPostPopup/>
    <Suspense fallback={<Loader/>}>
      <Routes>
        <Route path="/" element={<ProtectedRoute value={!user } path="/home" ><Auth/></ProtectedRoute>}/>
        <Route path="/create-profile" element={<ProtectedRoute value={!profile && user}><CreateProfile/></ProtectedRoute>}/>
        <Route path="/home" element={<ProtectedAuth><Home/></ProtectedAuth>}/>
        <Route path="/explore" element={<ProtectedAuth><Explore/></ProtectedAuth>}/>
        <Route path="/explore/:query" element={<ProtectedAuth><Explore/></ProtectedAuth>}/>
        <Route path="/messages" element={<ProtectedAuth><Messages/></ProtectedAuth>}/>
        <Route path="/bookmarks" element={<ProtectedAuth><Bookmarks/></ProtectedAuth>}/>
        <Route path="/profile" element={<ProtectedAuth><Profile/></ProtectedAuth>}/>
      </Routes>
    </Suspense>
    <BottomNavbar/>
  </QueryClientProvider>
  )
}

export default App
