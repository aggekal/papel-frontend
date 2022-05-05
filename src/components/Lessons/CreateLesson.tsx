import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { getLessons } from "../../features/counter/lesson/lessonSlice";
import { CreateLessonProps } from "../../interfaces/lesson";
import { LESSON_CATEGORIES } from "../../types/selectionTypes";

const CreateLesson: React.FC<CreateLessonProps> = ({ cancel }) => {
  const initialState = {
    name: "",
    category: LESSON_CATEGORIES.BASIC_REQUIRED,
  };
  const dispatch: AppDispatch = useDispatch();
  const [details, setDetails] = useState(initialState);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(details);
    tryCreateLesson();
  };

  const tryCreateLesson = () => {
    axios({
      method: "post",
      url: "http://localhost:1337/api/lessons",
      data: details,
      headers: {
        "content-type": "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        setSuccess(true);
        dispatch(getLessons(null));
      })
      .catch(function (error) {
        console.log(error.response);
        setSuccess(false);
      });
  };
  return (
    <div className="flex flex-col m-2 justify-center font-body items-center">
      <div className="w-full border-2 border-gray-200 shadow-lg">
        <form className="flex flex-col px-4 pt-4 pb-4" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="lesson-name">Όνομα Μαθήματος</label>
            <input
              className="appearance-none border-b-2 border-black w-full py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Όνομα Μαθήματος"
              id="lesson-name"
              required
              onChange={(e) => {
                setDetails({ ...details, name: e.target.value });
              }}
              value={details.name}
            />
          </div>

          <div className="mb-6">
            <label className="flex flex-row justify-start items-center">
              <input
                type="radio"
                className="bg-gray-200 py-2 mr-4 text-gray-700 focus:outline-none focus:shadow-outline hover:cursor-pointer hover:brightness-75"
                onChange={(e) => {
                  setDetails({
                    ...details,
                    category: e.target.value as LESSON_CATEGORIES,
                  });
                }}
                value={LESSON_CATEGORIES.BASIC_REQUIRED}
                checked={details.category === LESSON_CATEGORIES.BASIC_REQUIRED}
              />
              Κορμού
            </label>
          </div>
          <div className="mb-6">
            <label className="flex flex-row justify-start items-center">
              <input
                type="radio"
                className="bg-gray-200 py-2 mr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:cursor-pointer hover:brightness-75"
                onChange={(e) => {
                  setDetails({
                    ...details,
                    category: e.target.value as LESSON_CATEGORIES,
                  });
                }}
                value={LESSON_CATEGORIES.BASIC_DIR_INF}
                checked={details.category === LESSON_CATEGORIES.BASIC_DIR_INF}
              />
              Βασικό Κατεύθυνσης Πληροφορικής
            </label>
          </div>
          <div className="mb-6">
            <label className="flex flex-row justify-start items-center">
              <input
                type="radio"
                className="bg-gray-200 py-2 mr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:cursor-pointer hover:brightness-75"
                onChange={(e) => {
                  setDetails({
                    ...details,
                    category: e.target.value as LESSON_CATEGORIES,
                  });
                }}
                value={LESSON_CATEGORIES.BASIC_DIR_TEL}
                checked={details.category === LESSON_CATEGORIES.BASIC_DIR_TEL}
              />
              Βασικό Κατεύθυνσης Τηλεπικοινωνιών
            </label>
          </div>
          <div className="mb-6">
            <label className="flex flex-row justify-start items-center">
              <input
                type="radio"
                className="bg-gray-200 py-2 mr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:cursor-pointer hover:brightness-75"
                onChange={(e) => {
                  setDetails({
                    ...details,
                    category: e.target.value as LESSON_CATEGORIES,
                  });
                }}
                value={LESSON_CATEGORIES.SELECT_DIR_INF}
                checked={details.category === LESSON_CATEGORIES.SELECT_DIR_INF}
              />
              Επιλογής Κατεύθυνσης Πληροφορικής
            </label>
          </div>
          <div className="mb-6">
            <label className="flex flex-row justify-start items-center">
              <input
                type="radio"
                className="bg-gray-200 py-2 mr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:cursor-pointer hover:brightness-75"
                onChange={(e) => {
                  setDetails({
                    ...details,
                    category: e.target.value as LESSON_CATEGORIES,
                  });
                }}
                value={LESSON_CATEGORIES.SELECT_DIR_TEL}
                checked={details.category === LESSON_CATEGORIES.SELECT_DIR_TEL}
              />
              Επιλογής Κατεύθυνσης Τηλεπικοινωνιών
            </label>
          </div>
          <div className="mb-6">
            <label className="flex flex-row justify-start items-center">
              <input
                type="radio"
                className="bg-gray-200 py-2 mr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:cursor-pointer hover:brightness-75"
                onChange={(e) => {
                  setDetails({
                    ...details,
                    category: e.target.value as LESSON_CATEGORIES,
                  });
                }}
                value={LESSON_CATEGORIES.SELECT_INF_TEL}
                checked={details.category === LESSON_CATEGORIES.SELECT_INF_TEL}
              />
              Επιλογής Κατεύθυνσης Πληροφορικής και Τηλεπικοινωνιών
            </label>
          </div>
          <div className="flex justify-end">
            <button
              className=" bg-blue-gray mx-2 rounded hover:shadow-lg outline-none focus:outline-none text-black font-bold py-2 px-4 focus:shadow-outline"
              type="submit"
              onClick={cancel}
            >
              Ακύρωση
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
  );
};

export default CreateLesson;
