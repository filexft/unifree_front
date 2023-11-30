import logo from "../assets/whitelogo.png";
import { Link } from "react-router-dom";
const SignUp = () => {
  return (
    <div className="w-screen h-screen flex flex-row ">
      <div className="basis-1/2 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          <Link className="font-semibold text-secondary-grey border-b-2 px-5 py-1 border-b-secondary-grey" to="/login">
            Se connecter
          </Link>
          <Link className="font-semibold text-main-purple border-b-2 px-5 py-1 border-b-main-purple">
            S&apos;inscrire
          </Link>
        </div>
        <form className="mt-7 flex flex-col gap-2">
          <input
            type="text"
            className="bg-transparent px-3 py-2 border-b border-b-secondary-grey focus:outline-none focus:border-b-slate-500"
            placeholder="Pseudo"
          />
          <input
            type="email"
            className="bg-transparent px-3 py-2 border-b border-b-secondary-grey focus:outline-none focus:border-b-slate-500"
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            className="bg-transparent px-3 py-2 border-b border-b-secondary-grey focus:outline-none focus:border-b-slate-500"
            placeholder="Mot de passe"
          />
          <input
            type="password"
            name="confirmPassword"
            className="bg-transparent px-3 py-2 border-b border-b-secondary-grey focus:outline-none focus:border-b-slate-500"
            placeholder="Confirmer mot de passe" />
          <button
            type="submit"
            className="font-semibold bg-main-purple mt-7 rounded hover:bg-purple-900 text-white p-3"
          >
            S&apos;inscrire
          </button>
        </form>
      </div>
      <div className=" w-full basis-1/2 bg-main-purple flex items-center justify-center">
      <Link to={"/"} className="w-1/2"><img src={logo} className="w-full" /></Link>
      </div>
    </div>
  );
};

export default SignUp;