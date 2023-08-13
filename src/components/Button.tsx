import { motion } from "framer-motion";

// Props for The Button Components
interface ButtonProps {
  children: string;
  onClick: () => void;
  ClassName: string;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
}

function Button({
  children,
  onClick,
  ClassName,
  onMouseDown,
  onMouseUp,
}: ButtonProps) {
  return (
    <>
      <motion.button
        whileHover={{ scale: 1.025 }} // Increase the size of the button on hover
        transition={{ duration: 0.001 }} // Slow down the animation
        className={ClassName} // Set the CSS class
        onClick={onClick} // Call the onClick function
        onMouseDown={onMouseDown} // Call the onMouseDown function for delete button
        onMouseUp={onMouseUp} // Call the onMouseUp function for delete button
      >
        {children}
      </motion.button>
    </>
  );
}

export default Button;
