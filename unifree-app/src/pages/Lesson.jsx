import Header from "../components/Header";
import ProgramList from "../components/FormationComponents/ProgramList";
import getFormations from "../controllers/Formations";
import { Link, useParams } from "react-router-dom";

const Lesson = () => {
  const { formationName, lessonName } = useParams();

  const lessonLink = lessonName.toLowerCase().replace(/\s+/g, "");

  const firstList = getFormations();
  const formation = firstList.filter(
    (formation) => formation.id === formationName
  );

  const lessons = formation[0].lesson;
  const lesson = lessons.filter(
    (lesson) => lesson.title.toLowerCase().replace(/\s+/g, "") === lessonLink
  )[0];
  return (
    <div className="w-screen h-screen flex flex-col ">
      <Header />
      <div className="flex flex-col md:flex-row w-screen">
        <div className="md:w-1/3 md:mt-8">
          <ProgramList formation={formation[0]}></ProgramList>
        </div>
        <div className="flex flex-col w-full p-6 md:p-12">
          <div className="flex flex-row text-xl font-medium">
            <Link to={`/${formationName}`} className="text-[#919191]">
              {formation[0].title}&nbsp;/&nbsp;
            </Link>
            <div className="text-main-purple">{lesson.title}</div>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="w-[243px] h-[167px] mt-10 mb-10"
              src="/lessonImage.png"
            ></img>
            <div className="font-normal p-10 text-xl whitespace-pre-line">
              {lesson.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson;
