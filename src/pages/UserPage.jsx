import { Link, useNavigate } from "react-router-dom";
import NotFound from "./NotFound";
import Footer from "../components/Footer"
import Header from "../components/Header";
import Spinner from "../components/Spinner"
import SlideMenu from "../components/SlideMenu";
//import getFormations from "../controllers/Formations";
//import getUsers from "../controllers/Users";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import useFollowedFormations from "../controllers/useFollowedFormations";
import useCreatedFormations from "../controllers/useCreatedFormations";
import useLikedFormations from "../controllers/useLikedFormations";
import { useEffect, useState } from "react";
import { storage,Url} from "../firebase";
import { getDownloadURL, ref , uploadBytes} from "firebase/storage";
import {v4} from "uuid";
import useProfileImage from "../controllers/useProfileImage";
import BackRoutes from "../RoutesInterface";

const UserPage = () => {
  const user = Cookies.get("token") ? jwtDecode(Cookies.get("token")) : null;
  if (!user) {
    return <NotFound />;
  }
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [DataImage,setDataImage] = useState();
  const CurrentProfile = useProfileImage(user.Id);
  const [ProfileImage,setProfileImage] = useState(CurrentProfile)

  useEffect(() => {
    setProfileImage(CurrentProfile)
  },[CurrentProfile])

  const handleImage = async() => {
    setLoading(true);
    if (!DataImage && (ProfileImage instanceof String)) return;
    const imageRef = ref(storage,`images/${DataImage.name + v4()}`);
    uploadBytes(imageRef,DataImage).then(async() => {
      const url = await getDownloadURL(imageRef);
      // Ajouter le fetch
      let res = await fetch(BackRoutes.SpecificUser+user.Id,{
        method:"PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({ProfileImage: url})})
      res = await res.json();
      if (res.Statut == 0){
        throw new Error("Requete echouée")
      }
      setProfileImage(url);

    })
    .then(() => alert("reussi"))
    .catch(e => alert(e))
    .finally(() => setLoading(false))
  }

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
    <>
    { loading ? <Spinner/> :
    <div className="w-full h-screen flex flex-col">
      
      <Header />
      <div className="p-5">
        
      <input type="file" name="file" onChange={(e) => setDataImage(e.target.files[0])}/>
      <button onClick={handleImage}>submit</button>
        <div className="flex flex-row border rounded-[18px] border-solid border-[#C7C7C7] p-16 gap-8">
          <img
            className="w-44 h-44 object-cover rounded-full"
            src={ProfileImage}
            alt="Profile Image"
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
      
      <Footer></Footer>
    </div>
  }
    </>
  );
};

export default UserPage;
