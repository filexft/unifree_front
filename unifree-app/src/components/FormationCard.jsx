/* eslint-disable react/prop-types */

import LikeImage from "../assets/thumb_up.png"

const FormationCard = ({ formation }) => {
  return (
    <>
      <div>
        <img src={formation.cover}/>
        <div>
        <p>{formation.title}</p>
        <p>{formation.categorie}</p>
        <div>
            <p>{formation.lesson.count()}</p><p>leçons</p>
            <p>{formation.quizz.count()}</p><p>quizz</p>
        </div>
        <div>
            <p>{formation.likeCount}</p><p>likes</p>
            <img src={LikeImage} />
        </div>
      </div>
      </div>
    </>
  );
};

export default FormationCard;
