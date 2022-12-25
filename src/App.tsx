import { Route , Routes} from "react-router-dom"
import { Auth } from "./pages"
import { useCheckForUser } from "./features/auth/hooks"

import { Provider } from "react-redux";
import store from "./redux/store"

function App() {
  
  useCheckForUser()

  return (
    <Routes>
      <Route path="/" element={<Auth/>}/>
    </Routes>
  )
}

export default App
