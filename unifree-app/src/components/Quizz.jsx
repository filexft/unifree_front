/* eslint-disable react/prop-types */

const Quizz = ({ title, responses }) => {
  // response.isCorrect == true ? 'Correct' : 'Incorrect'
  const setChecked = (e) => {
    e.target.classList.toggle("bg-gray-200");
    e.target.classList.toggle("hover:bg-gray-300");
  };

  const sendSelection = () => {
    const selected = document.querySelectorAll(".bg-gray-200");
    const submit = document.getElementById("Submit");
    submit.remove();

    // Ajout du Lien vers la leçon suivante
    var a = document.createElement("a");
    a.href = "/";
    a.innerHTML = "Suivant";
    a.classList.add(
      "ml-auto",
      "mt-4",
      "py-2",
      "text-white",
      "px-5",
      "border",
      "rounded-full",
      "drop-shadow",
      "bg-main-purple",
      "hover:bg-purple-800",
      "duration-300"
    );
    document.getElementById("answersList").appendChild(a);
    
    
    // Affichage des réponses
    selected.forEach((element) => {
      if (element.value == "true") {
        element.classList.toggle("bg-green-200");
      } else {
        element.classList.toggle("bg-red-200");
        const goodAnswer = document.querySelector('[value="true"]');
        goodAnswer.classList.toggle("border-green-200");
        goodAnswer.classList.toggle("border-2");
      }
    });
  };

  return (
    <div className="flex flex-col items-center">
      <p className="font-semibold mb-4">{title}</p>
      <div id="answersList" className="flex flex-wrap justify-center gap-3 overflow-hidden">
        {responses.map((response, index) => (
          <button
            onClick={setChecked}
            key={index}
            value={response.isCorrect}
            className=" w-full h-full py-4 px-24 border rounded drop-shadow	hover:bg-gray-100 hover:animate-pulse duration-100"
          >
            {response.title}
          </button>
        ))}
      </div>
      <button
        onClick={sendSelection}
        id="Submit"
        className="ml-auto mt-4 py-2 text-white px-5 border rounded-full drop-shadow bg-main-purple hover:bg-purple-800 duration-300"
      >
        Envoyer
      </button>
    </div>
  );
};

export default Quizz;
