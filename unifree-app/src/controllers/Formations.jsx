import Formation from "../models/Formation";

function Formations() {
  const Formation1 = Formation({
    title: "Formation Test",
    categorie: "Catestgorie",
    lesson: [{title: "toto le goat", link: "totoFr"}, {title: "tata le goat", link: "tataFr"}, {title: "tati le goat", link: "tatiFr"}, {title: "toma le goat", link: "tomaFr"}],
    quizz:[{title:"toto", link: "totoquizz"}, {title:"tata", link: "tataquizz"}],
    likeCount: 12,
    cover: "https://www.pole-emploi.fr/files/live/sites/corse/files/corse/Formation/formations-dispo-850x523.jpg",
  });

  const Formation2 = Formation({
    title: "FormationTest2",
    categorie: "Informatique",
    lesson: [{title: "toto le goat", link: "totoFr"}, {title: "tata le goat", link: "tataFr"}, {title: "tati le goat", link: "tatiFr"}, {title: "toma le goat", link: "tomaFr"}],
    quizz:[{title:"toto", link: "totoquizz"}, {title:"tata", link: "tataquizz"}],
    likeCount: 12,
    cover: "https://www.batisafe.fr/wp-content/uploads/2020/04/POST_FORMATION-EN-LIGNE.jpg",
  });

  const FormationList = [Formation1,Formation2,Formation2,Formation2,Formation2,Formation2, Formation2];

  return FormationList;
}

export default Formations;
