import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../../app/store";
import { LessonResponse, LessonState } from "../../../interfaces/lesson";
import { ValidationErrors } from "../../../interfaces/users";

const initialState: LessonState = {
  lessons: [],
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
  selectedLesson: "",
};

export const getLessons = createAsyncThunk<
  LessonResponse,
  null,
  {
    rejectValue: ValidationErrors;
  }
>("lessons/getLessons", async (_, { rejectWithValue }) => {
  try {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo);
      const token = parsedUserInfo.accessToken;
      const refresh = parsedUserInfo.refreshToken;

      const response = await axios({
        method: "get",
        url: "http://localhost:1337/api/lessons",
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

export const lessonsSlice = createSlice({
  name: "lessons",
  initialState: initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
    getLessonsState: (state) => state,
    setSelectedLesson: (state, { payload }) => {
      state.selectedLesson = payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLessons.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.lessons = payload;
        state.isFetching = false;
        return state;
      })
      .addCase(getLessons.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        if (action.payload) state.errorMessage = action.payload.data;
      })
      .addCase(getLessons.pending, (state) => {
        state.isFetching = true;
      });
  },
});
export const { clearState, getLessonsState, setSelectedLesson } =
  lessonsSlice.actions;
export const lessonsSelector = (state: RootState) => state.lessons;
