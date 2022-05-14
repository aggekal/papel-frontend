import { ButtonProps } from "../interfaces/ui";

const Button = ({ onClick, color, text, nav = false }: ButtonProps) => {
  return (
    <div
      onClick={(e) => onClick(e)}
      className={`${color} rounded-lg text-center   hover:shadow-lg hover:brightness-75 hover:cursor-pointer text-black font-bold ${
        !nav ? "py-2 px-4 m-3" : "py-1 px-3"
      }`}
    >
      {text}
    </div>
  );
};

export default Button;
