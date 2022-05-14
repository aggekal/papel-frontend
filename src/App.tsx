import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AppDispatch } from "./app/store";
import ChangePass from "./components/ChangePass";
import Forbidden from "./components/Forbidden";
import ForgotPass from "./components/ForgotPass";
import Header from "./components/Header";
import LoginForm from "./components/LoginFormx";
import NoMatch from "./components/NoMatch";
import RegisterForm from "./components/RegisterForm";
import {
  checkUserSession,
  clearState,
  getState,
  loginUser,
  userSelector,
} from "./features/counter/user/userSlice";
import InstructorMainLessons from "./Pages/InstructorMainLessons";
import StudentMain from "./Pages/StudentMain";
import { USER } from "./types/userTypes";
import "@material-tailwind/react/tailwind.css";
import InstructorMainExams from "./Pages/InstructorMainExams";
//import { Counter } from "./features/counter/Counter";

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<number | null>(null);
  const { isSuccess, isError, errorMessage, role, username, isSessionValid } =
    useSelector(userSelector);

  const Login = (details: { username: string; password: string }): void => {
    dispatch(loginUser(details));
  };
  const Register = (details: {
    name: string;
    surname: string;
    email: string;
    phone: string;
    role: USER;
    registerNumber?: string;
    username: string;
    password: string;
    passwordConfirmation: string;
  }): void => {
    setLoading(true);
    const requestData = {
      name: details.name,
      surname: details.surname,
      email: details.email,
      password: details.password,
      passwordConfirmation: details.passwordConfirmation,
      role: details.role,
      phoneNumber: details.phone,
      username: details.username,
      registerNumber: details.registerNumber,
    };
    if (requestData.registerNumber?.length === 0) {
      delete requestData.registerNumber;
    }
    axios({
      method: "post",
      url: "http://localhost:1337/api/users",
      data: requestData,
      headers: {
        "content-type": "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        setLoading(false);
        if (response.status === 200) {
          setStatus(response.status);
        }
      })
      .catch(function (error) {
        setLoading(false);
        const errorMessage = error.response.data.map(
          (error: any) => error.message + "\n"
        );
        setError(errorMessage);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      const userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
        const parsedUserInfo = JSON.parse(userInfo);
        dispatch(
          checkUserSession({
            userId: parsedUserInfo.user._id,
            accessToken: parsedUserInfo.accessToken,
            refreshToken: parsedUserInfo.refreshToken,
          })
        );
      }
    }
    if (isSessionValid) {
      if (localStorage.getItem("userInfo")) {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
          const parsedUserInfo = JSON.parse(userInfo);
          dispatch(getState(parsedUserInfo));
        }
      }
    }

    return () => {
      dispatch(clearState());
    };
  }, [dispatch, isSessionValid]);

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }
    if (isSuccess) {
      dispatch(clearState());
      if (role === USER.STUDENT) navigate("/student_main");
      if (role === USER.INSTRUCTOR) navigate("/instructor_main_lessons");
    }
  }, [dispatch, errorMessage, isError, isSuccess, navigate, role]);

  return (
    <div className="font-body h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<LoginForm Login={Login} error={error} />} />
        <Route
          path="register"
          element={
            <RegisterForm
              Register={Register}
              error={error}
              loading={loading}
              status={status}
            />
          }
        />
        <Route path="forgot_pass" element={<ForgotPass />} />
        <Route path="change_pass" element={<ChangePass />} />
        {username ? (
          <Route path="student_main" element={<StudentMain />} />
        ) : (
          <Route path="error" element={<Forbidden />} />
        )}
        {username ? (
          <Route
            path="instructor_main_lessons"
            element={<InstructorMainLessons />}
          />
        ) : (
          <Route path="error" element={<Forbidden />} />
        )}
        {username ? (
          <Route
            path="instructor_main_exams"
            element={<InstructorMainExams />}
          />
        ) : (
          <Route path="error" element={<Forbidden />} />
        )}
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
};

export default App;
