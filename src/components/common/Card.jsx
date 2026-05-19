import { motion } from "framer-motion";
import { adminClasses } from "../../designTokens";

const Card = ({ children, className = "", interactive = false, as: Component = "section" }) => {
  const Wrapper = interactive ? motion[Component] || motion.section : Component;
  const motionProps = interactive
    ? { whileHover: { y: -2 }, transition: { duration: 0.18 } }
    : {};

  return (
    <Wrapper
      className={`${adminClasses.surface} rounded-lg ${interactive ? "hover:shadow-cardHover" : ""} transition-all duration-200 ${className}`}
      {...motionProps}
    >
      {children}
    </Wrapper>
  );
};

export default Card;
