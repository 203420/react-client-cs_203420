import './App.css';
import { BrowserRouter as Router, Route, NavLink, Routes, BrowserRouter } from "react-router-dom";
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Profile from './components/Profile/Profile'

function App() { 
    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login/>}/>
                <Route exact path="/register" element={<Register/>}/>
                <Route exact path="/profile" element={<Profile/>}/>
            </Routes>
        </BrowserRouter>
            
        </>
    )
}

export default App;