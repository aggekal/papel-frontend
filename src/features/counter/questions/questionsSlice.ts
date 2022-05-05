import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../../app/store";
import {
  QuestionDeleteDetails,
  QuestionDeleteResponse,
  QuestionProps,
  QuestionRequestBody,
  QuestionsQuery,
  QuestionsResponse,
  QuestionsState,
  QuestionSuccessResponse,
} from "../../../interfaces/question";
import { ValidationErrors } from "../../../interfaces/users";
import {
  QUESTION_DIFFICULTIES,
  QUESTION_TYPES,
} from "../../../types/questionTypes";
import { getState } from "../user/userSlice";

const initialState: QuestionsState = {
  questions: [],
  questionToEdit: "",
  question: {
    description: "",
    category: QUESTION_TYPES.TF,
    time: "",
    difficulty: QUESTION_DIFFICULTIES.EASY,
    penalty: false,
    chapter: "",
    score: "",
    correctAnswers: [],
    availableAnswers: [],
  },
  isFetching: false,
  isCreateSuccess: false,
  isDeleteSuccess: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

export const getQuestions = createAsyncThunk<
  QuestionsResponse,
  QuestionsQuery,
  {
    rejectValue: ValidationErrors;
  }
>(
  "questions/getQuestions",
  async (details: { lessonId: string }, { rejectWithValue }) => {
    try {
      const userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
        const parsedUserInfo = JSON.parse(userInfo);
        const token = parsedUserInfo.accessToken;
        const refresh = parsedUserInfo.refreshToken;
        const params = {
          _id: details.lessonId,
        };
        const response = await axios({
          method: "get",
          url: `/lessons/questions/${params._id}`,
          baseURL: "http://localhost:1337/api",
          headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + token,
            "x-refresh": refresh,
          },
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
  }
);

export const createQuestion = createAsyncThunk<
  QuestionSuccessResponse,
  QuestionRequestBody,
  {
    rejectValue: ValidationErrors;
  }
>("questions/createQuestion", async (details, { rejectWithValue }) => {
  try {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo);
      const token = parsedUserInfo.accessToken;
      const refresh = parsedUserInfo.refreshToken;
      const response = await axios({
        method: "post",
        url: "questions",
        baseURL: "http://localhost:1337/api",
        data: details,
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + token,
          "x-refresh": refresh,
        },
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

/////////////////////////delete question//////////////////////////////////////
export const deleteQuestion = createAsyncThunk<
  QuestionDeleteResponse,
  QuestionDeleteDetails,
  {
    rejectValue: ValidationErrors;
  }
>("questions/deleteQuestion", async (details, { rejectWithValue }) => {
  try {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo);
      const token = parsedUserInfo.accessToken;
      const refresh = parsedUserInfo.refreshToken;
      const params = {
        _id: details.id,
      };
      const response = await axios({
        method: "delete",
        url: `http://localhost:1337/api/questions/${params._id}`,
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + token,
          "x-refresh": refresh,
        },
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
//////////////////////////////////////////////////////////////////////////////

/////edit question////////////////////////////////////////////////////////////

export const editQuestion = createAsyncThunk<
  QuestionSuccessResponse,
  QuestionRequestBody,
  {
    rejectValue: ValidationErrors;
    state: RootState;
  }
>("questions/editQuestion", async (details, { rejectWithValue, getState }) => {
  try {
    const questionsState = getState().questions;
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo);
      const token = parsedUserInfo.accessToken;
      const refresh = parsedUserInfo.refreshToken;
      const params = {
        _id: questionsState.questionToEdit,
      };
      const response = await axios({
        method: "put",
        url: `http://localhost:1337/api/questions/${params._id}`,
        data: details,
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + token,
          "x-refresh": refresh,
        },
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

////////////////////////////////////////////////////////////////////////////////////

export const questionsSlice = createSlice({
  name: "questions",
  initialState: initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.isCreateSuccess = false;
      state.isDeleteSuccess = false;
      state.question = initialState.question;
      state.questionToEdit = "";
      return state;
    },
    getQuestionsState: (state) => state,
    setQuestionToEdit: (state, { payload }) => {
      state.questionToEdit = payload;
      return state;
    },
    getQuestionById: (state) => {
      state.question =
        state.questions.find((question) => {
          if (question._id === state.questionToEdit) return true;
          return false;
        }) ?? initialState.question;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuestions.fulfilled, (state, { payload }) => {
        state.questions = payload;
        state.isFetching = false;
        state.isSuccess = true;
        return state;
      })
      .addCase(getQuestions.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        if (action.payload) state.errorMessage = action.payload.data;
      })
      .addCase(getQuestions.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(createQuestion.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.isFetching = false;
        state.isCreateSuccess = true;
        return state;
      })
      .addCase(createQuestion.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        if (action.payload) state.errorMessage = action.payload.data;
      })
      .addCase(createQuestion.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(deleteQuestion.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.isFetching = false;
        state.isDeleteSuccess = true;
        return state;
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        if (action.payload) state.errorMessage = action.payload.data;
      })
      .addCase(deleteQuestion.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(editQuestion.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.isFetching = false;
        state.isCreateSuccess = true;
        return state;
      })
      .addCase(editQuestion.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        if (action.payload) state.errorMessage = action.payload.data;
      })
      .addCase(editQuestion.pending, (state) => {
        state.isFetching = true;
      });
  },
});
export const {
  clearState,
  getQuestionsState,
  setQuestionToEdit,
  getQuestionById,
} = questionsSlice.actions;
export const questionsSelector = (state: RootState) => state.questions;
