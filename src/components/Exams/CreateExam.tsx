import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { lessonsSelector } from "../../features/counter/lesson/lessonSlice";
import { clearState as clearQuestionState } from "../../features/counter/questions/questionsSlice";
import { clearState as clearExamState } from "../../features/counter/exam/examSlice";

import {
  getQuestions,
  getQuestionsByFilter,
  questionsSelector,
} from "../../features/counter/questions/questionsSlice";
import {
  QUESTION_DIFFICULTIES,
  QUESTION_FILTER,
  QUESTION_TYPES,
} from "../../types/questionTypes";
import QuestionPreview from "../Questions/QuestionPreview";
import Spinner from "../Spinner";

const CreateExam = () => {
  const [filter, setFilter] = useState<QUESTION_FILTER>(QUESTION_FILTER.ALL);
  const [categoryFilter, setCategoryFilterType] = useState<QUESTION_TYPES | "">(
    ""
  );
  const [difficultyFilter, setDifficultyFilterType] = useState<
    QUESTION_DIFFICULTIES | ""
  >("");

  const dispatch: AppDispatch = useDispatch();
  const { selectedLesson } = useSelector(lessonsSelector);
  const { isSuccess, questions, isFetching } = useSelector(questionsSelector);

  useEffect(() => {
    if (filter === QUESTION_FILTER.ALL) {
      const details = { lessonId: selectedLesson };
      dispatch(getQuestions(details));
    }
  }, [dispatch, filter]);

  useEffect(() => {
    if (isSuccess) dispatch(clearQuestionState());
  }, [dispatch, isSuccess]);

  useEffect(() => {
    const details = {
      lessonId: selectedLesson,
      filter: filter,
      category: categoryFilter,
      difficulty: difficultyFilter,
    };
    dispatch(getQuestionsByFilter(details));
  }, [difficultyFilter, categoryFilter]);

  return (
    <div className="flex flex-col space-y-2 m-2 h-full">
      <div className="flex">
        <div className="mb-6 flex flex-col space-y-2 w-1/2">
          <label htmlFor="question-filter">Φίλτρο ερωτήσεων</label>
          <select
            id="question-filter"
            className="bg-gray-200 rounded-sm  py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:cursor-pointer hover:brightness-75"
            onChange={(e) => {
              setFilter(e.target.value as QUESTION_FILTER);
            }}
            value={filter}
          >
            <option value={QUESTION_FILTER.ALL}>Όλες οι ερωτήσεις</option>
            <option value={QUESTION_FILTER.DIFFICULTY}>Δυσκολία</option>
            <option value={QUESTION_FILTER.CATEGORY}>Κατηγορία</option>
          </select>
        </div>
        {filter === QUESTION_FILTER.DIFFICULTY && (
          <div className="mb-6 flex flex-col space-y-2 w-1/2">
            <label htmlFor="question-difficulty">Δυσκολία</label>
            <select
              id="question-difficulty"
              className="bg-gray-200 rounded-sm py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:cursor-pointer hover:brightness-75"
              onChange={(e) => {
                setDifficultyFilterType(
                  e.target.value as QUESTION_DIFFICULTIES
                );
                setCategoryFilterType("");
              }}
              value={difficultyFilter}
            >
              <option value={QUESTION_DIFFICULTIES.EASY}>Εύκολες</option>
              <option value={QUESTION_DIFFICULTIES.MEDIUM}>Μεσσαίες</option>
              <option value={QUESTION_DIFFICULTIES.HARD}>Δύσκολες</option>
            </select>
          </div>
        )}

        {filter === QUESTION_FILTER.CATEGORY && (
          <div className="mb-6 flex flex-col space-y-2 w-1/2">
            <label htmlFor="question-cat">Κατηγορία</label>
            <select
              id="question-cat"
              className="bg-gray-200 rounded-sm py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:cursor-pointer hover:brightness-75"
              onChange={(e) => {
                setCategoryFilterType(e.target.value as QUESTION_TYPES);
                setDifficultyFilterType("");
              }}
              value={categoryFilter}
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
        )}
      </div>
      {isFetching && <Spinner />}
      <div className="flex flex-col  justify-between h-5/6">
        <div className="overflow-auto overflow-x-hidden height-3/6 ">
          <h2>Διαθέσιμες ερωτήσεις</h2>
          {questions.map((question) => (
            <QuestionPreview
              key={question._id!}
              id={question._id!}
              description={question.description}
              category={question.category}
              score={question.score}
              time={question.time}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateExam;
