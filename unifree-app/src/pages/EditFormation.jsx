import { useState } from "react";
import Header from "../components/Header";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import NotFound from "./NotFound";
import BackRoutes from "../RoutesInterface";
import { useNavigate } from "react-router";
import Spinner from "./Spinner";

const EditFormation = () => {
  const user = Cookies.get("token") ? jwtDecode(Cookies.get("token")) : null;
  const Navigate = useNavigate();
  if (!user) {
    return <NotFound />;
  }
  const Id = user.Id;

  let FormationId;
  let QuizzId;
  let questionId;

  //loading 
  
  const [loading, setLoading] = useState(false);

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
  const fetchAll = async () => {
    let result = true;
    // Ajouter la récupération de l'id du prof + ajouter la formation dans la base de données ici

    // Un Fetch pour ajouter la formation Creation Objet into envoi

    let tmpFormation = {
      Titre: title,
      AuthorId: Id,
      Categorie : category
    };
    let res = await fetch(BackRoutes.Formations, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tmpFormation),
    })
    res = await res.json();
    if (res.Statut != 200) result = false;
    FormationId = res.data.Id;

    if (FormationId) {
      for (let i = 0; i < lessons.length; i++) {
        if (!lessons[i].isQuizz) {
          // On fetch toutes les lessons classiques
          let tmpLesson = {
            FormationId: FormationId,
            Titre: lessons[i].title,
            Contenu: lessons[i].content,
          };
          let resLesson = await fetch(BackRoutes.Lessons, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(tmpLesson),
          })
          resLesson = await resLesson.json()
          if (resLesson.Statut != 200) result = false;
        } else {
          // Faire une double boucle pour créer un objet opti
          let tmpQuizz = {
            FormationId: FormationId,
            Titre : lessons[i].title,
            Description : "DefaultDescription"
          }
          let resQuizz = await fetch(BackRoutes.Quizz,{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(tmpQuizz),})
          resQuizz = await resQuizz.json();
          if (resQuizz.Statut == 0) result = false;
          const questions = (result) ? lessons[i].content.questions : [];

          for(let j = 0;j<questions.length;j++){
            let tmpQuestion ={
              QuizzId: resQuizz.data.Id,
              Enonce : questions[j].title
            }
            let resQuestion = await fetch(BackRoutes.Qestions,{
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(tmpQuestion)})
            resQuestion = await resQuestion.json();
            
            if (resQuestion.Statut != 200) result = false;
            let answers = (result) ? questions[j].answers : [];
            for(let k = 0;k<answers.length;k++){
              console.log(answers[k])
              let tmpAnswer = {
                QuestionId: resQuestion.data.Id,
                Right : answers[k].isCorrect,
                Contenu : answers[k].title
              }
              let resAnswer = await fetch(BackRoutes.Responses,{
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(tmpAnswer)})
                resAnswer = await resAnswer.json();
                if (resAnswer.Statut != 200) result = false;
            }
          }

        }
      }
    }
    return result;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchAll()
    .then((res) => {
      
      setLoading(false)
      const result = res
        ? "Formation bien publiée"
        : "Publication de la formation echouée";
      alert(result); 
    })
    .finally(() =>{
      
      setLoading(false)
      Navigate(`/u/${Id}`)
    });
  };

  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      {
        loading? <Spinner /> :''
      }
      <div className="p-5">
        <div className="text-main-purple text-xl font-bold">
          Créer une formation
        </div>
        <div>
          <label className="mb-4 font-semibold" htmlFor="title">
            Titre de la formation
          </label>
          <input
            type="text"
            id="title"
            placeholder="Écrivez le titre de la leçon..."
            value={title}
            className="block p-2.5 mb-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border focus:outline-none focus:border-main-purple"
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="mb-4 font-semibold" htmlFor="category">
            Catégorie
          </label>
          <input
            type="text"
            id="category"
            value={category}
            placeholder="Écrivez la catégorie..."
            className="block p-2.5 mb-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border focus:outline-none focus:border-main-purple"
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
                      required
                      id={`lessonTitle${index}`}
                      value={lesson.title}
                      placeholder="Écrivez le titre du quizz ici..."
                      className="block p-2.5 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border focus:outline-none focus:border-main-purple"
                      onChange={(e) =>
                        handleLessonTitleChange(index, e.target.value)
                      }
                    ></input>
                    <div className="flex flex-col gap-8">
                      {lesson.content.questions.map(
                        (question, questionIndex) => (
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
                              <div
                                key={answerIndex}
                                className="border p-5 flex justify-evenly items-center gap-5"
                              >
                                <label
                                  htmlFor={`answerTitle${index}-${questionIndex}-${answerIndex}`}
                                >
                                  Réponse
                                </label>
                                <input
                                  type="text"
                                  id={`answerTitle${index}-${questionIndex}-${answerIndex}`}
                                  value={answer.title}
                                  placeholder="Écrivez le titre de la réponse ici..."
                                  className="block p-2.5 w-1/2 text-sm text-gray-900 bg-gray-50 rounded-lg border focus:outline-none focus:border-main-purple"
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
                            <div className="flex items-center justify-between gap-6">
                              <button
                                onClick={() =>
                                  handleAddAnswer(index, questionIndex)
                                }
                                className="inline-block px-6 py-2 border-2 text-xs border-purple-600 font-semibold text-purple-600 rounded-[18px] hover:bg-purple-600 hover:text-white duration-300 mt-3"
                              >
                                Ajouter une réponse
                              </button>

                              <button
                                type="button"
                                className="inline-block px-6 py-2 border-2 text-xs border-red-600 font-semibold text-red-600 rounded-[18px] hover:bg-red-600 hover:text-white duration-300 mt-3"
                                onClick={() =>
                                  handleDeleteQuestion(index, questionIndex)
                                }
                              >
                                Supprimer la question
                              </button>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                    <button
                      onClick={() => handleAddQuestion(index)}
                      className="inline-block px-6 py-2 text-xs border-2 border-purple-600 font-semibold text-purple-600 rounded-[18px] hover:bg-purple-600 hover:text-white duration-300 mt-3"
                    >
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
                    rows="6"
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
                className="inline-block px-6 py-2 border-2 border-red-600 font-semibold text-red-600 rounded-[18px] hover:bg-red-600 hover:text-white duration-300 mt-3"
                onClick={() => handleDeleteLesson(index)}
              >
                Supprimer la leçon
              </button>
            </div>
          ))}
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-5">
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
          </div>
          <button
            className="font-semibold bg-main-purple mt-7 rounded-full hover:bg-purple-900 text-white p-3"
            type="submit"
            onClick={handleSubmit}
          >
            Publier la formation
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditFormation;
