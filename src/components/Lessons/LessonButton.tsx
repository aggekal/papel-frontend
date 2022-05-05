import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { LessonButtonProps } from "../../interfaces/lesson";
import { setSelectedLesson } from "../../features/counter/lesson/lessonSlice";
import { getQuestions } from "../../features/counter/questions/questionsSlice";

const LessonButton: React.FC<LessonButtonProps> = ({ name, color, id }) => {
  const dispatch: AppDispatch = useDispatch();

  const handleClick = (id: string) => {
    dispatch(setSelectedLesson(id));
    const details = { lessonId: id };
    dispatch(getQuestions(details));
  };

  return (
    <div
      id={id}
      onClick={(e) => handleClick(e.currentTarget.id)}
      className={`${color} rounded text-center m-3  hover:shadow-lg hover:brightness-75 hover:cursor-pointer text-black font-bold py-8`}
    >
      {name}
    </div>
  );
};

export default LessonButton;
