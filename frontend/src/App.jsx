import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard.jsx"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Authenticated from "./components/Auth/Authenticated.jsx";
import Loader from "./components/Loader.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  const user=useSelector(state=>state.user.value)
  

  return (
    <div className="overflow-hidden bg-slate-500">
      <Router>
        <Authenticated>
          <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route element={NotFound} />
            </Routes>  
        </Authenticated>
      </Router>
    </div>
  )
}

export default App
