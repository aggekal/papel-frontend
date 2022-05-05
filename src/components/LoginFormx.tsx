import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userSelector } from "../features/counter/user/userSlice";
import { LoginProps } from "../interfaces/forms";
import Spinner from "./Spinner";

const LoginForm: React.FC<LoginProps> = ({ Login, error = null }) => {
  const { isFetching } = useSelector(userSelector);
  const [details, setDetails] = useState({ username: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Login(details);
  };

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  return (
    <div className="flex flex-col h-screen justify-center font-body items-center">
      {isFetching && <Spinner />}
      <div className="w-full max-w-xs border-2 border-gray-200 shadow-lg">
        <form className="flex flex-col px-4 pt-4 pb-4" onSubmit={handleSubmit}>
          <div className="mb-6">
            <input
              className="appearance-none border-b-2 border-black w-full py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              placeholder="Όνομα χρήστη"
              required
              onChange={(e) => {
                setDetails({ ...details, username: e.target.value });
              }}
              value={details.username}
            />
          </div>
          <div className="mb-6">
            <input
              className="appearance-none border-b-2 border-black w-full py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Κωδικός"
              required
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              value={details.password}
            />
          </div>

          <button
            className="self-end bg-blue-gray hover:shadow-lg outline-none focus:outline-none text-black font-bold py-2 px-4 focus:shadow-outline"
            type="submit"
            onSubmit={handleSubmit}
          >
            Είσοδος
          </button>
        </form>
      </div>
      <div className="mt-5 flex flex-col items-center">
        <Link to="/register">
          <div className="hover:underline hover:cursor-pointer">
            Δημιουργία Χρήστη
          </div>
        </Link>
        <Link to="/forgot_pass">
          <div className="hover:underline hover:cursor-pointer">
            Ξεχάσατε τον κωδικό σας;
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
