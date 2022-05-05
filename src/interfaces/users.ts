import { USER } from "../types/userTypes";

export interface UserProps {
  username: string;
  email: string;
  id: string;
  role: string;
  phoneNumber: string;
  registerNumber?: string;
  accessToken: string;
  refreshToken: string;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
  isFetchingSession: boolean;
  isSessionValid: boolean;
  isErrorSession: boolean;
  errorMessageSession: string;
}

export interface ValidationErrors {
  data: string;
  field_errors: Record<string, string>;
}

export interface Details {
  username: string;
  password: string;
}

export interface UserResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    username: string;
    surname: string;
    email: string;
    role: USER;
    phoneNumber: string;
    registerNumber?: string;
  };
}

export interface SessionResponse extends Array<SessionInfo> {}

export interface SessionInfo {
  id: string;
  valid: boolean;
  user: string;
}

export interface SessionQuery {
  userId: string;
  accessToken: string;
  refreshToken: string;
}
