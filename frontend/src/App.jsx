import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Navbar from "./components/Navbar"
import ForgotPassword from "./components/ForgotPassword"
import ChangePassword from "./components/ChangePassword"
import Home from "./pages/Home"
import Problems from "./pages/Problems"
import Problem from "./pages/Problem"

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>

        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password/:token" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/home" element={<Home />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/problem/:id" element={<Problem />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App