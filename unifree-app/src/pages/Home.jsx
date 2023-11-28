import Header from "../components/Header";
import SlideMenu from "../components/SlideMenu";
import getFormations from "../controllers/Formations";


const Home = () => {
  const firstlist = getFormations();
  console.log(firstlist);
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
