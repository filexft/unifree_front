import Formation from "../models/Formation";

function Formations() {
  const Formation1 = Formation({
    title: "Formation Test",
    categorie: "Catestgorie",
    lesson: ["toto", "tata", "tati", "toma"],
    quizz:["toto", "tata"],
    likeCount: 12,
    cover: "https://images.squarespace-cdn.com/content/v1/54fc8146e4b02a22841f4df7/1566824447866-P0M8PSGYRQ46NYBCDSON/Art+of+Pinocchio+F+-+32.jpeg",
  });
  const FormationList = [Formation1];

  return FormationList;
}

export default Formations;
