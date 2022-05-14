import React, { createRef } from "react";
import Popover from "@material-tailwind/react/Popover";
import PopoverContainer from "@material-tailwind/react/PopoverContainer";
import PopoverHeader from "@material-tailwind/react/PopoverHeader";
import PopoverBody from "@material-tailwind/react/PopoverBody";
import { useNavigate } from "react-router-dom";

interface PopOverWrapperProps {
  name: string;
}

const PopOverWrapper: React.FC<PopOverWrapperProps> = ({ name }) => {
  const navigate = useNavigate();
  const buttonRef = createRef<HTMLInputElement>();

  const handleChangePassClick = () => {
    navigate("/change_pass", { replace: true });
  };
  return (
    <>
      <div className="px-2 hover:cursor-pointer" ref={buttonRef}>
        {name}
      </div>

      <Popover placement="bottom" ref={buttonRef}>
        <PopoverContainer>
          <PopoverHeader>Ρυθμίσεις Χρήστη</PopoverHeader>
          <PopoverBody>
            <span
              onClick={() => handleChangePassClick()}
              className="px-2 hover:cursor-pointer hover:font-bold"
            >
              Αλλαγή Κωδικού
            </span>
          </PopoverBody>
        </PopoverContainer>
      </Popover>
    </>
  );
};

export default PopOverWrapper;
