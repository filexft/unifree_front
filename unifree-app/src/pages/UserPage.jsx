import Header from "../components/Header";

import { useParams } from "react-router-dom";

import getUsers from "../controllers/Users";
import SlideMenu from "../components/SlideMenu";
import getFormations from "../controllers/Formations";


const UserPage = () => {
  const { id } = useParams();
  const formationList = getFormations();
  const userList = getUsers();
  const user = userList.filter((user) => user.id === id)[0];
  console.log(user.type);
  
  const etudiantView = (
    <>
      <SlideMenu title={"Formations suivies"} list={formationList}></SlideMenu>
      <SlideMenu title={"Formations likées"} list={formationList}></SlideMenu>
    </>
  );
  const professeurView = (
    <>
      <SlideMenu title={"Formations publiées"} list={formationList}></SlideMenu>
      <SlideMenu
        title={"Formations en cours de création"}
        list={formationList}
      ></SlideMenu>
    </>
  );

  const View = <>{user.type === "Étudiant" ? etudiantView : professeurView}</>;
  return (
    <div className="w-screen h-screen flex flex-col">
      <Header />
      <div className="flex flex-row border rounded-[18px] border-solid border-[#C7C7C7] p-16 gap-8">
        <img
          className="w-44 h-44 object-cover rounded-full"
          src={user.icon}
        ></img>
        <div className="flex flex-col gap-7 justify-center">
          <div className="text-2xl font-semibold text-main-purple">
            {user.username}
          </div>
          <div className="text-md">{user.type}</div>
          <button className="flex items-center px-6 py-2 border-2 border-red-600 font-semibold text-red-600 rounded-[18px] hover:bg-red-600 hover:text-white duration-300">
            Se déconnecter
          </button>
        </div>
      </div>
      { View }
    </div>
  );
};

export default UserPage;
