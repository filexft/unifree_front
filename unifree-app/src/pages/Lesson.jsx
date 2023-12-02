import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import ProgramList from "../components/FormationComponents/ProgramList";
import getFormations from "../controllers/Formations";
import Quizz from "../components/Quizz";

const Lesson = () => {
  const { formationName, lessonName } = useParams();

  const [currentIndex, setCurrentIndex] = useState(0);

  const lessonLink = lessonName.toLowerCase().replace(/\s+/g, "");

  const firstList = getFormations();
  const formation = firstList.filter(
    (formation) => formation.id === formationName
  );

  const lessons = formation[0].lesson;
  const lesson = lessons.filter(
    (lesson) => lesson.title.toLowerCase().replace(/\s+/g, "") === lessonLink
  )[0];

  var content = "Rien à afficher";

  if (lesson.isQuizz) {
    const currentQuestion = lesson.content.questions[currentIndex];
    const nbQuestion = lesson.content.questions.length - 2;

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
    }
    content = (
      <>
        <Quizz
          title={currentQuestion.title}
          responses={currentQuestion.answers}
        />
        {suivantBtn}
      </>
    );
  } else content = lesson.content;

  return (
    <div className="w-screen h-screen flex flex-col overflow-x-hidden">
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
            <div className="p-10 whitespace-pre-line">{content}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson;
