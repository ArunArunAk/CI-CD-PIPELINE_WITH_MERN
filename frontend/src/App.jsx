import './App.css'
import Home from './components/Home.jsx'
import Landingpage from './components/Landingpage.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';
import './components/Landingpage.css'; // for custom CSS

import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Landingpage />} />

      </Routes>
      
    </>
  )
}

export default App