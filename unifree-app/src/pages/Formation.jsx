import Header from "../components/Header";
import FormationInfo from "../components/FormationComponents/FormationInfo";
import ProgramList from "../components/FormationComponents/ProgramList";
import useFormation from "../controllers/useFormation";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";

const Formation = () => {
  const { id } = useParams();
  const formation = useFormation(parseInt(id));

  if (!formation) {
    return <NotFound />;
  }
  return (
    <div className="w-full h-full flex flex-col ">
      <Header />
      <div className="flex flex-row w-full">
        <FormationInfo formation={formation}></FormationInfo>
        <div className="w-full p-4">
          <ProgramList formation={formation}></ProgramList>
        </div>
      </div>
    </div>
  );
};

export default Formation;
