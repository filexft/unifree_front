import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connect from "./pages/Connect";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Formation from "./pages/Formation";
import SignUp from "./pages/SignUP";


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Connect />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/:id" element={<Formation />} />
      <Route path="search/:search" element={<Search />} />
      </Routes>
    </BrowserRouter>
      
  )
}

export default App
