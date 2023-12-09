import { useEffect, useState } from "react";
import BackRoutes from "../RoutesInterface";

const useQuizzs = (id) => {
  const [Quizzs, setQuizzs] = useState({
    loading: true,
  });

  useEffect(() => {
    fetch(BackRoutes.GetFormationQuizzs(id))
      .then(async (res) => {
        console.log(BackRoutes.GetFormationComments(id))
        const tmp = await res.json();
        return tmp;
      })
      .then((res) => {
        let QuizzsList = [];

        if (res.Statut == 0) {
          throw new Error(res.Message);
        }

        res.data.forEach((el) => {
          const tmpQuizz = {
            id : el.Id,
            isQuizz : true,
            title: el.Titre,
            content: el.Description,
          };
          QuizzsList.push(tmpQuizz);
        });
        return QuizzsList;
      })
      .then(res => setQuizzs(res))
      .catch((err) => setQuizzs({ error: true, ErrorContent: err }));
  }, []);
  return Quizzs;
};

export default useQuizzs;