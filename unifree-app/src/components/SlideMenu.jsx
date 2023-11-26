/* eslint-disable react/prop-types */

import FormationCard from "./FormationCard";

const SlideMenu = ({ title, list }) => {
  console.log(list);
  const listFormation = list.map((formation) => (
    <FormationCard key={formation.title} formation={formation} />
  ));

  return (
    <div className="flex flex-col">
      <div className="w-full">
        <p className="font-medium text-xl">{title}</p>
      </div>
      <div className="w-[267.082px] h-[273px] shrink-0 border rounded-[18px] border-solid border-[#C7C7C7]">
        {listFormation}
      </div>
    </div>
  );
};

export default SlideMenu;
