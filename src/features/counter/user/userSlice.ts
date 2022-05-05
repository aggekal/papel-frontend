import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../../app/store";
import {
  Details,
  SessionQuery,
  SessionResponse,
  UserProps,
  UserResponse,
  ValidationErrors,
} from "../../../interfaces/users";

const initialState: UserProps = {
  username: "",
  email: "",
  id: "",
  accessToken: "",
  refreshToken: "",
  role: "",
  phoneNumber: "",
  registerNumber: "",
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
  isFetchingSession: false,
  isSessionValid: false,
  isErrorSession: false,
  errorMessageSession: "",
};

export const loginUser = createAsyncThunk<
  UserResponse,
  Details,
  {
    rejectValue: ValidationErrors;
  }
>(
  "users/login",
  async (
    details: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:1337/api/sessions",
        data: details,
      });
      const data = response.data;
      if (response.status === 200) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        return data;
      } else {
        console.log(response);
        return rejectWithValue({ data: response.data } as ValidationErrors);
      }
    } catch (e: any) {
      console.log("Error", e.response.data);
      return rejectWithValue({ data: e.response.data } as ValidationErrors);
    }
  }
);

export const checkUserSession = createAsyncThunk<
  SessionResponse,
  SessionQuery,
  {
    rejectValue: ValidationErrors;
  }
>(
  "users/session",
  async (
    details: { userId: string; accessToken: string; refreshToken: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:1337/api/sessions",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + details.accessToken,
          "x-refresh": details.refreshToken,
        },
      });
      const data = response.data;
      if (response.status === 200) {
        return data;
      } else {
        console.log(response);
        return rejectWithValue({ data: response.data } as ValidationErrors);
      }
    } catch (e: any) {
      console.log("Error", e.response.data);
      return rejectWithValue({ data: e.response.data } as ValidationErrors);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
    getState: (state, { payload }) => {
      state.email = payload.user.email;
      state.username = payload.user.username;
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      state.id = payload.user.id;
      state.role = payload.user.role;
      if (payload.user.registerNumber)
        state.registerNumber = payload.user.registerNumber;
      state.isFetching = false;
      state.isSuccess = true;
    },
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.email = payload.user.email;
        state.username = payload.user.username;
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
        state.id = payload.user.id;
        state.role = payload.user.role;
        if (payload.user.registerNumber)
          state.registerNumber = payload.user.registerNumber;
        state.isFetching = false;
        state.isSuccess = true;
        return state;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        if (action.payload) state.errorMessage = action.payload.data;
      })
      .addCase(loginUser.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(checkUserSession.fulfilled, (state, { payload }) => {
        if (payload[payload.length - 1].valid) state.isSessionValid = true;
        state.isFetchingSession = false;
        return state;
      })
      .addCase(checkUserSession.rejected, (state, action) => {
        state.isFetchingSession = false;
        state.isErrorSession = true;
        if (action.payload) state.errorMessageSession = action.payload.data;
      })
      .addCase(checkUserSession.pending, (state) => {
        state.isFetchingSession = true;
      });
  },
});
export const { clearState, getState, logout } = userSlice.actions;
export const userSelector = (state: RootState) => state.user;
