import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ChangePass = () => {
  const initialState = {
    oldPassword: "",
    password: "",
    passwordConfirmation: "",
  };
  const [details, setDetails] = useState(initialState);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    changePass(details);
  };

  const changePass = (details: {
    oldPassword: string;
    password: string;
    passwordConfirmation: string;
  }) => {
    const dataToSend = {
      ...details,
      email: "asdfgh@uop.gr", //from redux
    };
    axios({
      method: "put",
      url: "http://localhost:1337/api/users/changepass",
      data: dataToSend,
    })
      .then(function (response) {
        console.log(response);
        setSuccess(true);
      })
      .catch(function (error) {
        console.log(error.response);
        setSuccess(false);
        setError(error.response.data[0].message);
      });
  };

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  return (
    <div className="flex flex-col h-screen justify-center font-body items-center">
      <div className="w-full border-2 border-gray-200 shadow-lg max-w-lg">
        <form className="flex flex-col px-4 pt-4 pb-4" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="old-pass">Εισάγετε τον παλιό σας κωδικό</label>
            <input
              className="appearance-none border-b-2 border-black w-full py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Παλιός κωδικός"
              id="old-pass"
              required
              onChange={(e) => {
                setDetails({ ...details, oldPassword: e.target.value });
              }}
              value={details.oldPassword}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="new-pass">
              Εισάγετε τον νέο σας κωδικό. (Θα πρέπει να είναι από 5-15
              χαρακτήρες)
            </label>
            <input
              className="appearance-none border-b-2 border-black w-full py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Νέος κωδικός"
              type="password"
              id="new-pass"
              required
              onChange={(e) => {
                setDetails({ ...details, password: e.target.value });
              }}
              value={details.password}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="pass-conf">Εισάγετε τον παλιό σας κωδικό</label>
            <input
              className="appearance-none border-b-2 border-black w-full py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Επιβεβαίωση κωδικού"
              type="password"
              id="pass-conf"
              required
              onChange={(e) => {
                setDetails({
                  ...details,
                  passwordConfirmation: e.target.value,
                });
              }}
              value={details.passwordConfirmation}
            />
          </div>
          <button
            className="self-end bg-blue-gray hover:shadow-lg outline-none focus:outline-none text-black font-bold py-2 px-4 focus:shadow-outline"
            type="submit"
            onSubmit={handleSubmit}
          >
            Αλλαγή Κωδικού
          </button>
        </form>
      </div>
      {success && (
        <div className=" pt-10 w-full mb-3 text-center">
          O κωδικός σας έχει αλλάξει πατήστε
          {"   "}
          <span
            onClick={() => navigate("/", { replace: true })}
            className="hover:underline hover:cursor-pointer font-bold"
          >
            εδώ{" "}
          </span>
          για να εισέλθετε στο σύστημα
        </div>
      )}
    </div>
  );
};

export default ChangePass;
