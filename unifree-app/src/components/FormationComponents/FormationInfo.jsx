/* eslint-disable react/prop-types */

import useLessons from "../../controllers/useLessons";
import useQuizzs from "../../controllers/useQuizzs";
import useComments from "../../controllers/useComments";
import LikeImage from "/thumb_up.png";
import LikeImage2 from "/thumb_up_filled.png";
import useAuthor from "../../controllers/useAuthor";
import BackRoutes from "../../RoutesInterface";
import Comment from "../Comment";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import useLikes from "../../controllers/UseLikes";
import Spinner from "../Spinner";
import useLikedFormations from "../../controllers/useLikedFormations";

const FormationInfo = ({ formation, showEditButton }) => {
  
  const Cover = "https://www.batisafe.fr/wp-content/uploads/2020/04/POST_FORMATION-EN-LIGNE.jpg";
  const quizzList = useQuizzs(formation.id);
  const Lessons = useLessons(formation.id);
  const Author = useAuthor(formation.author)
  console.log(Cookies.get('token'))
  const UserId = (Cookies.get('token')) ? jwtDecode(Cookies.get('token')).Id : null
  const LikedFormations = useLikedFormations(UserId)
  let tmpLike = {
    Id: null,
    AuthorId: UserId,
    FormationId: formation.id
  }

  // remplacer par le nom de l'utilisateur courant
  const user = (Author.id) ? Author.id : "User";
  var commentsList = useComments(formation.id);

  // TODO: AJOUTER A LA LISTE DES FORMATIONS LIKED
  const toggleLike = async() => {
    const likeBtn = document.getElementById("likeBtn");
    if (likeBtn.src.includes("thumb_up.png")) {
      likeBtn.src = "/thumb_up_filled.png";
      let result = await fetch(BackRoutes.Likes,{method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tmpLike)})
      result = await result.json();
      tmpLike.Id = result.data.Id;
    } else {
      likeBtn.src = "/thumb_up.png";
      let result = await fetch(BackRoutes.Likes+tmpLike.Id,{method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }})
      console.log(result)
    }

  }

  function addComment() {
    const comment = document.getElementById("comment");
    comment.classList.toggle("hidden");
  }

  function sendComment() {
    const comment = document.getElementById("comment");
    comment.classList.toggle("hidden");
    const content = document.getElementById("content");
    const newComment = {  AuthorId: UserId, FormationId : formation.id, Contenu: content.value };
    content.value = "";

    fetch(BackRoutes.Coments, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment)
    }).then(() => alert("Commentaire crée"))
    .catch(() => alert("Commentaire non envoyé, erreur"))
    .finally(() => refreshComments())
  }

  function refreshComments() {
    window.location.reload();
    if (Array.isArray(commentsList)){
    commentsList = commentsList.map((comment) => (
      <div key={comment.author} className="border rounded-xl p-3 mb-2">
        <div className="text-xs font-semibold ">{comment.author}</div>
        <div>{comment.content}</div>
      </div> 
    ))
    }
  }

  return (
    <div className="w-1/2 flex flex-col items-center shrink-0 rounded-[18px] border-solid">
      <div>{showEditButton}</div>
      <img
        className="w-[555px] h-[293px] shrink-0 rounded-[14px] mt-6"
        src={Cover}
      />
      <div>
        <p className="w-[529px] text-black text-2xl font-medium leading-[normal]">
          {formation.title}
        </p>
        <p className="inline-block text-white bg-cyan-300 rounded text-sm px-2 not-italic font-medium leading-[normal]">
          {formation.categorie}
        </p>
        <div className="flex">
          <p className=" text-[#949494] text-[13px] not-italic font-normal leading-[normal] mr-4">
            {(Lessons.length > 0) ? Lessons.length : 0} leçons
          </p>
          <p className=" text-[#949494] text-[13px] not-italic font-normal leading-[normal]">
            { (quizzList.length > 0) ? quizzList.length : 0} quizz
          </p>
        </div>
        <div className="flex items-center justify-between mb-3">
          <p className=" text-[#949494] text-[13px] not-italic font-normal leading-[normal]">
            Écrit par <b>{(Author.Name) ? Author.Name + " " + Author.Prenom : "User"}</b>
          </p>
          <div className="flex flex-row">
            <p className=" text-[#949494] text-base not-italic font-medium leading-[normal]">
              
            </p>
            <button>
              
            {(Array.isArray(LikedFormations) && LikedFormations.find(Formation => Formation.id === formation.id)) ? 
              <img
                id="likeBtn"
                onClick={toggleLike}
                className="w-6 h-6 ml-2 shrink-0"
                src={LikeImage2}
              />
              :
              <img
                id="likeBtn"
                onClick={toggleLike}
                className="w-6 h-6 ml-2 shrink-0"
                src={LikeImage}
              />}
            </button>
          </div>
        </div>
      </div>
      <div className="w-full p-6">
        <div className="font-medium text-xl mb-4 flex justify-between items-center"><p>Commentaires</p><button onClick={addComment} className=" py-2 text-sm text-white px-5 border rounded-full drop-shadow bg-main-purple hover:bg-purple-800 duration-300 ">Commenter</button> </div>
        <div id="comment" className="hidden mb-6">
          <textarea id="content" className="w-full border rounded-xl p-3 mb-2" placeholder="Ajouter un commentaire..."></textarea>
          <button onClick={ sendComment} className=" py-2 text-sm text-white px-5 border rounded-full drop-shadow bg-main-purple hover:bg-purple-800 duration-300 ">Envoyer</button>
        </div>
        { (!commentsList.loading && !commentsList.error) ? 
          commentsList.map((comment) => (
          <Comment comment={comment}/>
        )) : null}
      </div>
    </div>
  );
};

export default FormationInfo;
