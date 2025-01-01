import React from "react";
import { RoundedButtonProps } from "../types/RoundedButton";

const RoundedButton: React.FC<RoundedButtonProps> = ({
   children,
   onClick,
   className,
}) => {
   const combinedClassName = `
    bg-dark-clay 
    text-white 
    hover:bg-mossy-green 
    hover:text-linen
    focus:bg-mossy-green
    focus:text-linen
    focus:ring-2
    focus:ring-offset-2
    focus:ring-dark-clay
    px-4 
    py-2 
    rounded-lg
    font-semibold 
    transition-colors 
    duration-200
    ${className || ""}
  `;

   return (
      <button className={combinedClassName} onClick={onClick}>
         {children}
      </button>
   );
};

export default RoundedButton;
