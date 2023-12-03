import { useState } from "react";
import Header from "../components/Header";

const EditFormation = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [lessons, setLessons] = useState([
    {
      title: "",
      isQuizz: false,
      content: "",
    },
  ]);
  const handleLessonTitleChange = (index, value) => {
    const updatedLessons = [...lessons];
    updatedLessons[index].title = value;
    setLessons(updatedLessons);
  };

  const handleLessonTextChange = (index, value) => {
    const updatedLessons = [...lessons];
    updatedLessons[index].content = value;
    setLessons(updatedLessons);
  };

  const handleAddLesson = () => {
    const newLesson = {
      title: "",
      isQuizz: false,
      content: "",
    };

    setLessons([...lessons, newLesson]);
  };

  const handleAddQuizz = () => {
    const newLesson = {
      title: "",
      isQuizz: true,
      content: {
        questions: [
          {
            title: "",
            answers: [
              {
                title: "",
                isCorrect: false,
              },
              {
                title: "",
                isCorrect: true,
              },
            ],
          },
        ],
      },
    };

    setLessons([...lessons, newLesson]);
  };

  const handleDeleteLesson = (index) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette leçon?")) {
      const updatedLessons = [...lessons];
      updatedLessons.splice(index, 1);
      setLessons(updatedLessons);
    }
  };

  const handleQuestionTitleChange = (lessonIndex, questionIndex, value) => {
    const updatedLessons = [...lessons];
    updatedLessons[lessonIndex].content.questions[questionIndex].title = value;
    setLessons(updatedLessons);
  };

  const handleDeleteQuestion = (lessonIndex, questionIndex) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette question?")) {
      const updatedLessons = [...lessons];
      updatedLessons[lessonIndex].content.questions.splice(questionIndex, 1);
      setLessons(updatedLessons);
    }
  };

  const handleAnswerCorrectChange = (
    lessonIndex,
    questionIndex,
    answerIndex,
    value
  ) => {
    const updatedLessons = [...lessons];
    updatedLessons[lessonIndex].content.questions[questionIndex].answers[
      answerIndex
    ].isCorrect = value;
    setLessons(updatedLessons);
  };

  const handleAnswerTitleChange = (
    lessonIndex,
    questionIndex,
    answerIndex,
    value
  ) => {
    const updatedLessons = [...lessons];
    updatedLessons[lessonIndex].content.questions[questionIndex].answers[
      answerIndex
    ].title = value;
    setLessons(updatedLessons);
  };

  const handleAddAnswer = (lessonIndex, questionIndex) => {
    const updatedLessons = [...lessons];
    updatedLessons[lessonIndex].content.questions[questionIndex].answers.push({
      title: "",
      isCorrect: false,
    });
    setLessons(updatedLessons);
  };

  const handleAddQuestion = (lessonIndex) => {
    const updatedLessons = [...lessons];
    updatedLessons[lessonIndex].content.questions.push({
      title: "",
      answers: [
        {
          title: "",
          isCorrect: false,
        },
      ],
    });
    setLessons(updatedLessons);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ajouter la récupération de l'id du prof + ajouter la formation dans la base de données ici
    console.log({ title, category, lessons });
  };

  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      <form className="p-5" onSubmit={handleSubmit}>
        <div className="text-main-purple text-xl font-bold">
          Créer une formation
        </div>
        <div>
          <label htmlFor="title">Titre de la formation</label>
          <input
            type="text"
            id="title"
            value={title}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border focus:outline-none focus:border-main-purple"
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="category">Catégorie</label>
          <input
            type="text"
            id="category"
            value={category}
            placeholder="Écrivez la catégorie..."
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border focus:outline-none focus:border-main-purple"
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="mb-4 font-semibold">Leçons</div>
        <div className="flex flex-col gap-3">
          {lessons.map((lesson, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-full border rounded-[18px] border-solid border-[#C7C7C7] p-5"
            >
              {lesson.isQuizz ? (
                <div className="w-full">
                  <div className="w-full">
                    <label className="mb-3" htmlFor={`lessonTitle${index}`}>
                      Titre du quizz
                    </label>
                    <input
                      type="text"
                      id={`lessonTitle${index}`}
                      value={lesson.title}
                      placeholder="Écrivez le titre du quizz ici..."
                      className="block p-2.5 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border focus:outline-none focus:border-main-purple"
                      onChange={(e) =>
                        handleLessonTitleChange(index, e.target.value)
                      }
                    ></input>
                    {lesson.content.questions.map((question, questionIndex) => (
                      <div key={questionIndex}>
                        <label
                          htmlFor={`questionTitle${index}-${questionIndex}`}
                        >
                          Titre de la question
                        </label>
                        <input
                          type="text"
                          id={`questionTitle${index}-${questionIndex}`}
                          value={question.title}
                          placeholder="Écrivez le titre de la question ici..."
                          className="block p-2.5 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border focus:outline-none focus:border-main-purple"
                          onChange={(e) =>
                            handleQuestionTitleChange(
                              index,
                              questionIndex,
                              e.target.value
                            )
                          }
                        />
                        {question.answers.map((answer, answerIndex) => (
                          <div key={answerIndex}>
                            <label
                              htmlFor={`answerTitle${index}-${questionIndex}-${answerIndex}`}
                            >
                              Titre de la réponse
                            </label>
                            <input
                              type="text"
                              id={`answerTitle${index}-${questionIndex}-${answerIndex}`}
                              value={answer.title}
                              placeholder="Écrivez le titre de la réponse ici..."
                              className="block p-2.5 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border focus:outline-none focus:border-main-purple"
                              onChange={(e) =>
                                handleAnswerTitleChange(
                                  index,
                                  questionIndex,
                                  answerIndex,
                                  e.target.value
                                )
                              }
                            />
                            <label
                              htmlFor={`isCorrect${index}-${questionIndex}-${answerIndex}`}
                            >
                              Réponse correcte
                            </label>
                            <input
                              type="checkbox"
                              id={`isCorrect${index}-${questionIndex}-${answerIndex}`}
                              checked={answer.isCorrect}
                              className="ml-2"
                              onChange={(e) =>
                                handleAnswerCorrectChange(
                                  index,
                                  questionIndex,
                                  answerIndex,
                                  e.target.checked
                                )
                              }
                            />
                          </div>
                        ))}
                        <button
                          onClick={() => handleAddAnswer(index, questionIndex)}
                        >
                          Ajouter une réponse
                        </button>

                        <button
                          type="button"
                          className="flex w-1/2 justify-center items-center px-6 py-2 border-2 border-red-600 font-semibold text-red-600 rounded-[18px] hover:bg-red-600 hover:text-white duration-300 mt-3"
                          onClick={() =>
                            handleDeleteQuestion(index, questionIndex)
                          }
                        >
                          Supprimer la question
                        </button>
                      </div>
                    ))}
                    <button onClick={() => handleAddQuestion(index)}>
                      Ajouter une question
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <label className="mb-3" htmlFor={`lessonTitle${index}`}>
                    Titre de la leçon
                  </label>
                  <input
                    type="text"
                    id={`lessonTitle${index}`}
                    value={lesson.title}
                    placeholder="Écrivez le titre de la leçon ici..."
                    className="block p-2.5 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border focus:outline-none focus:border-main-purple"
                    onChange={(e) =>
                      handleLessonTitleChange(index, e.target.value)
                    }
                  />

                  <label className="mb-3" htmlFor={`content${index}`}>
                    Contenu
                  </label>
                  <textarea
                    id={`content${index}`}
                    value={lesson.content}
                    placeholder="Écrivez le contenu de la leçon ici..."
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border focus:outline-none focus:border-main-purple"
                    onChange={(e) =>
                      handleLessonTextChange(index, e.target.value)
                    }
                  />
                </div>
              )}
              <button
                type="button"
                className="flex w-1/2 justify-center items-center px-6 py-2 border-2 border-red-600 font-semibold text-red-600 rounded-[18px] hover:bg-red-600 hover:text-white duration-300 mt-3"
                onClick={() => handleDeleteLesson(index)}
              >
                Supprimer la leçon
              </button>
            </div>
          ))}
        </div>

        <button
          className="font-semibold bg-main-purple mt-7 rounded-full hover:bg-purple-900 text-white p-3"
          type="button"
          onClick={handleAddLesson}
        >
          Ajouter une leçon
        </button>

        <button
          className="font-semibold bg-main-purple mt-7 rounded-full hover:bg-purple-900 text-white p-3"
          type="button"
          onClick={handleAddQuizz}
        >
          Ajouter un Quizz
        </button>

        <button
          className="font-semibold bg-main-purple mt-7 rounded-full hover:bg-purple-900 text-white p-3"
          type="submit"
        >
          Publier la formation
        </button>
      </form>
    </div>
  );
};

export default EditFormation;
