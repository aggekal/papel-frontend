import { useEffect, useState } from "react";

interface AvailableAnswerProps {
  text: string;
  enabled: boolean;
  isPressed: boolean;
  onClick: () => void;
}
const AvailableAnswer: React.FC<AvailableAnswerProps> = ({
  text,
  onClick,
  enabled,
  isPressed,
}) => {
  const [selected, setSelected] = useState(isPressed);
  const toggleSelected = () => {
    setSelected(!selected);
  };

  return (
    <div className="flex">
      <div
        onClick={() => {
          if (!enabled) return;
          onClick();
          toggleSelected();
        }}
        className={`${
          selected ? "bg-green-200" : "bg-misty-blue"
        } mb-2 w-1/3 rounded-full hover:shadow-lg hover:cursor-pointer text-black font-bold py-2 px-4`}
      >
        {text}
      </div>
      {selected && (
        <div className="flex items-center">
          <i>-Σωστή</i>
        </div>
      )}
    </div>
  );
};

export default AvailableAnswer;
