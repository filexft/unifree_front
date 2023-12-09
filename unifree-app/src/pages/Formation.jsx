import Header from "../components/Header";
import FormationInfo from "../components/FormationComponents/FormationInfo";
import ProgramList from "../components/FormationComponents/ProgramList";
import useFormations from "../controllers/useFormations";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";

const Formation = () => {
  const { id } = useParams();
  const firstList = useFormations();
  const formation = firstList.filter((formation) => formation.id === id);
  if (!formation[0]) {
    return <NotFound />;
  }
  return (
    <div className="w-full h-full flex flex-col ">
      <Header />
      <div className="flex flex-row w-full">
        <FormationInfo formation={formation[0]}></FormationInfo>
        <div className="w-full p-4">
          <ProgramList formation={formation[0]}></ProgramList>
        </div>
      </div>
    </div>
  );
};

export default Formation;
