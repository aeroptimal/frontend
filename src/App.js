import Index from './components/index.jsx'
import Mesh from './components/mesh.jsx'
import Airfoil from './components/airfoil.jsx'
import Battery from './components/battery.jsx'
import Login from './components/login.jsx'
import User from './components/user.jsx'
import Reset from './components/reset.jsx'
import Contact from './components/contact.jsx'
import Activate from './components/activate.jsx'

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index/>}/>
        <Route path="/mesh" element={<Mesh/>}/>
        <Route path="/airfoil" element={<Airfoil/>}/>
        <Route path="/battery" element={<Battery/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/user" element={<User/>}/>
        <Route path="/reset" element={<Reset/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/activate" element={<Activate/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
