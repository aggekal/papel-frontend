import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import {
  deleteQuestion,
  questionsSelector,
  setQuestionToEdit,
} from "../../features/counter/questions/questionsSlice";
import Button from "../Button";

interface QuestionItemProps {
  description: string;
  _id: string | undefined;
}
const QuestionItem: React.FC<QuestionItemProps> = ({ description, _id }) => {
  const dispatch: AppDispatch = useDispatch();
  const { isFetching, isCreateSuccess, questions } =
    useSelector(questionsSelector);

  const handleDeleteClick = () => {
    if (!_id) return;
    const details = {
      id: _id,
    };
    dispatch(deleteQuestion(details));
  };

  const handleEditClick = () => {
    if (!_id) return;
    console.log("edit", _id);
    dispatch(setQuestionToEdit(_id));
  };

  return (
    <div className="bg-blue-gray rounded-md flex flex-col p-2 mb-4 m-2">
      <div>{description}</div>
      <div className="flex px-2 justify-end">
        <Button
          color="bg-misty-blue"
          text="Επεξεργασία"
          onClick={() => handleEditClick()}
        />
        <Button
          color="bg-misty-blue"
          text="Διαγραφή"
          onClick={() => handleDeleteClick()}
        />
      </div>
    </div>
  );
};

export default QuestionItem;
