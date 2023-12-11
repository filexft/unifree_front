/* eslint-disable react/prop-types */

const Quizz = ({ questionIndex, length, title, responses }) => {
  // response.isCorrect == true ? 'Correct' : 'Incorrect'
  const setChecked = (e) => {
    e.target.classList.toggle("bg-gray-200");
    e.target.classList.toggle("hover:bg-gray-300");
  };
  const setStart = document.querySelectorAll(".bg-gray-200");

  // Reset des couleurs des réponses
  setStart.forEach((element) => {
    if (element.classList.contains("bg-green-200")) {
      element.classList.remove("bg-green-200");
    } else {
      element.classList.remove("bg-red-200");
      element.classList.remove("styling");
      const goodAnswer = document.querySelector('[value="true"]');
      goodAnswer.classList.remove("border-green-200");
      goodAnswer.classList.remove("border-4");
    }
    element.classList.remove("bg-gray-200");
  });

  const sendSelection = () => {
    const selected = document.querySelectorAll(".bg-gray-200");
    const submit = document.getElementById("Submit");
    submit.classList.add("hidden");

    // Affichage des réponses
    selected.forEach((element) => {
      if (element.value == "true") {
        element.classList.add("bg-green-200");
        element.classList.add("styling");
      } else {
        element.classList.add("bg-red-200");
        element.classList.add("styling");
        const goodAnswer = document.querySelector('[value="true"]');
        goodAnswer.classList.add("border-green-200");
        goodAnswer.classList.add("border-4");
        goodAnswer.classList.add("styling");
      }
    });
  };

  return (
    <div className="flex flex-col items-center">
      <p className="font-semibold mb-4">{title}</p>
      <p className="text-violet-600 border-2 border-violet-600 rounded-full py-2 px-3 mb-6 mr-auto font-semibold">
        Question {questionIndex + 1}/{length + 1}
      </p>
      <div
        id="answersList"
        className="flex flex-wrap justify-center gap-3 overflow-hidden"
      >
        {responses.map((response, index) => (
          <button
            onClick={setChecked}
            key={index}
            value={response.isCorrect}
            className="response-box w-full h-full py-4 px-24 border rounded drop-shadow	hover:bg-gray-100 hover:animate-pulse duration-100"
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
