import { ButtonProps } from "../interfaces/ui";

const Button = ({ onClick, color, text }: ButtonProps) => {
  return (
    <div
      onClick={(e) => onClick(e)}
      className={`${color} rounded-lg text-center m-3  hover:shadow-lg hover:brightness-75 hover:cursor-pointer text-black font-bold py-2 px-4`}
    >
      {text}
    </div>
  );
};

export default Button;
