import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { RegisterProps } from "../interfaces/forms";
import { USER } from "../types/userTypes";
import Spinner from "./Spinner";

const RegisterForm: React.FC<RegisterProps> = ({
  Register,
  error,
  loading,
  status = null,
}) => {
  const initialState = {
    name: "",
    surname: "",
    email: "",
    phone: "",
    username: "",
    registerNumber: "",
    password: "",
    role: USER.STUDENT,
    passwordConfirmation: "",
  };
  const [details, setDetails] = useState(initialState);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Register(details);
  };

  const clearForm = () => {
    setDetails(initialState);
  };

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  return (
    <div className="flex flex-col h-screen justify-center font-body items-center">
      {loading && <Spinner />}
      {status === 200 && (
        <div className="w-full mb-3 text-center">
          Η δημιουργία νέου χρήστη ολοκληρώθηκε με επιτυχία! Πατήστε{" "}
          <div
            onClick={() => navigate("/", { replace: true })}
            className="hover:underline hover:cursor-pointer font-bold"
          >
            εδώ
          </div>{" "}
          για να εισέλθετε στο σύστημα.
        </div>
      )}
      <div className="w-full max-w-xs border-2 border-gray-200 shadow-lg">
        <form className="flex flex-col px-4 pt-4 pb-4" onSubmit={handleSubmit}>
          <div className="mb-6">
            <input
              className="appearance-none border-b-2 border-black w-full py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              placeholder="Όνομα"
              required
              onChange={(e) => {
                setDetails({ ...details, name: e.target.value });
              }}
              value={details.name}
            />
          </div>
          <div className="mb-6">
            <input
              className="appearance-none border-b-2 border-black w-full py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="surname"
              placeholder="Επώνυμο"
              required
              onChange={(e) => {
                setDetails({ ...details, surname: e.target.value });
              }}
              value={details.surname}
            />
          </div>
          <div className="mb-6">
            <input
              className="appearance-none border-b-2 border-black w-full py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              placeholder="Διεύθυνση Ηλ. Ταχυδρομίου"
              required
              onChange={(e) => {
                setDetails({ ...details, email: e.target.value });
              }}
              value={details.email}
            />
          </div>
          <div className="mb-6">
            <select
              className="bg-gray-200 rounded-sm w-full py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:cursor-pointer hover:brightness-75"
              onChange={(e) => {
                setDetails({ ...details, role: e.target.value as USER });
              }}
              defaultValue={USER.STUDENT}
            >
              <option value={USER.STUDENT}>Φοιτητής</option>
              <option value={USER.INSTRUCTOR}>Καθηγητής</option>
            </select>
          </div>
          {details.role === USER.STUDENT && (
            <div className="mb-6">
              <input
                className="appearance-none border-b-2 border-black w-full py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="registerNumber"
                placeholder="Αριθμός Μητρώου"
                required
                onChange={(e) => {
                  setDetails({ ...details, registerNumber: e.target.value });
                }}
                value={details.registerNumber}
              />
            </div>
          )}
          <div className="mb-6">
            <input
              className="appearance-none border-b-2 border-black w-full py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              placeholder="Αριθμός Τηλεφώνου"
              required
              onChange={(e) => {
                setDetails({ ...details, phone: e.target.value });
              }}
              value={details.phone}
            />
          </div>
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
          <div className="mb-6">
            <input
              className="appearance-none border-b-2 border-black w-full py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="passwordConfirmation"
              type="password"
              placeholder="Επαλήθευση Κωδικού"
              required
              onChange={(e) =>
                setDetails({ ...details, passwordConfirmation: e.target.value })
              }
              value={details.passwordConfirmation}
            />
          </div>
          <div className="flex justify-between">
            <button
              className="self-end bg-blue-gray hover:shadow-lg outline-none focus:outline-none text-black font-bold py-2 px-4 focus:shadow-outline"
              type="submit"
              onClick={clearForm}
            >
              Καθαρισμός
            </button>
            <button
              className="self-end bg-blue-gray hover:shadow-lg outline-none focus:outline-none text-black font-bold py-2 px-4 focus:shadow-outline"
              type="submit"
              onSubmit={handleSubmit}
            >
              Εγγραφή
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
