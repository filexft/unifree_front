/* eslint-disable react/prop-types */

import LikeImage from "/thumb_up.png";

const FormationInfo = ({ formation }) => {
  const quizzList = formation.lesson.filter(
    (lesson) => lesson.isQuizz === true
  );

  const user = "User";

  const commentsList = formation.comments.map((comment) => (
    <div key={comment.author} className="border ">
      <div>{comment.author}</div>
      <div>{comment.content}</div>
    </div>
  ));

  // TODO: AJOUTER A LA LISTE DES FORMATIONS LIKED
  function toggleLike() {
    const likeBtn = document.getElementById("likeBtn");
    if (likeBtn.src.includes("thumb_up.png")) {
      likeBtn.src = "/thumb_up_filled.png";
      formation.likeCount++;
    } else {
      likeBtn.src = "/thumb_up.png";
      formation.likeCount--;
    }
  }

  return (
    <div className="w-1/2 flex flex-col items-center shrink-0 rounded-[18px] border-solid">
      <img
        className="w-[555px] h-[293px] shrink-0 rounded-[14px] mt-6"
        src={formation.cover}
      />
      <div>
        <p className="w-[529px] text-black text-2xl font-medium leading-[normal]">
          {formation.title}
        </p>
        <p className="inline-block text-white bg-cyan-300 rounded text-sm px-2 not-italic font-medium leading-[normal]">
          {formation.categorie}
        </p>
        <div className="flex ">
          <p className=" text-[#949494] text-[13px] not-italic font-normal leading-[normal] mr-4">
            {formation.lesson.length - quizzList.length} leçons
          </p>
          <p className=" text-[#949494] text-[13px] not-italic font-normal leading-[normal]">
            {quizzList.length} quizz
          </p>
        </div>
        <div className="flex items-center justify-between mb-3">
          <p className=" text-[#949494] text-[13px] not-italic font-normal leading-[normal]">
            Écrit par <b>{formation.author}</b>
          </p>
          <div className="flex flex-row">
            <p className=" text-[#949494] text-base not-italic font-medium leading-[normal]">
              {formation.likeCount} likes
            </p>
            <button>
              <img
                id="likeBtn"
                onClick={toggleLike}
                className="w-6 h-6 ml-2 shrink-0"
                src={LikeImage}
              />
            </button>
          </div>
        </div>
      </div>
      <div>
        <p>Commentaires</p>
        { commentsList }
      </div>
    </div>
  );
};

export default FormationInfo;
