import { motion } from "framer-motion";

interface ButtonProps {
  children?: string;
  onClick?: () => void;
  ClassName?: string;
  onMouseDown?: () => void;
}

function Button({ children, onClick, ClassName, onMouseDown }: ButtonProps) {
  return (
    <>
      <motion.button
        whileHover={{ scale: 1.025 }}
        transition={{ duration: 0.001 }}
        className={ClassName}
        onClick={onClick}
        onMouseDown={onMouseDown}
      >
        {children}
      </motion.button>
    </>
  );
}

export default Button;
