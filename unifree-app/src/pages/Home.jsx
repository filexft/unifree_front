import Header from "../components/Header";
import SlideMenu from "../components/SlideMenu";
import getFormations from "../controllers/Formations";


const Home = () => {
  const firstlist = getFormations();
  console.log(firstlist);
  return (
    <div className="w-screen h-screen flex flex-col ">
      <Header />
      <div>
      <SlideMenu title={"Formation intéressantes"} list={ firstlist }></SlideMenu>
      </div>
    </div>
  );
};

export default Home;
