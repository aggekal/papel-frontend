import { useSelector } from "react-redux";
import { userSelector } from "../features/counter/user/userSlice";

const StudentMain: React.FC = () => {
  const { username, role, registerNumber } = useSelector(userSelector);
  return (
    <div>
      {username}, {role}, {registerNumber}
    </div>
  );
};

export default StudentMain;
