/* eslint-disable react/prop-types */

import FormationCard from "./FormationComponents/FormationCard";

const SlideMenu = ({ title, list }) => {
  const listFormation = list.map((formation) => (
    <FormationCard key={formation.title} formation={formation} />
  ));

  return (
    <div className="flex flex-col">
      <div className="w-full">
        <p className="font-medium text-xl p-5">{title}</p>
      </div>
      <div className="p-3 mr-0 flex flex-row gap-3 overflow-x-scroll no-scrollbar">
          {listFormation}
      </div>
    </div>
  );
};

export default SlideMenu;
