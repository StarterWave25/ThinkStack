import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ForgotPassword from "./pages/login/components/ForgotPassword";
import ChangePassword from "./components/ChangePassword";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Problems from "./pages/problems/Problems";
import Problem from "./pages/problem/Problem";
import Solution from "./pages/solution/Solution";
import Profile from "./pages/profile/Profile";

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
                    <Route path="/solution/:id" element={<Solution />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
