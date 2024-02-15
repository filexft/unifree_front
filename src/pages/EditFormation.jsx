import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import NotFound from "./NotFound";
import Spinner from "../components/Spinner";
import BackRoutes from "../RoutesInterface";
import toast from "react-hot-toast";
import useFormation from "../controllers/useFormation";
import useLessons from "../controllers/useLessons";
import useQuizzs from "../controllers/useQuizzs";
import useFormationImage from "../controllers/useFormationImage";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";
import Loading from "../components/Loading";

const EditFormation = ({ Existing }) => {
  const { id } = Existing ? useParams() : { id: "" };
  
  const user = Cookies.get("token") ? jwtDecode(Cookies.get("token")) : null;
  const Navigate = useNavigate();

  const [Error,setError] = useState(false)
  const Formation = useFormation(id);
  const Lessons = useLessons(id);
  const quizzs = useQuizzs(id);

  // Ids des trucs à delete
  
  const LessonsQuizz =
    Array.isArray(Lessons) && Array.isArray(quizzs)
      ? [...Lessons, ...quizzs]
      : null;

  
  const Id = (user) ? user.Id : null;

  let FormationId;

  //loading

  const [loading, setLoading] = useState(false);
  const [init, setInit] = useState(false);
  const [initTitle,setInitTitle] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [lessons, setLessons] = useState([
    {
      title: "",
      isQuizz: false,
      content: "",
    },
  ]);

  useEffect(() => {
    if (Formation.error) {
      setError(true)
    }
    if (!user){
      setError(true)
    }
    if (!Formation.error && !Formation.loading && !initTitle) {
      setTitle(Formation.title);
      setInitTitle(true);
    }
    if (Array.isArray(LessonsQuizz) && !init) {
      setLessons(LessonsQuizz);
      setInit(true);
    }
  }, [LessonsQuizz, Formation]);

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
    const method = Existing ? 'PUT' : 'POST';
    const FormationId  = Existing ? id : ""
    const Body = Existing ? 
    {
      Categorie : category,
      AuthorId : user.Id,
      Titre : title,  
      Lessons: lessons,
      oldLessons : LessonsQuizz
    }
    :
    {
      Categorie : category,
      AuthorId : user.Id,
      Titre : title,
      Lessons:lessons 
    }
    console.log(Body)
    let res = await fetch(BackRoutes.Formations+FormationId,{
      method: method,
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify(Body)   
    })
    res = await res.json()
    console.log(res)
    return res;   
  }

  const [DataImage, setDataImage] = useState();
  const CurrentImage = useFormationImage(id);
  const [FormationImage, setFormationImage] = useState(CurrentImage);
  toast.success("test" + CurrentImage)
  useEffect(() => {
    setFormationImage(CurrentImage);
  }, [CurrentImage]);

  const handleImage = async () => {
    setLoading(true);
    if (!DataImage && FormationImage instanceof String) return;
    const imageRef = ref(storage, `images/${DataImage.name + v4()}`);
    uploadBytes(imageRef, DataImage)
      .then(async () => {
        const url = await getDownloadURL(imageRef);
        // Ajouter le fetch
        let res = await fetch(BackRoutes.Formations + id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ FormationImage: url }),
        });
        res = await res.json();
        if (res.Statut == 0) {
          throw new Error("Requete echouée");
        }
        setFormationImage(url);
      })
      .then(() => toast.success("Réussi"))
      .catch((e) => toast.error(e))
      .finally(() => setLoading(false));
    setDataImage();
  };

  const loadImageButton = (
    <>
      <label
        htmlFor="input-button"
        className="flex flex-row border bg-white hover:bg-gray-200 rounded-full px-2 py-2 font-medium cursor-pointer"
      >
        <img
          className="opacity-50"
          src={"/edit-image-icon.svg"}
          alt="Edit Image Icon"
        ></img>
      </label>
      <input
        id="input-button"
        type="file"
        name="file"
        className="hidden"
        accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .svg , .tiff|image/*"
        onChange={(e) => setDataImage(e.target.files[0])}
      />
    </>
  );

  const confirmImageChangeButton = (
    <div className="flex flex-row border border-white bg-green-500 text-white rounded-lg px-3 py-1 gap-2 font-medium">
      <img src={"/check-icon.svg"} alt="Check Icon" className=" invert"></img>
      <button onClick={handleImage}>Confirmer le changement</button>
    </div>
  );
  

  // Faire la fonction putAll

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    fetchAll()
      .then((res) => {
        if (res) {
          toast.success(
            Existing ? "Formation bien modifiée" : "Formation bien publiée"
          );
        } else toast.error( Existing ? "Modification de la formation echouée" :"Publication de la formation echouée");
      })
      .finally(() => {  
        setLoading(false);
        Navigate(`/u/${Id}`);
      });
  };

  if (Error){
    return <NotFound/>
  }

  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      {loading ? <Spinner /> : ""}
      <div className="p-5">
        <div className="text-main-purple text-xl font-bold">
          Créer une formation
        </div>
        {/* Formation image */}
        <div>
            {loading ? (
              <div className="w-44 h-44 object-cover rounded-full flex justify-center">
                <Loading width={70} height={70} />
              </div>
            ) : (
              <div className="relative">
                <div className="inline-block absolute top-0 right-0">
                  {!DataImage ? loadImageButton : confirmImageChangeButton}
                </div>
                <img
                  className="w-full h-60 object-cover "
                  src={FormationImage}
                  alt="Profile Image"
                ></img>
              </div>
            )}
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
           { Existing ? "Modifier la formation" : "Publier la formation"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditFormation;
