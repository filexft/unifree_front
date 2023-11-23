/* eslint-disable react/prop-types */

import FormationCard from "./FormationCard";

const SlideMenu = ({ title }, { list }) => {
  const listFormation = list.map((formation, index) => (
    <FormationCard key={index} formation={formation} />
  ));

  return (
    <>
      <div>
        <p>{title}</p>
      </div>
      <div>{listFormation}</div>
    </>
  );
};

export default SlideMenu;
