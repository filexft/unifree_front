import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Search from "./pages/Search";
import UserPage from "./pages/UserPage";
import Formation from "./pages/Formation";
import SignUp from "./pages/SignUP";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/:id" element={<Formation />} />
        <Route path="search/:search" element={<Search />} />
        <Route path="u/:userId" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
