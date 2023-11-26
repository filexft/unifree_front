/* eslint-disable react/prop-types */

import LikeImage from "../assets/thumb_up.png";

import { Link } from 'react-router-dom';

const FormationCard = ({ formation }) => {
  return (
    <>
      <Link className="flex flex-col items-center" to={`./${formation.title}`}>
        <img className="w-[238.433px] h-[126px] shrink-0 rounded-[14px] mt-6" src={formation.cover}/>
        <div>
        <p className="w-[220.874px] text-black text-base not-italic font-medium leading-[normal]">{formation.title}</p>
        <p className="w-[88px] text-white bg-cyan-300 rounded text-sm px-2 not-italic font-medium leading-[normal]">{formation.categorie}</p>
        <div className="flex w-1/2">
            <p className="w-[110px] text-[#949494] text-[13px] not-italic font-normal leading-[normal]">{formation.lesson.length} leçons</p>
            <p className="w-[110px] text-[#949494] text-[13px] not-italic font-normal leading-[normal]">{formation.quizz.length} quizz</p>
        </div>
        <div className="flex items-center">
            <p className="w-[45px] text-[#949494] text-[10px] not-italic font-medium leading-[normal]">{formation.likeCount} likes</p>
            <img className="w-[14.787px] h-4 shrink-0" src={LikeImage} />
        </div>
      </div>
      </Link>
    </>
  );
};

export default FormationCard;
