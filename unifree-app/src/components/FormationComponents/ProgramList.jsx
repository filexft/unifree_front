/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const ProgramList = ({ formation }) => {
  console.log(formation);
  const lessonList = formation["lesson"].map((link) => (
    <Link
      className="p-3 w-full hover:bg-gray-200"
      key={link.title}
      to={`./${link.link}`}
    >
      {link.title}
    </Link>
  ));
  const quizzList = formation["quizz"].map((link) => (
    <Link
      className="p-3 w-full hover:bg-gray-200"
      key={link.title}
      to={`./${link.link}`}
    >
      {link.title}
    </Link>
  ));
  return (
    <div className="flex flex-col w-full border rounded-[18px] border-solid border-[#C7C7C7] border-between m-4">
      {lessonList}
      {quizzList}
    </div>
  );
};

export default ProgramList;
