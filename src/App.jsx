import { BrowserRouter, Route, Routes } from "react-router-dom"
import NavBar from "./NavBar"
import Body from "./Body"
import Login from "./Login"
import Profile from "./Profile"

function App() {


  return (
    <>

    <BrowserRouter basename="/">
    <Routes>
        <Route path="/" element={<Body/>}>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Route>
    </Routes>
    </BrowserRouter>
     <h1 className="font-bold">Hello world</h1>
    </>
  )
}

export default App
