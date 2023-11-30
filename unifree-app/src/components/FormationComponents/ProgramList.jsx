/* eslint-disable react/prop-types */
import { Link, useParams } from "react-router-dom";

const ProgramList = ({ formation }) => {
  const formationLink = useParams();
  // Si on est dans la page de la formation, on met le lien vers la leçon en cours en relatif sinon on met le lien en absolu
  const linkPrefix =
    formationLink.id === formation.id ? "./" : `/${formation.id}/`;

  const lessonList = formation["lesson"].map((lesson) => (
    <Link
      className="p-3 w-full hover:bg-gray-200"
      key={lesson.title}
      to={`${linkPrefix}${lesson.title.toLowerCase().replace(/\s+/g, "")}`}
    >
      <img
        src={lesson.isQuizz ? "/quizzIcon.png" : "/lessonIcon.png"}
        className="w-6 h-6 mr-4 inline-block"
      />
      {lesson.title}
    </Link>
  ));

  return (
    <div className="flex flex-col w-full border rounded-[18px] border-solid border-[#C7C7C7] border-between m-4">
      {lessonList}
    </div>
  );
};

export default ProgramList;
