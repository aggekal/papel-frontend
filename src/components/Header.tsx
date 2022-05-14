import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../app/store";
import { logout, userSelector } from "../features/counter/user/userSlice";
import Button from "./Button";
import PopOverWrapper from "./Popover";

const Header = (): JSX.Element => {
  const { username, accessToken, refreshToken } = useSelector(userSelector);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.clear();
    dispatch(logout());
    axios({
      method: "delete",
      url: "http://localhost:1337/api/sessions",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + accessToken,
        "x-refresh": refreshToken,
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error: any) {
        console.log(error.response);
      });
    navigate("/", { replace: true });
  };
  return (
    <div className="flex justify-between p-2 border-b-2 border-y-blue-gray">
      <div className="font-bold ml-5 text-lg">
        Σύστημα Διαχείρισης και Διεξαγωγής Ηλεκτρονικών Εξετάσεων - ΠΑ.ΠΕΛ.
      </div>
      <div>
        {username && (
          <div className="flex">
            <div className="flex px-5 space-x-2 ">
              {" "}
              <Button
                nav
                color="bg-blue-gray"
                text="Μαθήματα"
                onClick={() =>
                  navigate("/instructor_main_lessons", { replace: true })
                }
              />
              <Button
                nav
                color="bg-blue-gray"
                text="Εξετάσεις"
                onClick={() =>
                  navigate("/instructor_main_exams", { replace: true })
                }
              />
            </div>
            <div className="flex px-2">
              <span>Καλώς ήρθες,</span>
              <PopOverWrapper name={username} />
              <span
                className="px-2 hover:underline hover:cursor-pointer font-bold"
                onClick={() => Logout()}
              >
                Έξοδος
              </span>{" "}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
