import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connect from "./pages/Connect";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Connect />} />
        
      </Routes>
    </BrowserRouter>
      
  )
}

export default App
