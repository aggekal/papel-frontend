import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { clearState } from "../../features/counter/questions/questionsSlice";
import { lessonsSelector } from "../../features/counter/lesson/lessonSlice";
import {
  getQuestions,
  questionsSelector,
} from "../../features/counter/questions/questionsSlice";
import {
  QUESTION_DIFFICULTIES,
  QUESTION_FILTER,
  QUESTION_TYPES,
} from "../../types/questionTypes";

const RandomExam = () => {
  const dispatch: AppDispatch = useDispatch();
  const { selectedLesson } = useSelector(lessonsSelector);

  const { isSuccess, questions, isFetching } = useSelector(questionsSelector);

  const [filter, setFilter] = useState<QUESTION_FILTER>(QUESTION_FILTER.ALL);
  const [questionCounts, setQuestionCounts] = useState({
    [QUESTION_DIFFICULTIES.EASY]: 0,
    [QUESTION_DIFFICULTIES.MEDIUM]: 0,
    [QUESTION_DIFFICULTIES.HARD]: 0,
    [QUESTION_TYPES.TF]: 0,
    [QUESTION_TYPES.MP1]: 0,
    [QUESTION_TYPES.MP2]: 0,
    [QUESTION_TYPES.TEXT]: 0,
  });

  useEffect(() => {
    getCountByFilterType();
    const details = { lessonId: selectedLesson };
    dispatch(getQuestions(details));
    dispatch(clearState());
    return () => {
      setQuestionCounts({
        [QUESTION_DIFFICULTIES.EASY]: 0,
        [QUESTION_DIFFICULTIES.MEDIUM]: 0,
        [QUESTION_DIFFICULTIES.HARD]: 0,
        [QUESTION_TYPES.TF]: 0,
        [QUESTION_TYPES.MP1]: 0,
        [QUESTION_TYPES.MP2]: 0,
        [QUESTION_TYPES.TEXT]: 0,
      });
    };
  }, []);

  const getCountByFilterType = () => {
    console.log(questions);
    questions.map((question) =>
      setQuestionCounts({
        ...questionCounts,
        [question.difficulty]: questionCounts[question.difficulty]++,
        [question.category]: questionCounts[question.category]++,
      })
    );
  };

  return (
    <div className="flex flex-col space-y-2 m-2 h-full">
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
          <div>
            <label htmlFor="easy">Εύκολες</label>
            <input
              type="number"
              className="appearance-none border-b-2 border-black w-full py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Βαθμολογία"
              id="easy"
              required
              onChange={(e) => {}}
              value={3}
            />
            {questionCounts[QUESTION_DIFFICULTIES.EASY]}
          </div>
          <div>
            <label htmlFor="medium">Μεσσαίες</label>
            <input
              type="number"
              className="appearance-none border-b-2 border-black w-full py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Βαθμολογία"
              id="medium"
              required
              onChange={(e) => {}}
              value={3}
            />
            {questionCounts[QUESTION_DIFFICULTIES.MEDIUM]}
          </div>
          <div>
            <label htmlFor="hard">Δύσκολες</label>
            <input
              type="number"
              className="appearance-none border-b-2 border-black w-full py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Βαθμολογία"
              id="hard"
              required
              onChange={(e) => {}}
              value={3}
            />
          </div>
          {questionCounts[QUESTION_DIFFICULTIES.HARD]}
        </div>
      )}

      {filter === QUESTION_FILTER.CATEGORY && (
        <div className="mb-6 flex flex-col space-y-2 w-1/2">
          <div>
            <label htmlFor="TF">Σωστό/Λάθος</label>
            <input
              type="number"
              className="appearance-none border-b-2 border-black w-full py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Αριθμός ερωτήσεων"
              id="TF"
              required
              onChange={(e) => {}}
              value={3}
            />
            {questionCounts[QUESTION_TYPES.TF]}
          </div>
          <div>
            <label htmlFor="MP1">
              Πολλαπλής επιλογής με μια σωστή απάντηση
            </label>
            <input
              type="number"
              className="appearance-none border-b-2 border-black w-full py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Αριθμός ερωτήσεων"
              id="MP1"
              required
              onChange={(e) => {}}
              value={3}
            />
            {questionCounts[QUESTION_TYPES.MP1]}
          </div>
          <div>
            <label htmlFor="MP2">
              Πολλαπλής επιλογής με μια ή παραπάνω σωστές απαντήσεις
            </label>
            <input
              type="number"
              className="appearance-none border-b-2 border-black w-full py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Αριθμός ερωτήσεων"
              id="MP2"
              required
              onChange={(e) => {}}
              value={3}
            />
            {questionCounts[QUESTION_TYPES.MP2]}
          </div>
          <div>
            <label htmlFor="TEXT">Ελεύθερου κειμένου</label>
            <input
              type="number"
              className="appearance-none border-b-2 border-black w-full py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Αριθμός ερωτήσεων"
              id="TEXT"
              required
              onChange={(e) => {}}
              value={3}
            />
            {questionCounts[QUESTION_TYPES.TEXT]}
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomExam;
