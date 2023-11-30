import Header from "../components/Header";
import FormationInfo from "../components/FormationComponents/FormationInfo";
import ProgramList from "../components/FormationComponents/ProgramList";
import getFormations from "../controllers/Formations";
import { useParams } from "react-router-dom";

const Formation = () => {
  const { id } = useParams();
  const firstList = getFormations();
  const formation = firstList.filter((formation) => formation.id === id);
  return (
    <div className="w-screen h-screen flex flex-col ">
      <Header />
      <div className="flex flex-row w-screen">
        <FormationInfo formation={formation[0]}></FormationInfo>
        <ProgramList formation={formation[0]}></ProgramList>
      </div>
    </div>
  );
};

export default Formation;
