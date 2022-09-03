import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import {
  examsSelector,
  getExamsPerLesson,
} from "../../features/counter/exam/examSlice";
import { lessonsSelector } from "../../features/counter/lesson/lessonSlice";

const AvailableExams = () => {
  const dispatch: AppDispatch = useDispatch();
  const { availableExams } = useSelector(examsSelector);
  const { selectedLesson } = useSelector(lessonsSelector);
  React.useEffect(() => {
    dispatch(getExamsPerLesson(selectedLesson));
  }, [dispatch, selectedLesson]);
  return <div>Εξετάσεις</div>;
};

export default AvailableExams;
