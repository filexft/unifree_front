import { useState } from "react";
import logo from "../assets/whitelogo.png";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'


const SignUp = () => {

  const [user, setUser] = useState({
    Nom : "",
    Prenom : "",
    Email : "",
    Password: "",
    passVerif :"",
  })
  const [inputError, setInputError] = useState(false);
  
  const navigate = useNavigate();
  
  const SubmitCheck =  (e) => {
    e.preventDefault();
    
    if (user.Password !== user.passVerif) {
      setInputError(true);
      setTimeout(() => setInputError(false), 3000);
      return;
    }
    setUser({...user, passVerif : ""});
    delete user.passVerif;

    //sign up
    console.log("singing up", user);
    fetchData();
  };

  const fetchData = () => {

    

    fetch("https://unifree.onrender.com/users/signup", 
      {
        method : "POST",
        headers: {
                  "Content-Type": "application/json",
                },
        body: JSON.stringify(user),
      }
      )
    .then((res) => res.json())
    .then((datares) => {
      console.log(datares)
      //console.log(datares.Statut.JwtToken)

      if(datares.Statut.user){
        Cookies.set('token',datares.Statut.JwtToken);
        console.log(datares.Statut.user, ' : ' , datares.Statut.JwtToken)
 
        navigate('/');
      }else{
        throw new Error(datares.Statut.Message); 
      }
    })
    .catch((e) => {
      setInputError(true)
      console.log(e)
    }).finally(() => {
      setInputError(false);
    })
  } 

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
        <form className="mt-7 flex flex-col gap-2" onSubmit={SubmitCheck}>
          {
            inputError == true ?(<p className="bg-red-200 rounded-md p-4">l'email / mot de passe sont  incorrect !</p>): null
          }
          
          <input
            type="text"
            className="bg-transparent px-3 py-2 border-b border-b-secondary-grey focus:outline-none focus:border-b-slate-500"
            placeholder="Nom"
            onChange={(e) => setUser({...user, Nom : e.target.value})}
            value={user.Nom}
          />
          <input
            type="text"
            className="bg-transparent px-3 py-2 border-b border-b-secondary-grey focus:outline-none focus:border-b-slate-500"
            placeholder="Prenom"
            onChange={(e) => setUser({...user, Prenom : e.target.value})}
            value={user.Prenom}
          />
          <input
            type="email"
            className="bg-transparent px-3 py-2 border-b border-b-secondary-grey focus:outline-none focus:border-b-slate-500"
            placeholder="Email"
            onChange={(e) => setUser({...user, Email : e.target.value})}
            value={user.Email}
            required
            autoComplete=""
          />
          <input
            type="password"
            name="password"
            className="bg-transparent px-3 py-2 border-b border-b-secondary-grey focus:outline-none focus:border-b-slate-500"
            placeholder="Mot de passe"
            onChange={(e) => setUser({...user, Password : e.target.value})}
            value={user.Password}
            minLength={6}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            className="bg-transparent px-3 py-2 border-b border-b-secondary-grey focus:outline-none focus:border-b-slate-500"
            placeholder="Confirmer mot de passe" 
            onChange={(e) => setUser({...user, passVerif : e.target.value})}
            value={user.passVerif}
            required
            />
            
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
