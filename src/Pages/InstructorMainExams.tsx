import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import Button from "../components/Button";
import CreateExam from "../components/Exams/CreateExam";
import ExamOptions from "../components/Exams/ExamOptions";
import LessonsList from "../components/Lessons/LessonsList";
import { lessonsSelector } from "../features/counter/lesson/lessonSlice";
import {
  clearState,
  createExam,
  examsSelector,
  tryCreateExam,
} from "../features/counter/exam/examSlice";
import { SELECTION } from "../types/selectionTypes";
import toast from "react-hot-toast";
import RandomExam from "../components/Exams/RandomExam";
import AvailableExams from "../components/Exams/AvailableExams";

const InstructorMainExams = () => {
  const dispatch: AppDispatch = useDispatch();
  const { selectedLesson } = useSelector(lessonsSelector);
  const { errorMessage, isError, isReady, isSuccess } =
    useSelector(examsSelector);
  const [view, setView] = useState(SELECTION.ΝΟΝΕ);

  const onLessonButtonClick = () => setView(SELECTION.AVAILABLE_EXAMS);
  const handleCancel = () => {
    setView(SELECTION.AVAILABLE_EXAMS);
    dispatch(clearState());
  };
  const handleSaveExam = () => {
    setView(SELECTION.NEW_EXAM);
    dispatch(tryCreateExam());
  };

  useEffect(() => {
    if (isReady) {
      const details = {
        lessonId: selectedLesson,
      };
      dispatch(createExam(details));
    }
  }, [dispatch, isReady]);

  useEffect(() => {
    if (isError && errorMessage) {
      toast.error(errorMessage.join(","));
      dispatch(clearState());
    }
  }, [dispatch, isError]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearState());
      setView(SELECTION.AVAILABLE_EXAMS);
    }
  }, [dispatch, isSuccess]);
  return (
    <>
      <div className="grid grid-cols-5 grid-rows-16 gap-2 h-full bg-gray-200">
        <div className=" bg-white row-span-1 text-center py-2">
          Τα μαθήματά μου
        </div>
        <div className=" bg-white  col-span-3 row-span-1 text-center py-2">
          {view === SELECTION.ΝΟΝΕ && ""}
          {view === SELECTION.AVAILABLE_EXAMS &&
            `Διαθέσιμες εξετάσεις-${selectedLesson}`}
          {view === SELECTION.NEW_EXAM && "Δημιουργία νέας εξέτασης"}
          {view === SELECTION.NEW_RANDOM_EXAM && "Δημιουργία τυχαίας εξέτασης"}
          {view === SELECTION.EXAM_DETAILS && ""}
        </div>
        <div className=" bg-white  row-span-1 text-center py-2">
          {view === SELECTION.NEW_EXAM ? "Παράμετροι εξέτασης" : "Επιλογές"}
        </div>
        <div className="bg-white  col-span-1 row-span-14">
          <div className="flex flex-col h-full justify-between">
            <div className="overflow-auto overflow-x-hidden">
              <LessonsList onClick={onLessonButtonClick} />
            </div>
          </div>
        </div>
        <div className="bg-white col-span-3 row-span-14">
          {view === SELECTION.NEW_EXAM && <CreateExam />}
          {view === SELECTION.NEW_RANDOM_EXAM && <RandomExam />}
          {view === SELECTION.AVAILABLE_EXAMS && <AvailableExams />}
        </div>
        <div className="bg-white col-span-1 row-span-14">
          {view === SELECTION.AVAILABLE_EXAMS && selectedLesson && (
            <div className="flex flex-col space-y-2">
              <Button
                text="Νέα Εξέταση"
                color={"bg-blue-gray"}
                onClick={() => setView(SELECTION.NEW_EXAM)}
              />
              <Button
                text="Νέα Τυχαία Εξέταση"
                color={"bg-blue-gray"}
                onClick={() => setView(SELECTION.NEW_RANDOM_EXAM)}
              />
            </div>
          )}
          {view === SELECTION.NEW_EXAM && selectedLesson && (
            <div className="flex flex-col p-2 h-full justify-between">
              <ExamOptions />
              <div className="flex flex-col space-y-1">
                <Button
                  text="Ακύρωση"
                  color={"bg-blue-gray"}
                  onClick={() => handleCancel()}
                />
                <Button
                  text="Aποθήκευση"
                  color={"bg-blue-gray"}
                  onClick={() => handleSaveExam()}
                />
              </div>
            </div>
          )}

          {view === SELECTION.NEW_RANDOM_EXAM && selectedLesson && (
            <div className="flex flex-col h-full justify-end">
              <div className="flex flex-col space-y-1">
                <Button
                  text="Ακύρωση"
                  color={"bg-blue-gray"}
                  onClick={() => handleCancel()}
                />
                <Button
                  text="Aποθήκευση"
                  color={"bg-blue-gray"}
                  onClick={() => handleSaveExam()}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InstructorMainExams;
