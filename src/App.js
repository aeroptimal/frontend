import Index from './components/index.jsx'
import Mesh from './components/mesh.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index/>}/>
        <Route path="/mesh" element={<Mesh/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
