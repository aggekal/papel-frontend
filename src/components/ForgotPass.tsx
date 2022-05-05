import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPass: React.FC = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    changePassAndSendEmail(email);
  };

  const changePassAndSendEmail = (email: string) => {
    axios({
      method: "put",
      url: "http://localhost:1337/api/users/forgotpass",
      data: { email },
      headers: {
        "content-type": "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        setSuccess(true);
      })
      .catch(function (error) {
        console.log(error.response);
        setSuccess(false);
      });
  };

  return (
    <div className="flex flex-col h-screen justify-center font-body items-center">
      <div className="w-full border-2 border-gray-200 shadow-lg max-w-lg">
        <form className="flex flex-col px-4 pt-4 pb-4" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="forgot-email">
              Εισάγετε τη διεύθυνση ηλεκτρονικού ταχυδρομίου του λογαριασμού
              σας. Θα σας σταλεί ο προσωρινός κωδικός. Πατήστε εδώ για να
              ορίσετε το νέο σας κωδικό.
            </label>
            <input
              className="appearance-none border-b-2 border-black w-full py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="forgot-email"
              placeholder="Διεύθυνση Ηλεκτρονικού ταχυδρομίου"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
          </div>
          <button
            className="self-end bg-blue-gray hover:shadow-lg outline-none focus:outline-none text-black font-bold py-2 px-4 focus:shadow-outline"
            type="submit"
            onSubmit={handleSubmit}
          >
            Αποστολή Κωδικού
          </button>
        </form>
      </div>
      {success && (
        <div className=" pt-10 w-full mb-3 text-center">
          Ο προσωρινός σας κωδικός εστάλη στη διεύθυνση ταχυδρομίου, πατήστε
          {"   "}
          <span
            onClick={() => navigate("/change_pass", { replace: true })}
            className="hover:underline hover:cursor-pointer font-bold"
          >
            εδώ{" "}
          </span>
          για να αλλάξετε τον κωδικό σας
        </div>
      )}
    </div>
  );
};

export default ForgotPass;
