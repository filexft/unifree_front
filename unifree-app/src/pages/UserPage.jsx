import { Link, useNavigate } from "react-router-dom";
import NotFound from "./NotFound";

import Header from "../components/Header";
import SlideMenu from "../components/SlideMenu";
//import getFormations from "../controllers/Formations";
//import getUsers from "../controllers/Users";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import useFollowedFormations from "../controllers/useFollowedFormations";
import useCreatedFormations from "../controllers/useCreatedFormations";
import useLikedFormations from "../controllers/useLikedFormations";

const UserPage = () => {
  const navigate = useNavigate();

  function removeDuplicates(arr) {
    let unique = []
    arr.forEach(element => {
      if (!unique.find(Formation => Formation.id === element.id)){
        unique.push(element)
      }
    })
    return unique;
}
  //const { id } = useParams();
  //const formationList = getFormations();
  //const userList = getUsers();
  // Recuperation des formations des Users
  const user = Cookies.get("token") ? jwtDecode(Cookies.get("token")) : null;

  user.icon =
    "https://colab.research.google.com/drive/1uLmBBuaY65hcPZbb7OkS6Dqy6SzGb21J";
  if (!user) {
    return <NotFound />;
  }

  const FollowedFormations= useFollowedFormations(user.Id);
  const CreatedFormations = useCreatedFormations(user.Id);
  const LikedFormationsHook= useLikedFormations(user.Id);


  const LikedFormations = (Array.isArray(LikedFormationsHook)) ? removeDuplicates(LikedFormationsHook): null

  const etudiantView = (
    <>
      {Array.isArray(FollowedFormations) && Array.isArray(LikedFormations) ? (
        <>
          <SlideMenu
            title={"Formations suivies"}
            list={FollowedFormations}
          ></SlideMenu>
          <SlideMenu
            title={"Formations likées"}
            list={LikedFormations}
          ></SlideMenu>
        </>
      ) : (
        <p>...</p>
      )}
    </>
  );
  const professeurView = (
    <div className="flex flex-col ">
      <div className="pl-5 mt-5">
        <Link
          to="/edit-formation"
          className="inline-block px-6 py-2 border-2 border-main-purple font-semibold text-main-purple rounded hover:bg-main-purple hover:text-white duration-300"
        >
          Créer une formation
        </Link>
      </div>
      {Array.isArray(FollowedFormations) &&
      Array.isArray(LikedFormations) &&
      Array.isArray(CreatedFormations) ? (
        <>
          <SlideMenu
            title={"Formations suivies"}
            list={FollowedFormations}
          ></SlideMenu>
          <SlideMenu
            title={"Formations likées"}
            list={LikedFormations}
          ></SlideMenu>
          <SlideMenu
            title={"Formations publiées"}
            list={CreatedFormations}
          ></SlideMenu>
        </>
      ) : (
        <p>...</p>
      )}
    </div>
  );

  const View = <>{user.Role === "STUDENT" ? etudiantView : professeurView}</>;
  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="p-5">
        <div className="flex flex-row border rounded-[18px] border-solid border-[#C7C7C7] p-16 gap-8">
          <img
            className="w-44 h-44 object-cover rounded-full"
            src="/default_pp.png"
          ></img>
          <div className="flex flex-col gap-7 justify-center">
            <div className="text-2xl font-semibold text-main-purple">
              {user.Nom + " " + user.Prenom}
            </div>
            <div className="text-md">{(user.Role === "STUDENT") ? "Etudiant" : "Professeur"}</div>
            <button
              className="flex items-center px-6 py-2 border-2 border-red-600 font-semibold text-red-600 rounded-[18px] hover:bg-red-600 hover:text-white duration-300"
              onClick={() => {
                Cookies.remove("token");
                navigate("/login");
              }}
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
      {View}
    </div>
  );
};

export default UserPage;
