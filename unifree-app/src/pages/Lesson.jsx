import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import ProgramList from "../components/FormationComponents/ProgramList";
import useFormations from "../controllers/useFormations";
import useFormation from "../controllers/useFormation";
import Quizz from "../components/Quizz";
import NotFound from "./NotFound";
import useLessons from "../controllers/useLessons";
import useQuizzs from "../controllers/useQuizzs";

const Lesson = () => {
  const { formationName, lessonName } = useParams();

  const [currentIndex, setCurrentIndex] = useState(0);

  const lessonLink = lessonName.toLowerCase().replace(/\s+/g, "");

  const formation = useFormation(formationName);

  if (!formation) {
    return <NotFound />;
  }

  const lessons = useLessons(formationName);
  const quizzs = useQuizzs(formationName);

  let LessonsQuizz;
  LessonsQuizz = (Array.isArray(lessons) && Array.isArray(quizzs)) ? [...lessons,...quizzs] : null; 

  
  const lesson = (Array.isArray(LessonsQuizz)) ? LessonsQuizz.filter(
    (lesson) => lesson.title.toLowerCase().replace(/\s+/g, "") === lessonLink
  )[0] : null; 

  var content = "Rien à afficher";
  console.log(lesson)

  const setRead = () => {
    const lessonList = formation[0].lesson;
    console.log(lessonList);
    const currentLesson = lessonList.filter(
      (lesson) => lesson.title.toLowerCase().replace(/\s+/g, "") === lessonLink
    )[0];
    currentLesson.isRead = true;
  }

  if (lesson){
  if (lesson.isQuizz) {
    const currentQuestion = lesson.content.questions[currentIndex];
    const nbQuestion = lesson.content.questions.length -1;

    var suivantBtn = "";
    if (currentIndex <= nbQuestion) {
      suivantBtn = (
        <button 
          className="ml-auto mt-4 py-2 text-white px-5 border rounded-full drop-shadow bg-main-purple hover:bg-purple-800 duration-300"
          onClick={() => {
            setCurrentIndex(currentIndex + 1);
            const submitButton = document.getElementById("Submit");
            submitButton.classList.remove("hidden");
          }}
        >
          Suivant
        </button>
      );
      content = (
        <>
          <Quizz
            title={currentQuestion.title}
            responses={currentQuestion.answers}
          />
          {suivantBtn}
        </>
      );
    }
  }else content = lesson.content; 
  }

  return (
    <>
    { lesson ? 
    <div className="w-screen h-screen flex flex-col overflow-x-hidden">
      <Header />
      <div className="flex flex-col md:flex-row w-screen">
        <div className="md:w-1/3 md:mt-8 p-4">
          <ProgramList formation={formation}></ProgramList>
        </div>
        <div className="flex flex-col w-full p-6 md:p-12">
          <div className="flex flex-row text-xl font-medium">
            <Link to={`/${formationName}`} className="text-[#919191]">
              {formation.title}&nbsp;/&nbsp;
            </Link>
            <div className="text-main-purple">{lesson.title}</div>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="w-[243px] h-[167px] mt-10 mb-10"
              src="/lessonImage.png"
            ></img>
            <div className="p-10 whitespace-pre-line">{content}</div>
            <button
              onClick={setRead}
              className="ml-auto mt-4 py-2 text-white px-5 border rounded-full drop-shadow bg-main-purple hover:bg-purple-800 duration-300"
            >
              Lu
            </button>
          </div>
        </div>
      </div>
    </div>
    : <h1>{JSON.stringify(lesson)}</h1>}
    </>
  );
};

export default Lesson;
