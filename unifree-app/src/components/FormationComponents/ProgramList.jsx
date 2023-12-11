/* eslint-disable react/prop-types */
import { Link, useParams } from "react-router-dom";
import useLessons from "../../controllers/useLessons";
import useQuizzs from "../../controllers/useQuizzs";

const ProgramList = ({ formation }) => {
  const formationLink = useParams();
  // Si on est dans la page de la formation, on met le lien vers la leçon en cours en relatif sinon on met le lien en absolu
  const linkPrefix =
    formationLink.id === formation.id ? "./" : `/${formation.id}/`;

  // On refresh la page pour que le quizz se relance
  function refreshPage() {
    setTimeout(() => {
      window.location.reload(false);
    }, 500);
  }
  const Lessons = useLessons(formation.id);
  const Quizzs = useQuizzs(formation.id);
  let LessonsQuizz;
  
  LessonsQuizz = (Array.isArray(Lessons) && Array.isArray(Quizzs)) ? [...Lessons,...Quizzs] : null; 

  const lessonList = (LessonsQuizz) ? LessonsQuizz.map((lesson) => (
    <>
    {
      lesson.title ?
    <Link
      className="p-3 w-full hover:bg-gray-200"
      key={lesson.title}
      to={`${linkPrefix}${lesson.title.toLowerCase().replace(/\s+/g, "")}`}
      // onClick={refreshPage}
    >
      <img
        src={lesson.isQuizz ? "/quizzIcon.png" : "/lessonIcon.png"}
        className={`w-6 h-6 mr-4 inline-block ${lesson.isRead ? 'grayscale-0' : 'grayscale'}`}
        />
      {lesson.title}
    </Link>
    : null}
    </>
  )) : null;

  return (
    <div className="flex flex-col w-full border rounded-[18px] border-solid border-[#C7C7C7] border-between">
      {lessonList}
    </div>
  );
};

export default ProgramList;
