/* eslint-disable react/prop-types */

import LikeImage from "/thumb_up.png";
import useLessons from "../../controllers/useLessons";
import useQuizzs from "../../controllers/useQuizzs";

import { Link } from 'react-router-dom';

const FormationCard = ({ formation }) => {
  const Cover = "https://www.batisafe.fr/wp-content/uploads/2020/04/POST_FORMATION-EN-LIGNE.jpg";

  const Lessons = useLessons(formation.id)
  const quizzList = useQuizzs(formation.id)

  return (
    <div className="h-full shrink-0 border rounded-[18px] border-solid border-[#C7C7C7]">
      <Link className="flex flex-col items-center" to={`/${formation.id}`}>
        <img className="w-[238.433px] h-[126px] shrink-0 rounded-[14px] mt-6" src={Cover}/>
        <div>
        <p className="w-[220.874px] text-black text-base not-italic font-medium leading-[normal]">{formation.title}</p>
        <p className=" text-white inline-block bg-cyan-300 rounded text-sm px-2 not-italic font-medium leading-[normal]">{formation.categorie}</p>
        <div className="flex w-1/2">
            <p className="w-[110px] text-[#949494] text-[13px] not-italic font-normal leading-[normal]">{Lessons.length - quizzList.length} leçons</p>
            <p className="w-[110px] text-[#949494] text-[13px] not-italic font-normal leading-[normal]">{quizzList.length} quizz</p>
        </div>
        <div className="flex items-center">
            <p className="w-[45px] text-[#949494] text-[10px] not-italic font-medium leading-[normal]">{formation.likeCount ? formation.likeCount : 0} likes</p>
            <img className="w-[14.787px] h-4 shrink-0" src={LikeImage} />
        </div>
      </div>
      </Link>
    </div>
  );
};

export default FormationCard;
