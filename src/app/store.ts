import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { examsSlice } from "../features/counter/exam/examSlice";
import { lessonsSlice } from "../features/counter/lesson/lessonSlice";
import { questionsSlice } from "../features/counter/questions/questionsSlice";

import { userSlice } from "../features/counter/user/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userSlice.reducer,
    lessons: lessonsSlice.reducer,
    questions: questionsSlice.reducer,
    exams: examsSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
