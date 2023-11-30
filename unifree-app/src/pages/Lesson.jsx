import Header from "../components/Header";
import ProgramList from "../components/FormationComponents/ProgramList";
import getFormations from "../controllers/Formations";
import { useParams } from "react-router-dom";

const Lesson = () => {
  const { formationName, lessonName } = useParams();
  console.log(lessonName);
  const lessonLink = lessonName.toLowerCase().replace(/\s+/g, '');
  const firstList = getFormations();
  const formation = firstList.filter(
    (formation) => formation.id === formationName
  );

  const lessons = formation[0].lesson;
  const lesson = lessons.filter((lesson) => lesson.title === lessonLink);
  // console.log(lessons);
  // console.log(formation[0].lesson[0].title);
  return (
    <div className="w-screen h-screen flex flex-col ">
      <Header />
      <div className="flex flex-row w-screen">
        <ProgramList formation={formation[0]}></ProgramList>
        {lesson}
      </div>
    </div>
  );
};

export default Lesson;
