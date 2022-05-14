import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import {
  addQuestion,
  examsSelector,
} from "../../features/counter/exam/examSlice";
import { QUESTION_TYPES } from "../../types/questionTypes";
interface QuestionPreviewProps {
  id: string;
  description: string;
  category: string;
  score: string;
  time: string;
  onClick?: () => void;
}
const QuestionPreview: React.FC<QuestionPreviewProps> = ({
  id,
  description,
  category,
  score,
  time,
  onClick,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { questions } = useSelector(examsSelector);

  const isSelected = () => {
    return questions.includes(id);
  };

  const [selected, setSelected] = useState<boolean>(isSelected());

  const handleSelect = (e: React.MouseEvent) => {
    setSelected(!selected);
    dispatch(addQuestion({ id: e.currentTarget.id }));
  };

  return (
    <div className="flex space-x-3 items-center">
      <div
        id={id}
        onClick={(e) => handleSelect(e)}
        className={` w-8  h-8 rounded-full flex-shrink-0 hover:cursor-pointer border border-misty-blue-dark ${
          selected ? "bg-misty-blue-dark" : "bg-white"
        }`}
      ></div>
      <div className="bg-blue-gray rounded-md flex flex-col p-2 m-2 w-full">
        <div className="flex flex-col px-2 justify-end">
          <div>{description}</div>
          <div className=" text-sm">
            <div>
              Κατηγορία: {category === QUESTION_TYPES.TF && "Σωστό/Λάθος"}
              {category === QUESTION_TYPES.MP1 &&
                "Πολλαπλής επιλογής με μια σωστή"}
              {category === QUESTION_TYPES.MP2 &&
                "Πολλαπλής επιλογής με μια ή παραπάνω σωστές"}
              {category === QUESTION_TYPES.TEXT && "Ελεύθερου κειμένου"}
            </div>
            <div>Μονάδες: {score}</div>
            <div>Μέγιστος χρόνος: {time}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionPreview;
