import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "../../../app/store";
import {
  CreateExamResponse,
  ExamInput,
  ExamState,
} from "../../../interfaces/exams";
import { ValidationErrors } from "../../../interfaces/exams";
import { EXAM_STATUS } from "../../../types/examTypes";

const initialState: ExamState = {
  questions: [],
  isReady: false,
  start: "",
  maxScore: "",
  status: EXAM_STATUS.NOT_STARTED,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: [],
};

export const createExam = createAsyncThunk<
  CreateExamResponse,
  ExamInput,
  {
    rejectValue: ValidationErrors;
    state: RootState;
  }
>("exams/createExam", async (details, { rejectWithValue, getState }) => {
  try {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo);
      const token = parsedUserInfo.accessToken;
      const refresh = parsedUserInfo.refreshToken;
      const examState = getState().exams;
      const toSend = {
        lessonId: details.lessonId,
        status: examState.status,
        maxScore: examState.maxScore,
        startDate: examState.start,
        questions: examState.questions,
      };
      const response = await axios({
        method: "post",
        url: "http://localhost:1337/api/exams",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + token,
          "x-refresh": refresh,
        },
        data: toSend,
      });

      const data = response.data;
      if (response.status === 200) {
        return data;
      } else {
        return rejectWithValue({ data: response.data } as ValidationErrors);
      }
    }
  } catch (e: any) {
    console.log("Error", e.response.data);
    return rejectWithValue({ data: e.response.data } as ValidationErrors);
  }
});

export const examsSlice = createSlice({
  name: "exams",
  initialState: initialState,
  reducers: {
    clearState: (state) => {
      state.status = initialState.status;
      state.questions = initialState.questions;
      state.maxScore = initialState.maxScore;
      state.start = initialState.start;
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.isReady = false;
      state.errorMessage = [];
      return state;
    },
    addQuestion: (state, { payload }) => {
      if (!state.questions.includes(payload.id)) {
        state.questions.push(payload.id);
      } else {
        state.questions = state.questions.filter(
          (question) => question !== payload.id
        );
      }
      return state;
    },
    addOptions: (state, { payload }) => {
      state.start = payload.start;
      state.maxScore = payload.maxScore;
      return state;
    },
    tryCreateExam: (state) => {
      if (state.questions.length === 0) {
        state.isError = true;
        state.errorMessage.push("Παρακαλώ εισάγετε ερωτήσεις");
        return state;
      }
      state.isReady = true;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createExam.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.isFetching = false;
        state.isReady = false;
        state.isSuccess = true;
        return state;
      })
      .addCase(createExam.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        if (action.payload) {
          state.errorMessage = action.payload.data.map(
            (error: any) => error.message + "\n"
          );
        }
      })
      .addCase(createExam.pending, (state) => {
        state.isFetching = true;
      });
  },
});
export const { clearState, addQuestion, addOptions, tryCreateExam } =
  examsSlice.actions;
export const examsSelector = (state: RootState) => state.exams;
