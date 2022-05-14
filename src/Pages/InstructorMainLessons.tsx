import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import { lessonsSelector } from "../features/counter/lesson/lessonSlice";
import Button from "../components/Button";
import CreateLesson from "../components/Lessons/CreateLesson";
import LessonsList from "../components/Lessons/LessonsList";
import { SELECTION } from "../types/selectionTypes";
import CreateQuestion from "../components/Questions/CreateQuestion";
import {
  clearState,
  getQuestions,
  questionsSelector,
  setQuestionToEdit,
} from "../features/counter/questions/questionsSlice";
import toast from "react-hot-toast";
import QuestionItem from "../components/Questions/QuestionItem";
import Spinner from "../components/Spinner";

const InstructorMainLessons: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    isError,
    errorMessage,
    isCreateSuccess,
    questions,
    isDeleteSuccess,
    questionToEdit,
    isFetching,
  } = useSelector(questionsSelector);
  const { selectedLesson } = useSelector(lessonsSelector);
  const [view, setView] = useState(SELECTION.LESSON_DETAILS);

  const cancel = () => {
    setView(SELECTION.LESSON_DETAILS);
    dispatch(clearState());
  };
  const onLessonButtonClick = () => setView(SELECTION.LESSON_DETAILS);

  useEffect(() => {
    if (isCreateSuccess) {
      toast.success("Επιτυχής δημιουργία ερώτησης!");
      setView(SELECTION.LESSON_DETAILS);
      const details = { lessonId: selectedLesson };
      dispatch(getQuestions(details));
      dispatch(clearState());
    }
  }, [dispatch, isCreateSuccess, selectedLesson]);

  useEffect(() => {
    if (isDeleteSuccess) {
      const details = { lessonId: selectedLesson };
      dispatch(getQuestions(details));
      dispatch(clearState());
    }
  }, [dispatch, isDeleteSuccess, selectedLesson]);

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }
  }, [dispatch, errorMessage, isError]);

  useEffect(() => {
    if (questionToEdit !== "") {
      setView(SELECTION.EDIT_QUESTION);
    }
  }, [dispatch, questionToEdit]);

  return (
    <>
      <div className="grid grid-cols-5 grid-rows-16 gap-2 h-full bg-gray-200">
        <div className=" bg-white row-span-1 text-center py-2">
          Τα μαθήματά μου
        </div>
        <div className=" bg-white  col-span-3 row-span-1 text-center py-2">
          {view === SELECTION.LESSON_DETAILS && "Διαθέσιμες ερωτήσεις"}
          {view === SELECTION.NEW_LESSON && "Δημιουργία Μαθήματος"}
          {view === SELECTION.NEW_QUESTION && "Δημιουργία Ερώτησης"}
          {view === SELECTION.EDIT_QUESTION && "Επεξεργασία Ερώτησης"}
        </div>
        <div className=" bg-white  row-span-1 text-center py-2">Επιλογές</div>
        <div className="bg-white  col-span-1 row-span-14">
          <div className="flex flex-col h-full justify-between">
            <div className="overflow-auto overflow-x-hidden">
              <LessonsList onClick={onLessonButtonClick} />
            </div>
            <div className="border-t-2 border-t-blue-gray">
              <Button
                text="Νέο Μάθημα"
                color={"bg-blue-gray"}
                onClick={() => setView(SELECTION.NEW_LESSON)}
              />
            </div>
          </div>
        </div>
        <div className="bg-white col-span-3 row-span-14">
          {view === SELECTION.LESSON_DETAILS &&
            questions.map((q) => {
              return (
                <QuestionItem
                  key={q._id}
                  _id={q._id}
                  description={q.description}
                />
              );
            })}
          {view === SELECTION.NEW_LESSON && <CreateLesson cancel={cancel} />}
          {view === SELECTION.NEW_QUESTION && (
            <CreateQuestion cancel={cancel} edit={false} />
          )}
          {view === SELECTION.EDIT_QUESTION && (
            <CreateQuestion cancel={cancel} edit={true} />
          )}
          {isFetching && <Spinner />}
        </div>
        <div className="bg-white col-span-1 row-span-14">
          {view === SELECTION.LESSON_DETAILS && selectedLesson && (
            <Button
              text="Νέα Ερώτηση"
              color={"bg-blue-gray"}
              onClick={() => setView(SELECTION.NEW_QUESTION)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default InstructorMainLessons;
