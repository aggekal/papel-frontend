import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { addOptions } from "../../features/counter/exam/examSlice";
import { getDateToday } from "../../utils/dateUtils";

const ExamOptions = () => {
  const dispatch: AppDispatch = useDispatch();
  const initialState = {
    maxScore: 10,
    start: getDateToday(),
  };
  const [details, setDetails] = useState(initialState);

  useEffect(() => {
    dispatch(addOptions({ start: details.start, maxScore: details.maxScore }));
  }, [details.maxScore, details.start, dispatch]);

  return (
    <div className="flex flex-col space-y-2 m-2">
      <div>
        <label htmlFor="max_score">
          Μέγιστη Βαθμόλογια <small>(Πάνω από 10 θεωρείται μπόνους)</small>
        </label>
        <input
          type="number"
          className="appearance-none border-b-2 border-black w-full py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Βαθμολογία"
          id="max_score"
          required
          onChange={(e) => {
            setDetails({ ...details, maxScore: parseInt(e.target.value) });
          }}
          value={details.maxScore}
        />
      </div>
      <div>
        <label htmlFor="start">Ημερομηνία έναρξης</label>
        <input
          type="datetime-local"
          className="appearance-none border-b-2 border-black w-full py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Βαθμολογία"
          id="start"
          min={getDateToday()}
          required
          onChange={(e) => {
            console.log(e.target.value);
            setDetails({ ...details, start: e.target.value });
          }}
          value={details.start}
        />
      </div>
    </div>
  );
};

export default ExamOptions;
