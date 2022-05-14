import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import {
  CreateQuestionProps,
  QuestionProps,
  QuestionRequestBody,
} from "../../interfaces/question";
import {
  QUESTION_DIFFICULTIES,
  QUESTION_TYPES,
} from "../../types/questionTypes";
import AvailableAnswer from "./AvailableAnswer";
import Icon from "@material-tailwind/react/Icon";
import { lessonsSelector } from "../../features/counter/lesson/lessonSlice";
import toast from "react-hot-toast";
import {
  createQuestion,
  editQuestion,
  getQuestionById,
  questionsSelector,
} from "../../features/counter/questions/questionsSlice";
import LoadingOverlay from "react-loading-overlay-ts";
import Spinner from "../Spinner";

const CreateQuestion: React.FC<CreateQuestionProps> = ({
  cancel,
  edit = false,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { selectedLesson } = useSelector(lessonsSelector);
  const { isFetching, question } = useSelector(questionsSelector);

  const initialState: QuestionProps = {
    description: "",
    category: QUESTION_TYPES.TF,
    time: "",
    chapter: "",
    difficulty: QUESTION_DIFFICULTIES.EASY,
    score: "",
    correctAnswers: [],
    availableAnswers: [],
    penalty: false,
  };

  const [details, setDetails] = useState(initialState);
  const [availableAnswer, setAvailableAnswer] = useState("");
  const [correctAnswersCount, setCorrectAnwsersCount] = useState(1);
  const [answerModalOpen, setAnswerModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ...details, lessonId: selectedLesson };
    console.log(data);
    if (validateQuestionRequestData(data)) tryCreateQuestion(data);
    else {
      toast.error("Παρακαλώ συμπληρώστε τις απαντήσεις");
      return;
    }
  };

  const clear = () => {
    setDetails(initialState);
    setCorrectAnwsersCount(1);
  };

  const isNewQuestionDisabled = () => {
    return (
      details.category === QUESTION_TYPES.TEXT ||
      (details.category === QUESTION_TYPES.TF &&
        details.availableAnswers.length >= 2)
    );
  };

  useEffect(() => {
    console.log(details.category);
    setAvailableAnswer("");
    if (details.category === QUESTION_TYPES.TEXT) {
      setCorrectAnwsersCount(0);
    } else if (
      details.category === QUESTION_TYPES.TF ||
      details.category === QUESTION_TYPES.MP1
    ) {
      setCorrectAnwsersCount(1);
    } else if (details.category === QUESTION_TYPES.MP2) {
      setCorrectAnwsersCount(20); //set to Inf
    }
  }, [details.category]);

  const tryCreateQuestion = (data: QuestionRequestBody) => {
    if (edit) {
      dispatch(editQuestion(data));
    } else {
      dispatch(createQuestion(data));
    }
  };

  const validateQuestionRequestData = (data: QuestionRequestBody): boolean => {
    if (
      data.category !== QUESTION_TYPES.TEXT &&
      (data.correctAnswers.length === 0 || data.availableAnswers.length <= 1)
    )
      return false;
    else return true;
  };

  useEffect(() => {
    if (edit) {
      dispatch(getQuestionById());
    }
  }, [dispatch, edit]);

  useEffect(() => {
    if (edit) {
      setDetails({
        description: question.description,
        category: question.category,
        time: question.time,
        chapter: question.chapter,
        difficulty: question.difficulty,
        score: question.score,
        correctAnswers: question.correctAnswers,
        availableAnswers: question.availableAnswers,
        penalty: question.penalty,
      });
    }
  }, [edit, question]);

  const handleAddCorrectAnswer = (e: React.MouseEvent) => {
    e.preventDefault();
    if (availableAnswer === "") {
      toast("H υποψήφια απάντηση δεν μπορεί να είναι κενή!");
      return;
    }
    if (details.availableAnswers.includes(availableAnswer)) {
      toast("H υποψήφια απάντηση υπάρχει ήδη");
      return;
    }
    setAnswerModal(!answerModalOpen);
    setDetails({
      ...details,
      availableAnswers: [...details.availableAnswers, availableAnswer],
    });
    setAvailableAnswer("");
  };

  const isAnswerEnabled = (answer: string): boolean => {
    return (
      details.correctAnswers.length < correctAnswersCount ||
      details.correctAnswers.includes(answer)
    );
  };

  const handleAnswerClick = (answer: string) => {
    if (details.correctAnswers.includes(answer)) {
      setDetails({
        ...details,
        correctAnswers: details.correctAnswers.filter((ans) => ans !== answer),
      });
    } else
      setDetails({
        ...details,
        correctAnswers: [...details.correctAnswers, answer],
      });
  };
  return (
    <LoadingOverlay
      active={isFetching}
      spinner={<Spinner />}
      styles={{
        overlay: (base) => ({
          ...base,
          background: "rgba(85, 89, 93, 0.2)",
        }),
      }}
      text="Παρακαλώ περιμένετε"
    >
      <div className="flex flex-col m-2 justify-center font-body items-center">
        <div className="w-full border-2 border-gray-200 shadow-lg">
          <form
            className="flex flex-col px-4 pt-4 pb-4"
            onSubmit={handleSubmit}
          >
            <div className="mb-6">
              <label htmlFor="lesson-name">Περιγραφή Ερώτησης</label>
              <textarea
                style={{ resize: "none" }}
                className="appearance-none border-b-2 border-black w-full py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Περιγραφή Ερώτησης"
                id="question-name"
                required
                onChange={(e) => {
                  setDetails({ ...details, description: e.target.value });
                }}
                value={details.description}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="question-category">Κατηγορία ερώτησης</label>
              <select
                id="question-category"
                className="bg-gray-200 rounded-sm w-full py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:cursor-pointer hover:brightness-75"
                onChange={(e) => {
                  setDetails({
                    ...details,
                    category: e.target.value as QUESTION_TYPES,
                    availableAnswers: [],
                    correctAnswers: [],
                  });
                  setAvailableAnswer("");
                }}
                value={details.category}
              >
                <option value={QUESTION_TYPES.TF}>Σωστό/Λάθος</option>
                <option value={QUESTION_TYPES.MP1}>
                  Πολλαπλής επιλογής με μία σωστή απάντηση
                </option>
                <option value={QUESTION_TYPES.MP2}>
                  Πολλαπλής επιλογής με τουλάχιστον μία σωστή απάντηση
                </option>
                <option value={QUESTION_TYPES.TEXT}>Ελεύθερου κειμένου</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="question-difficulty">Κατηγορία ερώτησης</label>
              <select
                id="question-difficulty"
                className="bg-gray-200 rounded-sm w-full py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:cursor-pointer hover:brightness-75"
                onChange={(e) => {
                  setDetails({
                    ...details,
                    difficulty: e.target.value as QUESTION_DIFFICULTIES,
                  });
                }}
                value={details.difficulty}
              >
                <option value={QUESTION_DIFFICULTIES.EASY}>Eύκολη</option>
                <option value={QUESTION_DIFFICULTIES.MEDIUM}>Μεσσαία</option>
                <option value={QUESTION_DIFFICULTIES.HARD}>Δύσκολη</option>
              </select>
            </div>
            <div className="flex justify-around">
              <div className="mb-6  flex flex-col">
                <label htmlFor="time">Μέγιστος Διαθέσιμος Χρόνος</label>
                <input
                  type="number"
                  className="appearance-none border-b-2 border-black w-full py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Χρόνος σε λεπτά"
                  id="time"
                  required
                  onChange={(e) => {
                    setDetails({ ...details, time: e.target.value });
                  }}
                  value={details.time}
                />
              </div>
              <div className="mb-6  flex flex-col">
                <label htmlFor="score">Μονάδες</label>
                <input
                  type="number"
                  className="appearance-none border-b-2 border-black w-full py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Μονάδες"
                  id="score"
                  required
                  onChange={(e) => {
                    setDetails({ ...details, score: e.target.value });
                  }}
                  value={details.score}
                />
              </div>
              <div className="mb-6 flex flex-col">
                <label htmlFor="chapter">Κεφάλαιο</label>
                <input
                  className="appearance-none border-b-2 border-black w-full py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Κεφάλαιο"
                  id="chapter"
                  required
                  onChange={(e) => {
                    setDetails({ ...details, chapter: e.target.value });
                  }}
                  value={details.chapter}
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="penalty">Αρνητική βαθμολογία</label>
              <input
                type="checkbox"
                className=" bg-gray-200 ml-6 mr-4 text-gray-700 focus:outline-none focus:shadow-outline hover:cursor-pointer"
                id="penalty"
                checked={details.penalty}
                onChange={(e) => {
                  setDetails({ ...details, penalty: !details.penalty });
                }}
              />
            </div>
            {details.availableAnswers.map((answer, index) => (
              <AvailableAnswer
                key={index}
                text={answer}
                isPressed={details.correctAnswers.includes(answer)}
                enabled={isAnswerEnabled(answer)}
                onClick={() => handleAnswerClick(answer)}
              />
            ))}
            <button
              disabled={isNewQuestionDisabled()}
              className=" bg-blue-gray w-1/3 disabled:opacity-50 rounded hover:shadow-lg outline-none focus:outline-none text-black font-bold py-2 px-4 focus:shadow-outline"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                setAnswerModal(!answerModalOpen);
              }}
            >
              + Προσθήκη Απάντησης
            </button>
            {answerModalOpen && (
              <div className="flex justify-between">
                <input
                  className="appearance-none border-b-2 border-black w-1/2 py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Πιθανή Απάντηση"
                  id="available-answer"
                  onChange={(e) => {
                    setAvailableAnswer(e.target.value);
                  }}
                  value={availableAnswer}
                />
                <button
                  className=" mx-2 rounded-sm hover:shadow-lg outline-none focus:outline-none text-black font-bold py-2 px-4 focus:shadow-outline"
                  type="submit"
                  onClick={(e) => handleAddCorrectAnswer(e)}
                >
                  <Icon name="add" size="md" />
                </button>
              </div>
            )}

            <div className="flex justify-end">
              <button
                className=" bg-blue-gray mx-2 rounded hover:shadow-lg outline-none focus:outline-none text-black font-bold py-2 px-4 focus:shadow-outline"
                type="submit"
                onClick={cancel}
              >
                Ακύρωση
              </button>
              <button
                className=" bg-blue-gray mx-2 rounded hover:shadow-lg outline-none focus:outline-none text-black font-bold py-2 px-4 focus:shadow-outline"
                type="submit"
                onClick={clear}
              >
                Καθαρισμός
              </button>

              <button
                className=" bg-blue-gray mx-2  rounded hover:shadow-lg outline-none focus:outline-none text-black font-bold py-2 px-4 focus:shadow-outline"
                type="submit"
                onSubmit={handleSubmit}
              >
                Αποστολή
              </button>
            </div>
          </form>
        </div>
      </div>
    </LoadingOverlay>
  );
};

export default CreateQuestion;
