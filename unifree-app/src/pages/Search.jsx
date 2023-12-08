import Header from "../components/Header";
import SearchList from "../components/SearchList";
import useFormations from "../controllers/useFormations";


const Home = () => {
  const firstlist = useFormations();
  return (
    <div className="w-screen h-screen flex flex-col overflow-x-hidden">
      <Header />
      <div>
      <SearchList title={"De la catégorie informatique"} list={ firstlist }></SearchList>
      </div>
    </div>
  );
};

export default Home;
