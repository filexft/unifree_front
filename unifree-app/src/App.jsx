import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connect from "./pages/Connect";
import Home from "./pages/Home";


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Connect />} />
        
      </Routes>
    </BrowserRouter>
      
  )
}

export default App
