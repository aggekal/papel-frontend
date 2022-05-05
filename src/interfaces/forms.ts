import { USER } from "../types/userTypes";

export interface LoginProps {
  Login: (details: { username: string; password: string }) => void;
  error: string | null;
}

export interface RegisterProps {
  Register: (details: {
    name: string;
    surname: string;
    email: string;
    phone: string;
    role: USER;
    registerNumber?: string;
    username: string;
    password: string;
    passwordConfirmation: string;
  }) => void;
  error: string | null;
  loading: boolean;
  status: number | null;
}
