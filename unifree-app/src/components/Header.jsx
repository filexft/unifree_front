import Cookies from "js-cookie";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${search}`);
  };
  const isConnect = (Cookies.get('token')) ? true : false;

  const userId = (Cookies.get('token')) ? "Oe": "nan";

  const connectButton = (
    <Link
      to={"/login"}
      className="flex items-center px-6 py-2 border-2 border-main-purple font-semibold text-main-purple rounded hover:bg-main-purple hover:text-white duration-300"
    >
      S&apos;inscrire/Se connecter
    </Link>
  );

  const profileButton = (
    <Link
      to={"/u/" + userId}
      className="flex items-center px-6 py-2 border-2 border-main-purple font-semibold text-main-purple rounded hover:bg-main-purple hover:text-white duration-300"
    >
      My Profile
    </Link>
  );

  const rightButton = isConnect === true ? profileButton : connectButton;

  return (
    <header className="flex h-20 items-center justify-between px-4 py-3 bg-white shadow-md w-full">
      <Link to={"/"} className="flex items-center">
        <img src="/logoname.png" alt="Logo" className="w-20 mr-2" />
      </Link>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Chercher un cours..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-6 py-2 text-white bg-purple-600 rounded-full hover:bg-purple-700 ml-4"
        >
          Search
        </button>
      </form>
      {rightButton}
    </header>
  );
};

export default Header;
