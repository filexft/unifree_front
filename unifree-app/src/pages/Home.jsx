import Header from "../components/Header";
import SlideMenu from "../components/SlideMenu";
import useFormations from "../controllers/useFormations";
import BackRoutes from "../RoutesInterface";


const Home = () => {
  const firstlist = useFormations();// On remplace par un hoot
  return (
    <div className="w-screen h-screen flex flex-col overflow-x-hidden">
      <Header />
      <div>
      <SlideMenu title={"De la catégorie informatique"} list={ firstlist }></SlideMenu>
      <SlideMenu title={"Formations les plus suivies"} list={ firstlist }></SlideMenu>
      <SlideMenu title={"Qui pourrait vous plaire"} list={ firstlist }></SlideMenu>
      </div>
    </div>
  );
};

export default Home;
