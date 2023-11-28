import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connect from "./pages/Connect";
import Home from "./pages/Home";
import Formation from "./pages/Formation";


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Connect />} />
      <Route path="/:id" element={<Formation />} />
      </Routes>
    </BrowserRouter>
      
  )
}

export default App
