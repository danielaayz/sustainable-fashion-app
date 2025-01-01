export interface RoundedButtonProps {
   children?: React.ReactNode;
   onClick?: () => void;
   className?: string;
   type?: "button" | "submit" | "reset";
}
