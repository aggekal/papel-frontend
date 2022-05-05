import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import {
  clearState,
  getLessons,
  lessonsSelector,
} from "../../features/counter/lesson/lessonSlice";
import { LessonListProps } from "../../interfaces/lesson";
import Spinner from "../Spinner";
import LessonButton from "./LessonButton";

const LessonsList: React.FC<LessonListProps> = ({ onClick }) => {
  const dispatch: AppDispatch = useDispatch();
  const { lessons, isFetching, isError, errorMessage, selectedLesson } =
    useSelector(lessonsSelector);

  useEffect(() => {
    dispatch(getLessons(null));
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }
  }, [dispatch, errorMessage, isError]);

  return (
    <div onClick={(e) => onClick(e)}>
      {lessons.map((lesson) => (
        <LessonButton
          id={lesson._id}
          key={lesson._id}
          name={lesson.name}
          color={
            selectedLesson === lesson._id ? "bg-blue-grotto" : "bg-blue-gray"
          }
        />
      ))}
      {isFetching && <Spinner />}
    </div>
  );
};

export default LessonsList;
