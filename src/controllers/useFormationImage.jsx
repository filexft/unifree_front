import { useEffect, useState } from "react";
import BackRoutes from "../RoutesInterface";

const useFormationImage = (id) => {
  const [FormationImage, setFormationImage] = useState({
    loading: true,
  });

  useEffect(() => {
    fetch(BackRoutes.Formations+id)
      .then(async (res) => {
        const tmp = await res.json();
        return tmp;
      })
      .then((res) => {

        if (res.Statut == 0) {
          throw new Error(res.Message);
        }
        console.log(res)
        const tmp = res.data.FormationImage
        return tmp;
      })
      .then(res => setFormationImage(res))
      .catch((err) => setFormationImage({ error: true, ErrorContent: err }));
  }, [id]);
  return FormationImage;
};

export default useFormationImage;