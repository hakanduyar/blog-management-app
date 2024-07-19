import PropTypes from "prop-types";
import "./Button.css";

const Button = ({ color, size, children }) => {
  return <button className={`btn btn-${color} btn-${size}`}>{children}</button>;
};

Button.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "success", "danger"])
    .isRequired,
  size: PropTypes.oneOf(["sm", "md", "lg"]).isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
